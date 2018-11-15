import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { View, Text, StyleSheet, Image, RefreshControl } from 'react-native';
import Timeline from 'react-native-timeline-listview'

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
    this.onRefresh = this.onRefresh.bind(this);
    this.setData();
  }

  onRefresh() {
    this.setState({ isRefreshing: true });
    setTimeout(() => {
      var results = [{
        userId: '5',
        time: '16:30 12.10',
        title: 'Анна Тутова',
        description: 'Look out for the Best Gym & Fitness Centers.\nAround me :)',
        imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
      }];
      this.setState({
        data: results,
        isRefreshing: false,
        noResults: results.length > 0 ? false : true
      });
    }, 2000);
  }

  setData() {
    var results = [
      {
        userId: '1',
        time: '09:00 13.10',
        title: 'Vlad Honcharenko',
        description: 'The Beginner Archery and Beginner.\nCrossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
        imageUrl: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=594213414366528&height=50&width=50&ext=1544810051&hash=AeS4SzbYOQcHnYSs'
      },
      {
        userId: '2',
        time: '10:45 13.10',
        title: 'Anton Badminton',
        description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
        imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg'
      },
      {
        userId: '3',
        time: '10:45 13.10',
        title: 'Дмитро Токар',
        description: 'Badminton is a racquet sport.\nPlayed using racquets to hit a shuttlecock across a net.',
        imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg'
      },
      {
        userId: '4',
        time: '14:00 12.10',
        title: 'Антон Петров',
        description: 'Team sport.\nPlayed between two teams of eleven players with a spherical ball. ',
        imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg'
      },
      {
        userId: '5',
        time: '16:30 12.10',
        title: 'Петро Антонов',
        description: 'Look out for the Best Gym & Fitness.\nCenters around me :)',
        imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
      },
      {
        userId: '4',
        time: '14:00 12.10',
        title: 'Watch Soccer',
        description: 'Team sport.\nPlayed between two teams of eleven players with a spherical ball.',
        imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg'
      },
      {
        userId: '5',
        time: '16:30 12.10',
        title: 'Анна Тутова',
        description: 'Look out for the Best Gym & Fitness Centers.\nAround me :)',
        imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
      }
    ];

    setTimeout(() => {
      this.setState({
        data: results,
        isLoading: false,
        noResults: results.length > 0 ? false : true
      });
    }, 5000);
  }

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
              onRefresh={this.onRefresh}
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