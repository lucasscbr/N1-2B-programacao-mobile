import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    produto: {
        backgroundColor: '##c25567',
        flexDirection: 'column' ,
        width: 300,
        alignItems: 'center',
        margin: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginTop: 10,
    },
    descProduto: {
        fontSize: 18,
        paddingTop: 10,
        color: "#FFF",
    },
    camposProdutos: {
        fontSize: 18,
        color: "#FFF",
    },
    areaQuantidade: {
        flexDirection: 'row',
        margin: 10,
    },
    quantidade: {
        paddingLeft: 15,
        paddingRight: 5,
        color: "#FFF",
        fontSize: 18,
    },
    preco: {
        color: "#FFF",
        fontSize: 18,
    },
});


export default styles;