import axios from "axios";
const url = `http://65.0.130.13`;

export async function listAssessmentAttempts(userId, token) {
  const info = await axios
    .get(`${url}/api/getAllAssessmentAttempts/${userId}`, {
      headers: { Authorization: token },
    })
    .then((response) => response.data);
  return info;
}

export async function inviteCandidates(emailList, assessmentId, token) {
  const emails = emailList.split(",").map((email) => email.trim());
  const response = axios
    .post(`${url}/api/assessment/invite?assessmentId=${assessmentId}`, emails, {
      headers: { Authorization: token },
    })
    .then((response) => response.data);
  return response;
}

export async function getCandidateReport(id, token) {
  const report = axios
    .get(`${url}/public/api/report?linkId=${id}`, {
      headers: { Authorization: token },
    })
    .then((response) => response.data);
  return report;
}

export async function createAssessment(formData, token) {
  const response = await axios.post(`${url}/api/assessment`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    },
  });
  return response;
}

export async function getAssessments(token) {
  const response = axios
    .get(`${url}/api/getAssessment`, { headers: { Authorization: token } })
    .then((response) => response.data);
  return response;
}

export async function login(data) {
  const resp = await axios.post(`${url}/public/login`, data);
  return resp;
}
