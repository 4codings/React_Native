import { StyleSheet, Dimensions } from 'react-native'
import { Fonts, Colors } from '../../Themes'
const screenWidth = Dimensions.get('screen').width

export default StyleSheet.create({
  container: {
    flex: 1
  },
  popupContainer: {
    zIndex: 9
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
    zIndex: 9,
    marginTop: -20
  },
  popupDialog: {
    marginLeft: 15,
    marginRight: 15,
    width: screenWidth - 30,
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: 30
  },
  page: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 25,
    zIndex: 1
  },
  pageTitle: {
    fontFamily: Fonts.type.base,
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.reddishOrange
  },
  pageMessage: {
    fontFamily: Fonts.type.base,
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.reddishOrange
  },
  messageBoxContainer: {
    borderRadius: 17,
    backgroundColor: '#047cfe',
    flexDirection: 'column',
    // alignItems: 'baseline',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 9,
    marginRight: 10
  },
  messageBoxImage: {
    width: '100%',
    height: 200,
    marginBottom: 8
  },
  messageBoxText: {
    fontFamily: Fonts.type.base,
    fontSize: 17,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: -0.41,
    color: '#ffffff'
  },
  messageTail: {
    position: 'absolute',
    right: 4,
    bottom: 11
  },
  refreshButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40
  },
  flatList: {
    marginTop: 15
  }
})
