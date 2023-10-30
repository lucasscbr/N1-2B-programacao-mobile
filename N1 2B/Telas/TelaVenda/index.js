import { react } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';
import ProdutoVenda from '../../componentes/ProdutoVenda';
import { AntDesign } from '@expo/vector-icons';
import Axios from "axios";

import {
    createTableProdutos,
    obtemTodosProdutos,
    adicionaProduto,
    alteraProduto,
    excluiProduto,
    excluiTodosProdutos,
    obtemProduto,
    obtemProdutosFiltrado
  } from '../../services/dbservice';



export default function TelaVenda({ navigation }) {
    
    const [produtos, setProdutos] = useState([]);
    const [carrinho, setCarrinho] = useState([]);
    const [data, setData] = useState();
    const [filtro, setFiltro] = useState();
    const [carrinhoNumero, setCarrinhoNumero] = useState(0);

    const childToParent = (childdata) => {
        setData(childdata);
        console.log('dados do filho => ' + childdata);
        console.log('dados do filho => ' + childdata.codigoProduto);

        let checkProduto = carrinho.find(produto => produto.codigoProduto == childdata.codigoProduto);
        console.log('checkProduto => ' + checkProduto);
        if(checkProduto == undefined)
            carrinho.push(childdata);
        else {
            if(childdata.quantidade <= 0) carrinho.splice(carrinho.indexOf(childdata.codigoProduto),1); 
            else {
                carrinho.map(obj => {
                    if(obj.codigoProduto == childdata.codigoProduto) obj.quantidade = childdata.quantidade;     
                    return obj;
                })
            }
        }
        
        if(carrinho.length <= 0) setCarrinhoNumero(0);
        else setCarrinhoNumero(carrinho.length);
    }
    let tabelasCriadas = false;

    async function processamentoUseEffect() {
        if (!tabelasCriadas) {
          console.log("Verificando necessidade de criar tabelas...");
          tabelasCriadas = true;
          await createTableProdutos();
        }
    
        console.log("UseEffect...");
        await carregaDados();
      }
    
      useEffect(
        () => {
          console.log('executando useffect');
          processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...
          console.log('Testando retorno dos dados => ' + data);
            
        }, []);

    async function  carregaDados() {
        try {   
          let produtos = [];   
          console.log('filtro => ' + filtro);
          if(filtro == undefined || filtro.lenght <= 0) {
            await Axios.get(window.apiUrl + "/obtemTodosProdutos")
            .then(response => {
            if(response.data == "Produtos não Encontrados")
              produtos = undefined;
            else
              produtos = response.data;
            })
            .catch(error => {
              console.error('Ocorreu um erro na solicitação:', error);
            });
          }
          else {
            await Axios.get(window.apiUrl + "/obtemProdutosFiltrados/" + filtro)
            .then(response => {
            if(response.data == "Produtos não Encontrados")
              produtos = undefined;
            else
              produtos = response.data;
            })
            .catch(error => {
              console.error('Ocorreu um erro na solicitação:', error);
            });
          }
          setProdutos(produtos);      
        } catch (e) {
          console.log(e.toString());
          Alert.alert(e.toString());
        }
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

      function editar(identificador) {
        const produto = produtos.find(produto => produto.codigoProduto == identificador);
    
        if (produto != undefined) {
            console.log('precoProduto => ' + produto.precoProduto);
          setCodigoProduto(produto.codigoProduto);
          setDescricaoProduto(produto.descricaoProduto);
          setPrecoProduto(produto.precoProduto);
        }
    
        console.log(produto);
        console.log('precoProduto'+ precoProduto);
      }

    function navegaTelaEfetivaVenda() {
      console.log('navegaTelaEfetivaVenda');
      console.log(carrinho);
      navigation.navigate('TelaEfetivarVenda', {
        carrinho: carrinho,
      });
    }

    function filtrando(texto) {
      setFiltro(texto);
      carregaDados();
    }

    return (
    <View style={styles.container}>

            <Text style={styles.titulo}>Produtos</Text>
            <TouchableOpacity style={styles.carrinho} onPress={() => navegaTelaEfetivaVenda()}>
              <Text style={styles.carrinhoTexto}>Carrinho</Text>
              <AntDesign name="shoppingcart" size={30} color="black" />
              <Text style={styles.carrinhoTexto}>{carrinhoNumero}</Text>
            </TouchableOpacity> 

            <View style={styles.inputDado}>
              <Text>Filtro por Categoria</Text>
              <TextInput style={styles.caixaTexto}
                onChangeText={(texto) => filtrando(texto)}
                value={filtro} />
            </View>        

            <ScrollView style={styles.listaContatos}>
          {produtos != undefined ? (
            produtos.map((produto, index) => (
              <ProdutoVenda childToParent={childToParent} produto={produto} key={index.toString()}
                removerElemento={removerElemento} editar={editar} />
            ))
          ) : (
            <Text>Nenhum produto encontrado.</Text>
          )}
      </ScrollView>

      <TouchableOpacity style={[styles.botao, styles.botaoVoltar]}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.textoBotaoVoltar}>Voltar</Text>
      </TouchableOpacity>
        

      <StatusBar style="auto" />

    </View>

    );

}