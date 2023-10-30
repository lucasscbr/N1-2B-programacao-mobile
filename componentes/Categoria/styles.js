import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    categoria: {
        backgroundColor: '#9d4edd',
        flexDirection: 'row',
        height: 80,
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
        width: '50%',
        fontSize: 18,
        paddingRight: 10,
        color: "#FFF",
    },
    dadosListaCodigo: {
        width: '40%',
        flexDirection: 'row',
    },
    dadosBotoesAcao: {
        width: '10%',
    },
    codigo: {
        color: "#FFF",
        fontSize: 18,
    },


});


export default styles;