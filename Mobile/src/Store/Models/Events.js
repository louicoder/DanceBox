import { QUERIES } from '../../Firebase';
import AxiosClient from '../Axios';

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

    // async participateInEvent ({ eventId, payload, callback }, state) {
    //   try {
    //     await AxiosClient.patch(`/events/participate/${eventId}`, payload).then(({ data }) => {
    //       if (data.success) {
    //         const events = [ ...state.Events.events ].map(
    //           (event) =>
    //             event._id === eventId ? { ...event, participating: [ ...event.participating, ...payload ] } : event
    //         );
    //         dispatch.Events.setEvents(events);
    //         callback(data);
    //       }
    //       callback(data);
    //     });
    //   } catch (error) {
    //     return callback({ success: false, result: error.message });
    //   }
    // },

    async attendParticipate ({ action, payload, eventId, callback }, state) {
      try {
        // const newest = [ ...state.Events.events ].map(
        //   (event) =>
        //     event._id === eventId && console.log('HERE', { ...event, attending: [ ...event.attending, ...payload ] })
        // );

        const uid = state.Account.user.uid;
        await AxiosClient.patch(`/events/${action}/${eventId}/${uid}`, payload).then(({ data }) => {
          console.log('++++Reseponse attend id++++', data);
          if (data.success) {
            const events = [ ...state.Events.events ].map((event) => {
              console.log('EVENT ID', event);
              // if (event._id === eventId && action === 'attend')
              //   return { ...event, attending: [ ...event.attending, payload ] };
              // if (event._id === eventId && action === 'participate')
              //   return { ...event, participating: [ ...event.participating, payload ] };
            });
            dispatch.Events.setEvents(events);
          }
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async likeEvent ({ eventId, payload, callback }, state) {
      try {
        await AxiosClient.patch(`/events/like/${eventId}`, payload).then(({ data }) => {
          if (data.success) {
            const events = [ ...state.Events.events ].map(
              (event) => (event._id === eventId ? { ...event, likes: [ ...event.likes, payload ] } : event)
            );
            dispatch.Events.setEvents(events);
            callback(data);
          }
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    }
  })
};
