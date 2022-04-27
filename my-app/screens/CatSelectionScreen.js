
import {useNavigation} from '@react-navigation/core'
import React, { Component } from 'react'
// import { getFirestore, query, where, getDocs, Query, Firestore } from 'firebase/firestore';
import 'firebase/firestore';
import 'firebase/app'
import { useState, useEffect } from 'react'
import {Checkbox} from 'react-native-paper'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Alert, Platform, ToastAndroid } from 'react-native'
import {db} from '../firebase-db-config'
import {auth} from '../firebase-config'
import {collection,addDoc,updateDoc,deleteDoc,doc,} from "firebase/firestore";
// import firestore, { firebase } from '@react-native-firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';


export const Category = [];

  

const CatSelectionScreen = () => {

// const UserName = toString(auth.currentUser?.email);

const [users, setUsers] = useState([]);
// const usersCollectionRef = collection(db, "users");
const navigation = useNavigation();
const [food1, setfood1] = useState(false);
const [food2, setfood2] = useState(false);
const [food3, setfood3] = useState(false);
const [food4, setfood4] = useState(false);
const [food5, setfood5] = useState(false);
const [food6, setfood6] = useState(false);
const [food7, setfood7] = useState(false);
const [found, setfound] = useState('');


   
    const Click = () =>{
      if (food1 === true){
        Category.push("Italian");
        
      }
        
      if (food2 === true){
        Category.push("Greek");
      }
      if(food3 === true){
        Category.push("Mauritian");
      }
      if(food4 === true){
        Category.push("Chinese");
      }
      if(food5 === true){
        Category.push("Indian");
      }
      if(food6 === true){
        Category.push("American");
      }
      if(food7 === true){
        Category.push("French");
      }
      console.log('selected: '+Category);
      navigation.replace("MainPage")
      
      
      
      }
      

    return (
   <SafeAreaView style={styles.container}>
     <Text style={styles.header}>Select Your Cuisine</Text>
     <ScrollView style={styles.checkboxContainer}>


       <SafeAreaView style={styles.box}>

       <Checkbox.Item style={styles.checkbox}
          label="Italian"
          labelStyle={styles.labelStyle}
          status={food1 ? 'checked': 'unchecked'}
          color={food1 ? '#0782F9' : undefined}
          onPress={()=>{
            setfood1(!food1);
          }}
          
        />
       </SafeAreaView>

       <SafeAreaView style={styles.box}>

       <Checkbox.Item style={styles.checkbox}
          label="Greek"
          labelStyle={styles.labelStyle}
          status={food2 ? 'checked': 'unchecked'}
          color={food2 ? '#0782F9' : undefined}
          onPress={()=>{
            setfood2(!food2);
            
          }}
          
        />
       </SafeAreaView>

       <SafeAreaView style={styles.box}>

       <Checkbox.Item style={styles.checkbox}
          label="Mauritian"
          labelStyle={styles.labelStyle}
          status={food3 ? 'checked': 'unchecked'}
          color={food3 ? '#0782F9' : undefined}
          onPress={()=>{
            setfood3(!food3);
            
          }}
          
        />
       </SafeAreaView>

       <SafeAreaView style={styles.box}>

       <Checkbox.Item style={styles.checkbox}
          label="Chinese"
          labelStyle={styles.labelStyle}
          status={food4 ? 'checked': 'unchecked'}
          color={food4 ? '#0782F9' : undefined}
          onPress={()=>{
            setfood4(!food4);
            
          }}
          
        />
       </SafeAreaView>

       <SafeAreaView style={styles.box}>

       <Checkbox.Item style={styles.checkbox}
          label="Indian"
          labelStyle={styles.labelStyle}
          status={food5 ? 'checked': 'unchecked'}
          color={food5 ? '#0782F9' : undefined}
          onPress={()=>{
            setfood5(!food5);
            ;
          }}
          
        />
       </SafeAreaView>

       <SafeAreaView style={styles.box}>

       <Checkbox.Item style={styles.checkbox}
          labelStyle={styles.labelStyle}
          label="American"
          status={food6 ? 'checked': 'unchecked'}
          color={food6 ? '#0782F9' : undefined}
          onPress={()=>{
            setfood6(!food6);
            
          }}
          
        />
       </SafeAreaView>

       <SafeAreaView style={styles.box}>

       <Checkbox.Item style={styles.checkbox}
          labelStyle={styles.labelStyle}
          color={food7 ? '#0782F9' : undefined}
          label="French"
          status={food7 ? 'checked': 'unchecked'}
          onPress={()=>{
            setfood7(!food7);
            
          }}
          
        />
       </SafeAreaView>

       

      </ScrollView>

        <TouchableOpacity style={styles.button} onPress={Click}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>

        
  </SafeAreaView>
    )
}

export default CatSelectionScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6e6669',
       
      },
      labelStyle:{
        fontSize: 20,
      },
      box:{
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderRadius: 2,
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
      },
       button: {
        backgroundColor: '#0782F9',
        width: '90%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
        marginTop: 10,
        
      },
      
   
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
      header:{
        
        fontSize: 28,
        marginTop: 20,
        color:'white',
      },
      checkbox: {
      paddingTop: 12,
      marginTop: 10,
      
      width: '100%',
      
      },
      checkboxContainer: {
      marginTop: 25,
      borderRadius:15,
      width: '90%',
      backgroundColor:'#f4746c',
      flexDirection: 'column',
      
      
      },
      label:{
        fontSize: 20,
        paddingTop:15,
        color:'white',
      }

})
