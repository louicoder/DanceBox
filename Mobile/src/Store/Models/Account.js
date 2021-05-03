import { QUERIES } from '../../Firebase';

export default {
  state: { user: {} },
  reducers: {
    setUserDetails (state, user) {
      return { ...state, user };
    }
  },
  effects: (dispatch) => ({
    //
    async createUserAccount ({ payload, callback }) {
      try {
        await QUERIES.createUserAccount(payload, callback);
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async signIn ({ payload: { email, password }, callback }) {
      try {
        await QUERIES.signIn(email, password, callback);
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getUserDetails ({ uid, callback }) {
      try {
        await QUERIES.getDoc('Users', uid, callback);
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    }
  })
};
