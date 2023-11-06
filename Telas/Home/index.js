import {react} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function Home({navigation}){
    return (
        <View style={styles.container}>
            
            <Text style={styles.titulo}>Escolha uma tela</Text>

            <TouchableOpacity style={styles.botao}
                onPress={()=>navigation.navigate('Categorias')}>
                <Text style={styles.textoBotao}>Cadastro de Categoria</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao}
                onPress={()=>navigation.navigate('Produtos')}>
                <Text style={styles.textoBotao} >Cadastro de Produtos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao}
                onPress={()=>navigation.navigate('TelaVenda')}>
                <Text style={styles.textoBotao}>Tela Venda</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao}
                onPress={()=>navigation.navigate('TelaVendasEfetivadas')}>
                <Text style={styles.textoBotao}>Tela Vendas Efetivadas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botao}
                onPress={()=>navigation.navigate('TelaDashboards')}>
                <Text style={styles.textoBotao}>Dashboards</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botao}
                onPress={()=>navigation.navigate('Login')}>
                <Text style={styles.textoBotao}>Voltar Login</Text>
            </TouchableOpacity>
        </View>

    );

}