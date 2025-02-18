import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import UserAuthorization from './components/UserAuthorization';
import PersonalAccount from './components/PersonalAccount';
import VerifyEmailInstruction from './components/VerifyEmailInstruction';
import VerifyEmailPage from './components/VerifyEmailPage';
import AuthGuard from './components/AuthGuard';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PasswordRecovery from './components/PasswordRecovery';

function App() {
  return (
    <Router>
      {/* Navbar is always present */}
      <Navbar />
      <div className="app-content">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path='/verify-email-instruction' element={<VerifyEmailInstruction />} />
          <Route path="/verify-email/:token"  element={<VerifyEmailPage />} />
          <Route path="/login" element={<UserAuthorization />} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />

          {/* Protected route */}
          <Route
            path="/personal-account/profile"
            element={
              <AuthGuard>
                <PersonalAccount />
              </AuthGuard>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
