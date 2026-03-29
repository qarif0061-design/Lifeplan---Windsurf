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
    // Prevent redirect loop: only redirect if user exists, rememberMe is true, and not already redirected
    if (user && localStorage.getItem('rememberMe') === 'true' && !sessionStorage.getItem('rememberMeRedirectedFromRoot')) {
      sessionStorage.setItem('rememberMeRedirectedFromRoot', 'true');
      navigate('/dashboard', { replace: true });
    }
    
    // Additional safeguard: Clear any stale redirect flags
    if (sessionStorage.getItem('rememberMeRedirectedFromRoot') && !user) {
      sessionStorage.removeItem('rememberMeRedirectedFromRoot');
    }
  }, [user, loading, location.pathname, navigate]);

  return <>{children}</>;
};

export default RememberMeRedirect;
