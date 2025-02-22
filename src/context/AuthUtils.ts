import { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return !!localStorage.getItem('access_token');
    });
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsAuthenticated(true);
            fetchUserProfile(token);
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }
    }, []);

    const fetchUserProfile = async (token: string) => {
        try {
            const response = await fetch('/api/marketplace/auth/users/me', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }
            const data = await response.json();
            setUser({
                name: data.data.first_name || 'User',
                email: data.data.email || '',
            });
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setUser(null);
        }
    };

    const login = async (email: string, password: string) => {
        await AuthService.login(email, password);
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsAuthenticated(true);
            await fetchUserProfile(token);
        }
    };

    const logout = async () => {
        await AuthService.logout();
        setIsAuthenticated(false);
        setUser(null);
    };

    return { isAuthenticated, user, login, logout };
};