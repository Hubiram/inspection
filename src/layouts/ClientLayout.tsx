import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function ClientLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex items-center justify-center p-8">
        <Outlet />
      </main>
    </div>
  );
}
