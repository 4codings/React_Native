import { StyleSheet, Dimensions } from 'react-native'
import { Fonts, Colors } from '../../Themes'
const width = Dimensions.get('screen').width

export default StyleSheet.create({
  container: {
    flex: 1
  },
  slide: {
    flex: 1,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: '#FEEFEB',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    marginBottom: 70
  },
  image: {
    minHeight: '60%',
    width: width - 16 * 2,
    margin: 10
  },
  swiperWrapper: {
  },
  icon: {
    minHeight: 35,
    minWidth: 35
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 44,
    marginBottom: 8
  },
  text: {
    fontFamily: Fonts.type.base,
    color: Colors.reddishOrange,
    fontSize: 14,
    paddingVertical: 24
  },
  endSlide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  couponTitle: {
    fontFamily: Fonts.type.base,
    color: Colors.reddishOrange,
    fontSize: 20,
    paddingHorizontal: 10,
    textAlign: 'center'
  },
  couponDescription: {
    fontFamily: Fonts.type.base,
    color: Colors.reddishOrange,
    fontSize: 16,
    paddingHorizontal: 10,
    textAlign: 'center'
  },
  animatedCardImage: {
    position: 'absolute',
    width: 100,
    height: 100
  },
  animatedImageContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    bottom: 50,
    top: 0
  }
})
