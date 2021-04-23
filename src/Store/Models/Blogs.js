import { QUERIES } from '../../Firebase';

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
        await QUERIES.getDocuments('Blogs', (res) => {
          if (res.doc) dispatch.Blogs.setBlogs(res.doc);
          callback(res);
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
