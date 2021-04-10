import { Queries } from '../../Utils';
// import auth from '@react-native-firebase/auth';

export default {
  state: { user: {} },
  reducers: {
    setUserDetails (state, user) {
      return { ...state, user };
    }
  },
  effects: (dispatch) => ({
    //
    async getUserDetails ({ uid, callback }) {
      // try {
      //   await Queries.getSingleDoc('Users', uid, (resp) => {
      //     const { email, uid } = auth().currentUser;
      //     dispatch.Account.setUserDetails({ email, uid, ...resp.doc });
      //     callback({ success: true, result: resp.doc });
      //   });
      // } catch (error) {
      //   return callback({ success: false, result: error.message });
      // }
    }
  })
};
