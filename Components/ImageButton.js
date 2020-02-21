import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Image } from 'react-native'
import styles from './Styles/ImageButtonStyle'

export default class ImageButton extends Component {
  // Prop type warnings
  static propTypes = {
    style: PropTypes.object,
    source: PropTypes.any,
    onPress: PropTypes.func,
    resizeMode: PropTypes.string
  }

  // Defaults for props
  static defaultProps = {
    style: {},
    onPress: () => {}
  }

  render () {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={this.props.style}>
        <Image style={{paddingHorizontal: 20}} resizeMode='contain' source={this.props.source} />
      </TouchableOpacity>
    )
  }
}
