import { QUERIES } from '../../Firebase';

export default {
  state: { events: [] },
  reducers: {
    setEvents (state, events) {
      return { ...state, events };
    }
  },
  effects: (dispatch) => ({
    //
    async createEvent ({ payload, callback }) {
      try {
        await QUERIES.createDoc('Events', payload, callback);
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getEvents (callback) {
      try {
        await QUERIES.getDocuments('Events', (res) => {
          dispatch.Events.setEvents(res.doc);
          console.log('Events', res);
          callback(res);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getUserDetails () {
      // try {
      //   await QUERIES.getDoc('Users', uid, callback);
      // } catch (error) {
      //   return callback({ success: false, result: error.message });
      // }
    }
  })
};
