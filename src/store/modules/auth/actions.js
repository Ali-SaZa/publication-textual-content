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

    if (mode === "signup") {
      url = "https://conduit.productionready.io/api/users";
    }

    console.log("payload:", payload);

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        user: {
          email: payload.email,
          password: payload.password,
        },
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error("Authentication failed. Make sure your login information is correct.");
    }
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
