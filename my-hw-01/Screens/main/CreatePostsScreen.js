import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
} from "react-native";

import { Camera } from "expo-camera";
import * as Location from "expo-location";

// import * as MediaLibrary from "expo-media-library";
// const [type, setType] = useState(Camera.Constants.Type.back);
// const [camera, setCamera] = useState(null);

import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { FontAwesome5 } from "@expo/vector-icons";

export default function CreatePostsScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState({});

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setPhoto(uri);
    }
    const location = await Location.getCurrentPositionAsync({});
    console.log("location :>> ", location);
  };
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const sendPhoto = () => {
    navigation.navigate("DefaultScreen", { photo });
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
