import { Button } from "antd";
import { Link } from "react-router-dom";
import { SOnboarding } from "./styles";

export default function Onboarding() {
  return (
    <SOnboarding>
      <img src="/images/lap.jpeg" alt="video" width={250} />
      <p style={{ color: "black" }}>Manager</p>
      <Link to="/login">
        <Button type="primary">Login</Button>
      </Link>
    </SOnboarding>
  );
}
