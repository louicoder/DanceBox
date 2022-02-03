import moment from 'moment';
import React from 'react';
import { View, Text, ImageBackground, Pressable, Image, ActivityIndicator } from 'react-native';
// import { ActivityIndicator } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommentsLikeButtons, DesignIcon, Typo } from '../../Components';
import { CONSTANTS, HelperFunctions } from '../../Utils';
import { BROWN, GRAY } from '../../Utils/Constants';

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
    // <View style={{ marginBottom: last ? RFValue(marginBottom) : RFValue(15), backgroundColor: '#fff' }}>
    //   {user && (
    //     <View
    //       style={{
    //         flexDirection: 'row',
    //         alignItems: 'center',
    //         justifyContent: 'space-between',
    //         // height: RFValue(50),
    //         padding: RFValue(10),
    //         // borderWidth: 1,
    //         width: '100%'
    //       }}
    //     >
    //       {user && user.imageUrl ? (
    //         <Image
    //           source={{ uri: (user && user.imageUrl) || CONSTANTS.DEFAULT_PROFILE }}
    //           style={{ height: RFValue(30), width: RFValue(30), borderRadius: RFValue(50) }}
    //         />
    //       ) : (
    //         <View
    //           style={{
    //             width: RFValue(30),
    //             height: RFValue(30),
    //             borderRadius: 50,
    //             backgroundColor: '#eee',
    //             alignItems: 'center',
    //             justifyContent: 'center'
    //           }}
    //         >
    //           <DesignIcon name="user" pkg="ad" size={20} color="#aaa" />
    //         </View>
    //       )}
    //       <View style={{ flexGrow: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    //         <View style={{ paddingLeft: RFValue(10) }}>
    //           <Text style={{ fontSize: RFValue(14) }}>{`${isInd
    //             ? user.name || user.username || user.email
    //             : user.companyName}`}</Text>
    //           <Text style={{ fontSize: RFValue(12), color: '#aaa' }}>{moment(dateCreated).fromNow()}</Text>
    //         </View>
    //         {shareLoading ? (
    //           <ActivityIndicator size={RFValue(16)} />
    //         ) : (
    //           <DesignIcon name="share-a" pkg="fot" size={20} color="#010203" onPress={shareBlog} />
    //         )}
    //       </View>
    //     </View>
    //   )}
    //   <Pressable
    //     style={{ width: '100%', paddingVertical: RFValue(10) }}
    //     onPress={() => navigate('BlogProfile', payload)}
    //   >
    //     <Text style={{ fontSize: RFValue(18), margin: RFValue(10), marginTop: 0, fontWeight: 'bold' }}>
    //       {title && title.trim().slice(0, 18)}
    //       {title && title.length > 18 && '...'}
    //     </Text>

    //     {imageUrl ? (
    //       <Pressable onPress={() => navigate('BlogProfile', payload)}>
    //         <ImageBackground
    //           source={{ uri: imageUrl }}
    //           style={{ height: RFValue(250), width: '100%', backgroundColor: '#000' }}
    //           resizeMode="cover"
    //         >
    //           <View
    //             style={{
    //               flex: 1,
    //               alignItems: 'flex-end',
    //               padding: RFValue(10),
    //               justifyContent: 'space-between',
    //               flexDirection: 'row'
    //             }}
    //           >

    //             <View />
    //           </View>
    //         </ImageBackground>
    //       </Pressable>
    //     ) : null}

    //     <Text style={{ fontSize: RFValue(14), margin: RFValue(10) }}>
    //       {description && description.trim().slice(0, 200)}
    //       {description && description.length > 300 && '...'}
    //     </Text>
    //   </Pressable>

    // </View>
    <View style={{ marginBottom: RFValue(15), paddingHorizontal: RFValue(8), opacity: index % 2 === 0 ? 0.2 : 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: RFValue(10) }}>
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
        style={{ marginBottom: RFValue(10) }}
      />

      <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', borderWidth: 0 }}>
        {[
          { name: 'chatbubble-outline', pkg: 'io', value: '2k', onPress: () => alert('chatbubble'), style: {} },
          { name: 'hearto', pkg: 'ad', value: '3.5k', onPress: () => alert('hearto'), style: { flexGrow: 1 } },
          { name: 'bookmark', pkg: 'ft', value: '', onPress: () => alert('bookmark'), style: {} },
          { name: 'share', pkg: 'mc', value: '', onPress: () => alert('share'), style: {} }
        ].map((r) => (
          <View style={{ flexDirection: 'row', marginRight: RFValue(10), alignItems: 'center', ...r.style }}>
            <DesignIcon {...r} color={GRAY} />
            <Typo text={r.value} style={{ marginLeft: RFValue(5) }} color={GRAY} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default SingleBlog;
