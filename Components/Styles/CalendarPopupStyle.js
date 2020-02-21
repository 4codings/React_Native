import { StyleSheet, Dimensions } from 'react-native'
const screenWidth = Dimensions.get('screen').width

const AppWidth = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height
}

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
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 0,
    marginRight: 0,
    marginTop: -9,
    zIndex: 1
  },
  popupDialog: {
    // marginLeft: 15,
    // marginRight: 15,
    width: screenWidth - 30,
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: 30
  },
  saveButton: {
    width: 145,
    height: 42
  },
  saveButtonContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  calendarContainer: {
    width: AppWidth.width * 0.90,
    backgroundColor: 'transparent',
    marginBottom: 16,
    borderRadius: 3,
    shadowColor: 'rgba(204, 204, 204, 0.24)',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 32,
    shadowOpacity: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
