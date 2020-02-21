import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, FlatList } from 'react-native'
import styles from './Styles/SavedTabStyle'
import CouponView from './CouponView'
import SearchBar from '../Components/SearchBar'
import _ from 'lodash'

export default class SavedTab extends Component {
  // Prop type warnings
  static propTypes = {
    coupons: PropTypes.object,
    saveCoupon: PropTypes.func,
    removeCoupon: PropTypes.func
  }

  // Defaults for props
  static defaultProps = {
    coupons: []
  }

  constructor (props) {
    super(props)
    this.state = {
      scrollEnabled: true,
      search: null
    }
  }

  componentDidMount () {
    this.props.refresh()
  }
  _keyExtractor = (item, index) => {
    return item.id
  }

  renderItem ({item, index}) {
    return (
      <CouponView
        onPress={() => this.showSingleCoupon(item)}
        success={this.success.bind(this)}
        setScrollEnabled={enable => this.setScrollEnabled(enable)}
        coupon={item} />
    )
  }

  showSingleCoupon = (coupon) => {
    console.log(this.props.navigation)
    this.props.navigation.navigate('CouponSingle', {
      coupon
    })
  }

  setScrollEnabled (enable) {
    this.setState({
      scrollEnabled: enable
    })
  }

  success (key) {
    // const data = this.props.coupons.filter(item => item.key !== key)
    this.props.removeCoupon({
      variables: {
        couponId: key
      }
    }).then(() => {
      this.props.refresh()
    })
  }

  updateSearch (term) {
    if (term.length === 0) {
      this.setState({
        search: null
      })
    } else {
      this.setState({
        search: term
      })
    }
  }

  render () {
    let coupons = this.props.coupons
    if (this.state.search) {
      coupons = _.filter(this.props.coupons, (coup) => {
        return coup.title.toLowerCase().includes(this.state.search.toLowerCase()) ||
          coup.desc.toLowerCase().includes(this.state.search.toLowerCase())
      })
    }
    return (
      <View style={styles.container}>
        <View style={{marginHorizontal: 36, marginBottom: 10}}><SearchBar onChangeText={this.updateSearch.bind(this)} /></View>
        <View style={{marginHorizontal: 20, flex: 1}}>
          <FlatList
            ref={(list) => { this.flatList = list }}
            scrollEnabled={this.state.scrollEnabled}
            keyExtractor={this._keyExtractor}
            data={coupons}
            renderItem={this.renderItem.bind(this)} />
        </View>
      </View>
    )
  }
}
