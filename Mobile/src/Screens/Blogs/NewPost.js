import { View, Text, Image, Platform, Pressable, Alert, Dimensions } from 'react-native';
import React, { useCallback } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BottomSheet, Buton, DesignIcon, Header, Input, TextArea, Typo } from '../../Components';
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
import {
  CheckPermissions,
  compressImage,
  ImagePicker,
  showAlert,
  uploadImageToFirebase
} from '../../Utils/HelperFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { HelperFunctions } from '../../Utils';
import FastImage from 'react-native-fast-image';

const { width, height } = Dimensions.get('window');

const NewPost = ({ imageUrl = '' }) => {
  const [ imageLoading, setImageLoading ] = React.useState(false);
  const [ state, setState ] = React.useState({
    image: { uri: '', fileName: '', fileSize: 0 },
    categories: [],
    description: ''
  });
  const [ isVisible, setIsvisible ] = React.useState(false);
  const [ image, setImage ] = React.useState({ height: null, width: null });

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
    // compressImageForUpload();
    const { description, image, categories } = state;
    if (!description && !image.uri)
      return Alert.alert(
        'Post is empty',
        'You need to add an image or words to your post in order to continue, try again'
      );
    const payload = { description, categories, authorId: user.uid, type: 'post' };
    dispatch.Blogs.createBlog({
      payload,
      callback: (res) => {
        console.log('HERE blog', res);
        if (!res.success) return showAlert('Failed to create post', res.result);
        // if (state.image && state.image.fileName) return uploadImage(res.result._id);
        if (state.image && state.image.fileName) return compressImageForUpload(res.result._id);
        showAlert(
          'Successfully created post',
          'Your post has been successfully created and will be seen by others on the platform'
        );
        setState({});
      }
    });
  };

  const compressImageForUpload = (blogId) =>
    compressImage(
      state.image,
      (prog) => {
        console.log('Progress', prog);
      },
      (url) => {
        // console.log('ULR from COMPRESS', url);
        if (url.base64) return uploadImage(blogId, url);
      }
    );

  const uploadImage = (blogId, imageObject) => {
    const { base64, fileName } = imageObject;
    if (!base64)
      return showAlert('Invalid Image format', 'This image format is not supported or image is missing, try again');
    setImageLoading(true);
    uploadImageToFirebase(
      `/blogs/${blogId}/${fileName}`,
      base64,
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

  // console.log('RE-NDERxxxxx', width, state.image.width, state.image.height, width / state.image.width);

  const getImageStyles = (imgWidth, imageHeight) => {
    const ratio = WIDTH / imgWidth;
    const height = imageHeight * ratio;
    setImage({ ...image, width: WIDTH, height });
    // return { width, height: imageHeight * ratio };
  };

  const openModal = () => setIsvisible(true);

  const closeModal = () => setIsvisible(false);

  const onDescriptionChanged = (description) => setState({ ...state, description });

  return (
    <View style={{ flex: 1 }}>
      <BottomSheet isVisible={isVisible} closeModal={closeModal}>
        <View style={{ padding: RFValue(10), alignItems: 'center' }}>
          <Typo
            text="Select relevant categories for your post"
            size={16}
            style={{ marginVertical: RFValue(15), fontWeight: 'bold', marginBottom: RFValue(20) }}
          />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: RFValue(10), justifyContent: 'center' }}>
            {[ ...ALL_INTERESTS ].map((r) => {
              const exists = state.categories && state.categories.includes(r);
              return (
                <Pressable
                  onPress={() => categoriesHandler(exists, r)}
                  key={HelperFunctions.keyGenerator()}
                  style={{
                    backgroundColor: exists ? BLACK : BROWN,
                    paddingVertical: RFValue(8),
                    paddingHorizontal: RFValue(10),
                    marginRight: RFValue(5),
                    borderRadius: 50,
                    marginBottom: RFValue(8)
                  }}
                >
                  <Typo
                    key={HelperFunctions.keyGenerator()}
                    text={r}
                    size={12}
                    color={exists ? WHITE : BLACK}
                    pressable
                    onPress={() => categoriesHandler(exists, r)}
                    style={{}}
                  />
                </Pressable>
              );
            })}
          </View>
        </View>
      </BottomSheet>

      <KeyboardAwareScrollView
        style={{ flex: 1, paddingHorizontal: RFValue(0), paddingBottom: RFValue(0) }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Profile Preview */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: RFValue(8),
            // borderWidth: 1,
            width: '100%',
            marginVertical: RFValue(15)
          }}
        >
          {user.photoURL ? (
            <FastImage
              source={{ uri: user.photoURL }}
              style={{ width: RFValue(45), height: RFValue(45), borderRadius: 60 }}
            />
          ) : (
            <View
              style={{
                width: RFValue(45),
                height: RFValue(45),
                borderRadius: 60,
                backgroundColor: '#eee',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <DesignIcon name="user" pkg="ad" size={30} />
            </View>
          )}
          <View style={{ paddingHorizontal: RFValue(10), flexGrow: 1 }}>
            <Typo text={user && (user.name || user.email)} style={{ fontWeight: 'bold' }} />
            <Pressable
              onPress={openModal}
              style={{
                backgroundColor: '#eee',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: RFValue(25),
                borderRadius: RFValue(5),
                paddingHorizontal: RFValue(10),
                marginTop: RFValue(5),
                flexDirection: 'row',
                alignSelf: 'flex-start'
              }}
            >
              <Typo text={state.categories && state.categories.length ? `Edit Tags` : 'Select tags'} size={11} />
              <DesignIcon name="chevron-down" pkg="mc" size={20} />
            </Pressable>
          </View>

          <Pressable
            onPress={pickImage}
            style={{ padding: RFValue(10), backgroundColor: '#eee', borderRadius: RFValue(5), flexDirection: 'row' }}
          >
            <DesignIcon name="camera-plus-outline" pkg="mc" color="#ffba08" size={25} onPress={pickImage} />
            {/* <DesignIcon name="plus" pkg="ad" color={GRAY} size={25} /> */}
          </Pressable>
        </View>

        {/* Profile Preview */}
        <View style={{ flexGrow: 1, borderWidth: 0 }}>
          <TextArea
            // title="Enter your post detials below"
            extInputStyles={{
              backgroundColor: WHITE,
              paddingTop: 0,
              paddingHorizontal: RFValue(8),
              fontSize: RFValue(16)
              // borderWidth: 1
            }}
            placeholder={`What do you want to say...?\n\nTake for example:\n\nI have travelled a couple of places but nothing comes close to Rwanda in the EastAfrican region\nThere arts community is really interesting\n\nI met a couple of dancers in traditional and urban styles 😎`}
            minSize={0.4 * (HEIGHT - RFValue(80))}
            value={state.description}
            onChangeText={onDescriptionChanged}
            placeHolderTextColor="#ccc"
            // extStyles={{ height: '100%' }}
          />
        </View>

        {state.categories && state.categories.length ? (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingHorizontal: RFValue(10),
              // marginVertical: RFValue(10),
              borderTopWidth: 1,
              // borderBottomWidth: 1,
              borderColor: '#eee',
              paddingVertical: RFValue(10)
            }}
          >
            <Typo
              text={[ ...state.categories.map((r) => `#${r}`) ].join(', ')}
              color={GRAY}
              style={{ fontStyle: 'italic', marginBottom: RFValue(5) }}
              size={12}
            />
          </View>
        ) : null}

        <View style={{ width }}>
          {state.image && state.image.uri ? (
            <View style={{ width }}>
              <FastImage
                source={{ uri: state.image.uri }}
                style={image}
                resizeMode="contain"
                onLoad={(e) => getImageStyles(e.nativeEvent.width, e.nativeEvent.height)}
              />
              <Pressable
                onPress={() => setState({ ...state, image: {} })}
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  paddingHorizontal: RFValue(10),
                  paddingVertical: RFValue(5),
                  right: RFValue(10),
                  top: RFValue(10),
                  backgroundColor: 'rgba(0,0,0,.5)',
                  flexDirection: 'row',
                  borderRadius: RFValue(50)
                }}
              >
                <Typo
                  text="Remove"
                  color="#fff"
                  style={{ lineHeight: RFValue(15) }}
                  onPress={() => setState({ ...state, image: {} })}
                />
                <DesignIcon
                  name="close"
                  pkg="ad"
                  size={20}
                  style={{ marginLeft: RFValue(5) }}
                  color="#fff"
                  onPress={() => setState({ ...state, image: {} })}
                />
              </Pressable>
            </View>
          ) : null}
        </View>
      </KeyboardAwareScrollView>
      <Buton
        title="Submit Post"
        onPress={createPost}
        extStyles={{
          backgroundColor: '#ff9e00',
          marginVertical: RFValue(0),
          marginHorizontal: RFValue(0)
          // borderTopWidth: 1
        }}
        loading={loading.createBlog || loading.updateBlog || imageLoading}
        textStyles={{ color: '#fff' }}
      />
    </View>
  );
};

export default NewPost;

{
}
