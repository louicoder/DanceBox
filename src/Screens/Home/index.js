import React from 'react';
import { View, Dimensions, FlatList, ScrollView, Image, Text, Linking, Alert } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Text as TextComp } from '../../Components';
import Header from '../../Components/Header';
import Listing from './Listing';
import TopCategories from './TopCategories';
import LOGO from '../../assets/MUG(2).png';
import BlogPost from '../../Components/BlogPost';
import { keyGenerator } from '../../Utils/HelperFunctions';

const { width } = Dimensions.get('window');

const Home = ({ navigation, ...props }) => {
  // const gotoHandler = async (url) => {
  //   await Linking.canOpenURL(url)
  //     .then((supported) => {
  //       if (supported) {
  //         return Linking.openURL(url);
  //       } else {
  //         console.log("Don't know how to open URI: " + url);
  //         return alert('You should have a browser to go to');
  //       }
  //     })
  //     .catch((error) => alert(JSON.stringify(error)));
  // };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexGrow: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: RFValue(10)
          }}
        >
          <View>
            {/* <TextComp text="Rique Welcome to," extStyles={{ fontSize: RFValue(16) }} /> */}
            <TextComp text="Dance Box" extStyles={{ fontSize: RFValue(20), fontWeight: '700', color: '#010203' }} />
          </View>
          <Ripple
            rippleContainerBorderRadius={RFValue(25)}
            rippleCentered
            style={{
              height: RFValue(40),
              width: RFValue(40),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: RFValue(25),
              backgroundColor: '#010203'
            }}
            onPress={() => navigation.toggleDrawer()}
          >
            <Icon name="menu" size={RFValue(20)} color="#fff" />
          </Ripple>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<TopCategories />}
          data={data}
          key={() => keyGenerator()}
          renderItem={(props) => (
            <BlogPost
              {...props}
              navigation={navigation}
              last={props.index === data.length - 1}
              first={props.index === 0}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const data = [
  {
    img: 'https://www.iamhiphopmagazine.com/wp-content/uploads/2016/11/bFJ2.jpg'
  },
  {
    img:
      'https://lh3.googleusercontent.com/proxy/LF-M9Q7SaWK_E9Rj4YW2i_yCeY7HyxVlcYKHI8QUDKk0l8fTcHDmc2X_5ds50yVoaExJ21xedOQ1yUhGaf6V2KyQ-_WOXgjGeIksahIgw9Zk44To9w'
  },
  {
    img:
      'https://www.musicinafrica.net/sites/default/files/styles/article_slider_large/public/images/article/201502/uganda-wwwzeiterionorg.jpg?itok=1zKOpaCb'
  },
  {
    img:
      'https://www.musicinafrica.net/sites/default/files/styles/article_slider_large/public/images/article/201704/ghetto-kids.jpg?itok=aXL3oCaE'
  },
  {
    img:
      'https://www.musicinafrica.net/sites/default/files/styles/article_slider_large/public/images/article/201807/break-2.jpg?itok=7iK-UTV-'
  },
  {
    img: 'https://i.pinimg.com/originals/30/23/74/3023745f3cf3e79cbdf64e1ebc99e484.jpg'
  }
];
