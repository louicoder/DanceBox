import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  modalContainer: {
    margin: 0
  },
  iconWithBg: (size = 40, bc, style) => ({
    width: RFValue(size),
    height: RFValue(size),
    borderRadius: size + 10,
    backgroundColor: bc || '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    ...style
  })
});
