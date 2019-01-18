import React from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import BottomTabNavigator from "./navigation/AppContainer";

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <BottomTabNavigator />
        {/* <StackContainer /> */}
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight
      }
    })
  }
});
