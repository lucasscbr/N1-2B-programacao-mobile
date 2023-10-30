import {
     Text,TouchableOpacity, View, Image
} from 'react-native';

import styles from './styles';
import CurrencyInput from 'react-native-currency-input';
import { Ionicons, Entypo } from '@expo/vector-icons';


export default function Produto({produto, removerElemento, editar}) {
    return (
        <View style={styles.produto} >

            <Text style={styles.nome}> {produto.descricaoProduto}</Text>
            <View style={styles.dadosListaTelefone}>
            <Text style={styles.preco}> {produto.codigoProduto}</Text>
                <CurrencyInput style={styles.preco}
                    value={produto.precoProduto}
                    prefix="R$"
                    delimiter="."
                    separator=","
                    precision={2}
                    minValue={0}/>

                <Text style={styles.preco}> {produto.categoria}</Text>
            </View>

            <View style={styles.dadosBotoesAcao}>
                <TouchableOpacity onPress={() => removerElemento(produto.codigoProduto)}>
                    <Ionicons name="md-remove-circle" size={32} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editar(produto.codigoProduto)}>
                    <Entypo name="edit" size={32} color="black" />
                </TouchableOpacity>

            </View>
        </View>
    );

};