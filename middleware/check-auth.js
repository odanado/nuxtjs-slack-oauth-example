import { getTokenAndUser, getTokenAndUserServer } from '~/utils/auth';

export default function ({ store, req }) {
  const isServer = process.server;

  if (isServer && !req) return;

  const { token, user } = isServer ? getTokenAndUserServer(req) : getTokenAndUser();
  if (token && user) {
    store.commit('setToken', token);
    store.commit('setUser', user);

    store.dispatch('fetchUserInfo');
  }
}
