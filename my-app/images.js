import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'

const ImagesExample = () => (
   <Image source = {require('../my-app/assets/logo.jpeg')} style = {styles.container} / >
)

const styles = StyleSheet.create({
    container: {
      width: 200,
      height: 200,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center'
      }
      

})
export default ImagesExample