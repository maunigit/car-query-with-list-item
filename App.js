import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      posts: [], //array
    };
  }

  showCarData = () => {
    if (this.state.posts) {
      return (
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.posts}
          renderItem={this.renderItem}
        />
      );
    } else {
      return null;
    }
  };

  //asynch version of the fetch
  fetchAsyncCarApi = async url => {
    try {
      let response = await fetch(url);
      let data = await response.json();
      this.setState({ isLoaded: true, posts: data.Makes });
      //print Makes object
      console.log(JSON.stringify(data.Makes));
    } catch (error) {
      alert(error);
    }
  };

  fetchCar = () => {
    var urlCarQuery =
      'https://www.carqueryapi.com/api/0.3/?&cmd=getModels&make=ford&year=2010&body=SUV';

    var urlCarMakes = 'https://www.carqueryapi.com/api/0.3/?&cmd=getMakes';
    this.fetchAsyncCarApi(urlCarMakes);

    //synch version of the fetch
    /*fetch(urlCarQuery).then(response=>response.json()).then((result)=>{
    this.setState({
      isLoaded: true,
      posts: result
    })
  }).catch(error=>alert(error))*/
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <ListItem title={item.make_display} bottomDivider chevron />
  );

  render() {
    return (
      <View style={styles.container}>
        {this.showCarData()}
        <Button
          onPress={this.fetchCar}
          title="View cars"
          color="#841584"
        />
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});