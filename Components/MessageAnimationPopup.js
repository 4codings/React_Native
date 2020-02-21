import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Image, Animated } from 'react-native'
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog'
import { BlurView } from 'react-native-blur'
import LottieView from 'lottie-react-native'
import styles from './Styles/MessageAnimationPopupStyle'
import { Images } from '../Themes'
const ReminderAnimation = require('../Animations/MessageReminder.json')

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom'
})

export default class MessageAnimationPopup extends Component {
  // Prop type warnings
  static propTypes = {
    someProperty: PropTypes.object,
    someSetting: PropTypes.bool.isRequired
  }

  // Defaults for props
  static defaultProps = {
    someSetting: false
  }

  constructor (props) {
    super(props)
    this.state = {
      progress: new Animated.Value(0.08),
      loop: false
    }
  }

  componentDidMount () {
    // let self = this
    // Animated.timing(this.state.progress, {
    //   toValue: 1,
    //   duration: 5000,
    //   useNativeDriver: true
    // }).start(() => {
    //   self.setState({
    //     progress: null,
    //     loop: true
    //   }, () => {
    //     // self.animation.play(30000)
    //   })
    // })
  }

  playAnimation () {
    this.sequence = Animated.sequence([
      Animated.timing(this.state.progress, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(this.state.progress, {
            useNativeDriver: true,
            toValue: 0.2,
            duration: 0
          }),
          Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 8000,
            useNativeDriver: true
          })
        ])
      )
    ])
    this.sequence.start()
  }

  render () {
    const { show } = this.props
    return (
      <PopupDialog
        overlayOpacity={0}
        onShown={() => {
          this.playAnimation()
        }}
        onDismissed={() => {
          this.sequence.stop()
        }}
        show={show}
        height='90%'
        containerStyle={[styles.popupContainer]}
        dialogStyle={[styles.popupDialog]}
        dialogAnimation={slideAnimation}
        ref={(popupDialog) => { this.internalPopup = popupDialog }}>
        <BlurView blurType='light' blurAmount={100} style={styles.popupInternal}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: '100%', paddingTop: 10, zIndex: 99}}>
            <TouchableOpacity onPress={() => {
              this.props.dismiss()
            }}><View style={{width: 44, paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-end'}}><Image style={styles.closeButton} source={Images.stopIcon} /></View></TouchableOpacity>
          </View>
          <View pointerEvents='none' style={[styles.popupTextContainer]}>
            <LottieView progress={this.state.progress} autoPlay={false} pointerEvents='none' style={{flex: 1, marginTop: -30}} source={ReminderAnimation} />
          </View>
          <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.dismiss()}>
            <View style={{position: 'absolute', bottom: 0, left: 0, width: '100%', zIndex: 99, backgroundColor: 'transparent', height: 150}} />
          </TouchableOpacity>
        </BlurView>
      </PopupDialog>
    )
  }
}
