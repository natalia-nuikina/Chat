export const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

export const logOut = () => {
  localStorage.removeItem('userId');
  window.location.href = '/';
};
