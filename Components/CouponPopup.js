import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, Image, Alert, ScrollView } from 'react-native'
import styles from './Styles/CouponPopupStyle'
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog'
import ContactGrid from './ContactGrid'
import { BlurView } from 'react-native-blur'
import { Images } from '../Themes'
import _ from 'lodash'

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom'
})

const CouponView = ({coupon, onPress}) => {
  let cp = coupon
  if (!cp) {
    cp = {
      id: 0,
      title: '',
      link: '',
      desc: '',
      image: ''
    }
  }
  return (
    <TouchableOpacity onPress={() => onPress(coupon)}>
      <View style={styles.couponContainer}>
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
  )
}

export default class CouponPopup extends Component {
  // Prop type warnings
  static propTypes = {
    coupon: PropTypes.object
  }

  // Defaults for props
  static defaultProps = {
    coupon: {
      // id: 1,
      // title: 'Title',
      // link: 'https://google.com',
      // desc: 'Here is the description',
      // image: 'https://firebasestorage.googleapis.com/v0/b/insss-app.appspot.com/o/coupon-images%2F6e0e494e-702d-4b24-89c3-6fbcf06c500a-Vsky%20Logo%20White.png?alt=media'
    },
    coupons: []
  }

  constructor (props) {
    super(props)
    let tempState = {
      selectedContacts: [],
      coupon: {},
      refresh: 0,
      page: 1
    }
    if (props.coupons && props.coupons.length > 0) {
      tempState.page = 0
    }
    this.state = tempState
  }

  selectContact (contact) {
    let current = Object.assign([], this.state.selectedContacts)
    let foundIndex = false
    this.state.selectedContacts.forEach((savedContact, index) => {
      if (contact.recordID === savedContact.recordID) {
        foundIndex = true
      }
    })

    if (foundIndex === false) {
      current.push(contact)
    } else {
      current = []
      this.state.selectedContacts.forEach((savedContact, index) => {
        if (contact.recordID !== savedContact.recordID) {
          current.push(savedContact)
        }
      })
    }

    this.setState({
      selectedContacts: current,
      refresh: this.state.refresh + 1
    })
  }

  selectCoupon = (coupon) => {
    this.setState({
      coupon: coupon,
      page: 1
    })
  }

  showSingleCoupon = (coupon) => {
    console.log(this.props.navigation)
    if (this.props.navigation) {
      this.props.navigation.navigate('CouponSingle', {
        coupon
      })
    }
  }

  sendMessage = () => {
    var self = this
    const { coupon } = this.state
    let phones = []
    let meExists = false
    this.state.selectedContacts.forEach((ct) => {
      if (ct.id === 'me') {
        meExists = true
      }
      phones.push(_.flattenDeep(_.map(ct.phoneNumbers, 'number')))
    })

    phones = _.flattenDeep(phones)
    if (phones.length > 0 || meExists) {
      if (phones.length > 0) {
        this.props.onSend(`${coupon.title}. ${coupon.desc}. ${coupon.link}`, phones)
      }
      if (meExists) {
        (self.props.saveCoupon !== undefined && coupon) ? self.props.saveCoupon(coupon.id, (phones.length === 0)) : console.error('No save coupon')
      }
    } else {
      Alert.alert('Please select contacts')
    }
  }

  render () {
    let me = {
      id: 'me',
      givenName: 'Me',
      familyName: '',
      recordID: 'me',
      getPhotoForId: () => { return null }
    }

    const { contacts, show } = this.props

    let allContacts = _.concat([me], contacts)
    const { coupon } = this.state
    return (
      <PopupDialog
        dismissOnTouchOutside={false}
        onShown={() => {
          if (this.props.couponType === 'multiple') {
            this.setState({
              coupon: this.props.coupon,
              coupons: this.props.coupons,
              selectedContacts: [],
              refresh: this.state.refresh + 1,
              page: 0
            })
          } else {
            this.setState({
              coupon: this.props.coupon,
              coupons: this.props.coupons,
              selectedContacts: [],
              refresh: this.state.refresh + 1,
              page: 1
            })
          }
        }}
        onDismissed={() => {
          this.setState({
            selectedContacts: [],
            refresh: this.state.refresh + 1
          })
        }}
        overlayOpacity={0}
        show={show}
        height='85%'
        containerStyle={[styles.popupContainer]}
        dialogStyle={[styles.popupDialog]}
        dialogAnimation={slideAnimation}
        ref={(popupDialog) => { this.internalPopup = popupDialog }}>
        <BlurView blurType='light' blurAmount={100} style={styles.popupInternal}>
          <TouchableOpacity onPress={() => this.props.dismiss()} style={{flexDirection: 'row', justifyContent: 'flex-end', width: 55, alignSelf: 'flex-end', paddingTop: 10, zIndex: 99}}>
            <View><View style={{width: 44, paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-end'}}><Image style={styles.closeButton} source={Images.stopIcon} /></View></View>
          </TouchableOpacity>
          {this.state.page === 0 ? <View style={{flex: 1}}>
            <View pointerEvents='none' style={{marginTop: -20}}>
              <Text style={styles.happySharingText}>Happy Sharing</Text>
              <Text style={styles.selectDealText}>Select a deal</Text>
            </View>
            <ScrollView>
              {this.props.coupons && this.props.coupons.map((coup) => (
                <CouponView coupon={coup} onPress={this.selectCoupon.bind(this)} />
              ))}
            </ScrollView>
          </View> : null}
          {this.state.page === 1 ? <View style={{flex: 1}}>
            <CouponView coupon={coupon} onPress={this.showSingleCoupon.bind(this)} />
            <Text style={styles.selectText}>Select the recipients</Text>
            <View style={{flex: 1, marginLeft: -15}}>
              <ContactGrid
                refresh={this.state.refresh}
                selectedContacts={this.state.selectedContacts}
                onRemoveContact={() => {}}
                onContactPress={this.selectContact.bind(this)}
                contacts={allContacts} />
            </View>
            <TouchableOpacity onPress={this.sendMessage.bind(this)}>
              <View style={{justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
                <Image source={Images.sendCouponButton} />
              </View>
            </TouchableOpacity>
          </View> : null}
        </BlurView>
      </PopupDialog>
    )
  }
}
