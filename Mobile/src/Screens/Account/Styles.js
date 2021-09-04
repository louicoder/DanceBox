import { Dimensions, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  socials: {
    // borderWidth: 1,
    // marginHorizontal: RFValue(5),
    width: RFValue(60),
    height: RFValue(60),
    borderRadius: RFValue(3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee'
  },
  imageContainer: {
    width: '100%',
    // flexDirection: 'row',
    paddingHorizontal: RFValue(10),
    alignItems: 'center',
    paddingVertical: RFValue(15),
    backgroundColor: '#fff'
  },
  profilePhoto: { width: RFValue(80), height: RFValue(80), alignSelf: 'center', borderRadius: RFValue(200) },
  editIconContainer: {
    borderRadius: RFValue(100),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.6)'
  },
  nameContainer: {
    // borderColor: '#eee',
    // borderWidth: 1,
    marginTop: RFValue(10),
    width: '100%'
    // flexGrow: 1,
    // paddingLeft: RFValue(15)
  },
  name: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'center'
  },
  email: { fontSize: RFValue(14), color: '#aaa', textAlign: 'center' },
  editButton: {
    // borderWidth: 1,
    backgroundColor: '#010203',
    marginTop: RFValue(10),
    height: RFValue(40),
    // paddingVertical: RFValue(10),
    width: '50%',
    alignItems: 'center',
    // paddingHorizontal: RFValue(20),
    justifyContent: 'center',
    alignSelf: 'center'
  },
  editButtonText: { fontSize: RFValue(16), color: '#fff' }
});
