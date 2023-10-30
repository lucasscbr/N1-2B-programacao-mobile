import {
     Text, View
} from 'react-native';
import { useState, useEffect } from 'react';
import CurrencyInput from 'react-native-currency-input';

import styles from './styles';


export default function ItemProdutoVenda({produtoVenda}) {
    const [precoTotal, setPrecoTotal] = useState(0);

    useEffect(
        () => {
            setPrecoTotal(parseFloat(produtoVenda.precoProduto) * parseInt(produtoVenda.quantidade));
        }, []);
    return (
        <View style={styles.itemVenda} >
            <Text style={styles.desc}>Código da venda: {produtoVenda.codigoVenda}</Text>
            <Text style={styles.descProduto}>Código do Produto: {produtoVenda.codigoProduto}</Text>

            <Text style={styles.desc}>Descrição do Produto: {produtoVenda.descricaoProduto}</Text>
            <Text style={styles.desc}>Quantidade: {produtoVenda.quantidade}</Text>
            <View style={styles.areaPreco}>
                <Text style={styles.desc}> Preço:</Text>
                <CurrencyInput style={styles.preco}
                    value={produtoVenda.precoProduto}
                    prefix="R$"
                    delimiter="."
                    separator=","
                    precision={2}
                    minValue={0}/>
            </View>
            <View style={styles.areaPreco}>
                <Text style={styles.desc}> Total:</Text>
                <CurrencyInput style={styles.preco}
                    value={precoTotal}
                    prefix="R$"
                    delimiter="."
                    separator=","
                    precision={2}
                    minValue={0}/>
            </View>
        </View>
    );
};