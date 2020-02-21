import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Fonts } from '../../Themes'
const screenWidth = Dimensions.get('screen').width

export default StyleSheet.create({
  container: {
    flex: 1
  },
  popupContainer: {
    zIndex: 99999,
    marginTop: -10
  },
  popupInternal: {
    flex: 1,
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
  },
  couponContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    borderColor: Colors.reddishOrange,
    borderWidth: 1,
    marginHorizontal: 20,
    minHeight: 91,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  leftOvalContainer: {
    marginLeft: -1,
    width: 9,
    justifyContent: 'center'
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row'
    // justifyContent: 'center'
  },
  rightOvalContainer: {
    width: 9,
    justifyContent: 'center'
  },
  couponImage: {
    width: 75,
    height: 75,
    marginHorizontal: 5,
    alignSelf: 'center',
    paddingHorizontal: 5
  },
  couponTextContainer: {
    flex: 1,
    marginHorizontal: 5
  },
  textLarge: {
    fontFamily: Fonts.type.base,
    fontSize: 16,
    color: Colors.reddishOrange
  },
  textNormal: {
    fontFamily: Fonts.type.base,
    fontSize: 14,
    color: Colors.reddishOrange
  },
  selectText: {
    fontFamily: Fonts.type.base,
    fontSize: 14,
    color: Colors.reddishOrange,
    marginTop: 10,
    textAlign: 'center',
    marginBottom: -10
  },
  happySharingText: {
    fontFamily: Fonts.type.base,
    fontSize: 24,
    color: Colors.reddishOrange,
    textAlign: 'center'
  },
  selectDealText: {
    fontFamily: Fonts.type.base,
    fontSize: 16,
    color: Colors.reddishOrange,
    textAlign: 'center'
  }
})
