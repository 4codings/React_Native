import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, Animated, PanResponder, Dimensions, TouchableOpacity } from 'react-native'
import styles from './Styles/CouponViewStyle'
import { Images } from '../Themes'
import LinearGradient from 'react-native-linear-gradient'
const {width} = Dimensions.get('window')

export default class CouponView extends Component {
  // Prop type warnings
  static propTypes = {
    coupon: PropTypes.object,
    onPress: PropTypes.func.isRequired,
    touchable: PropTypes.bool,
    imageTouchable: PropTypes.bool
  }

  // Defaults for props
  static defaultProps = {
  }

  constructor (props) {
    super(props)
    this.gestureDelay = -35
    this.scrollViewEnabled = true
    const position = new Animated.ValueXY()
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx < -35) {
          this.setScrollViewEnabled(false)
          let newX = gestureState.dx + this.gestureDelay
          position.setValue({x: newX, y: 0})
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > -150) {
          Animated.timing(this.state.position, {
            toValue: {x: 0, y: 0},
            duration: 150
          }).start(() => {
            this.setScrollViewEnabled(true)
          })
        } else {
          Animated.timing(this.state.position, {
            toValue: {x: -width, y: 0},
            duration: 300
          }).start(() => {
            this.props.success(props.coupon.id)
            this.setScrollViewEnabled(true)
          })
        }
      }
    })
    this.panResponder = panResponder
    this.state = {position}
  }

  setScrollViewEnabled (enabled) {
    if (this.scrollViewEnabled !== enabled) {
      if (this.props.setScrollEnabled) {
        this.props.setScrollEnabled(enabled)
        this.scrollViewEnabled = enabled
      }
    }
  }

  render () {
    let cp = this.props.coupon
    if (!cp) {
      cp = {
        id: 0,
        title: '',
        link: '',
        desc: '',
        image: ''
      }
    }

    if (this.props.touchable) {
      return (
        <TouchableOpacity onPress={() => this.props.onPress(cp)}>
          <View style={[styles.couponBackground, {backgroundColor: 'white'}]}>
            <View
              style={styles.couponContainer}>
              <View style={styles.leftOvalContainer}>
                <Image source={Images.ovalLeft} />
              </View>
              <View style={styles.mainContainer}>
                {(cp && cp.image) ? <Image style={styles.couponImage} resizeMode='contain' source={{uri: cp.image}} /> : null}
                <View style={styles.couponTextContainer}>
                  <Text style={styles.textLarge}>{cp.title}</Text>
                  <Text style={styles.textNormal}>{cp.desc}</Text>
                </View>
              </View>
              <View style={styles.rightOvalContainer}>
                <Image source={Images.ovalRight} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )
    } else {
      return (
        <LinearGradient colors={['#F98A49', '#F15726']} style={styles.couponBackground}>
          <Text style={styles.deleteText}>DELETE</Text>
          <Animated.View
            style={[this.state.position.getLayout(), {backgroundColor: 'white'}]}
            {...this.panResponder.panHandlers}>
            <TouchableOpacity onPress={() => this.props.onPress ? this.props.onPress(cp) : null}>
              <View
                style={styles.couponContainer}>
                <View style={styles.leftOvalContainer}>
                  <Image source={Images.ovalLeft} />
                </View>
                <View style={styles.mainContainer}>
                  {(cp && cp.image) ? <Image style={styles.couponImage} resizeMode='contain' source={{uri: cp.image}} /> : null}
                  <View style={styles.couponTextContainer}>
                    <Text style={styles.textLarge}>{cp.title}</Text>
                    <Text style={styles.textNormal}>{cp.desc}</Text>
                  </View>
                </View>
                <View style={styles.rightOvalContainer}>
                  <Image source={Images.ovalRight} />
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </LinearGradient>
      )
    }
  }
}
