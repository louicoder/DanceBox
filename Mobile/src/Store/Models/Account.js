import { QUERIES } from '../../Firebase';
import AxiosClient from '../Axios';

export default {
  state: { user: {}, events: [], blogs: [] },
  reducers: {
    setUserDetails (state, user) {
      return { ...state, user };
    },
    setEventsAndBlogs (state, { events, blogs }) {
      return { ...state, events, blogs };
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
          console.log('USRID', res.error.toString());
          // dispatch.Account.getUserDetails({ uid: res.doc, callback });
          callback(res);
        });
      } catch (error) {
        return callback({ success: false, result: error });
      }
    },

    async getUserDetails ({ uid, callback }) {
      try {
        await QUERIES.getDoc('Users', uid, (res) => {
          // console.log('ERRR GET DET', res);
          dispatch.Account.setUserDetails({ ...res.doc, uid });
          callback({ ...res, doc: { ...res.doc, uid } });
          // callback(res);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async updateAccountDetails ({ uid, payload, callback }) {
      try {
        await QUERIES.updateDoc('Users', uid, payload, (res) => {
          // console.log('ERRR GET DET', res);
          if (!res.error) {
            dispatch.Account.setUserDetails(res.doc);
          }
          callback({ ...res, doc: { ...res.doc, uid } });
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getUserEventsAndBlogs ({ uid, callback }) {
      try {
        const { data: { success: eventSucess, result: events } } = await AxiosClient.get(`/events/user/${uid}`).then();
        const { data: { success: blogSucess, result: blogs } } = await AxiosClient.get(`/blogs/user/${uid}`);

        if (eventSucess && blogSucess) {
          dispatch.Account.setEventsAndBlogs({ events, blogs });
        }
        console.log('USER EVENTS', events);
        console.log('USER BLOGS', blogs);
        callback({ success: eventSucess && blogSucess, result: { events, blogs } });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    }
  })
};
