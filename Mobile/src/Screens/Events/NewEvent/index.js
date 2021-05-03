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
  Keyboard
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HelperFunctions } from '../../../Utils';
import { PERMISSIONS } from 'react-native-permissions';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import DatePicker from '../../../Components/DatePicker';
import Calendar from '../../../Components/Calendar';
import OptionsSelector from './OptionsSelector';
import Modal from './Modal';
import Time from './Time';
import StartDate from './StartDate';
import EndDate from './EndDate';
import { useDispatch } from 'react-redux';
import { uploadImage } from '../../../Utils/HelperFunctions';
import { QUERIES } from '../../../Firebase';
import LoadingModal from '../../../Components/LoadingModal';

const { height } = Dimensions.get('window');
const NewEvent = ({ navigation }) => {
  const dispatch = useDispatch();
  const [ state, setState ] = React.useState({
    image: {},
    tags: [],
    tagsVisible: true,
    // date: moment(new Date()).format('YYYY-MM-DD'),
    price: 'free',
    // datePickerVisible: false,
    modalVisible: false,
    modalComponent: 'startdate',
    startDate: new Date(),
    endDate: new Date(),
    amount: 0,
    title: 'The new event here',
    description: 'This is the descitpion of the event',
    judgingCriteria: 'Just a tesfro judging criteria',
    judges: 'Judges',
    noOfJudges: null,
    loading: false,
    location: ''
    // dateTime: new Date().toString()
  });

  // const checkPermissions = async () => await HelperFunctions.CheckPermissions()
  // console.log('STATE DATE', new Date(state.date).toISOString('YYYY-MM-DD'));

  const selectImage = () =>
    HelperFunctions.CheckPermissions(
      Platform.select({ android: PERMISSIONS.ANDROID.CAMERA, ios: PERMISSIONS.IOS.PHOTO_LIBRARY }),
      HelperFunctions.ImagePicker((image) => {
        console.log('REsponse', image);
        if (image.uri) setState({ ...state, image });
      })
    );
  // console.log('tags', state.tags);

  const RenderModComponent = ({ component, endDate, startDate, setDate, closeModal }) => {
    // console.log('CReate');
    switch (component) {
      case 'time':
        return <Time />;
      case 'startdate':
        return <StartDate setDate={setDate} date={startDate} closeModal={closeModal} />;
      case 'enddate':
        return <EndDate setDate={setDate} date={endDate} closeModal={closeModal} />;
    }
  };

  const uploadEventImage = async (eventId) => {
    await HelperFunctions.uploadImage(
      `Events/${eventId}/${state.image.fileName}`,
      state.image.uri,
      (progress) => {
        setState({ ...state, progress, loading: true });
      },
      (error) => {
        setState({ ...state, progressVisible: false, progress: 0 });
        Alert.alert('Error', error);
      },
      async (imageUrl) =>
        QUERIES.updateDoc('Events', eventId, { imageUrl }, (res) => {
          // updated
          // console.log('updated event', res);
          setState({ ...state, loading: false });
        })
    );
  };

  const clearFields = () =>
    setState({ ...state, caption: '', image: {}, topics: [], progress: 0, progressVisible: false });

  const createEvent = async () => {
    setState({ ...state, loading: true });
    Keyboard.dismiss();
    const dateCreated = new Date().toISOString();
    const { image, modalVisible, modalComponent, loading, ...rest } = state;
    const payload = { ...rest, dateCreated, likes: [], comments: 0, attending: [], imageUrl: '' };

    dispatch.Events.createEvent({
      payload,
      callback: (res) => {
        // console.log('Response', res);
        if (state.image.uri) return uploadEventImage(res.doc);
        setState({ ...state, loading: false });
        return navigation.navigate('Events');
      }
    });
  };

  return (
    <React.Fragment>
      <LoadingModal isVisible={state.loading} />
      {state.modalVisible && (
        <Modal visible={state.modalVisible} closeModal={() => setState({ ...state, modalVisible: false })}>
          <RenderModComponent
            component={state.modalComponent}
            setDate={(field, date) => setState({ ...state, [field]: date })}
            endDate={state.endDate}
            startDate={state.startDate}
            closeModal={() => setState({ ...state, modalVisible: false })}
          />
        </Modal>
      )}
      <View style={{ flex: 1 }}>
        <ScrollView
          // style={{ zindex: 1 }}
          automaticallyAdjustContentInsets={false}
          keyboardShouldPersistTaps="handled"
          // showsVerticalScrollIndicator={false}
        >
          {state.image.uri && state.image.uri.length ? (
            <ImageBackground
              source={{ uri: state.image && state.image.uri }}
              style={{ width: '100%', height: RFValue(300) }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  backgroundColor: 'rgba(0,0,0,.55)'
                }}
              >
                <Pressable
                  onPress={selectImage}
                  style={{ marginHorizontal: RFValue(15), borderWidth: 1, borderColor: '#fff', padding: RFValue(10) }}
                >
                  <Text style={{ color: '#fff' }}> Change Image</Text>
                </Pressable>
                <Pressable
                  style={{ backgroundColor: '#fff', borderWidth: 1, padding: RFValue(10) }}
                  onPress={() => setState({ ...state, image: {} })}
                >
                  <Text style={{ color: '#000' }}> Remove Image</Text>
                </Pressable>
              </View>
            </ImageBackground>
          ) : null}

          {!state.image.uri ? (
            <Pressable
              onPress={selectImage}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: RFValue(300),
                backgroundColor: '#eee'
              }}
            >
              <Icon name="camera-plus" size={RFValue(100)} color="#aaa" />
              <Pressable onPress={selectImage}>
                <Text style={{ color: '#aaa', fontSize: RFValue(14) }}>Click to add an photo</Text>
              </Pressable>
            </Pressable>
          ) : null}

          <View style={{ width: '100%', paddingHorizontal: RFValue(10), marginTop: RFValue(10), alignSelf: 'center' }}>
            <Text style={{ fontSize: RFValue(14) }}>Enter title of the event:</Text>
            <TextInput
              scrollEnabled={false}
              value={state.title}
              onChangeText={(title) => setState({ ...state, title })}
              placeholder="Enter event title"
              multiline
              style={{
                backgroundColor: '#eee',
                height: RFValue(50),
                marginVertical: RFValue(10),
                fontSize: RFValue(14),
                paddingHorizontal: RFValue(10)

                // maxHeight: RFValue(200)
              }}
            />
          </View>

          <Pressable
            onPress={() => setState({ ...state, tagsVisible: !state.tagsVisible })}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: RFValue(10),
              marginHorizontal: RFValue(10)
            }}
          >
            <Text style={{ fontSize: RFValue(14) }}>Add tags to your blog</Text>
            <Icon name={state.tagsVisible ? 'chevron-up' : 'chevron-down'} size={RFValue(30)} />
          </Pressable>
          {state.tagsVisible ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: RFValue(10) }}>
              {[ 'breaking', 'salsa', 'capoera', 'dance class', 'free style', 'beatboxing' ].map((item) => (
                <Pressable
                  style={{
                    marginRight: RFValue(10),
                    backgroundColor: state.tags && state.tags.includes(item) ? '#000' : 'transparent',
                    borderWidth: 1,
                    borderColor: state.tags && state.tags.includes(item) ? '#000' : '#ccc',
                    borderRadius: RFValue(50),
                    padding: RFValue(10),
                    marginBottom: RFValue(10)
                  }}
                  onPress={() =>
                    setState({
                      ...state,
                      tags:
                        state.tags && state.tags.includes(item)
                          ? state.tags.filter((it) => it !== item)
                          : [ ...state.tags, item ]
                    })}
                  // onPress={() => alert(item)}
                >
                  <Text style={{ color: state.tags && state.tags.includes(item) ? '#fff' : '#000' }}>{item}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}

          <DatePicker
            onPress={() => setState({ ...state, modalVisible: true, modalComponent: 'startdate' })}
            // setDate={(startDate) => setState({ ...state, startDate })}
            title="Select event start date"
            date={state.startDate}
          />

          <DatePicker
            onPress={() => setState({ ...state, modalVisible: true, modalComponent: 'enddate' })}
            // setDate={(endDate) => setState({ ...state, endDate })}
            title="Select event end date"
            date={state.endDate}
          />

          {/* free */}
          <View style={{ margin: RFValue(10) }}>
            <OptionsSelector
              setItem={(price) => setState({ ...state, price })}
              items={[ 'free', 'paid' ]}
              header="Select event pricing below"
              defaultValue="free"
            />

            {state.price === 'paid' && <Text style={{ fontSize: RFValue(14) }}>Enter event price below:</Text>}
            {state.price === 'paid' ? (
              <TextInput
                keyboardType="number-pad"
                style={{
                  backgroundColor: '#eee',
                  height: RFValue(50),
                  fontSize: state.amount && state.amount.length ? RFValue(18) : RFValue(14),
                  paddingHorizontal: RFValue(10),
                  marginVertical: RFValue(10)
                }}
                placeholder="Enter event amount in Ugx"
                value={state.amount}
                onChangeText={(amount) => setState({ ...state, amount })}
              />
            ) : null}

            <OptionsSelector
              setItem={(judges) => setState({ ...state, judges })}
              items={[ 'Judges', 'Audience', 'Both' ]}
              header="Select the event judging criteria"
              extStyles={{ width: '33.33%' }}
            />
            <OptionsSelector
              setItem={(noOfJudges) => setState({ ...state, noOfJudges })}
              items={[ '3 judges', '5 judges' ]}
              header="Select how many judges on panel"
            />

            <Text style={{ fontSize: RFValue(14) }}>Enter event description:</Text>
            <TextInput
              scrollEnabled={false}
              value={state.description}
              onChangeText={(description) => setState({ ...state, description })}
              placeholder="Enter event description"
              multiline
              style={{
                backgroundColor: '#eee',
                height: RFValue(50),
                marginVertical: RFValue(10),
                fontSize: RFValue(14),
                paddingHorizontal: RFValue(10)
                // maxHeight: RFValue(200)
              }}
            />

            <Text style={{ fontSize: RFValue(14) }}>Enter location for event:</Text>
            <TextInput
              scrollEnabled={false}
              value={state.location}
              onChangeText={(location) => setState({ ...state, location })}
              placeholder="Enter event location"
              multiline
              style={{
                backgroundColor: '#eee',
                height: RFValue(50),
                marginVertical: RFValue(10),
                fontSize: RFValue(14),
                paddingHorizontal: RFValue(10)
                // maxHeight: RFValue(200)
              }}
            />

            <Text style={{ fontSize: RFValue(14) }}>Enter judging criteria:</Text>
            <TextInput
              scrollEnabled={false}
              value={state.judgingCriteria}
              onChangeText={(judgingCriteria) => setState({ ...state, judgingCriteria })}
              placeholder="Enter the judging criteria"
              multiline
              style={{
                backgroundColor: '#eee',
                height: RFValue(50),
                marginVertical: RFValue(10),
                fontSize: RFValue(14),
                paddingHorizontal: RFValue(10)
                // maxHeight: RFValue(200)
              }}
            />
            <Pressable
              onPress={createEvent}
              style={{
                backgroundColor: '#010203',
                height: RFValue(50),
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ color: '#fff', fontSize: RFValue(16), fontWeight: 'bold' }}>Create event</Text>
            </Pressable>
          </View>
          {/* end freee */}
        </ScrollView>
      </View>
    </React.Fragment>
  );
};

export default NewEvent;
