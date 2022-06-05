import { QUERIES } from '../../Firebase';
import { HelperFunctions } from '../../Utils';
import { AUTH, FIRESTORE } from '../../Utils/Constants';
import AxiosClient from '../Axios';

export default {
  state: { user: {}, events: [], blogs: [], randomOrganisers: [], allOrganisers: [], activeFollowing: '' },
  reducers: {
    setField (state, field, value) {
      // console.log('Setting user details----', user);
      return { ...state, [field]: value };
    },
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
    async signup ({ payload, callback }) {
      try {
        await QUERIES.createUserAccount(payload, (res) => {
          // console.log('RESULT in effects', JSON.stringify(res.result));
          if (res.success) dispatch.Account.setUserDetails(JSON.stringify(res.result));
          callback(res);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async login ({ email, password, callback }) {
      try {
        await AUTH.signInWithEmailAndPassword(email, password).then(async (data) => {
          if (data.user)
            return await FIRESTORE.collection('users').doc(data.user.uid).get().then((user) => {
              // console.log('USER EFFECTS', user.data());
              const result = { ...user.data(), uid: user.id };
              dispatch.Account.setField('user', result);
              return callback({ success: true, result });
            });
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async logout ({ callback }, state) {
      try {
        await AUTH.signOut().then((r) => {
          dispatch.Account.setField('user', {});
          return callback({ success: true, result: 'Logged out successfully' });
        });
      } catch (error) {
        // console.log('Error loggin out', error.message);
        return failedRequest(callback, error.message);
      }
    },

    async getRandomOrganisers (callback) {
      try {
        await AxiosClient.get(`/accounts/organisers/random`).then(({ data }) => {
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
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error });
      }
    },

    async getUserDetails ({ uid, callback }) {
      try {
        await FIRESTORE.collection('users').doc(uid).get().then((user) => {
          const result = { ...user.data(), uid: user.id };
          dispatch.Account.setField('user', result);
          return callback({ success: true, result });
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async updateAccountDetails ({ uid, payload, callback }, state) {
      try {
        // await AxiosClient.post(`/accounts/update/${uid}`, payload).then(({ data }) => callback(data));
        await QUERIES.updateDoc('users', uid, payload, (res) => {
          if (res.success) dispatch.Account.setUserDetails({ ...state.Account.user, ...res.result });
          callback(res);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async updatePassword ({ uid, password, callback }) {
      try {
        await AxiosClient.post(`/accounts/update/${uid}`, { password }).then(async ({ data }) => {
          if (data.success) await HelperFunctions.storeAsyncObjectData('user', data.result, () => callback(data));
          callback(data);
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
    },

    async followAccount ({ following, callback }, state) {
      try {
        await FIRESTORE.collection('users').doc(state.Account.user.uid).set({ following }, { merge: true }).then(() => {
          dispatch.Account.setField('user', { ...state.Account.user, following });
          dispatch.Account.setField('activeFollowing', '');
          return callback({ success: true, result: 'Successfully followed account' });
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async unfollowAccount ({ follower, following, callback }) {
      try {
        await AxiosClient.post(`/accounts/unfollow/${follower}`, { following }).then(({ data }) => callback(data));
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    }
  })
};
