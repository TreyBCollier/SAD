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
  Alert
} from "react-native";
import { Button, SearchBar } from "react-native-elements";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import colours from "../config/colours";
import tickers from "./Ticker"
import names from "./Name"
import { isThisTypeNode } from "typescript";





const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

class SearchStocks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',   
      ticker: [],   
      name: [],   
      test: ["1", "2", "3"],
      
    };

    this.tickerholder = [];
    this.nameholder = [];
    this.filteredArray = [];

    

    
  }

  componentDidMount(){
    this.loadData()
  }

  loadData = async () => {    
    var data1 = tickers.split(', ');
    var data2 = names.split(', ');
  

    this.setState({
      ticker: data1, 
      name: data2
    })

    this.tickerholder = data1; 
    this.nameholder = data2; 

    
    
    
    
  };

  filterlist(text) {
    var filteredList = this.nameholder.filter(name => name.includes(text));
    var i;
    var j;
    var newList = []
    for (i = 0; i < this.nameholder.length; i++) { 
      for(j = 0; j < filteredList.length; j++){
        if(this.nameholder[i] == filteredList[j]){
          text = this.tickerholder[i] + " " + this.nameholder[i];
          newList.push(text)
        }
      }
      

      
    }
    this.filteredArray = newList;
  };

  SampleFunction=(item)=>{
 
    Alert.alert(item);
 
  }
3
4
5
 

  

 


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
                this.filterlist(text)
                this.setState({ search: text })
              
              }}


            />
              
            </View>
            <View>
              { this.filteredArray.map((item, key)=>(
                <Text key={key} style={styles.stockName} onPress={ this.SampleFunction.bind(this, item) }> { item } </Text>)
              )}
            </View>
            
         
          
          
          
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  stockName: {
    fontSize: 20,
    paddingTop: 20,
    textAlign: "left",
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
