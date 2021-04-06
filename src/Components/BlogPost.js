import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BlogPost = ({ item, index, last, first, navigation }) => {
  console.log('index', navigation);
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: RFValue(10),
        marginBottom: RFValue(10),
        borderBottomWidth: !last ? 1 : 0,
        borderBottomColor: '#eee',
        paddingBottom: RFValue(10),
        marginTop: first ? RFValue(20) : 0
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: RFValue(10)
        }}
      >
        <View>
          <Text style={{ fontSize: RFValue(14), fontWeight: '600' }}>Rique orenia</Text>
          <Text>23 hours ago</Text>
        </View>
        <MaterialCommunityIcons name="dots-vertical" size={RFValue(20)} />
      </View>
      <Pressable onPress={() => navigation.navigate('SinglePost', { post: { ...item } })}>
        <Image
          source={{ uri: item.img }}
          style={{ width: '100%', marginVertical: RFValue(10), backgroundColor: '#fff', height: RFValue(200) }}
          resizeMode="cover"
        />
      </Pressable>
      <Text style={{ fontSize: RFValue(14), marginVertical: RFValue(10) }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eorum enim est haec querela, qui sibi cari sunt seseque
        ... <Text style={{ color: 'blue' }}>More</Text>
      </Text>

      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row', flexGrow: 1 }}>
          <Icon name="heart-outline" size={RFValue(25)} />
          <Icon name="chatbubble-outline" size={RFValue(25)} style={{ marginHorizontal: RFValue(10) }} />
          <MaterialCommunityIcons name="share" size={RFValue(25)} />
        </View>
        <Icon name="bookmark-outline" size={RFValue(25)} style={{ alignSelf: 'flex-end' }} />
      </View>
    </View>
  );
};

export default BlogPost;
