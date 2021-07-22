import AxiosClient from '../Axios';
import auth from '@react-native-firebase/auth';

export default {
  state: { events: [], randomEvents: [] },
  reducers: {
    setEvents (state, events) {
      return { ...state, events };
    },
    setRandomEvents (state, randomEvents) {
      return { ...state, randomEvents };
    }
  },
  effects: (dispatch) => ({
    //
    async createEvent ({ payload, callback }, state) {
      try {
        await AxiosClient.post('/events/create', payload).then(({ data }) => {
          // console.log('CREahed here----', payload);
          if (data.success) {
            const events = [ ...state.Events.events, data.result ];
            dispatch.Events.setEvents(events);
          }
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getEvent (callback) {
      try {
        await AxiosClient.get('/events/all').then(({ data }) => {
          if (data.success) {
            dispatch.Events.setEvents(data.result);
          }
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getEvents (callback) {
      try {
        await AxiosClient.get('/events/all').then(({ data }) => {
          if (data.success) {
            dispatch.Events.setEvents(data.result);
          }
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getRandomEvents (callback) {
      try {
        await AxiosClient.get('/events/random').then(({ data }) => {
          if (data.success) {
            dispatch.Events.setRandomEvents(data.result);
          }
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async updateEvent ({ eventId, payload, callback }, state) {
      try {
        await AxiosClient.patch(`/events/update/${eventId}`, payload).then(({ data }) => {
          if (data.success) {
            const events = [ ...state.Events.events ].map(
              (event) => (event._id === eventId ? { ...event, ...payload } : event)
            );
            dispatch.Events.setEvents(events);
            callback(data);
          }
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async createEventComment ({ eventId, payload, callback }, state) {
      // console.log('REache event comment', payload, eventId);
      try {
        await AxiosClient.patch(`/events/comments/create/${eventId}`, payload).then(({ data }) => {
          if (data.success) {
            const events = state.Events.events.map(
              (event) => (event._id === eventId ? { ...event, comments: [ ...event.comments, payload ] } : event)
            );
            dispatch.Events.setEvents(events);
            callback(data);
          }
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async attendParticipate ({ action, payload, eventId, callback }, state) {
      try {
        const uid = state.Account.user.uid;
        await AxiosClient.patch(`/events/${action}/${eventId}/${uid}`, payload).then(({ data }) => callback(data));
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async unattendUnparticipate ({ action, payload, eventId, callback }, state) {
      try {
        const uid = state.Account.user.uid;
        await AxiosClient.patch(`/events/${action}/${eventId}/${uid}`, payload).then(({ data }) => callback(data));
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async likeEvent ({ eventId, callback }, state) {
      try {
        const uid = state.Account.user.uid || auth().currentUser.uid;

        await AxiosClient.patch(`/events/like/${eventId}/${uid}`).then(({ data }) => {
          if (data.success) {
            events = state.Events.events.map(
              (event) => (event._id === eventId ? { ...event, likes: [ ...event.likes, uid ] } : event)
            );

            dispatch.Events.setEvents(events);
            callback(data);
          }
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getEvent ({ eventId, callback }, state) {
      try {
        await AxiosClient.get(`/events/single/${eventId}`).then(({ data }) => {
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    // Get eevnts in month
    async getEventsInMonth ({ month, callback }, state) {
      try {
        await AxiosClient.get(`/events/month/${month}`).then(({ data }) => {
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    }
  })
};
