import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthUtils";
import "./login.css";

type LoginFormValues = {
  email: string;
  password: string;
};

const UserAuthorization: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginFormValues>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await login(data.email, data.password);
      reset();
      navigate("/personal-account/profile");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appContainer">
      {/* Sidebar for larger screens */}
      <div className="sidebar">
        <h2 className="text-xl font-bold">Welcome Back!</h2>
        <p className="mt-2">Log in to access your account.</p>
      </div>

      {/* Form Container */}
      <div className="formContainer">
        <Link to="/" className="link mb-4 inline-block">← Back</Link>
        <div className="bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-center text-black">🔐 Login</h2>
          {error && (
            <div className="text-red-600 text-sm mb-4 text-center border border-red-500 p-2 rounded">
              ⚠️ {error}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 text-gray-800 text-sm font-medium">📧 Email</label>
              <input
                id="email"
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Enter your email"
                className="inputField"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1 text-gray-800 text-sm font-medium">🔑 Password</label>
              <input
                id="password"
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="Enter your password"
                className="inputField"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div className="text-sm text-center mb-4">
              <Link to="/password-recovery" className="link">Forgot password? Recover</Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`btn ${loading ? "bg-yellow-300 cursor-not-allowed" : "hover:bg-yellow-600"}`}
            >
              {loading ? "🔄 Logging in..." : "Sign In"}
            </button>
          </form>
          <div className="text-sm text-center mt-4 text-black">
            No account? <Link to="/register" className="link">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuthorization;
