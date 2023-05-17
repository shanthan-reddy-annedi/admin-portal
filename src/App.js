import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage.js";
import UserDetail from "./components/ListAssessmentAttempts";
import AssessmentForm from "./components/CreateAssessment";
import Assessment from "./components/Assessments";
import Report from "./components/Report";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/assessmentAttempt/:id" element={<UserDetail />} />
          <Route path="/createAssessment" element={<AssessmentForm />} />
          <Route path="/" element={<Assessment />} />
          <Route path="/report/:id" element={<Report />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
