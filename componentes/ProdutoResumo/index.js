import {
    Text, View, Image, TextInput
} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import styles from './styles';


export default function ProdutoResumo({produto}) {
    return (
        <View style={styles.produto} >

            <Text style={styles.descProduto}> {produto.descricaoProduto}</Text>
            <View style={styles.areaPreco}>
                <Text style={styles.camposProdutos}> Preço:</Text>
                <CurrencyInput style={styles.preco}
                    value={produto.precoProduto}
                    prefix="R$"
                    delimiter="."
                    separator=","
                    precision={2}
                    minValue={0}/>
            </View>
            <Text style={styles.camposProdutos}> Quantidade: {produto.quantidade}</Text>
            <View style={styles.areaTotal}>
                <Text style={styles.camposProdutos}> Total:</Text>
                <CurrencyInput style={styles.preco}
                    value={produto.precoProduto * produto.quantidade}
                    prefix="R$"
                    delimiter="."
                    separator=","
                    precision={2}
                    minValue={0}/>
            </View>

        </View>
    );
};