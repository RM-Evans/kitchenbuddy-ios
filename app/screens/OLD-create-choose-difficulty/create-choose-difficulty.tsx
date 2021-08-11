import React, {useState} from "react"
//TextInput HOC?
import { View, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native"
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

const DIFFICULTY_BUTTONS_CONTAINER: ViewStyle = {
    flex: 10,
    justifyContent: "center",

  paddingHorizontal: spacing[2],
  paddingBottom: 100,
}


const DIFFICULTY_BUTTONS: ViewStyle = {
    marginHorizontal: spacing[6],
    paddingVertical: spacing[2],
    marginTop: 50,
    borderRadius: 20,
    height: 150,

    backgroundColor: color.palette.skyBlue,
    borderWidth: 2,
    borderColor: color.palette.darkBlue,
}

const DIFFICULTY_BUTTONS_PRIMARY_TEXT: TextStyle = {

    ...TEXT,
    ...BOLD,
    color: color.palette.offWhite,
    fontSize: 30,


  }

  const DIFFICULTY_BUTTONS_SECONDARY_TEXT: TextStyle = {

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






// for devving

  const SIGNUP_REDIRECT_TEXT: TextStyle = {
      flex: 1,
      ...TEXT,
      textAlign: "center",
      
  }

  const SIGNUP_REDIRECT_LINK: TextStyle = {
      ...TEXT,
      ...BOLD,
      textDecorationLine: 'underline',
  }


export const ChooseDifficulty = observer(function ChooseDifficulty() {

    const navigation = useNavigation()
    // const nextScreen = () => navigation.navigate("login")
    const goBack = () => navigation.goBack()

    const goLogin= () => navigation.navigate("login")

    const goChooseTitle = () => navigation.navigate("choose_title")

    const goMainMenu = () => navigation.navigate("main_menu")

    

    
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

                <View style={DIFFICULTY_BUTTONS_CONTAINER}>

                    <Button style={DIFFICULTY_BUTTONS} onPress={goChooseTitle}>
                        <Text style={DIFFICULTY_BUTTONS_PRIMARY_TEXT}>1</Text>
                        <Text style={DIFFICULTY_BUTTONS_SECONDARY_TEXT}>6 pairs</Text>
                    </Button>

                    <Button style={DIFFICULTY_BUTTONS} onPress={goChooseTitle}>
                        <Text style={DIFFICULTY_BUTTONS_PRIMARY_TEXT}>2</Text>
                        <Text style={DIFFICULTY_BUTTONS_SECONDARY_TEXT}>10 pairs</Text>
                    </Button>

                    <Button style={DIFFICULTY_BUTTONS} onPress={goChooseTitle}>
                        <Text style={DIFFICULTY_BUTTONS_PRIMARY_TEXT}>3</Text>
                        <Text style={DIFFICULTY_BUTTONS_SECONDARY_TEXT}>14 pairs</Text>
                    </Button>
                   

                </View>
                

                {/* FOR DEVVING */}
                <Text 
                 style={SIGNUP_REDIRECT_TEXT}
                 >
                 main menu<Text style={SIGNUP_REDIRECT_LINK} onPress={goMainMenu}> menu </Text>
                </Text>
                
                </Screen>
            </View>
            
 

    )
})