import { QUERIES } from '../../Firebase';
import AxiosClient from '../Axios';

export default {
  state: { blogs: [] },
  reducers: {
    setBlogs (state, blogs) {
      return { ...state, blogs };
    }
  },
  effects: (dispatch) => ({
    //
    async createBlog ({ payload, callback }) {
      try {
        await QUERIES.createDoc('Blogs', payload, callback);
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getBlogs (callback) {
      try {
        await AxiosClient.get('/blogs/all').then(({ data }) => {
          dispatch.Blogs.setBlogs(data.result);
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getUserBlogs ({ uid, callback }) {
      // try {
      //   await QUERIES.getDoc('Users', uid, callback);
      // } catch (error) {
      //   return callback({ success: false, result: error.message });
      // }
    }
  })
};
