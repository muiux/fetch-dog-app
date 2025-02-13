import { useLogin } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending, isSuccess } = useLogin();

  useEffect(() => {
    if (isSuccess) {
      console.log("Login successful");
      navigate("/search");
    }
  }, [isSuccess, navigate]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;

      console.log("Logging in with:", { name, email });

      await login({ name, email });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen p-4">
      <form
        className="flex max-w-md w-full flex-col gap-4"
        onSubmit={handleLogin}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Your name" />
          </div>
          <TextInput
            id="name"
            name="name"
            placeholder="Ronnie Sarris"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            name="email"
            type="email"
            placeholder="ronniesarris11@gmail.com"
            required
          />
        </div>
        <Button type="submit" isProcessing={isPending}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
