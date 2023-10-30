import { Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './styles';
import ProdutoResumo from '../../componentes/ProdutoResumo';
import { StatusBar } from 'expo-status-bar';
import CurrencyInput from 'react-native-currency-input';
import Axios from "axios";

import {
  adicionaVenda,
  adicionaProdutoNaVenda
} from '../../services/dbservice';


export default function TelaEfetivarVenda({navigation }) {
  const [carrinho, setCarrinho] = useState([]);
  const [precoTotal, setPrecoTotal] = useState();
    
  useEffect(
    () => {
      console.log('useffect TelaEfetivarVenda');
      console.log(navigation.getParam('itemId'));
      console.log(navigation.getParam('carrinho'));
      setCarrinho(navigation.getParam('carrinho'));

      let totalPrice = 0;
      for (let n = 0; n < navigation.getParam('carrinho').length; n++) {
        console.log('preco => ' + parseFloat(navigation.getParam('carrinho')[n].precoProduto));
        console.log('quantidade => ' + parseFloat(navigation.getParam('carrinho')[n].quantidade));
        totalPrice += parseFloat(navigation.getParam('carrinho')[n].precoProduto) * parseInt(navigation.getParam('carrinho')[n].quantidade);
      }
      setPrecoTotal(totalPrice);
    }, []);

  async function confirmaCompra() {
    // Cria uma nova venda
    console.log('confirmaCompra emtrou');
    let codigoVenda;
    await Axios.post(window.apiUrl + "/createVenda")
    .then(response => {
      console.log('venda criada');
      codigoVenda = response.data.vendaId;
    })
    .catch(error => {
      console.error('Ocorreu um erro na solicitação:', error);
    });
    console.log('Vai iniciar o FOR');
    console.log(carrinho.length);
    for (let i = 0; i < carrinho.length; i++) {
      const produtoVenda = {
        codigoProduto: carrinho[i].codigoProduto,
        quantidade: carrinho[i].quantidade,
        codigoVenda: codigoVenda,
      };

      try {
        const response = await Axios.post(window.apiUrl + "/adicionaProdutoNaVenda", produtoVenda);
        console.log(response);
      } catch (error) {
        console.error('Ocorreu um erro na solicitação:', error);
        if (error.response && error.response.data && error.response.data.error) {
          Alert.alert(error.response.data.error);
        }
      }
    }

    Alert.alert('Compra efetivada!');
    navigation.navigate('Home');
  }
    return (
      <View style={styles.container}>

        <Text style={styles.titulo}>Resumo do Pedido</Text>

        <ScrollView style={styles.listaContatos}>
            {carrinho != undefined ? (
              carrinho.map((produto, index) => (
                <ProdutoResumo produto={produto} key={index.toString()}/>
              ))
            ) : (
              <Text>Nenhum produto encontrado.</Text>
            )}
        </ScrollView>

        <StatusBar style="auto" />

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


        <View style={styles.areaBotoes}>
          <TouchableOpacity style={[styles.botao,styles.botaoVoltar]}
            onPress={() => navigation.navigate('TelaVenda')}>
            <Text style={styles.textoBotaoVoltar}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.botao,styles.botaoVoltar]}
            onPress={() => confirmaCompra()}>
            <Text style={styles.textoBotaoVoltar}>Confirmar Compra</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}