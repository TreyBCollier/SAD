import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import searchStocks from "./app/screens/SearchStocks";
import Stock from "./app/screens/Stock";
import Watchlist from "./app/screens/Watchlist";
import StockWatchlist from "./app/screens/StockWatchlist"
import styles from './app/styles/homeStyles'

class StartScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          resizeMode="cover"
          source={require("./app/assets/ws_bull.jpg")}
        >
          <SafeAreaView style={[styles.imgContainer]}>
            <Image
              style={styles.logo}
              source={require("./app/assets/ws_bull_white.png")}
            ></Image>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.props.navigation.navigate("searchStocks")}
              style={[styles.buttonContainer, styles.signupBtn]}
            >
              <Text style={styles.appButtonText}>Search Stocks</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.props.navigation.navigate("Watchlist")}
              style={[styles.buttonContainer, styles.signupBtn]}
            >
              <Text style={styles.appButtonText}>Watchlist</Text>
            </TouchableOpacity>

            
          </SafeAreaView>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Start: {
    screen: StartScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  searchStocks: {
    screen: searchStocks,
    navigationOptions: {
      headerShown: false,
    },
  },
  Stock: {
    screen: Stock,
    navigationOptions: {
      headerShown: false,
    },
  },
  Watchlist: {
    screen: Watchlist,
    navigationOptions: {
      headerShown: false,
    },
  },
  StockWatchlist: {
    screen: StockWatchlist,
    navigationOptions: {
      headerShown: false,
    },
  },
  
});

export default createAppContainer(AppNavigator);