import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Fonts } from '../../Themes'
import { ResponsiveSize } from '../../Lib/Helpers';
const appWidth = Dimensions.get('screen').width

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 80,
    marginHorizontal: 30,
    borderRadius: 21,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 11,
    overflow: 'hidden'
  },
  avatarTextStyle: {
    fontFamily: Fonts.type.base,
    lineHeight: 35,
    fontSize: 28
  },
  addContainer: {
    flex: 1,
    marginHorizontal: 30,
    borderRadius: 21,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 11,
    height: 80,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 0,
    shadowOpacity: 1
  },
  addText: {
    fontFamily: Fonts.type.base,
    fontSize: 36,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: -0.32,
    color: Colors.white
    // textAlign: 'center',
    // flex: 1
  },
  innerContainer: {
    overflow: 'hidden',
    height: 80,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 0,
    shadowOpacity: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  image: {
    marginLeft: 21
    // width: 60,
    // height: 60,
    // backgroundColor: 'blue'
    // shadowColor: 'rgba(231, 109, 63, 0.50)',
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowRadius: 4,
    // shadowOpacity: 1
    // backgroundColor: 'white'
  },
  imageContainer: {
    width: 60,
    height: 60,
    marginLeft: 21,
    // marginRight: -60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addImage: {
    width: 43,
    height: 43
  },
  contactName: {
    flex: 1,
    fontFamily: Fonts.type.base,
    fontSize: ResponsiveSize(24),
    letterSpacing: -1.42,
    paddingHorizontal: 8,
    textAlign: 'center',
    color: 'black'
  },
  text: {
    fontFamily: Fonts.type.base,
    fontSize: 36,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: -0.32,
    color: Colors.white,
    textAlign: 'center',
    flex: 1
    // backgroundColor: 'black'
  },
  dateContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    backgroundColor: 'gray'
  },
  dateSmall: {
    fontFamily: Fonts.type.base,
    fontSize: 18,
    letterSpacing: -0.21,
    textAlign: 'center',
    color: '#ffffff'
  },
  dateLarge: {
    fontFamily: Fonts.type.base,
    fontSize: 45,
    letterSpacing: -0.51,
    lineHeight: 45,
    textAlign: 'center',
    color: '#ffffff'
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    width: 75
  },
  deleteText: {
    fontFamily: Fonts.type.base,
    color: Colors.bloodOrange,
    fontSize: 16,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  detailsText: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  swipableBackground: {
    // borderColor: Colors.bloodOrange,
    // borderRadius: 21,
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  borderBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderColor: Colors.bloodOrange,
    borderRadius: 21,
    borderWidth: 1,
    borderStyle: 'solid'
  }
})
