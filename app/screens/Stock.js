import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Button, SearchBar } from "react-native-elements";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import colours from "../config/colours";
import ReactTable from 'react-table'
import { Table, Row, Rows } from 'react-native-table-component';
import stockData from "../files/data.json"


const getCurrentDate=()=>{

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  //Alert.alert(date + '-' + month + '-' + year);
  // You can turn it in to your desired format
  return date + '/' + month + '/' + year;//format: dd-mm-yyyy;
}















const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
var array = [];


class Stock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      tablePage: 0,

      prices: []
      
    };
    this.data = [];
    this.stockArray = [];
    this.dataJSON
    this.priceArray = [];
    this.currentPrice = 0;
  }

  getData(){
    var txt =  JSON.stringify(require("../files/data.json"))

    //  console.log(json)
    
      var result = JSON.parse(txt);
      var stocks = result.stocks
      this.data = stocks
      this.dataJSON = stocks[1]

      this.formatJSON()


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

    function sleep(ms) {
      return new Promise(
        resolve => setTimeout(resolve, ms)
      );
    }
    
    function query(){
      var ticker = "AAPL";
      var name = "THIS NIIIIII";
      
      var url = "https://yahoo-finance-low-latency.p.rapidapi.com/v8/finance/spark?symbols=" + ticker + "&range=2y&interval=1d"
      var apiResults = "";
      var apiArray = [];
      var apiArrayPrice = [];
      const data = null;
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
        
          this.ticker = ticker;
          this.name = name;

          
          
          var result = JSON.parse(this.responseText);
          
        
          var tempApiResults = result[ticker]['close']
          apiResults = ""
          var count = 0
          tempApiResults.forEach(close => {
            var c = close
            apiResults = apiResults + " Day " + count  + " - " + c + "\n"
            apiArray.push(getCurrentDate() + " - " + c)
            apiArrayPrice.push(c)
            count = count + 1
          });
          this.priceArray=apiArrayPrice;
          array = apiArrayPrice
          
        
          //saveAsJSON(tempApiResults, "APPL");

          // This needs saving 
          
        }
      });
      xhr.open("GET", url);
      xhr.setRequestHeader("x-rapidapi-key", "de60c04d78msh37566ebd95793e5p1ae017jsnd330a739399f");
      xhr.setRequestHeader("x-rapidapi-host", "yahoo-finance-low-latency.p.rapidapi.com");
      xhr.send(data);
      
    
    }

     function getPrice() {
      console.log("TEST 1")
       query();
      
      console.log(array)
      return array[0]

    }

    // async function getPrice() {
    //   console.log("TEST 1")
    //   await query();
      
    //   console.log(array)
    //   return array[0]

    // }

    
    
    
    
    const { params } = this.props.navigation.state;
    
  
    
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
            {params.ticker}{"\n"}{params.name}
            </Text>
          </View>

            <View style={styles.searchBar}>
            <Text>
              Current Price
            </Text>
            <Text style={styles.previousClose}>
              {getPrice()}
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
