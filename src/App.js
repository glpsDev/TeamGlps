import React from 'react';
import './App.css';
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {  Routes, Route, HashRouter } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import Menu from './pages/Menu';
import AssignTask from './pages/AssignTask';
import MyTaskDashboard from './pages/MyTaskDashboard';
import ApplicationDetails from './pages/ApplicationDetails';
import CrecUpdate from './pages/CrecUpdate';
import Migrate from './pages/Migrate';
import AddMeetingMaster from './pages/AddMeetingMaster';
import MyTaskDetailsDashboard from './pages/MyTaskDetailsDashboard';
import NFD from './pages/NFD';
import ApplicationAuditTrail from './pages/ApplicationAuditTrail';
import OpportunityAuditTrail from './pages/OpportunityAuditTrail';
import MeetingCenterAuditTrail from './pages/MeetingCenterAuditTrail';
import FTPuserMaster from './pages/FTPuserMaster';


export default function App() {

  return (
    <HashRouter>
      <Routes>
        <Route exact path='/' element={<Login />} ></Route>
        <Route path="/index" element={<Dashboard />} >
          <Route path="/index/assignTask" element={<AssignTask />} />
          <Route path="/index/myTask" element={<MyTaskDashboard />} />
          <Route path="/index/addMeetingMaster" element={<AddMeetingMaster />} />
          <Route path="/index/crecBulkUpdate" element={<CrecUpdate />} />
          <Route path="/index/migrate" element={<Migrate />} />
          <Route path="/index/nfd" element={<NFD />} />
          <Route path="/index/oppAuditTrail" element={<OpportunityAuditTrail />} />
          <Route path="/index/meetingAuditTrail" element={<MeetingCenterAuditTrail />} />
          <Route path="/index/appAuditTrail" element={<ApplicationAuditTrail />} />
          <Route path="/index/addUser" element={<FTPuserMaster />} />
          <Route path="/index/MyTask/MyTaskDetails" element={<MyTaskDetailsDashboard />} />
        </Route>
      </Routes>
      </HashRouter>
  );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);