import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, Image, TouchableOpacity, TouchableHighlight, View } from 'react-native'
import styles from './Styles/HomeContactCellStyle'
import moment from 'moment-timezone'
import LinearGradient from 'react-native-linear-gradient'
import { Colors, Images } from '../Themes'
import Contacts from 'react-native-contacts'
import { Avatar } from 'react-native-elements'
import { getInitialsFromName } from '../Lib/Helpers'
import { RadialGradient } from 'react-native-gradients'
import Swipeable from 'react-native-swipeable'
import {AvatarGradientHorizontal} from '../Components/AvatarGradient'
// const colorList = [
//   {offset: '0%', color: '#FFCE66', opacity: '1'},
//   {offset: '100%', color: 'white', opacity: '0'}
// ]

export default class HomeContactCell extends Component {
  // Prop type warnings
  static propTypes = {
    contact: PropTypes.object,
    date: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    onDeletePress: PropTypes.func,
    onDetailsPress: PropTypes.func,
    isAddButton: PropTypes.bool
  }

  // Defaults for props
  static defaultProps = {
    onDeletePress: () => {},
    onDetailsPress: () => {}
  }

  constructor (props) {
    super(props)
    this.state = {
      photo: null,
      showDetails: false
    }
  }

  componentDidMount () {
    if (this.props.contact && this.props.contact.recordID) {
      Contacts.getPhotoForId(this.props.contact.recordID, (err, photo) => {
        if (!err) {
          this.setState({
            photo: photo
          })
        }
      })
    }
  }

  onRightPan = () => {
    this.setState({
      showDetails: true
    })
  }

  stopRightPan = () => {
    this.setState({
      showDetails: false
    })
  }

  render () {
    const { contact, date, isAddButton } = this.props
    let index = (contact.id || 0) % 12
    let dt = moment(date)
    console.log('DT', dt)

    const rightButtons = [
      <TouchableOpacity onPress={() => this.props.onDeletePress(contact)} style={styles.deleteButton}><Text style={styles.deleteText}>Delete</Text></TouchableOpacity>
    ]

    const RadialComponent = (props) => (
      <RadialGradient
        colorList={[
          {offset: '0%', color: Colors.contacts[index].gradient[0], opacity: '1'},
          {offset: '100%', color: Colors.contacts[index].gradient[1], opacity: '1'}
        ]}
        height={60}
        style={{borderRadius: 30, backgroundColor: 'red'}}>
        {props.children}
      </RadialGradient>
    )

    if (!isAddButton) {
      let fullName = `${contact.givenName} ${contact.familyName}`.trim()
      let initials = getInitialsFromName(fullName)
      let source
      if (this.state.photo) {
        source = {uri: this.state.photo || ''}
      }
      // onPress={() => this.props.onPress(contact)}
      return (
        <View>
          <View style={styles.container}>
            <View style={styles.borderBg} />
            <Swipeable stopRightPan={this.stopRightPan} rightActionActivationDistance={220} onRightButtonsOpenRelease={this.props.onOpen} onRightButtonsCloseRelease={this.props.onClose} onRightActionRelease={() => this.props.onDeletePress(contact)} rightButtons={rightButtons} style={styles.swipableBackground} onRightButtonsActivate={this.onRightPan} onRightButtonsDeactivate={this.stopRightPan}>
              <TouchableHighlight underlayColor='white' onPress={() => this.props.onPress(contact)}>
                <LinearGradient locations={[0, 0.5]} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={Colors.contacts[index].gradient} style={styles.innerContainer}>
                  {/* <RadialGradient x='50%' y='50%' rx='50%' ry='50%' colorList={colorList}> */}
                  <TouchableOpacity onPress={() => this.props.onDetailsPress(contact)}>
                    <Avatar
                      overlayContainerStyle={{backgroundColor: 'transparent'}}
                      Component={AvatarGradientHorizontal}
                      name={initials}
                      colorList={[
                        {offset: '0%', color: Colors.contacts[index].gradient[0], opacity: '1'},
                        {offset: '100%', color: Colors.contacts[index].gradient[1], opacity: '1'}
                      ]}
                      titleInternalStyle={[styles.avatarTextStyle, {color: Colors.contacts[index].date}]}
                      // titleStyle={[styles.avatarTextStyle, {color: Colors.contacts[index].date}]}
                      rounded
                      activeOpacity={1}
                      height={60}
                      title={initials}
                      componentStyle={{borderRadius: 30}}
                      // containerStyle={styles.image}
                      source={source} />
                  </TouchableOpacity>
                  {/* </RadialGradient> */}
                  <Text numberOfLines={1} style={[styles.contactName, {color: Colors.contacts[index].title}]}>{fullName}</Text>
                  <View style={[styles.dateContainer, {backgroundColor: Colors.contacts[index].date}]}>
                    {this.state.showDetails ? <TouchableOpacity onPress={() => this.props.onDetailsPress(contact)} style={styles.detailsText}><Text style={styles.dateSmall}>Details</Text></TouchableOpacity> : <View>
                      <Text style={styles.dateSmall}>{date ? moment(date).format('MMM').toUpperCase() : ''}</Text>
                      <Text style={styles.dateLarge}>{date ? moment(date).format('DD').toUpperCase() : ''}</Text>
                    </View>}
                  </View>
                </LinearGradient>
              </TouchableHighlight>
            </Swipeable>
          </View>
        </View>
      )
    } else {
      return (
        <TouchableOpacity onPress={this.props.onPress}>
          <LinearGradient locations={[0, 0.5, 1]} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={Colors.buttonGradient} style={styles.addContainer}>
            <View style={styles.imageContainer}>
              <Image style={styles.addImage} source={Images.plusIcon.large} resizeMode='contain' />
            </View>
            <Text style={styles.addText}>Add</Text>
            <View style={styles.imageContainer} />
          </LinearGradient>
        </TouchableOpacity>
      )
    }
  }
}
