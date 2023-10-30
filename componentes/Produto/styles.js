import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    produto: {
        backgroundColor: '#9d4edd',
        flexDirection: 'row',
        height: 90,
        alignItems: 'center',
        margin: 10,
        borderRadius: 5,
        shadowColor: "#e0aaff",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    nome: {
        width: '40%',
        fontSize: 18,
        paddingRight: 10,
        color: "#FFF",
    },
    dadosListaTelefone: {
        width: '50%',
        flexDirection: 'column',
    },
    dadosBotoesAcao: {
        width: '10%',
    },
    preco: {
        color: "#FFF",
        fontSize: 18,
    },


});


export default styles;