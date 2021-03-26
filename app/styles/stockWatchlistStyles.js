
import {
    StyleSheet,
  } from "react-native";
  
  import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
  import colours from "../config/colours";
  
  const styles = StyleSheet.create({
    rangeNumber: {
      width: "100%",
      alignSelf: "center",
      textAlign: "center"
    },
    rangeButton7: {
      marginTop: 1,
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
      paddingVertical: 7,
      width: "25%",
      textAlign: "center",
      alignSelf: "center",
      justifyContent: "center",
      backgroundColor: "#ededed",
      borderColor: "#d1d1d1",
      borderWidth: 1
    },
    rangeButtonMid: {
      marginTop: 1,
      
      paddingVertical: 7,
      width: "25%",
      textAlign: "center",
      alignSelf: "center",
      justifyContent: "center",
      backgroundColor: "#ededed",
      borderColor: "#d1d1d1",
      borderTopWidth: 1,
      borderBottomWidth: 1
    },
    rangeButton2Y: {
      marginTop: 1,
      borderBottomRightRadius: 10,
      borderTopRightRadius: 10,
      paddingVertical: 7,
      width: "25%",
      textAlign: "center",
      alignSelf: "center",
      justifyContent: "center",
      backgroundColor: "#ededed",
      borderColor: "#d1d1d1",
      borderWidth: 1
    },
    range: {
      width: "100%",
      flexDirection: "row",
      marginTop: "2%"
    },
    graphKey: {
        marginBottom: "1%",
        marginTop: "3%"
      },
      line1: {
        color: "#cc171d", 
        fontWeight: "700"
      },
      line2: {
        color: "#224373",
        fontWeight: "700"
        },
      topBar: {
        width: "90%",
        marginTop: "1.75%"
      },
      watchlistBtnConatiner: {
        width: '100%',
        position: 'absolute',
        marginRight: '10%',
        marginTop: '1%'
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
        width: "60%",
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
  
  export default styles;