import React from "react";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { authSignUpUser } from "../../redux/auth/authOperation";
import { AntDesign } from "@expo/vector-icons";

const initialState = {
  login: "",
  email: "",
  password: "",
  avatarImage: null,
};

export default function RegistrationScreen({ navigation }) {
  const [form, setForm] = useState(initialState);
  const [inputFocus, setInputFocus] = useState(false);
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window") - 16 * 2
  );

  const dispatch = useDispatch();

  const onRegisterBtnPress = () => {
    dispatch(authSignUpUser(form));
    setForm(initialState);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setForm((prev) => ({
        ...prev,
        avatarImage: result.uri,
      }));
    }
  };

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;

      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
      // Dimensions.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-160}
        style={styles.container}
      >
        <View style={styles.container}>
          <ImageBackground
            style={styles.backgroundImage}
            source={require("../../assets/images/photoBG.jpg")}
          >
            <View style={styles.formWrap}>
              <TouchableOpacity
                style={styles.imgWrap}
                onPress={() => pickImage()}
              >
                {form.avatarImage && (
                  <Image
                    source={{ uri: form.avatarImage }}
                    style={{ width: 120, height: 120, borderRadius: 16 }}
                  />
                )}
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color="#FF6C00"
                  style={styles.pluscircleo}
                />
              </TouchableOpacity>
              <View style={styles.headWrap}>
                <Text style={styles.head}>Registration</Text>
              </View>
              <TextInput
                value={form.login}
                style={[
                  styles.input,
                  { borderColor: inputFocus ? "#FF6C00" : "#E8E8E8" },
                ]}
                placeholderTextColor="#BDBDBD"
                placeholder="Login"
                onChangeText={(value) =>
                  setForm((prevState) => ({ ...prevState, login: value }))
                }
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
              ></TextInput>
              <TextInput
                value={form.email}
                style={[
                  styles.input,
                  { borderColor: inputFocus ? "#FF6C00" : "#E8E8E8" },
                ]}
                placeholderTextColor="#BDBDBD"
                placeholder="Email address"
                onChangeText={(value) =>
                  setForm((prevState) => ({ ...prevState, email: value }))
                }
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
              ></TextInput>
              <View style={styles.passwordWrap}>
                <TextInput
                  placeholderTextColor="#BDBDBD"
                  value={form.password}
                  style={[
                    styles.input,
                    { borderColor: inputFocus ? "#FF6C00" : "#E8E8E8" },
                  ]}
                  placeholder="Password"
                  secureTextEntry={isSecureEntry}
                  onChangeText={(value) =>
                    setForm((prevState) => ({ ...prevState, password: value }))
                  }
                  onFocus={() => setInputFocus(true)}
                  onBlur={() => setInputFocus(false)}
                ></TextInput>
                <TouchableOpacity
                  style={styles.showHideText}
                  onPress={() => {
                    setIsSecureEntry((prev) => !prev);
                  }}
                >
                  <Text>{isSecureEntry ? "Show" : "Hide"}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={onRegisterBtnPress}
                activeOpacity={0.8}
                style={styles.registerBtn}
              >
                <View>
                  <Text style={styles.registerBtnText}>Register</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.singInBtn}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.singInBtnText}>
                  Already have an account? To come in
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <StatusBar style="auto" />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  formWrap: {
    width: "100%",
    marginHorizontal: 32,
    paddingTop: 90,
    paddingBottom: 75,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,

    backgroundColor: "#fff",
  },

  imgWrap: {
    position: "absolute",
    width: 120,
    height: 120,
    left: 128,
    top: -60,

    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  pluscircleo: {
    position: "absolute",
    right: 0,
    bottom: 20,
  },
  headWrap: {
    alignItems: "center",
  },
  head: {
    marginBottom: 35,
    fontFamily: "Roboto-Medium",
    fontWeight: "bold",
    fontSize: 30,
    // lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",
  },
  input: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    padding: 5,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  passwordWrap: {
    position: "relative",
  },
  showHideText: {
    position: "absolute",
    right: 32,
    top: 16,

    fontFamily: "Roboto-Regular",
    fontSize: 16,
    // line-height: 19px;
    color: "#1B4371",
  },
  registerBtn: {
    height: 50,
    marginTop: 17,
    marginBottom: 16,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 100,

    ...Platform.select({
      android: {
        backgroundColor: "transparent",
        borderColor: "#FF6C00",
      },
      ios: {
        backgroundColor: "#FF6C00",
      },
      default: {
        backgroundColor: "blue",
      },
    }),
  },
  registerBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    // lineHeight: 1.2,
    color: "#FFFFFF",
  },
  singInBtn: {
    alignItems: "center",
    justifyContent: "center",
  },
  singInBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
  },
});
