import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  first_name: string;
  phone: string;
  privacyPolicy: boolean;
  termsOfService: boolean;
};

const RegistrationForm: React.FC = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    watch 
  } = useForm<FormValues>({
    defaultValues: {
      privacyPolicy: false,
      termsOfService: false
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const password = watch('password');

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        email: data.email.trim(),
        password: data.password,
        first_name: data.first_name.trim(),
        phone: data.phone.trim()
      };

      const response = await registerUser(payload);

      if (response.success) {
        // Redirect to login page after successful registration
        navigate('/login', {
          state: { 
            success: 'Registration successful! Please log in.' 
          }
        });
      } else {
        setError(response.error || 'Registration failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-200 to-yellow-400">
      <div className="bg-white p-6 rounded-3xl shadow-2xl w-96 border border-yellow-500">
        <Link to="/" className="text-sm text-blue-600 hover:underline mb-2">← Back</Link>
        <h2 className="text-3xl font-bold text-center mb-6 text-black">Регистрация</h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-black">Имя*</label>
            <input
              {...register('first_name', { 
                required: 'Имя обязательно для заполнения',
                minLength: {
                  value: 2,
                  message: 'Имя должно содержать минимум 2 символа'
                }
              })}
              placeholder="Введите ваше имя"
              className="w-full p-2 border border-yellow-400 rounded-xl bg-transparent text-black text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
            {errors.first_name && (
              <p className="text-red-500 text-xs">{errors.first_name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-black">E-mail*</label>
            <input
              {...register('email', { 
                required: 'Email обязателен для заполнения',
                pattern: { 
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Некорректный формат email'
                }
              })}
              placeholder="example@domain.com"
              className="w-full p-2 border border-yellow-400 rounded-xl bg-transparent text-black text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-black">Телефон*</label>
            <input
              {...register('phone', { 
                required: 'Телефон обязателен для заполнения',
                pattern: {
                  value: /^\+7\d{10}$/,
                  message: 'Формат: +71234567890'
                }
              })}
              placeholder="+71234567890"
              className="w-full p-2 border border-yellow-400 rounded-xl bg-transparent text-black text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-black">Пароль*</label>
            <input
              {...register('password', { 
                required: 'Пароль обязателен для заполнения',
                minLength: { 
                  value: 6, 
                  message: 'Минимум 6 символов' 
                },
                validate: value => 
                  /[A-Z]/.test(value) || 'Пароль должен содержать заглавную букву'
              })}
              placeholder="Не менее 6 символов"
              type={showPassword ? 'text' : 'password'}
              className="w-full p-2 border border-yellow-400 rounded-xl bg-transparent text-black text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
            <div 
              className="absolute top-9 right-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-black">Повторите пароль*</label>
            <input
              {...register('confirmPassword', {
                required: 'Подтвердите пароль',
                validate: value => 
                  value === password || 'Пароли не совпадают'
              })}
              placeholder="Повторите ваш пароль"
              type={showConfirmPassword ? 'text' : 'password'}
              className="w-full p-2 border border-yellow-400 rounded-xl bg-transparent text-black text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
            <div 
              className="absolute top-9 right-3 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Agreements */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('privacyPolicy', { 
                  required: 'Необходимо принять условия конфиденциальности'
                })}
                className="mr-2"
              />
              <span>
                Согласен с{' '}
                <a href="/privacy" className="text-blue-500 hover:underline">
                  политикой конфиденциальности
                </a>
              </span>
            </div>
            {errors.privacyPolicy && (
              <p className="text-red-500 text-xs">{errors.privacyPolicy.message}</p>
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('termsOfService', { 
                  required: 'Необходимо принять условия использования'
                })}
                className="mr-2"
              />
              <span>
                Согласен с{' '}
                <a href="/terms" className="text-blue-500 hover:underline">
                  условиями использования
                </a>
              </span>
            </div>
            {errors.termsOfService && (
              <p className="text-red-500 text-xs">{errors.termsOfService.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white p-2 rounded-xl font-bold hover:bg-yellow-600 transition-colors duration-300"
            disabled={loading}
          >
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>

        <p className="text-sm text-black mt-4 text-center">
          Уже есть аккаунт?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;