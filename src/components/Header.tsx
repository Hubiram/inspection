import { UserCircle } from "lucide-react";

interface HeaderProps {
  title: string;
  collapsed?: boolean;
}

export default function Header({ title, collapsed = false }: HeaderProps) {
  return (
    <header className={`fixed top-0 z-10 flex items-center justify-between bg-gray-800 px-6 py-4 shadow-sm transition-all duration-300 ${collapsed ? 'left-16' : 'left-64'} right-0`}>
      <h1 className="text-xl font-semibold text-white">
        {title}
      </h1>
      <UserCircle size={32} className="text-white" />
    </header>
  );
}
