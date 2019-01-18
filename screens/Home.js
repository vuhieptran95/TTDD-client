import React, { Component } from "react";
import { View } from "react-native";
import axios from "axios";
import { ListItem, List, Container, Header, Content, Text, Body, Title, Left, Right, Thumbnail, Button, Icon } from "native-base";
import { RandomQuote } from "../helper/RandomQuote";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      items: [{ name: "hiep", profileImage: "https://storage.googleapis.com/my-demo-f85d3.appspot.com/users/testuser11/profile-1540194824255.webp" }]
    };
  }
  static navigationOptions = {
    header: null
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ loading: false });
  }

  componentDidMount() {
    console.log("Fuck you");
    axios.get("http://192.168.43.10:3000/api/users").then(res => {
      this.setState({ items: res.data });
    });
  }

  toDetailScreen(item, quote) {
    console.log(quote);
    this.props.navigation.navigate("Detail", {
      item: item,
      quote: quote
    });
  }

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="home" />
            </Button>
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List>
            {this.state.items.map((item, i) => (
              <ListItem thumbnail key={i}>
                <Left>
                  <Thumbnail square source={{ uri: item.profileImage }} />
                </Left>
                <Body>
                  <Text>{item.name}</Text>
                  <Text note numberOfLines={2}>
                    {RandomQuote(i)}
                  </Text>
                </Body>
                <Right>
                  <Button onPress={() => this.toDetailScreen(item, RandomQuote(i))} transparent>
                    <Text>Chi tiết</Text>
                  </Button>
                </Right>
              </ListItem>
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}

export default HomeScreen;
