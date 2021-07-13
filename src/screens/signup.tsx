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

//redux
import { globalStyles } from "../styles";

// components
import FlashLoading from "../components/flashLoading";

//lib
import flashMessage from "../lib/flashMessage";

interface SignUpProps {
  navigation: any;
}

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const SignUp: FC<SignUpProps> = ({ navigation }) => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validation = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
  });

  const submit = async (
    values: FormValues,
    action: {
      resetForm: (arg0: {
        values: { name: string; email: string; password: string };
      }) => void;
    }
  ) => {
    try {
      const { data, status } = await axios.post("/register", values);
      flashMessage(data.message);
      if (status === 201) navigation.navigate("Login");
    } catch (err) {
      action.resetForm({
        values: {
          name: values.name,
          email: "",
          password: values.password,
        },
      });
      flashMessage("Email ID already exist!");
    }
  };
  return (
    <>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          {/* heading */}
          <View>
            <Text
              style={[
                globalStyles.text,
                globalStyles.fontBold,
                {
                  fontSize: 30,
                  textTransform: "capitalize",
                  textAlign: "center",
                },
              ]}
            >
              Create new account!
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
              Please fill in the form to continue
            </Text>
          </View>

          {/* form */}
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
            }: FormikProps<FormValues>) => (
              <>
                <View style={styles.form}>
                  <Text
                    style={[
                      globalStyles.text,
                      globalStyles.fontMedium,
                      styles.label,
                    ]}
                  >
                    Full Name
                  </Text>
                  <TextInput
                    value={values.name}
                    style={[
                      globalStyles.text,
                      globalStyles.fontMedium,
                      styles.input,
                      errors.name && touched.name ? { borderColor: "red" } : {},
                      { borderWidth: 1 },
                    ]}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    placeholder="Full Name"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                  />

                  {errors.name && touched.name && (
                    <Text style={styles.error}>{errors.name}</Text>
                  )}

                  <Text
                    style={[
                      globalStyles.text,
                      globalStyles.fontMedium,
                      styles.label,
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
                      errors.email && touched.email
                        ? { borderColor: "red" }
                        : {},
                      { borderWidth: 1 },
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
                      globalStyles.fontMedium,
                      styles.label,
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
                      { borderWidth: 1 },
                    ]}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    placeholder="************"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    secureTextEntry={true}
                  />

                  {errors.password && touched.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}

                  {/* @ts-ignore */}
                  <Pressable style={styles.btn} onPress={handleSubmit}>
                    <Text
                      style={[
                        globalStyles.text,
                        globalStyles.fontMedium,
                        { textAlign: "center", fontSize: 15 },
                      ]}
                    >
                      Sign Up
                    </Text>
                  </Pressable>
                  <Pressable onPress={() => navigation.navigate("Login")}>
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
                      Already have an account ? Login
                    </Text>
                  </Pressable>
                </View>
                <FlashLoading show={isSubmitting} />
              </>
            )}
          </Formik>
        </ScrollView>
      </View>
    </>
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
    marginTop: 30,
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
  },
  input: {
    height: 60,
    borderRadius: 10,
    backgroundColor: "#222831",
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: "#4F74FF",
    height: 50,
    justifyContent: "center",
    borderRadius: 10,
  },
});

export default SignUp;
