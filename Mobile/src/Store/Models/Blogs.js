import AxiosClient from '../Axios';
import auth from '@react-native-firebase/auth';

export default {
  state: {
    blogs: [],
    activeBlog: {},
    userBlogs: [],
    postsPagination: { nextPage: 1, limit: 4, totalDocuments: 0, last: false }
  },
  reducers: {
    setField (state, field, value) {
      return { ...state, [field]: value };
    },
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
    async createBlog ({ payload, callback }, state) {
      try {
        await AxiosClient.post('/posts/create', payload).then(({ data }) => {
          // console.log('Reached create blog', payload, data);
          if (data.success) dispatch.Blogs.setBlogs([ data.result, ...state.Blogs.blogs ]);
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getBlogs (callback, state) {
      try {
        const { nextPage: page, limit, last } = state.Blogs.postsPagination;
        // console.log(state.Blogs.postsPagination);
        if (!last)
          await AxiosClient.get(`/posts/all?page=${page}&limit=${limit}`).then(({ data }) => {
            if (data.success) {
              const { result, success, user, ...rest } = data;
              dispatch.Blogs.setBlogs(page > 1 ? [ ...state.Blogs.blogs, ...data.result ] : data.result);
              dispatch.Blogs.setField('postsPagination', rest);
            }
            callback(data);
          });
        else return callback({ success: true, result: [] });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getUserBlogs ({ uid, callback }) {
      try {
        await AxiosClient.get(`/posts/user/${uid}`).then(({ data }) => {
          if (data.success) dispatch.Blogs.setUserBlogs(data.result);
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async updateBlog ({ blogId, payload, callback }, state) {
      try {
        await AxiosClient.patch(`/posts/update/${blogId}`, payload).then(({ data }) => {
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
        await AxiosClient.patch(`/posts/like/${blogId}/${uid}`).then(({ data }) => {
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
        await AxiosClient.get(`/posts/single/${blogId}`).then(({ data }) => {
          if (data.success) dispatch.Blogs.setActiveBlog(data.result);
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    }
  })
};
