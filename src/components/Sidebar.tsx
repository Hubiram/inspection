import { NavLink, useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";
import { useState } from "react";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { checklistConfig } from "../data/checklistConfig";


export default function Sidebar() {
  const { role, setRole } = useRole();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const adminLinks = [
    { label: "Dashboard", to: "/admin" },
    { label: "Checklist Setup", to: "/admin/checklist" },
    { label: "Question Form Setup", to: "/admin/questions" },
    { label: "Organization Details", to: "/admin/org" },
  ];

  const selectedValveType = "Gate Valve";

  const clientLinks =
    checklistConfig
      .find((c) => c.valveType === selectedValveType)
      ?.categories.map((cat) => ({
        label: cat,
        to: `/client/inspection/${encodeURIComponent(cat)}`,
      })) || [];

  const links = role === "admin" ? adminLinks : clientLinks;

  return (
    <aside
      className={`h-screen
        bg-black/30 backdrop-blur-xl
        border-r border-white/10
        flex flex-col
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}`}
    >
      <h2 className="text-lg font-semibold mb-6">
        <div className="flex items-center justify-between px-4 py-5">
          {!collapsed && (
            <h2 className="text-lg font-semibold">
              {role === "admin" ? "Admin" : "Checklist"}
            </h2>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-white/10 transition"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>
      </h2>

      <nav className="flex-1 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3
              px-3 py-2 rounded-lg
              transition ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:bg-white/5"
              }`
            }
          >
            <span className="text-lg">•</span>

            {!collapsed && <span>{link.label}</span>}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={() => {
          setRole(null);
          navigate("/");
        }}
        className="px-4 pb-6 flex items-center gap-3 text-red-400 hover:text-red-300"
      >
        <LogOut size={18} />
      </button>
    </aside>
  );
}
