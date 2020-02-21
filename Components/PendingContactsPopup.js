import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, FlatList, Image, Text } from 'react-native'
import styles from './Styles/PendingContactsPopupStyle'
import Modal from 'react-native-modal'
import { BlurView } from 'react-native-blur'
import HomeContactCell from '../Components/HomeContactCell'
import { Images } from '../Themes'

export default class PendingContactsPopup extends Component {
  // Prop type warnings
  static propTypes = {
    show: PropTypes.bool.isRequired,
    contacts: PropTypes.array,
    onContactPress: PropTypes.func
  }

  // Defaults for props
  static defaultProps = {
    show: true,
    contacts: [],
    onContactPress: () => {}
  }

  constructor (props) {
    super(props)
    this.state = {
      currentlyOpenSwipeable: null
    }
  }

  showDetails = (contact) => {
    this.props.showDetails(contact)
    if (this.state.currentlyOpenSwipeable) {
      this.state.currentlyOpenSwipeable.recenter()
      this.state.currentlyOpenSwipeable.props.stopRightPan()
    }
  }

  renderItem ({item, index}) {
    let date = item.pendingDate
    return <HomeContactCell onOpen={this.handleSwipeOpen.bind(this)} onClose={this.handleSwipeClose.bind(this)} idx={index} onPress={this.props.onContactPress} onDeletePress={this.props.deleteContact} onDetailsPress={this.showDetails} contact={item} date={date} />
  }

  handleSwipeOpen = (event, gestureState, swipeable) => {
    const {currentlyOpenSwipeable} = this.state
    if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
      currentlyOpenSwipeable.recenter()
      currentlyOpenSwipeable.props.stopRightPan()
    }

    this.setState({currentlyOpenSwipeable: swipeable})
  }

  handleSwipeClose = () => {
    this.setState({currentlyOpenSwipeable: null})
  }

  render () {
    return (
      <Modal
        backdropColor='transparent'
        onBackdropPress={() => {
          this.props.dismiss()
        }}
        isVisible={this.props.show}>
        <BlurView blurType='light' blurAmount={100} style={styles.container}>
          <Text style={styles.title}>Missed Reminders</Text>
          <TouchableOpacity onPress={() => this.props.dismiss()} style={{flexDirection: 'row', justifyContent: 'flex-end', width: 55, alignSelf: 'flex-end', paddingBottom: 12, paddingRight: 12, paddingTop: 12}}>
            <View><Image style={styles.closeButton} source={Images.stopIcon} /></View>
          </TouchableOpacity>
          <View style={styles.popupTextContainer}>
            <FlatList
              keyExtractor={this._keyExtractor}
              data={this.props.contacts}
              renderItem={this.renderItem.bind(this)} />
          </View>
        </BlurView>
      </Modal>
    )
  }
}
