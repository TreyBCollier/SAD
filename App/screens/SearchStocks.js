import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Button, Card, Input, CheckBox, Overlay, SearchBar } from "react-native-elements";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import colours from "../config/colours";



const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

class SearchStocks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: null,
      search: '',
      
    };

    
  }


  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, alignContent: "center", justifyContent: "center", backgroundColor: 'white' }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginHorizontal: 20,
            top: Platform.select({
              ios: "2%",
              android: "12%",
            }),
          }}
        >
          <Icon
            color="black"
            name="arrow-left"
            size={25}
            style={{
              marginLeft: "5%",
              marginBottom: "1.75%",
              marginTop: "1.75%",
            }}
            onPress={() => this.props.navigation.navigate("Start")}
          />

          <View
            style={{
              flexDirection: "row",
              marginTop: "5%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                marginRight: "10%",
                fontSize: RFPercentage(3),
              }}
            >
              Search Stocks
            </Text>
            
          </View>

          
            <View style={styles.searchBar}>
              <SearchBar
                style= {{
                  width: "100%",
                
                }}
                placeholder="Ticker"
                platform = "ios"
                value={this.state.search}
                onChangeText={(text) => this.setState({ search: text })}
              />
            </View>
            
         
          
          
          
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  titleText: {
    fontSize: 30,
    paddingTop: 20,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 1,

    borderRadius: 10,
    paddingVertical: 0,
    paddingHorizontal: 5,
    width: "90%",
    height: "5%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: colours.email,
  },
  appButtonText: {
    fontSize: RFPercentage(2),
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  boldText: {
    color: "grey",
    fontSize: 18,
    paddingLeft: "7%",
    paddingTop: "6%",
    paddingBottom: "5%",
  },

  buttonTitle: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    alignSelf: "center",
    bottom: "51%",
  },

  input: {
    color: "#929292",
    fontSize: 15,
    textAlign: "left",
    paddingLeft: "0%",
  },
  textOutput: {
    color: "#929292",
    width: "100%",
  },

  fieldContainer: {
    flexDirection: "row",
    paddingTop: "10%",
    alignItems: "center",
  },
  searchBar: {
    paddingVertical: "5%",
    paddingHorizontal: "0%",
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
  },
  fieldContainerBottom: {
    backgroundColor: "#929292",
    height: 1,
    width: "100%",
    marginTop: "0%",
    alignSelf: "center",
  },
});

const barlevels = [
  {
    label: "Pathetically weak",
    labelColor: "#01a7a6",
    activeBarColor: "#01a7a6",
  },
  {
    label: "Extremely weak",
    labelColor: "#01a7a6",
    activeBarColor: "#01a7a6",
  },
  {
    label: "Very weak",
    labelColor: "#01a7a6",
    activeBarColor: "#01a7a6",
  },
  {
    label: "Weak",
    labelColor: "#01a7a6",
    activeBarColor: "#01a7a6",
  },
  {
    label: "So-so",
    labelColor: "#01a7a6",
    activeBarColor: "#01a7a6",
  },
  {
    label: "Average",
    labelColor: "#01a7a6",
    activeBarColor: "#01a7a6",
  },
  {
    label: "Fair",
    labelColor: "#01a7a6",
    activeBarColor: "#01a7a6",
  },
  {
    label: "Strong",
    labelColor: "#01a7a6",
    activeBarColor: "#01a7a6",
  },
  {
    label: "Very strong",
    labelColor: "#01a7a6",
    activeBarColor: "#01a7a6",
  },
  {
    label: "Unbelievably strong",
    labelColor: "#01a7a6",
    activeBarColor: "#01a7a6",
  },
];

export default SearchStocks;
