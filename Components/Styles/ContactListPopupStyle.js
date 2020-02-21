import { StyleSheet, Dimensions } from 'react-native'
const WIDTH = Dimensions.get('window').width
const ITEM_HEIGHT = 50

export default StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30,
    borderRadius: 14
  },
  containerInternal: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50
  },
  itemContainer: {
    width: WIDTH,
    flex: 1,
    flexDirection: 'column',
    height: ITEM_HEIGHT
  },
  itemTitle: {
    fontWeight: 'bold',
    color: '#888',
    padding: 5
  },
  itemSubtitle: {
    color: '#ddd',
    padding: 5,
    paddingTop: 0
  },
  closeButton: {
  }
})
