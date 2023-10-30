import {StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#5a189a',
    },
    titulo:{
        fontSize: 30,
        marginBottom: 50,
        color: '#e0aaff',
    },
    botao:{
        width: 200,
        height: 60,
        backgroundColor: '#3c096c',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        shadowColor: "#c77dff",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textoBotao:{
      color: '#e0aaff',
  },
  });
  
  export default styles;