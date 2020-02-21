import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Image, Text, FlatList, Dimensions } from 'react-native'
import styles from './Styles/MessagePopupStyle'
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog'
import { BlurView } from 'react-native-blur'
import { Images, Colors } from '../Themes'
import { Pages } from 'react-native-pages'
import _, { sampleSize, sample, replace, uniqBy, filter, find, take } from 'lodash'

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom'
})

const SAMPLE_SIZE = 3

export default class MessagePopup extends Component {
  constructor (props) {
    super(props)
    let order = sampleSize([0, 1, 2], SAMPLE_SIZE)
    this.state = {
      refreshNumber: 0,
      order: order,
      messages: [[], [], []],
      currentSample: props.greetings
    }
  }

  // Prop type warnings
  static propTypes = {
    show: PropTypes.bool,
    messages: PropTypes.array
  }

  // Defaults for props
  static defaultProps = {
    messages: []
  }

  _keyExtractor = (item, index) => {
    return index
  }

  renderItem ({item, index}) {
    if (index === 0) {
      let customMessage = {
        greeting: 'Customize Your Message 📝'
      }
      return <MessageBox message={customMessage} onPress={() => this.props.onMessageSelect({greeting: `Hi ${this.props.name}`}, this.props.phone, this.props.contactId)} />
    } else {
      return <MessageBox message={item} onPress={() => this.props.onMessageSelect(item, this.props.phone, this.props.contactId)} />
    }
  }

  updateRefreshNumber = () => {
    this.setState({
      refreshNumber: this.state.refreshNumber + 1
    })
    this.reloadMessages()
  }

  reloadMessages = () => {
    const { name, greetings } = this.props
    let cSample = this.state.currentSample
    let messages = [[], [], []]
    let updatedSample = [[], [], []]
    cSample.forEach((sampleArray, index) => {
      let greetingArray = sampleArray
      if (greetingArray.length < SAMPLE_SIZE) {
        greetingArray = greetings[index]
      }
      let randomGreetings = sampleSize(greetingArray, greetingArray.length)
      let uniqueGreetings = uniqBy(randomGreetings, 'categoryId')

      let greetingString = []

      if (uniqueGreetings.length === 3) {
        greetingString = sampleSize(uniqueGreetings, 3)
      } else if (uniqueGreetings.length === 2) {
        let nonChosen = filter(randomGreetings, (g) => {
          return uniqueGreetings[0].id !== g.id && uniqueGreetings[1].id !== g.id
        })
        uniqueGreetings.push(sample(nonChosen))
        greetingString = uniqueGreetings
        updatedSample[index] = []
      } else if (uniqueGreetings.length === 1) {
        let nonChosen = filter(randomGreetings, (g) => {
          return uniqueGreetings[0].id !== g.id && uniqueGreetings[1].id !== g.id
        })
        let randomChosen = sampleSize(nonChosen, nonChosen.length)
        uniqueGreetings.push(randomChosen[0])
        uniqueGreetings.push(randomChosen[1])
        greetingString = uniqueGreetings
        updatedSample[index] = []
      } else if (uniqueGreetings.length === 0) {
        greetingString = sampleSize(randomGreetings, 3)
        updatedSample[index] = []
      } else {
        greetingString = take(uniqueGreetings, 3)
        updatedSample[index] = uniqueGreetings
      }

      greetingString.forEach((greet) => {
        let newGreetingText = replace(greet.greeting, '__NAME__', name)
        let greetingCopy = JSON.parse(JSON.stringify(greet))
        greetingCopy.greeting = newGreetingText
        messages[index].push(greetingCopy)
      })
    })
    this.setState({
      messages: messages,
      currentSample: updatedSample
    })
  }

  render () {
    const { show, name, activeCategories, notes } = this.props
    const { messages } = this.state
    var self = this

    let page1Active = activeCategories && activeCategories.indexOf(0) !== -1
    let page2Active = activeCategories && activeCategories.indexOf(1) !== -1
    let page3Active = activeCategories && activeCategories.indexOf(2) !== -1

    if (!page1Active && !page2Active && !page3Active) {
      page1Active = true
      page2Active = true
      page3Active = true
    }

    let page1 = (<View key={0} style={styles.page}>
      <Text style={styles.pageTitle}>All is Well</Text>
      <Text style={styles.pageMessage}>Select a message and check in with {name || ''}</Text>
      {notes ? <Text style={styles.pageMessage}>{notes}</Text> : null}
      <FlatList
        style={styles.flatList}
        keyExtractor={this._keyExtractor}
        data={_.concat(0, messages[0])}
        renderItem={this.renderItem.bind(this)} />
      <RefreshButton onPress={this.updateRefreshNumber.bind(this)} />
    </View>)

    let page2 = (<View key={1} style={styles.page}>
      <Text style={styles.pageTitle}>Chit Chats</Text>
      <Text style={styles.pageMessage}>Select a message and chat with {name || ''}</Text>
      {notes ? <Text style={styles.pageMessage}>{notes}</Text> : null}
      <FlatList
        style={styles.flatList}
        keyExtractor={this._keyExtractor}
        data={_.concat(0, messages[1])}
        renderItem={this.renderItem.bind(this)} />
      <RefreshButton onPress={this.updateRefreshNumber.bind(this)} />
    </View>)

    let page3 = (<View key={2} style={styles.page}>
      <Text style={styles.pageTitle}>Greetings and Care</Text>
      <Text style={styles.pageMessage}>Select a message and greet {name || ''}</Text>
      {notes ? <Text style={styles.pageMessage}>{notes}</Text> : null}
      <FlatList
        style={styles.flatList}
        keyExtractor={this._keyExtractor}
        data={_.concat(0, messages[2])}
        renderItem={this.renderItem.bind(this)} />
      <RefreshButton onPress={this.updateRefreshNumber.bind(this)} />
    </View>)

    let pages = []
    if (page1Active) {
      pages.push(page1)
    }

    if (page2Active) {
      pages.push(page2)
    }

    if (page3Active) {
      pages.push(page3)
    }
    // pages = sampleSize(pages, pages.length)
    let tempPages = []
    this.state.order.forEach((order) => {
      if (pages[order]) {
        tempPages.push(pages[order])
      }
    })
    pages = tempPages

    return (
      <PopupDialog
        onShown={() => {
          this.state = {
            currentSample: self.props.greetings
          }
          this.reloadMessages()
        }}
        overlayOpacity={0}
        show={show}
        height={'65%'}
        containerStyle={[styles.popupContainer]}
        dialogStyle={[styles.popupDialog]}
        dialogAnimation={slideAnimation}
        ref={(popupDialog) => { this.internalPopup = popupDialog }}>
        <BlurView blurType='light' blurAmount={100} style={styles.popupInternal}>
          <TouchableOpacity onPress={() => this.props.dismiss()} style={{flexDirection: 'row', justifyContent: 'flex-end', width: 55, alignSelf: 'flex-end', paddingTop: 10, paddingBottom: 20, zIndex: 99}}>
            <View><View style={{width: 44, paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-end', zIndex: 99}}><Image style={styles.closeButton} source={Images.stopIcon} /></View></View>
          </TouchableOpacity>
          <View style={styles.popupTextContainer}>
            <View pointerEvents='box-none' style={{height: '100%', width: '100%', marginTop: -5}}>
              <Pages indicatorColor={Colors.dustyOrange} indicatorPosition='top'>
                {pages}
              </Pages>
            </View>
          </View>
        </BlurView>
      </PopupDialog>
    )
  }
}

class MessageBox extends Component {
  render () {
    let message = this.props.message
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.messageBoxContainer}>
          {message.image ? <Image style={styles.messageBoxImage} source={{uri: message.image}} resizeMode='contain' /> : null}
          <Text style={styles.messageBoxText}>{message.greeting}</Text>
        </View>
        <Image style={styles.messageTail} source={Images.messageTail} />
      </TouchableOpacity>
    )
  }
}

const RefreshButton = ({onPress}) => (
  <View style={styles.refreshButton}>
    <TouchableOpacity onPress={onPress}>
      <Image source={Images.refreshIcon} />
    </TouchableOpacity>
  </View>
)
