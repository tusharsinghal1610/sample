import React from 'react';
import { Button, Image, View, Text, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json
import WebScreen from './components/webScreen';
import firebase from 'firebase';
var configuration = require('./components/decleration');
class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: 'Tester App',
      headerRight: (
        <View style={{ marginRight: 10 }}>
          <Button title="righttest" color="green" />
        </View>
      ),
    };
  };
getShopOnData=()=>{
  
  if (!firebase.apps.length) {
    firebase.initializeApp(configuration.config);
}


var rootRef = firebase.database().ref('liveSale');
var count = 0;
var total=0
var choice=0;
var initial=0;
var link="";
var imageLink="";
var finalImageLink="";
var finalLink="";


rootRef.once('value',(snapshot)=>{

total=snapshot.numChildren();
choice=total%2;
snapshot.forEach((userSnap)=> {
  count++;
  if(count==total && choice ==1){
    
   var varsinitialData=userSnap.val();
    this.state.dataSource.push(

      <View style={styles.grid} key={userSnap.key}>
      <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Web', {
            link: varsinitialData.link
          });
          }}>
        <Image
          resizeMode='contain' style={styles.image}
          source={{ uri: varsinitialData.imageLink }}

        />
        </TouchableOpacity>
      </View>
      );
      this.setState({});
  }
  else{
    if(initial==0){
      initial=1;
      imageLink=userSnap.val().imageLink;
      link=userSnap.val().link;
    }
    else{
      initial=0;
      finalLink=userSnap.val().link;
      finalImageLink=userSnap.val().imageLink;
      this.state.dataSource.push(

        <View style={styles.grid} key={userSnap.key}>
        <TouchableOpacity onPress={(initialData)=>{this.props.navigation.navigate('Web', {
              link: link
            });
            }}>
          <Image
            resizeMode='contain' style={styles.image}
            source={{ uri: imageLink }}

          />
          </TouchableOpacity>
          <TouchableOpacity onPress={(finalData)=>{this.props.navigation.navigate('Web', {
              link: finalLink
            });
            }}>
          <Image
            resizeMode='contain' style={styles.image}
            source={{ uri: finalImageLink }}

          />
          </TouchableOpacity>
        </View>
        );
      if(count==total){
        this.setState({});
      }
      

    }
     
  }
    console.log( userSnap.key +"  here it is"+ count +" here it is "+ userSnap.val()+ "here bhaui"+  choice);
   
   
});
});
}
getShopOnData2=()=>{

  if (!firebase.apps.length) {
    firebase.initializeApp(configuration.config);
}
var rootRef = firebase.database().ref('liveSale');

rootRef.once('value',(snapshot)=>{
  var i=0;
  var total=snapshot.numChildren();
snapshot.forEach((userSnap)=> {
  i++;
  this.state.data.push({
  key:userSnap.key,
  link:userSnap.val().link,
  imageLink:userSnap.val().imageLink
});   
if(i==total){
  this.show();
}
});
});
}
constructor(props){
  super(props);
  this.state={
    dataSource:[],
    data:[]
  }
}
_handlePress=(index)=>{
  this.props.navigation.navigate('Web',{
    link:index
  });
}
show=()=>{
  console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
 // console.log(this.state.data);
  var length=this.state.data.length;
  console.log(length);
  for(var j=0;j<length;j+=2){
    var temp=j;
    this.state.dataSource.push(
      <View style={styles.grid} key={this.state.data[j].key}>
      <TouchableOpacity onPress={()=>{
        this._handlePress(temp);
      }}>
        <Image
          resizeMode='contain' style={styles.image}
          source={{ uri: this.state.data[j].imageLink }}

        />
        </TouchableOpacity>

      </View>
    );
    this.setState({});
  }
}
  componentWillMount=()=> {
    this.getShopOnData2();
    
  }
  



  render() {
    return (
      <ScrollView>
       {this.state.dataSource.map((item)=>{
         console.log(item);
       })}


      </ScrollView>
    );
  }
}

var { width } = Dimensions.get('window');
const styles = StyleSheet.create({

  image: {
    width: width * 0.45,
    height: width * 0.45 *0.35,
    margin: 3
  },
  liveImage: {
    width: width * 0.45,
    height: width * 0.40,
   
  },
  grid:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 2
  }
});

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Web: {
      screen: WebScreen,
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#26A69A',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
