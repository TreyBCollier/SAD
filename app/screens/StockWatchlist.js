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

// Importing additional  libraries used in the 'Stock' screen/class
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Table, Row, Rows } from 'react-native-table-component';
import Spinner from 'react-native-loading-spinner-overlay';
import PriceGraph from "../components/graphSingleWatchlist";
import PriceGraphDouble from "../components/graphDouble";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';

// Importing styles used by the Stock class
import styles from '../styles/stockWatchlistStyles';

class StockWatchlist extends React.Component {
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
      isGraph2Visible: true,
      graphKeyIsHidden: true,
      graph2Ticker: "",
      colour: "black",
      graphData: [],
      graphData2: [],
      xMax: 0,
      yMin: 0,
      yMax: 0,
      xMax2: 0,
      yMin2: 0,
      yMax2: 0,
      addIsHidden: true,
      removeIsHidden: false,
      dropdownSelect: 'None',
      defaultDropdown: {label: 'Compare Chart (Default None)', value: 'None' },
      dropdownItems: [{label: 'Compare Chart (Default None)', value: 'None' }],
      
    };
    this.data = [];
    this.stockArray = [];
    this.dataJSON
    this.priceArray = [0];
    this.currentPrice = 0;
    
    this.handleLoad = this.handleLoad.bind(this);
    
    
  }
  

// Functions to be called upon 'mount' of screen/class
componentDidMount() {
  this.readWatchlistDataStart();
}

// Assigning new values to state variables from local storage data
handleLoad = (arr) => {
  var data  = arr[0]
  var tableData = []
  var graphData = arr[1]
  
  for(let i = 0; i < data.length; i++){
      var el = data[i]
      tableData.push(el)
  }

  this.setState(state => ({
    tableData: tableData,
    graphData: graphData,
    spinner: false,
    price: tableData[0][1],
    dropdownItems: arr[2]
  }));
}


// Formats data from local storage into an array usable by the table
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

// Formats data from local storage to be used in the graph
async formatGraph(arr){
  var arrayIn = arr;
  var j;
  var prices = [];
  const {params} = this.props.navigation.state;
  for(j = 0; j < arrayIn.length-1; j++){
    prices.push(arrayIn[j][1])
  }

  var graphData = [];
  var dropdownData = [];
  dropdownData.push({label: 'Compare Chart (Default None)', value: 'None' })
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

  for(let j = 0; j < params.length; j++){
      if(params.list[j] != params.ticker){
          var dropdownItem = {label: params.list[j], value: params.list[j]}
          dropdownData.push(dropdownItem)
      }
  }

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

  return [reverse, dropdownData];
}

// Formats data from local storage to be used in the 2nd line for the graph
async formatGraph2(ticker){
  
  var arrayIn = await this.readWatchlistData(ticker);
  arrayIn = JSON.parse(arrayIn)

  var j;
  var prices = [];
  for(j = 0; j < arrayIn.length-1; j++){

    prices.push(arrayIn[j][1])
  }

  var graphData = [];
  
  var i;
  var xMaxNum = arrayIn.length-1;
  var yMinNum = (Math.min.apply(Math, prices))-5;
  var yMaxNum = (Math.max.apply(Math, prices))+5;

  

  for(i = 0; i < arrayIn.length-1; i++){
    var myDate = new Date( arrayIn[i] *1000);
    var el = {x: ((arrayIn.length-1)-i).toString(), y: arrayIn[i][1]}
    graphData.push(el)
  }

  var reverse = []
  for(let k = graphData.length-1; k > 0; k--){
    reverse.push(graphData[k])
  }

  return [reverse, yMaxNum, yMinNum, xMaxNum];
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
    isGraphHidden: true,
    isGraph2Visible: true,
    graphKeyIsHidden: true,
    dropdownSelect: 'None',
  })
}

// Hides the table and shows the graph 
toggleGraph () {
  this.setState({
    isTableHidden: true,
    isGraphHidden: false
  })
}
  
// Writes stock information to local storage
addToWatchlist = async (companyTicker, companyName) =>{
  var fileName = '../files/'+companyTicker+'.txt'
  // Reads existing data from storage
  var existing = await this.readWatchlist();
  var data = JSON.parse(existing)
  var newFile = []
  // Making sure no duplicates are added to filee
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
readWatchlistDataStart = async () =>{
  const {params} = this.props.navigation.state;
  
  var existing = await this.readWatchlistData(params.ticker, params.name);
  var data = JSON.parse(existing)
  var graphData = await this.formatGraph(data)
  this.handleLoad([data, graphData[0], graphData[1]])
  
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

// Reads and returns everything in the stocks file from local storage
readWatchlistData = async (ticker, name) => {

  var fileName = '../files/'+ticker+'.txt'
  try {
    const value = await AsyncStorage.getItem(fileName)
    if(value !== null) {
      var data = await JSON.parse(value)
      return value
      
      
    }
  } 
  catch(e) {
  }
}
// Reads and returns everything in the watchlist file from local storage
  readWatchlist = async () => {

    try {
      const value = await AsyncStorage.getItem('../files/test.txt')
      if(value !== null) {
        var data = await JSON.parse(value)
        return value
        
        
      }
    } catch(e) {
    }
  }

  // Function changes view from single line graph to double line graph
  changeGraph = async (value) => {

    this.setState({
        yMax2: this.state.yMax,
        yMin2: this.state.yMin,
        xMax2: this.state.xMax,
        graph2Ticker: value,
        graphKeyIsHidden: false,
        })

    var data = []
    if(value != "None"){
        data = await this.formatGraph2(value)
        var graph2 = data[0]
        var yMax = data[1]
        var yMin = data[2]
        var xMax = data[3]

        // Calculating new X and Y axis ranges
        if(this.state.yMax < yMax){
            this.setState({
                yMax2: yMax,
            })
        }
        if(this.state.yMin > yMin){
            this.setState({
                yMin2: yMin,
            })
        }
        if(this.state.xMax < xMax){
            this.setState({
                xMax2: xMax,
            })
        }
        
        this.setState({
            graphData2: graph2,
            isGraphHidden: true,
            isGraph2Visible: false,
            dropdownSelect: value
            })
    }
    else{
        this.setState({
            
            isGraphHidden: false,
            isGraph2Visible: true,
            dropdownSelect: value
            })
    }
  } 

  render() {

    const { params } = this.props.navigation.state;

    // The following defines the custom components created for the 'StockWatchlist' class
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

    const GraphKey = () => (
        <View style={styles.graphKey}>
            <View style={{flexDirection: "row"}}>
                <Text style={styles.line1}>{params.ticker}</Text>
                <View style={{position: "absolute", right: "55%", bottom: "40%", width: "30%", borderBottomColor: '#cc171d', borderBottomWidth: 5,}}></View>
            </View>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={styles.line2}>{this.state.graph2Ticker}</Text>
                <View style={{position: "absolute", right: "55%", width: "30%", borderBottomColor: '#224373', borderBottomWidth: 5,}}></View>
            </View>
        </View>
        )

    const Dropdown = () => (
        <DropDownPicker
    items={this.state.dropdownItems}
    defaultValue={this.state.dropdownSelect}
    containerStyle={{height: 40}}
    style={{backgroundColor: '#fafafa'}}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{backgroundColor: '#fafafa'}}
    onChangeItem={item => {this.changeGraph(item.value); this.setState({dropdownSelect: item.value})}}
/>
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
            onPress={() => this.props.navigation.navigate("Watchlist")}
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
              {"Last Close - " + this.state.tableData[0][0]}
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
              {/* View toggles between table, graph and double graph based on state values */}
              {!this.state.isTableHidden && <PriceTable/>}
              {this.state.isTableHidden && <Dropdown/>}
              {!this.state.graphKeyIsHidden && <GraphKey/>}
              {!this.state.isGraphHidden && <PriceGraph data={this.state.graphData} xMax={this.state.xMax} yMin={this.state.yMin} yMax={this.state.yMax} height={"75%"}/>}
              {!this.state.isGraph2Visible && <PriceGraphDouble data1={this.state.graphData} data2={this.state.graphData2} xMax={this.state.xMax2} yMin={this.state.yMin2} yMax={this.state.yMax2} height={"68%"}/>}
              
            </View>

        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default StockWatchlist;
