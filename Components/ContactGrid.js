import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native'
import styles from './Styles/ContactGridStyle'
import { Images, Colors } from '../Themes'
import { getContactName } from './ContactListCell'
import { connect } from 'react-redux'
import ContactActions from '../Redux/ContactsRedux'
import Contacts from 'react-native-contacts'
import { Avatar } from 'react-native-elements'
import { getInitialsFromName } from '../Lib/Helpers'
import AvatarGradient from '../Components/AvatarGradient'
import _ from 'lodash'

const appWidth = Dimensions.get('window').width
const cellWidth = (appWidth - (42 * 2) - (20 * 2)) / 3

export default class ContactGrid extends Component {
  constructor (props) {
    super(props)
    this.state = {
      deleteMode: false,
      selectedItems: []
    }
  }

  // Prop type warnings
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onContactPress: PropTypes.func.isRequired,
    selectedContacts: PropTypes.array
  }

  // Defaults for props
  static defaultProps = {
    contacts: []
  }

  toggleDeleteMode = () => {
    this.setState({deleteMode: !this.state.deleteMode})
  }

  renderItem ({item, index}) {
    if (this.props.selectedContacts) {
      let selectedIndex = this.props.selectedContacts.indexOf(item)
      if (item.id === 'me') {
        this.props.selectedContacts.forEach((ct, loopIndex) => {
          if (ct.id === 'me') {
            selectedIndex = loopIndex
          }
        })
      }
      if (selectedIndex === -1) {
        return <ContactGridCellRedux onRemoveContact={this.props.onRemoveContact} onContactPress={(contact) => this.props.onContactPress(contact)} toggleDeleteMode={this.toggleDeleteMode.bind(this)} deleteMode={this.state.deleteMode} contact={item} />
      } else {
        return <ContactGridCellRedux selected onRemoveContact={this.props.onRemoveContact} onContactPress={(contact) => this.props.onContactPress(contact)} toggleDeleteMode={this.toggleDeleteMode.bind(this)} deleteMode={this.state.deleteMode} contact={item} />
      }
    } else {
      return <ContactGridCellRedux onRemoveContact={this.props.onRemoveContact} onContactPress={(contact) => this.props.onContactPress(contact)} toggleDeleteMode={this.toggleDeleteMode.bind(this)} deleteMode={this.state.deleteMode} contact={item} />
    }
  }

  keyExtractor (item) {
    return item.recordID
  }

  render () {
    return (
      <View style={styles.listContainer}>
        <FlatList
          numColumns={3}
          keyExtractor={this.keyExtractor}
          extraData={this.props.refresh}
          deleteMode={this.state.deleteMode}
          contentContainerStyle={styles.list}
          data={_.uniqBy(this.props.contacts, 'recordID')}
          renderItem={this.renderItem.bind(this)} />
      </View>)
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeContact: (contact) => dispatch(ContactActions.contactsRemove(contact))
  }
}
export class ContactGridCell extends Component {
  // Prop type warnings
  static propTypes = {
    contact: PropTypes.object.isRequired
  }

  // Defaults for props
  static defaultProps = {
    contact: {}
  }

  constructor (props) {
    super(props)
    this.state = {
      photo: null
    }
  }

  componentDidMount () {
    this.refreshContactPhoto()
  }

  refreshContactPhoto () {
    if (this.props.contact) {
      Contacts.getPhotoForId(this.props.contact.recordID, (err, photo) => {
        if (!err) {
          this.setState({
            photo: photo
          })
        }
      })
    }
  }

  remove () {
    this.props.removeContact(this.props.contact)
    this.props.onRemoveContact(this.props.contact.recordID)
  }

  render () {
    let contact = this.props.contact
    let selected = this.props.selected
    let fullName = `${contact.givenName} ${contact.familyName}`.trim()
    let initials = getInitialsFromName(fullName)
    if (this.props.contact.id === 'me') {
      initials = 'ME'
    }
    let source
    if (this.state.photo) {
      source = {uri: this.state.photo || ''}
    }
    let index = (contact.id || 0) % 12
    let extraStyle = {}
    if (selected) {
      extraStyle.opacity = 0.2
    }
    return (
      <TouchableOpacity onPress={() => this.props.onContactPress(this.props.contact)} onLongPress={() => this.props.toggleDeleteMode()}>
        <View style={[styles.container, extraStyle]}>
          <TouchableOpacity onPress={() => this.remove()} style={{zIndex: 999}}>
            {this.props.deleteMode ? <Image style={styles.xIcon} source={Images.xIcon} /> : null}
          </TouchableOpacity>
          <View style={[styles.gridCellContainer, {borderColor: (contact.id !== 'me') ? Colors.contacts[index].date : Colors.me.date}]}>
            <Avatar
              overlayContainerStyle={{backgroundColor: 'transparent', borderRadius: cellWidth / 2}}
              Component={AvatarGradient}
              style={{justifyContent: 'center'}}
              colorList={[
                {offset: '0%', color: (contact.id !== 'me') ? Colors.contacts[index].gradient[1] : Colors.me.gradient[1], opacity: '1'},
                {offset: '100%', color: (contact.id !== 'me') ? Colors.contacts[index].gradient[0] : Colors.me.gradient[0], opacity: '1'}
              ]}
              titleInternalStyle={[styles.avatarTextStyle, {color: (contact.id !== 'me') ? Colors.contacts[index].date : Colors.me.date}]}
              rounded
              height={cellWidth}
              title={initials}
              name={initials}
              containerStyle={styles.image}
              source={source} />
            {/* <Image style={styles.gridCellImage} source={{uri: this.state.photo || ''}} /> */}
          </View>
          <Text numberOfLines={1} style={styles.gridCellText}>{getContactName(this.props.contact)}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const ContactGridCellRedux = connect(mapStateToProps, mapDispatchToProps)(ContactGridCell)
