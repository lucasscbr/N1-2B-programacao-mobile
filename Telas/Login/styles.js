import {StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#5a189a',
      marginTop: 40,
    },
    tituloLogin: {
      fontSize: 25,
      color: '#e0aaff',
      backgroundColor: '#240046',
      width: '100%',
      textAlign: 'center',
      marginBottom:24,
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
    textoCaixaTexto: {
      color: '#e0aaff',
      fontSize: 16,
    },
    inputDado: {
      width: '55%',
    },
    areaBotoes: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: 30,
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
    textoBotao: {
      color: '#e0aaff',
    },
    textoBotaoCriar: {
      color: '#10002b',
    },
    botaoNovaConta: {
      width: 176,
      backgroundColor: '#c77dff',
    },
  });
  
  export default styles;