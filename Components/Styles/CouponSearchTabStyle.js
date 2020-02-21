import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  miniHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  block: {
    width: 44,
    alignSelf: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: Fonts.type.base,
    color: Colors.reddishOrange
  },
  couponImage: {
    width: 90,
    height: 90,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#FCDFD7',
    marginBottom: 8
  },
  couponContainer: {
    marginRight: 5,
    maxWidth: 98
  },
  couponText: {
    fontFamily: Fonts.type.base,
    fontSize: 12,
    color: Colors.reddishOrange
  },
})
