import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import SignUpScreen from "./app/screens/SignUpScreen";
import searchStocks from "./app/screens/SearchStocks";
import Stock from "./app/screens/Stock";
import colours from "./app/config/colours";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

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
  SignUp: {
    screen: SignUpScreen,
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
  
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    flex: 1,
    bottom: 0,
    alignContent: "center",
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: "30%",
  },

  text: {
    color: "white",
    fontSize: RFPercentage(5),
    fontWeight: "500",
    textAlign: "center",
  },

  title: {
    marginBottom: "10%",
  },

  logo: {
    width: "90%",
    height: "30%",
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: "-2.5%",
  },

  imgContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },

  buttonContainer: {
    marginTop: 15,
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 0,
    paddingHorizontal: 5,
    width: "90%",
    height: "5%",
    alignSelf: "center",
    justifyContent: "center",
  },

  faceboookBtn: {
    backgroundColor: colours.facebook,
  },
  emailBtn: {
    backgroundColor: colours.email,
  },

  signupBtn: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "white",
  },

  appButtonText: {
    fontSize: RFPercentage(2),
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default createAppContainer(AppNavigator);