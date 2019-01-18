import React, { Component } from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator } from "react-navigation";
import HomeScreen from "../screens/Home";
import QuoteScreen from "../screens/Quote";
import AboutScreen from "./../screens/About";
import DetailScreen from "../screens/Detail";

const HomeStackNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Detail: DetailScreen
});

const QuoteStackNavigator = createStackNavigator({
  Quote: QuoteScreen,
  Detail: DetailScreen
});

const BottomTabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeStackNavigator
  },
  Quote: QuoteStackNavigator,
  About: AboutScreen
});

// const StackContainer = createAppContainer(StackNavigator);

export default createAppContainer(BottomTabNavigator);
