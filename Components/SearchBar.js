import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image, TextInput } from 'react-native'
import styles from './Styles/SearchBarStyle'
import { Images } from '../Themes'

export default class SearchBar extends Component {
  // Prop type warnings
  static propTypes = {
    onChangeText: PropTypes.func.isRequired
  }

  // Defaults for props
  static defaultProps = {
  }

  render () {
    return (
      <View style={styles.textInputContainer}>
        <View style={styles.textInputInternals}>
          <Image style={styles.textInputIcon} source={Images.searchIcon} />
          <TextInput clearButtonMode='while-editing' value={this.props.defaultValue} ref={(textInput) => { this.textInput = textInput }} onChangeText={this.props.onChangeText} style={styles.textInputInput} placeholder='' />
        </View>
      </View>
    )
  }
}
