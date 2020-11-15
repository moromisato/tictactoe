import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../context/useTheme';

const height = Dimensions.get('screen').height

export default function BoardPiece({value, onClick}) {

  const { theme } = useTheme()

  const xMarkerColor = {
    color: '#1564be'
  }

  const oMakerColor = {
    color: '#f56476'
  }

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: theme.primaryColor }]} onPress={onClick}>
        <Text style={value === 'X' ? [styles.marker, xMarkerColor] : [styles.marker, oMakerColor]}>{value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container:{
        width: height * 0.12,
        height: height * 0.12,
        margin: 10,
        borderRadius: height * 0.01,
        borderWidth: 0,
        //backgroundColor: '#1564be',
        justifyContent: 'center',
        alignItems: 'center',
    },
    marker:{
      fontFamily: '',
      fontSize: height * 0.09,
      fontWeight: 'bold',

    }
})