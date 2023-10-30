import { Text, View, TouchableOpacity, Keyboard, ScrollView, Image, TextInput, Alert } from 'react-native';
import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import Axios from "axios";


export default function CadastrarUsuario({ navigation }) {
  const [usuario, setUsuario] = useState();
  const [senha, setSenha] = useState();
  const [nome, setNome] = useState();

  async function processamentoUseEffect() {
    //await carregaDados();
  }

  useEffect(
    () => {
      console.log('executando useffect');
      processamentoUseEffect(); 
  }, []);

  function CriarUsuario() {
    Axios.post(window.apiUrl + "/criarUsuario", {
      usuario: usuario,
      nome: nome,
      senha: senha,
    }).then((response) => {
      if (response.data.errors && response.data.errors.length > 0) {
        // Exiba os erros na interface do usuário
        const errorList = response.data.errors.join("\n");
        Alert.alert('Erros:',`\n${errorList}`);
      }else{
        console.log(response);
        Alert.alert('Usuario criado com sucesso!')
        Keyboard.dismiss();
        limparCampos();
        navigation.navigate('Login')
      }
    }).catch(error => {
      console.error('Ocorreu um erro na solicitação:', error);
      if (error.response && error.response.data && error.response.data.error) {
        Alert.alert(error.response.data.error);
      }
    });
    //navigation.navigate('Home');
  }

  async function limparCampos() {
    setNome("");
    setSenha("");
    setUsuario("");
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.tituloUser}>Cadastro de novo Usuário</Text>

      <View style={styles.inputDado}>
        <Text style={styles.textoCaixaTexto}>Nome</Text>
        <TextInput style={styles.caixaTexto}
          onChangeText={(texto) => setNome(texto)}
          value={nome} />
      </View>

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
          value={senha} />
      </View>

      <View style={styles.areaBotoes}>
        <TouchableOpacity style={styles.botao} onPress={()=>CriarUsuario()}>
          <Text style={styles.textoBotao}>Criar</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.botao} onPress={() => limparCampos()}>
          <Text style={styles.textoBotao}>Limpar Campos</Text>
        </TouchableOpacity>

      </View>
      <StatusBar style="auto" />       
    </View>
  );
}