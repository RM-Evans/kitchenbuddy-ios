import React, {useState} from "react"
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

const GAME_TITLE_DESCRIPTION: TextStyle = {
    ...TEXT,
    ...BOLD,
    fontSize:20,
    textAlign: 'center',
    
    
}

const TITLE_FORM_CONTAINER: ViewStyle = {
    flex: 10,
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
marginTop: 65,

}


const NEXT_BUTTON: ViewStyle = {
    marginHorizontal: spacing[8],
    paddingVertical: spacing[2],
    marginTop: 65,
    borderRadius: 20,
    height: 50,

    backgroundColor: color.palette.skyBlue,
    borderWidth: 2,
    borderColor: color.palette.darkBlue,
}

const NEXT_BUTTON_TEXT: TextStyle = {

    ...TEXT,
    ...BOLD,
    color: color.palette.offWhite,
    fontSize: 20,


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


export const ChooseTitle = observer(function ChooseTitle() {

    const navigation = useNavigation()
    // const nextScreen = () => navigation.navigate("login")
    const goBack = () => navigation.goBack()

    const goLogin = () => navigation.navigate("login")
    
    const goChooseDifficulty = () => navigation.navigate('choose_difficulty')

   
    const goMainMenu = () => navigation.navigate("main_menu")



    
    return (

        
        
            <View testID="LoginScreen" style={FULL}>

                <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>

                

                <View style={TITLE_FORM_CONTAINER}>

                <Text style={GAME_TITLE_DESCRIPTION}>Name your game:</Text>

                <TextInput
                    style={FORM_FIELD}
                    placeholder="game title"
                    autoCapitalize="none"
                    />

                    <Button style={NEXT_BUTTON}><Text style={NEXT_BUTTON_TEXT}>NEXT</Text></Button>  

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