import React, { useState } from 'react';

const PasswordRecovery: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setMessage(`Ссылка для восстановления пароля была отправлена по адресу ${email}`);
    } else {
      setMessage(' Пожалуйста, введите действительный адрес электронной почты.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F5F5] relative">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <a href="/login" className="text-sm text-blue-600 hover:underline mb-4 block">
          ← Back to Login
        </a>
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Восстановление пароля</h2>

        <p className="text-sm mb-4 text-gray-700 text-center">
          Пожалуйста, введите свой адрес электронной почты. Мы отправим вам ссылку для сброса пароля.
        </p>

        {message && (
          <div className={`text-center text-sm mb-4 ${message.includes('⚠️') ? 'text-red-600' : 'text-green-600'} border p-2 rounded border-${message.includes('⚠️') ? 'red-500' : 'green-500'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите свой адрес электронной почты"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black bg-white text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 text-sm transition duration-200"
          >
            🔍Отправить ссылку для восстановления
          </button>
        </form>

        <div className="text-sm text-center text-blue-700 mt-4">
          Помните свой пароль? {' '}
          <a href="/login" className="hover:underline font-medium">войти</a>
        </div>

        <p className="mt-3 text-center text-sm text-blue-700">
          У вас нет учетной записи?{' '}
          <a href="/register" className="hover:underline font-medium">зарегистрировать</a>
        </p>
      </div>
    </div>
  );
};

export default PasswordRecovery;
