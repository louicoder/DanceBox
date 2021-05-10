import { QUERIES } from '../../Firebase';
import AxiosClient from '../Axios';

export default {
  state: { events: [], page: 1, blogs: [] },
  reducers: {
    setEvents (state, events) {
      return { ...state, events };
    },
    setBlogs (state, blogs) {
      return { ...state, blogs };
    }
  },
  effects: (dispatch) => ({
    async searchEventsAndBlogs ({ payload: { search, route, page }, callback }, state) {
      console.log('Searching ', page, search, route);
      try {
        await AxiosClient.get(`/${route}/search?title=${search}&&page=${page}&&limit=10`).then(({ data }) => {
          if (data.success) {
            // something here..
            if (route === 'events' && page === 1) dispatch.Search.setEvents(data.result);
            if (route === 'events' && page > 1) dispatch.Search.setEvents([ ...state.Search.events, ...data.result ]);
            if (route === 'blogs' && page === 1) dispatch.Search.setBlogs(data.result);
            if (route === 'blogs' && page > 1) dispatch.Search.setBlogs([ ...state.Search.blogs, ...data.result ]);
          }
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    }
  })
};
