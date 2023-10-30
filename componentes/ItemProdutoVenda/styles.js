import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    itemVenda: {
        backgroundColor: '#7b2cbf',
        flexDirection: 'column' ,
        width: '100%',
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
        padding: 10,
    },
    descProduto: {
        fontSize: 18,
        paddingBottom: 10,
        color: "#FFF",
    },
    desc: {
        fontSize: 18,
        paddingRight: 10,
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
});


export default styles;