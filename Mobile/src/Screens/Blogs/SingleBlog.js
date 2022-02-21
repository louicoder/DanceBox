import moment from 'moment';
import React from 'react';
import { View, Text, ImageBackground, Pressable, ActivityIndicator } from 'react-native';
// import { ActivityIndicator } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommentsLikeButtons, DesignIcon, Typo } from '../../Components';
import { CONSTANTS, HelperFunctions } from '../../Utils';
import { BROWN, GRAY, SHADOW, WHITE } from '../../Utils/Constants';
import Image from 'react-native-fast-image';

const SingleBlog = ({
  imageUrl,
  caption,
  marginBottom = 60,
  dateCreated,
  description,
  comments,
  likes,
  title,
  owner,
  _id,
  navigation: { navigate, push },
  last = false,
  first = false,
  children,
  header = true,
  user,
  index,
  ...rest
}) => {
  // console.log('LIKES::', rest);
  const [ shareLoading, setShareLoading ] = React.useState(false);

  const payload = {
    imageUrl,
    caption,
    dateCreated,
    description,
    comments,
    likes,
    title,
    owner,
    // user,
    _id
  };

  const shareBlog = () => {
    setShareLoading(true);
    HelperFunctions.getsharableBase64((res) => {
      setShareLoading(false);
      console.log('Shareable base64', res);
    });
  };

  // const test = `sdfsdfsd {'\n'} new line created `;
  const isInd = user && user.accountType === 'individual';
  return (
    <View
      style={{
        marginBottom: RFValue(15),
        marginHorizontal: RFValue(8),
        paddingVertical: RFValue(8),
        marginTop: first ? RFValue(20) : 0,
        backgroundColor: WHITE,
        borderRadius: RFValue(10),
        ...SHADOW,
        shadowColor: '#00000020',
        shadowRadius: RFValue(8),
        shadowOffset: { width: 0, height: RFValue(1) }

        // shadowOffset:
        // borderWidth: 1
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: RFValue(10),
          paddingHorizontal: RFValue(10)
        }}
      >
        <DesignIcon name="user" pkg="ad" widthHeight={35} withBorder extStyles={{ marginRight: RFValue(10) }} />

        <View style={{ flexShrink: 1 }}>
          <Typo text="Musanje Louis" size={13} style={{ fontWeight: 'bold' }} />

          <Typo text="@louicoder ・ 2 days ago" size={12} style={{}} color={GRAY} />
        </View>
      </View>
      <Image
        source={{
          uri:
            'https://media.istockphoto.com/photos/millennial-male-team-leader-organize-virtual-workshop-with-employees-picture-id1300972574?b=1&k=20&m=1300972574&s=170667a&w=0&h=2nBGC7tr0kWIU8zRQ3dMg-C5JLo9H2sNUuDjQ5mlYfo='
        }}
        style={{ width: '100%', height: RFValue(200), marginBottom: RFValue(10) }}
      />
      <Typo
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et non ex maxima parte de tota iudicabis? Duo Reges: constructio interrete. Nec enim, dum metuit, iustus est, et certe, si metuere destiterit, non erit; Gracchum patrem non beatiorem fuisse quam fillum, cum alter stabilire rem publicam studuerit, alter evertere. An hoc usque quaque, aliter in vita? Cur tantas regiones barbarorum pedibus obiit, tot maria transmisit? Atqui eorum nihil est eius generis, ut sit in fine atque extrerno bonorum. Egone quaeris, inquit, quid sentiam? Nam ista vestra: Si gravis, brevis"
        lines={4}
        style={{ marginBottom: RFValue(10), marginHorizontal: RFValue(10) }}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          borderWidth: 0,
          paddingHorizontal: RFValue(10)
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingVertical: RFValue(3)
          }}
        >
          <Typo text="2k likes ・ 30k comments" color={GRAY} size={13} />
          <DesignIcon name="share" pkg="mc" size={30} />
        </View>
      </View>
    </View>
  );
};

export default SingleBlog;
