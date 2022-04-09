import { View, Text, Image, Platform, Pressable } from 'react-native';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Buton, Header, Input, TextArea, Typo } from '../../Components';
import { BLACK, BROWN, HEIGHT, THEME_COLOR, WHITE, WIDTH } from '../../Utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import { PERMISSIONS, check } from 'react-native-permissions';
import { CheckPermissions } from '../../Utils/HelperFunctions';

const NewPost = ({ imageUrl = '', createPost, closeModal }) => {
  const pickImage = async () => {
    // await check().then((res) => {
    // })

    CheckPermissions(
      Platform.select({ ios: PERMISSIONS.IOS.PHOTO_LIBRARY, android: PERMISSIONS.ANDROID.CAMERA }),
      (res) => {
        console.log('Permissions', res);
        // if(!res.success)
      }
    );
  };
  return (
    <View style={{ flex: 1, height: HEIGHT }}>
      <Header title="Create Post" titleStyles={{ color: BLACK }} onBackPress={closeModal} />
      <KeyboardAwareScrollView
        style={{ flexGrow: 1, paddingHorizontal: RFValue(8) }}
        keyboardShouldPersistTaps="always"
      >
        <Typo text="Add an image (Optional)" size={12} style={{ marginBottom: RFValue(5) }} />
        <Pressable
          style={{ width: 0.3 * WIDTH, height: 0.3 * WIDTH, borderWidth: 1, marginBottom: RFValue(10) }}
          onPress={pickImage}
        >
          <Image source={{ uri: '' }} style={{ width: '100%', height: '100%' }} />
        </Pressable>
        <Input extInputStyles={{ backgroundColor: BROWN }} title="" />
        <TextArea
          title="Enter your post detials below"
          extInputStyles={{ backgroundColor: BROWN }}
          placeholder="Please eter your post details right here..."
        />
        <Buton title="Submit Post" onPress={createPost} extStyles={{ backgroundColor: BLACK }} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default NewPost;
