import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import AuthGuard from './components/AuthGuard';

// Lazy Loading for Performance Optimization
const Home = lazy(() => import('./pages/Home'));
const RegistrationForm = lazy(() => import('./components/RegistrationForm'));
const VerifyEmailInstruction = lazy(() => import('./components/VerifyEmailInstruction'));
const VerifyEmailPage = lazy(() => import('./components/VerifyEmailPage'));
const UserAuthorization = lazy(() => import('./components/UserAuthorization'));
const PasswordRecovery = lazy(() => import('./components/PasswordRecovery'));
const PersonalAccount = lazy(() => import('./components/PersonalAccount'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage')); // New 404 Page

function App() {
  return (
    <Router>
      {/* Navbar is always present */}
      <Navbar />

      <div className="app-content">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/verify-email-instruction" element={<VerifyEmailInstruction />} />
            <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
            <Route path="/login" element={<UserAuthorization />} />
            <Route path="/password-recovery" element={<PasswordRecovery />} />

            {/* Protected Routes (Require Authentication) */}
            <Route
              path="/personal-account/profile"
              element={
                <AuthGuard>
                  <PersonalAccount />
                </AuthGuard>
              }
            />

            {/* Catch-all Route (404 Page) */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
