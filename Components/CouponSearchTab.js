import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, TouchableOpacity, Image, Text } from 'react-native'
import styles from './Styles/CouponSearchTabStyle'
import SearchBar from '../Components/SearchBar'
import CategorySlider from './CategorySlider'
import _ from 'lodash'
import CouponView from './CouponView'
import { Images } from '../Themes'

export default class CouponSearchTab extends Component {
  // Prop type warnings
  static propTypes = {
  }

  // Defaults for props
  static defaultProps = {
    categories: PropTypes.array
  }

  constructor (props) {
    super(props)
    this.state = {
      selectedCategory: null,
      search: null,
      selectedSubCategory: null
    }
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

  renderItem ({item}) {
    return (
      <CategorySlider onCouponPressed={this.onSelectCategory.bind(this)} onSeeAll={this.onSelectSubCategory.bind(this)} category={item} />
    )
  }

  renderSingleCategory ({item, index}) {
    return (
      <TouchableOpacity onPress={() => this.onSelectCategory(item)}>
        <View style={styles.couponContainer}>
          <Image style={styles.couponImage} source={{uri: item.image ? item.image : ''}} />
          <Text style={styles.couponText}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderCouponSingleItem ({item, index}) {
    return (
      <CouponView touchable onPress={() => this.showSingleCoupon(item)} coupon={item} />
    )
  }

  renderMiniHeader (props) {
    return (
      <View style={styles.miniHeader}>
        <View style={styles.block}>
          <TouchableOpacity onPress={this.deselect.bind(this)}><Image source={Images.arrowLeft} /></TouchableOpacity>
        </View>
        <Text style={styles.title}>{props.selCat ? props.selCat.title : ''}</Text>
        <View style={styles.block} />
      </View>
    )
  }

  showSingleCoupon = (coupon) => {
    console.log(this.props.navigation)
    this.props.navigation.navigate('CouponSingle', {
      coupon
    })
  }

  _keyExtractor = (item, index) => {
    return item.id
  }

  onSelectSubCategory = (category) => {
    this.setState({
      selectedSubCategory: category
    })
  }

  onSelectCategory = (category) => {
    this.setState({
      selectedCategory: category.id
    })
  }

  deselect = () => {
    this.setState({
      selectedSubCategory: null,
      selectedCategory: null
    })
  }

  render () {
    const categories = _.sortBy(this.props.categories, 'id')
    const allCategories = this.props.allCategories
    let filteredCoupons = []
    let selCat
    if (this.state.selectedCategory) {
      for (var i = 0; i < allCategories.length; i++) {
        if (parseInt(allCategories[i].id) === parseInt(this.state.selectedCategory)) {
          selCat = allCategories[i]
        }
      }
      if (selCat) {
        filteredCoupons = selCat.coupons
      }
      if (this.state.search) {
        filteredCoupons = _.filter(filteredCoupons, (cat) => {
          return cat.title.toLowerCase().includes(this.state.search.toLowerCase()) ||
            cat.desc.toLowerCase().includes(this.state.search.toLowerCase())
        })
      }
    } else if (this.state.search) {
      let allCoupons = _.uniqBy(_.flattenDeep(_.map(categories, 'coupons')), 'id')
      filteredCoupons = _.filter(allCoupons, (cat) => {
        return cat.title.toLowerCase().includes(this.state.search.toLowerCase()) ||
          cat.desc.toLowerCase().includes(this.state.search.toLowerCase())
      })
    }

    if (this.state.selectedSubCategory && !this.state.selectedCategory) {
      return (
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <View style={{marginHorizontal: 36, marginBottom: 10}}>
              <SearchBar onChangeText={this.updateSearch.bind(this)} />
            </View>
            <View>
              {this.renderMiniHeader({selCat: this.state.selectedSubCategory})}
              <FlatList
                showsVerticalScrollIndicator={false}
                ref={(list) => { this.subCategoryList = list }}
                keyExtractor={this._keyExtractor}
                numColumns={3}
                contentContainerStyle={{
                }}
                style={{marginBottom: 80, paddingHorizontal: 20}}
                data={this.state.selectedSubCategory.subCategories}
                renderItem={this.renderSingleCategory.bind(this)} />
            </View>
          </View>
        </View>
      )
    }

    return (
      <View key='TD' style={styles.container}>
        <View style={{flex: 1}}>
          <View style={{marginHorizontal: 36, marginBottom: 10}}>
            <SearchBar onChangeText={this.updateSearch.bind(this)} />
          </View>
          {filteredCoupons.length === 0 && !this.state.search ? <FlatList
            ref={(list) => { this.flatList = list }}
            showsVerticalScrollIndicator={false}
            keyExtractor={this._keyExtractor}
            data={categories}
            renderItem={this.renderItem.bind(this)} /> : <View>
              {this.renderMiniHeader({selCat: selCat})}
              <FlatList
                showsVerticalScrollIndicator={false}
                ref={(list) => { this.couponList = list }}
                keyExtractor={this._keyExtractor}
                style={{marginBottom: 80, paddingHorizontal: 20}}
                data={filteredCoupons}
                renderItem={this.renderCouponSingleItem.bind(this)} />
            </View>}
        </View>
      </View>
    )
  }
}
