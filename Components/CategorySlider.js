import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import styles from './Styles/CategorySliderStyle'
import _ from 'lodash'

export default class CategorySlider extends Component {
  // Prop type warnings
  static propTypes = {
    category: PropTypes.object,
    onCouponPressed: PropTypes.func.isRequired
  }

  // Defaults for props
  static defaultProps = {
  }

  renderItem ({item}) {
    return (
      <TouchableOpacity onPress={() => this.props.onCouponPressed(item)}>
        <View style={styles.couponContainer}>
          <Image style={styles.couponImage} source={{uri: item.image ? item.image : ''}} />
          <Text style={styles.couponText}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _keyExtractor = (item, index) => {
    return item.id
  }

  render () {
    const { category } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}><Text style={styles.catTitle}>{category.title}</Text><TouchableOpacity onPress={() => this.props.onSeeAll(category)}><Text style={styles.seeAll}>See All</Text></TouchableOpacity></View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={(list) => { this.flatList = list }}
          style={{paddingTop: 10, flex: 1, paddingLeft: 20}}
          keyExtractor={this._keyExtractor}
          data={_.take(category.subCategories, 5)}
          renderItem={this.renderItem.bind(this)} />
      </View>
    )
  }
}
