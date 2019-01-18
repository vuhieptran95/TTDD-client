import React, { Component } from "react";
import { View, TouchableHighlight, TouchableNativeFeedback } from "react-native";
import { ListItem, List, Container, Header, Content, Text, Body, Title, Left, Right, Thumbnail, Button, Icon, H1, SwipeRow } from "native-base";
import { RandomQuote } from "../helper/RandomQuote";
import { QuoteBasket } from "../data/QuoteBasket";
import axios from "axios";

class QuoteScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      quotes: [],
      date: 1
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ loading: false });
  }

  componentDidMount() {
    if (!global.Quotes) global.Quotes = [];
    this.setState({ quotes: global.Quotes });
  }

  toDetailScreen(item, quote) {
    console.log(quote);
    this.props.navigation.navigate("Detail", {
      item: item,
      quote: quote
    });
  }

  refresh() {
    if (!global.Quotes) global.Quotes = [];
    this.setState({ quotes: global.Quotes });
  }

  removeQuote = quote => {
    var quotes = global.Quotes;
    var index = quotes.findIndex(q => q.item === quote.item);
    global.Quotes.splice(index, 1);
    this.setState({ quotes: global.Quotes });
  };

  render() {
    // console.log(QuoteBasket);
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="basket" />
            </Button>
          </Left>
          <Body>
            <Title>Giỏ Quote: {this.state.quotes.length}</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.refresh()}>
              <Icon name="refresh" />
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            {this.state.quotes.map((q, i) => (
              <TouchableNativeFeedback onPress={() => this.toDetailScreen(q.item, q.quote)} onLongPress={() => this.removeQuote(q)} key={i}>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail square source={{ uri: q.item.profileImage }} />
                  </Left>
                  <Body>
                    <Text>{q.item.name}</Text>
                    <Text note numberOfLines={3}>
                      {q.quote}
                    </Text>
                  </Body>
                  {/* <Right>
                  <Button onPress={() => this.toDetailScreen(q.item, RandomQuote(i))} transparent>
                    <Text>Chi tiết</Text>
                  </Button>
                </Right> */}
                </ListItem>
              </TouchableNativeFeedback>
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}

export default QuoteScreen;
