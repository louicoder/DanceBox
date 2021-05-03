import { QUERIES } from '../../Firebase';
import AxiosClient from '../Axios';

export default {
  state: { events: [] },
  reducers: {
    setEvents (state, events) {
      return { ...state, events };
    }
  },
  effects: (dispatch) => ({
    //
    async createEvent ({ payload, callback }, state) {
      try {
        await AxiosClient.post('/events/create', payload).then(({ data }) => {
          console.log('CREahed here----', payload);
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

    async participateInEvent ({ eventId, payload, callback }, state) {
      try {
        await AxiosClient.patch(`/events/participate/${eventId}`, payload).then(({ data }) => {
          if (data.success) {
            const events = [ ...state.Events.events ].map(
              (event) =>
                event._id === eventId ? { ...event, participating: [ ...event.participating, ...payload ] } : event
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

    async attendEvent ({ eventId, payload, callback }, state) {
      try {
        await AxiosClient.patch(`/events/attend/${eventId}`, payload).then(({ data }) => {
          if (data.success) {
            const events = [ ...state.Events.events ].map(
              (event) => (event._id === eventId ? { ...event, attending: [ ...event.attending, ...payload ] } : event)
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

    async likeEvent ({ eventId, payload, callback }, state) {
      try {
        await AxiosClient.patch(`/events/like/${eventId}`, payload).then(({ data }) => {
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
    }
  })
};
