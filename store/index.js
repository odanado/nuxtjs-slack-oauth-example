/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import Vue from 'vue';
import Vuex from 'vuex';
import Slack from 'slack';

import { getTokenAndUserServer } from '~/utils/auth';

Vue.use(Vuex);

export const state = {
  token: null,
  user: null,
  name: null,
  imageUrl: null,
};

export const mutations = {
  setToken(state, token) {
    state.token = token || null;
  },
  setUser(state, user) {
    state.user = user || null;
  },
  setName(state, name) {
    state.name = name || null;
  },
  setImageUrl(state, imageUrl) {
    state.imageUrl = imageUrl || null;
  },
};

export const actions = {
  async fetchUserInfo({ state, commit }) {
    const { token, user } = state;
    if (token && user) {
      const data = await Slack.users.info({ token, user });
      commit('setName', data.user.name);
      commit('setImageUrl', data.user.profile.image_192);
    }
  },
  async nuxtServerInit({ commit, dispatch }, { req }) {
    const { token, user } = getTokenAndUserServer(req);
    commit('setToken', token);
    commit('setUser', user);
    await dispatch('fetchUserInfo');
  },
};

export const getters = {
  isAuthenticated(state) {
    return !!state.token;
  },
};

const createStore = () => new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});

export default createStore;
