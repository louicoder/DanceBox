import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  TextInput,
  ScrollView,
  Dimensions,
  Platform,
  Keyboard,
  Alert
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CONSTANTS, HelperFunctions } from '../../../Utils';
import { PERMISSIONS } from 'react-native-permissions';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import DatePicker from '../../../Components/DatePicker';
import Calendar from '../../../Components/Calendar';
import OptionsSelector from './OptionsSelector';
import Modal from './Modal';
import ModalX from '../../../Components/Modal';
import Time from './Time';
import StartDate from './StartDate';
import EndDate from './EndDate';
import { useDispatch } from 'react-redux';
import { uploadImage } from '../../../Utils/HelperFunctions';
import { QUERIES } from '../../../Firebase';
import LoadingModal from '../../../Components/LoadingModal';
import { useSelector } from 'react-redux';
import { Button, Input, Typo } from '../../../Components';
import { BLACK, GRAY, WHITE } from '../../../Utils/Constants';

const { height } = Dimensions.get('window');
const NewEvent = ({ navigation }) => {
  const dispatch = useDispatch();
  const [ visible, setVisible ] = React.useState(true);
  const [ user, setUser ] = React.useState(true);
  const loading = useSelector((state) => state.loading.effects.Events);
  // const { user } = useSelector((state) => state.Account);
  const [ imageLoading, setImageLoading ] = React.useState(false);

  const [ state, setState ] = React.useState({
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    image: {},
    venue: '',
    description: '',
    tags: [],
    tagsVisible: true,
    // date: moment(new Date()).format('YYYY-MM-DD'),
    price: null,
    free: true,
    // datePickerVisible: false,
    modalVisible: false,
    modalComponent: 'startdate',
    // amount: 0,
    judgingNotes: '',
    judgingCriteria: '',
    noOfJudges: 3,
    loading: false,
    ticketCompany: ''
    // dateTime: new Date().toString()
  });

  React.useEffect(() => {
    HelperFunctions.getUser(({ success, result }) => success && setUser(result));
  }, []);

  const selectImage = async () =>
    await HelperFunctions.CHECK_GALLERY_PERMISSIONS(async (res) => {
      // console.log('rESult', res);
      if (!res.success) {
        return HelperFunctions.Notify('Error accessing gallery', res.result);
        // selectImage();
      }
      HelperFunctions.ImagePicker((image) => {
        // console.log('REsponse', image);x
        if (image.uri) setState({ ...state, image });
      });
    });

  const uploadEventImage = async (eventId) => {
    setImageLoading(true);

    await HelperFunctions.uploadImage(
      `Events/${eventId}/${state.image.fileName}`,
      state.image.uri,
      (progress) => {
        setState({ ...state, progress });
        setImageLoading(true);
      },
      (error) => {
        // setState({ ...state, progressVisible: false, progress: 0 });
        setImageLoading(false);
        Alert.alert('Error', error);
      },
      async (imageUrl) =>
        dispatch.Events.updateEvent({
          eventId,
          payload: { imageUrl },
          callback: (resp) => {
            console.log('REsp from update image', resp);
            setImageLoading(false);

            if (!resp.success) return HelperFunctions.Notify('Error adding event photo', resp.result);
            return navigation.navigate('Events');
          }
        })
    );
  };

  const clearFields = () =>
    setState({ ...state, caption: '', image: {}, topics: [], progress: 0, progressVisible: false });

  const createEvent = async () => {
    // setState({ ...state, loading: true });
    Keyboard.dismiss();
    const dateCreated = new Date().toISOString();
    const { image, modalVisible, modalComponent, loading, price, ...rest } = state;
    const criteria = state.judgingCriteria.toLowerCase();
    const payload = {
      ...rest,
      dateCreated,
      likes: [],
      comments: [],
      attending: [],
      participating: [],
      imageUrl: '',
      price: state.free ? '0' : price,
      judgingCriteria: criteria,
      authorId: user._id
    };

    dispatch.Events.createEvent({
      payload,
      callback: (res) => {
        if (!res.success) return HelperFunctions.Notify('Error', res.result);
        if (state.image.uri && res.success) {
          return uploadEventImage(res.result._id);
        }
        setImageLoading(false);
        return navigation.navigate('Events');
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        style={{ flex1: 1 }}
        // scrollEnabled={false}
        automaticallyAdjustContentInsets={false}
        keyboardShouldPersistTaps="handled"
        // showsVerticalScrollIndicator={false}
      >
        {state.image.uri && state.image.uri.length ? (
          <ImageBackground
            source={{ uri: state.image && state.image.uri }}
            style={{ width: RFValue(100), height: RFValue(100), marginHorizontal: RFValue(10) }}
          >
            <Pressable
              onPress={selectImage}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                backgroundColor: 'rgba(0,0,0,.55)'
              }}
            >
              <Typo text="Change" color={WHITE} />
            </Pressable>
          </ImageBackground>
        ) : null}

        {!state.image.uri ? (
          <Pressable
            onPress={selectImage}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: RFValue(100),
              height: RFValue(100),
              backgroundColor: '#eee',
              margin: RFValue(10)
            }}
          >
            <Icon name="camera-plus" size={RFValue(50)} color="#ccc" />
            <Typo text="Add Photo" color={GRAY} pressable onPress={selectImage} size={12} />
          </Pressable>
        ) : null}

        <View style={{ width: '100%', paddingHorizontal: RFValue(10), marginTop: RFValue(10), alignSelf: 'center' }}>
          {/* <Text style={{ fontSize: RFValue(14) }}>Title of the event:</Text> */}
          <Input
            scrollEnabled={false}
            title="Add event title"
            value={state.title}
            onChangeText={(title) => setState({ ...state, title })}
            placeholder="Enter event title"
          />
        </View>

        {/* free */}
        <View style={{ margin: RFValue(10) }}>
          <Button
            title="Create event"
            onPress={createEvent}
            loading={loading.createEvent || imageLoading}
            extStyles={{ backgroundColor: '#000' }}
            textStyles={{ color: '#fff' }}
          />
        </View>
        {/* end freee */}
      </KeyboardAwareScrollView>
      {/* </View> */}
    </View>
  );
};

export default NewEvent;
