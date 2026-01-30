type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: Props) {
  return (
    <div
      className={`
        bg-white/10 backdrop-blur-xl
        rounded-2xl shadow-xl
        border border-white/10
        ${className}
      `}
    >
      {children}
    </div>
  );
}
