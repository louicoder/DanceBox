import { QUERIES } from '../../Firebase';
import { HelperFunctions } from '../../Utils';
import AxiosClient from '../Axios';

export default {
  state: { user: {}, events: [], blogs: [], randomOrganisers: [], allOrganisers: [] },
  reducers: {
    setUserDetails (state, user) {
      // console.log('Setting user details----', user);
      return { ...state, user };
    },
    setEventsAndBlogs (state, { events, blogs }) {
      return { ...state, events, blogs };
    },
    setRandomOrganisers (state, organisers) {
      const randomOrganisers = [ ...HelperFunctions.shuffleArray(organisers) ].slice(0, 4);
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
        await AxiosClient.post('/accounts/create', payload).then(({ data }) => {
          if (data.success) {
            dispatch.Account.setUserDetails(data.result.user);
            HelperFunctions.storeAsyncObjectData('user', data.result.user, (res) => callback(res));
          }
          return callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async login ({ email, password, callback }) {
      try {
        await AxiosClient.post('/accounts/login', { email, password }).then(({ data }) => {
          if (data.success) {
            dispatch.Account.setUserDetails(data.result.user);
            HelperFunctions.storeAsyncObjectData('user', data.result.user, callback);
          }
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getRandomOrganisers (callback) {
      try {
        await AxiosClient.get(`/accounts/organisers`).then(({ data }) => {
          dispatch.Account.setRandomOrganisers(data.result);
          // console.log('Orgainserss', data.result);
          callback(data);
        });
      } catch (error) {
        return callback({ result: error.message, success: false });
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

    async getOrganiser ({ uid, callback }) {
      try {
        await AxiosClient.get(`/accounts/${uid}`).then(({ data }) => {
          // console.log('Data===', data, 'UID====', uid);
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error });
      }
    },

    async getUserDetails ({ uid, callback }) {
      try {
        await AxiosClient.get(`/accounts/${uid}`).then(({ data }) => {
          // if (success) return callback({ result, success });
          callback(data);
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
        // console.log('USER EVENTS', events);
        // console.log('USER BLOGS', blogs);
        callback({ success: eventSucess && blogSucess, result: { events, blogs } });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    }
  })
};
