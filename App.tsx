import React, { FC } from "react";
import Route from "./route";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

const App: FC = () => {
  axios.defaults.baseURL = "http://192.168.43.106:5001/api";

  const [fontsLoaded] = useFonts({
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
    PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <>
      <Provider store={store}>
        <Route />
      </Provider>
      <StatusBar style="light" />
    </>
  );
};

export default App;
