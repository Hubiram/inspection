import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ClientStart from "./pages/client/ClientStart";
import ClientLayout from "./layouts/ClientLayout";
import InspectionForm from "./pages/client/InspectionForm";
import ChecklistSetup from "./pages/admin/ChecklistSetup";
import AdminLayout from "./layouts/AdminLayout";
import QuestionFormSetup from "./pages/admin/QuestionFormSetup";
import MobileInspection from "./pages/client/MobileInspection";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/client/inspection" element={<MobileInspection />} />
      <Route path="/client" element={<ClientStart />} />
      <Route path="/client/inspection" element={<ClientLayout />}>
        <Route path=":section" element={<InspectionForm />} />
      </Route>
      <Route
        path="/admin/checklist"
        element={
          <AdminLayout>
            <ChecklistSetup />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/questions"
        element={
          <AdminLayout>
            <QuestionFormSetup />
          </AdminLayout>
        }
      />
      <Route path="/client/inspection" element={<MobileInspection />} />
    </Routes>
  );
}
