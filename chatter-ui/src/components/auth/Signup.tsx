import { useCreateUser } from "../../hooks/useCreateUser";
import { useLogin } from "../../hooks/useLogin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "./Auth";

const Signup = () => {
  const [createUser] = useCreateUser();
  const { login } = useLogin();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <Auth
      submitLabel="Signup"
      error={error}
      onSubmit={async ({ email, password }) => {
        try {
          await createUser({
            variables: {
              createUserInput: {
                email,
                password,
              },
            },
          });
          setError("");
          // Immediately log in the user
          await login({ email, password });
          // Redirect to home page
          navigate("/home", { replace: true });
        } catch (err) {
          setError("Signup failed. Please try again.");
        }
      }}
    >
      {/* You can add a link to login here if you want */}
    </Auth>
  );
};

export default Signup;