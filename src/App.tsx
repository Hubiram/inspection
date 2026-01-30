import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ClientStart from "./pages/client/ClientStart";
import ClientLayout from "./layouts/ClientLayout";
import InspectionForm from "./pages/client/InspectionForm";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/client" element={<ClientStart />} />
      <Route path="/client/inspection" element={<ClientLayout />}>
        <Route path=":section" element={<InspectionForm />} />
      </Route>
    </Routes>
  );
}
