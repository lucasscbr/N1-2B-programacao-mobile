import {
     Text,TouchableOpacity, View, Image, TextInput
} from 'react-native';
import { useState, useEffect } from 'react';
import styles from './styles';
import iconTelefone from '../../img/phone.png';
import { Ionicons, Entypo } from '@expo/vector-icons';
import CurrencyInput from 'react-native-currency-input';
import { AntDesign } from '@expo/vector-icons'; 


export default function ProdutoVenda({childToParent,produto, removerElemento, editar}) {
    const [quantidade, setQuantidade] = useState("0");

    function adicionaQuantidade() {
        let qtd = parseInt(quantidade) + 1; 
        setQuantidade(qtd.toString());
        produto.quantidade = qtd;
        childToParent(produto);
        //if(qtd > 0) childToParent(produto);
    }

    function retiraQuantidade() {
        let qtd = ((parseInt(quantidade) - 1) <= 0) ? "0" : parseInt(quantidade) - 1; 
        setQuantidade(qtd.toString());
        produto.quantidade = qtd;
        childToParent(produto);
        //if(qtd > 0) childToParent(produto);
    }

    function setQuantidadeAndCallParent(texto) {
        console.log('texto = > ' + texto);
        if(texto == '' || texto[0] == "N") texto = "0";
        let qtd = parseInt(texto); 
        setQuantidade(qtd.toString());
        produto.quantidade = qtd;
        childToParent(produto);
    }


    return (
        <View style={styles.produto} >

            <Text style={styles.descProduto}> {produto.descricaoProduto}</Text>
            <CurrencyInput style={styles.preco}
                value={produto.precoProduto}
                prefix="R$"
                delimiter="."
                separator=","
                precision={2}
                minValue={0}/>
            <Text style={styles.camposProdutos}> {produto.categoria}</Text>

            <View style={styles.areaQuantidade}>
                <TouchableOpacity onPress={() => retiraQuantidade()}>
                    <AntDesign name="minuscircle" size={30} color="#10002b" />
                </TouchableOpacity>  

                <TextInput style={styles.quantidade}
                    onChangeText={(texto) => setQuantidadeAndCallParent(texto)}
                    value={quantidade}
                    keyboardType="numeric"/>

                <TouchableOpacity onPress={() => adicionaQuantidade()}>
                    <AntDesign name="pluscircle" size={30} color="#10002b" />
                </TouchableOpacity>
            </View>
        </View>
        
    );

};