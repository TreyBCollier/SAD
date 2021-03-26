import React from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();

// Importing additional  libraries used in the 'Stock' screen/class
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importing styles used by the Stock class
import styles from '../styles/watchlistStyles';

class Watchlist extends React.Component {
  constructor(props) {
    super(props);
    // Initialising all state variables
    this.state = {
      search: '',   
      ticker: [],   
      name: [],   
      watchlistLength: 0,
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

  sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }

  // Loads the company names and tickers from local storage and assigns them to variables
  loadData = async () => {    

    var data1 = []
    var data2 =[]
    var myTicker = []
    var myName =[]

    var existing = await this.readWatchlist();
    var data = JSON.parse(existing)
   
    for (let i = 0; i < data.length; i++){
      myTicker.push(data[i]['ticker'])
      myName.push(data[i]['name'])
    }

    this.handleLoad(myTicker, myName)
    this.setState({
      watchlistLength: data.length,
      ticker: data1, 
      name: data2
    })
  };

  // Assigning new values to state variables from query data
  handleLoad = (data1, data2) => {
    this.setState(state => ({
        ticker: data1, 
        name: data2
    }));
    this.tickerholder = data1; 
    this.nameholder = data2; 
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
              style={styles.heading}
            >
              Watchlist
            </Text>
          </View>

            <View>
              { this.nameholder.map((item, key)=>(
                <View key={item}>
                  <TouchableOpacity 
                  style={styles.listItem}
                  onPress={() => this.props.navigation.navigate("StockWatchlist", {list: this.tickerholder, length: this.state.watchlistLength, name: item, ticker: this.tickerholder[key]})}
                >
                  
                    <View>
                    <Text 
                    style={styles.stockTicker} > 
                      {this.tickerholder[key] }
                      
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
                      { item }
                      
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
                  </TouchableOpacity>
                </View>
                )
              )}
            </View>

        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Watchlist;
