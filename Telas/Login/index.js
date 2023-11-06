import { Text, View, TouchableOpacity, Keyboard, ScrollView, Image, TextInput, Alert } from 'react-native';
import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import Categoria from '../../componentes/Categoria';
import Axios from "axios";
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorage } from 'react-native';


export default function Login({ navigation }) {
  const [usuario, setUsuario] = useState();
  const [senha, setSenha] = useState();

  async function processamentoUseEffect() {
    //await carregaDados();
  }

  useEffect(
    () => {
      console.log('executando useffect');
      processamentoUseEffect(); 
  }, []);

  function Logar() {
    Axios.post(window.apiUrl + "/login", {
      usuario: usuario,
      senha: senha,
    }).then((response) => {
      if (response.data.errors && response.data.errors.length > 0) {
        const errorList = response.data.errors.join("\n");
        Alert.alert('Erros',`\n${errorList}`);
      }else{
        console.log("Token de sessão do login -> " + response.data.token);
        AsyncStorage.setItem('jwtToken', response.data.token).then(() => {
          Alert.alert('Logado com sucesso!');
          Keyboard.dismiss();
          navigation.navigate('Home');
        });
      }
    }).catch(error => {
      console.error('Ocorreu um erro na solicitação:', error);
      if (error.response && error.response.data && error.response.data.error) {
        Alert.alert(error.response.data.error);
      }
    });
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.tituloLogin}>Login</Text>

      <View style={styles.inputDado}>
        <Text style={styles.textoCaixaTexto}>Usuário</Text>
        <TextInput style={styles.caixaTexto}
          onChangeText={(texto) => setUsuario(texto)}
          value={usuario} />
      </View>

      <View style={styles.inputDado}>
        <Text style={styles.textoCaixaTexto}>Senha</Text>
        <TextInput style={styles.caixaTexto}
          onChangeText={(texto) => setSenha(texto)}
          value={senha} 
          secureTextEntry={true}/>
      </View>

      <View style={styles.areaBotoes}>
        <TouchableOpacity style={styles.botao} onPress={()=>Logar()}>
          <Text style={styles.textoBotao}>Logar</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={[styles.botao, styles.botaoNovaConta]} onPress={() => navigation.navigate('CadastrarUsuario')}>
          <Text style={styles.textoBotaoCriar}>Criar nova conta</Text>
        </TouchableOpacity>

      </View>
      <StatusBar style="auto" />       
    </View>
  );
}