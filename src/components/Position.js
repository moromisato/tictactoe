import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// import { Container } from './styles';

export default function Position(player) {

  const [ playerMark, setPlayerMark ] = useState('')

  function markPosition(player){
    if (player) {
      setPlayerMark('X')
    } else {
      setPlayerMark('O')
    }
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => markPosition(player)}>
        <Text>{playerMark}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container:{
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 5,
        backgroundColor: 'lightgray'
    }
})