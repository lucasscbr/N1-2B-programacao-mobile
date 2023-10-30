import {
     Text,TouchableOpacity, View, Image
} from 'react-native';

import styles from './styles';
import iconTelefone from '../../img/phone.png';
import { Ionicons, Entypo } from '@expo/vector-icons';


export default function Contato({contato, removerElemento, editar}) {
    return (
        <View style={styles.contato} >

            <Text style={styles.listaNome}> {contato.nome}</Text>
            <View style={styles.dadosListaTelefone}>

                <Image source={iconTelefone} style={styles.iconTelefone} />
                <Text style={styles.listaTelefone} >{contato.telefone} </Text>
            </View>

            <View style={styles.dadosBotoesAcao}>
                <TouchableOpacity onPress={() => removerElemento(contato.id)}>
                    <Ionicons name="md-remove-circle" size={32} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editar(contato.id)}>
                    <Entypo name="edit" size={32} color="black" />
                </TouchableOpacity>

            </View>
        </View>
    );

};