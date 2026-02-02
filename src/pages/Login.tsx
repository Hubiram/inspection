import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import AuthLayout from "../layouts/AuthLayout";
import { useRole } from "../context/RoleContext";

export default function Login() {
  const navigate = useNavigate();
  const { setRole } = useRole();

  return (
    <AuthLayout>
      <Card className="w-full max-w-sm p-8 text-center">
        <h1 className="text-2xl font-semibold mb-2">Inspection MS</h1>
        <p className="text-gray-300 mb-6">Please select your login type</p>

        <div className="space-y-4">
          <Button variant="admin" onClick={() => {
            setRole("admin");
            navigate("/admin");
          }}>
            Author Login
          </Button>

          <Button
            onClick={() => {
              setRole("client");
              navigate("/client/inspection");
            }}
          >
            Performer Login
          </Button>
        </div>
      </Card>
    </AuthLayout>
  );
}
