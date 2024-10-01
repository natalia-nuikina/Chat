export const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  return ((userId && userId.token) ? { Authorization: `Bearer ${userId.token}` } : {});
};

export const mapStateToProps = ({ channelsReducer, messagesReducer }) => {
  const props = {
    messagesReducer,
    channelsReducer,
  };
  return props;
};
