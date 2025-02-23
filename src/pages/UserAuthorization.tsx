import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthUtils";

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
    <div className="flex items-center justify-center min-h-screen bg-[#F5F5F5] relative">
      <div className="relative mt-20">
        <Link to="/" className="absolute top-[-50px] left-0 text-base text-black hover:underline mb-2">← Назад</Link>
        <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
          <h2 className="text-2xl font-bold mb-4 text-center text-black">🔐 Login</h2>
          {error && (
            <div className="text-red-600 text-sm mb-4 text-center border border-red-500 p-2 rounded">
              ⚠️ {error}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 bg-transparent">
              <label htmlFor="email" className="block mb-1 text-gray-800 text-sm font-medium">📧 Email</label>
              <input
                id="email"
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 bg-transparent py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
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
                className="w-full px-3 py-2 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div className="text-sm text-center mb-4">
              <Link to="/password-recovery" className="text-black hover:underline">Забыли пароль? Восстановить</Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition duration-200 disabled:bg-yellow-300"
            >
              {loading ? "🔄 Logging in..." : "Sign In"}
            </button>
          </form>
          <div className="text-sm text-center mt-4 text-black">
            Нет аккаунта? <Link to="/register" className="text-black hover:underline">Зарегистрироваться</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuthorization;
