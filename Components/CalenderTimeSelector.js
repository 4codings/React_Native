import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import styles from './Styles/CalenderTimeSelectorStyle'
import { Images, Colors, Fonts } from '../Themes'
import { Input } from 'react-native-elements'
import Slider from 'react-native-slider'
import moment from 'moment-timezone'
export default class CalenderTimeSelector extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  constructor (props) {
    super(props)
    this.state = {
      hourValue: 12,
      minuteValue: 30,
      notes: ''
    }
  }

  componentDidMount () {
    if (this.props.contact && this.props.contact.date) {
      let hours = moment(this.props.contact.date).format('HH')
      let minutes = moment(this.props.contact.date).format('mm')
      this.setState({
        hourValue: parseInt(hours),
        minuteValue: parseInt(minutes)
      })
    } else {
      this.setState({
        hourValue: 12,
        minuteValue: 30
      })
    }
  }

  getTime = () => {
    let minutes = parseInt(this.state.minuteValue)
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    let hours = parseInt(this.state.hourValue)
    if (hours < 10) {
      hours = `0${hours}`
    }
    return `${hours}:${minutes}`
  }

  getNotes = () => {
    return this.state.notes
  }

  onPencilPress = () => {
    this.input.focus()
  }

  render () {
    let minutes = parseInt(this.state.minuteValue)
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView keyboardVerticalOffset={100} behavior='position'>
          <Text style={{maginBottom: 24, fontFamily: Fonts.type.base, fontSize: 18, color: Colors.bloodOrange, textAlign: 'center'}}>Set reminder's time</Text>
          <Text style={{fontSize: 72, textAlign: 'center', fontFamily: 'Helvetica Neue', fontWeight: '200', color: Colors.reddishOrange}}>{`${parseInt(this.state.hourValue)}:${minutes}`}</Text>
          <Image style={{width: '100%'}} source={Images.calendarHourScale} resizeMode='contain' />
          <Slider
            minimumValue={0}
            maximumValue={23}
            style={{marginBottom: 30}}
            minimumTrackTintColor={Colors.bloodOrange}
            maximumTrackTintColor='#FCDFD7'
            trackStyle={{height: 2}}
            thumbStyle={{width: 10, height: 10, marginLeft: -5, borderColor: Colors.reddishOrange, backgroundColor: 'white', borderWidth: 2}}
            value={this.state.hourValue}
            onValueChange={value => this.setState({ hourValue: value })} />

          <Image style={{width: '100%'}} source={Images.calendarMinuteScale} resizeMode='contain' />
          <Slider
            minimumValue={0}
            maximumValue={59}
            style={{marginBottom: 30}}
            minimumTrackTintColor={Colors.bloodOrange}
            maximumTrackTintColor='#FCDFD7'
            trackStyle={{height: 2}}
            thumbStyle={{width: 10, height: 10, borderColor: Colors.reddishOrange, backgroundColor: 'white', borderWidth: 2}}
            value={this.state.minuteValue}
            onValueChange={value => this.setState({ minuteValue: value })} />
          <Input defaultValue={this.props.contact.notes} ref={(input) => { this.input = input }} maxLength={280} onChangeText={text => this.setState({ notes: text })} inputStyle={styles.inputTextStyle} inputContainerStyle={styles.inputContainerStyle} multiline placeholder='Input notes (Optional)' leftIcon={<TouchableOpacity onPress={this.onPencilPress}><Image pointerEvents='none' source={Images.pencilIcon} /></TouchableOpacity>} />
        </KeyboardAvoidingView>
      </View>
    )
  }
}
