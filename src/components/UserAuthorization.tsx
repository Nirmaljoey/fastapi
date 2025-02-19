import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import AuthService from '../services/AuthService';

type LoginFormValues = {
  email: string;
  password: string;
};

const UserAuthorization: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setLoading(true);
    setError(null);

    try {
      await AuthService.login(data.email, data.password);
      // Redirect is handled inside AuthService.login()
    } catch (err: any) {
      console.error('🚨 Authentication Error:', err);
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-100 to-yellow-300">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
        <Link to="/" className="text-sm text-blue-600 hover:underline mb-4 block">← Back</Link>
        <h2 className="text-2xl font-bold mb-4 text-center text-black">🔐 Authorization</h2>

        {error && (
          <div className="text-red-600 text-sm mb-4 text-center border border-red-500 p-2 rounded">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-gray-800 text-sm font-medium">📧 E-mail</label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Please enter a valid email address',
                },
              })}
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black bg-white"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block mb-1 text-gray-800 text-sm font-medium">🔑 Password</label>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              })}
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black bg-white"
            />
            <div
              className="absolute top-9 right-3 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div className="text-sm text-center text-blue-600 mb-4">
            <Link to="/password-recovery" className="hover:underline">Forgot your password?</Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition duration-200 disabled:bg-yellow-300"
          >
            {loading ? '🔄 Logging in...' : '🚪 Enter'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-blue-700">
          No account?{' '}
          <Link to="/register" className="hover:underline font-medium">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default UserAuthorization;
