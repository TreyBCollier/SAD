import React, { useCallback } from "react";
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
import Spinner from 'react-native-loading-spinner-overlay';
import watchlistJson from "../files/watchlist.json"
import { ThemeConsumer } from "styled-components";







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
var array = [69];
var testPrice;


class Stock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      tablePage: 0,
      price: " ",
      previousPrice: " ",
      tableData: [["",""],["",""]],
      spinner: true,
      isTableHidden: false,
      isGraphHidden: true,
      colour: "black",
      
    };
    this.data = [];
    this.stockArray = [];
    this.dataJSON
    this.priceArray = [69];
    this.currentPrice = 0;
    
    this.handleLoad = this.handleLoad.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    
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
  

  
 componentDidMount() {
  this.fetchAsync();
  //this.interval = setInterval(() => this.fetchPrice(), 60000);
}

  handleLoad = (num) => {

    this.setState(state => ({
      price: num[0],
      tableData: num[1]
    }));
    
  }

  handlePrice = (num) => {
    console.log(num)
    this.setState(state => ({
      previousPrice: this.state.price,
      price: num,
    }));

    if(this.state.price > this.state.previousPrice){
      this.setState({
        colour: "green"
      });
    }
    if(this.state.price < this.state.previousPrice){
      console.log("RED")
      this.setState({
        colour: "red"
      });
    }
    if(this.state.price == this.state.previousPrice){
      console.log("BLACK")
      this.setState({
        colour: "black"
      });
    
    }

    
    
    
  }

  async getArray(x, y){

    var arrayIn = x;
    var tableArray = [];
    var i;
    var day = 1;
    for(i = arrayIn.length-2; i > 0; i--){
      var myDate = new Date( y[i] *1000);
      var date = "" + myDate.getDate() + "/" + myDate.getMonth() + "/" + myDate.getFullYear() + ""
      var el = [date, x[i]]
      tableArray.push(el)
    }
   
    
    return tableArray
 
  }
  
  async fetchData(x){
    var tempArray;
    var testPrice;
    var result;
    var time;
    const {params} = this.props.navigation.state;

    var ticker = params.ticker;

    x.addEventListener("readystatechange", function () {
      if (this.readyState == 4) {
        result = JSON.parse(this.responseText);
        tempArray = result[ticker]['close'];
        time = result[ticker]['timestamp'];
        testPrice = tempArray[tempArray.length-1]
      }
    });
    await this.sleep(750)
    var priceArray = this.getArray(tempArray, time)
    
    return [testPrice, priceArray]
  }

  async getPrice(x){
    var tempArray;
    var testPrice;
    var result;
    const {params} = this.props.navigation.state;

    var ticker = params.ticker;

    x.addEventListener("readystatechange", function () {
      if (this.readyState == 4) {
        result = JSON.parse(this.responseText);
        tempArray = result[ticker]['close'];
        testPrice = tempArray[tempArray.length-1]
      }
    });
    await this.sleep(750)
    
    return testPrice
  }

  async fetchAsync () {

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    const {params} = this.props.navigation.state;

    var ticker = params.ticker;

    var url = "https://yahoo-finance-low-latency.p.rapidapi.com/v8/finance/spark?symbols=" + ticker + "&range=2y&interval=1d"

    xhr.open('get', url, true);
    xhr.setRequestHeader("x-rapidapi-key", "de60c04d78msh37566ebd95793e5p1ae017jsnd330a739399f");
    xhr.setRequestHeader("x-rapidapi-host", "yahoo-finance-low-latency.p.rapidapi.com");
    xhr.send();
    
    var data = await this.fetchData(xhr)
    var testPrice = data[0]
    var testArray = data[1]['_W']
   
    
    this.setState({
      spinner: !this.state.spinner
    });
    
    this.handleLoad([testPrice, testArray])
  
  }

  async fetchPrice () {

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    const {params} = this.props.navigation.state;

    var ticker = params.ticker;

    var url = "https://yahoo-finance-low-latency.p.rapidapi.com/v8/finance/spark?symbols=" + ticker + "&range=2y&interval=1d"

    xhr.open('get', url, true);
    xhr.setRequestHeader("x-rapidapi-key", "de60c04d78msh37566ebd95793e5p1ae017jsnd330a739399f");
    xhr.setRequestHeader("x-rapidapi-host", "yahoo-finance-low-latency.p.rapidapi.com");
    xhr.send();
    
    var data = await this.getPrice(xhr)
    var testPrice = data
    
    this.handlePrice(testPrice)
  
  }

  sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }

  toggleTable () {
    this.setState({
      isTableHidden: false,
      isGraphHidden: true
    })
  }

  toggleGraph () {
    this.setState({
      isTableHidden: true,
      isGraphHidden: false
    })
  }
  
  addToWatchlist(companyTicker, companyName){
    var jsonData = {
      ticker: companyTicker,
      name: companyName
    }
  

  }


  render() {

    const { params } = this.props.navigation.state;

    const PriceTable = () => (
      <Table borderStyle={{borderWidth: 2, borderColor: '#b5b5b5'}}>
                <Row data = {["Date", "Price"]} style={styles.head} textStyle={styles.text}/>
                <Rows data = {this.state.tableData} textStyle={styles.text}/>
      </Table>
    )
    const PriceGraph = () => (
      <Text>Wag1 Fam</Text>
    )
    
    return (
      
      <SafeAreaView
        style={{ flex: 1, alignContent: "center", justifyContent: "center", backgroundColor: 'white' }}
      >
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
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

          <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.addToWatchlist(params.ticker, params.name)}
              style={[styles.buttonContainer, styles.watchlistBtn]}
            >
              <Text style ={styles.watchlistButtonText}>Add to Watchlist</Text>
            </TouchableOpacity>



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
              {"Current Price - " + getCurrentDate()}
            </Text>
            <Text style={[styles.previousClose, {color: this.state.colour}]} >
              {this.state.price}
            </Text>
            </View>

            <View style={styles.splitButton}>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.buttonContainerLeft, styles.tableBtn]}
              onPress={() => this.toggleTable()}
            >
              <Text style={styles.appButtonText}>View Table</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.buttonContainerRight, styles.graphBtn]}
              onPress={() => this.toggleGraph()}
            >
              <Text style={styles.appButtonText}>View Graph</Text>
            </TouchableOpacity>
            </View>

            <View>
              {!this.state.isTableHidden && <PriceTable/>}
              {!this.state.isGraphHidden && <PriceGraph/>}
            </View>

            
            
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  topBar: {
    width: "90%",
    marginTop: "1.75%"
  },

  watchlistBtn: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "black",
    color: "black"
  },

  splitButton: {
    flexDirection: "row",
    marginBottom: "5%"
  
  },
  tableBtn: {
    backgroundColor:"#cc171d",
  },
  graphBtn: {
    backgroundColor: "#192f4f",
  },
  head: { 
    height: 40, 
    backgroundColor: '#d1d1d1' 
  },
  text: { 
    margin: 6 
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
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
    
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 0,
    paddingHorizontal: 5,
    width: "50%",
    alignSelf: "center",
    justifyContent: "center",
    position: "absolute",
    textAlign: "center",
    alignSelf: "flex-end",
    marginTop: "2%",
  },
  watchlistButtonText: {
    fontSize: RFPercentage(1.8),
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
  },

  buttonContainerLeft: {
    marginTop: 1,

    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 5,
    width: "50%",
    
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: colours.email,
  },
  buttonContainerRight: {
    marginTop: 1,

    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 5,
    width: "50%",
    
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
