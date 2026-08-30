import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { CanvasFactory } from "pdf-parse/worker";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function normalizeClassName(className) {
  return className
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/-/g, "");
}

function normalizeText(text) {
  return text
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

function extractTimeSlots(text) {
  const timePatterns = [
    /(\d{1,2}:\d{2}\s*[AP]M\s*[-–]\s*\d{1,2}:\d{2}\s*[AP]M)/gi,
    /(\d{1,2}:\d{2}\s*[-–]\s*\d{1,2}:\d{2})/gi,
    /(\d{1,2}\s*[AP]M\s*[-–]\s*\d{1,2}\s*[AP]M)/gi,
  ];

  const slots = [];
  for (const pattern of timePatterns) {
    const matches = text.match(pattern);
    if (matches) {
      slots.push(...matches.map(m => m.trim()));
    }
  }
  return [...new Set(slots)];
}

async function extractTableDataPdfJs(buffer, targetClass, doc) {
  const normalizedTarget = normalizeClassName(targetClass);
  const numPages = doc.numPages;
  const entries = [];
  
  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const roomRegex = /^(?:\*)?(Class\s+R\d+|SSG\s+\d+|SSA\s+\d+|HBL\s+LAB.*|CISCO\s+LAB|SOFTWARE\s+LAB|MICRO\s+PRO\s+LAB|DIGITAL\s+SYSTEM\s+LAB|BASIC\s+ELECTRONICS|LIIA|ELECTRICAL\s+MACHINE\s+LAB|FYP\s+LAB|COMMUNICATION\s+SYSTEM\s+LAB|POWER\s+SYSTEM\s+LAB|SSC\s+COMP\s+LAB.*|CYBER\s+SECURITY|CLOUD\s+COMPUTING|ADVANCE\s+TELECOM\s+LAB|PHYSICS\s+LAB|IQBAL\s+HALL)/i;
  
  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const content = await page.getTextContent();
    const items = content.items.filter(item => item.str.trim());
    
    let currentDay = DAYS[pageNum - 1] || 'Unknown';
    
    // Map items with coordinates
    const mappedItems = items.map(item => ({
      str: item.str.trim(),
      cleanedStr: item.str.trim().replace(/\u2010/g, '-'),
      x: Math.round(item.transform[4]),
      y: Math.round(item.transform[5])
    }));
    
    // Extract rooms on this page (usually X < 120)
    const pageRooms = mappedItems.filter(item => item.x < 120 && roomRegex.test(item.cleanedStr));
    
    // Find courses
    const courseRegex = new RegExp(`\\b(${normalizedTarget}-[A-Z0-9&]+(?:-[A-Za-z0-9]+)*)(?:\\s*\\(([^)]+)\\))?`, 'i');
    
    const courses = mappedItems.filter(item => courseRegex.test(item.cleanedStr));
    
    for (const courseItem of courses) {
      const match = courseItem.cleanedStr.match(courseRegex);
      const course = match[1];
      let time = match[2] ? match[2].trim() : null;
      
      if (!time) {
        if (courseItem.x < 220) time = '09:30 AM - 11:00 AM';
        else if (courseItem.x < 320) time = '11:00 AM - 12:30 PM';
        else if (courseItem.x < 420) time = '12:30 PM - 02:00 PM';
        else time = '03:00 PM - 04:30 PM';
      } else {
        // Clean up manual times for better sorting, e.g. "9.00 -11.00" -> "09:00 AM - 11:00 AM"
        time = time.replace(/\./g, ':').replace(/\s+/g, '');
        if (time.startsWith('9:')) time = '09:00 AM - 11:00 AM';
        else if (time.startsWith('3:')) time = '03:00 PM - 05:00 PM';
        else if (time.startsWith('12:')) time = '12:00 PM - 02:00 PM';
        else if (time.startsWith('2:')) time = '02:30 PM - 04:30 PM';
        else if (time.startsWith('1:')) time = '01:00 PM - 02:00 PM';
      }
      
      // Nearest room by Y coordinate
      let assignedRoom = 'Unknown';
      if (pageRooms.length > 0) {
        const nearestRoom = pageRooms.reduce((prev, curr) => 
          Math.abs(curr.y - courseItem.y) < Math.abs(prev.y - courseItem.y) ? curr : prev
        );
        assignedRoom = nearestRoom.str;
      }
      
      // Instructor is usually below the course (y is smaller, e.g. 10 to 30 units) 
      // and at a similar X coordinate.
      let instructor = '—';
      
      // Look for instructor on the same line if combined by PDF parser
      const restOfLine = courseItem.cleanedStr.substring(match.index + match[0].length).trim();
      if (restOfLine && !restOfLine.match(/^[A-Z0-9]{2,}-[A-Z0-9&]+/)) {
        instructor = restOfLine.split(/\s+[A-Z0-9]{2,}-/)[0].trim();
      } else {
        // Find items below this course
        const belowItems = mappedItems.filter(item => 
          item.y < courseItem.y && 
          item.y > courseItem.y - 30 && 
          Math.abs(item.x - courseItem.x) < 40
        );
        
        if (belowItems.length > 0) {
          // Get the one closest in Y
          const instItem = belowItems.reduce((prev, curr) => 
            (courseItem.y - curr.y) < (courseItem.y - prev.y) ? curr : prev
          );
          if (!instItem.cleanedStr.match(/^[A-Z0-9]{2,}-[A-Z0-9&]+/)) {
            instructor = instItem.str.replace(/^(Dr\.|Mr\.|Ms\.|Mx\.)?\s*/, '$1 ').trim();
          }
        }
      }
      
      entries.push({
        day: currentDay,
        time: time,
        course: course,
        instructor: instructor,
        room: assignedRoom,
        section: targetClass.toUpperCase()
      });
    }
  }
  return entries;
}

function deduplicateEntries(entries) {
  const seen = new Set();
  return entries.filter(entry => {
    const key = `${entry.day}-${entry.time}-${entry.course}-${entry.room}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function parseTimetableEntries(text, targetClass) {
  const normalizedTarget = normalizeClassName(targetClass);
  const entries = [];
  const cleanedText = text.replace(/\u2010/g, '-');
  const lines = cleanedText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  let currentPageEntries = [];
  let currentRoom = 'Unknown';

  const dayFooterRegex = /^Room\s+(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/i;
  const roomRegex = /^(?:\*)?(Class\s+R\d+|SSG\s+\d+|SSA\s+\d+|HBL\s+LAB.*|CISCO\s+LAB|SOFTWARE\s+LAB|MICRO\s+PRO\s+LAB|DIGITAL\s+SYSTEM\s+LAB|BASIC\s+ELECTRONICS|LIIA|ELECTRICAL\s+MACHINE\s+LAB|FYP\s+LAB|COMMUNICATION\s+SYSTEM\s+LAB|POWER\s+SYSTEM\s+LAB|SSC\s+COMP\s+LAB.*|CYBER\s+SECURITY|CLOUD\s+COMPUTING|ADVANCE\s+TELECOM\s+LAB|PHYSICS\s+LAB|IQBAL\s+HALL)/i;

  const courseRegex = new RegExp(`\\b(${normalizedTarget}-[A-Z0-9&]+(?:-[A-Za-z0-9]+)*)(?:\\s*\\(([^)]+)\\))?`, 'gi');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const dayMatch = line.match(dayFooterRegex);
    if (dayMatch) {
      const dayName = dayMatch[1].charAt(0).toUpperCase() + dayMatch[1].slice(1).toLowerCase();
      for (const entry of currentPageEntries) {
        entry.day = dayName;
        entries.push(entry);
      }
      currentPageEntries = [];
      continue;
    }

    const roomMatch = line.match(roomRegex);
    if (roomMatch) {
      currentRoom = roomMatch[1].trim();
    }

    let match;
    courseRegex.lastIndex = 0;
    while ((match = courseRegex.exec(line)) !== null) {
      const course = match[1];
      let time = match[2] ? match[2].trim() : 'TBA';

      let instructor = '—';
      let foundInstructor = false;

      const restOfLine = line.substring(match.index + match[0].length).trim();
      if (restOfLine && !restOfLine.match(/^[A-Z0-9]{2,}-[A-Z0-9&]+/)) {
        instructor = restOfLine.split(/\s+[A-Z0-9]{2,}-/)[0].trim();
        foundInstructor = true;
      }

      if (!foundInstructor && i + 1 < lines.length) {
        const nextLine = lines[i+1];
        if (!nextLine.match(dayFooterRegex) && !roomRegex.test(nextLine)) {
          const nextLineMatch = nextLine.match(/^([^A-Z0-9]*[a-zA-Z][^A-Z0-9]*.*?)(?=\b[A-Z0-9]{2,}-[A-Z0-9&]+|$)/);
          if (nextLineMatch && nextLineMatch[1].trim()) {
            instructor = nextLineMatch[1].trim();
            instructor = instructor.replace(/^(Dr\.|Mr\.|Ms\.|Mx\.)?\s*/, '$1 ').trim();
          }
        }
      }

      currentPageEntries.push({
        day: 'Unknown',
        time: time,
        course: course,
        instructor: instructor || '—',
        room: currentRoom,
        section: targetClass.toUpperCase()
      });
    }
  }

  if (currentPageEntries.length > 0) {
    for (const entry of currentPageEntries) {
      entries.push(entry);
    }
  }

  return entries;
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("pdf");
    const className = formData.get("className");

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No PDF file provided" },
        { status: 400 }
      );
    }

    if (!className) {
      return NextResponse.json(
        { success: false, error: "No class/section name provided" },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Please upload a PDF file." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (buffer.length > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    let entries = [];
    let text = "";
    try {
      const { PDFParse } = await import("pdf-parse");
      const parser = new PDFParse({ data: buffer, CanvasFactory });
      await parser.load();
      const doc = parser.doc;

      const textParts = [];
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        textParts.push(content.items.map(item => item.str).join(" "));
      }
      text = textParts.join("\n");

      // Pass doc to extractTableDataPdfJs
      entries = await extractTableDataPdfJs(buffer, className, doc);
      
      await parser.destroy();
    } catch (pdfError) {
      console.warn("pdf parsing failed:", pdfError.message);
    }

    if (!text || text.trim().length < 50) {
      return NextResponse.json(
        { success: false, error: "This PDF appears to be scanned/image-based. Please upload a text-based timetable PDF." },
        { status: 400 }
      );
    }

    // Fallback to text-based extraction if structured extraction failed
    if (entries.length === 0) {
      entries = parseTimetableEntries(text, className);
    }

    if (entries.length === 0) {
      return NextResponse.json(
        { success: false, error: `Class ${className.toUpperCase()} was not found in this timetable PDF.` },
        { status: 404 }
      );
    }

    entries = deduplicateEntries(entries);

    const timeToMinutes = (timeStr) => {
      if (!timeStr || timeStr === "TBA") return 9999;
      // Extract start time from "09:30 AM - 11:00 AM" format
      const startPart = timeStr.split(/\s*[-–]\s*/)[0].trim();
      const match = startPart.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
      if (!match) return 9999;
      let [, h, m, period] = match;
      h = parseInt(h, 10);
      m = parseInt(m, 10);
      if (period.toUpperCase() === "AM") {
        if (h === 12) h = 0;
      } else {
        if (h !== 12) h += 12;
      }
      return h * 60 + m;
    };

    entries.sort((a, b) => {
      const dayOrder = { Monday: 0, Tuesday: 1, Wednesday: 2, Thursday: 3, Friday: 4, Saturday: 5, Sunday: 6 };
      const dayA = dayOrder[a.day] ?? 7;
      const dayB = dayOrder[b.day] ?? 7;
      if (dayA !== dayB) return dayA - dayB;
      return timeToMinutes(a.time) - timeToMinutes(b.time);
    });

    return NextResponse.json({
      success: true,
      className: className.toUpperCase(),
      entries,
      totalEntries: entries.length,
    });

  } catch (error) {
    console.error("Timetable extraction error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process PDF. Please try again." },
      { status: 500 }
    );
  }
}