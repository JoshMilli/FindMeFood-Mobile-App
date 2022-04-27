import React, { useState, useRef, useEffect } from 'react'
import { Platform, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, ToastAndroid, Image } from 'react-native'
// import Toast from 'react-native-easy-toast'
import {useNavigation} from '@react-navigation/core'
import ImagesExample from '../images'
import {auth} from '../firebase-config'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from 'firebase/auth'
  import { LogBox } from 'react-native';


LogBox.ignoreAllLogs();
const LoginScreen = () => {
  const toastRef = useRef();
  const navigation = useNavigation()
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  useEffect(() =>{
    const unsub = auth.onAuthStateChanged(user => {
      if (user){
        navigation.replace("Category")
      }
    })

    return unsub
  }, [])

  const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
    
      const register = async () => {
        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            Email,
            Password
          );
          console.log(user);
        } catch (error) {
          console.log(error.message);
          ToastAndroid.show(error.message, 2000);
        }
      };
    
      const login = async () => {
        try {
          const user = await signInWithEmailAndPassword(
            auth,
            Email,
            Password
          );
          if(Platform.OS === 'android' ? ToastAndroid.show('Welcome Back!', 2000) : Alert.alert("Logged In","Login in successful.") ){

          }
    
        } catch (error) {
          if(Platform.OS === 'android' ? ToastAndroid.show(error.message, 2000) : Alert.alert(error.message) )
          
          console.log(error.message);
        }
      };

    return (


        <SafeAreaView
        style={styles.container}
        behavior="padding"
        >
          <ImagesExample/>

          <Text style={styles.header}>Sign In Or Register</Text>
            <View style={styles.inputContainer}>
            
              
                <TextInput
                placeholder="Email"
                value={Email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
                > 
                </TextInput>

                <TextInput
                placeholder="Password"
                value={Password}
                onChangeText={text =>setPassword(text)}
                style={styles.input}
                secureTextEntry
                >
                </TextInput>

            </View>

            <View style={styles.buttonContainer}>

                <TouchableOpacity
                onPress={login}
                style={styles.button}
                >
                <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={register}
                style={styles.button, styles.buttonOutline}
                >
                <Text style={styles.buttonOutLineText}>Register</Text>
                </TouchableOpacity>
            </View>  
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },

    inputContainer:{
        width:'80%'
    },

    input:{
       
        borderTopWidth:0,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderBottomWidth:0.6,
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
        marginTop:5,
    },

    buttonContainer:{
        width:'60%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:40,
    },

    button:{
        backgroundColor:"#0782F9",
        width:'100%',
        padding:15,
        borderRadius:10,
        alignItems:'center',
    },
    buttonText:{
        color:'#fff',
        fontWeight:'700',
        fontSize:16,
    },

    buttonOutline:{
        backgroundColor:'#fff',
        marginTop:5,
        borderColor:'#0782F9',
        borderWidth:2,
        width:'100%',
        padding:15,
        borderRadius:10,
        alignItems:'center',
    },

    buttonOutLineText:{
        color:'#0782F9',
        fontWeight:'700',
        fontSize:16,
    },
    toast:{
        backgroundColor:'#576574',
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:4,
      },
      header:{
        fontSize: 24,
        marginBottom: 50,
        marginTop: 8,
        fontWeight: 'bold'
        
        
      }

    }

);

export default LoginScreen