// import React, {useState} from "react"
// //TextInput HOC?
// import { View, ViewStyle, TextStyle, TextInput, ImageStyle, SafeAreaView, Modal, Pressable, Alert } from "react-native"

// import { observer } from "mobx-react-lite"
// import { Button, Screen, Text, Wallpaper, AutoImage as Image } from "../../components"
// import { color, spacing, typography } from "../../theme"




// export const AssignMatchesListModal = observer(function AssignMatchesListModal() {
//     const [modalVisible, setModalVisible] = useState(false);
//     return (
//       <View >
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => {
//             Alert.alert("Modal has been closed.");
//             setModalVisible(!modalVisible);
//           }}
//         >
//           <View >
//             <View>
//               <Text >Hello World!</Text>
//               <Pressable
//                 // style={[styles.button, styles.buttonClose]}
//                 onPress={() => setModalVisible(!modalVisible)}
//               >
//                 <Text >Hide Modal</Text>
//               </Pressable>
//             </View>
//           </View>
//         </Modal>
//         </View>
// }



//TODO: CREATE MODAL COMPONENT 