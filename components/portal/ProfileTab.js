"use client";

export default function ProfileTab({ user }) {

  function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fields = [
    { label: "Full Name", value: capitalizeFirstLetter(user.name)},
    { label: "Email", value: user.email },
    { label: "Roll Number", value: user.rollNo || "Not set" },
    { label: "Department", value: user.department || "Not set" },
    { label: "Program", value: user.program || "Not set" },
    { label: "Batch", value: user.batch || "Not set" },
    { label: "Phone", value: user.phone || "Not set" },
    {
      label: "Member Since",
      value: new Date(user.createdAt).toLocaleDateString("en-PK", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
  ];

  return (
    <div className="card">
      <h3 className="font-semibold text-gray-800 mb-4">Profile Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ label, value }) => (
          <div key={label} className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
              {label}
            </p>
            <p className="font-medium text-gray-800 text-sm">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
