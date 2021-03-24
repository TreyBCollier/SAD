import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Importing all screens to be used in the navigator stack
import searchStocks from "./app/screens/SearchStocks";
import Stock from "./app/screens/Stock";
import Watchlist from "./app/screens/Watchlist";
import StockWatchlist from "./app/screens/StockWatchlist"

// Importing styles that are used on the home screen
import styles from './app/styles/homeStyles'

class StartScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* Background image */}
        <ImageBackground
          style={styles.backgroundImage}
          resizeMode="cover"
          source={require("./app/assets/ws_bull.jpg")}
        >
          <SafeAreaView style={[styles.imgContainer]}>
            {/* Logo */}
            <Image
              style={styles.logo}
              source={require("./app/assets/ws_bull_white.png")}
            ></Image>

            {/* "Search Stocks" button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.props.navigation.navigate("searchStocks")}
              style={[styles.buttonContainer, styles.signupBtn]}
            >
              <Text style={styles.appButtonText}>Search Stocks</Text>
            </TouchableOpacity>

            {/* "Watchlist" button */}
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

// The following contains all elements/screens within the navigator stack
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