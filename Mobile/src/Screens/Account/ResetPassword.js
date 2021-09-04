import React from 'react';
import { View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Button, DesignIcon, PasswordInput, StickyView } from '../../Components';

const ResetPassword = ({ resetPassword, close, loading }) => {
  const [ state, setState ] = React.useState({ passVisible: false, password: '' });
  return (
    <StickyView>
      <View style={{ width: '100%', backgroundColor: '#fcb072', paddingHorizontal: RFValue(10) }}>
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
          onPress={() => resetPassword(state.password)}
          loading={loading}
          textStyles={{ color: '#fff' }}
          title="Reset Password"
          extStyles={{ marginTop: 0, marginBottom: RFValue(10), backgroundColor: '#010203' }}
        />
      </View>
    </StickyView>
  );
};

export default ResetPassword;
