import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Assessment.css";
import { getAssessments } from "../api/apiUtils";

const Assessment = () => {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("token"); // Get the token from cookie; // Get the token from localStorage
    console.log(token);
    if (!token) {
      navigate("/login"); // Redirect to /login if token is not present
    } else {
      getAssessments(token)
        .then((data) => {
          setObjects(data);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  if (loading) {
    return (
      <div className="assessment-container">
        <div className="loading-container">
          <div className="loading-circle"></div>
          <h2 className="loading-text">Loading...</h2>
        </div>
      </div>
    );
  }

  const handleClick = () => {
    navigate("/createAssessment");
  };

  return (
    <div className="assessment-container">
      <button className="assessment-navigation-button" onClick={handleClick}>
        Create Assessment
      </button>
      <h2 className="assessment-title">Assessment</h2>
      <p className="assessment-description">
        This page contains all the assessments. Select any assessment below:
      </p>
      <div className="assessment-card-container">
        {objects.map((object) => (
          <Link to={`/assessmentAttempt/${object.id}`} key={object.id}>
            <div className="assessment-card">
              <h3 className="assessment-card-title">{object.name}</h3>
              <p className="assessment-card-description">
                {object.assessmentDetails}
              </p>
              <p className="assessment-card-description">
                Exam Starts At:{" "}
                {object.expiryDate
                  ? object.expiryDate.split("T")[0]
                  : "Not available"}
              </p>
              <p className="assessment-card-description">
                Exam Ends At:{" "}
                {object.startDate
                  ? object.startDate.split("T")[0]
                  : "Not available"}
              </p>
              <p className="assessment-card-description">
                Exam Duration: {object.duration}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Assessment;

export function getCookie(name) {
  const cookieValue = document.cookie.match(
    "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
  );

  return cookieValue ? cookieValue.pop() : "";
}