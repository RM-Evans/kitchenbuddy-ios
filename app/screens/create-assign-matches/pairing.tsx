// import React, { useState } from "react"
// import { View, ViewStyle, TextStyle } from "react-native"
// import { Button, Text } from "../../components"
// import { color, spacing, typography } from "../../theme"
// import { DummyModal } from "./dummy-modal"

// export type PairType = { 
//   question: string, 
//   questionSound: string, 
//   answer: string, 
//   answerSound: string 
// } 

// const BTN_CONNECTOR: ViewStyle = {
//   top: 40,
//   width: 30,
//   height: 2,
//   marginHorizontal: -10,
//   justifyContent: "center",
//   backgroundColor: color.palette.black,
// }


// const MATCH_ASSIGN_BUTTONS_CONTAINER: ViewStyle = {
//   flex: 10,
//   justifyContent: "center",
//   flexDirection: "row",
//   paddingBottom: 50,
// }

// const MATCH_ASSIGN_BUTTONS: ViewStyle = {
//   marginHorizontal: spacing[3],
//   paddingVertical: spacing[2],
//   marginTop: 2,
//   borderRadius: 20,
//   height: 75,
//   width: 115,

//   backgroundColor: color.palette.skyBlue,
//   borderWidth: 2,
//   borderColor: color.palette.darkBlue,
// }

// const BOLD: TextStyle = { fontWeight: "bold" }
// const PRIMARYTEXTCOLOR: TextStyle = { color: color.palette.darkBlue }
// const TEXT: TextStyle = {
//   ...PRIMARYTEXTCOLOR,
//   fontFamily: typography.primary,
// }


// const MATCH_ASSIGN_BUTTONS_PRIMARY_TEXT: TextStyle = {
//   ...TEXT,
//   ...BOLD,
//   color: color.palette.offWhite,
//   fontSize: 20,
// }

// type PairingProps = { pair: PairType, setPair: (pair: PairType) => unknown }
// const Pairing = (props: PairingProps) => {
//   const { pair, setPair } = props
//   const [modalVisible, setModalVisible] = useState(false)
//   const [target, setTarget] = useState<'question' | 'answer' | undefined>()

//   const showModal = (dataType: 'question' | 'answer') => () => {
//     // modal already open
//     if( !target ){
//       setTarget(dataType)
//       setModalVisible(true)
//     }
//   }

//   const modalClose = (item: any) => {
//     setModalVisible(false)
//     if( target === 'question' ){
//       const question = item.title
//       const questionSound = item.soundFile
//       setPair({ ...pair, question, questionSound })
//       setTarget(undefined)
//     }else if (target === 'answer'){
//       const answer = item.title
//       const answerSound = item.soundFile
//       setPair({ ...pair, answer, answerSound })
//       setTarget(undefined)
//     }
//   }


//   const components = modalVisible 
//     ? (
//       <React.Fragment>
//         <Button style={MATCH_ASSIGN_BUTTONS} onPress={() => setModalVisible(false)} text="test"/>
//       </React.Fragment>
//     )
//     : (
//       <React.Fragment>
//         <Button style={MATCH_ASSIGN_BUTTONS} onPress={showModal('question')}>
//           <Text style={MATCH_ASSIGN_BUTTONS_PRIMARY_TEXT}>
//             { pair.question || 'Q?' }
//           </Text>
//         </Button>

//         <View style={BTN_CONNECTOR}></View>

//         <Button style={MATCH_ASSIGN_BUTTONS} onPress={showModal('answer')}>
//           <Text style={MATCH_ASSIGN_BUTTONS_PRIMARY_TEXT}>
//             { pair.answer || 'A?' }
//           </Text>
//         </Button>
//       </React.Fragment>
//     ) 

//   return (
//     <View style={MATCH_ASSIGN_BUTTONS_CONTAINER}>
//       { components }
//     </View>
//   )
// }

// export default Pairing