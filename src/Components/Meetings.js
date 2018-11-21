import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { View, Text, StyleSheet, Image, RefreshControl } from 'react-native';
import Timeline from 'react-native-timeline-listview';
import { BASE_URL } from '../consts';
const axios = require('axios');

class Meetings extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Знайомства',
    tabBarIcon: () => (<Icon size={24} color="white" name="people" />)
  }

  constructor() {
    super();
    this.state = {
      isRefreshing: false,
      waiting: false,
      data: [],
      selected: null,
      noResults: false,
      isLoading: true
    }

    this.onEventPress = this.onEventPress.bind(this);
    this.renderDetail = this.renderDetail.bind(this);
  }

  async onRefresh() {
    this.setState({ isRefreshing: true });
    await this.componentDidMount();
    this.setState({ isRefreshing: false });
  };

  async componentDidMount() {
    try {
      const result = await axios.get(BASE_URL + "/users/meetings");
      this.setState({
        data: result.data,
        isLoading: false,
        noResults: result.data.length > 0 ? false : true
      });
    } catch (error) {
      console.log(error)
    }
  };

  onEventPress(data) {
    this.setState({ selected: data });
  }

  renderDetail(rowData, sectionID, rowID) {
    let title = <Text style={[styles.title]}>{rowData.title}</Text>;
    var desc = null;
    if (rowData.description && rowData.imageUrl)
      desc = (
        <View style={styles.descriptionContainer}>
          <Image source={{ uri: rowData.imageUrl }} style={styles.image} />
          <Text style={[styles.textDescription]}>{rowData.description}</Text>
        </View>
      );

    return (
      <View style={{ flex: 1 }}>
        {title}
        {desc}
      </View>
    );
  }

  render() {
    return (<View style={styles.container}>
      {this.state.isLoading ? (<Text style={[styles.promt]}>Завантаження...</Text>) :
        (this.state.noResults ? (<Text style={[styles.promt]}>Ви ще не з ким не зустрілися...</Text>) : null)}
      <Timeline
        style={styles.list}
        data={this.state.data}
        circleSize={20}
        circleColor='rgba(250,88,66,12)'
        lineColor='rgb(45,156,219)'
        timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
        timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, marginTop: 10, borderRadius: 13 }}
        descriptionStyle={{ color: 'gray' }}
        options={{
          style: { paddingTop: 5 },
          refreshControl: (
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={async (e) => await this.onRefresh(e)}
            />
          ),
        }}
        innerCircle={'icon'}
        onEventPress={this.onEventPress}
        renderDetail={this.renderDetail}
        innerCircle={'dot'}
        separator={true}
      />
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 5,
    backgroundColor: 'white'
  },
  list: {
    flex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  promt: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  descriptionContainer: {
    flexDirection: 'row',
    paddingRight: 50
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 3,
  },
  textDescription: {
    marginLeft: 10,
    color: 'gray'
  }
});

module.exports = Meetings;