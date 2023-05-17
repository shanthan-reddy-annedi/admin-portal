import { useEffect, useState } from "react";
import "./ListAssessmentAttempts.css";
import { useNavigate } from "react-router-dom";
import { listAssessmentAttempts } from "../api/apiUtils";
import { getCookie } from "./Assessments";

function UserDetail() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const assessmentId = window.location.pathname.split("/")[2];

  useEffect(() => {
    async function fetchData() {
      const token = getCookie("token"); // Get the token from cookie; // Get the token from localStorage
      if (!token) {
        navigate("/login"); // Redirect to /login if token is not present
      } else {
        const response = await listAssessmentAttempts(assessmentId, token);
        setUser(response);
      }
    }
    fetchData();
  }, [assessmentId]);

  if (!user) {
    return <div className="user-detail-loading">Loading...</div>;
  }

  const handleClick = (linkId) => {
    navigate(`/report/${linkId}`);
  };

  return (
    <div className="user-detail-body">
      <table className="user-detail-table">
        <thead>
          <tr>
            {/* <th className="user-detail-name">Name</th> */}
            <th className="user-detail-email">Email</th>
            <th className="user-detail-linkId">Link Id</th>
            <th className="user-detail-status">Status</th>
            <th className="user-detail-score">Score</th>
            <th className="user-detail-startedOn">Started On</th>
          </tr>
        </thead>
        <tbody>
          {user.map((userDetail) => (
            <tr key={userDetail.id} className="user-detail-row">
              {/* <td className="user-detail-name">{userDetail.name}</td> */}
              <td className="user-detail-email">{userDetail.candidateEmail}</td>
              <td
                className="user-detail-linkId-body"
                onClick={() => {
                  if (userDetail.status !== "INVITED" && userDetail.status !== "INPROGRESS") {
                    handleClick(userDetail.linkId);
                  }
                }}
              >
                {userDetail.linkId}
              </td>
              <td className="user-detail-status">{userDetail.status}</td>
              <td className="user-detail-score">{userDetail.score}</td>
              <td className="user-detail-startedOn">{userDetail.startedOn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDetail;
