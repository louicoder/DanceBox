import AxiosClient from '../Axios';
import auth from '@react-native-firebase/auth';

export default {
  state: { blogs: [] },
  reducers: {
    setBlogs (state, blogs) {
      return { ...state, blogs };
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
          dispatch.Blogs.setBlogs(data.result);
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

    async createBlogComment ({ blogId, payload, callback }, state) {
      try {
        await AxiosClient.patch(`/blogs/comments/create/${blogId}`, payload).then(({ data }) => {
          if (data.success) {
            const update = state.Blogs.blogs.map(
              (blog) => (blog._id === blogId ? { ...blog, comments: [ ...blog.comments, payload ] } : blog)
            );
            dispatch.Blogs.setBlogs(update);
            callback(data);
          }
          callback(data);
        });
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
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    }
  })
};
