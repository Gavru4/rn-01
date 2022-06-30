// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, Image } from "react-native";
// import { Camera } from "expo-camera";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { MaterialIcons } from "@expo/vector-icons";

// const CreatePostsScreen = () => {
//   // const [camera, setCamera] = useState(null);
//   // const [photo, setPhoto] = useState(null);

//   // const takePhoto = async () => {
//   //   const photo = await camera.takePictureAsync();
//   //   setPhoto(photo.uri);
//   //   console.log("photo", photo);
//   // };
//   const [hasPermission, setHasPermission] = useState(null);
//   const [cameraRef, setCameraRef] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       await MediaLibrary.requestPermissionsAsync();

//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={styles.camera}
//         ref={(ref) => {
//           setCameraRef(ref);
//         }}
//       >
//         <TouchableOpacity
//           style={styles.cameraBtnWrap}
//           onPress={async () => {
//             if (cameraRef) {
//               const { uri } = await cameraRef.takePictureAsync();
//               // await MediaLibrary.createAssetAsync(uri);
//             }
//           }}
//         >
//           {photo && (
//             <View style={styles.imageWrap}>
//               <Image source={{ uri: photo }} />
//             </View>
//           )}
//           <MaterialIcons name="photo-camera" size={24} color="red" />
//         </TouchableOpacity>
//       </Camera>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 16,

//     backgroundColor: "#FFFFFF",
//     // justifyContent: "center",
//   },
//   camera: {
//     height: 240,
//     marginTop: 30,
//     alignItems: "center",
//     justifyContent: "center",

//     backgroundColor: "#F6F6F6",
//     borderColor: "#E8E8E8",
//     borderWidth: 1,
//     borderRadius: 8,
//   },
//   cameraBtnWrap: {
//     width: 60,
//     height: 60,
//     alignItems: "center",
//     justifyContent: "center",

//     borderRadius: "50",
//     backgroundColor: "#FFFFFF",
//   },
//   imageWrap: {},
// });
///////////////////////////////////////////////////////////////////////////////
//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} ref={setCamera}>
//         {photo && (
//           <View style={styles.takePhotoContainer}>
//             <Image
//               source={{ uri: photo }}
//               style={{ height: 200, width: 200 }}
//             />
//           </View>
//         )}
//         <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
//           <Text style={styles.snap}>SNAP</Text>
//         </TouchableOpacity>
//       </Camera>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   camera: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-end",
//   },
//   snap: {
//     color: "#fff",
//   },
//   snapContainer: {
//     borderWidth: 1,
//     borderColor: "#ff0000",
//     width: 70,
//     height: 70,
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   takePhotoContainer: {
//     position: "absolute",
//     top: 50,
//     left: 10,
//     borderColor: "#fff",
//     borderWidth: 1,
//   },//////////
// });

// export default CreateScreen;
/////////////////////////////////////////////////////////////////////////////
// import React, { useState } from "react";
// import { View, Text, StyleSheet, Image } from "react-native";

// import { Camera } from "expo-camera";
// import { TouchableOpacity } from "react-native-gesture-handler";

// export default CreatePostsScreen;
import React, { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
} from "react-native";

import { Camera } from "expo-camera";

// import * as MediaLibrary from "expo-media-library";

import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { FontAwesome5 } from "@expo/vector-icons";

export default function CreatePostsScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  // const [type, setType] = useState(Camera.Constants.Type.back);
  // const [camera, setCamera] = useState(null);

  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setPhoto(uri);
    }
  };

  const sendPhoto = () => {
    navigation.navigate("Posts", { photo });
    setPhoto(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={-105}
    >
      <Camera
        style={styles.camera}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        {photo && (
          <View style={styles.imageWrap}>
            <Image source={{ uri: photo }} style={styles.image} />
          </View>
        )}
        <View style={styles.photoView}>
          <TouchableOpacity
            style={styles.cameraBtnWrap}
            onPress={() => takePhoto()}
          >
            <MaterialIcons name="photo-camera" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </Camera>

      <Text style={styles.textLoadPhoto}>Upload a photo</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder={"Name"}
          placeholderTextColor="#BDBDBD"
          // onChangeText={(value) =>
          //   setstate((prevState) => ({ ...prevState, email: value }))
          // }
          // onFocus={()=>{setIsShowKeyboard(true)}}
        />
        <View style={styles.locationInputWrap}>
          <Feather name="map-pin" size={18} color="black" />
          <TextInput
            style={styles.locationInput}
            // value={state.email}
            placeholder={"Location"}
            placeholderTextColor="#BDBDBD"
            // onChangeText={(value) =>
            //   setstate((prevState) => ({ ...prevState, email: value }))
            // }
            // onFocus={()=>{setIsShowKeyboard(true)}}
          />
        </View>

        <TouchableOpacity style={styles.sendBtn} onPress={sendPhoto}>
          <Text style={styles.sendBtnText}>Publish</Text>
        </TouchableOpacity>

        <View style={styles.deleteBtnWrap}>
          <TouchableOpacity style={styles.deleteBtn}>
            <FontAwesome5 name="trash-alt" size={18} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
{
  /* <TouchableOpacity
            style={styles.flipContainer}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Flip{" "}
            </Text>
          </TouchableOpacity> */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,

    backgroundColor: "#FFFFFF",
    // justifyContent: "center",
  },
  camera: {
    height: 240,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 2,
    borderRadius: 20,
  },
  photoView: {
    // // flex: 1,
    // backgroundColor: "transparent",
    // justifyContent: "flex-end",
    // borderRadius: 8,
  },

  //   flipContainer: {
  //     flex: 0.1,
  //     alignSelf: "flex-end",
  //   },
  cameraBtnWrap: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: "50",
    backgroundColor: "#FFFFFF",
  },
  imageWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 20,
  },
  image: {
    height: 240,
    width: 343,
    // alignItems: "center",
    // justifyContent: "center",
  },
  button: {
    width: "100%",
    height: "100%",
  },

  //   takePhotoOut: {
  //     borderWidth: 2,
  //     borderColor: "white",
  //     height: 50,
  //     width: 50,
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     borderRadius: 50,
  //   },

  //   takePhotoInner: {
  //     borderWidth: 2,
  //     borderColor: "white",
  //     height: 40,
  //     width: 40,
  //     backgroundColor: "white",
  //     borderRadius: 50,
  //   },

  textLoadPhoto: {
    marginTop: 8,

    fontFamily: "Roboto-Medium",
    fontSize: 16,

    color: "#BDBDBD",
  },

  input: {
    marginTop: 48,
    paddingBottom: 15,

    fontFamily: "Roboto-Medium",
    fontSize: 16,

    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  locationInputWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 32,
    paddingBottom: 15,

    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  locationInput: {
    marginLeft: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },

  sendBtn: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    height: 50,

    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
  sendBtnText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,

    color: "#BDBDBD",
  },

  deleteBtnWrap: {
    alignItems: "center",
    justifyContent: "center",
  },

  deleteBtn: {
    alignItems: "center",
    justifyContent: "center",

    height: 40,
    width: 70,
    marginTop: 80,
    // marginTop:120,

    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
});
