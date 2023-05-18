import { useEffect, useState } from "react";
import "./ListAssessmentAttempts.css";
import { useNavigate } from "react-router-dom";
import { inviteCandidates, listAssessmentAttempts } from "../api/apiUtils";
import { getCookie } from "./Assessments";
import classNames from "classnames";

function UserDetail() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [emailList, setEmailList] = useState("");

  const assessmentId = window.location.pathname.split("/")[2];

  useEffect(() => {
    async function fetchData() {
      const token = getCookie("token");
      if (!token) {
        navigate("/login");
      } else {
        const response = await listAssessmentAttempts(assessmentId, token);
        setUser(response);
      }
    }
    fetchData();
  }, [assessmentId]);

  const handleInviteClick = () => {
    setShowPopup(true);
  };

  const handlePopupSubmit = () => {
    const token = getCookie("token");
    if (!token) {
      navigate("/login");
    } else {
      inviteCandidates(emailList, assessmentId, token);
    }
    // Close the popup and clear the email list
    setShowPopup(false);
    setEmailList("");
  };

  const handlePopupCancel = () => {
    setShowPopup(false);
    setEmailList("");
  };

  const handleClick = (linkId) => {
    navigate(`/report/${linkId}`);
  };

  if (!user) {
    return <div className="user-detail-loading">Loading...</div>;
  }

  return (
    <div className="user-detail-body">
      <div className="invite-candidates-btn">
        <button className="invite-btn" onClick={handleInviteClick}>
          Invite Candidates
        </button>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2 className="title-popup">Invite Candidates</h2>
            <input
              type="text"
              className="email-input"
              placeholder="Enter emails, separated by commas"
              value={emailList}
              onChange={(e) => setEmailList(e.target.value)}
            />
            <div className="popup-buttons">
              <button className="submit-btn" onClick={handlePopupSubmit}>
                Submit
              </button>
              <button className="cancel-btn" onClick={handlePopupCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="user-detail-table">
        <thead>
          <tr>
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
              <td className="user-detail-email">{userDetail.candidateEmail}</td>
              <td
                className={classNames("user-detail-linkId-body", {
                  clickable:
                    userDetail.status !== "INVITED" &&
                    userDetail.status !== "INPROGRESS",
                })}
                onClick={() => {
                  if (
                    userDetail.status !== "INVITED" &&
                    userDetail.status !== "INPROGRESS"
                  ) {
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
