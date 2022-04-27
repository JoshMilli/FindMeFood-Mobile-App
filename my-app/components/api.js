import axios from 'axios';
import { SafeAreaView, StyleSheet, Text, View, Button, Alert, ScrollView, RefreshControl, Platform } from 'react-native';
import React, { Component, useState, useEffect, createContext } from 'react';
import { winners } from '../screens/MainScreen';
import * as Location from 'expo-location';
import { useIsFocused } from '@react-navigation/native';
import openMap from 'react-native-open-maps';


const API = () => {


  const resturant = winners;
  
  const isFocused = useIsFocused();

  const [NamesFound, setNamesFound] = useState(0);
  // const [result, setResult] = useState([]);
  // const names = result.map((name)=> name.name);
  // const namesFound = names.length;

  const APIKey ='******************************';
  const [Result, SetResult] = useState([]);
  const [Names, SetNames] = useState([]);
  
  const [lat, Setlat] = useState();
  const [long, Setlong] = useState();

  const [Restlat, setRestlat] = useState([]);
  const [Restlng, setRestlng] = useState([]);

  const [OpenTimes, setOpenTimes] =useState([]);
  
  // const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  const [RestAddress, setRestAddress] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);


  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      SetResult([]);
      fetchData();
      wait(2000).then(() => setRefreshing(false));
    }, []);
  
  const FilterItem=(item)=>{
 
    const index = Names.findIndex(ind => ind === item);
    var lat = Restlat[index];
    var lng = Restlng[index];

    // console.log(OpenTimes[index])
    // OpenTimes[index] ? 'Open Now' : 'Closed'
    
    Alert.alert( item, RestAddress[index] , [{
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    { text: "Open in maps", onPress: () => openMap({ latitude: lat, longitude: lng, query:RestAddress[index] }) }] );

    
  }

  
  const getLocation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      Location.setGoogleApiKey(APIKey);

      let { coords } = await Location.getCurrentPositionAsync();

      Setlat(coords.latitude);
      Setlong(coords.longitude);

      if (coords) {
        let { longitude, latitude } = coords;

        let regionName = await Location.reverseGeocodeAsync({
          longitude,
          latitude,
        });
        const Region = regionName[0].city
        setAddress(Region);
        console.log(Region);
      }

    })();
  };


 
  


  const fetchData = async () =>{
    var config = {
      method: 'get',
      url: 'https://maps.googleapis.com/maps/api/place/textsearch/json?location='+lat+','+long+'&key='+APIKey+'&status=&query='+resturant,
      headers: { }
    };

    setLoading(true);
    try {
      const {data: response} = await axios(config);
      const newResult = response.results;
      SetResult(newResult);

      const newNames = newResult.map((name)=> name.name);
      const Places = newResult.map((name)=> name.formatted_address);
      const directionLat = newResult.map((name)=> name.geometry.location.lat);
      const directionLong = newResult.map((name)=> name.geometry.location.lng);
      
      if(Names.length === Places.length){
        const OpenHrs = newResult.map((name)=> name.opening_hours);
        // const OpenOrClosed = OpenHrs.map((name)=> name.open_now);
        console.log(Places);

        console.log(newNames);
        
      }
      
      // setOpenTimes(OpenOrClosed)
      setRestlat(directionLat)
      setRestlng(directionLong)
      setRestAddress(Places)
      SetNames(newNames)
      setNamesFound(newNames.length)
      console.log('API function called.')
      
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  }



  useEffect(() => {
    getLocation();
    fetchData();
}, []);
  
     
  return(
    
    <SafeAreaView style={styles.container}>
      
      {loading && <Text>LOADING....</Text>}
      {!loading && isFocused && (
        <><Text style={styles.MainText}>{NamesFound} {winners}s</Text><ScrollView
          style={styles.scroll}
          refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh} />}
        >
          {Names.map((item, key) => (
            <Text key={key} style={styles.TextStyle} onPress={FilterItem.bind(this, item)}> {item} </Text>)
          )}
        </ScrollView></>
      )}
      
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    backgroundColor: '#576574',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn:{
    width: '80%',
  },
  MainText:{
    marginTop: 40,
    color:'white',
    display:'flex',
    fontSize:25,
    borderBottomWidth: 2,
    borderBottomColor:'white',
    marginBottom: 25,
  },
  scroll:{
    
      width: '100%',
      
      
    },
  TextStyle:{


    fontSize : 22,
    padding: 10,
    textAlign: 'center',
    color: 'white',
     
  }
});

export default API;