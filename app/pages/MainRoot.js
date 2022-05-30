import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import Constants from "expo-constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Favorite from "./Favorite";
import Settings from "./Settings";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

class MainRoot extends Component {
  state = {
      isLoading: true,
      genres: []
  };

  componentDidMount() {
    return fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=cfe806b49431dfc64c4180ad5e66e300").then((response) => response.json())
    .then((responesJson) => {
        this.setState({
            isLoading: false,
            genres: responesJson.genres
        })
    })
    .catch((error) => console.error(error))
  }

  render() {
    const HomeComponent = (props) => <Home genres={this.state.genres} />
    if (this.state.isLoading){
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator />
        </SafeAreaView>
    }
    return (
      <Tab.Navigator
        screenOptions={{
          activeTintColor: "#e91e63",
          headerShown: false,
        }}
        initialRouteName="Home"
      >
        <Tab.Screen
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={22} />,
          }}
          name="Home"
          component={HomeComponent}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "Favorite",
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="heart" color={color} size={22} />,
          }}
          name="Favorite"
          component={Favorite}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="cog" color={color} size={22} />,
          }}
          name="Settings"
          component={Settings}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});

export default MainRoot;
