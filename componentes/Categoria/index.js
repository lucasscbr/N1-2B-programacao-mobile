import {
     Text,TouchableOpacity, View
} from 'react-native';

import styles from './styles';
import { Ionicons, Entypo } from '@expo/vector-icons';


export default function Categoria({categoria, removerElemento, editar}) {
    return (
        <View style={styles.categoria} >

            <Text style={styles.nome}> {categoria.nome}</Text>
            <View style={styles.dadosListaCodigo}>
                <Text style={styles.codigo} >{categoria.codigoCategoria} </Text>
            </View>

            <View style={styles.dadosBotoesAcao}>
                <TouchableOpacity onPress={() => removerElemento(categoria.codigoCategoria)}>
                    <Ionicons name="md-remove-circle" size={32} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editar(categoria.codigoCategoria)}>
                    <Entypo name="edit" size={32} color="#240046" />
                </TouchableOpacity>

            </View>
        </View>
    );

};