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

    async attendParticipate ({ action, payload, eventId, callback }, state) {
      try {
        const uid = state.Account.user.uid;
        console.log('STATE EVENTS', state.Events.events);
        await AxiosClient.patch(`/events/${action}/${eventId}/${uid}`, payload).then(({ data }) => {
          let newEvents;
          if (data.success) {
            const eventCopy = [ ...state.Events.events ];
            if (action === 'attend') {
              newEvents = state.Events.events.map(
                (event) => event._id === eventId && { ...event, attending: [ ...event.attending, payload ] }
              );
            }
            if (action === 'participate') {
              newEvents = state.Events.events.map(
                (event) => event._id === eventId && { ...event, participating: [ ...event.participating, payload ] }
              );
            }
            dispatch.Events.setEvents(newEvents);
            callback({ ...data });
          }
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async unattendUnparticipate ({ action, payload, eventId, callback }, state) {
      try {
        const uid = state.Account.user.uid;
        console.log('STATE EVENTS', state.Events.events);
        await AxiosClient.patch(`/events/${action}/${eventId}/${uid}`, payload).then(({ data }) => {
          let newEvents;
          if (data.success) {
            if (action === 'unattend') {
              newEvents = state.Events.events.map(
                (event) =>
                  event._id === eventId && {
                    ...event,
                    attending: [ ...event.attending.filter((part) => part.uid !== uid) ]
                  }
              );
            }
            if (action === 'unparticipate') {
              newEvents = state.Events.events.map(
                (event) =>
                  event._id === eventId && {
                    ...event,
                    participating: [ ...event.participating.filter((part) => part.uid !== uid) ]
                  }
              );
            }
            dispatch.Events.setEvents(newEvents);
            callback({ ...data });
          }
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
