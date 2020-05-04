/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import Position from './src/components/Position';

const App  = () => {

  let initialBoard =Array(9).fill(null)

  const [ board, setBoard ] = useState(initialBoard)
  const [ pointer, setPointer ] = useState('auto')
  const [ player, setPlayer ] = useState(true)
  const [ scoreOne, setScoreOne ] = useState(0)
  const [ scoreTwo, setScoreTwo ] = useState(0)

  function renderBoardPiece(position) {
    return(
      <Position value={board[position]} onClick={() => makeMove(position)} />
    )
  }

  function makeMove(position){

    if (board[position] === null){
      let boardCopy = board.slice()

      if (player){
        boardCopy[position] = 'X'
      } else {
        boardCopy[position] = 'O'
      }
      setPlayer(!player)
      setBoard(boardCopy)
    }

  }

  useEffect(()=>{
    
    if (checkWinner(board)){
      setPointer('none')

      if (!player) {
        setScoreOne(scoreOne + 1)
        console.warn('Jogador 1 venceu!')
      } else{
        console.warn('Jogador 2 venceu!')
        setScoreTwo(scoreTwo + 1)
      }
      setTimeout(() => {
        clearBoard()
        setPointer('auto')
      }, 3000)
    }
    
    else if ( checkFullBoard(board) ){
      console.warn('Empatou!')
    }
    

  }, board)

  function checkWinner(board) {
    
    const possibleWins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8]
    ]

    for (let i = 0; i < possibleWins.length; i++){
      let [posOne, posTwo, posThree] = possibleWins[i]
      
      if ((board[posOne] === 'X' && board[posTwo] === 'X' && board[posThree] === 'X') || 
          (board[posOne] === 'O' && board[posTwo] === 'O' && board[posThree] === 'O')){
        return true
        
      }

    }

    return false
  }

  function checkFullBoard(board) {
    for(let i = 0; i < board.length; i++){
      if (board[i] === null){
        return false
      } 
    }
    return true
  }

  function restartGame(){
    clearBoard()
    setScoreOne(0)
    setScoreTwo(0)
  }

  function clearBoard(){
    setBoard(initialBoard)
    setPlayer(true)
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.header_buttons}>
          <TouchableOpacity onPress={() => restartGame()}>
            <Text>Restart</Text>
          </TouchableOpacity>
      </View>
      <View pointerEvents={pointer} style={styles.board}>
    
        <View style={{flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center'}}>
          {renderBoardPiece(0)}
          {renderBoardPiece(1)}
          {renderBoardPiece(2)}

          {renderBoardPiece(3)}
          {renderBoardPiece(4)}
          {renderBoardPiece(5)}
          
          {renderBoardPiece(6)}
          {renderBoardPiece(7)}
          {renderBoardPiece(8)}
        </View>
        
      </View>
      <View style={styles.scores}>
          <Text style={styles.score_text}>Player 1: {scoreOne}</Text>
          <Text style={styles.score_text}>Player 2: {scoreTwo}</Text>
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
  },
  scores: {
    flex: 0.2,
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  score_text: {
    fontSize: 25
  },
  header_buttons: {
    flex: 0.1,
    justifyContent: 'center',
    marginRight: 10,
    alignItems: 'flex-end',
  }
});

export default App;
