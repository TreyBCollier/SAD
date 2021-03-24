import React from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
// Importing additional  libraries used in the 'Stock' screen/class
import { Button, SearchBar } from "react-native-elements";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
// Importing company ticker and name data
import tickers from "../files/Ticker";
import names from "../files/Name";

// Importing styles used by the Stock class
import styles from '../styles/searchStockStyles';

class SearchStocks extends React.Component {
  constructor(props) {
    super(props);
    // Initialising all state variables
    this.state = {
      search: '',   
      ticker: [],   
      name: [],   
    };

    this.tickerholder = [];
    this.nameholder = [];
    this.filteredNameArray = [];
    this.filteredTickerArray = [];
  }

  // Functions to be called upon 'mount' of screen/class
  componentDidMount(){
    this.loadData()
  }

  // Loads the company names and tickers from file and assigns them to variables
  loadData = async () => {    
    // Data is stored as arrays so split by ','
    var data1 = tickers.split(', ');
    var data2 = names.split(', ');
    this.filteredNameArray = data2;
    this.filteredTickerArray = data1;

    this.setState({
      ticker: data1, 
      name: data2
    })

    this.tickerholder = data1; 
    this.nameholder = data2; 
  };

  // Method filters the list on screen depending on user input
  filterlist(textIn) {
    var text = textIn.toUpperCase();
    // Filters Name and Ticker arrays based on user input
    var filteredListName = this.nameholder.filter(name => name.toUpperCase().includes(text));
    var filteredListTicker = this.tickerholder.filter(name => name.includes(text));
    var i;
    var j;
    var newNameListName = []
    var newTickerListName = []
    var newNameListTicker = []
    var newTickerListTicker = []
    var emptyList = []
    // Adjusting the Name list
    for (i = 0; i < this.nameholder.length; i++) { 
      for(j = 0; j < filteredListName.length; j++){
        if(this.nameholder[i] == filteredListName[j]){
          var nameText = this.nameholder[i];
          var tickerText = this.tickerholder[i];
          newNameListName.push(nameText)
          newTickerListName.push(tickerText)
        }
      }
    }
    // Adjusting the Ticker list
    for (i = 0; i < this.tickerholder.length; i++) { 
      for(j = 0; j < filteredListTicker.length; j++){
        if(this.tickerholder[i] == filteredListTicker[j]){
          var nameText = this.nameholder[i];
          var tickerText = this.tickerholder[i];
          newNameListTicker.push(nameText)
          newTickerListTicker.push(tickerText)
        }
      }
    }
    // Combining Ticker and Name list with no duplicates
    this.filteredNameArray = newNameListTicker.concat(newNameListName);
    this.filteredTickerArray = newTickerListTicker.concat(newTickerListName)
    if(text.length < 1){
      this.filteredNameArray = this.state.name
      this.filteredTickerArray = this.state.ticker
    }
  };

  render() {
    this.arrayholder = [];
  
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
                fontSize: RFPercentage(3),
              }}
            >
              Search Stocks
            </Text>
          </View>

          
            <View style={styles.searchBar}>
            <SearchBar
              placeholder="Ticker"
              platform = "ios"
              value={this.state.search}
              onChangeText={(text) => {
                // On change text, filter the list
                this.filterlist(text)
                this.setState({ search: text })
              }}
            />
              
            </View>
            <View>
              {/* Mapping the values in the array into a list */}
              { this.filteredNameArray.map((item, key)=>(
                <TouchableOpacity 
                  style={styles.listItem}
                  // Parses variables to the 'Stock' class on navigation
                  onPress={() => this.props.navigation.navigate("Stock", {name: item, ticker: this.filteredTickerArray[key]},)}
                >
                  
                    <View>
                    <Text 
                    style={styles.stockTicker} > 
                      {this.filteredTickerArray[key] }
                      
                    </Text>
                    <View style={{
                          width: "100%",
                          position: "absolute",
                          alignItems: "flex-end",
                          marginTop: "5%"
                          
                          
                        }}>
                    <Icon
                        color="black"
                        name="arrow-right"
                        size={25}
                      />
                    </View>
                  
                  <Text 
                    style={styles.stockName} > 
                      { this.filteredNameArray[key] }
                      
                    </Text>
                    <View
                      style={{
                        borderBottomColor: 'grey',
                        borderBottomWidth: 1,
                        marginTop: "2%",
                        marginBottom: "5%",
                      }}
                    />
                    </View>
                  </TouchableOpacity>)
              )}
            </View>
            
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default SearchStocks;
