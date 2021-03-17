import React from 'react';
import { View, FlatList, Image, ImageBackground } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Button, HeaderLinker, Text } from '../../Components';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { HelperFunctions } from '../../Utils';

const Listing = ({ title = 'Sample Topic', data }) => {
  console.log('Data', data);
  return (
    <View style={{ height: RFPercentage(30) }}>
      <HeaderLinker title={title} extStyles={{ paddingHorizontal: RFValue(10) }} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={() => HelperFunctions.keyGenerator()}
        horizontal
        renderItem={({ item, index }) => (
          <Ripple
            rippleDuration={300}
            style={{
              height: '100%',
              width: RFPercentage(30),
              borderWidth: 1,
              borderColor: '#eee',
              marginRight: RFValue(10)
            }}
          >
            <ImageBackground source={{ uri: item.image }} style={{ width: '100%', height: '100%' }}>
              <View style={{ position: 'absolute', bottom: 0, backgroundColor: '#00000090', zIndex: 12 }}>
                <Text style={{ fontSize: RFValue(13) }}>asdasdasdasd</Text>
              </View>
            </ImageBackground>
          </Ripple>
        )}
      />
    </View>
  );
};

export default Listing;
