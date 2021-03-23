
import {
  StyleSheet,
} from "react-native";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import colours from "../config/colours";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    backgroundImage: {
      width: "100%",
      height: "100%",
      flex: 1,
      bottom: 0,
      alignContent: "center",
    },
    bottom: {
      flex: 1,
      justifyContent: "flex-end",
      marginBottom: "30%",
    },
  
    text: {
      color: "white",
      fontSize: RFPercentage(5),
      fontWeight: "500",
      textAlign: "center",
    },
  
    title: {
      marginBottom: "10%",
    },
  
    logo: {
      width: "90%",
      height: "30%",
      alignSelf: "center",
      resizeMode: "contain",
      marginBottom: "-2.5%",
    },
  
    imgContainer: {
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
  
    buttonContainer: {
      marginTop: 15,
      elevation: 8,
      borderRadius: 10,
      paddingVertical: 0,
      paddingHorizontal: 5,
      width: "90%",
      height: "5%",
      alignSelf: "center",
      justifyContent: "center",
    },
  
    faceboookBtn: {
      backgroundColor: colours.facebook,
    },
    emailBtn: {
      backgroundColor: colours.email,
    },
  
    signupBtn: {
      backgroundColor: "transparent",
      borderWidth: 1.5,
      borderColor: "white",
    },
  
    appButtonText: {
      fontSize: RFPercentage(2),
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
    },
  });

export default styles;