import React, { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

//redux
import { useDispatch } from "react-redux";
import { auth, userDetails } from "../redux/action";

//styles
import { globalStyles } from "../styles";

//components
import FlashLoading from "../components/flashLoading";

// lib
import flashMessage from "../lib/flashMessage";

interface LoginProps {
  navigation: any;
}

interface FormValues {
  email: string;
  password: string;
}

const Login: FC<LoginProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validation = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
  });

  const submit = async (values: FormValues) => {
    try {
      const { data } = await axios.post("/login", values);
      const { name, userid }: { name: string; userid: string } = jwtDecode(
        data.jat
      );
      await AsyncStorage.setItem("jat", data.jat);
      dispatch(userDetails({ username: name, email: userid }));
      dispatch(auth());
    } catch (err) {
      flashMessage("Wrong email or password");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {/* heading */}
        <Text
          style={[
            globalStyles.fontBold,
            globalStyles.text,
            {
              fontSize: 30,
              textTransform: "capitalize",
              textAlign: "center",
            },
          ]}
        >
          Welcome back!
        </Text>
        <Text
          style={[
            globalStyles.fontMedium,
            {
              color: "rgba(255,255,255,0.6)",
              fontSize: 15,
              textAlign: "center",
            },
          ]}
        >
          Please sign in to your account
        </Text>
        <Formik
          initialValues={initialValues}
          onSubmit={submit}
          validationSchema={validation}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            errors,
            touched,
          }: FormikProps<FormValues> & {
            handleChange: React.FormEvent<HTMLFormElement>;
          }) => (
            <>
              <View style={styles.form}>
                <Text
                  style={[
                    globalStyles.text,
                    styles.label,
                    globalStyles.fontMedium,
                  ]}
                >
                  Email ID
                </Text>
                <TextInput
                  value={values.email}
                  style={[
                    globalStyles.text,
                    globalStyles.fontMedium,
                    styles.input,
                    errors.email && touched.email ? { borderColor: "red" } : {},
                  ]}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  placeholder="Email ID"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                {errors.email && touched.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}

                <Text
                  style={[
                    globalStyles.text,
                    styles.label,
                    globalStyles.fontMedium,
                  ]}
                >
                  Password
                </Text>
                <TextInput
                  value={values.password}
                  style={[
                    globalStyles.text,
                    globalStyles.fontMedium,
                    styles.input,
                    errors.password && touched.password
                      ? { borderColor: "red" }
                      : {},
                  ]}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  placeholder="********"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  secureTextEntry={true}
                />

                {errors.password && touched.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}

                {/* @ts-ignore */}
                <Pressable
                  style={styles.btn}
                  onPress={handleSubmit}
                  underlayColor="#334a9c"
                >
                  <Text
                    style={[
                      globalStyles.text,
                      globalStyles.fontMedium,
                      { textAlign: "center", fontSize: 15 },
                    ]}
                  >
                    Sign In
                  </Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("Register")}>
                  <Text
                    style={[
                      globalStyles.text,
                      globalStyles.fontMedium,
                      {
                        textAlign: "center",
                        paddingTop: 20,
                        paddingBottom: 20,
                        fontSize: 15,
                      },
                    ]}
                  >
                    Don't have an account ? Register
                  </Text>
                </Pressable>
              </View>
              <FlashLoading show={isSubmitting} />
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#05050C",
  },
  form: {
    marginTop: 40,
  },
  label: {
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
  input: {
    height: 60,
    borderRadius: 10,
    backgroundColor: "#222831",
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 20,
    borderWidth: 1,
  },
  btn: {
    backgroundColor: "#4F74FF",
    height: 50,
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
  },
});

export default Login;
