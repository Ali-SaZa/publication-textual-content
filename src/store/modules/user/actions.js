export default {
  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },
  async signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url = "https://api.realworld.io/api/users/login";
    let userData = JSON.stringify({
      user: {
        email: payload.email,
        password: payload.password,
      },
    });

    if (mode === "signup") {
      url = "https://conduit.productionready.io/api/users";
      userData = JSON.stringify({
        user: {
          email: payload.email,
          password: payload.password,
          username: payload.username,
        },
      });
    }
    const response = await fetch(url, {
      method: "POST",
      body: userData,
      headers: {
        "content-type": "application/json",
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      let errorMessage = "";
      if (responseData.errors.email) {
        errorMessage = "email " + responseData.errors.email[0];
      }
      if (responseData.errors.username) {
        errorMessage += ", username " + responseData.errors.username[0];
      }
      if (errorMessage.length) {
        throw new Error(errorMessage);
      }
      throw new Error("Authentication failed. Make sure your login information is correct.");
    }
    return context.dispatch("updateStorage", responseData);
  },
  async updateUser(context, payload) {
    const response = await fetch("https://conduit.productionready.io/api/user", {
      method: "PUT",
      body: JSON.stringify({
        user: {
          bio: payload.bio,
          email: payload.email,
          image: payload.image,
          password: payload.password,
          username: payload.username,
        },
      }),
      headers: {
        authorization: "Token " + context.getters.token,
        "content-type": "application/json",
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error("Update failed.");
    }
    return context.dispatch("updateStorage", responseData);
  },
  updateStorage(context, responseData) {
    localStorage.setItem("token", responseData.user.token);
    localStorage.setItem("username", responseData.user.username);
    localStorage.setItem("email", responseData.user.email);
    localStorage.setItem("image", responseData.user.image);
    context.commit("setUser", {
      token: responseData.user.token,
      username: responseData.user.username,
      email: responseData.user.email,
      image: responseData.user.image,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const image = localStorage.getItem("image");

    if (token && email) {
      context.commit("setUser", {
        token: token,
        username: username,
        email: email,
        image: image,
      });
    }
  },
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("image");

    context.commit("setUser", {
      token: null,
      username: null,
      email: null,
      image: null,
    });
  },
};
