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
  Dimensions
} from 'react-native';

const height = Dimensions.get('screen').height

import Position from './src/components/Position';

const App  = () => {

  let initialTestBoard = Array(9).fill(null)

  const [ board, setBoard ] = useState(initialTestBoard)
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

    if (board[position] === null || board[position] === ''){
      
      let boardCopy = board.slice()

      if (player){
        boardCopy[position] = 'X'
      } else {
        boardCopy[position] = 'O'
      }
      
      setBoard(boardCopy)
      setPlayer(!player)

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
    
  }, [board])

  useEffect(() => {
    if (player === false) {
      let botMove = bestMove()
      
      setTimeout(() => {makeMove(botMove)}, 500)
    }
  }, [player])

  function checkWinner(board) {

    if (board === undefined){
      return
    }
    
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
      if (board[i] === null || board[i] === ''){
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
    setBoard(initialTestBoard)
    setPlayer(true)
  }

  function bestMove() {
    let bestScore = Infinity
    let move
    let auxBoard = board.slice()
  
    for(let i = 0; i < board.length; i++){
      if(auxBoard[i] === null || auxBoard[i] === ''){
        auxBoard[i] = 'O'
        let score = miniMax(auxBoard, 0, true)
        console.log('********** score ' + score + ' i = ' + i)
        auxBoard[i] = ''
        if (score < bestScore) {
          bestScore = score
          move = i
        }
      }
    }

    return move
  }

  function miniMax(currentBoard, depth, isMaximizing){

    let auxBoard = currentBoard.slice()

    if(checkWinner(auxBoard)){
      if(isMaximizing){
        return - 10 + depth 
      }else{
        return 10 - depth
      }
    }else if (checkFullBoard(auxBoard)){
      return 0
    }

    if(isMaximizing){
      let bestScore = -Infinity
      for(let i = 0; i < auxBoard.length; i++){
        if(auxBoard[i] === null || auxBoard[i] === ''){
          auxBoard[i] = 'X'
          let score = miniMax(auxBoard, depth + 1, false)
          auxBoard[i] = ''
          if (score > bestScore) {
            bestScore = score
            move = i
          }
        }
      }
      return bestScore

    }else{
      let bestScore = Infinity
      for(let i = 0; i < auxBoard.length; i++){
        if(auxBoard[i] === null || auxBoard[i] === ''){
          auxBoard[i] = 'O'
          let score = miniMax(auxBoard, depth + 1, true)
          auxBoard[i] = ''
          if (score < bestScore) {
            bestScore = score
            move = i
          }
        }
      }
      return bestScore
    }
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

        <View style={styles.boardRow}>
          {renderBoardPiece(0)}
          {renderBoardPiece(1)}
          {renderBoardPiece(2)}
        </View>

        <View style={styles.boardRow}>
          {renderBoardPiece(3)}
          {renderBoardPiece(4)}
          {renderBoardPiece(5)}
        </View>
        
        <View style={styles.boardRow}>
          {renderBoardPiece(6)}
          {renderBoardPiece(7)}
          {renderBoardPiece(8)}
        </View>
        
      </View>
      <View style={styles.scores}>
          <Text style={styles.score_text}>Player X: {scoreOne}</Text>
          <Text style={styles.score_text}>Player O: {scoreTwo}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  board: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white'
  },

  boardRow: {
    flexDirection: 'row',
    justifyContent: 'center'
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
    fontSize: height * 0.04
  },

  header_buttons: {
    flex: 0.1,
    justifyContent: 'center',
    marginRight: 10,
    alignItems: 'flex-end',
  }
});

export default App;
