import AxiosClient from '../Axios';
import auth from '@react-native-firebase/auth';
import { FIRESTORE } from '../../Utils/Constants';

export default {
  state: {
    blogsActiveLike: '',
    blogsActiveFavorite: '',
    blogsActiveShare: '',
    comments: [],
    commentsPagination: { nextPage: 1, limit: 10, totalDocuments: 0, last: false, totalPages: 1 },
    activeCommentLike: '',
    chatAgree: false
  },
  reducers: {
    setField (state, field, value) {
      return { ...state, [field]: value };
    }
  },
  effects: (dispatch) => ({
    async sendFeedback ({ payload, callback }) {
      try {
        await FIRESTORE.collection('feedback').add(payload).then(() => {
          return callback({ success: true, result: 'Successfully submitted your feedback!!' });
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async postComment ({ payload, callback }, state) {
      try {
        await AxiosClient.post('/comments/create', payload).then(({ data }) => {
          if (data.success) {
            let comments = [ ...state.General.comments ];
            comments.unshift(data.result);
            dispatch.General.setField('comments', comments);
            dispatch.General.setField('commentsPagination', {
              ...state.General.commentsPagination,
              totalDocuments: state.General.commentsPagination.totalDocuments + 1
            });
          }
          return callback(data);
        });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async getPostComments ({ postId, callback }, state) {
      try {
        const { nextPage: page, limit, last, totalPages } = state.General.commentsPagination;
        // console.log('nNEXT page|last Page|Total>>>>', page, last, totalPages);
        // if (!last)
        await AxiosClient.get(`/comments/all/${postId}?page=${page}&limit=${limit}`).then(({ data }) => {
          // console.log('DATA >>>>>::', data);
          if (data.success) {
            const { result, success, ...rest } = data;
            dispatch.General.setField('comments', page > 1 ? [ ...state.General.comments, ...result ] : result);
            dispatch.General.setField('commentsPagination', { ...state.General.commentsPagination, ...rest });
          }
          callback(data);
        });
        // else return callback({ success: true, result: [] });
      } catch (error) {
        return callback({ success: false, result: error.message });
      }
    },

    async likePostComment ({ userId, postId, callback }, state) {
      try {
        await AxiosClient.patch(`/comments/like/${postId}?`, { userId }).then(({ data }) => {
          if (data.success) {
            dispatch.General.setField('comments', [
              ...state.General.comments.map((r) => (r._id === postId ? data.result : r))
            ]);
            dispatch.General.setField('activeCommentLike', '');
          }
          callback(data);
        });
      } catch (error) {
        dispatch.General.setField('activeCommentLike', '');
        return callback({ success: false, result: error.message });
      }
    }
  })
};
