import { StyleSheet, Dimensions } from 'react-native'
import { Fonts, Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainerStyle: {
    borderColor: Colors.reddishOrange,
    backgroundColor: Colors.white,
    borderWidth: 1,
    height: 30
  },
  inputTextStyle: {
    fontFamily: Fonts.type.base,
    fontSize: 14,
    color: Colors.bloodOrange,
    marginLeft: 6
  },
  iconStyle: {
    padding: 0,
    marginHorizontal: 6
  },
  numberPickerStyle: {
    width: 50,
    height: 43,
    marginRight: 14,
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.reddishOrange
  },
  dayPickerStyle: {
    width: 70,
    height: 43,
    marginLeft: 14,
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.reddishOrange
  },
  closeButton: {
    // width: 22,
    // height: 22,
    marginRight: -22
  },
  messageModes: {
    marginTop: 22,
    fontFamily: Fonts.type.base,
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.reddishOrange
  },
  numberPickerValueStyle: {
    fontFamily: Fonts.type.base,
    color: Colors.reddishOrange,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 18,
    letterSpacing: 0
  },
  popupText: {
    fontFamily: Fonts.type.base,
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.reddishOrange
  },
  selectLine: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  popupDialog: {
    marginLeft: 10,
    marginRight: 10,
    width: '95%',
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: 30,
    zIndex: 999
  },
  segementedContainer: {
    width: '100%',
    padding: 16
  },
  timeFor: {
    marginVertical: 8,
    fontWeight: 'bold',
    fontStyle: 'normal',
    textAlign: 'center',
    letterSpacing: 0,
    color: Colors.reddishOrange,
    fontFamily: Fonts.type.base,
    fontSize: 20
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
    marginLeft: 30,
    marginRight: 30
  },
  popupTitle: {
    fontFamily: Fonts.type.base,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: 0,
    color: Colors.dark
  },
  popupDescription: {
    fontFamily: Fonts.type.base,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    color: Colors.dark,
    marginBottom: 30
  },
  optionContainer: {
    marginTop: 20
  },
  optionBox: {
    height: 48,
    marginHorizontal: 10,
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  optionBoxImage: {
    width: 34.6,
    height: 34.3,
    marginHorizontal: 14
  },
  optionBoxTitleContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  optionCheckStyle: {
    width: 20.7,
    height: 20.6,
    tintColor: Colors.reddishOrange
  },
  optionUncheckStyle: {
    width: 20.7,
    height: 20.6,
    tintColor: Colors.reddishOrange
  },
  optionBoxTitle: {
    fontFamily: Fonts.type.base,
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'left',
    color: Colors.reddishOrange
  },
  optionBoxSubTitle: {
    fontFamily: Fonts.type.base,
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: Colors.reddishOrange
  },
  saveButton: {
    width: 145,
    height: 42
  },
  saveButtonContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  tabsContainerStyle: {
    width: '100%'
  },
  tabStyle: {
    backgroundColor: 'transparent',
    borderColor: Colors.reddishOrange
  },
  tabTextStyle: {
    fontFamily: Fonts.type.base,
    color: Colors.reddishOrange,
    fontSize: 16,
    letterSpacing: 0
  },
  activeTabStyle: {
    backgroundColor: Colors.reddishOrange
  }
})
