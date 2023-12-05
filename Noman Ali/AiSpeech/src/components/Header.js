import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
const {width} = Dimensions.get('window');
const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text>Header</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    headerContainer:{
        width:width,
        height:60,
        backgroundColor:"#20319D",

    }
})

export default Header
