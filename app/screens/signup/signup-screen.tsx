import React from "react"
//TextInput HOC?
import { View, ViewStyle, TextStyle, TextInput, ImageStyle, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper, AutoImage as Image } from "../../components"
import { color, spacing, typography } from "../../theme"



const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],



}

const BOLD: TextStyle = { fontWeight: "bold" }
const PRIMARYTEXTCOLOR: TextStyle = {color: color.palette.darkBlue}
const TEXT: TextStyle = {
  ...PRIMARYTEXTCOLOR,
  fontFamily: typography.primary,
}




  const SIGNUP_SUBMIT_BTN: ViewStyle = {

      marginHorizontal: spacing[6],
      paddingVertical: spacing[2],
      marginTop: 50,
      borderRadius: 20,

      backgroundColor: color.transparent,
      borderWidth: 2,
      borderColor: color.palette.darkBlue,
  }

  const SIGNUP_SUBMIT_BTN_TEXT: TextStyle = {

    color: color.palette.darkBlue,
    
    fontSize: 18,



  }

  const FORM_CONTAINER: ViewStyle = {
      flex: 7,
      justifyContent: "center",

    paddingHorizontal: spacing[6],
    paddingBottom: 100,



  }



  const FORMTEXT: TextStyle = { fontSize: 20, paddingLeft: 10 }
    const FORM_FIELD: ViewStyle = {
    ...FORMTEXT,
    height:45,

    // borderWidth:1,
    
    borderBottomWidth: 2,

    // borderRadius: 15,
    
    borderColor: color.palette.darkBlue,
    marginTop: 30,
    
  }


  const LOGIN_REDIRECT_TEXT: TextStyle = {
      flex: 1,
      ...TEXT,
      textAlign: "center",
      
  }

  const LOGIN_REDIRECT_LINK: TextStyle = {
      ...TEXT,
      ...BOLD,
      textDecorationLine: 'underline',
  }


export const SignupScreen = observer(function RegisterScreen() {
    const navigation = useNavigation()
    // const nextScreen = () => navigation.navigate("login")
    const goBack = () => navigation.goBack()
    const goLogin = () => navigation.navigate("login")
  
    return (
        
            <View testID="SignupScreen" style={FULL}>

                <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
                {/* <Header
                headerText="login"
                leftIcon="back"
                onLeftPress={goBack}
                style={HEADER}
                titleStyle={HEADER_TITLE}
                /> */}
                
                <View style={FORM_CONTAINER}>
                {/* <Text text="LOGIN" style={LOGIN_TITLE} /> */}
                    {/* <Text text="email address" style={FORM_FIELD_TITLE} />  */}
                    <TextInput
                    style={FORM_FIELD}
                    placeholder="email"
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"

                    returnKeyType="next"
                    // onSubmitEditing={() => { this.loginPassword.focus(); }}
                    // https://stackoverflow.com/questions/32748718/react-native-how-to-select-the-next-textinput-after-pressing-the-next-keyboar
                    //
                    // blurOnSubmit={false}
                    />
                    {/* <Text text="password" style={FORM_FIELD_TITLE}/>  */}
                    <TextInput
                    style={FORM_FIELD}
                    placeholder="password"
                    autoCapitalize="none"
                    textContentType="password"
                    secureTextEntry={true}
                    />

                  <TextInput
                    style={FORM_FIELD}
                    placeholder="confirm password"
                    autoCapitalize="none"
                    textContentType="password"
                    secureTextEntry={true}
                    />


                <Button onPress={goBack} style={SIGNUP_SUBMIT_BTN}><Text style={SIGNUP_SUBMIT_BTN_TEXT}>sign up</Text></Button> 



                </View>
                
                <Text 
                 style={LOGIN_REDIRECT_TEXT}
                 >
                 Already have an account?<Text style={LOGIN_REDIRECT_LINK} onPress={goLogin}> Login </Text>
                </Text>

                
                 
                </Screen>
            </View>
 

    )
})