import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './Styles/ContactListCellStyle'
import { Colors, Images } from '../Themes'
// import { BlurView } from 'react-native-blur'
import LinearGradient from 'react-native-linear-gradient'

export default class ContactListCell extends PureComponent {
  // // Prop type warnings
  static propTypes = {
    contact: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
    onContactPressed: PropTypes.func.isRequired
  }
  // Defaults for props
  static defaultProps = {
    contact: {
      familyName: '',
      givenName: ''
    }
  }

  render () {
    const { contact, onPress, onLongPress, onContactPressed, plusDisabled } = this.props
    return (
      <TouchableOpacity onPress={onContactPressed}>
        <View style={[styles.container, {paddingHorizontal: 16}]}>
          <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
            <Text numberOfLines={1} style={styles.text}>{getContactName(contact)}</Text>
            <TouchableOpacity disabled={contact.cantAdd} onLongPress={onLongPress} onPress={onPress}>
              <View height={40} style={{width: 44, alignItems: 'center', justifyContent: 'center', flex: 1}}>
                {!plusDisabled ? (!contact.cantAdd ? <Image source={Images.contactHeartIcon} /> : <Image source={Images.contactHeartFilledIcon} />) : null}
              </View>
            </TouchableOpacity>
          </View>
          <View style={{width: '100%', height: 0.5, marginTop: 5, backgroundColor: 'rgba(231, 109, 63, 0.3)'}} />
        </View>
      </TouchableOpacity>
    )
  }
}

export class ContactSectionHeader extends PureComponent {
  render () {
    // inline styles used for brevity, use a stylesheet when possible
    if (this.props.blur) {
      return (
        <View style={[styles.sectionHeaderContainer, {backgroundColor: 'transparent'}]}>
          <Text style={styles.sectionHeaderText}>{this.props.title}</Text>
        </View>
      )
    } else {
      return (
        <LinearGradient colors={Colors.sectionHeader} style={[styles.sectionHeaderContainer, {marginRight: 30}]}>
          <Text style={styles.sectionHeaderText}>{this.props.title}</Text>
        </LinearGradient>
      )
    }
  }
}

export const getContactName = (contact) => {
  let name = `${contact.givenName} ${contact.familyName}`.trim()
  if (name.length > 0) {
    return name
  } else if (contact.company.length > 0) {
    return contact.company
  }
  return name
}
