import React from 'react';
import { View, Text, Pressable, Alert, ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { Typo } from '../../Components';
import { HelperFunctions } from '../../Utils';
import {
  DANCE_STYLES,
  HALF_WHITE,
  QUARTER_WHITE,
  SHADOW,
  THEME_COLOR,
  THEME_COLOR3,
  THEME_COLOR7,
  WHITE,
  WIDTH
} from '../../Utils/Constants';
import Image from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

const Organisers = ({ navigation }) => {
  const [ organisers, setOrganisers ] = React.useState([]);
  const dispatch = useDispatch();
  const { randomOrganisers } = useSelector((state) => state.Account);
  // const { randomOrganisers } = useSelector((state) => state.Account);
  React.useEffect(() => {
    // getRandomOrganisers();
  }, []);

  const getRandomOrganisers = () => {
    dispatch.Account.getRandomOrganisers(({ success, result }) => {
      // console.log('RES----DOC', res.doc);
      if (!success) return Alert.alert('Error', result);
      // setState(doc);
    });
  };

  return (
    <View style={{ width: '100%', backgroundColor: '#fff' }}>
      <View
        style={{
          backgroundColor: '#fff',
          // marginTop: RFValue(0),
          // paddingVertical: RFValue(0),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typo text="Dance Categories" size={16} style={{ fontWeight: 'bold', marginHorizontal: RFValue(10) }} />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ height: 0.7 * WIDTH, borderWidth: 0 }}
        contentContainerStyle={{ alignItems: 'center', paddingLeft: RFValue(8) }}
      >
        {DANCE_STYLES.map((r, i) => (
          <Pressable
            key={HelperFunctions.keyGenerator()}
            style={{
              width: 0.6 * WIDTH,
              height: 0.6 * WIDTH,
              backgroundColor: WHITE,
              marginRight: i === (DANCE_STYLES && DANCE_STYLES.length) ? 0 : RFValue(15),
              borderRadius: RFValue(10),
              // marginLeft: i === 0 ? RFValue(10) : 0
              ...SHADOW,
              // shadowColor: '#000',
              elevation: RFValue(8)
              // shadowRadius: RFValue(2),
              // shadowOffset: { width: 0, height: RFValue(8) }
            }}
          >
            <Image
              source={{
                uri: r.image
                // 'https://images.unsplash.com/photo-1597844954972-c843e52b956e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80'
              }}
              style={{ width: '100%', height: '100%', borderRadius: RFValue(10) }}
              resizeMode="cover"
            />
            <LinearGradient
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                padding: RFValue(10),
                justifyContent: 'flex-end',
                borderBottomRightRadius: RFValue(10),
                borderBottomLeftRadius: RFValue(10),
                height: '60%',
                width: '100%',
                borderColor: WHITE,
                // borderWidth: 1,
                zIndex: 40
              }}
              colors={[ 'transparent', '#00000080', '#000000', '#000000' ]}
            >
              <Typo text={r.title} color={WHITE} size={20} style={{ fontWeight: 'bold', marginBottom: RFValue(2) }} />
              <Typo text="240k followers" color={QUARTER_WHITE} size={14} />
            </LinearGradient>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Organisers;
