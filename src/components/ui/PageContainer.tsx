type Props = {
  children: React.ReactNode;
};

export default function PageContainer({ children }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {children}
    </div>
  );
}
