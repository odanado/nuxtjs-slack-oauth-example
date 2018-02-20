<template>
  <p>Signing in...</p>
</template>

<script>

import { fetchToken } from '~/utils/slack';
import { setTokenAndUser } from '~/utils/auth';

export default {
  mounted() {
    const { code } = this.$route.query;
    fetchToken(code).then((data) => {
      const token = data.access_token;
      const user = data.user_id;

      setTokenAndUser(token, user);

      this.$store.commit('setToken', token);
      this.$store.commit('setUser', user);
      this.$store.dispatch('fetchUserInfo');

      this.$router.replace('/');
    });
  },
};
</script>
