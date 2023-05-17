import React, { useState } from "react";
import "./CreateAssessment.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createAssessment } from "../api/apiUtils";
import { getCookie } from "./Assessments";

const AssessmentForm = () => {
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [assessmentDetails, setAssessmentDetails] = useState("");
  const [subject, setSubject] = useState("");
  const [maxApplicants, setMaxApplicants] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [sendResults, setSendResults] = useState();
  const [displayPublic, setDisplayPublic] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const assessment = {
        name,
        expiryDate,
        startDate,
        assessmentDetails,
        subject,
        maxApplicants,
        sendResults,
        displayPublic,
      };

      console.log(JSON.stringify(assessment));
      formData.append("assessment", JSON.stringify(assessment));
      formData.append("file", file);
      const token = getCookie("token"); // Get the token from cookie; // Get the token from localStorage
      if (!token) {
        navigate("/login"); // Redirect to /login if token is not present
      } else {
        await createAssessment(formData, token);
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="assessment-title">
      <h2 className="assessment-title__name">Create Assessment</h2>
      <div className="assessment-form">
        <form onSubmit={handleSubmit}>
          <label className="assessment-form__label">
            Assessment Name:
            <input
              className="assessment-form__input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="assessment-form__label">
            Start Date:
            <input
              className="assessment-form__input"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>
          <label className="assessment-form__label">
            Expiry Date:
            <input
              className="assessment-form__input"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </label>
          <label className="assessment-form__label">
            Description:
            <textarea
              className="assessment-form__textarea"
              value={assessmentDetails}
              onChange={(e) => setAssessmentDetails(e.target.value)}
              required
            />
          </label>
          <label className="assessment-form__label">
            Subject:
            <input
              className="assessment-form__input"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </label>
          <label className="assessment-form__label">
            Send Result:
            <div>
              <label className="assessment-form__radio-buttons">
                <input
                  type="radio"
                  value="true"
                  checked={sendResults === "true"}
                  onChange={(e) => setSendResults(e.target.value)}
                />
                Yes
              </label>
              <label className="assessment-form__radio-buttons">
                <input
                  type="radio"
                  value="false"
                  checked={sendResults === "false"}
                  onChange={(e) => setSendResults(e.target.value)}
                />
                No
              </label>
            </div>
          </label>

          <label className="assessment-form__label">
            Display Public:
            <div>
              <label className="assessment-form__radio-buttons">
                <input
                  type="radio"
                  value="true"
                  checked={displayPublic === "true"}
                  onChange={(e) => setDisplayPublic(e.target.value)}
                />
                Yes
              </label>
              <label className="assessment-form__radio-buttons">
                <input
                  type="radio"
                  value="false"
                  checked={displayPublic === "false"}
                  onChange={(e) => setDisplayPublic(e.target.value)}
                />
                No
              </label>
            </div>
          </label>

          <label className="assessment-form__label">
            Max Applicants:
            <input
              className="assessment-form__input"
              type="number"
              value={maxApplicants}
              onChange={(e) => setMaxApplicants(e.target.value)}
              required
            />
          </label>
          <label className="assessment-form__label">
            CSV File:
            <input
              className="assessment-form__input-file"
              type="file"
              accept=".csv,.xlsx"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </label>
          <div className="assessment-button">
            <button className="assessment-form__submit-button" type="submit">
              Submit
            </button>
          </div>
        </form>
        {error && (
          <div className="assessment-form__error-popup">
            <p className="assessment-form__error-message">
              Error message goes here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentForm;
