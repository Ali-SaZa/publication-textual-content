import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      token: null,
      username: null,
      email: null,
      image: null,
    };
  },
  mutations,
  actions,
  getters,
};
