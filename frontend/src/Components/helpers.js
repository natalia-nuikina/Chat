import { useSelector } from 'react-redux';

const useAuthHeader = () => {
  const { token } = useSelector((state) => state.userReducer);
  return ((token.length > 0) ? { Authorization: `Bearer ${token}` } : {});
};

export const mapStateToProps = ({ channelsReducer, messagesReducer }) => {
  const props = {
    messagesReducer,
    channelsReducer,
  };
  return props;
};

export default useAuthHeader;
