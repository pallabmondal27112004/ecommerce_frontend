import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
    const navigate = useNavigate();
    const isLogin = useSelector((store) => store.auth);
    const [hasChecked, setHasChecked] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Give time for auth state to stabilize
        timeoutRef.current = setTimeout(() => {
            setHasChecked(true);

            if (isLogin.isAuthenticated) {
                setShouldRender(true);
            } else {
                // Only navigate if we're sure user is not authenticated
                navigate('/login', { replace: true });
            }
        }, 300);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [isLogin.isAuthenticated, navigate]);

    // Show loading during initial check
    if (!hasChecked) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Checking authentication...</p>
                </div>
            </div>
        );
    }

    // Only render children if authenticated and should render
    if (isLogin.isAuthenticated && shouldRender) {
        return children;
    }

    // Show redirecting message
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
            <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Redirecting to login...</p>
            </div>
        </div>
    );
};

export default AuthGuard;