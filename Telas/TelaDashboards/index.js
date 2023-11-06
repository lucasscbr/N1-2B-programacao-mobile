import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';
import Axios from "axios";
import { BarChart } from 'react-native-chart-kit';
import { FontAwesome } from '@expo/vector-icons'

export default function TelaDashboards({ navigation }) {
  const [totalSales, setTotalSales] = useState(0);
  const [salesData, setSalesData] = useState([])
  
  useEffect(() => {
    // Fetch data from the server and set totalSales and salesData state.
    console.log('useEffect teste ');
    Axios.get(window.apiUrl + "/salesSummary")
      .then((response) => {
        console.log('response => ' + response);
        const { totalSales, salesData } = response.data;
        setTotalSales(totalSales);
        setSalesData(salesData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const chartData = {
    labels: salesData.map(sale => sale.date), 
    datasets: [
      {
        data: salesData.map(sale => sale.total)
      }
    ]
  }

  const chartConfig = {
    backgroundGradientFrom: '#1E2923', 
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // opcional
  }

  console.log("Dados dentro do chartData:", JSON.stringify(chartData, null, 2));

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Dashboards</Text>

      <View style={styles.totalSalesContainer}>
        <View style={styles.totalSalesValueContainer}>
        <Text style={styles.totalSalesValue}>
            Vendas Totais:
          </Text>
          <Text style={styles.totalSalesValue}>
            {totalSales}
          </Text>
          <FontAwesome name="dollar" size={24} color="black" />
        </View>
      </View>

      <BarChart
        data={chartData}
        width={320}
        height={220}
        chartConfig={chartConfig}
      />

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.textoBotaoVoltar}>Voltar</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}