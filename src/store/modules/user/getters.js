export default {
  token(state) {
    return state.token;
  },
  username(state) {
    return state.username;
  },
  email(state) {
    return state.email;
  },
  image(state) {
    return state.image;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
};
