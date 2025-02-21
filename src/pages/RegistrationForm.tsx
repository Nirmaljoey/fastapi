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
  offer: boolean;
};

const RegistrationForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>({
    defaultValues: {
      privacyPolicy: false,
      termsOfService: false,
      offer: false,
    },
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
      const response = await registerUser({
        email: data.email.trim(),
        password: data.password,
        first_name: data.first_name.trim(),
        phone: data.phone.trim(),
      });
      if (response.success) {
        navigate('/login', { state: { success: 'Registration successful! Please log in.' } });
      } else {
        setError(response.error || 'Registration failed');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F5F5] relative">
      <div className="relative mt-20">
        <Link to="/" className="absolute top-[-50px] left-0 text-base text-black hover:underline mb-2">← Назад</Link>
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <h2 className="text-2xl font-bold text-center mb-4 text-black">Регистрация</h2>
          {error && (
            <div className="text-red-600 text-sm mb-4 text-center border border-red-500 p-2 rounded">
              ⚠️ {error}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-black">Имя*</label>
              <input
                id="first_name"
                {...register('first_name', { required: 'Имя обязательно', minLength: { value: 2, message: 'Минимум 2 символа' } })}
                placeholder="Введите ваше имя"
                className="w-full p-2 border  rounded-xl bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
              {errors.first_name && <p className="text-red-500 text-xs">{errors.first_name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black">E-mail*</label>
              <input
                id="email"
                {...register('email', { required: 'Email обязателен', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Некорректный email' } })}
                placeholder="example@domain.com"
                className="w-full p-2 border rounded-xl bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-black">Телефон*</label>
              <input
                id="phone"
                {...register('phone', { required: 'Телефон обязателен', pattern: { value: /^\+7\d{10}$/, message: 'Формат: +71234567890' } })}
                placeholder="+71234567890"
                className="w-full p-2 border  rounded-xl bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-black">Пароль*</label>
              <input
                id="password"
                {...register('password', { required: 'Пароль обязателен', minLength: { value: 6, message: 'Минимум 6 символов' }, validate: (v) => /[A-Z]/.test(v) || 'Требуется заглавная буква' })}
                type={showPassword ? 'text' : 'password'}
                placeholder="Не менее 6 символов"
                className="w-full p-2 border  rounded-xl bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
              <div className="absolute top-9 right-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">Повторите пароль*</label>
              <input
                id="confirmPassword"
                {...register('confirmPassword', { required: 'Подтвердите пароль', validate: (v) => v === password || 'Пароли не совпадают' })}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Повторите ваш пароль"
                className="w-full p-2 border  rounded-xl bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
              <div className="absolute top-9 right-3 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <label className="relative flex items-center cursor-pointer">
                  <input
                    id="termsOfService"
                    type="checkbox"
                    {...register('termsOfService', { required: 'Необходимо принять условия использования' })}
                    className="appearance-none w-3.5 h-3.5 border border-black rounded bg-white checked:bg-yellow-400 checked:border-yellow-400 peer"
                  />
                  <svg
                    className="absolute left-0 top-0 w-3.5 h-3.5 text-black opacity-0 peer-checked:opacity-100"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </label>
                <label htmlFor="termsOfService" className="text-black ml-2">
                  Согласен с{' '}
                  <a href="https://dev.21yard.com/conf.pdf" className="text-black hover:underline">
                    Политика конфиденциальности
                  </a>
                </label>
              </div>
              {errors.termsOfService && <p className="text-red-500 text-xs">{errors.termsOfService.message}</p>}

              <div className="flex items-center">
                <label className="relative flex items-center cursor-pointer">
                  <input
                    id="privacyPolicy"
                    type="checkbox"
                    {...register('privacyPolicy', { required: 'Необходимо принять условия использования' })}
                    className="appearance-none w-3.5 h-3.5 border border-black rounded bg-white checked:bg-yellow-400 checked:border-yellow-400 peer"
                  />
                  <svg
                    className="absolute left-0 top-0 w-3.5 h-3.5 text-black opacity-0 peer-checked:opacity-100"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </label>
                <label htmlFor="privacyPolicy" className="text-black ml-2">
                  Согласен с{' '}
                  <a href="https://dev.21yard.com/rules.pdf" className="text-black hover:underline">
                    Условия использования сервиса
                  </a>
                </label>
              </div>
              {errors.privacyPolicy && <p className="text-red-500 text-xs">{errors.privacyPolicy.message}</p>}

              <div className="flex items-center">
                <label className="relative flex items-center cursor-pointer">
                  <input
                    id="offer"
                    type="checkbox"
                    {...register('offer', { required: 'Необходимо принять условия оферты' })}
                    className="appearance-none w-3.5 h-3.5 border border-black rounded bg-white checked:bg-yellow-400 checked:border-yellow-400 peer"
                  />
                  <svg
                    className="absolute left-0 top-0 w-3.5 h-3.5 text-black opacity-0 peer-checked:opacity-100"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </label>
                <label htmlFor="offer" className="text-black ml-2">
                  Принимаю условия{' '}
                  <a href="https://dev.21yard.com/oferta.pdf" className="text-black hover:underline">
                    Оферты
                  </a>
                </label>
              </div>
              {errors.offer && <p className="text-red-500 text-xs">{errors.offer.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-[#E0DCC2] text-white p-2 rounded-xl font-bold hover:bg-yellow-600 transition-colors duration-300 disabled:bg-yellow-300"
              disabled={loading}
            >
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </form>
          <p className="text-sm text-black mt-4 text-center">
            Уже есть аккаунт? <Link to="/login" className="text-blue-600 hover:underline">Войти</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;