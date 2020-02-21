import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Alert, Image, TouchableOpacity, Dimensions, Keyboard } from 'react-native'
import styles from './Styles/FrequencyPopupStyle'
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog'
import {Checkbox} from 'teaset'
import { Images } from '../Themes'
import _ from 'lodash'
import { BlurView } from 'react-native-blur'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import { Input } from 'react-native-elements'
const screenHeight = Dimensions.get('window').height
const isIphoneSE = (screenHeight < 570)

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom'
})

const numberValues = {
  Week: ['1', '2', '3', '4', '5', '6'],
  Month: ['1', '2', '3', '4', '5', '6'],
  Year: ['1', '2', '3', '4', '5', '6']
}
const unitOfMeasurement = ['Week', 'Month', 'Year']
export default class FrequencyPopup extends Component {
  // // Prop type warnings
  constructor (props) {
    super(props)
    this.state = {
      numberOfTimes: 1,
      unit: 'month',
      selectedGroup: 'family',
      timeIndex: 0,
      dayIndex: 0,
      selectedIndex: 0,
      selectedCategories: [0, 1, 2],
      customName: ''
    }
  }
  static propTypes = {
    show: PropTypes.bool,
    categoryChanged: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired
  }

  // Defaults for props
  static defaultProps = {
    title: '',
    description: '',
    categories: [0, 1, 2]
  }
  clearCategory = () => {

  }

  addCategory = (categoryId) => {
    let foundId = this.state.selectedCategories.indexOf(categoryId)
    let selectedCategories = this.state.selectedCategories || []
    if (this.state.selectedCategories.asMutable) {
      selectedCategories = this.state.selectedCategories.asMutable()
    }
    if (foundId !== -1) {
      selectedCategories.splice(foundId, 1)
      this.setState({
        selectedCategories: selectedCategories
      })
    } else {
      let categories = _.concat([categoryId], selectedCategories)
      this.setState({
        selectedCategories: categories
      })
    }
  }

  clearSelectedCategories () {
    this.setState({
      selectedCategories: []
    })
  }

  isCategorySelected = (categoryId) => {
    if (this.state.selectedCategories.indexOf(parseInt(categoryId)) !== -1) {
      return true
    }
    if (this.state.selectedCategories.indexOf(categoryId.toString()) !== -1) {
      return true
    }
    return false
  }

  handleSave = () => {
    let name = this.props.contactName
    if (this.state.customName && this.state.customName.length > 0) {
      name = this.state.customName
    }
    if (this.state.selectedCategories.length > 0) {
      if (this.props.contact.phoneNumbers.length > 0) {
        this.props.setFrequency({
          categories: this.state.selectedCategories,
          unit: this.state.unit.toLowerCase(),
          phone: this.props.contact.phoneNumbers[0].number,
          contactId: this.props.contact.recordID,
          frequency: this.state.numberOfTimes,
          name: name
        })
      } else {
        Alert.alert('Error', `This contact doesn't have a phone number.`)
      }
    } else {
      Alert.alert('Please select a category')
    }
  }

  setNumberOfTimes (times) {
    this.setState({
      timeIndex: times - 1,
      numberOfTimes: times
    })
  }

  setCategories (categories) {
    if (categories.asMutable) {
      let cats = categories.asMutable()
      let selectedCats = []
      cats.forEach((c) => {
        selectedCats.push(parseInt(c))
      })
      this.setState({
        selectedCategories: selectedCats
      })
    } else {
      this.setState({
        selectedCategories: categories
      })
    }
  }

  setUnit (unit) {
    this.setState({
      dayIndex: unitOfMeasurement.indexOf(_.startCase(unit)),
      unit: _.startCase(unit)
    })
  }

  changeName = (text) => {
    console.log(text)
    this.setState({
      customName: text
    })
  }

  pencilPress = () => {
    this.input.focus()
  }

  render () {
    const { show, contactName } = this.props
    let selectedCats
    if (this.state.selectedCategories.asMutable) {
      let rawCats = this.state.selectedCategories.asMutable()
      selectedCats = []
      rawCats.forEach((cat) => {
        selectedCats.push(parseInt(cat))
      })
    } else {
      selectedCats = this.state.selectedCategories
    }
    return (
      <PopupDialog
        overlayOpacity={0}
        show={show}
        height={isIphoneSE ? '92%' : '80%'}
        containerStyle={[styles.popupContainer]}
        dialogStyle={[styles.popupDialog]}
        dialogAnimation={slideAnimation}
        ref={(popupDialog) => { this.internalPopup = popupDialog }}>
        <BlurView blurType='light' blurAmount={100} style={styles.popupInternal}>
          <TouchableOpacity activeOpacity={1} onPress={() => { Keyboard.dismiss() }}>
            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 10, zIndex: 99, width: 50, alignSelf: 'flex-end', height: 30}} onPress={() => this.props.dismiss()}>
              <View style={{width: 44, paddingRight: 30, justifyContent: 'flex-start', alignItems: 'flex-end'}}><Image style={styles.closeButton} source={Images.stopIcon} /></View>
            </TouchableOpacity>
            <View activeOpacity={1} onPress={() => { Keyboard.dismiss() }} style={[styles.popupTextContainer]}>
              <Text style={styles.popupText}>Schedule your reminder for</Text>
              <Input ref={(input) => { this.input = input }} onChangeText={(text) => { this.changeName(text) }} autoComplete='name' style={{width: 200}} rightIcon={<TouchableOpacity onPress={this.pencilPress}><Image source={Images.pencilIcon} /></TouchableOpacity>} containerStyle={{width: 180}} rightIconContainerStyle={styles.iconStyle} inputStyle={styles.inputTextStyle} inputContainerStyle={styles.inputContainerStyle} defaultValue={contactName} />
              <View style={{marginTop: 20}}>
                <SegmentedControlTab
                  tabsContainerStyle={styles.tabsContainerStyle}
                  tabStyle={styles.tabStyle}
                  tabTextStyle={styles.tabTextStyle}
                  activeTabStyle={styles.activeTabStyle}
                  // activeTabTextStyle={styles.activeTabTextStyle}
                  selectedIndex={this.state.timeIndex}
                  values={numberValues[this.state.unit]}
                  onTabPress={index => {
                    this.setState({numberOfTimes: numberValues[this.state.unit][parseInt(index)], timeIndex: index})
                  }}
                  />
                <Text style={styles.timeFor}>Time(s) Per</Text>
                <SegmentedControlTab
                  tabsContainerStyle={styles.tabsContainerStyle}
                  tabStyle={styles.tabStyle}
                  tabTextStyle={styles.tabTextStyle}
                  activeTabStyle={styles.activeTabStyle}
                  // activeTabTextStyle={styles.activeTabTextStyle}
                  selectedIndex={this.state.dayIndex}
                  values={unitOfMeasurement}
                  onTabPress={index => {
                    this.setState({unit: unitOfMeasurement[index], dayIndex: index})
                  }}
                  />
              </View>
              <Text style={styles.messageModes}>Message Modes</Text>
            </View>
            <View style={styles.optionContainer}>
              <PopupOption cats={selectedCats} addCategory={this.addCategory.bind(this)} isCategorySelected={this.isCategorySelected.bind(this)} icon={Images.frequencyImages.one} title='All is Well' subTitle={'Check in with your loved one'} id={0} />
              <PopupOption cats={selectedCats} addCategory={this.addCategory.bind(this)} isCategorySelected={this.isCategorySelected.bind(this)} icon={Images.frequencyImages.two} title='Chit Chats' subTitle='' id={1} />
              <PopupOption cats={selectedCats} addCategory={this.addCategory.bind(this)} isCategorySelected={this.isCategorySelected.bind(this)} icon={Images.frequencyImages.three} title={'Greetings & Care'} subTitle='' id={2} />
            </View>
            <View style={styles.saveButtonContainer}>
              <TouchableOpacity onPress={this.handleSave.bind(this)}>
                <Image style={styles.saveButton} source={Images.frequencySaveButton} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </BlurView>
      </PopupDialog>
    )
  }
}

class PopupOption extends Component {
  render () {
    let checked = this.props.isCategorySelected(this.props.id)
    if (!checked) {
      checked = false
    }
    return (
      <View style={styles.optionBox}>
        <Image style={styles.optionBoxImage} source={this.props.icon} />
        <View style={styles.optionBoxTitleContainer}>
          <Text style={styles.optionBoxTitle}>{this.props.title}</Text>
          {(this.props.subTitle && this.props.subTitle.length > 0) ? <Text style={styles.optionBoxSubTitle}>{this.props.subTitle}</Text> : null}
        </View>
        <Checkbox
          title=''
          size='lg'
          checkedIcon={Images.checkbox.on}
          checkedIconStyle={styles.optionCheckStyle}
          uncheckedIcon={Images.checkbox.off}
          uncheckedIconStyle={styles.optionUncheckStyle}
          checked={checked}
          onChange={value => this.props.addCategory(this.props.id)}
          />
      </View>
    )
  }
}
