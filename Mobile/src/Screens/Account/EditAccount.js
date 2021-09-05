import React from 'react';
import { View, Text, Pressable, Alert, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../Components/Input';
import { CONSTANTS, HelperFunctions } from '../../Utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import LoadingModal from '../../Components/LoadingModal';

const EditAccount = ({ navigation }) => {
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.Account);
  const loading = useSelector((state) => state.loading.effects.Account);
  const [ state, setState ] = React.useState({
    tagsVisible: true,
    interests: [],
    about: '',
    whatsapp: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    twitter: '',
    name: '',
    username: ''
    // ...user
  });

  React.useEffect(() => {
    HelperFunctions.getAsyncObjectData('user', ({ success, result }) => success && setState({ ...state, ...result }));
  }, []);

  const updateUserDetails = () => {
    Keyboard.dismiss();
    const { tagsVisible, ...payload } = state;
    // if (!whatsapp) return invalidLinkError('');
    if (payload.facebook && !linkChecker(payload.facebook)) return invalidLinkError('facebook');
    if (payload.instagram && !linkChecker(payload.instagram)) return invalidLinkError('instagram');
    if (payload.linkedin && !linkChecker(payload.linkedin)) return invalidLinkError('linkedin');
    if (payload.youtube && !linkChecker(payload.youtube)) return invalidLinkError('youtube');
    if (payload.twitter && !linkChecker(payload.twitter)) return invalidLinkError('twitter');

    // const payload = { ...rest };

    dispatch.Account.updateAccountDetails({
      uid: state._id,
      payload,
      callback: ({ result, success }) => {
        if (!success) return HelperFunctions.Notify('Error updating account', result);
        return HelperFunctions.storeAsyncObjectData('user', result, () => navigation.goBack());
      }
    });
  };

  const linkChecker = (url) => {
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    return url.match(regex);
  };

  const invalidLinkError = (field) =>
    Alert.alert('Invalid url', `The ${field} link you have provided is invalid, please try again`);

  // const
  // console.log('Interests', user);
  const isInd = state && state.accountType === 'individual';

  return (
    <React.Fragment>
      <LoadingModal isVisible={loading.updateAccountDetails} />
      <KeyboardAwareScrollView style={{ paddingHorizontal: RFValue(10) }} keyboardShouldPersistTaps="handled">
        {/* <Text>Thsis the edit account page</Text> */}
        {isInd && (
          <Input
            placeholder="Enter your full name"
            title="Your full name"
            extStyles={{ marginTop: RFValue(10) }}
            value={state.name}
            onChangeText={(name) => setState({ ...state, name })}
          />
        )}
        {!isInd && (
          <Input
            placeholder="Enter company name"
            title="Company name"
            extStyles={{ marginTop: RFValue(10) }}
            value={state.companyName}
            onChangeText={(companyName) => setState({ ...state, companyName })}
          />
        )}
        {!isInd && (
          <Input
            placeholder="Enter company address"
            title="Company address"
            extStyles={{ marginTop: RFValue(10) }}
            value={state.companyAddress}
            onChangeText={(companyAddress) => setState({ ...state, companyAddress })}
          />
        )}

        <Input
          placeholder="Enter stage name or username or nickname"
          title="Your stage name/username/alias"
          value={state.username}
          onChangeText={(username) => setState({ ...state, username })}
        />
        {!isInd && (
          <Input
            multiline
            inputStyles={{ height: RFValue(200) }}
            placeholder="Enter a brief intro about the company"
            title="Tell us about the company"
            onChangeText={(companyDescription) => setState({ ...state, companyDescription })}
            value={state.companyDescription}
          />
        )}

        <Pressable
          // onPress={() => setState({ ...state, tagsVisible: !state.tagsVisible })}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: RFValue(10)
            // marginHorizontal: RFValue(10)
          }}
        >
          <Text style={{ fontSize: RFValue(12) }}>Add tags to your blog</Text>
          {/* <Icon name={state.tagsVisible ? 'chevron-up' : 'chevron-down'} size={RFValue(30)} /> */}
        </Pressable>
        {state.tagsVisible ? (
          <View
            style={{ flexDirection: 'row', flexWrap: 'wrap', marginRight: RFValue(5), marginVertical: RFValue(10) }}
          >
            {CONSTANTS.INTERESTS.map((item) => (
              <Pressable
                key={HelperFunctions.keyGenerator()}
                style={{
                  marginRight: RFValue(10),
                  backgroundColor: state.interests && state.interests.includes(item) ? '#000' : 'transparent',
                  borderWidth: 1,
                  borderColor: state.interests && state.interests.includes(item) ? '#000' : '#ccc',
                  borderRadius: RFValue(50),
                  padding: RFValue(10),
                  marginBottom: RFValue(10)
                }}
                onPress={() =>
                  setState({
                    ...state,
                    interests:
                      state.interests && state.interests.includes(item)
                        ? state.interests.filter((it) => it !== item)
                        : [ ...state.interests, item ]
                  })}
                // onPress={() => alert(item)}
              >
                <Text style={{ color: state.interests && state.interests.includes(item) ? '#fff' : '#000' }}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : null}

        {!isInd && (
          <View>
            <Input
              title="Linkedin profile link"
              placeholder="https://linkedin.com/"
              value={state.linkedin}
              onChangeText={(linkedin) => setState({ ...state, linkedin })}
            />
            <Input
              title="Youtube profile link"
              placeholder="https://youtube.com/"
              value={state.youtube}
              onChangeText={(youtube) => setState({ ...state, youtube })}
            />
            <Input
              title="Instagram profile link"
              placeholder="https://instagram.com/"
              value={state.instagram}
              onChangeText={(instagram) => setState({ ...state, instagram })}
            />
            <Input
              title="Facebook profile link"
              placeholder="https://facebook.com/"
              value={state.facebook}
              onChangeText={(facebook) => setState({ ...state, facebook })}
            />
            <Input
              title="Twitter profile link"
              placeholder="https://twitter.com/"
              value={state.twitter}
              onChangeText={(twitter) => setState({ ...state, twitter })}
            />
            <Input
              title="Your whatsapp number"
              placeholder="Enter whatsapp number e.g +256xxxxx"
              value={state.whatsapp}
              onChangeText={(whatsapp) => setState({ ...state, whatsapp })}
              number
            />
          </View>
        )}
        <Pressable
          onPress={updateUserDetails}
          style={{
            backgroundColor: '#000',
            width: '100%',
            height: RFValue(50),
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: RFValue(10)
          }}
        >
          <Text style={{ fontSize: RFValue(16), color: '#fff' }}>Update Account</Text>
        </Pressable>
      </KeyboardAwareScrollView>
    </React.Fragment>
  );
};

export default EditAccount;
