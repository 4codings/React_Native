import React, { Component } from 'react'
export class Screen extends Component {
  constructor (props) {
    super(props)
    this.subs = [
      this.props.navigation.addListener('didFocus', (params) => this.screenDidFocus(params)),
      this.props.navigation.addListener('didBlur', (params) => this.screenDidBlur(params)),
      this.props.navigation.addListener('willBlur', (params) => this.screenWillBlur(params)),
      this.props.navigation.addListener('willFocus', (params) => this.screenWillFocus(params))
    ]
  }
  componentDidMount () {
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  componentWillUnmount () {
    if (this.subs) {
      this.subs.forEach(sub => sub.remove())
    }
  }

  screenWillFocus (payload) {
  }

  screenDidFocus (payload) {
  }

  screenDidBlur (payload) {
  }

  screenWillBlur (payload) {
  }
}
