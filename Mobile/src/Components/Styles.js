import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default StyleSheet.create({
  modalContainer: {
    margin: 0
  },
  input: {
    height: RFValue(40),
    fontSize: RFValue(14),
    // backgroundColor: '#eee',
    // borderColor: '#ccc',
    // borderWidth: 1,
    // borderLeftWidth: 2,
    // borderRightWidth: 2,
    marginVertical: RFValue(5),
    paddingHorizontal: RFValue(10),
    color: '#010203',
    fontFamily: 'Roboto-Regular'
  },
  inputContainer: {
    width: '100%',
    marginBottom: RFValue(10)
    // zIndex: -10
  },
  passWordIcon: (error) => ({
    // borderWidth: error ? 1 : 0,
    // borderColor: error ? 'red' : 'transparent',
    borderLeftWidth: 0,
    borderWidth: 1,
    // borderRightWidth: 2,
    borderColor: '#010203',
    width: '15%',
    // backgroundColor: '#dddddd70',
    height: RFValue(40),
    alignItems: 'center',
    justifyContent: 'center'
  }),
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
