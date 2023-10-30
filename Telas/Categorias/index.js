import { Text, View, TouchableOpacity, Keyboard, ScrollView, Image, TextInput, Alert } from 'react-native';
import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import Categoria from '../../componentes/Categoria';
import Axios from "axios";

import {
    createTableCategorias,
    obtemTodasCategorias,
    adicionaCategoria,
    alteraCategoria,
    excluiCategoria,
    excluiTodasCategorias,
    obtemCategoria
  } from '../../services/dbservice';


export default function Produtos({ navigation }) {
  const [codigoCategoria, setCodigoCategoria] = useState();
  const [nome, setNome] = useState();
  const [categorias, setCategorias] = useState([]);

  let tabelasCriadas = false;

  async function processamentoUseEffect() {
    if (!tabelasCriadas) {
      console.log("Verificando necessidade de criar tabelas...");
      tabelasCriadas = true;
      await createTableCategorias();
    }

    console.log("UseEffect...");
    await carregaDados();
  }

  useEffect(
    () => {
      console.log('executando useffect');
      processamentoUseEffect(); 
  }, []);

  async function salvaDados() {
    //let procuraCategoria = await obtemCategoria(codigoCategoria);
    let procuraCategoria;
    await Axios.get(window.apiUrl + "/obtemCategoria/" + codigoCategoria)
    .then(response => {
      procuraCategoria = response.data;
    })
    .catch(error => {
      console.error('Ocorreu um erro na solicitação:', error);
    });
    let novaCategoria;
    if(Object.keys(procuraCategoria).length == 0)
      novaCategoria = true;
    else
      novaCategoria = procuraCategoria.codigoCategoria == undefined;

    let obj = {
        codigoCategoria: codigoCategoria,
        nome: nome,
    };

    try {
        if (novaCategoria) {
          Axios.post(window.apiUrl + "/createCategoria", {
            codigoCategoria: obj.codigoCategoria,
            nome: obj.nome,
          }).then((response) => {
            if (response.data.errors && response.data.errors.length > 0) {
              // Exiba os erros na interface do usuário
              const errorList = response.data.errors.join("\n");
              Alert.alert('Erros de validação:',`\n${errorList}`);
            }else{
              carregaDados();
              console.log(response);
              Alert.alert('Categoria criada com sucesso!')
              Keyboard.dismiss();
              limparCampos();
            }
          }).catch(error => {
            console.error('Ocorreu um erro na solicitação:', error);
            if (error.response && error.response.data && error.response.data.error) {
              Alert.alert(error.response.data.error);
            }
          });
        }
        else {      
            console.log('Chamando altera Categoria');
            Axios.post(window.apiUrl + "/alteraCategoria/" + obj.codigoCategoria, {
              nome: obj.nome,
            }).then((response) => {
              if (response.data.errors && response.data.errors.length > 0) {
                // Exiba os erros na interface do usuário
                const errorList = response.data.errors.join("\n");
                Alert.alert('Erros de validação:',`\n${errorList}`);
              } else{
                console.log(response);
                carregaDados();
                Alert.alert('Categoria Alterada com Sucesso!');
                Keyboard.dismiss();
                limparCampos();
              }
            }).catch(error => {
              console.error('Ocorreu um erro na solicitação:', error);
              if (error.response && error.response.data && error.response.data.error) {
                Alert.alert(error.response.data.error);
              } else{
                Alert.alert('Erros',error);
              }
            });
        }
        
        /*Keyboard.dismiss();
        limparCampos();*/
        await carregaDados();
    } catch (e) {
        Alert.alert(e);
    }
  }

  async function carregaDados() {
    try {      
      let categorias;
      await Axios.get(window.apiUrl + "/obtemTodasCategorias")
      .then(response => {
        console.log('todos as categorias');
        console.log(response.data);

        if(response.data == "Categorias não Encontradas")
          categorias = undefined;
        else
          categorias = response.data;
      })
      .catch(error => {
        console.error('Ocorreu um erro na solicitação:', error);
      });
      setCategorias(categorias);    
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  function editar(identificador) {
    const categoria = categorias.find(categoria => categoria.codigoCategoria == identificador);

    if (categoria != undefined) {
      console.log('nome => ' + categoria.nome);
      setCodigoCategoria(categoria.codigoCategoria);
      setNome(categoria.nome);
    }

    console.log(categoria);
  }

  async function limparCampos() {
    setNome("");
    setCodigoCategoria(undefined);
    Keyboard.dismiss();
  }

  async function efetivaExclusao() {
    try {
      Axios.delete(window.apiUrl + "/excluiTodasCategorias", {
      }).then((response) => {
        console.log(response);
        Alert.alert('Categorias apagadas!');
        carregaDados();
      }).catch(error => {
        console.error('Ocorreu um erro na solicitação:', error);
        if (error.response && error.response.data && error.response.data.error) {
          Alert.alert(error.response.data.error);
          carregaDados();
        }
      });
    }
    catch (e) {
      Alert.alert(e);
    }
  }

  function apagarTudo() {
    if (Alert.alert('Muita atenção!!!', 'Confirma a exclusão de todas as categorias?',
      [
        {
          text: 'Sim, confirmo!',
          onPress: () => {
            efetivaExclusao();
          }
        },
        {
          text: 'Não!!!',
          style: 'cancel'
        }
      ]));
  }

  function removerElemento(identificador) {
    Alert.alert('Atenção', 'Confirma a remoção da categoria?',
      [
        {
          text: 'Sim',
          onPress: () => efetivaRemoverCategoria(identificador),
        },
        {
          text: 'Não',
          style: 'cancel',
        }
      ]);
  }

  async function efetivaRemoverCategoria(identificador) {
    try {
      Axios.delete(window.apiUrl + "/excluiCategoria/" + identificador, {
      }).then((response) => {
        console.log(response);
        Alert.alert('Categoria apagada com sucesso!!!');
      }).catch(error => {
        console.error('Ocorreu um erro na solicitação:', error);
        if (error.response && error.response.data && error.response.data.error) {
          Alert.alert(error.response.data.error);
        }
      });
      Keyboard.dismiss();
      limparCampos();
      await carregaDados();
    } catch (e) {
      Alert.alert(e);
    }
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.tituloCategoria}>Cadastro de Categorias</Text>

      <View style={styles.inputDado}>
        <Text style={styles.textoCaixaTexto}>Código</Text>
        <TextInput style={styles.caixaTexto}
          onChangeText={(texto) => setCodigoCategoria(texto)}
          value={codigoCategoria} />
      </View>

      <View style={styles.inputDado}>
        <Text style={styles.textoCaixaTexto}>Nome</Text>
        <TextInput style={styles.caixaTexto}
          onChangeText={(texto) => setNome(texto)}
          value={nome} />
      </View>

      <View style={styles.areaBotoes}>
        <TouchableOpacity style={styles.botao} onPress={() => salvaDados()}>
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.botao} onPress={() => limparCampos()}>
          <Text style={styles.textoBotao}>Cancelar</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={[styles.botao, styles.botaoApagarTudo]} onPress={() => apagarTudo()}>
          <Text style={styles.textoBotaoApagarTudo}>Apagar tudo</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listaContatos}>
          {categorias != undefined ? (
            categorias.map((categoria, index) => (
              <Categoria categoria={categoria} key={index.toString()}
                removerElemento={removerElemento} editar={editar} />
            ))
          ) : (
            <Text>Nenhuma categoria encontrada.</Text>
          )}
      </ScrollView>

      <StatusBar style="auto" />

      <TouchableOpacity style={[styles.botao, styles.botaoVoltar]}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.textoBotaoVoltar}>Voltar</Text>
      </TouchableOpacity>
        
    </View>
  );
}