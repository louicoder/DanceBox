import { QUERIES } from '../../Firebase';
import { HelperFunctions } from '../../Utils';
import AxiosClient from '../Axios';

export default {
  state: { user: {}, events: [], blogs: [], randomOrganisers: [], allOrganisers: [] },
  reducers: {
    setUserDetails (state, user) {
      return { ...state, user };
    },
    setEventsAndBlogs (state, { events, blogs }) {
      return { ...state, events, blogs };
    },
    setRandomOrganisers (state, organisers) {
      console.log('LXXXXXX', organisers.length);
      const randomOrganisers = HelperFunctions.shuffleArray(organisers);
      return { ...state, randomOrganisers };
    },
    setAllOrganisers (state, allOrganisers) {
      return { ...state, allOrganisers };
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
        await QUERIES.signIn(email, password, async ({ uid, error }) => {
          if (uid) {
            dispatch.Account.getUserDetails({ uid, callback });
          }
          if (error) {
            callback({ error, doc: undefined });
          }
        });
      } catch (error) {
        return callback({ success: false, result: error });
      }
    },

    async getRandomOrganisers (callback) {
      try {
        await AxiosClient.get(`/accounts/organisers`).then((res) => {
          console.log('RES>DATA', res.data.result.length);
          dispatch.Account.setRandomOrganisers(res.data.result);
          callback({ error: undefined, doc: [ ...res.data.result ] });
        });
      } catch (error) {
        return callback({ error: error.message, success: false });
      }
    },

    async getAllOrganisers (callback) {
      try {
        await AxiosClient.get(`/accounts/organisers/all`).then((res) => {
          dispatch.Account.setAllOrganisers(res.data.result);
          callback({ error, doc: { ...res.data.result } });
        });
      } catch (error) {
        return callback({ success: false, result: error });
      }
    },

    async getUserDetails ({ uid, callback }) {
      try {
        await AxiosClient.get(`/accounts/${uid}`).then((res) => {
          callback({ error, doc: { ...res.data.result } });
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
