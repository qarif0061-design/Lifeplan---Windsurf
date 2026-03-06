import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';

interface RememberMeRedirectProps {
  children: React.ReactNode;
}

const RememberMeRedirect: React.FC<RememberMeRedirectProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useUser();

  useEffect(() => {
    if (loading) return;
    // Only apply logic on root path and not already on auth/dashboard
    if (location.pathname !== '/') return;
    // If user is logged in and rememberMe was set, redirect to dashboard
    if (user && localStorage.getItem('rememberMe') === 'true') {
      navigate('/dashboard', { replace: true });
    }
  }, [user, loading, location.pathname, navigate]);

  return <>{children}</>;
};

export default RememberMeRedirect;
