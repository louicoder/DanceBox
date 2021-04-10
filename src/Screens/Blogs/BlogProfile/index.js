import React from 'react';
import { View, Text, Image, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Ripple from 'react-native-material-ripple';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HelperFunctions } from '../../../Utils';
import SingleEvent from '../SingleBlog';

const EventProfile = ({ navigation, route, ...props }) => {
  const [ state, setState ] = React.useState({ ...route.params });

  const Event = () => (
    <SingleEvent {...state} navigation={navigation}>
      <Ripple
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '95%',
          height: RFValue(50),
          alignSelf: 'center',
          marginHorizontal: RFValue(10),
          backgroundColor: 'green'
        }}
      >
        <Text style={{ color: '#fff', fontSize: RFValue(16) }}>Add event to my calendar</Text>
      </Ripple>
      <View style={{ paddingHorizontal: RFValue(10), marginVertical: RFValue(10) }}>
        <Text style={{ fontSize: RFValue(16), fontWeight: '700', marginBottom: RFValue(10) }}>Event details</Text>
        <Text style={{ fontSize: RFValue(14) }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non sunt in eo genere tantae commoditates
          corporis tamque productae temporibus tamque multae. Atque haec ita iustitiae propria sunt, ut sint virtutum
          reliquarum communia. Atque his tribus generibus honestorum notatis quartum sequitur et in eadem pulchritudine
          et aptum ex illis tribus, in quo inest ordo et moderatio. Qualem igitur hominem natura inchoavit? Res enim
          fortasse verae, certe graves, non ita tractantur, ut debent, sed aliquanto minutius. Quid enim est a Chrysippo
          praetermissum in Stoicis? Duo Reges: constructio interrete. Graecum enim hunc versum nostis omnes-: Suavis
          laborum est praeteritorum memoria. Cum autem venissemus in Academiae non sine causa nobilitata spatia,
          solitudo erat ea, quam volueramus. Numquam hoc ita defendit Epicurus neque Metrodorus aut quisquam eorum, qui
          aut saperet aliquid aut ista didicisset. Atqui perspicuum est hominem e corpore animoque constare, cum primae
          sint animi partes, secundae corporis. Cum autem venissemus in Academiae non sine causa nobilitata spatia
        </Text>
        <Text style={{ marginTop: RFValue(20), fontWeight: '700' }}>Join the conversation on this post</Text>
      </View>
    </SingleEvent>
  );
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? RFValue(90) : 0}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <Pressable
          style={{
            width: RFValue(50),
            height: RFValue(50),
            backgroundColor: '#fff',
            position: 'absolute',
            paddingHorizontal: RFValue(10),
            bottom: RFValue(0),
            // right: RFValue(20),
            // borderRadius: RFValue(50),
            zIndex: 20,
            alignItems: 'center',
            justifyContent: 'center',
            // borderWidth: 1,
            width: '100%',
            flexDirection: 'row'
          }}
          onPress={() => alert('Confirming attendance for event')}
        >
          <Image
            source={{
              uri:
                'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
            }}
            style={{ width: RFValue(40), height: RFValue(40), borderRadius: RFValue(50) }}
          />
          <TextInput
            value={state.comment}
            placeholder="Enter your comment"
            multiline
            onContentSizeChange={() => null}
            style={{
              height: RFValue(40),
              flexGrow: 1,
              backgroundColor: '#eee',
              marginHorizontal: RFValue(10),
              borderRadius: RFValue(50),
              paddingHorizontal: RFValue(10),
              fontSize: RFValue(14),
              width: '70%'
            }}
            onChangeText={(comment) => setState({ ...state, comment })}
          />
          <View
            style={{
              borderRadius: RFValue(50),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'red',
              height: RFValue(40),
              width: RFValue(40),
              backgroundColor: '#000'
            }}
          >
            <Icon name="send" size={RFValue(20)} color="#fff" />
          </View>
        </Pressable>
        {/* <Text>This is the event profile</Text> */}
        {/* <SingleEvent {...state} navigation={navigation} /> */}

        <View style={{ flexGrow: 1 }}>
          <FlatList
            style={{ flex: 1 }}
            ListHeaderComponent={<Event />}
            data={comments}
            key={() => HelperFunctions.keyGenerator()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View
                style={{
                  width: '100%',
                  marginBottom: RFValue(20),
                  flexDirection: 'row',
                  paddingHorizontal: RFValue(10)
                }}
                // key={() => HelperFunctions.keyGenerator()}
              >
                <View style={{ width: '20%' }}>
                  <Image
                    source={{
                      uri:
                        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                    }}
                    style={{ width: RFValue(50), height: RFValue(50), borderRadius: RFValue(100) }}
                  />
                </View>
                <View style={{ width: '80%' }}>
                  <Text style={{ fontWeight: 'bold' }}>Username</Text>
                  <Text style={{ paddingVertical: RFValue(5) }}>
                    This is the sample comment on this post that we cannot wait to have the way to come from the right
                    {index % 2 === 0 &&
                      'directions on the map of uganda, something we can allow with the people of Africa who cannot play around'}
                  </Text>
                  <Text style={{ color: '#aaa' }}>20 hours ago</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EventProfile;

const comments = [
  { comment: 'This is the sample comment on this post that we cannot wait to have the way to come from the right' },
  { comment: 'This is the sample comment on this post that we cannot wait to have the way to come from the right' },
  { comment: 'This is the sample comment on this post that we cannot wait to have the way to come from the right' },
  { comment: 'This is the sample comment on this post that we cannot wait to have the way to come from the right' },
  { comment: 'This is the sample comment on this post that we cannot wait to have the way to come from the right' },
  { comment: 'This is the sample comment on this post that we cannot wait to have the way to come from the right' },
  { comment: 'This is the sample comment on this post that we cannot wait to have the way to come from the right' },
  { comment: 'This is the sample comment on this post that we cannot wait to have the way to come from the right' },
  { comment: 'This is the sample comment on this post that we cannot wait to have the way to come from the right' },
  { comment: 'This is the sample comment on this post that we cannot wait to have the way to come from the right' }
];
