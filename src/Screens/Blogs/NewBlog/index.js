import React from 'react';
import { View, Text, ImageBackground, Pressable, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HelperFunctions } from '../../../Utils';
import { PERMISSIONS } from 'react-native-permissions';
import DateTimePicker from '@react-native-community/datetimepicker';

const NewBlog = () => {
  const [ state, setState ] = React.useState({
    image: {},
    tags: [],
    tagsVisible: true,
    date: '',
    free: 'free',
    datePickerVisible: false,
    dateTime: new Date()
  });

  // React.useEffect(() => {

  // }, [])

  // const checkPermissions = async () => await HelperFunctions.CheckPermissions()

  const selectImage = () =>
    HelperFunctions.CheckPermissions(
      PERMISSIONS.ANDROID.CAMERA,
      HelperFunctions.ImagePicker((image) => {
        console.log('REsponse', image);
        if (image.uri) setState({ ...state, image });
      })
    );
  console.log('tags', state.tags);

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        {state.image.uri ? (
          <ImageBackground source={{ uri: state.image.uri }} style={{ width: '100%', height: RFValue(300) }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                backgroundColor: 'rgba(0,0,0,.55)'
              }}
            >
              <Pressable
                onPress={selectImage}
                style={{ marginHorizontal: RFValue(15), borderWidth: 1, borderColor: '#fff', padding: RFValue(10) }}
              >
                <Text style={{ color: '#fff' }}> Change Image</Text>
              </Pressable>
              <Pressable
                style={{ backgroundColor: '#fff', borderWidth: 1, padding: RFValue(10) }}
                onPress={() => setState({ ...state, image: {} })}
              >
                <Text style={{ color: '#000' }}> Remove Image</Text>
              </Pressable>
            </View>
          </ImageBackground>
        ) : null}
        {!state.image.uri ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: RFValue(300),
              backgroundColor: '#eee'
            }}
          >
            <Icon name="camera-plus" size={RFValue(100)} color="#aaa" />
            <Pressable onPress={selectImage}>
              <Text style={{ color: '#aaa', fontSize: RFValue(14) }}>Click to add an photo</Text>
            </Pressable>
          </View>
        ) : null}

        <Pressable
          onPress={() => setState({ ...state, tagsVisible: !state.tagsVisible })}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: RFValue(10)
          }}
        >
          <Text style={{ fontSize: RFValue(14) }}>Add tags to your blog</Text>
          <Icon name={state.tagsVisible ? 'chevron-up' : 'chevron-down'} size={RFValue(30)} />
        </Pressable>
        {state.tagsVisible ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: RFValue(10) }}>
            {[ 'breaking', 'salsa', 'capoera', 'dance class', 'free style', 'beatboxing' ].map((item) => (
              <Pressable
                style={{
                  marginRight: RFValue(10),
                  backgroundColor: state.tags && state.tags.includes(item) ? '#000' : 'transparent',
                  borderWidth: 1,
                  borderColor: state.tags && state.tags.includes(item) ? '#000' : '#ccc',
                  borderRadius: RFValue(50),
                  padding: RFValue(10),
                  marginBottom: RFValue(10)
                }}
                onPress={() =>
                  setState({
                    ...state,
                    tags:
                      state.tags && state.tags.includes(item)
                        ? state.tags.filter((it) => it !== item)
                        : [ ...state.tags, item ]
                  })}
                // onPress={() => alert(item)}
              >
                <Text style={{ color: state.tags && state.tags.includes(item) ? '#fff' : '#000' }}>{item}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}

        <View
          style={{
            height: RFValue(50),
            margin: RFValue(10),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Pressable
            onPress={() => setState({ ...state, datePickerVisible: true })}
            style={{
              flexGrow: 1,
              backgroundColor: '#eee',
              height: '100%',
              paddingHorizontal: RFValue(10),
              justifyContent: 'center'
            }}
          >
            <Text style={{ fontSize: RFValue(14) }}>{state.date ? state.date : 'Click to select a date'}</Text>
          </Pressable>
          <View
            style={{
              width: RFValue(50),
              backgroundColor: '#000',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon name="calendar-month-outline" size={RFValue(25)} color="#fff" />
          </View>
        </View>

        {/* free */}
        <View style={{ margin: RFValue(10) }}>
          <Text style={{ fontSize: RFValue(14) }}>Select event pricing below</Text>
          <View style={{ flexDirection: 'row', marginVertical: RFValue(10) }}>
            <Pressable
              onPress={() => setState({ ...state, free: 'free' })}
              style={{
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                height: RFValue(50),
                backgroundColor: state.free === 'free' ? '#000' : 'transparent',
                borderWidth: 1,
                flexDirection: 'row'
              }}
            >
              {state.free === 'free' ? <Icon name="check" size={RFValue(20)} color="#fff" /> : null}
              <Text style={{ color: state.free === 'free' ? '#fff' : '#000', marginLeft: RFValue(10) }}>FREE</Text>
            </Pressable>
            <Pressable
              onPress={() => setState({ ...state, free: 'paid' })}
              style={{
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                height: RFValue(50),
                backgroundColor: state.free === 'paid' ? '#000' : 'transparent',
                borderWidth: 1,
                borderLeftWidth: 0,
                flexDirection: 'row'
              }}
            >
              {state.free === 'paid' ? <Icon name="check" size={RFValue(20)} color="#fff" /> : null}
              <Text style={{ color: state.free === 'paid' ? '#fff' : '#000', marginLeft: RFValue(10) }}>PAID</Text>
            </Pressable>
          </View>
          {state.free === 'paid' ? (
            <TextInput
              keyboardType="number-pad"
              style={{
                backgroundColor: '#eee',
                height: RFValue(50),
                fontSize: RFValue(18),
                paddingHorizontal: RFValue(10)
              }}
              placeholder="Enter event amount in Ugx"
              value={state.price}
              onChangeText={(price) => setState({ ...state, price })}
            />
          ) : null}
        </View>
        {/* end freee */}

        {state.datePickerVisible && (
          <DateTimePicker
            testID="dateTimePicker"
            value={state.dateTime}
            mode="date"
            is24Hour={true}
            display="calendar"
            onChange={(dateTime) => setState({ ...state, dateTime })}
          />
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default NewBlog;
