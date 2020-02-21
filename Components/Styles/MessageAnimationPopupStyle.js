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
    borderRadius: 14
  },
  popupTextContainer: {
    width: '100%',
    height: '100%'
  },
  popupDialog: {
    marginLeft: 15,
    marginRight: 15,
    width: screenWidth - 30,
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: 30
  },
  saveButton: {
    width: 145,
    height: 42
  }
})
