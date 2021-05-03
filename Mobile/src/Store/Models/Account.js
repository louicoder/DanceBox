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
        await QUERIES.signIn(email, password, (res) => {
          // console.log('USRID', res.doc);
          dispatch.Account.setUserDetails(res.doc);
          callback(res);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getUserDetails ({ uid, callback }) {
      try {
        await QUERIES.getDoc('Users', uid, (res) => {
          callback({ ...res, doc: { ...res.doc, uid } });
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    }
  })
};
