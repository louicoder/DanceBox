import { View, Text, Image, Platform, Pressable, Alert } from 'react-native';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Buton, DesignIcon, Header, Input, TextArea, Typo } from '../../Components';
import {
  ALL_INTERESTS,
  BLACK,
  BROWN,
  DANCE_STYLES,
  GRAY,
  HALF_BROWN,
  HEIGHT,
  INTERESTS,
  THEME_COLOR,
  WHITE,
  WIDTH
} from '../../Utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import { PERMISSIONS, check } from 'react-native-permissions';
import { CheckPermissions, ImagePicker, showAlert, uploadImageToFirebase } from '../../Utils/HelperFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { HelperFunctions } from '../../Utils';

const NewPost = ({ imageUrl = '', closeModal }) => {
  const [ imageLoading, setImageLoading ] = React.useState(false);
  const [ state, setState ] = React.useState({
    image: { uri: '', fileName: '', fileSize: 0 },
    categories: [],
    description: ''
  });
  const { user } = useSelector((st) => st.Account);
  const loading = useSelector((st) => st.loading.effects.Blogs);
  const dispatch = useDispatch();

  const pickImage = async () =>
    CheckPermissions(
      Platform.select({ ios: PERMISSIONS.IOS.PHOTO_LIBRARY, android: PERMISSIONS.ANDROID.CAMERA }),
      (res) => {
        // console.log('Permissions', res);
        if (!res.success)
          return showAlert('Could pick photo', 'Please make sure you grant the app permissions to access your gallery');
        // console.log('Image', [ ...Object.keys(res.result) ]);
        ImagePicker((res) => {
          // console.log('RESULT IMAGE', res);
          if (res.fileName) setState({ ...state, image: { ...res } });
        });
      }
    );

  const createPost = () => {
    const { description, image, categories } = state;
    if (!description)
      return Alert.alert('Message is missing', 'You need to add details to your post in order to continue, try again');

    const payload = { description, categories, authorId: user.uid, type: 'post' };

    dispatch.Blogs.createBlog({
      payload,
      callback: (res) => {
        console.log('HERE blog', res);
        if (!res.success) return showAlert('Failed to create post', res.result);
        if (state.image && state.image.fileName) return uploadImage(res.result._id);
        showAlert(
          'Successfully created post',
          'Your post has been successfully created and will be seen by others on the platform'
        );
        setState({});
      }
    });
  };

  const uploadImage = (blogId) => {
    const { image } = state;
    if (!image.base64)
      return showAlert('Invalid Image format', 'This image format is not supported or image is missing, try again');
    setImageLoading(true);
    uploadImageToFirebase(
      `/blogs/${blogId}/${image.fileName}`,
      image.base64,
      () => {},
      () => {
        setImageLoading(false);
      },
      (imageUrl) => {
        setImageLoading(false);
        dispatch.Blogs.updateBlog({
          blogId,
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
  };

  const categoriesHandler = (exists, r) => {
    // console.log('Exists', exists, r);
    setState({
      ...state,
      categories: exists ? state.categories && state.categories.filter((x) => x !== r) : [ ...state.categories, r ]
    });
  };

  // console.log('RE-rendering=----');

  const onDescriptionChanged = (description) => setState({ ...state, description });

  return (
    <View style={{ flex: 1, height: HEIGHT }}>
      {/* <Header
        title="Create Post"
        titleStyles={{ color: WHITE }}
        onBackPress={closeModal}
        iconProps={{ color: WHITE }}
        extStyles={{ backgroundColor: THEME_COLOR }}
      /> */}
      <KeyboardAwareScrollView
        style={{ flexGrow: 1, paddingHorizontal: RFValue(8) }}
        keyboardShouldPersistTaps="always"
      >
        <Typo
          text="Add an image (Optional) [ Maximum size = 5Mbs ]"
          size={12}
          style={{ marginBottom: RFValue(5), marginTop: RFValue(15) }}
        />
        <Pressable
          style={{
            width: 0.35 * WIDTH,
            height: 0.35 * WIDTH,
            position: 'relative',
            padding: RFValue(10),
            // borderWidth: 1,
            backgroundColor: BROWN,
            marginBottom: RFValue(10)
            // alignItems: 'center',
            // justifyContent: 'center'
          }}
          onPress={pickImage}
        >
          {state.image && state.image.uri ? (
            <DesignIcon
              onPress={() => setState({ ...state, image: {} })}
              name="close"
              pkg="ad"
              color={WHITE}
              style={{ position: 'absolute', right: RFValue(10), top: RFValue(10), zIndex: 50 }}
            />
          ) : null}
          {state.image && state.image.uri ? (
            <Image source={{ uri: state.image.uri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
          ) : (
            <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <DesignIcon name="images" pkg="et" size={60} color={GRAY} />
              <Typo
                text="Click to Select photo"
                size={12}
                color={GRAY}
                pressable
                onPress={pickImage}
                style={{ textAlign: 'center', marginTop: RFValue(10) }}
              />
            </View>
          )}
          {state.image && state.image.uri ? (
            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: state.image ? 'rgba(0,0,0,.7)' : 'transparent',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typo text={'Change photo'} size={12} color={WHITE} />
            </View>
          ) : null}
        </Pressable>
        {/* <Input extInputStyles={{ backgroundColor: BROWN }} title="" /> */}

        <TextArea
          title="Enter your post detials below"
          extInputStyles={{ backgroundColor: BROWN }}
          placeholder="Please enter your post details right here..."
          minSize={0.25 * HEIGHT}
          value={state.description}
          onChangeText={onDescriptionChanged}
        />

        <View>
          <Typo text="Select relevant categories for your post" size={12} style={{ marginBottom: RFValue(10) }} />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: RFValue(10) }}>
            {[ ...ALL_INTERESTS ].map((r) => {
              const exists = state.categories && state.categories.includes(r);
              return (
                <Pressable
                  onPress={() => categoriesHandler(exists, r)}
                  key={HelperFunctions.keyGenerator()}
                  style={{
                    backgroundColor: exists ? BLACK : BROWN,
                    paddingVertical: RFValue(5),
                    paddingHorizontal: RFValue(10),
                    marginRight: RFValue(5),
                    borderRadius: 50,
                    marginBottom: RFValue(5)
                  }}
                >
                  <Typo
                    key={HelperFunctions.keyGenerator()}
                    text={r}
                    size={12}
                    color={exists ? WHITE : BLACK}
                    pressable
                    onPress={() => categoriesHandler(exists, r)}
                    style={{
                      // backgroundColor: exists ? BLACK : BROWN,
                      // paddingVertical: RFValue(5),
                      // paddingHorizontal: RFValue(10),
                      // marginRight: RFValue(5),
                      // borderRadius: 50,
                      // marginBottom: RFValue(5)
                    }}
                  />
                </Pressable>
              );
            })}
          </View>
        </View>

        <Buton
          title="Submit Post"
          onPress={createPost}
          extStyles={{ backgroundColor: BLACK, marginBottom: RFValue(20) }}
          loading={loading.createBlog || loading.updateBlog || imageLoading}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default NewPost;
