
import { Text, View, TouchableOpacity, Keyboard, ScrollView, TextInput, Alert } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import Produto from '../../componentes/Produto';
import { SelectList } from 'react-native-dropdown-select-list'
import Axios from "axios";

import {
    createTableProdutos,
    createTableCategorias,
    obtemTodosProdutos,
    adicionaProduto,
    alteraProduto,
    excluiProduto,
    excluiTodosProdutos,
    obtemProduto,
    obtemTodasCategorias
  } from '../../services/dbservice';


export default function Produtos({ navigation }) {
  const [codigoProduto, setCodigoProduto] = useState();
  const [descricaoProduto, setDescricaoProduto] = useState();
  const [precoProduto, setPrecoProduto] = useState();
  const [produtos, setProdutos] = useState([]);
  const [selected, setSelected] = useState();
  const [categorias, setCategorias] = useState([]);
  let tabelasCriadas = false;

  async function processamentoUseEffect() {
    if (!tabelasCriadas) {
      console.log("Verificando necessidade de criar tabelas...");
      tabelasCriadas = true;
      await createTableCategorias();
      await createTableProdutos();
    }

    console.log("UseEffect...");
    await carregaDados();
  }

  useEffect(
    () => {
      console.log('executando useffect');
      processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...
  }, []);

   async function salvaDados() {
    let procuraProduto;
    console.log(codigoProduto);
    await Axios.get(window.apiUrl + "/obtemProduto/" + codigoProduto)
    .then(response => {
      procuraProduto = response.data;
      console.log('Testando MySQL GET produto');
      console.log(procuraProduto);
    })
    .catch(error => {
      console.error('Ocorreu um erro na solicitação:', error);
    });

    console.log('procuraProduto => ' + Object.keys(procuraProduto).length);

    let novoProduto;
    if(Object.keys(procuraProduto).length == 0)
      novoProduto = true;
    else
      novoProduto = procuraProduto.codigoProduto == undefined;
     
    console.log('novoProduto => ' + novoProduto);

    let obj = {
        codigoProduto: codigoProduto,
        descricaoProduto: descricaoProduto,
        precoProduto: precoProduto,
        categoria: selected,
    };

    try {
        if (novoProduto) {
            console.log('Usando AXIOS');
            Axios.post(window.apiUrl + "/createProduto", {
              codigoProduto: obj.codigoProduto,
              descricaoProduto: obj.descricaoProduto,
              precoProduto: obj.precoProduto,
              categoria: obj.categoria,
            }).then((response) => {
              console.log('testando o erro');
              if (response.data.errors && response.data.errors.length > 0) {
                // Exiba os erros na interface do usuário
                const errorList = response.data.errors.join("\n");
                Alert.alert('Erros de validação:',`\n${errorList}`);
              }else{
                carregaDados();
                limparCampos();
                Keyboard.dismiss();
                console.log(response);
                Alert.alert('Produto criado com sucesso!')
              }
            }).catch(error => {
              console.error('Ocorreu um erro na solicitação:', error);
              if (error.response && error.response.data && error.response.data.error) {
                Alert.alert(error.response.data.error);
              }
            });
        }
        else {      
            console.log('Chamando altera Produto');
            Axios.post(window.apiUrl + "/alteraProduto/" + obj.codigoProduto, {
              descricaoProduto: obj.descricaoProduto,
              precoProduto: obj.precoProduto,
              categoria: obj.categoria,
            }).then((response) => {
              console.log(response);
              if (response.data.errors && response.data.errors.length > 0) {
                // Exiba os erros na interface do usuário
                const errorList = response.data.errors.join("\n");
                Alert.alert('Erros de validação:',`\n${errorList}`);
              }else{
                carregaDados();
                limparCampos();
                Keyboard.dismiss();
                Alert.alert('Produto Alterado com Sucesso!');
              }
            }).catch(error => {
              console.error('Ocorreu um erro na solicitação:', error);
              if (error.response && error.response.data && error.response.data.error) {
                Alert.alert(error.response.data.error);
              }
            });
        }
        
       /* Keyboard.dismiss();
        limparCampos();*/
        carregaDados(); //await carregaDados();
    } catch (e) {
        Alert.alert(e);
    }
  }

  async function  carregaDados() {
    try {      
      let produtos;
      await Axios.get(window.apiUrl + "/obtemTodosProdutos")
      .then(response => {
        console.log('todos os produtos');
        console.log(response.data);

        if(response.data == "Produtos não Encontrados")
          produtos = undefined;
        else
          produtos = response.data;
      })
      .catch(error => {
        console.error('Ocorreu um erro na solicitação:', error);
      });
      setProdutos(produtos);      
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

      let options = [];
      for (let n = 0; n < categorias.length; n++) {
        let obj = {
            key: n,
            value: categorias[n].nome
        }
        options.push(obj);
    }

      setCategorias(options);  
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  function editar(identificador) {
    console.log("Selected2 => " + selected);
    const produto = produtos.find(produto => produto.codigoProduto == identificador);
    console.log(produto != undefined);

    if (produto != undefined) {
      console.log('categoria2 => ' + produto.categoria);
      setCodigoProduto(produto.codigoProduto);
      setDescricaoProduto(produto.descricaoProduto);
      setPrecoProduto(produto.precoProduto);
      setSelected(produto.categoria);
    }

    console.log(produto);
    console.log('precoProduto'+ precoProduto);
  }

  async function limparCampos() {
    setPrecoProduto(0);
    setDescricaoProduto("");
    setCodigoProduto(undefined);
    setSelected("");
    Keyboard.dismiss();
  }

  async function efetivaExclusao() {
    try {
      //await excluiTodosProdutos();
      Axios.delete(window.apiUrl + "/excluiTodosProdutos", {
      }).then((response) => {
        console.log(response);
        Alert.alert('Produtos apagados!');
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
    if (Alert.alert('Muita atenção!!!', 'Confirma a exclusão de todos os produtos?',
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
    Alert.alert('Atenção', 'Confirma a remoção do produto?',
      [
        {
          text: 'Sim',
          onPress: () => efetivaRemoverProduto(identificador),
        },
        {
          text: 'Não',
          style: 'cancel',
        }
      ]);
  }

  async function efetivaRemoverProduto(identificador) {
    try {
      //await excluiProduto(identificador);
      console.log(identificador);
      Axios.delete(window.apiUrl + "/excluiProduto/" + identificador, {
      }).then((response) => {
        console.log(response);
        Alert.alert('Produto apagado com sucesso!!!');
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
      
      <Text style={styles.tituloProduto}>Cadastro de Produtos</Text>

      <View style={styles.inputDado}>
            <Text style={styles.textoCaixaTexto}>Código</Text>
            <TextInput style={styles.caixaTexto}
              onChangeText={(texto) => setCodigoProduto(texto)}
              value={codigoProduto} />
      </View>

      <View style={styles.inputDado}>
        <Text style={styles.textoCaixaTexto}>Descrição</Text>
        <TextInput style={styles.caixaTexto}
          onChangeText={(texto) => setDescricaoProduto(texto)}
          value={descricaoProduto} />
      </View>

      <View style={styles.inputDado}>
        <Text style={styles.textoCaixaTexto}>Preço unitário</Text>
        <CurrencyInput style={styles.caixaTexto}
          value={precoProduto}
          onChangeValue={(texto) => setPrecoProduto(texto)}
          prefix="R$"
          delimiter="."
          separator=","
          precision={2}
          minValue={0}/>
      </View>

      <View style={styles.inputDado}>
        <Text style={styles.textoCaixaTexto}>Categoria</Text>
        <SelectList 
          setSelected={(val) => setSelected(val)} 
          data={categorias} 
          save="value"/>
      </View>

      <View style={styles.areaBotoes}>
        <TouchableOpacity style={styles.botao} onPress={() => salvaDados()}>
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.botao} onPress={() => limparCampos()}>
          <Text style={styles.textoBotao}>Cancelar</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={[styles.botao, styles.botaoApagarTudo]} onPress={() => apagarTudo()}>
          <Text style={styles.textoBotao}>Apagar tudo</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listaContatos}>
          {produtos != undefined ? (//produtos.length > 0 ? ( 
            produtos.map((produto, index) => (
              <Produto produto={produto} key={index.toString()}
                removerElemento={removerElemento} editar={editar} />
            ))
          ) : (
            <Text>Nenhum produto encontrado.</Text>
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