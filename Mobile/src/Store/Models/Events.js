import AxiosClient from '../Axios';
import auth from '@react-native-firebase/auth';
import { FIRESTORE } from '../../Utils/Constants';

export default {
  state: {
    events: [],
    randomEvents: [],
    activeEvent: { followers: [], likes: [], description: '', title: '', location: '', eventDate: '' },
    updatingEventId: '',
    userEvents: [],
    postsPagination: { nextPage: 1, limit: 4, totalDocuments: 0, last: false }
  },
  reducers: {
    setField (state, field, value) {
      return { ...state, [field]: value };
    },
    setEvents (state, events) {
      return { ...state, events };
    },
    setRandomEvents (state, randomEvents) {
      return { ...state, randomEvents };
    },
    setUserEvents (state, userEvents) {
      return { ...state, userEvents };
    }
  },
  effects: (dispatch) => ({
    //
    async createEvent ({ payload, callback }, state) {
      try {
        await AxiosClient.post('/posts/create', payload).then(({ data }) => {
          // console.log('Reached create blog', payload, data);
          if (data.success) dispatch.Events.setEvents([ ...state.Events.events, data.result ]);
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getEvents ({ filter, callback }, state) {
      try {
        const { nextPage: page, limit, last } = state.Events.postsPagination;
        const queryParams = filter
          ? `page=${page}&limit=${limit}&filter=eventInterval&filterValue=${filter}`
          : `page=${page}&limit=${limit}`;

        console.log('QUERY', queryParams);
        if (!last)
          await AxiosClient.get(`/posts/events/all?${queryParams}`).then(({ data }) => {
            if (data.success) {
              const { result, success, user, ...rest } = data;
              dispatch.Events.setEvents(page > 1 ? [ ...state.Events.events, ...data.result ] : data.result);
              dispatch.Events.setField('postsPagination', rest);
            }
            callback(data);
          });
        else return callback({ success: true, result: [] });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getRandomEvents ({ size, callback }, state) {
      try {
        await AxiosClient.get(`posts/random/events?limit=${size}&type=event`).then(({ data }) => {
          // console.log('Random event', data);
          if (data.success) {
            dispatch.Events.setRandomEvents(data.result);
          }
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getUserEvents ({ uid, callback }) {
      try {
        await AxiosClient.get(`/events/user/${uid}`).then(({ data }) => {
          if (data.success) dispatch.Events.setUserEvents(data.result);
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async updateEvent ({ eventId, payload, callback }, state) {
      try {
        await AxiosClient.patch(`/posts/update/${eventId}`, payload).then(({ data }) => {
          if (data.success) {
            const events = [ ...state.Events.events ].map(
              (event) => (event._id === eventId ? { ...event, ...payload } : event)
            );
            const randomEvents = [ ...state.Events.randomEvents ].map(
              (event) => (event._id === eventId ? { ...event, ...payload } : event)
            );
            dispatch.Events.setField('events', events);
            dispatch.Events.setField('randomEvents', randomEvents);
            callback(data);
          }
          dispatch.Events.setField('updatingEventId', '');

          return callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async followEvent ({ eventId, userId, callback }, state) {
      try {
        await AxiosClient.patch(`/posts/follow/${eventId}`, { userId }).then(({ data }) => {
          if (data.success) {
            const events = [ ...state.Events.events ].map(
              (event) => (event._id === eventId ? { ...event, ...data.result } : event)
            );
            const randomEvents = [ ...state.Events.randomEvents ].map(
              (event) => (event._id === eventId ? { ...event, ...data.result } : event)
            );
            dispatch.Events.setField('events', events);
            dispatch.Events.setField('randomEvents', randomEvents);
            callback(data);
          }
          dispatch.Events.setField('updatingEventId', '');

          return callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async createEventComment ({ payload, callback }) {
      try {
        await AxiosClient.post(`/comments/event/create`, payload).then(({ data }) => callback(data));
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
            let events = state.Events.events.map(
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
        await AxiosClient.get(`/posts/single/${eventId}`).then(({ data }) => {
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getEventComments ({ eventId, callback }, state) {
      try {
        await AxiosClient.get(`/comments/event/${eventId}`).then(({ data }) => {
          // console.log('Commetns', data);
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
    },
    async createVotingEvent ({ payload, callback }, state) {
      try {
        await FIRESTORE.collection('voting')
          .add(payload)
          .then(() => callback({ success: true, result: 'Successfully added voting event' }));
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    }
  })
};
