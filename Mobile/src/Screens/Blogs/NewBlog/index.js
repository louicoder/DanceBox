import React from 'react';
import { View, Text, ImageBackground, Pressable, TextInput, Alert, Keyboard, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CONSTANTS, HelperFunctions } from '../../../Utils';
import { PERMISSIONS } from 'react-native-permissions';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import DatePicker from '../../../Components/DatePicker';
import LoadingModal from '../../../Components/LoadingModal';
import { useDispatch } from 'react-redux';
import Modal from '../../../Components/Modal';
import { QUERIES } from '../../../Firebase';
import auth from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';

const NewBlog = ({ navigation }) => {
  const { user } = useSelector((state) => state.Account);
  const loading = useSelector((state) => state.loading.effects.Blogs);
  const dispatch = useDispatch();
  const [ modal, setModal ] = React.useState(true);
  const [ state, setState ] = React.useState({
    image: {},
    tags: [],
    tagsVisible: true,
    date: moment(new Date()).format('YYYY-MM-DD'),
    free: 'free',
    datePickerVisible: false,
    loading: false,
    title: 'My new blog',
    description: '',
    component: 'startdate',
    modalVisible: false
    // dateTime: new Date().toString()
  });

  React.useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      await HelperFunctions.CHECK_GALLERY_PERMISSIONS((res) => {
        console.log('Gallery prems', res);
        if (!res.success)
          return HelperFunctions.Notify(
            'Error',
            'You need to grant DAncebox permissions to access your gallery so you can upload images for you blog'
          );
      });
    } catch (error) {
      return HelperFunctions.Notify('Error', error.message);
    }
  };

  const selectImage = () =>
    HelperFunctions.CheckPermissions(
      Platform.select({ android: PERMISSIONS.ANDROID.CAMERA, ios: PERMISSIONS.IOS.PHOTO_LIBRARY }),
      HelperFunctions.ImagePicker((image) => {
        console.log('REsponse', image);
        if (image.uri) setState({ ...state, image });
      })
    );

  // const RenderModComponent = ({ component, endDate, startDate, setDate, closeModal }) => {
  //   // console.log('CReate');
  //   switch (component) {
  //     case 'time':
  //       return <Time />;
  //     case 'startdate':
  //       // return <StartDate setDate={setDate} date={startDate} closeModal={closeModal} />;
  //       return (
  //         <View
  //           style={{ width: '100%', height: RFValue(200), backgroundColor: '#fff', position: 'absolute', bottom: 0 }}
  //         />
  //       );
  //     case 'enddate':
  //       return <EndDate setDate={setDate} date={endDate} closeModal={closeModal} />;
  //   }
  // };

  const uploadBlogImage = async (blogId) => {
    try {
      await HelperFunctions.uploadImage(
        `Blogs/${blogId}/${state.image.fileName}`,
        state.image.uri,
        (progress) => {
          setState({ ...state, progress, loading: true });
        },
        (error) => {
          setState({ ...state, progressVisible: false, progress: 0 });
          Alert.alert('Error', error);
        },
        async (imageUrl) =>
          // dispatch.Blogs.updateBlog(blogId, { imageUrl }, (res) => {
          //   // updated
          //   console.log('updated event', res);
          //   setState({ ...state, loading: false });
          //   if (res.doc) return navigation.navigate('Blogs');
          // })
          dispatch.Blogs.updateBlog({
            blogId,
            payload: { imageUrl },
            callback: (res) => {
              // updated
              console.log('updated event', res);
              setState({ ...state, loading: false });
              if (!res.success) return HelperFunctions.Notify('Error', res.result);
              return navigation.navigate('Blogs');
            }
          })
      );
    } catch (error) {
      setState({ ...state, loading: false });
      Alert.alert('Error', error.message);
    }
  };

  // console.log('USER::::', user);
  const createBlog = async () => {
    Keyboard.dismiss();
    if (!state.title) return HelperFunctions.Notify('Error', 'Please add a title for your blog post');
    if (!state.decription || !state.description.length > 50)
      return HelperFunctions.Notify('Error', 'The description of your blog post is very short');
    setState({ ...state, loading: true });

    try {
      const dateCreated = new Date().toISOString();
      const { description, title, tags } = state;
      const payload = {
        description,
        title,
        likes: [],
        comments: [],
        imageUrl: '',
        tags,
        owner: { uid: user.uid, email: user.email, imageUrl: user.imageUrl || '', name: user.name }
      };
      dispatch.Blogs.createBlog({
        payload,
        callback: (res) => {
          console.log('Response BLOG Create', res.result);
          if (!res.success) {
            return HelperFunctions.Notify('Error', res.result);
          }
          if (state.image.uri) return uploadBlogImage(res.result._id);
          setState({ ...state, loading: false });
          return navigation.navigate('Blogs');
        }
      });
    } catch (error) {
      setState({ ...state, loading: false });
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LoadingModal isVisible={state.loading || loading.updateDoc} />
      {/* <Modal isVisible={modal} closeModal={() => setModal(false)}>
        <RenderModComponent component={state.component} />
      </Modal> */}
      <KeyboardAwareScrollView
        style={{}}
        automaticallyAdjustContentInsets={false}
        // scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {state.image.uri ? (
          <ImageBackground source={{ uri: state.image.uri }} style={{ width: '100%', height: RFValue(300) }}>
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

        <Pressable
          onPress={() => setState({ ...state, tagsVisible: !state.tagsVisible })}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: RFValue(10)
          }}
        >
          <Text style={{ fontSize: RFValue(14) }}>Add tags to your blog</Text>
          <Icon name={state.tagsVisible ? 'chevron-up' : 'chevron-down'} size={RFValue(30)} />
        </Pressable>
        {state.tagsVisible ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: RFValue(10) }}>
            {CONSTANTS.INTERESTS.map((item) => (
              <Pressable
                key={HelperFunctions.keyGenerator()}
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

        {/* free */}
        <View style={{ margin: RFValue(10) }}>
          <Text style={{ fontSize: RFValue(14) }}>Add your blog title:</Text>
          <TextInput
            scrollEnabled={false}
            value={state.title}
            onChangeText={(title) => setState({ ...state, title })}
            placeholder="Enter blog title"
            // multiline
            style={{
              backgroundColor: '#eee',
              height: RFValue(50),
              marginVertical: RFValue(10),
              fontSize: RFValue(14),
              paddingHorizontal: RFValue(10)
            }}
          />

          <Text style={{ fontSize: RFValue(14) }}>Add your blog description:</Text>
          <TextInput
            scrollEnabled={false}
            value={state.description}
            onChangeText={(description) => setState({ ...state, description })}
            textAlignVertical="top"
            placeholder="Enter blog description"
            multiline
            style={{
              backgroundColor: '#eee',
              minHeight: RFValue(250),
              marginVertical: RFValue(10),
              fontSize: RFValue(14),
              paddingHorizontal: RFValue(10)
            }}
          />
          <Pressable
            onPress={createBlog}
            style={{
              backgroundColor: '#010203',
              height: RFValue(50),
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 200
            }}
          >
            <Text style={{ color: '#fff', fontSize: RFValue(16), fontWeight: 'bold' }}>Create blog</Text>
          </Pressable>
        </View>
        {/* end freee */}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default NewBlog;
