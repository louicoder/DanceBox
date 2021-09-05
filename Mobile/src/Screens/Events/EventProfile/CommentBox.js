import React from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { Button, DesignIcon, PasswordInput, StickyView } from '../../../Components';
import { DEFAULT_PROFILE, THEME_COLOR3 } from '../../../Utils/Constants';

const CommentBox = ({ postComment, close, user }) => {
  const loading = useSelector((state) => state.loading.effects.Events);
  const [ comment, setComment ] = React.useState('');
  return (
    <StickyView>
      <View style={{ width: '100%', backgroundColor: THEME_COLOR3, paddingHorizontal: RFValue(10), zIndex: 50 }}>
        <View
          style={{
            marginVertical: RFValue(15),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: user.imageUrl || DEFAULT_PROFILE }}
              style={{
                width: RFValue(25),
                height: RFValue(25),
                borderRadius: 50,
                // borderWidth: 1,
                marginRight: RFValue(25)
              }}
            />
            <Text style={{ fontSize: RFValue(16) }}>Leave your comment</Text>
          </View>
          <DesignIcon name="close" onPress={close} />
        </View>
        <Text style={{ fontSize: RFValue(14), marginBottom: RFValue(15) }}>
          Remember to keep the comments safe for each and everyone on the platform to enjoy. Do not post abusive,
          deformative, non-factual, segregative comments.
        </Text>
        <TextInput
          style={{
            fontSize: RFValue(16),
            backgroundColor: '#eee',
            paddingHorizontal: RFValue(10),
            width: '100%',
            maxHeight: RFValue(150),
            minHeight: RFValue(150)
          }}
          placeholder="Enter your comment..."
          textAlignVertical="top"
          multiline
          value={comment}
          onChangeText={(comment) => setComment(comment)}
          // maxLength={300}
        />
        <Button
          onPress={() => postComment(comment)}
          loading={loading.createEventComment}
          textStyles={{ color: '#fff' }}
          title="Post comment"
          extStyles={{ marginTop: RFValue(10), marginBottom: RFValue(10), backgroundColor: '#010203' }}
        />
      </View>
    </StickyView>
  );
};

export default CommentBox;
