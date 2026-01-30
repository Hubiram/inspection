type Props = {
  children: React.ReactNode;
  variant?: "admin" | "client";
  onClick?: () => void;
};

export default function Button({
  children,
  variant = "admin",
  onClick,
}: Props) {
  const styles =
    variant === "admin"
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-green-600 hover:bg-green-700";

  return (
    <button
      onClick={onClick}
      className={`
        w-full py-3 rounded-xl font-medium
        transition-all duration-200
        ${styles}
      `}
    >
      {children}
    </button>
  );
}
