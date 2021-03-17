import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Blogs = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: RFValue(10),
          marginVertical: RFValue(10)
        }}
      >
        <Text style={{ fontSize: RFValue(30), fontWeight: '700' }}>Blogs</Text>
        <Pressable
          onPress={() => navigation.toggleDrawer()}
          style={{
            backgroundColor: '#000',
            width: RFValue(40),
            height: RFValue(40),
            borderRadius: RFValue(50),
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Icon name="menu" color="#fff" size={RFValue(20)} />
        </Pressable>
      </View>

      <Pressable
        onPress={() => navigation.navigate('NewBlog')}
        style={{
          backgroundColor: '#000',
          borderRadius: RFValue(100),
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          position: 'absolute',
          bottom: RFValue(10),
          right: RFValue(10),
          paddingVertical: RFValue(10),
          paddingHorizontal: RFValue(15)
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontSize: RFValue(14),
            marginRight: RFValue(10)
          }}
        >
          Create Blog
        </Text>
        <Icon name="plus" color="#fff" size={RFValue(20)} />
      </Pressable>
    </View>
  );
};

export default Blogs;
