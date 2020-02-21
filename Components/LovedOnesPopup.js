import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Image } from 'react-native'
import styles from './Styles/LovedOnesPopupStyle'
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog'
import { BlurView } from 'react-native-blur'
import { Images } from '../Themes'
import ContactGrid from './ContactGrid'

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom'
})

export default class LovedOnesPopup extends Component {
  // Prop type warnings
  static propTypes = {
    show: PropTypes.bool,
    contacts: PropTypes.array.isRequired
  }

  // Defaults for props
  static defaultProps = {
  }

  render () {
    const { contacts, show } = this.props
    return (
      <PopupDialog
        overlayOpacity={0}
        show={show}
        height={350}
        containerStyle={[styles.popupContainer]}
        dialogStyle={[styles.popupDialog]}
        dialogAnimation={slideAnimation}
        ref={(popupDialog) => { this.internalPopup = popupDialog }}>
        <BlurView blurType='light' blurAmount={100} style={styles.popupInternal}>
          <TouchableOpacity onPress={() => this.props.dismiss()} style={{flexDirection: 'row', justifyContent: 'flex-end', width: 55, alignSelf: 'flex-end', paddingRight: 12, paddingTop: 12, paddingBottom: 12}}>
            <View><View style={{width: 44, paddingTop: 10, paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-end'}}><Image style={styles.closeButton} source={Images.stopIcon} /></View></View>
          </TouchableOpacity>
          <View style={styles.popupTextContainer}>
            <View style={{height: '100%', width: '100%', marginLeft: -30}}>
              <ContactGrid
                onRemoveContact={this.props.onRemoveContact.bind(this)}
                onContactPress={this.props.onContactPress.bind(this)}
                contacts={contacts} />
            </View>
          </View>
        </BlurView>
      </PopupDialog>
    )
  }
}
