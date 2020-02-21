import { StyleSheet, Dimensions } from 'react-native'
const screenWidth = Dimensions.get('screen').width

export default StyleSheet.create({
  container: {
    flex: 1
  },
  popupContainer: {
    zIndex: 99999
  },
  popupInternal: {
    marginTop: -50,
    borderRadius: 14
  },
  popupTextContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 0,
    marginRight: 0,
    marginTop: -1
  },
  popupDialog: {
    marginLeft: 15,
    marginRight: 15,
    width: screenWidth - 30,
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: 30
  }
})
