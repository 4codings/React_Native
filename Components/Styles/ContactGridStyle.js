import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Fonts } from '../../Themes'
const appWidth = Dimensions.get('window').width
const cellWidth = (appWidth - (42 * 2) - (20 * 2)) / 3

export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    width: cellWidth,
    maxWidth: cellWidth,
    marginBottom: 15
  },
  xIcon: {
    marginBottom: -24,
    marginLeft: -10,
    zIndex: 999
  },
  list: {
    // flexDirection: 'row',
    paddingLeft: 32,
    paddingRight: 32
    // justifyContent: 'center'
  },
  listContainer: {
    flex: 1,
    paddingTop: 15
  },
  avatarTextStyle: {
    fontFamily: Fonts.type.base,
    // marginHorizontal: 5,
    fontSize: 28,
    lineHeight: 34,
    zIndex: 9999
    // fontSize: 35
  },
  gridCellImage: {
    width: cellWidth - 2,
    height: cellWidth - 2,
    borderRadius: cellWidth / 2,
    backgroundColor: 'white',
    zIndex: 1
  },
  gridCellContainer: {
    width: cellWidth,
    height: cellWidth,
    // shadowColor: 'rgba(231, 109, 63, 0.50)',
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowRadius: 4,
    // shadowOpacity: 1,
    borderStyle: 'solid',
    borderRadius: cellWidth / 2,
    borderWidth: 1,
    borderColor: Colors.silver,
    marginBottom: 10
  },
  gridCellText: {
    fontFamily: Fonts.type.base,
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.26,
    textAlign: 'center',
    color: Colors.reddishOrange
  }
})
