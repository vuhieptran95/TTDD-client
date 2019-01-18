import React, { Component } from "react";
import { View, StyleSheet, StatusBar, Platform, Image } from "react-native";
import { ListItem, List, Container, Header, Content, Text, Body, Title, Left, Right, Thumbnail, Button, Card, CardItem, Icon } from "native-base";
import { QuoteBasket } from "../data/QuoteBasket";

class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdded: false
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Chi tiết",
      headerStyle: {
        backgroundColor: "#f4511e",
        ...Platform.select({
          android: {
            marginTop: -StatusBar.currentHeight
          }
        })
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  };

  addQuote(item, quote) {
    if (!global.Quotes) global.Quotes = [];
    global.Quotes.push({ item: item, quote: quote });
    // this.setState({ isAdded: !this.state.isAdded });
    // console.log(global.Quotes);
  }

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam("item", "");
    const quote = navigation.getParam("quote", "");
    console.log(item);
    console.log(quote);
    return (
      <Container>
        <Content>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: item.profileImage }} />
                <Body>
                  <Text>{item.name}</Text>
                  <Text note>January 18, 2019</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{ uri: item.profileImage }} style={{ height: 200, width: 320, flex: 1 }} />
                <Text style={{ paddingTop: 10 }}>{quote}</Text>
              </Body>
            </CardItem>
            <Button disabled={this.state.isAdded} style={{ margin: 20 }} onPress={() => this.addQuote(item, quote)} block success>
              <Icon name="basket" />
              <Text>Thêm vào giỏ</Text>
            </Button>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default DetailScreen;
