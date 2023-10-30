import {
     Text, View
} from 'react-native';

import styles from './styles';


export default function ItemVenda({venda}) {
    return (
        <View style={styles.venda} >
            <Text style={styles.descVenda}> Código: {venda.codigoVenda}</Text>
            <Text style={styles.descVenda}> Data: {venda.dataVenda}</Text>
            <Text style={[styles.detalhes, styles.descVenda]}> Clique para ver mais detalhes</Text>
        </View>       
    );
};