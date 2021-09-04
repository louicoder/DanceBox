import { QUERIES } from '../../Firebase';
import { HelperFunctions } from '../../Utils';
import AxiosClient from '../Axios';

export default {
  state: { profile: {} },
  reducers: {
    setProfile (state, profile) {
      // console.log('SEtting user details', user);
      return { ...state, profile };
    }
  },
  effects: (dispatch) => ({
    async getUserDetails ({ uid, callback }) {
      try {
        await AxiosClient.get(`/account/${uid}`).then(({ data: { success, result } }) => {
          // console.log('Dispatch', dispatch);
          if (success) {
            dispatch.User.setProfile(result);
            return callback({ result, success });
          }
          callback({ success, result });
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    }
  })
};
