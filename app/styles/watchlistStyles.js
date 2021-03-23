
import {
    StyleSheet,
  } from "react-native";
  
  import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
  import colours from "../config/colours";
  
  const styles = StyleSheet.create({
    listItem: {
        width: "100%",
      },
      heading: {
        fontSize: RFPercentage(3),
        paddingBottom: "5%",
      },
      stockTicker: {
        fontSize: 30,
        textAlign: "left",
        width: "100%",
      },
      stockName: {
        fontSize: 20,
        width: "80%",
        paddingTop: 5,
        textAlign: "left",
        color: "grey"
    
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
  
  export default styles;