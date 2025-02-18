import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../api';

const VerifyEmailPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        if (token) {
          await verifyEmail(token);
          navigate('/login', { 
            state: { success: 'Email verified successfully!' } 
          });
        }
      } catch (error) {
        navigate('/login', { 
          state: { error: 'Invalid or expired verification link' } 
        });
      }
    };
    
    verify();
  }, [token, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Verifying Email...</h2>
        <p className="text-gray-600 text-center">Please wait while we verify your email address.</p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;