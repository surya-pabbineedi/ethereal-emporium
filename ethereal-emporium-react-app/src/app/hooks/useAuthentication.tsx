import { useLocalStorage } from '@uidotdev/usehooks';
import React, { useContext, createContext, useMemo } from 'react';
import { LoginRequest } from '../models/LoginRequest';
import { User } from '../models/User';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthenticationContext = createContext<{
  isAuthenticated: boolean;
  user?: User;
  login: Function;
  logout: Function;
}>({
  isAuthenticated: false,
  user: undefined,
  login: () => {},
  logout: () => {},
});

export const AuthenticationProvider = () => {
  const [user, setUser] = useLocalStorage<User | undefined>(
    'ee_user',
    undefined
  );
  const navigate = useNavigate();

  const login = async (loginRequest: LoginRequest) => {
    setUser({
      email: loginRequest.email,
      password: loginRequest.password,
      token: '',
    });
    navigate('dashboard');
  };

  const logout = async () => {
    setUser(undefined);
    navigate('/', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: !!user,
    }),
    [user]
  );
  return (
    <AuthenticationContext.Provider value={value}>
      <Outlet />
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  return useContext(AuthenticationContext);
};
