import { Link, useLocation } from 'react-router-dom';

const VerifyEmailInstruction = () => {
  const location = useLocation();
  const email = location.state?.email || 'your email';

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Verify Your Email</h2>
        <p className="text-gray-600 mb-4">
        Мы отправили ссылку для подтверждения по адресу <span className="font-semibold">{email}</span>. 
        Пожалуйста, проверьте свой почтовый ящик и перейдите по ссылке, чтобы подтвердить свою учетную запись.
        </p>
        <div className="text-center">
          <Link to="/login" className="text-blue-600 hover:underline">
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailInstruction;