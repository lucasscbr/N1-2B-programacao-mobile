import { Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';
import ItemVenda from '../../componentes/ItemVenda';
import Axios from "axios";

import {
    createTableProdutos,
    createTableVendas,
    createTableVendasProdutos,
    createTableCategorias,
    obtemTodasVendas
  } from '../../services/dbservice';



export default function TelaVendasEfetivadas({ navigation }) {
  const [vendas, setVendas] = useState([]);

  useEffect(
    () => {
      console.log('useffect VendasEfetivadas');
      processamentoUseEffect();
        
    }, []);

  async function processamentoUseEffect() {
    if (!tabelasCriadas) {
      console.log("Verificando necessidade de criar tabelas...");
      tabelasCriadas = true;
      await createTableCategorias();
      await createTableProdutos();
      await createTableVendas();
      await createTableVendasProdutos();
    }
  
    console.log("UseEffect...");
    await carregaDados();
  }

  async function  carregaDados() {
    try {      
      let getVendas;
      await Axios.get(window.apiUrl + "/obtemTodasVendas")
      .then(response => {
      if(response.data == "Vendas não Encontradas")
        getVendas = undefined;
      else
        getVendas = response.data;
      })
      .catch(error => {
        console.error('Ocorreu um erro na solicitação:', error);
      });
      setVendas(getVendas);     
      console.log(getVendas[0]);
    } catch (e) {
      Alert.alert(e.toString());
    }
  }


  let tabelasCriadas = false;

  return (
      <View style={styles.container}>

        <Text style={styles.titulo}>Vendas Efetivadas</Text>

        <ScrollView style={styles.listaContatos}>
          {vendas != undefined ? (
            vendas.map((venda, index) => (
              <TouchableOpacity key={index.toString()} onPress={() => navigation.navigate('TelaVendasEfetivadasDetalhes', {venda: venda,})}>
                <ItemVenda venda={venda} />
              </TouchableOpacity>
            ))
          ) : (
            <Text>Nenhuma compra foi feita.</Text>
          )}
        </ScrollView>

        <TouchableOpacity style={styles.botao}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.textoBotaoVoltar}>Voltar</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />

      </View>

    );
}