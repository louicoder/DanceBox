import { Dimensions, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  socials: {
    borderWidth: 1,
    marginHorizontal: RFValue(5),
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(3),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#aaa'
  }
});
