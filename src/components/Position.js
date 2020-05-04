import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// import { Container } from './styles';

export default function Position({value, onClick}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
        <Text style={styles.marker}>{value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container:{
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 5,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    marker:{
      fontSize: 40,
    }
})