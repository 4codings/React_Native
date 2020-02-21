import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Image, Alert, Dimensions, ScrollView } from 'react-native'
import styles from './Styles/CalendarPopupStyle'
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog'
import { BlurView } from 'react-native-blur'
import { Images, Colors, Fonts } from '../Themes'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import moment from 'moment'
import { getContactName } from './ContactListCell'
import CalendarTimeSelector from '../Components/CalenderTimeSelector'

const AppWidth = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height
}

LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']
}
LocaleConfig.defaultLocale = 'en'

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom'
})

export default class CalendarPopup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: moment().add(1, 'day').startOf().format('YYYY-MM-DD'),
      page: 0
    }
  }
  // Prop type warnings
  static propTypes = {
    show: PropTypes.bool,
    contact: PropTypes.object
  }

  // Defaults for props
  static defaultProps = {
  }

  handleSave = () => {
    let dateTime = this.state.date + ' ' + this.caledarTime.getTime()
    let notes = this.caledarTime.getNotes()
    if (this.props.contact.phoneNumbers.length > 0) {
      this.props.onCalendarSave({
        categories: [0, 1, 2],
        frequency: -1,
        unit: '',
        notes,
        phone: this.props.contact.phoneNumbers[0].number,
        contactId: this.props.contact.recordID,
        name: getContactName(this.props.contact)
      }, dateTime)
    } else {
      Alert.alert('Error', 'This contact does not have a phone number')
    }
  }

  onDayPress = (day) => {
    this.setState({
      time: null,
      date: day.dateString
    })
  }

  nextPage = () => {
    this.setState({
      page: 1
    })
  }

  onShown = () => {
    if (this.props.contact && this.props.contact.date) {
      this.setState({
        date: moment(this.props.contact.date).format('YYYY-MM-DD'),
        page: 0
      })
    } else {
      this.setState({
        date: moment().add(1, 'day').startOf().format('YYYY-MM-DD'),
        page: 0
      })
    }
  }

  render () {
    const { show } = this.props
    let currentDateProps = {}
    if (this.state.date) {
      currentDateProps[this.state.date] = {
        selected: true,
        selectedColor: Colors.reddishOrange,
        customStyles: {
          container: {
            backgroundColor: Colors.reddishOrange,
            shadowColor: 'rgba(0, 0, 0, 0.25)',
            shadowOffset: {
              width: 0,
              height: 8
            },
            shadowRadius: 8,
            shadowOpacity: 1
          },
          text: {
            color: 'white',
            fontWeight: 'bold',
            lineHeight: 20
          }
        }
      }
    } else {
      currentDateProps[moment(new Date()).format('YYYY-MM-DD')] = {marked: false, selected: true, selectedColor: Colors.reddishOrange}
    }
    return (
      <PopupDialog
        overlayOpacity={0}
        onShown={this.onShown.bind(this)}
        show={show}
        height='90%'
        containerStyle={[styles.popupContainer]}
        dialogStyle={[styles.popupDialog]}
        dialogAnimation={slideAnimation}
        ref={(popupDialog) => { this.internalPopup = popupDialog }}>
        <BlurView blurType='light' blurAmount={100} style={styles.popupInternal}>
          <TouchableOpacity onPress={() => this.props.dismiss()} style={{flexDirection: 'row', justifyContent: 'flex-end', width: 55, zIndex: 9999, alignSelf: 'flex-end', paddingBottom: 20}}>
            <View style={{width: 44, paddingTop: 10, paddingRight: 10, justifyContent: 'flex-start', alignItems: 'flex-end'}}><Image style={styles.closeButton} source={Images.stopIcon} /></View>
          </TouchableOpacity>
          <View style={styles.popupTextContainer}>
            <ScrollView style={{width: AppWidth.width}}>
              <View style={styles.calendarContainer}>
                {this.state.page === 0 ? <Calendar
                  markedDates={{
                    ...currentDateProps
                  }}
                  style={{
                    backgroundColor: 'white',
                    marginBottom: 15
                  }}
                  markingType={'custom'}
                  theme={{
                    'stylesheet.calendar.header': {
                      dayHeader: {
                        marginTop: 2,
                        marginBottom: 7,
                        width: 32,
                        textAlign: 'center',
                        fontSize: 13,
                        fontFamily: Fonts.type.base,
                        color: '#F59073'
                      },
                      monthText: {
                        fontSize: 16,
                        fontFamily: Fonts.type.base,
                        fontWeight: '200',
                        color: '#F05223',
                        margin: 10
                      }
                    },
                    arrowColor: '#F59073',
                    backgroundColor: 'transparent',
                    calendarBackground: 'transparent',
                    textSectionTitleColor: Colors.blueyGrey,
                    textDayFontFamily: Fonts.type.base,
                    textMonthFontFamily: Fonts.type.base,
                    textDayHeaderFontFamily: Fonts.type.base,
                    dayTextColor: Colors.reddishOrange,
                    todayTextColor: Colors.reddishOrange,
                    textMonthFontWeight: '200',
                    textDayFontWeight: '200'
                  }}
                  current={this.state.date ? this.state.date : moment().add(1, 'day').startOf('day').toDate()}
                  minDate={moment().add(1, 'day').startOf('day').toDate()}
                  maxDate={moment(new Date()).add(1, 'year').toDate()}
                  onDayPress={this.onDayPress.bind(this)}
                  firstDay={0} /> : <CalendarTimeSelector contact={this.props.contact} ref={(r) => { this.caledarTime = r }} />}
                <View style={styles.saveButtonContainer}>
                  {this.state.page === 0 ? <TouchableOpacity onPress={this.nextPage}>
                    <Image style={styles.saveButton} source={Images.calendarNextButton} />
                  </TouchableOpacity> : <TouchableOpacity onPress={this.handleSave.bind(this)}>
                    <Image style={styles.saveButton} source={Images.frequencySaveButton} />
                  </TouchableOpacity>}
                </View>
              </View>
            </ScrollView>
          </View>
        </BlurView>
      </PopupDialog>
    )
  }
}
