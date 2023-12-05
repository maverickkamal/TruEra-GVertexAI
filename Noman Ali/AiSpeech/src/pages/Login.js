import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import React from 'react';
import logo from '../images/logo.png';
 
const { width, height } = Dimensions.get('window');
const Login = ({navigation}) => {
    return (
    <KeyboardAvoidingView >
      <ScrollView persistentScrollbar={false}>
        <View style={styles.mainContainer}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.image} />
          </View>
          <View style={styles.contenContianer}>
            <View style={styles.content}>
              <Text style={styles.logintext}>Login to your Account</Text>
              <TextInput
                style={styles.input}
                // onChangeText={onChangeText}
                // value={text}
                placeholder="Email"
              />
              <TextInput
                style={styles.input}
                // onChangeText={onChangeText}
                // value={text}
                placeholder="Password"
                secureTextEntry={true} //we just added this
              />
              <TouchableOpacity style={[styles.button, styles.shadowProp]}onPress={() => navigation.navigate('Home')}>
                <Text style={styles.btnText} >Sign in</Text>
              </TouchableOpacity>
              <View style={styles.textNavDiv}>
                <Text style={styles.accText}>Don't have an account?</Text>
                <Text
                  style={styles.signNavText}
                  onPress={() => navigation.navigate('SignUp')}>
                  Sign up
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    height:height ,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    width: width,
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'center',
  },
  contenContianer: {
    width: width,
    flex:3,
    alignItems: 'center',
  },
  logintext: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    alignSelf:"center"
  },
  content: {
    width: width*0.9,
    height: height*0.6,
    justifyContent: 'space-evenly',
  },
  input: {
    height: 55,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    height: 55,
    borderRadius: 10,
    backgroundColor: '#20319D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  textNavDiv: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  accText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#A09595',
  },
  signNavText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#20319D',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
});

export default Login;

