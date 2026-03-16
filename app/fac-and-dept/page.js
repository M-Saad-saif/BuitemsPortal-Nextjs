"use client";

import Button from "@/components/UI/button";

export default function FacAndDeptPage() {
  const facultiesData = [
    {
      id: "basic-sciences",
      title: "_____Basics Sciences___",
      gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      departments: [
        {
          name: "Chemistry",
          url: "https://www.buitms.edu.pk/Chemistry",
        },
        { name: "Mathematics", url: "https://www.buitms.edu.pk/Mathematics" },
        { name: "Physics", url: "https://www.buitms.edu.pk/Physics" },
      ],
    },
    {
      id: "engineering-architecture",
      title: "_____Engineering and Architechure____",
      gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      departments: [
        {
          name: "Textile Engineering",
          url: "https://www.buitms.edu.pk/Textile-Engineering",
        },
        {
          name: "Civil Engineering",
          url: "https://www.buitms.edu.pk/Civil-Engineering",
        },
        {
          name: "Mechanical Engineering",
          url: "https://www.buitms.edu.pk/Mechanical-Engineering",
          id: "mechenicalBTN",
        },
        {
          name: "Petroleum and Gas Engineering",
          url: "https://www.buitms.edu.pk/Petroleum-Engineering",
          id: "petrolBTN",
        },
        {
          name: "Chemical Engineering",
          url: "https://www.buitms.edu.pk/Chemical-Engineering",
        },
        {
          name: "Mining Engineering",
          url: "https://www.buitms.edu.pk/Mining-Engineering",
          id: "miningengBTN",
        },
        {
          name: "Geological Engineering",
          url: "https://www.buitms.edu.pk/Geological-Engineering",
          id: "geologyBTN",
        },
        {
          name: "Architecture",
          url: "https://www.buitms.edu.pk/Architecture",
        },
      ],
    },
    {
      id: "fict",
      title: "_____Faculty of Information & Communication Technology___",
      gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      departments: [
        {
          name: "Computer Engineering",
          url: "https://www.buitms.edu.pk/Computer-Engineering",
        },
        {
          name: "Electronic Engineering",
          url: "https://www.buitms.edu.pk/Electronic-Engineering",
        },
        {
          name: "Electrical Engineering",
          url: "https://www.buitms.edu.pk/Electrical-Engineering",
        },
        {
          name: "Software Engineering",
          url: "https://www.buitms.edu.pk/Software-Engineering",
        },
        {
          name: "Information Technology",
          url: "https://www.buitms.edu.pk/Information-Technology",
        },
        {
          name: "Computer Science",
          url: "https://www.buitms.edu.pk/Computer-Science",
        },
        {
          name: "Telecommunication Engineering",
          url: "https://www.buitms.edu.pk/Telecommunication",
        },
      ],
    },
    {
      id: "flsi",
      title: "_____Faculty of Life Sciences & Informatics___",
      gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      departments: [
        {
          name: "Biotechnology",
          url: "https://www.buitms.edu.pk/Biotechnology",
        },
        {
          name: "Environmental Science",
          url: "https://www.buitms.edu.pk/Environmental",
          id: "envirnmentalBTN",
        },
        {
          name: "Microbiology",
          url: "https://www.buitms.edu.pk/Microbiology",
        },
      ],
    },
    {
      id: "fms",
      title: "_____Faculty of Management Sciences___",
      gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      departments: [
        {
          name: "Management Sciences",
          url: "https://www.buitms.edu.pk/Management-Sciences",
        },
        {
          name: "Economics",
          url: "https://www.buitms.edu.pk/Economics",
          id: "ecnomicsBTN",
        },
        {
          name: "Public Administration",
          url: "https://www.buitms.edu.pk/Public-Administration",
        },
        {
          name: "Department of Law",
          url: "https://www.buitms.edu.pk/Department-Law",
        },
      ],
    },
    {
      id: "fssh",
      title: "_____Faculty of Social Sciences and Humanities_____",
      gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      departments: [
        {
          name: "Department of Education",
          url: "https://www.buitms.edu.pk/Education",
        },
        {
          name: "Department of English",
          url: "https://www.buitms.edu.pk/English",
        },
        {
          name: "International Relations",
          url: "https://www.buitms.edu.pk/International-Relation",
        },
        {
          name: "Mass Communication",
          url: "https://www.buitms.edu.pk/Mass-Communication",
        },
        {
          name: "Department of Psychology",
          url: "https://www.buitms.edu.pk/Psychology",
          id: "psychologyBTN",
        },
        {
          name: "Department of Sociology",
          url: "https://www.buitms.edu.pk/Sociology",
        },
        {
          name: "Department of Law",
          url: "https://www.buitms.edu.pk/Department-Law",
        },
      ],
    },
    {
      id: "muslimbagh",
      title: "_____BUITEMS Sub Campus Muslimbagh_____",
      gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      departments: [
        {
          name: "Computer Engineering",
          url: "https://www.buitms.edu.pk/Computer-Engineering",
        },
        {
          name: "Economics",
          url: "https://www.buitms.edu.pk/Economics",
          id: "msl-economicsBTN",
        },
        {
          name: "Management Sciences",
          url: "https://www.buitms.edu.pk/Management-Sciences",
        },
        {
          name: "Public Administration",
          url: "https://www.buitms.edu.pk/Public-Administration",
        },
      ],
    },
    {
      id: "zhob",
      title: "_____BUITEMS Sub Campus University College of Zhob, (UCoZ)_____",
      gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      departments: [
        {
          name: "Department of Education",
          url: "https://www.buitms.edu.pk/Education",
        },
        {
          name: "Economics",
          url: "https://www.buitms.edu.pk/Economics",
          id: "zhob-economicsBTN",
        },
        {
          name: "Management Sciences",
          url: "https://www.buitms.edu.pk/Management-Sciences",
        },
        {
          name: "Computer Science",
          url: "https://www.buitms.edu.pk/Computer-Science",
        },
      ],
    },
  ];

  return (
    <>
      <section className="bg-blue-100">
        <div id="facu-and-eng-body">
          <section className="propectus-portion max-w-7xl mx-auto px-4 sm:px-5 py-8">
            {/* Map through all faculties */}
            {facultiesData.map((faculty) => (
              <div
                key={faculty.id}
                className="portion mb-10 bg-white/90 rounded-2xl p-6 sm:p-8 shadow-lg border border-[#083262]/10"
              >
                <h1 className="pp_headings text-[#083262] text-center text-2xl font-bold mb-6 pb-3 border-b-2 border-[#083262]">
                  {faculty.title}
                </h1>

                <div className={`grid ${faculty.gridCols} gap-3`}>
                  {faculty.departments.map((dept, index) => (
                    <div
                      key={index}
                      className={dept.className || `div${index + 1}`}
                    >
                      <a
                        href={dept.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button
                          href={dept.name}
                          className="!justify-self-center !w-[99%] !text-[16px] m-[0px] mt-[-15px]"
                        />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      </section>
    </>
  );
}
