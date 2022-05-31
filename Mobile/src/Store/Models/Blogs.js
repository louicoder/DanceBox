import AxiosClient from '../Axios';
import auth from '@react-native-firebase/auth';
import { FIRESTORE } from '../../Utils/Constants';

export default {
  state: {
    blogs: [],
    activeBlog: {},
    activeShare: '',
    activeLike: '',
    userBlogs: [],
    postsPagination: { nextPage: 1, limit: 4, totalDocuments: 0, last: false, totalPages: 1 }
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
          if (data.success) dispatch.Blogs.setBlogs([ data.result, ...state.Blogs.blogs ]);
          callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getBlogs (callback, state) {
      try {
        const { nextPage: page, limit, last, totalPages } = state.Blogs.postsPagination;
        // console.log('nNEXT page|last Page|Total>>>>', page, last, totalPages);
        if (!last)
          await AxiosClient.get(`/posts/all?type=posts&page=${page}&limit=${limit}`).then(({ data }) => {
            if (data.success) {
              const { result, success, user, ...rest } = data;
              dispatch.Blogs.setBlogs(page > 1 ? [ ...state.Blogs.blogs, ...data.result ] : data.result);
              dispatch.Blogs.setField('postsPagination', { ...state.Blogs.postsPagination, ...rest });
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

    async favoriteBlog ({ payload, callback }, state) {
      try {
        // await AxiosClient.post(`/comments/blog/create`, payload).then(({ data }) => callback(data));
        await FIRESTORE.collection('users').doc(state.Account.user.uid).set(payload, { merge: true }).then(() => {
          dispatch.Account.setField('user', { ...state.Account.user, ...payload });
          dispatch.Account.setField('activeFavorite', '');
          return callback({ success: true, result: 'Successfully added to favorites' });
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async likeBlog ({ postId, callback }, state) {
      try {
        const userId = state.Account.user.uid || auth().currentUser.uid;
        await AxiosClient.patch(`/posts/like/${postId}`, { userId }).then(({ data }) => {
          if (data.success) {
            const newBlogs = [ ...state.Blogs.blogs.map((r) => (r._id === postId ? data.result : r)) ];
            dispatch.Blogs.setField('blogs', newBlogs);
            dispatch.Blogs.setField('activeLike', '');
          }
          return callback(data);
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
