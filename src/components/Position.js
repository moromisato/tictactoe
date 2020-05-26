import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const height = Dimensions.get('screen').height

export default function Position({value, onClick}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
        <Text style={styles.marker}>{value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container:{
        width: height * 0.15,
        height: height * 0.15,
        margin: 10,
        borderRadius: height * 0.01,
        backgroundColor: '#1564be',
        justifyContent: 'center',
        alignItems: 'center',
    },
    marker:{
      fontSize: height * 0.1,
      fontWeight: 'bold',
      color: '#f8bbd0'
    }
})