import {StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#b376f5',
      marginTop: 40,
    },
    titulo:{
        fontSize: 30,
        marginBottom: 50,
        color: '#e0aaff',
        backgroundColor: '#240046',
        width: '100%',
        textAlign: 'center'
    },
    botao:{
      width: 120,
      height: 60,
      backgroundColor: '#7b2cbf',
      borderColor: '#7b2cbf',
      borderWidth: 2,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
      margin: 10,
    },
    textoBotaoVoltar: {
      color: '#f1d9ff',
    },
    textoValorTotal: {
      color: '#f1d9ff',
      fontSize:20,
      paddingBottom:10,
    },
    textoValor:{
      fontSize: 30,
      color: '#f1d9ff',
    },
    areaValorTotal: {
      backgroundColor: '#5a189a',
      fontSize:20,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      margin:10,
    },
  });
  
  export default styles;