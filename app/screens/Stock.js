import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  SafeAreaView,
  
} from "react-native";
import { Button, SearchBar } from "react-native-elements";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import colours from "../config/colours";
import ReactTable from 'react-table'
import { Table, Row, Rows } from 'react-native-table-component';
import stockData from "../files/data.json"




const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

class Stock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      tablePage: 0,
      
    };
    this.data = [];
    this.stockArray = [];
  }

  
  getData(){
    var txt =  JSON.stringify(require("../files/data.json"))

    //  console.log(json)
    
      var result = JSON.parse(txt);
      var stocks = result.stocks
      this.data = stocks

      this.formatJSON()
      console.log(this.data)

      return this.data;
  }

  formatJSON = async () =>{
    var i;
    var newArray = [];
    for(i = 0; i < this.data.length; i++){
      var tempArray = [];
      tempArray.push(this.data[i].ticker)
      tempArray.push(this.data[i].close)
      newArray.push(tempArray);
    }
    
    this.data = newArray;

  }
  

  


  render() {

    // var data = this.users.map(function(item) {
    //   return {
    //     key: item.ticker,
    //     label: item.close
    //   };
    // });
  
    
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
            onPress={() => this.props.navigation.navigate("searchStocks")}
          />

          <View
            style={{
              flexDirection: "row",
              marginTop: "5%",
              marginLeft: "0%",
              alignItems: "left",
              justifyContent: "left",
            }}
          >
            <Text style={styles.stockName}>
              [STOCK NAME]
            </Text>
          </View>

          
            <View style={styles.searchBar}>
            <Text>
              Previous Close
            </Text>
            <Text style={styles.previousClose}>
              42.49
              
            </Text>

            
        
            </View>

            <View>
              <Table>
                <Row data = {["Ticker", "Price"]}/>
                <Rows data = {this.getData()}/>
              
                
                
              </Table>
                        
                        
                   
                   
            </View>
            
            
         
          
          
          
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  
  previousClose: {
    fontSize: 30,
    marginTop: "3%",
    textAlign: "left",
    position: "relative",
    textAlign: "right",
    width: "100%",
  },
  stockName: {
    fontSize: RFPercentage(3),

  },
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



export default Stock;
