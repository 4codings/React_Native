import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  textInputContainer: {
    height: 40,
    borderRadius: 6,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.reddishOrange
  },
  textInputInternals: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textInputIcon: {
    marginLeft: 10
  },
  textInputInput: {
    fontFamily: Fonts.type.base,
    fontSize: 22,
    letterSpacing: 0.3,
    color: Colors.reddishOrange,
    marginLeft: 10,
    flex: 1
  }
})
