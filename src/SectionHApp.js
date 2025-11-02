import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [attendance, setAttendance] = useState({});
  const [notes, setNotes] = useState([]);
  const [events, setEvents] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [modalData, setModalData] = useState({ open: false, day: "", period: "", subject: "", text: "" });

  // 📊 Attendance logic
  function handleAttendanceChange(subject, type, value) {
    setAttendance((prev) => {
      const subjectData = prev[subject] || { present: 0, total: 0 };
      const updated = { ...subjectData, [type]: Number(value) };
      updated.percentage = updated.total
        ? ((updated.present / updated.total) * 100).toFixed(1)
        : 0;
      return { ...prev, [subject]: updated };
    });
  }

  // 📝 Notes logic
  function addNote() {
    const text = prompt("Enter your note:");
    if (text) setNotes([...notes, text]);
  }

  // 📅 Events logic
  function addEvent() {
    const text = prompt("Enter event description:");
    if (text) setEvents([...events, text]);
  }

  // 📚 Assignment modal handlers
  function openAssignmentModal(day, period, subject) {
    const key = `${day}-${period}`;
    setModalData({
      open: true,
      day,
      period,
      subject,
      text: assignments[key] || "",
    });
  }

  function saveAssignment() {
    const key = `${modalData.day}-${modalData.period}`;
    if (modalData.text.trim() !== "") {
      setAssignments((prev) => ({
        ...prev,
        [key]: modalData.text,
      }));
    }
    setModalData({ ...modalData, open: false });
  }

  function closeModal() {
    setModalData({ ...modalData, open: false });
  }

  // 🧭 Weekly timetable (simplified from your image)
  const timetable = {
    Monday: ["Math", "ETI", "TEM", "PHY", "Math", "PHY", "ENGG PHY LAB"],
    Tuesday: ["SS LAB", "Math", "PHY", "TEM LAB", "LIBRARY", "MATH TUT", "PHY TUT"],
    Wednesday: ["Math", "PHY", "TEM LAB", "ETI", "TEM", "PPS LAB", ""],
    Thursday: ["Math", "TEM", "TEM", "PHY", "ENGG PHY LAB", "D.T LAB", ""],
    Friday: ["TEM", "D.T", "TEM", "Math", "ENGG PHY LAB", "PHY", ""],
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-500 to-cyan-400 text-gray-800 p-10">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img
          src="/ipec_logo.png"
          alt="IPEC Logo"
          className="w-28 h-28 rounded-full shadow-lg"
        />
      </div>

      {/* Header */}
      <h1 className="text-4xl font-bold text-white text-center drop-shadow-lg mb-2">
        Section H - Timetable
      </h1>
      <p className="text-center text-blue-100 mb-8">
        Manage your subjects, notes, attendance, and assignments easily.
      </p>

      {/* Timetable */}
      <div className="overflow-x-auto mb-10">
        <table className="min-w-full border border-blue-300 bg-white/30 backdrop-blur-lg rounded-lg shadow-md">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4 border border-blue-300">Day</th>
              {[1, 2, 3, 4, 5, 6, 7].map((p) => (
                <th key={p} className="py-2 px-4 border border-blue-300">
                  Period {p}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-center font-semibold">
            {Object.entries(timetable).map(([day, periods]) => (
              <tr key={day}>
                <td className="border border-blue-300 p-2 font-bold text-blue-900 bg-white/40">
                  {day}
                </td>
                {periods.map((subject, i) => {
                  const key = `${day}-${i + 1}`;
                  const hasAssignment = assignments[key];
                  return (
                    <td
                      key={i}
                      onClick={() =>
                        subject && openAssignmentModal(day, i + 1, subject)
                      }
                      className={`border border-blue-300 p-2 cursor-pointer hover:bg-blue-200 transition ${
                        hasAssignment ? "bg-green-200" : "bg-white/20"
                      }`}
                      title={
                        hasAssignment
                          ? `Assignment: ${assignments[key]}`
                          : "Click to add assignment"
                      }
                    >
                      {subject || "-"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Attendance Section */}
      <h2 className="text-2xl font-bold text-white mt-8 mb-4 bg-blue-500 px-4 py-2 rounded-md inline-block shadow-md">
        Attendance
      </h2>

      <div className="space-y-4">
        {["Math", "Physics", "ETI", "TEM"].map((subject) => (
          <div
            key={subject}
            className="bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-md"
          >
            <h3 className="text-lg font-semibold text-white mb-2">{subject}</h3>
            <div className="flex items-center space-x-2 mb-2">
              <label className="text-white">Present:</label>
              <input
                type="number"
                placeholder="0"
                className="px-2 py-1 rounded bg-blue-100 text-gray-800 w-20"
                onChange={(e) =>
                  handleAttendanceChange(subject, "present", e.target.value)
                }
              />
              <label className="text-white">Total:</label>
              <input
                type="number"
                placeholder="0"
                className="px-2 py-1 rounded bg-blue-100 text-gray-800 w-20"
                onChange={(e) =>
                  handleAttendanceChange(subject, "total", e.target.value)
                }
              />
            </div>
            <p className="text-white">
              Attendance:{" "}
              {attendance[subject]?.percentage
                ? `${attendance[subject].percentage}%`
                : "—"}
            </p>
          </div>
        ))}
      </div>

      {/* Notes Section */}
      <h2 className="text-2xl font-bold text-white mt-10 mb-4 bg-blue-500 px-4 py-2 rounded-md inline-block shadow-md">
        Notes
      </h2>
      <button
        onClick={addNote}
        className="bg-white text-blue-700 px-3 py-1 rounded shadow hover:bg-blue-50 transition"
      >
        ➕ Add Note
      </button>
      <ul className="mt-4 text-white space-y-2">
        {notes.map((note, i) => (
          <li key={i} className="bg-white/20 p-2 rounded-md">
            {note}
          </li>
        ))}
      </ul>

      {/* Events Section */}
      <h2 className="text-2xl font-bold text-white mt-10 mb-4 bg-blue-500 px-4 py-2 rounded-md inline-block shadow-md">
        Events
      </h2>
      <button
        onClick={addEvent}
        className="bg-white text-blue-700 px-3 py-1 rounded shadow hover:bg-blue-50 transition"
      >
        ➕ Add Event
      </button>
      <ul className="mt-4 text-white space-y-2">
        {events.map((ev, i) => (
          <li key={i} className="bg-white/20 p-2 rounded-md">
            {ev}
          </li>
        ))}
      </ul>

      {/* 🪟 Assignment Modal */}
      {modalData.open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h3 className="text-xl font-bold text-blue-700 mb-3">
              {modalData.subject} - {modalData.day} (Period {modalData.period})
            </h3>
            <textarea
              value={modalData.text}
              onChange={(e) =>
                setModalData({ ...modalData, text: e.target.value })
              }
              placeholder="Enter assignment details..."
              className="w-full h-32 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={closeModal}
                className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={saveAssignment}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
