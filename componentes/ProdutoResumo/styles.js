import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    produto: {
        backgroundColor: '#5a189a',
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
        marginBottom: 10,
    },
    camposProdutos: {
        fontSize: 18,
        color: "#FFF",
    },
    areaPreco: {
        flexDirection:'row',
    },
    preco: {
        color: "#FFF",
        fontSize: 18,
        paddingLeft: 5,
    },
    areaTotal: {
        flexDirection:'row',
        paddingTop: 10,
    },
});


export default styles;