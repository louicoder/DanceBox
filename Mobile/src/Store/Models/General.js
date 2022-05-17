import AxiosClient from '../Axios';
import auth from '@react-native-firebase/auth';
import { FIRESTORE } from '../../Utils/Constants';

export default {
  state: {
    blogsActiveLike: '',
    blogsActiveFavorite: '',
    blogsActiveShare: ''
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
    }
  })
};
