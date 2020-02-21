import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  couponBackground: {
    backgroundColor: Colors.reddishOrange,
    marginBottom: 10,
    justifyContent: 'center'
  },
  absoluteCell: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  couponContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    borderColor: Colors.reddishOrange,
    borderWidth: 1,
    minHeight: 91,
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
  },
  deleteText: {
    fontFamily: Fonts.type.base,
    fontSize: 16,
    position: 'absolute',
    right: 17,
    alignSelf: 'center',
    color: 'white'
  }
})
