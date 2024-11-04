import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// Custom Hook to access the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component that will wrap our app and provide the token context
export const AuthProvider = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    const [token, setToken] = useState<string | null>(null);

    const login = (userToken: string) => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };

    const removeToken = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    React.useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <AuthContext.Provider value= {{ token, login, logout }
}>
    { children }
    </AuthContext.Provider>
  );
};
