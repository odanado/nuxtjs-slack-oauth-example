import Cookie from 'js-cookie';
import cookie from 'cookie-parse';


export const setTokenAndUser = (token, user) => {
  if (process.SERVER_BUILD) return;
  window.localStorage.setItem('token', token);
  window.localStorage.setItem('user', user);
  Cookie.set('token', token);
  Cookie.set('user', user);
};

export const getTokenAndUserServer = (req) => {
  if (!req.headers.cookie) return {};
  const cookies = cookie.parse(req.headers.cookie);
  const { token, user } = cookies;
  return { token, user };
};

export const getTokenAndUser = () => {
  const { token, user } = window.localStorage;
  return { token, user };
};

export const unsetTokenAndUser = () => {
  if (process.SERVER_BUILD) return;
  window.localStorage.removeItem('user');
  window.localStorage.removeItem('token');
  Cookie.remove('token');
  Cookie.remove('user');
};
