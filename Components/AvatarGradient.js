import React, {Component} from 'react'
import { RadialGradient } from 'react-native-gradients'
import { Text, View } from 'react-native'

class AvatarGradient extends Component {
  render () {
    const { colorList, titleInternalStyle, name } = this.props
    console.log(this.props)
    return (
      <RadialGradient colorList={colorList} style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={{width: '100%', height: '100%', position: 'absolute', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={[titleInternalStyle, {width: '100%', textAlign: 'center'}]}>{name}</Text>
        </View>
      </RadialGradient>
    )
  }
}

export class AvatarGradientHorizontal extends Component {
  render () {
    const { colorList, titleInternalStyle, name } = this.props
    return (
      <View style={{width: 60, height: 60, marginLeft: 21, backgroundColor: 'white', borderRadius: 30}}>
        <RadialGradient colorList={colorList} cStyle={{justifyContent: 'center', alignItems: 'center', width: 60, height: 60}}>
          <Text style={[titleInternalStyle, {position: 'absolute', width: 60, height: 60, textAlign: 'center', alignSelf: 'center', paddingTop: 12}]}>{name}</Text>
        </RadialGradient>
      </View>
    )
  }
}
export default AvatarGradient
