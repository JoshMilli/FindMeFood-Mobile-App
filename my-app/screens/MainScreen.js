import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Button,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import WheelOfFortune from 'react-native-wheel-of-fortune';
import {Category} from '../screens/CatSelectionScreen';

export const winners = [];


class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      winnerValue: null,
      winnerIndex: null,
      started: false,
    };
    this.child = null;
  }

  

  buttonPress = () => {
    this.setState({
      started: true,
    });
    this.child._onPress();
    
  };

  

  render() {
    const wheelOptions = {
      rewards: Category,
      knobSize: 30,
      borderWidth: 5,
      borderColor: '#fff',
      innerRadius: 30,
      duration: 6000,
      backgroundColor: 'transparent',
      textAngle: 'horizontal',
      //KnobSource - put knob.png in wheel-of-fortune modules 'assets' folder if not working.
      knobSource: require('../knob.png'),
      onRef: ref => (this.child = ref),
    };
    return (
<><SafeAreaView style={styles.container}>

<Text style={styles.header}>FORTUNE FAVOURS THE HUNGRY</Text>


<WheelOfFortune
  options={wheelOptions}
  getWinner={(value, index) => {
    this.setState({ winnerValue: value, winnerIndex: index });
    winners.push(this.state.winnerValue+' resturant');
    console.log(winners);
  } } />


{!this.state.started && (
  <View style={styles.startButtonView}>
    <TouchableOpacity
      onPress={() => this.buttonPress()}
      style={styles.startButton}>
      <Text style={styles.startButtonText}>SPIN</Text>
    </TouchableOpacity>
  </View>
)}

{this.state.winnerIndex != null && (
  <View style={styles.winnerView}>
    <Text style={styles.winnerText}>
      You got {Category[this.state.winnerIndex]}
    </Text>
    <TouchableOpacity
      onPress={() => {
        // this.setState({ winnerIndex: null });
        // this.child._tryAgain();
        this.props.navigation.navigate('api')
        
      } }
      style={styles.tryAgainButton}>
      <Text style={styles.tryAgainText}>VIEW RESTURANTS</Text>
    </TouchableOpacity>
  </View>


)}

{this.state.winnerIndex != null &&(
  <SafeAreaView >
  </SafeAreaView>


)}


</SafeAreaView>

</>
      
          
    );
    
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#576574',
    position:'relative'
    
  },
 
  resultText:{
    fontSize: 200,
    color: 'white',
    textTransform: 'uppercase',
  },

  TextStyle:{
    fontSize : 18,
     textAlign: 'center'
  },
  countText:{
    textAlign:'right',
    fontSize: 20,
    paddingRight: 15,
    
  },
  header:{
    fontSize: 23,
    position:'relative',
    fontWeight:'bold',
    marginTop: 45,
    borderBottomWidth: 1.2,
    borderBottomColor:'white',
    
    color: 'white',
  },
  startButtonView: {
    position: 'absolute',
    
  },
  startButton: {
    backgroundColor: 'rgba(0,0,0,.5)',
    marginTop: 138,
    padding: 5,
  },
  startButtonText: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  winnerView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tryAgainButton: {
    padding: 10,
  },
  winnerText: {
    fontSize: 25,
    color: 'white',
    textTransform: 'uppercase',
  },
  tryAgainButton: {
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    
    
  },
  tryAgainText: {
    
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
