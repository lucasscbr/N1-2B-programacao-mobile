/*
https://reactnavigation.org/docs/3.x/getting-started/
npx expo install react-navigation react-native-gesture-handler react-native-reanimate
*/
import { StatusBar } from 'expo-status-bar';
import {
  Alert, Text, TextInput, TouchableOpacity,
  View, Keyboard, ScrollView, Image
} from 'react-native';
import { useState, useEffect } from 'react';
import styles from './styles';
import Contato from './componentes/Contato';
import Produto from './componentes/Produto';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Home from './Telas/Home/index';
import Produtos from './Telas/Produtos/index';
import Categorias from './Telas/Categorias';
import TelaVenda from './Telas/TelaVenda/index';
import TelaEfetivarVenda from './Telas/TelaEfetivarVenda/index';
import TelaVendasEfetivadas from './Telas/TelaVendasEfetivadas/index';
import TelaVendasEfetivadasDetalhes from './Telas/TelaVendasEfetivadasDetalhes/index';
import Login from './Telas/Login/index';
import CadastrarUsuario from './Telas/CadastrarUsuario/index';
import TelaDashboards from './Telas/TelaDashboards/index';

const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    CadastrarUsuario,
    Home,
    Produtos,
    Categorias,
    TelaVenda,
    TelaEfetivarVenda,
    TelaVendasEfetivadas,
    TelaVendasEfetivadasDetalhes,
    TelaDashboards,
  })
);

export default function App() {
  return (
      <Routes/>      
  );
}

window.apiUrl = "http://192.168.0.3:3001"; //http://localhost:3001