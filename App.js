
import firebase from './Firebase/Firebase';
import React from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Platform,
  TouchableHighlight,
  RefreshControl,
  TextInput
} from 'react-native';

//import Navigation from './Navigation/Navigation';

const rootRef = firebase.database().ref();
//const userRef = rootRef.child('AssMatDispo').limitToLast(5);
//const userRef = rootRef.child('AssMatDispo').equalTo('alicia') ;
//const userRef = rootRef.child('AssMatDispo');

export default class App extends React.Component {
  constructor(props) {
        super(props);
        this.state = ({
            users: [],
            newuserName: '',
            loading: false,
        });
  }

  componentDidMount() {
    userRef.on('value', (childSnapshot) => {
      const users = [];
      childSnapshot.forEach((doc) => {
        users.push({
          key: doc.key,
          assMatUserFirstName: doc.toJSON().name.first
        });
        this.setState({
          users: users.sort((a, b) => {
            return (a.assMatUserFirstName);
            //return (a.assMatUserFirstName < b.assMatUserFirstName);
          }),
          loading: false,
        });
      });
    });
  }

  render() {
    return (
        <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 34 : 0 }}>
            <View style={{
                backgroundColor: 'green',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                height: 64
            }}>
                <TextInput style={{
                    height: 40,
                    width: 200,
                    margin: 10,
                    padding: 10,
                    borderColor: 'white',
                    borderWidth: 1,
                    color: 'white'
                }}
                    keyboardType='default'
                    placeholderTextColor='white'
                    placeholder='Enter user name'
                    autoCapitalize='none'
                    onChangeText={
                        (text) => {
                            this.setState({ newuserName: text });
                        }
                    }
                    value={this.state.newuserName}
                />
                <TouchableHighlight
                    style={{ marginRight: 10 }}
                    underlayColor='tomato'
                    onPress={this.onPressAdd}
                >
                    <Image
                        style={{ width: 35, height: 35 }}
                        // source={require('../icons/icons-add.png')}
                    />
                </TouchableHighlight>
            </View>
            <FlatList
                data={this.state.users}
                renderItem={({ item, index }) => {
                    return (
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            margin: 10
                        }}>{item.assMatUserFirstName}</Text>);
                          //}}>{item.this.state.users.name.first}</Text>);
                }}
            >
            </FlatList>
        </View>
    );
  }
}
console.disableYellowBox = true
