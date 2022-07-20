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
import * as ImagePicker from "expo-image-picker";
import { firestore, storage } from "../../firebase/config";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { getUserId, getUserNickName } from "../../redux/auth/authSelectors";

export default function CreatePostsScreen({ navigation }) {
  // const [type, setType] = useState(Camera.Constants.Type.back);

  const userId = useSelector(getUserId);
  const nickName = useSelector(getUserNickName);

  const [cameraRef, setCameraRef] = useState(null);

  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState(null);
  const [address, setUserAddress] = useState(null);

  const takeUserPhoto = async () => {
    if (cameraRef) {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === "granted") {
        const { uri } = await cameraRef.takePictureAsync();

        await setPhoto(uri);
        // const location = await Location.getCurrentPositionAsync({});

        const userPosition = await Location.getCurrentPositionAsync({});

        if (userPosition) {
          const { latitude, longitude } = userPosition.coords;
          const response = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
          });
          await setUserAddress(...response);
        }
        setLocation({
          latitude: userPosition.coords.latitude,
          longitude: userPosition.coords.longitude,
        });
      } else {
        Alert.alert("Access denied");
      }
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      // const location = await Location.getCurrentPositionAsync({});

      // if (location) {
      //   const { latitude, longitude } = location.coords;
      //   const response = await Location.reverseGeocodeAsync({
      //     latitude,
      //     longitude,
      //   });
      //   await setUserAddress(...response);
      // }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  const uploadPhotoToServer = async () => {
    if (photo) {
      const response = await fetch(photo);
      const file = await response.blob();

      const uniqueId = Date.now().toString();
      await storage.ref(`image/${uniqueId}`).put(file);

      const photoUrl = await storage
        .ref("image")
        .child(uniqueId)
        .getDownloadURL();

      return photoUrl;
    } else Alert.alert("No photo");
  };

  const createPost = async () => {
    const userPhotoUrl = await uploadPhotoToServer();

    const createUserPost = await firestore.collection("posts").add({
      userPhotoUrl,
      photoComment: comment,
      userId,
      nickName,
      location,
      like: 0,
      comments: [],
      address: {
        city: address.city,
        country: address.country,
        region: address.region,
      },
    });

    return createUserPost;
  };

  const sendPhoto = async () => {
    await createPost();
    await navigation.navigate("DefaultScreen");

    setPhoto(null);
    setComment("");
    setLocation(null);
    setUserAddress(null);
  };
  const delPostInform = () => {
    setPhoto(null);
    setComment("");
    setLocation(null);
    setUserAddress(null);
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
            onPress={() => takeUserPhoto()}
          >
            <MaterialIcons name="photo-camera" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </Camera>

      <View style={styles.photoBtnWrap}>
        <TouchableOpacity onPress={() => pickImage()}>
          <Text style={styles.textLoadPhoto}>Upload a photo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPhoto(null)}>
          <Text style={styles.textLoadPhoto}>Make new photo</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TextInput
          style={styles.input}
          placeholder={"Name..."}
          placeholderTextColor="#BDBDBD"
          onChangeText={setComment}
          value={comment}
        />
        <View style={styles.locationInputWrap}>
          <Feather name="map-pin" size={18} color="black" />
          <TextInput
            style={styles.locationInput}
            value={address ? `${address.region} ,${address.country}` : ""}
            placeholder={"Location"}
            placeholderTextColor="#BDBDBD"
          />
        </View>

        <TouchableOpacity style={styles.sendBtn} onPress={sendPhoto}>
          <Text style={styles.sendBtnText}>Publish</Text>
        </TouchableOpacity>

        <View style={styles.deleteBtnWrap}>
          <TouchableOpacity style={styles.deleteBtn} onPress={delPostInform}>
            <FontAwesome5 name="trash-alt" size={18} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,

    backgroundColor: "#FFFFFF",
  },

  camera: {
    height: 240,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
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
  },
  image: {
    height: 240,
    width: 343,
  },
  button: {
    width: "100%",
    height: "100%",
  },
  photoBtnWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
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
    marginTop: 60,
  },

  deleteBtn: {
    alignItems: "center",
    justifyContent: "center",

    height: 40,
    width: 70,

    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
});
