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
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import DatePicker from '../../../Components/DatePicker';
// import Calendar from '../../../Components/Calendar';
import OptionsSelector from './OptionsSelector';
import Modal from './Modal';
import ModalX from '../../../Components/Modal';
import Time from './Time';
import StartDate from './StartDate';
import EndDate from './EndDate';
import { useDispatch } from 'react-redux';
import { compressImage, showAlert, uploadImage, uploadImageToFirebase } from '../../../Utils/HelperFunctions';
import { QUERIES } from '../../../Firebase';
import LoadingModal from '../../../Components/LoadingModal';
import { useSelector } from 'react-redux';
import { BottomSheet, Buton, Button, DesignIcon, Input, TextArea, Typo } from '../../../Components';
import {
  ALL_INTERESTS,
  BLACK,
  BROWN,
  GRAY,
  HEIGHT,
  THEME_COLOR,
  THEME_COLOR2,
  THEME_COLOR3,
  THEME_COLOR4,
  THEME_COLOR5,
  THEME_COLOR6,
  THEME_COLOR7,
  WHITE
} from '../../../Utils/Constants';

const { height } = Dimensions.get('window');
const NewEvent = ({ navigation }) => {
  const dispatch = useDispatch();
  const [ visible, setVisible ] = React.useState(true);
  // const [ user, setUser ] = React.useState(true);
  const loading = useSelector((state) => state.loading.effects.Events);
  const { user } = useSelector((state) => state.Account);
  const [ imageLoading, setImageLoading ] = React.useState(false);

  const [ state, setState ] = React.useState({
    image: { uri: '', fileName: '', fileSize: 0 },
    categories: [],
    title: '',
    description: '',
    startDate: moment(new Date()).format('YYYY-MM-DD'),
    endDate: moment(new Date()).format('YYYY-MM-DD'),
    start: true,
    location: '',
    visible: false,
    eventInterval: 'once',
    eventDays: []
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

  const createEvent = () => {
    const {
      description,
      image,
      categories,
      title,
      location,
      startDate: eventDate,
      eventInterval,
      eventDays: eDays
    } = state;
    if (!description)
      return showAlert('Message is missing', 'You need to add details to your post in order to continue, try again');
    if (!eventDate)
      return showAlert('Date is missing', 'You need to add date for the event in order to continue, try again');
    if (!location)
      return showAlert(
        'Location is missing',
        'You need to add the location for the event in order to continue, try again'
      );

    let eventDays = [];

    if (eventInterval === 'once') eventDays = [];
    if (eventInterval === 'daily') eventDays = [ ...days ];
    if (eventInterval === 'weekly') eventDays = eDays;
    const payload = {
      description,
      authorId: user.uid,
      type: 'event',
      eventDate,
      eventInterval,
      location,
      eventDays,
      title
    };

    // console.log('Payload', payload);

    dispatch.Events.createEvent({
      payload,
      callback: (res) => {
        // console.log('HERE creating Event', res);
        if (!res.success) return showAlert('Failed to create post', res.result);
        if (image && image.fileName) return uploadEventImage(res.result._id);
        showAlert(
          'Successfully created post',
          'Your post has been successfully created and will be seen by others on the platform'
        );
        setState({});
      }
    });
  };

  const uploadEventImage = (eventId) => {
    const { image } = state;
    if (!image.base64)
      return showAlert('Invalid Image format', 'This image format is not supported or image is missing, try again');
    setImageLoading(true);
    // compress the image:
    compressImage(
      image,
      () => setImageLoading(true),
      (img) => {
        // Upload compressed image to firebase.
        uploadImageToFirebase(
          `/events/${eventId}/${image.fileName}`,
          img.base64,
          () => {},
          () => {
            setImageLoading(false);
          },
          (imageUrl) => {
            setImageLoading(false);
            dispatch.Events.updateEvent({
              eventId,
              payload: { imageUrl },
              callback: (res) => {
                // console.log('AFter updating post', res);
                if (!res.success)
                  return showAlert(
                    'Failed to create post',
                    'Something went wrong while trying to update image for your post'
                  );
                setState({});
                return showAlert(
                  'Your post has been created',
                  'Your posted has been created, you check it out in the posts section'
                );
              }
            });
          }
        );
      }
    );
  };

  const clearFields = () =>
    setState({ ...state, caption: '', image: {}, topics: [], progress: 0, progressVisible: false });

  const categoriesHandler = (exists, r) => {
    // console.log('Exists', exists, r);
    setState({
      ...state,
      categories: exists ? state.categories && state.categories.filter((x) => x !== r) : [ ...state.categories, r ]
    });
  };

  const setDate = (start) => {
    console.log('STart', start);
    setState({ ...state, start, visible: true });
    // setVisible(true);
  };

  const openModal = () => setState({ ...state, visible: true });

  const closeModal = () => setState({ ...state, visible: false });

  const dayPressHandler = (field, day) => {
    // console.log('DAY string---', state.start, day);
    let payload = {};
    payload = { ...payload, [field]: day.dateString };
    // else payload = { ...payload, startDate: day.dateString };
    setState({ ...state, ...payload });
  };

  const getMarkedDates = () => {
    return {
      [state.startDate]: { selected: true, color: '#3da48070' },
      [state.endDate]: { selected: true, color: `${THEME_COLOR}70` }
    };
  };

  const setDuration = (eventInterval) => setState({ ...state, eventInterval });

  const onDescriptionChanged = (description) => setState({ ...state, description });

  const setDays = (day) =>
    setState({
      ...state,
      eventDays:
        state.eventDays && state.eventDays.includes(day)
          ? state.eventDays.filter((r) => r !== day)
          : [ ...state.eventDays, day ]
    });

  const days = [ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday' ];

  return (
    <View style={{ flex: 1 }}>
      <BottomSheet isVisible={state.visible} closeModal={closeModal}>
        <View style={{ backgroundColor: WHITE, padding: RFValue(10), paddingBottom: RFValue(30) }}>
          <Typo
            text={`Select date when your event starts`}
            size={16}
            style={{ marginVertical: RFValue(15), fontWeight: 'normal', marginBottom: 0 }}
          />
          {state.start ? (
            <Calendar
              style={{ marginVertical: RFValue(30) }}
              minDate={moment(new Date()).format('YYYY-MM-DD')}
              enableSwipeMonths
              onDayPress={(e) => dayPressHandler('startDate', e)}
              // markedDates={getMarkedDates()}
              markedDates={{ [state.startDate]: { selected: true, color: `#3da48070` } }}
              markingType="period"
            />
          ) : (
            <Calendar
              style={{ marginVertical: RFValue(30) }}
              minDate={state.startDate}
              enableSwipeMonths
              onDayPress={(e) => dayPressHandler('endDate', e)}
              markedDates={{ [state.endDate]: { selected: true, color: `${THEME_COLOR}70` } }}
              markingType="period"
            />
          )}
          <Buton
            title="Confirm date"
            onPress={closeModal}
            extStyles={{ height: RFValue(35) }}
            textStyles={{ textTransform: 'none', color: WHITE }}
          />
        </View>
      </BottomSheet>
      <KeyboardAwareScrollView
        style={{ flex1: 1, paddingHorizontal: RFValue(10) }}
        // scrollEnabled={false}
        automaticallyAdjustContentInsets={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: RFValue(10) }}>
          <Typo
            text="Upload an image to show as Event photo"
            size={12}
            style={{ marginBottom: RFValue(5), marginTop: RFValue(15) }}
          />
          {state.image && state.image.uri && state.image.uri.length ? (
            <ImageBackground
              source={{ uri: state.image && state.image.uri }}
              style={{ width: RFValue(150), height: RFValue(150) }}
            >
              <Pressable
                onPress={selectImage}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  backgroundColor: 'rgba(0,0,0,.5)'
                }}
              >
                <Typo text="Change Photo" color={WHITE} pressable onPress={selectImage} />
              </Pressable>
            </ImageBackground>
          ) : (
            <Pressable
              onPress={selectImage}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: RFValue(150),
                height: RFValue(150),
                backgroundColor: '#eee'
                // margin: RFValue(10)
              }}
            >
              <Icon name="camera-plus" size={RFValue(100)} color="#dddddd" />
              <Typo text="Add Photo" color={GRAY} pressable onPress={selectImage} size={12} />
            </Pressable>
          )}
        </View>

        <View style={{ width: '100%', alignSelf: 'center' }}>
          {/* <Text style={{ fontSize: RFValue(14) }}>Title of the event:</Text> */}
          <Input
            scrollEnabled={false}
            title="Add event title"
            value={state.title}
            onChangeText={(title) => setState({ ...state, title })}
            placeholder="Enter event title"
            extInputStyles={{ backgroundColor: '#eee' }}
          />

          <Input
            scrollEnabled={false}
            title="Add event location"
            value={state.location}
            onChangeText={(location) => setState({ ...state, location })}
            placeholder="Enter location e.g Goethe Zentrum, Kampala"
            extInputStyles={{ backgroundColor: '#eee' }}
          />
        </View>

        <View style={{ marginBottom: RFValue(15) }}>
          <Typo text="How often is the event going to take happen" size={12} style={{ marginBottom: RFValue(5) }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            {[ 'once', 'daily', 'weekly' ].map((r) => {
              const same = state.eventInterval === r;
              return (
                <Pressable
                  onPress={() => setDuration(r)}
                  key={HelperFunctions.keyGenerator()}
                  style={{
                    backgroundColor: same ? THEME_COLOR : '#eee',
                    height: RFValue(35),
                    width: '32%',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typo
                    text={r === 'once' ? 'one time' : r}
                    style={{ textTransform: 'capitalize' }}
                    color={same ? '#fff' : THEME_COLOR}
                    onPress={() => setDuration(r)}
                    pressable
                  />
                </Pressable>
              );
            })}
          </View>
        </View>

        {state.eventInterval === 'weekly' || state.eventInterval === 'monthly' ? (
          <View style={{ marginBottom: RFValue(15) }}>
            <Typo
              text={`How often is the event going to happen\n(Select all the days relevant to your event)`}
              size={12}
              style={{ marginBottom: RFValue(5) }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              {days.map((r) => {
                const exists = state.eventDays && state.eventDays.includes(r);
                return (
                  <Pressable
                    onPress={() => setDays(r)}
                    key={HelperFunctions.keyGenerator()}
                    style={{
                      backgroundColor: exists ? THEME_COLOR4 : '#eee',
                      height: RFValue(35),
                      width: '13%',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typo
                      text={`${r && r.slice(0, 3)}`}
                      style={{ textTransform: 'capitalize' }}
                      color={exists ? '#fff' : '#000'}
                      onPress={() => setDays(r)}
                      pressable
                      size={12}
                    />
                  </Pressable>
                );
              })}
            </View>
          </View>
        ) : null}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: RFValue(15)
          }}
        >
          {[
            { title: 'Start Date', onPress: true, value: state.startDate, start: true, bg: '#3da48070', color: WHITE }
            // { title: 'End Date', onPress: false, value: state.endDate, start: false, bg: `${THEME_COLOR}70` }
          ].map((r) => (
            <View style={{ width: '100%' }} key={HelperFunctions.keyGenerator()}>
              <Typo text={r.title} size={12} style={{ marginBottom: RFValue(5) }} />
              <Pressable
                onPress={() => setDate(r.onPress)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: r.bg || '#eee',
                  height: RFValue(35),
                  paddingHorizontal: RFValue(10)
                }}
              >
                <DesignIcon name="calendar" pkg="ad" onPress={() => setDate(r.onPress)} color={BLACK} />
                <Typo
                  text={r.value ? moment(r.value).format('dddd, Do - MMMM - YYYY') : `${r.title}`}
                  style={{ paddingLeft: RFValue(15), flexGrow: 1 }}
                  // color={state[r.value] ? '#000' : '#aaa'}
                  color={BLACK}
                  pressable
                  onPress={() => setDate(r.onPress)}
                  size={14}
                />
                <DesignIcon
                  name="chevron-down"
                  pkg="mc"
                  onPress={() => setDate(r.onPress)}
                  color={BLACK}
                  style={{ alignSelf: 'flex-end' }}
                />
              </Pressable>
            </View>
          ))}
        </View>

        {/* free */}
        {/* <View style={{ margin: RFValue(10) }}> */}

        <TextArea
          title="Enter details about this event below"
          extInputStyles={{ backgroundColor: '#fff', paddingLeft: 0 }}
          placeholder={`Enter event details here...\n\nCome watch breakers battle it out. Top bboys around East Africa, all competing for the top prize\n\nTime: 2:00pm\nVenue: Goethe Zentrum Kampala\nFee: FREE!!!\n\nSee you there🎉`}
          minSize={0.25 * HEIGHT}
          value={state.description}
          onChangeText={onDescriptionChanged}
        />

        <Button
          title="Create event"
          onPress={createEvent}
          loading={loading.createEvent || loading.updateEvent || imageLoading}
          extStyles={{ backgroundColor: '#000', marginBottom: RFValue(10) }}
          textStyles={{ color: '#fff' }}
        />
        {/* </View> */}
        {/* end freee */}
      </KeyboardAwareScrollView>
      {/* </View> */}
    </View>
  );
};

export default NewEvent;
