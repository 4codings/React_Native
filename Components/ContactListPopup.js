import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './Styles/ContactListPopupStyle'
import Modal from 'react-native-modal'
import { BlurView } from 'react-native-blur'
import _ from 'lodash'
// import HomeContactCell from '../Components/HomeContactCell'
import { Images, Colors, Fonts } from '../Themes'
import AlphaScrollFlatList from 'alpha-scroll-flat-list'
import ContactListCell, { getContactName, ContactSectionHeader } from '../Components/ContactListCell'
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'
import SearchBar from '../Components/SearchBar'

// import people from './people'

const ROW_HEIGHT = 45.5
const HEADER_HEIGHT = 28

export default class ContactListPopup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      search: null,
      rawContacts: [],
      contacts: setDefaultContactList(),
      showPopup: false,
      selectedContact: null,
      renderAmount: 0,
      contactListVisible: false
    }

    this.getItemLayout = sectionListGetItemLayout({
      getItemHeight: (rowData, sectionIndex, rowIndex) => {
        return ROW_HEIGHT
      },
      getSectionHeaderHeight: () => HEADER_HEIGHT // The height of your section headers
    })
  }
  // Prop type warnings
  static propTypes = {
    show: PropTypes.bool,
    onContactPress: PropTypes.func.isRequired
  }

  // Defaults for props
  static defaultProps = {
    show: false,
    onContactPress: () => {}
  }

  componentDidMount () {
  }

  onContactPress = (item) => {
    this.props.onContactPress(item)
  }

  keyExtractor (item) {
    return item.recordID
  }

  renderItem2 ({item}) {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemSubtitle}>{item.company}</Text>
      </View>
    )
  }

  renderItem = ({ item, index }) => {
    return (
      <ContactListCell onPress={() => {}} onContactPressed={() => this.onContactPress(item)} contact={item} plusDisabled />
    )
  }

  componentWillReceiveProps (newProps) {
    if (newProps.show === true && this.props.show !== true) {
      this.updateContactList()
    }
  }

  updateContactList () {
    var self = this
    this.setState({
      contacts: setDefaultContactList()
    }, () => {
      let contacts = self.props.phoneContacts
      if (self.state.search) {
        contacts = _.filter(contacts, (contact) => {
          let name = _.toLower(getContactName(contact))
          let search = _.toLower(self.state.search)
          return _.includes(name, search)
        })
      }
      let filteredContacts = _.filter(contacts, (contact) => (getContactName(contact).length > 0))
      let alphabeticalContacts = _.sortBy(filteredContacts, (contact) => {
        return getContactName(contact)
      })
      let contactList = self.state.contacts
      _.forEach(alphabeticalContacts, (contact) => {
        let section = _.take(_.upperFirst(getContactName(contact)), 1)
        let foundCountact = _.find(self.props.savedContacts, (ct) => {
          return ct.recordID === contact.recordID
        })
        if (foundCountact && foundCountact.frequency !== -1) {
          contact.cantAdd = true
        } else {
          delete contact.cantAdd
        }
        if (section.length > 0 && section[0].search(/[^A-Za-z\s]/) !== -1) {
          contactList[0].data.push(contact)
        } else {
          contactList[alphabetDictionary[section]].data.push(contact)
        }
      })
      self.setState({
        contacts: contactList
      })
    })
  }

  renderSectionHeader = (sectionData) => {
    if (!this.state.search) {
      return <ContactSectionHeader blur title={sectionData.section.title} />
    } else {
      return <View />
    }
  }

  getAlphaList = () => {
    return <View style={{marginHorizontal: 8}}>
      <AlphaScrollFlatList
        hideSideBar={this.state.search}
        style={{minHeight: 200, paddingRight: 17}}
        keyExtractor={this.keyExtractor.bind(this)}
        renderSectionHeader={this.renderSectionHeader.bind(this)}
        sections={this.state.contacts}
        renderItem={this.renderItem.bind(this)}
        activeColor={Colors.reddishOrange}
        font={Fonts.type.base}
        scrollBarColor={Colors.reddishOrange}
        scrollBarFontSizeMultiplier={0.8}
        contacts={this.props.phoneContacts}
        scrollKey={'title'}
        itemHeight={ROW_HEIGHT}
        sectionHeight={HEADER_HEIGHT}
        initialNumToRender={10}
        updateCellsBatchingPeriod={1}
        stickySectionHeadersEnabled={false}
        getItemLayout={this.getItemLayout}
        reverse={false} />
      {!this.state.search ? <View style={{backgroundColor: 'transparent', height: '100%', width: 16, position: 'absolute', right: 8, top: 0, bottom: 0, zIndex: -19}} /> : null }
    </View>
  }

  // getItemLayout = (data, index) => ({
  //   length: 50,
  //   offset: 50 * index,
  //   index
  // })

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.show === false && this.props.show) {
      this.setState({
        contactListVisible: false
      }, () => {
        _.delay(() => {
          this.setState({
            contactListVisible: true
          })
        }, 500)
      })
    }
  }

  updateSearch (term) {
    var self = this
    if (term.length === 0) {
      this.setState({
        search: null
      }, () => {
        self.updateContactList()
      })
    } else {
      this.setState({
        search: term
      }, () => {
        self.updateContactList()
      })
    }
  }

  render () {
    return (
      <Modal
        onModalShow={() => {
          this.setState({
            rawContacts: this.props.phoneContacts,
            contacts: this.props.phoneContacts,
            search: null
          }, () => {
            this.updateContactList()
          })
        }}
        backdropColor='transparent'
        onBackdropPress={() => {
          this.props.dismiss()
        }}
        onBackButtonPress={() => {
          this.props.dismiss()
        }}
        isVisible={this.props.show}>
        <BlurView blurType='light' blurAmount={100} style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: '100%'}}>
            <TouchableOpacity style={{width: 55, alignItems: 'flex-end', paddingRight: 10, paddingTop: 10, justifyContent: 'center'}} onPress={() => this.props.dismiss()}><Image style={styles.closeButton} source={Images.stopIcon} /></TouchableOpacity>
          </View>
          <View style={{marginLeft: 9, marginRight: 45, marginBottom: 4}}>
            <SearchBar onChangeText={this.updateSearch.bind(this)} />
          </View>
          <View style={{flex: 1, paddingTop: 0, paddingBottom: 10}}>
            {this.state.contactListVisible && this.props.show ? this.getAlphaList() : null}
          </View>
        </BlurView>
      </Modal>
    )
  }
}

const alphabetDictionary = {
  '#': 0,
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 10,
  K: 11,
  L: 12,
  M: 13,
  N: 14,
  O: 15,
  P: 16,
  Q: 17,
  R: 18,
  S: 19,
  T: 20,
  U: 21,
  V: 22,
  W: 23,
  X: 24,
  Y: 25,
  Z: 26
}

const setDefaultContactList = () => {
  return [
    {title: '#', data: []},
    {title: 'A', data: []},
    {title: 'B', data: []},
    {title: 'C', data: []},
    {title: 'D', data: []},
    {title: 'E', data: []},
    {title: 'F', data: []},
    {title: 'G', data: []},
    {title: 'H', data: []},
    {title: 'I', data: []},
    {title: 'J', data: []},
    {title: 'K', data: []},
    {title: 'L', data: []},
    {title: 'M', data: []},
    {title: 'N', data: []},
    {title: 'O', data: []},
    {title: 'P', data: []},
    {title: 'Q', data: []},
    {title: 'R', data: []},
    {title: 'S', data: []},
    {title: 'T', data: []},
    {title: 'U', data: []},
    {title: 'V', data: []},
    {title: 'W', data: []},
    {title: 'X', data: []},
    {title: 'Y', data: []},
    {title: 'Z', data: []}
  ]
}
