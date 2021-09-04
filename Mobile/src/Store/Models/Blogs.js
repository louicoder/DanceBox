import AxiosClient from '../Axios';
import auth from '@react-native-firebase/auth';

export default {
  state: { blogs: [], activeBlog: {}, userBlogs: [] },
  reducers: {
    setBlogs (state, blogs) {
      return { ...state, blogs };
    },
    setActiveBlog (state, activeBlog) {
      return { ...state, activeBlog };
    },
    setUserBlogs (state, userBlogs) {
      return { ...state, userBlogs };
    }
  },
  effects: (dispatch) => ({
    //
    async createBlog ({ payload, callback }, state) {
      // console.log('PAYLOAD', payload);
      try {
        await AxiosClient.post('/blogs/create', payload).then(({ data }) => {
          // console.log('DATA', data);
          dispatch.Blogs.setBlogs([ ...state.Blogs.blogs, data.result ]);
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getBlogs (callback) {
      try {
        await AxiosClient.get('/blogs/all').then(({ data }) => {
          if (data.success) dispatch.Blogs.setBlogs(data.result);
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getUserBlogs ({ uid, callback }) {
      try {
        await AxiosClient.get(`/blogs/user/${uid}`).then(({ data }) => {
          console.log('DATA blogs', data.result, uid);
          if (data.success) dispatch.Blogs.setUserBlogs(data.result);
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async updateBlog ({ blogId, payload, callback }, state) {
      try {
        await AxiosClient.patch(`/blogs/update/${blogId}`, payload).then(({ data }) => {
          if (data.success) {
            const blogs = [ ...state.Blogs.blogs ].map(
              (blog) => (blog._id === blogId ? { ...blog, ...payload } : blog)
            );
            dispatch.Blogs.setBlogs(blogs);
            callback(data);
          }
          return callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getBlogComments ({ blogId, callback }, state) {
      try {
        await AxiosClient.get(`/comments/blog/${blogId}`).then(({ data }) => {
          // console.log('Commetns', data);
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async createBlogComment ({ payload, callback }) {
      try {
        await AxiosClient.post(`/comments/blog/create`, payload).then(({ data }) => callback(data));
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async likeBlog ({ blogId, callback }, state) {
      try {
        const uid = state.Account.user.uid || auth().currentUser.uid;
        await AxiosClient.patch(`/blogs/like/${blogId}/${uid}`).then(({ data }) => {
          if (data.success) {
            callback(data);
          }
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getBlog ({ blogId, callback }, state) {
      try {
        await AxiosClient.get(`/blogs/single/${blogId}`).then(({ data }) => {
          if (data.success) dispatch.Blogs.setActiveBlog(data.result);
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    }
  })
};
