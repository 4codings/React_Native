import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 60,
    borderRadius: 14
    // backgroundColor: 'rgba(255, 255, 255, 0.5)',
    // shadowColor: "rgba(0, 0, 0, 0.5)",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowRadius: 4,
    // shadowOpacity: 1
  },
  title: {
    fontFamily: Fonts.type.base,
    fontSize: 14,
    letterSpacing: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 18,
    textAlign: 'center',
    color: Colors.reddishOrange
  },
  popupTextContainer: {
    flex: 1,
    paddingTop: 8,
    marginHorizontal: -15
  }
})
