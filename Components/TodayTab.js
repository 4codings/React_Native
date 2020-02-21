import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native'
import styles from './Styles/TodayTabStyle'
import Swiper from 'react-native-swiper-animated'
import { Images } from '../Themes'
import _ from 'lodash'

export default class TodayTab extends Component {
  // Prop type warnings
  static propTypes = {
    coupons: PropTypes.array.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      heartAnim: new Animated.Value(0),
      xAnim: new Animated.Value(0),
      coupons: [],
      coupon: null,
      backAnimationEnabled: false,
      lastCoupon: undefined
    }
  }

  componentDidMount () {
    let allCoupons = Object.assign([], this.props.coupons, {})
    allCoupons.push({})
    this.setState({
      coupons: allCoupons
    })
  }

  componentWillReceiveProps (newProps, nextState) {
    if (newProps.coupons) {
      let allCoupons = Object.assign([], newProps.coupons, {})
      allCoupons.push({})
      this.setState({
        coupons: allCoupons
      })
    }
  }

  // Defaults for props
  static defaultProps = {
    coupons: []
  }

  removeCouponIndex (index) {
    let newCouponStack = this.state.coupons.splice(index, 1)
    this.setState({
      coupon: newCouponStack
    })
  }

  onLeftSwipe () {
    this.animateX()
    let index = this.swiper.currentIndex.Y8sivEVkWc0p
    let coupon = this.state.coupons[index]
    this.setState({
      lastCoupon: coupon
    })
    this.props.removeCoupon({
      variables: {
        couponId: coupon.id
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  onRightSwipe () {
    this.animateHeart()
    let index = this.swiper.currentIndex.Y8sivEVkWc0p
    let coupon = this.state.coupons[index]
    this.setState({
      lastCoupon: coupon
    })
    this.props.saveCoupon({
      variables: {
        couponId: coupon.id
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  animateHeart () {
    this.animateIcon(this.state.heartAnim)
  }

  animateX () {
    this.animateIcon(this.state.xAnim)
  }

  canSwipe () {
    let index = this.swiper.currentIndex.Y8sivEVkWc0p
    let coupon = this.state.coupons[index]
    if (coupon.id !== undefined && coupon.id !== null) {
      return true
    }
    return false
  }

  leftAction () {
    if (this.canSwipe()) {
      this.swiper.forceLeftSwipe()
      this.onLeftSwipe()
    }
  }

  rightAction () {
    if (this.canSwipe()) {
      this.swiper.forceRightSwipe()
      this.onRightSwipe()
    }
  }

  animateIcon (animatedValue) {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      })
    ]).start()
  }

  showCoupon () {
    let index = this.swiper.currentIndex.Y8sivEVkWc0p
    let coupon = this.state.coupons[index]
    this.showSingleCoupon(coupon)
  }

  sharePressed () {
    let index = this.swiper.currentIndex.Y8sivEVkWc0p
    let coupon = this.state.coupons[index]
    this.props.onCouponShare(coupon)
  }

  showSingleCoupon = (coupon) => {
    console.log(this.props.navigation)
    this.props.navigation.navigate('CouponSingle', {
      coupon
    })
  }

  resetLastCard () {
    let coupon = this.state.lastCoupon
    if (coupon) {
      let newCouponStack = this.state.coupons
      newCouponStack.unshift(coupon)
      this.setState({
        // backAnimationEnabled: true,
        lastCoupon: undefined,
        coupons: newCouponStack
      })
      // this.swiper.handleBackPress()
      // this.swiper.forceLeftSwipe()
    }
  }

  render () {
    let allCoupons = this.state.coupons
    return (
      <View style={styles.container}>
        <Swiper
          ref={(swiper) => { this.swiper = swiper }}
          style={styles.swiperWrapper}
          scaleOthers
          smoothTransition
          backPressToBack={this.state.backAnimationEnabled}
          onRightSwipe={this.onRightSwipe.bind(this)}
          onLeftSwipe={this.onLeftSwipe.bind(this)}
          showPagination={false}
          stack>
          {allCoupons.map((coupon) => {
            if (coupon.id !== null && coupon.id !== undefined) {
              return (
                <View key={coupon.id + 10} style={styles.slide}>
                  <TouchableOpacity onPress={() => this.showSingleCoupon(coupon)}><Image style={styles.image} source={{uri: coupon.image}} resizeMode='contain' /></TouchableOpacity>
                  <Text style={styles.couponTitle}>{coupon.title}</Text>
                  <Text style={styles.couponDescription}>{coupon.desc}</Text>
                </View>
              )
            } else {
              return (
                <View key={99} style={styles.endSlide}>
                  <Image source={Images.searchForMore} />
                </View>
              )
            }
          })}
        </Swiper>
        <View style={styles.animatedImageContainer} pointerEvents='none'>
          <Animated.Image style={[styles.animatedCardImage, {opacity: this.state.heartAnim}]} source={Images.couponLargeHeartIcon} />
          <Animated.Image style={[styles.animatedCardImage, {opacity: this.state.xAnim}]} source={Images.couponLargeXIcon} />
        </View>
        <View style={styles.iconContainer}>
          <Icon image={Images.refreshCouponIcon} action={this.resetLastCard.bind(this)} />
          <Icon image={Images.couponXIcon} action={this.leftAction.bind(this)} />
          <Icon image={Images.shareCouponImage} action={this.sharePressed.bind(this)} />
          <Icon image={Images.couponHeartIcon} action={this.rightAction.bind(this)} />
          <Icon image={Images.couponMoreIcon} action={this.showCoupon.bind(this)} />
        </View>
      </View>
    )
  }
}

const Icon = ({image, action}) => (
  <TouchableOpacity onPress={() => action ? action() : null}>
    <Image style={styles.icon} resizeMode='center' source={image} />
  </TouchableOpacity>
)
