import { StyleSheet, Dimensions } from 'react-native'
import { Fonts, Colors } from '../../Themes'

let maxWidth = Dimensions.get('screen').width - 100

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginRight: 20
  },
  text: {
    fontFamily: Fonts.type.base,
    fontSize: 17,
    maxWidth: maxWidth,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.41,
    color: Colors.reddishOrange
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    paddingLeft: 16,
    height: 28,
    backgroundColor: Colors.transOrange
  },
  sectionHeaderText: {
    fontFamily: Fonts.type.base,
    fontSize: 15,
    letterSpacing: -0.24,
    color: Colors.reddishOrange,
    textShadowColor: 'rgba(231, 109, 63, 0.5)',
    textShadowOffset: {
      width: -1,
      height: 2
    },
    textShadowRadius: 2
  }
})
