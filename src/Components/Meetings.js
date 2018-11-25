import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { View, Text, StyleSheet, Image, RefreshControl, AsyncStorage } from 'react-native';
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
    this._sub = this.props.navigation.addListener('didFocus', async () =>
      await this.updateData()
    );
    await this.updateData();

  };

  async updateData() {
    try {
      let userId = await AsyncStorage.getItem('userId');
      let auth_token = await AsyncStorage.getItem('auth_token');
      var config = {
        headers: {'x-amz-security-token':  auth_token}
      };
    
      const result = await axios.get(BASE_URL + "users/"+userId +"/meetings", config);
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
        circleColor='#B9E4C9'
        lineColor='#37966F'
        timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
        timeStyle={{ textAlign: 'center', backgroundColor: '#B9E4C9', color: '#FD5523', padding: 5, marginTop: 10, borderRadius: 13 }}
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
    paddingTop: 5,
    backgroundColor: '#FFFBE6'
  },
  list: {
    flex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color:"#FD5523"
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
    color:"#356859"
  }
});

module.exports = Meetings;