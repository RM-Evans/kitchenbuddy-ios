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


// const HEADER: TextStyle = {
    
//     paddingTop: spacing[5],
//     paddingBottom: spacing[5] - 1,
//     paddingHorizontal: 0,

//        borderWidth: 3,
//   borderColor: "red"
//   }
//   const HEADER_TITLE: TextStyle = {
//     ...TEXT,
//     ...BOLD,
//     fontSize: 12,
//     lineHeight: 15,
//     textAlign: "center",
//     letterSpacing: 1.5,
//   }

//   const LOGIN_TITLE: TextStyle = {
//     ...TEXT,
//     ...BOLD,
//     fontSize: 30,
    
//     textAlign: "center",
//     marginBottom:30,
//     letterSpacing: 1.5,
//   }

  const EMAIL_SUBMIT_BTN: ViewStyle = {

      marginHorizontal: spacing[6],
      paddingVertical: spacing[2],
      marginTop: 50,
      borderRadius: 20,

      backgroundColor: color.transparent,
      borderWidth: 2,
      borderColor: color.palette.darkBlue,
  }

  const EMAIL_SUBMIT_BTN_TEXT: TextStyle = {

    color: color.palette.darkBlue,
    
    fontSize: 18,



  }

  const FORM_CONTAINER: ViewStyle = {
      flex: 7,
      justifyContent: "center",

    paddingHorizontal: spacing[6],
    paddingBottom: 100,



  }

//   const FORM_FIELD_TITLE: TextStyle = {
//       ...TEXT,
//         opacity: 0.5,
//         fontSize: 16,
//         paddingLeft: 5,
//         marginVertical: spacing[2]
//   }

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


export const PasswordRecoveryScreen = observer(function PasswordRecoveryScreen() {
    const navigation = useNavigation()
    // const nextScreen = () => navigation.navigate("login")
    const goBack = () => navigation.goBack()
    const goLogin = () => navigation.navigate("login")
  
    return (
        
            <View testID="LoginScreen" style={FULL}>

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


                <Button onPress={goBack} style={EMAIL_SUBMIT_BTN}><Text style={EMAIL_SUBMIT_BTN_TEXT}>send email</Text></Button> 



                </View>
                
                <Text 
                 style={LOGIN_REDIRECT_TEXT}
                 >
                 Know your password already?<Text style={LOGIN_REDIRECT_LINK} onPress={goLogin}> Login </Text>
                </Text>

                
                 
                </Screen>
            </View>
 

    )
})