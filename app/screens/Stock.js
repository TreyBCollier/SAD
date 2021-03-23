import React from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Table, Row, Rows } from 'react-native-table-component';
import Spinner from 'react-native-loading-spinner-overlay';
import PriceGraph from "../components/graphSingle";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/stockStyles';

const getCurrentDate=()=>{

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  return date + '/' + month + '/' + year;
}

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

  getData(){
      var txt =  JSON.stringify(require("../files/data.json"))
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
  this.readWatchlistStart();
}

  handleLoad = (num) => {
    this.setState(state => ({
      price: num[0],
      tableData: num[1],
      graphData: num[2]
    }));
    
  }

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

  async getArray(x, y){

    var arrayIn = x;
    var tableArray = [];
    var i;
    for(i = arrayIn.length-2; i > 0; i--){
      var myDate = new Date( y[i] *1000);
      var date = "" + myDate.getDate() + "/" + myDate.getMonth() + "/" + myDate.getFullYear() + ""
      var el = [date, x[i]]
      tableArray.push(el)
    }
    return tableArray
  }

  async formatGraph(arr){
    var arrayIn = arr;
    var j;
    var prices = [];
    for(j = 0; j < arrayIn.length-1; j++){

      prices.push(arrayIn[j][1])
    }

    var graphData = [];
    var i;
    var xMaxNum = arr.length-1;
    var yMinNum = (Math.min.apply(Math, prices))-5;
    var yMaxNum = (Math.max.apply(Math, prices))+5;

    this.setState({
      xMax: xMaxNum,
      yMin: yMinNum,
      yMax: yMaxNum
    });

    for(i = 0; i < arrayIn.length-1; i++){
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
    var graphData = await this.formatGraph(testArray);
   
    
    this.setState({
      spinner: !this.state.spinner
    });

    
    this.handleLoad([testPrice, testArray, graphData])
  
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
  
  addToWatchlist = async (companyTicker, companyName) =>{
    var fileName = '../files/'+companyTicker+'.txt'
    var existing = await this.readWatchlist();
    var data = JSON.parse(existing)
    var newFile = []
    for (let i = 0; i < data.length; i++){
      if(data[i]['ticker'] != companyTicker){
        newFile.push(data[i])
      }
    }
    
    var jsonData = {ticker: companyTicker, name: companyName}
    newFile.push(jsonData)
    try {
      const jsonValue = JSON.stringify(newFile)
      console.log(jsonValue)
      await AsyncStorage.setItem('../files/test.txt', jsonValue)
      const jsonValueTable = JSON.stringify(this.state.tableData)
      await AsyncStorage.setItem(fileName, jsonValueTable)
    } catch (e) {
    }
    this.setState({
      addIsHidden: true,
      removeIsHidden: false
    });
  }

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
    if(found == true){

      this.setState({
        addIsHidden: true,
        removeIsHidden: false
      });
      
    }
  }

  removeFromWatchlist = async (companyTicker, companyName) =>{

    var existing = await this.readWatchlist();
    var data = JSON.parse(existing)
    var newFile = []
    for (let i = 0; i < data.length; i++){
      if(data[i]['ticker'] == companyTicker){
        data.splice(i, 1)
      }
    }

    try {
      const jsonValue = JSON.stringify(data)
      await AsyncStorage.setItem('../files/test.txt', jsonValue)
    } catch (e) {
    }
    this.setState({
      addIsHidden: false,
      removeIsHidden: true
    });
  }

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
  render() {

    const { params } = this.props.navigation.state;

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
              {!this.state.isTableHidden && <PriceTable/>}
              {!this.state.isGraphHidden && <PriceGraph data={this.state.graphData} xMax={this.state.xMax} yMin={this.state.yMin} yMax={this.state.yMax}/>}
            </View>

        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Stock;
