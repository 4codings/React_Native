import React, {Component} from 'react'
import { Animated } from 'react-native'
import PropTypes from 'prop-types'

export class Fade extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    unmountOnHide: PropTypes.bool,
    style: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      visible: props.visible,
      unmountOnHide: props.unmountOnHide
    }
  }

  componentWillMount () {
    this._visibility = new Animated.Value(this.props.visible ? 1 : 0)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.visible) {
      this.setState({ visible: true })
    }
    Animated.timing(this._visibility, {
      toValue: nextProps.visible ? 1 : 0,
      duration: 300
    }).start(() => {
      this.setState({ visible: nextProps.visible })
    })
  }

  render () {
    const { visible, style, children, ...rest } = this.props

    const containerStyle = {
      opacity: this._visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      }),
      transform: [
        {
          scale: this._visibility.interpolate({
            inputRange: [0, 1],
            outputRange: [1.1, 1]
          })
        }
      ]
    }

    const combinedStyle = [containerStyle, style]
    if (!visible && this.props.unmountOnHide) {
      return null
    }
    return (
      <Animated.View style={combinedStyle} {...rest}>
        {children}
      </Animated.View>
    )
  }
}
