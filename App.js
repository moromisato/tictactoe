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
  Dimensions,
  Switch,
  Image
} from 'react-native';

import admob, { MaxAdContentRating, firebase } from '@react-native-firebase/admob';
import { BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';

const height = Dimensions.get('screen').height

const adId = __DEV__ ? TestIds.BANNER : "ca-app-pub-1289154948977291~7495283198"

import Position from './src/components/Position';

const App = () => {

  let initialTestBoard = Array(9).fill(null)

  const [ board, setBoard ] = useState(initialTestBoard)
  const [ pointer, setPointer ] = useState('auto')
  const [ player, setPlayer ] = useState(true)
  const [ scoreOne, setScoreOne ] = useState(0)
  const [ scoreTwo, setScoreTwo ] = useState(0)
  const [ tie, setTie ] = useState(0)
  const [ message, setMessage ] = useState('')

  const [ isBotEnabled, setBotEnabled ] = useState(false);
  const [ darkMode, setDarkMode ] = useState(false)

  function toggleBot() {
    clearBoard()
    restartGame()
    setBotEnabled(!isBotEnabled)
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode)
  }

  function renderBoardPiece(position) {
    return (
      <Position value={board[position]} onClick={() => makeMove(position)} />
    )
  }

  function makeMove(position) {
    
    if (board[position] === null || board[position] === '') {

      let boardCopy = board.slice()

      if (player) {
        boardCopy[position] = 'X'
      } else {
        boardCopy[position] = 'O'
      }

      setBoard(boardCopy)

      console.log('alterei player', !player)
      
      setPlayer(!player)
      if (isBotEnabled === true) {
        setPointer('none')
      }
      
    }

  }

  useEffect(() => {
    
    /* admob()
    .setRequestConfiguration({
      // Update all future requests suitable for parental guidance
      maxAdContentRating: MaxAdContentRating.PG,

      // Indicates that you want your content treated as child-directed for purposes of COPPA.
      tagForChildDirectedTreatment: true,

      // Indicates that you want the ad request to be handled in a
      // manner suitable for users under the age of consent.
      tagForUnderAgeOfConsent: true,
    })
    .then(() => {
      console.log('admob successfully configured!')
    }); */
  }, [])

  useEffect(() => {

    if (checkWinner(board)) {
      setPointer('none')

      // this is a temporary solution
      if (isBotEnabled === false){
        returnScore(!player)
      } else {
        returnScore(player)
      }

      setTimeout(() => {
        clearBoard()
        setPointer('auto')
      }, 3000)
    }

    else if (checkFullBoard(board)) {
      setMessage('Empate!')
      setTie(tie + 1)
      setTimeout(() => {
        clearBoard()
      }, 3000)
    }


  }, [board])

  useEffect(() => {

    if (isBotEnabled === true) {
      if (player === false) {
        let botMove = bestMove()
  
        setTimeout(() => { 
          makeMove(botMove)
          setPointer('auto')
        }, 500) 
      }
    }

  }, [player])

  function returnScore(player) {
    if (player) {
      setMessage('Jogador X venceu!')
      return setScoreOne(scoreOne + 1)
    } else {
      setMessage('Jogador O venceu!')
      return setScoreTwo(scoreTwo + 1)
    }
  }

  function checkWinner(board) {

    if (board === undefined) {
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

    for (let i = 0; i < possibleWins.length; i++) {
      let [posOne, posTwo, posThree] = possibleWins[i]

      if ((board[posOne] === 'X' && board[posTwo] === 'X' && board[posThree] === 'X') ||
        (board[posOne] === 'O' && board[posTwo] === 'O' && board[posThree] === 'O')) {
        return true
      }

    }

    return false
  }

  function checkFullBoard(board) {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null || board[i] === '') {
        return false
      }
    }
    return true
  }

  function restartGame() {
    clearBoard()
    setScoreOne(0)
    setScoreTwo(0)
  }

  function clearBoard() {
    setMessage('')
    setBoard(initialTestBoard)
    setPlayer(true)
  }

  function bestMove() {
    let bestScore = Infinity
    let move
    let auxBoard = board.slice()

    for (let i = 0; i < board.length; i++) {
      if (auxBoard[i] === null || auxBoard[i] === '') {
        auxBoard[i] = 'O'
        let score = miniMax(auxBoard, 0, true)
        //console.log('********** score ' + score + ' i = ' + i)
        auxBoard[i] = ''
        if (score < bestScore) {
          bestScore = score
          move = i
        }
      }
    }

    return move
  }

  function miniMax(currentBoard, depth, isMaximizing) {

    let auxBoard = currentBoard.slice()

    if (checkWinner(auxBoard)) {
      if (isMaximizing) {
        return - 10 + depth
      } else {
        return 10 - depth
      }
    } else if (checkFullBoard(auxBoard)) {
      return 0
    }

    if (isMaximizing) {
      let bestScore = -Infinity
      for (let i = 0; i < auxBoard.length; i++) {
        if (auxBoard[i] === null || auxBoard[i] === '') {
          auxBoard[i] = 'X'
          let score = miniMax(auxBoard, depth + 1, false)
          auxBoard[i] = ''
          if (score > bestScore) {
            bestScore = score
          }
        }
      }
      return bestScore

    } else {
      let bestScore = Infinity
      for (let i = 0; i < auxBoard.length; i++) {
        if (auxBoard[i] === null || auxBoard[i] === '') {
          auxBoard[i] = 'O'
          let score = miniMax(auxBoard, depth + 1, true)
          auxBoard[i] = ''
          if (score < bestScore) {
            bestScore = score
          }
        }
      }
      return bestScore
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style = {{flex: 0.1, margin: 5, padding: 5, alignItems: 'center', justifyContent: 'center'}}>
        <BannerAd
            unitId={adId}
            //unitId={'ca-app-pub-1289154948977291/3665757936'}
            size={BannerAdSize.BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
            onAdLoaded={() => {
                console.log('Advert loaded');
            }}
            onAdFailedToLoad={(error) => {
                console.error('Advert failed to load: ', error);
            }}
        />
      </View>
      <View style={styles.header_buttons}>
        <TouchableOpacity style={{backgroundColor: '#f56476', padding: 5, borderRadius: 3}} onPress={() => restartGame()}>
          <Text style={{color: '#fff'}}>Reiniciar jogo</Text>
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
      <View style={{flex:0.1, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.message}>{message}</Text>
      </View>
      <View style={styles.panel}>
        <View style={styles.score}>
          <View>
            <Text style={[styles.scoreText]}>Jogador X</Text>
            <Text style={[styles.scoreText]}>Jogador O</Text>
            <Text style={[styles.scoreText]}>Empates</Text>
          </View>
          <View>
            <Text style={[styles.scorePoints, {color: '#fff', backgroundColor: '#1564be'}]}>{scoreOne}</Text>
            <Text style={[styles.scorePoints, {color: '#fff', backgroundColor: '#f56476'}]}>{scoreTwo}</Text>
            <Text style={styles.scorePoints}>{tie}</Text>
          </View>
        </View>
        <View style={styles.settings}>
          <View style={styles.settingsRow}>
            <Image style={styles.icon} source={require('./src/assets/robot.png')} />
            <Switch
              trackColor={{ false: 'lightgray', true: '#64d183' }}
              thumbColor={isBotEnabled ? '#f4f3f4' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleBot}
              value={isBotEnabled}
            />
          </View>
          
          <View style={styles.settingsRow}>
           {/*  <Image style={styles.icon} source={require('./src/assets/sun.png')} />
            <Switch
              trackColor={{ false: 'lightgray', true: 'lightgray' }}
              thumbColor={darkMode ? '#f4f3f4' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleDarkMode}
              value={darkMode}
            /> */}
          </View>

        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  board: {
    flex: 0.5,
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

  panel: {
    flex: 0.2,
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    //backgroundColor: '#1564be'
  },

  scoreText: {
    color: '#525252',
    fontSize: height * 0.03,
    marginLeft: 10,
    margin: 2
  },

  scorePoints: {
    fontSize: height * 0.03,
    paddingLeft:10, 
    paddingRight: 10, 
    borderRadius: 5,
    margin: 2,
    backgroundColor: 'lightgray'
  },

  header_buttons: {
    flex: 0.1,
    justifyContent: 'center',
    marginRight: 16,
    marginBottom: 8,
    alignItems: 'flex-end',
  },

  score: {
    flex: 1,
    flexDirection: 'row',
    minHeight: height * 0.12,
    justifyContent: 'space-between',
    margin: 5,
    marginLeft: 20,
    borderRadius: 5,
  },

  scoreRow: {
    flexDirection: 'row', 
    justifyContent: 'space-around'
  },

  settings: {
    flex: 1,
    minHeight: height * 0.12,
    marginRight: 20,
  },

  settingsRow: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },

  icon: {
    width: height * 0.05,
    height: height * 0.05,
    resizeMode: 'contain',
  },

  message: {
    fontSize: height * 0.03,
    color: '#ff0000'
  }
});

export default App;
