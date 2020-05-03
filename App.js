/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {

  const [ board, setBoard ] = useState(Array(9).fill(null))
  const [ player, setPlayer ] = useState(true)

  function makeMove(position){

    let boardCopy = board.slice()

    if (player){
      boardCopy[position] = 'X'
    } else {
      boardCopy[position] = 'O'
    }

    setPlayer(!player)
    setBoard(boardCopy)
  }

  useEffect(()=>{
    console.log(board)
  }, board)

  function handleClick(position) {
    makeMove(position)
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.board}>
        <Text>{board}</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center'}}>
          <TouchableOpacity style={styles.button} onPress={() => handleClick(0)}>
            <Text>{}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleClick(1)}>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleClick(2)}>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleClick(3)}>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleClick(4)}>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleClick(5)}>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleClick(6)}>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleClick(7)}>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleClick(8)}>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  board: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white'
  },
  button: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 5,
    backgroundColor: 'lightgray'
  }
});

export default App;
