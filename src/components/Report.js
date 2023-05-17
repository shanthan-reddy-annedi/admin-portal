import { useState, useEffect } from "react";
import "./Report.css";
import { useNavigate, useParams } from "react-router-dom";
import { getCandidateReport } from "../api/apiUtils";
import { getCookie } from "./Assessments";

function Report() {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();


  useEffect(() => {
    async function fetchData() {
      const token = getCookie("token"); // Get the token from cookie; // Get the token from localStorage
      if (!token) {
        navigate("/login"); // Redirect to /login if token is not present
      } else {
        const response = await getCandidateReport(id, token);
        setUserData(response);
      }
    }
    fetchData();
  }, [id]);

  if (!userData) {
    return <div className="personal-report-loading">Loading...</div>;
  }

  const { email, response, score } = userData;

  return (
    <div className="personal-report">
      <h1 className="personal-report__name">{email}'s Score Card</h1>
      <p className="personal-report__score">Total Score: {score}</p>
      <ul className="personal-report__answers">
        {response.data.map(
          ({ question, candidateAnswer, correctAnswer }, index) => (
            <li className="personal-report__answer" key={index}>
              <p className="personal-report__question">{question}</p>
              <p className="personal-report__user-answer">
                Your Answer: {candidateAnswer}
              </p>
              <p className="personal-report__correct-answer">
                Correct Answer: {correctAnswer}
              </p>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default Report;
