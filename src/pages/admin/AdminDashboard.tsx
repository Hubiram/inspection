import AdminLayout from "../../layouts/AdminLayout";
import { useState } from "react";
import Modal from "../../components/ui/Modal";
import CreateValveTemplateForm from "./CreateValveTemplateForm";
import CreateSectionForm from "./CreateSectionForm";

export default function AdminDashboard() {
  const valveTemplates = [
    {
      slNo: "001",
      tagNo: "TAG-1001",
      valve: "Gate Valve",
      valveCode: "GV-150",
      valveType: "Gate",
      application: "Cooling Line",
    },
    {
      slNo: "002",
      tagNo: "TAG-1002",
      valve: "Ball Valve",
      valveCode: "BV-300",
      valveType: "Ball",
      application: "Steam Line",
    },
  ];

  const [isValveModalOpen, setIsValveModalOpen] = useState(false);

  const sections = [
    {
      id: "SEC-01",
      name: "Safety & Accessibility",
      valves: 5,
    },
    {
      id: "SEC-02",
      name: "External Condition",
      valves: 3,
    },
  ];

  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);


  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        </div>

        {/* Valve Templates Table */}
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Valve Templates</h2>
            <button
              onClick={() => setIsValveModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
            >
              Create New Valve Template
            </button>
          </div>

          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 text-gray-300">
              <tr>
                <th className="py-2">SL. No.</th>
                <th>Tag No.</th>
                <th>Valve</th>
                <th>Valve Code</th>
                <th>Valve Type</th>
                <th>Application</th>
              </tr>
            </thead>
            <tbody>
              {valveTemplates.map((valve) => (
                <tr
                  key={valve.slNo}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="py-3">{valve.slNo}</td>
                  <td>{valve.tagNo}</td>
                  <td>{valve.valve}</td>
                  <td>{valve.valveCode}</td>
                  <td>{valve.valveType}</td>
                  <td>{valve.application}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
          isOpen={isValveModalOpen}
          onClose={() => setIsValveModalOpen(false)}
          title="Create Valve Template"
        >
          <CreateValveTemplateForm onClose={() => setIsValveModalOpen(false)} />
        </Modal>

        {/* Sections Table */}
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Inspection Sections</h2>
            <button
              onClick={() => setIsSectionModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition"
            >
              Create New Section
            </button>
          </div>

          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 text-gray-300">
              <tr>
                <th className="py-2">Section ID</th>
                <th>Section Name</th>
                <th>No. of Questions</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section) => (
                <tr
                  key={section.id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="py-3">{section.id}</td>
                  <td>{section.name}</td>
                  <td>{section.valves}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={isSectionModalOpen}
        onClose={() => setIsSectionModalOpen(false)}
        title="Create Inspection Section"
      >
        <CreateSectionForm onClose={() => setIsSectionModalOpen(false)} />
      </Modal>
    </AdminLayout>
  );
}
