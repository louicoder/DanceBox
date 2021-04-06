import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '../../Components/Input';

const Search = () => {
  const [ state, setState ] = React.useState({ filterShowing: false, category: '', subCategory: '' });
  return (
    <SafeAreaView>
      <View style={{ paddingHorizontal: RFValue(10), flexDirection: 'row', marginTop: RFValue(10) }}>
        <Input
          placeholder="Enter your search"
          extStyles={{ width: '85%', marginBottom: 0 }}
          inputStyles={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        />
        <Ripple
          rippleCentered
          style={{
            flexGrow: 1,
            borderTopRightRadius: RFValue(5),
            borderBottomRightRadius: RFValue(5),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'green'
          }}
        >
          <Icon name="magnify" size={RFValue(25)} color="#fff" />
        </Ripple>
      </View>

      <Ripple
        style={{
          // paddingHorizontal: RFValue(10),
          width: '94%',
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#eee',
          paddingHorizontal: RFValue(10),
          paddingVertical: RFValue(10),
          marginTop: RFValue(10)
        }}
        onPress={() => setState({ ...state, filterShowing: !state.filterShowing })}
      >
        <Text style={{ fontSize: RFValue(14) }}>Set filters for your search</Text>
        <Icon name={state.filterShowing ? 'chevron-down' : 'chevron-up'} size={RFValue(20)} />
      </Ripple>

      {!state.filterShowing && (
        <View
          style={{
            backgroundColor: '#fff',
            padding: RFValue(10),
            width: '94%',
            alignSelf: 'center',
            borderWidth: 1,
            borderColor: '#eee',
            borderTopWidth: 0
          }}
        >
          <View style={{ width: '100%' }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                paddingVertical: RFValue(10)
              }}
            >
              {[ 'Bboy', 'latin', 'events', 'choreography', 'Locations', 'organisers' ].map((item) => (
                <Ripple
                  rippleDuration={0}
                  style={{
                    width: '49%',
                    // borderWidth: 1,
                    borderColor: 'green',
                    marginBottom: RFValue(5),
                    flexDirection: 'row'
                    // backgroundColor: state.category === item ? '#aaa' : 'transparent'
                  }}
                  onPress={() => setState({ ...state, category: item })}
                >
                  <Icon name={state.category === item ? 'check-circle' : 'check-circle-outline'} size={RFValue(20)} />
                  <Text
                    style={{
                      fontSize: RFValue(14),
                      marginLeft: RFValue(10),
                      fontWeight: state.category === item ? 'bold' : 'normal'
                    }}
                  >
                    {item}
                  </Text>
                </Ripple>
              ))}
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Search;
