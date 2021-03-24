import React from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

// Importing additional  libraries used in the 'Stock' screen/class
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Table, Row, Rows } from 'react-native-table-component';
import Spinner from 'react-native-loading-spinner-overlay';
import PriceGraph from "../components/graphSingle";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importing styles used by the Stock class
import styles from '../styles/stockStyles';

// Calculating and formatting the current date that the query is made
const getCurrentDate=()=>{
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  return date + '/' + month + '/' + year;
}

class Stock extends React.Component {
  constructor(props) {
    super(props);
    // Initialising all state variables
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
      graphData: [],
      xMax: 0,
      yMin: 0,
      yMax: 0,
      addIsHidden: false,
      removeIsHidden: true,
      
    };
    this.data = [];
    this.stockArray = [];
    this.dataJSON
    this.priceArray = [0];
    this.currentPrice = 0;
    
    this.handleLoad = this.handleLoad.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    
  }
  
// Functions to be called upon 'mount' of screen/class
 componentDidMount() {
  this.checkFile();
  this.fetchAsync();
  this.readWatchlistStart();
}

// Assigning new values to state variables from query data
handleLoad = (num) => {
  this.setState(state => ({
    price: num[0],
    tableData: num[1],
    graphData: num[2]
  }));
}

// Updates the "Current Price" state variable (experimental - pehraps implemented later on)
handlePrice = (num) => {
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
    this.setState({
      colour: "red"
    });
  }
  if(this.state.price == this.state.previousPrice){
    this.setState({
      colour: "black"
    });
  }
}

// Formats data from query into an array usable by the table
async getArray(x, y){

  var arrayIn = x;
  var tableArray = [];
  var i;
  for(i = arrayIn.length-2; i > 0; i--){
    // Converts a Unix Epoch date into a standard dd/mm/yyyy format
    var myDate = new Date( y[i] *1000);
    var date = "" + myDate.getDate() + "/" + myDate.getMonth() + "/" + myDate.getFullYear() + ""
    var el = [date, x[i]]
    tableArray.push(el)
  }
  return tableArray
}

//  Formats data from query to be used in the graph
async formatGraph(arr){
  var arrayIn = arr;
  var j;
  var prices = [];
  for(j = 0; j < arrayIn.length-1; j++){
    prices.push(arrayIn[j][1])
  }

  var graphData = [];
  var i;
  // Calculates the ranges of the graphs X and Y axis
  var xMaxNum = arr.length-1;
  var yMinNum = (Math.min.apply(Math, prices))-5;
  var yMaxNum = (Math.max.apply(Math, prices))+5;

  this.setState({
    xMax: xMaxNum,
    yMin: yMinNum,
    yMax: yMaxNum
  });

  for(i = 0; i < arrayIn.length-1; i++){
    // Converts a Unix Epoch date into a standard dd/mm/yyyy format
    var myDate = new Date( arr[i] *1000);
    var date = "" + myDate.getDate() + "/" + myDate.getMonth() + "/" + myDate.getFullYear() + ""
    var el = {x: ((arrayIn.length-1)-i).toString(), y: arr[i][1], meta: date}
    graphData.push(el)
  }

  var reverse = []
  for(let k = graphData.length-1; k > 0; k--){
    reverse.push(graphData[k])
  }
  return reverse;
}
  
// Makes a call to the Yahoo Finance API and returns the current price and price history
async fetchData(x){
  var tempArray;
  var testPrice;
  var result;
  var time;
  const {params} = this.props.navigation.state;

  var ticker = params.ticker;

  // Making the call using an XMLHttpRequest and waits for thee data to be ready 
  x.addEventListener("readystatechange", function () {
    if (this.readyState == 4) {
      result = JSON.parse(this.responseText);
      tempArray = result[ticker]['close'];
      time = result[ticker]['timestamp'];
      testPrice = tempArray[tempArray.length-1]
    }
  });
  // Sleeps to allow time for thee data to be retreived before continuing
  await this.sleep(750)
  var priceArray = this.getArray(tempArray, time)
  
  return [testPrice, priceArray]
}

async fetchAsync () {

  // New XMLHttpRequest
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  const {params} = this.props.navigation.state;

  var ticker = params.ticker;

  // Initialising the XMLHttpRequest
  var url = "https://yahoo-finance-low-latency.p.rapidapi.com/v8/finance/spark?symbols=" + ticker + "&range=2y&interval=1d"
  xhr.open('get', url, true);
  xhr.setRequestHeader("x-rapidapi-key", "de60c04d78msh37566ebd95793e5p1ae017jsnd330a739399f");
  xhr.setRequestHeader("x-rapidapi-host", "yahoo-finance-low-latency.p.rapidapi.com");
  xhr.send();
  
  // Assigning the data from the API
  var data = await this.fetchData(xhr)
  var testPrice = data[0]
  var testArray = data[1]['_W']
  var graphData = await this.formatGraph(testArray);
  
  // Stops the loading spinner when the data has been retrieved
  this.setState({
    spinner: !this.state.spinner
  });

  // Parses data to method to set state variables
  this.handleLoad([testPrice, testArray, graphData])
}

// Function to "sleep" activities for specified number of milliseconds
sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}

// Hides the graph and shows the table
toggleTable () {
  this.setState({
    isTableHidden: false,
    isGraphHidden: true
  })
}

// Hides the table and shows the graph 
toggleGraph () {
  this.setState({
    isTableHidden: true,
    isGraphHidden: false
  })
}

// If the local storage file does not exist, then creates it
checkFile = async () => {
  var empty = "";
  if(await AsyncStorage.getItem('../files/test.txt')){
  }
  else{
    await AsyncStorage.setItem('../files/test.txt', empty)
  }
}

// Writes stock information to local storage
addToWatchlist = async (companyTicker, companyName) =>{
  var fileName = '../files/'+companyTicker+'.txt'
  // Reads existing data from storage
  var existing = await this.readWatchlist();
  var data = JSON.parse(existing)
  var newFile = []
  // Making sure no duplicates are added to file
  for (let i = 0; i < data.length; i++){
    if(data[i]['ticker'] != companyTicker){
      newFile.push(data[i])
    }
  }
  // Adding the new stock to the array
  var jsonData = {ticker: companyTicker, name: companyName}
  newFile.push(jsonData)
  try {
    // Writing the stock names and tickers to the watchlist file
    const jsonValue = JSON.stringify(newFile)
    await AsyncStorage.setItem('../files/test.txt', jsonValue)
    // Writing the individual stock data to its own file
    const jsonValueTable = JSON.stringify(this.state.tableData)
    await AsyncStorage.setItem(fileName, jsonValueTable)
  } catch (e) {
  }
  // Changes the Add/Remove watchlist button
  this.setState({
    addIsHidden: true,
    removeIsHidden: false
  });
}

// Reads the watchlist upon class mount to determine if the stock is in the watchlist or not
readWatchlistStart = async () =>{
  const {params} = this.props.navigation.state;
  var existing = await this.readWatchlist();
  var data = JSON.parse(existing)
  var found = false;
  for (let i = 0; i < data.length; i++){
    if(data[i]['ticker'] == params.ticker){

      found = true
      break
    }
  }
  // If stock is already in watchlist ensure "Remove from Watchlist" button is displayed
  if(found == true){
    this.setState({
      addIsHidden: true,
      removeIsHidden: false
    });
    
  }
}

// Removes a given stock from the watchlist
removeFromWatchlist = async (companyTicker, companyName) =>{
  var existing = await this.readWatchlist();
  var data = JSON.parse(existing)
  var newFile = []
  for (let i = 0; i < data.length; i++){
    // If the given stock is found, remove it from the array
    if(data[i]['ticker'] == companyTicker){
      data.splice(i, 1)
    }
  }

  try {
    // Writes the adjusted array to local storage
    const jsonValue = JSON.stringify(data)
    await AsyncStorage.setItem('../files/test.txt', jsonValue)
  } catch (e) {
  }
  this.setState({
    addIsHidden: false,
    removeIsHidden: true
  });
}

// Reads and returns everything in the watchlist file from local storage
readWatchlist = async () => {
  try {
    const value = await AsyncStorage.getItem('../files/test.txt')
    if(value !== null) {
      var data = await JSON.parse(value)
      return value
    }
  } 
  catch(e) {
  }
}

  render() {

    const { params } = this.props.navigation.state;

    // The following defines the custom components created for the 'Stock' class
    const PriceTable = () => (
      <Table borderStyle={{borderWidth: 2, borderColor: '#b5b5b5'}}>
                <Row data = {["Date", "Price"]} style={styles.head} textStyle={styles.text}/>
                <Rows data = {this.state.tableData} textStyle={styles.text}/>
      </Table>
    )

    const AddToWatch = () => (
      <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.addToWatchlist(params.ticker, params.name)}
              style={[styles.buttonContainer, styles.watchlistBtn]}
            >
              <Text style ={styles.watchlistButtonText}>Add to Watchlist</Text>
            </TouchableOpacity>
    )

    const RemoveFromWatch = () => (
      <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.removeFromWatchlist(params.ticker, params.name)}
              style={[styles.buttonContainer, styles.watchlistBtn]}
            >
              <Text style ={styles.watchlistButtonText}>Remove from Watchlist</Text>
            </TouchableOpacity>
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

          <View style = {styles.watchlistBtnConatiner}>
          {/* View toggles between Add and Remove buttons */}
          {!this.state.addIsHidden && <AddToWatch/>}
          {!this.state.removeIsHidden && <RemoveFromWatch/>}

          </View>

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
            {/* View toggles between table and graph depending on state values */}
              {!this.state.isTableHidden && <PriceTable/>}
              {!this.state.isGraphHidden && <PriceGraph data={this.state.graphData} xMax={this.state.xMax} yMin={this.state.yMin} yMax={this.state.yMax}/>}
            </View>

        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Stock;
