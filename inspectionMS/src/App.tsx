import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import TemplateSetupForm from './pages/TemplateSetupForm';
import SectionSetupForm from './pages/SectionSetupForm';
import QuestionsForm from './pages/QuestionsForm';
import OrganizationDetailsForm from './pages/OrganizationDetailsForm';
import ConsumerPage from './pages/ConsumerPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './App.css';
import GeneralDetailsPage from './pages/GeneralDetailsPage';
import InspectionListPage from './pages/InspectionListPage';

function App() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Router>
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <Header />
      <div
        className="App"
        style={{
          marginLeft: isCollapsed ? "60px" : "200px",
          marginTop: "60px",
        }}
      >
        <Routes>
          <Route path="/" element={<ConsumerPage />} />
          <Route path="/template" element={<TemplateSetupForm />} />
          <Route path="/section" element={<SectionSetupForm />} />
          <Route path="/questions" element={<QuestionsForm />} />
          <Route path="/organization" element={<OrganizationDetailsForm />} />
          <Route path="/consumer" element={<ConsumerPage />} />
          <Route path="/general-details" element={<GeneralDetailsPage />} />
          <Route path="/inspection-list" element={<InspectionListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
