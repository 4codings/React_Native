import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes';

export default StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: 'transparent',
    minHeight: 200
  },
  inputContainerStyle: {
    borderColor: Colors.reddishOrange,
    backgroundColor: Colors.white,
    borderWidth: 1,
    minHeight: 60
  },
  inputTextStyle: {
    fontFamily: Fonts.type.base,
    fontSize: 14,
    color: Colors.bloodOrange,
    marginLeft: 6,
    paddingBottom: 10
  }
})
