import React from 'react';
import { View, Text, ImageBackground, Pressable, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HelperFunctions } from '../../../Utils';
import { PERMISSIONS } from 'react-native-permissions';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import DatePicker from '../../../Components/DatePicker';
import Calendar from '../../../Components/Calendar';

const NewEvent = () => {
  const [ state, setState ] = React.useState({
    image: {},
    tags: [],
    tagsVisible: true,
    date: moment(new Date()).format('YYYY-MM-DD'),
    free: 'free',
    datePickerVisible: false,
    isVisible: true
    // dateTime: new Date().toString()
  });

  // React.useEffect(() => {

  // }, [])

  // const checkPermissions = async () => await HelperFunctions.CheckPermissions()
  // console.log('STATE DATE', new Date(state.date).toISOString('YYYY-MM-DD'));
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
      <KeyboardAwareScrollView
        style={{}}
        automaticallyAdjustContentInsets={false}
        // scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Calendar
          isVisible={state.isVisible}
          date={state.date}
          setDate={(date) => setState({ ...state, date })}
          closeModal={() => setState({ ...state, isVisible: false })}
        />
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

        <DatePicker setDate={(date) => setState({ ...state, date })} title="Select event start date" />
        <DatePicker setDate={(date) => setState({ ...state, date })} title="Select event end date" />

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
              <Text
                style={{ color: state.free === 'free' ? '#fff' : '#000', marginLeft: RFValue(10), fontWeight: 'bold' }}
              >
                FREE
              </Text>
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
              <Text
                style={{ color: state.free === 'paid' ? '#fff' : '#000', marginLeft: RFValue(10), fontWeight: 'bold' }}
              >
                PAID
              </Text>
            </Pressable>
          </View>

          {state.free === 'paid' && <Text style={{ fontSize: RFValue(14) }}>Enter event price below:</Text>}
          {state.free === 'paid' ? (
            <TextInput
              keyboardType="number-pad"
              style={{
                backgroundColor: '#eee',
                height: RFValue(50),
                fontSize: state.price && state.price.length ? RFValue(18) : RFValue(14),
                paddingHorizontal: RFValue(10),
                marginVertical: RFValue(10)
              }}
              placeholder="Enter event amount in Ugx"
              value={state.price}
              onChangeText={(price) => setState({ ...state, price })}
            />
          ) : null}

          <Text style={{ fontSize: RFValue(14) }}>Enter event description:</Text>
          <TextInput
            value={state.description}
            onChangeText={(description) => setState({ ...state, description })}
            placeholder="Enter event description"
            // multiline
            style={{
              backgroundColor: '#eee',
              height: RFValue(50),
              marginVertical: RFValue(10),
              fontSize: RFValue(14),
              paddingHorizontal: RFValue(10)
            }}
          />
          <Pressable
            style={{
              backgroundColor: '#010203',
              height: RFValue(50),
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{ color: '#fff', fontSize: RFValue(16), fontWeight: 'bold' }}>Create event</Text>
          </Pressable>
        </View>
        {/* end freee */}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default NewEvent;
