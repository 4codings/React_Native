import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 24
  },
  couponImage: {
    width: 95,
    height: 95,
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
  textContainer: {
    justifyContent: 'space-between',
    alignItems: 'baseline',
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  catTitle: {
    fontFamily: Fonts.type.base,
    color: Colors.reddishOrange,
    fontSize: 20
  },
  seeAll: {
    fontFamily: Fonts.type.base,
    color: Colors.reddishOrange,
    fontSize: 14
  }
})
