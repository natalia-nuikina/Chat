const routes = {
  loginPath: () => '/api/v1/login',
  signupPath: () => '/api/v1/signup',
  channelsPath: () => '/api/v1/channels',
  channelPath: (id) => `/api/v1/channels/${id}`,
  messagesPath: () => '/api/v1/messages',
  pages: {
    loginPage: () => '/login',
    signUpPage: () => '/signup',
    chatPage: () => '/',
    page404: () => '*',
  },
};

export default routes;
