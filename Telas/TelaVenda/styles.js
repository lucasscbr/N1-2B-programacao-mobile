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
    botaoVoltar:{
      marginTop: 5,
      backgroundColor: '#9d4edd',
      borderColor: '#9d4edd',
    },
    textoBotaoVoltar: {
      color: '#f1d9ff',
    },
    caixaTexto: {
      borderColor: "#9d4edd",
      borderWidth: 2,
      height: 50,
      width: '100%',
      paddingHorizontal: 10,
      borderRadius: 10,
      marginBottom: 10,
      color: '#f1d9ff',
    },
    inputDado: {
      width: '55%',
    },
    carrinho:{
      flexDirection: 'row',
    },
    carrinhoTexto:{
      fontSize: 20,
      paddingLeft: 10,
    },
    botao:{
      width: 120,
      height: 60,
      backgroundColor: '#3c096c',
      borderColor: '#3c096c',
      borderWidth: 2,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
    },
  });
  
  export default styles;