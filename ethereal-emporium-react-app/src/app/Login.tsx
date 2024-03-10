import { css } from '@emotion/react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useAuthentication } from './hooks/useAuthentication';

const Login = () => {
  const { login } = useAuthentication();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;
    login({ email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-4 bg-white rounded shadow-md w-80">
        <h2 className="mb-4 text-xl font-semibold text-center text-gray-700">
          Login
        </h2>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            name="email"
            className="w-full mb-4"
            label="Email"
            variant="outlined"
          />
          <TextField
            name="password"
            className="w-full mb-4"
            label="Password"
            type="password"
            variant="outlined"
          />
          <Button
            className="w-full mt-10"
            type="submit"
            variant="contained"
            color="secondary"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
