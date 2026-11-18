import React, { useState } from "react";
import "./ReportsLayout.css";

const reportData = [
  {
    id: 1,
    doctorName: "Dr. John Doe",
    speciality: "Cardiology",
    date: "2026-11-18",
    diagnosis: "Mild Hypertension",
    prescription: "Amlodipine 5mg once daily after breakfast; low-sodium diet.",
  },
  {
    id: 2,
    doctorName: "Dr. Jane Smith",
    speciality: "Dermatology",
    date: "2026-11-12",
    diagnosis: "Seasonal Eczema",
    prescription: "Hydrocortisone 1% cream twice daily for 7 days; gentle moisturizer.",
  },
];

const ReportsLayout = () => {
  const [activeReport, setActiveReport] = useState(null);
  const patientName = sessionStorage.getItem("name") || "John Doe";
  const patientEmail = sessionStorage.getItem("email") || "johndoe@example.com";
  const patientPhone = sessionStorage.getItem("phone") || "1234567890";

  const handleDownloadPDF = (report) => {
    setActiveReport(report);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  return (
    <div className="reports-container">
      <h1>Reports</h1>

      <div className="reports-table-wrapper">
        <table className="reports-table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>View Report</th>
              <th>Download Report</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((rep, idx) => (
              <tr key={rep.id}>
                <td>{idx + 1}</td>
                <td>{rep.doctorName}</td>
                <td>{rep.speciality}</td>
                <td>
                  <button
                    className="report-btn"
                    onClick={() => setActiveReport(rep)}
                  >
                    View Report
                  </button>
                </td>
                <td>
                  <button
                    className="report-btn"
                    onClick={() => handleDownloadPDF(rep)}
                  >
                    Download Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {activeReport && (
        <div className="report-preview-card">
          <h2>StayHealthy — Patient Medical Report</h2>
          <hr />
          <p><strong>Patient Name:</strong> {patientName}</p>
          <p><strong>Email:</strong> {patientEmail}</p>
          <p><strong>Phone:</strong> {patientPhone}</p>
          <p><strong>Doctor:</strong> {activeReport.doctorName} ({activeReport.speciality})</p>
          <p><strong>Consultation Date:</strong> {activeReport.date}</p>
          <p><strong>Diagnosis:</strong> {activeReport.diagnosis}</p>
          <p><strong>Prescription Details:</strong> {activeReport.prescription}</p>
          <button
            className="report-btn no-print"
            onClick={() => window.print()}
            style={{ marginTop: "12px" }}
          >
            Save as PDF (patient_report.pdf)
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportsLayout;