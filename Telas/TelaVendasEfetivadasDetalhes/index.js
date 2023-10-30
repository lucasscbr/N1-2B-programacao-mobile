import { Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';
import ItemProdutoVenda from '../../componentes/ItemProdutoVenda';
import CurrencyInput from 'react-native-currency-input';
import Axios from "axios";

import {
    createTableProdutos,
    createTableVendas,
    createTableVendasProdutos,
    obtemVendaProduto
  } from '../../services/dbservice';



export default function TelaVendasEfetivadasDetalhes({ navigation }) {
  const [produtosVenda, setProdutosVenda] = useState([]);
  const [venda, setVenda] = useState([]);
  const [precoTotal, setPrecoTotal] = useState();

  useEffect(
    () => {
      processamentoUseEffect();
      console.log('useffect VendasEfetivadasDetalhes');
    }, []);

  async function processamentoUseEffect() {
    if (!tabelasCriadas) {
      console.log("Verificando necessidade de criar tabelas...");
      tabelasCriadas = true;
      await createTableProdutos();
      await createTableVendas();
      await createTableVendasProdutos();
    }
  
    console.log("UseEffect...");
    await carregaDados();
  }

  async function carregaDados() {
    try {    
      let venda = navigation.getParam('venda');
      setVenda(navigation.getParam('venda'));
      let getProdutosVendas;
      await Axios.get(window.apiUrl + "/obtemVendaProduto/" + venda.codigoVenda)
      .then(response => {
      if(response.data == "Ocorreu um erro ao buscar os produtos da venda.")
        getProdutosVendas = undefined;
      else
        getProdutosVendas = response.data;
      })
      .catch(error => {
        console.error('Ocorreu um erro na solicitação:', error);
      });
      setProdutosVenda(getProdutosVendas);     
      console.log(getProdutosVendas[0]);

      let totalPrice = 0;
      for (let n = 0; n < getProdutosVendas.length; n++) {
        console.log('preco => ' + parseFloat(getProdutosVendas[n].precoProduto));
        console.log('quantidade => ' + parseFloat(getProdutosVendas[n].quantidade));
        totalPrice += parseFloat(getProdutosVendas[n].precoProduto) * parseInt(getProdutosVendas[n].quantidade);
      }
      setPrecoTotal(totalPrice);
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  let tabelasCriadas = false;

  return (
      <View style={styles.container}>

        <Text style={styles.titulo}>Detalhes</Text>

        <ScrollView style={styles.listaContatos}>
          {produtosVenda != undefined ? (
            produtosVenda.map((produtoVenda, index) => (
              <TouchableOpacity key={index.toString()}>
                <ItemProdutoVenda produtoVenda={produtoVenda} />
              </TouchableOpacity>
            ))
          ) : (
            <Text>Nenhum produto encontrado.</Text>
          )}
        </ScrollView>

        <View style={styles.areaValorTotal}>
          <Text style={styles.textoValorTotal} >Valor total do pedido:</Text>
          <CurrencyInput style={styles.textoValor}
                  value={precoTotal}
                  prefix="R$"
                  delimiter="."
                  separator=","
                  precision={2}
                  minValue={0}/>
        </View>

        <TouchableOpacity style={styles.botao}
          onPress={() => navigation.navigate('TelaVendasEfetivadas')}>
          <Text style={styles.textoBotaoVoltar}>Voltar</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />

      </View>

    );
}