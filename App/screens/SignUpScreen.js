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
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Button, Card, Input, CheckBox, Overlay } from "react-native-elements";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import colours from "../config/colours";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: null,
      last_name: null,
      email: null,
      username: null,
      password: "",
      confirm_password: "",

      all_emails: [],

      emailCheck: true,
      checkingData: false,

      eight_characters_constraint: "close-circle-outline",
      upper_lower_constraint: "close-circle-outline",
      one_number_constraint: "close-circle-outline",

      confirm_password_show: true,
      password_show: true,
      checked_terms: false,
      password_constraints: false,

      show_terms: false,
      show_privacy: false,

      opacity: 0.3,
    };

    this.handleChecked = this.handleChecked.bind(this);
    this.passwordChecker = this.passwordChecker.bind(this);
    this.passwordConstraints = this.passwordConstraints.bind(this);
    this.signupUser = this.signupUser.bind(this);
  }

  // on confirming terms and conditions checks that no fields are blank
  // also verifies that the email hasn't already been submitted
  allFieldsCorrect() {
    if (this.state.first_name != null) {
      if (this.state.last_name != null) {
        if (this.state.email != null) {
          if (this.checkEmailIsUnique(this.state.email)) {
            if (this.state.username != null) {
              if (this.state.password != null && this.passwordConstraints()) {
                if (
                  this.state.confirm_password != null &&
                  this.state.confirm_password == this.state.password
                ) {
                  console.log("hello");
                  return true;
                } else {
                  alert("Please confirm your password");
                  return false;
                }
              } else {
                alert("Please provide a Password that follows the constraints");
                return false;
              }
            } else {
              alert("Please provide a Username");
              return false;
            }
          } else return false;
        } else {
          alert("Please provide an Email address");
          return false;
        }
      } else {
        alert("Please provide a Last Name");
        return false;
      }
    } else {
      alert("Please provide a First Name");
      return false;
    }
  }

  passwordConstraints() {
    var pass = this.state.password;
    if (
      pass.toUpperCase() != pass &&
      pass.toLowerCase() != pass && // contains at least one uppercase and one lowercase char
      pass.length >= 8 && // contains more than 8 chars
      pass.match(/\d+/g) != null
    ) {
      // contains at least one number
      return true;
    } else return false;
  }

  async componentDidMount() {
    await loadExistingEmails(); // load all emails currently in the system
    this.setState({ all_emails: emails });
  }

  componentDidUpdate() {
    if (this.state.checked) {
      // if user changed data after checking the box, re-run the verifications
      if (this.allFieldsCorrect() == false) {
        this.setState({ checked: false, opacity: 0.3 });
      }
    }
  }

  checkEmailIsUnique(email) {
    if (this.validateEmail(email)) {
      // checks email fits the email regex
      if (emails.findIndex((element) => element == email.toLowerCase()) == -1) {
        // checks if email is in the system
        return true;
      } else {
        alert("A user with this email already exists!");
        return false;
      }
    } else {
      alert("Incorrect email address format!");
      return false;
    }
  }

  // password checked for the overlay showing password strength
  passwordChecker(pass) {
    if (pass.toUpperCase() != pass && pass.toLowerCase() != pass) {
      this.setState({ upper_lower_constraint: "check-circle" });
    } else this.setState({ upper_lower_constraint: "close-circle-outline" });
    if (pass.length >= 8) {
      this.setState({ eight_characters_constraint: "check-circle" });
    } else
      this.setState({ eight_characters_constraint: "close-circle-outline" });
    if (pass.match(/\d+/g) != null) {
      this.setState({ one_number_constraint: "check-circle" });
    } else this.setState({ one_number_constraint: "close-circle-outline" });
    this.setState({ password: pass, password_constraints: true });
  }

  // Method when user confirms having read terms and conditions
  // Runs all checks in the allFieldsCorrect method and makes the next screen accessible
  // if return is true
  handleChecked() {
    if (this.allFieldsCorrect()) {
      this.setState({ checked: !this.state.checked });
      if (!this.state.checked) {
        this.setState({ opacity: 1 });
      } else this.setState({ opacity: 0.3 });
    } else if (this.state.checked == true) {
      this.setState({ checked: false });
    }
  }

  // Sets global variables so that the data can later
  // be pushed into firestore
  signupUser() {
    global.first_name = this.state.first_name;
    global.last_name = this.state.last_name;
    global.username = this.state.username;
    global.email = this.state.email;
    global.password = this.state.password;
    global.is_org = false;
    createUser();
    this.props.navigation.navigate("SignUp2");
  }

  // Basic email validation through regex
  validateEmail(email) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }

  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
      >
        {this.state.checkingData && (
          <View style={{ alignItems: "center", top: "500%" }}>
            <ActivityIndicator
              animating={true}
              color={"#01a7a6"}
              style={{ top: "30%" }}
              size="large"
            />
          </View>
        )}
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

          <Text style={styles.titleText}>Create an Account</Text>

          <TouchableOpacity onPress={() => this.refs.FirstName.focus()}>
            <View style={styles.fieldContainer}>
              <Text style={styles.inputHeader}>First Name</Text>
              <Input
                ref="FirstName"
                containerStyle={styles.inputContainer}
                value={this.state.first_name}
                onChangeText={(text) => this.setState({ first_name: text })}
                inputStyle={styles.input}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                placeholder=". . ."
              />
            </View>
            <View style={styles.fieldContainerBottom} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.refs.LastName.focus()}>
            <View style={styles.fieldContainer}>
              <Text style={styles.inputHeader}>Last Name</Text>
              <Input
                ref="LastName"
                containerStyle={styles.inputContainer}
                value={this.state.last_name}
                onChangeText={(text) => this.setState({ last_name: text })}
                inputStyle={styles.input}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                placeholder=". . ."
              />
            </View>
            <View style={styles.fieldContainerBottom} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.refs.username.focus()}>
            <View style={styles.fieldContainer}>
              <Text style={styles.inputHeader}>Username</Text>
              <Input
                ref="username"
                containerStyle={styles.inputContainer}
                value={this.state.username}
                onChangeText={(text) => this.setState({ username: text })}
                inputStyle={styles.input}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                placeholder=". . ."
              />
            </View>
            <View style={styles.fieldContainerBottom} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.refs.email.focus()}>
            <View style={styles.fieldContainer}>
              <Text style={styles.inputHeader}>Email</Text>
              <Input
                ref="email"
                containerStyle={styles.inputContainer}
                value={this.state.email}
                keyboardType="email-address"
                onChangeText={(text) => this.setState({ email: text })}
                inputStyle={styles.input}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                placeholder=". . ."
              />
            </View>
            <View style={styles.fieldContainerBottom} />
          </TouchableOpacity>

          {this.state.password_constraints && (
            <View
              style={{
                backgroundColor: "white",
                width: windowWidth * 0.85,
                height: windowHeight * 0.35,
                position: "absolute",
                top: 150,
                shadowColor: "grey",
                borderRadius: 5,
                shadowOffset: { width: 4, height: 4 },
                shadowOpacity: 0.5,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  bottom: -16,
                  width: 0,
                  height: 0,
                  borderLeftWidth: 30,
                  borderRightWidth: 30,
                  borderTopWidth: 40,
                  borderStyle: "solid",
                  backgroundColor: "transparent",
                  borderLeftColor: "transparent",
                  borderRightColor: "transparent",
                  borderTopColor: "white",
                }}
              />

              <Text style={styles.boldText}>Password Requirements: </Text>

              <View
                style={{
                  flexDirection: "row",
                  paddingLeft: "10%",
                  paddingBottom: "2%",
                }}
              >
                <Icon
                  name={this.state.eight_characters_constraint}
                  color={colours.email}
                />
                <Text style={styles.constraintsText}>
                  {" "}
                  At least 8 characters{" "}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  paddingLeft: "10%",
                  paddingBottom: "2%",
                }}
              >
                <Icon
                  name={this.state.upper_lower_constraint}
                  color={colours.email}
                />
                <Text style={styles.constraintsText}>
                  {" "}
                  Both upper & lowercase letters{" "}
                </Text>
              </View>

              <View style={{ flexDirection: "row", paddingLeft: "10%" }}>
                <Icon
                  name={this.state.one_number_constraint}
                  color={colours.email}
                />
                <Text style={styles.constraintsText}>
                  {" "}
                  At least one number{" "}
                </Text>
              </View>
            </View>
          )}
          <TouchableOpacity onPress={() => this.refs.pass.focus()}>
            <View style={styles.fieldContainer}>
              <Text style={styles.inputHeader}>Password</Text>
              <Input
                ref="pass"
                containerStyle={styles.inputContainer}
                onBlur={() => {
                  this.setState({ password_constraints: false });
                  this.setState({ ios_height: "5%" });
                  this.setState({ android_height: "10%" });
                }}
                onFocus={() => {
                  this.setState({ password_constraints: true });
                  this.setState({ ios_height: -50 });
                  this.setState({ android_height: -100 });
                }}
                value={this.state.password}
                secureTextEntry={this.state.password_show}
                onChangeText={(pass) => {
                  this.passwordChecker(pass);
                  this.setState({ password: pass });
                }}
                inputStyle={styles.input}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                placeholder=". . ."
              />
              <View
                style={{
                  color: "#929292",
                  fontSize: 18,
                  textAlign: "left",
                  left: 0,
                  top: "3%",
                }}
              >
                <Icon
                  name="eye"
                  color="#929292"
                  size={20}
                  onPress={() =>
                    this.setState({ password_show: !this.state.password_show })
                  }
                />
              </View>
            </View>
            <View style={styles.fieldContainerBottom} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.refs.confirmPass.focus()}>
            <View style={styles.fieldContainer}>
              <Text style={styles.inputHeader}>Comfirm</Text>
              <Input
                ref="confirmPass"
                containerStyle={styles.inputContainer}
                onBlur={() => {
                  this.setState({ ios_height: "5%" });
                  this.setState({ android_height: "10%" });
                }}
                onFocus={() => {
                  this.setState({ ios_height: -100 });
                  this.setState({ android_height: -200 });
                }}
                value={this.state.confirm_password}
                secureTextEntry={this.state.confirm_password_show}
                onChangeText={(text) =>
                  this.setState({ confirm_password: text })
                }
                inputStyle={styles.input}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                placeholder=". . ."
              />
              <View
                style={{
                  color: "#929292",
                  fontSize: 18,
                  position: "relative",
                  alignSelf: "flex-end",
                  top: "3%",
                }}
              >
                <Icon
                  name="eye"
                  color="#929292"
                  size={20}
                  onPress={() =>
                    this.setState({
                      confirm_password_show: !this.state.confirm_password_show,
                    })
                  }
                />
              </View>
            </View>
            <View style={styles.fieldContainerBottom} />
          </TouchableOpacity>

          <Overlay isVisible={this.state.show_terms}>
            <SafeAreaView>
              <Icon
                color="black"
                name="close-circle-outline"
                size={25}
                style={{
                  marginLeft: "5%",
                  marginBottom: "1.75%",
                  marginTop: "1.75%",
                }}
                onPress={() => this.setState({ show_terms: false })}
              />
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ height: "95%" }}
              >
                <Text style={styles.text3}>Terms of use</Text>
                <Text style={styles.text4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Malesuada pellentesque elit eget gravida cum sociis natoque.
                  Nulla aliquet enim tortor at auctor urna nunc id. Odio morbi
                  quis commodo odio aenean sed. Urna duis convallis convallis
                  tellus id interdum velit laoreet id. In dictum non consectetur
                  a erat nam at lectus. Ipsum suspendisse ultrices gravida
                  dictum fusce ut. Consectetur adipiscing elit pellentesque
                  habitant morbi tristique senectus et. Elementum tempus egestas
                  sed sed. Nisl nunc mi ipsum faucibus. Gravida cum sociis
                  natoque penatibus et magnis dis parturient montes. Laoreet non
                  curabitur gravida arcu ac tortor dignissim. Accumsan in nisl
                  nisi scelerisque eu ultrices vitae auctor. Porta non pulvinar
                  neque laoreet suspendisse interdum. Ornare lectus sit amet est
                  placerat in egestas. Fringilla est ullamcorper eget nulla
                  facilisi etiam dignissim diam. Urna cursus eget nunc
                  scelerisque viverra. Proin libero nunc consequat interdum.
                  Rutrum quisque non tellus orci ac auctor augue mauris. Gravida
                  dictum fusce ut placerat orci nulla pellentesque dignissim.
                  Vestibulum morbi blandit cursus risus at. Sapien faucibus et
                  molestie ac feugiat sed lectus vestibulum. Volutpat odio
                  facilisis mauris sit amet massa vitae. Id velit ut tortor
                  pretium viverra suspendisse potenti nullam. Tristique magna
                  sit amet purus gravida quis. Vestibulum mattis ullamcorper
                  velit sed ullamcorper morbi tincidunt. Enim eu turpis egestas
                  pretium aenean pharetra magna ac. Vitae tempus quam
                  pellentesque nec nam aliquam sem. Adipiscing at in tellus
                  integer feugiat. Metus vulputate eu scelerisque felis
                  imperdiet proin fermentum. Id leo in vitae turpis massa. Nibh
                  nisl condimentum id venenatis a condimentum. Mauris rhoncus
                  aenean vel elit scelerisque mauris. Eu non diam phasellus
                  vestibulum lorem sed risus ultricies tristique. Enim diam
                  vulputate ut pharetra. Mattis molestie a iaculis at erat
                  pellentesque adipiscing commodo elit. Bibendum arcu vitae
                  elementum curabitur vitae. Lorem ipsum dolor sit amet
                  consectetur. Ac placerat vestibulum lectus mauris ultrices.
                  Quam lacus suspendisse faucibus interdum posuere lorem ipsum
                  dolor. Sagittis aliquam malesuada bibendum arcu. Commodo
                  ullamcorper a lacus vestibulum sed. Id aliquet risus feugiat
                  in ante metus dictum at. Urna duis convallis convallis tellus
                  id interdum velit laoreet id. Ac ut consequat semper viverra
                  nam libero justo. Mattis vulputate enim nulla aliquet.
                </Text>
              </ScrollView>
            </SafeAreaView>
          </Overlay>

          <Overlay isVisible={this.state.show_privacy}>
            <SafeAreaView>
              <Icon
                color="black"
                name="close-circle-outline"
                size={25}
                style={{
                  marginLeft: "2%",
                  marginBottom: "1.75%",
                  marginTop: "1.75%",
                }}
                onPress={() => this.setState({ show_privacy: false })}
              />
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ height: "95%" }}
              >
                <Text style={styles.text3}>Privacy Policy</Text>
                <Text style={styles.text4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Malesuada pellentesque elit eget gravida cum sociis natoque.
                  Nulla aliquet enim tortor at auctor urna nunc id. Odio morbi
                  quis commodo odio aenean sed. Urna duis convallis convallis
                  tellus id interdum velit laoreet id. In dictum non consectetur
                  a erat nam at lectus. Ipsum suspendisse ultrices gravida
                  dictum fusce ut. Consectetur adipiscing elit pellentesque
                  habitant morbi tristique senectus et. Elementum tempus egestas
                  sed sed. Nisl nunc mi ipsum faucibus. Gravida cum sociis
                  natoque penatibus et magnis dis parturient montes. Laoreet non
                  curabitur gravida arcu ac tortor dignissim. Accumsan in nisl
                  nisi scelerisque eu ultrices vitae auctor. Porta non pulvinar
                  neque laoreet suspendisse interdum. Ornare lectus sit amet est
                  placerat in egestas. Fringilla est ullamcorper eget nulla
                  facilisi etiam dignissim diam. Urna cursus eget nunc
                  scelerisque viverra. Proin libero nunc consequat interdum.
                  Rutrum quisque non tellus orci ac auctor augue mauris. Gravida
                  dictum fusce ut placerat orci nulla pellentesque dignissim.
                  Vestibulum morbi blandit cursus risus at. Sapien faucibus et
                  molestie ac feugiat sed lectus vestibulum. Volutpat odio
                  facilisis mauris sit amet massa vitae. Id velit ut tortor
                  pretium viverra suspendisse potenti nullam. Tristique magna
                  sit amet purus gravida quis. Vestibulum mattis ullamcorper
                  velit sed ullamcorper morbi tincidunt. Enim eu turpis egestas
                  pretium aenean pharetra magna ac. Vitae tempus quam
                  pellentesque nec nam aliquam sem. Adipiscing at in tellus
                  integer feugiat. Metus vulputate eu scelerisque felis
                  imperdiet proin fermentum. Id leo in vitae turpis massa. Nibh
                  nisl condimentum id venenatis a condimentum. Mauris rhoncus
                  aenean vel elit scelerisque mauris. Eu non diam phasellus
                  vestibulum lorem sed risus ultricies tristique. Enim diam
                  vulputate ut pharetra. Mattis molestie a iaculis at erat
                  pellentesque adipiscing commodo elit. Bibendum arcu vitae
                  elementum curabitur vitae. Lorem ipsum dolor sit amet
                  consectetur. Ac placerat vestibulum lectus mauris ultrices.
                  Quam lacus suspendisse faucibus interdum posuere lorem ipsum
                  dolor. Sagittis aliquam malesuada bibendum arcu. Commodo
                  ullamcorper a lacus vestibulum sed. Id aliquet risus feugiat
                  in ante metus dictum at. Urna duis convallis convallis tellus
                  id interdum velit laoreet id. Ac ut consequat semper viverra
                  nam libero justo. Mattis vulputate enim nulla aliquet.
                </Text>
              </ScrollView>
            </SafeAreaView>
          </Overlay>

          <View
            style={{
              flexDirection: "row",
              paddingTop: 15,
              paddingHorizontal: "2%",
              right: "2%",
            }}
          >
            <CheckBox
              containerStyle={{ bottom: 5 }}
              checked={this.state.checked}
              checkedColor="#01a7a6"
              onPress={() => this.handleChecked()}
            />
            <Text style={styles.text}>
              {" "}
              By creating an account, you agree to our{" "}
              <Text
                style={styles.text2}
                onPress={() => this.setState({ show_terms: true })}
              >
                Terms of use
              </Text>{" "}
              &{" "}
              <Text
                style={styles.text2}
                onPress={() => this.setState({ show_privacy: true })}
              >
                Privacy Policy
              </Text>
            </Text>
          </View>
          <View style={{ height: "100%", marginBottom: "15%" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.buttonContainer}
              onPress={() => {
                this.signupUser();
              }}
              disabled={!this.state.checked}
            >
              <Text style={styles.appButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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
  constraintsText: {
    color: "grey",
    fontSize: 15,
    textAlign: "center",
    paddingLeft: "2%",
  },
  text: {
    color: "grey",
    fontSize: 15,
    width: "80%",
  },
  errorText: {
    color: "red",
    fontSize: 15,
    width: "80%",
  },
  text2: {
    color: colours.email,
    fontSize: 15,
    textDecorationLine: "underline",
  },
  text3: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  text4: {
    color: "grey",
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 30,
    textAlign: "justify",
  },
  buttonTitle: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    alignSelf: "center",
    bottom: "51%",
  },
  inputContainer: {
    position: "absolute",
    height: 30,
    paddingTop: "6%",
    left: 20,
  },
  input: {
    color: colours.email,
    fontSize: 15,
    textAlign: "center",
    paddingLeft: "6%",
  },
  inputHeader: {
    color: "#929292",
    fontSize: 18,
    textAlign: "left",
    left: 25,
    top: "3%",
    width: "85%",
  },
  fieldContainer: {
    flexDirection: "row",
    paddingTop: "5%",
    alignItems: "center",
  },
  fieldContainerBottom: {
    backgroundColor: "#e3e3e3",
    height: 1,
    width: "90%",
    marginTop: "15%",
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
export default SignUpScreen;
