import React from 'react';
import { View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { Button, DesignIcon, PasswordInput, StickyView } from '../../Components';
import { HelperFunctions } from '../../Utils';
import { THEME_COLOR3 } from '../../Utils/Constants';

const ResetPassword = ({ resetPassword, close, reset }) => {
  const [ state, setState ] = React.useState({ passVisible: false, password: '' });
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.effects.Account);

  React.useEffect(() => {
    getUser();
  }, []);

  const getUser = async () =>
    await HelperFunctions.getUser(({ success, result: user }) => success && setState({ ...state, user }));

  const updatePassword = () => {
    const { user: { _id: uid }, password } = state;
    if (!password) return HelperFunctions.Notify('Error', 'A new password is required to update your account');
    dispatch.Account.updatePassword({
      uid,
      password,
      callback: ({ success, result }) => {
        console.log('Password reset', result, success);
        if (!success) return HelperFunctions.Notify('Error updating password', result);
        setState({ ...state, password: '' });
        reset();
      }
    });
  };

  return (
    <StickyView>
      <View style={{ width: '100%', backgroundColor: '#fff', paddingHorizontal: RFValue(10) }}>
        <View
          style={{
            marginVertical: RFValue(15),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Text style={{ fontSize: RFValue(16) }}>Update password</Text>
          <DesignIcon name="close" onPress={close} />
        </View>
        <Text style={{ fontSize: RFValue(16), marginBottom: RFValue(15) }}>
          You are about to reset your password and therefore you will have to be logged out of you account and login
          agains for the changes to take effect.
        </Text>
        <PasswordInput
          placeholder="Enter new password"
          value={state.password}
          onChangeText={(password) => setState({ ...state, password })}
          switchPasswordVisibility={() => setState({ ...state, passVisible: !state.passVisible })}
          secure={!state.passVisible}
        />
        <Button
          onPress={updatePassword}
          loading={loading.updatePassword}
          textStyles={{ color: '#fff' }}
          title="Reset Password"
          extStyles={{ marginTop: 0, marginBottom: RFValue(10), backgroundColor: '#010203' }}
        />
      </View>
    </StickyView>
  );
};

export default ResetPassword;
