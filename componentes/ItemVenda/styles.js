import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    venda: {
        backgroundColor: '#9d4edd',
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
        padding: 10,
    },
    descVenda: {
        fontSize: 18,
        paddingRight: 10,
        color: "#FFF",
    },
    detalhes: {
        paddingTop: 10,
    },
});


export default styles;