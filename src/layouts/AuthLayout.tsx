import PageContainer from "../components/ui/PageContainer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageContainer>{children}</PageContainer>;
}
