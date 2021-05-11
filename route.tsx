import React, { FC, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

// screens
import Home from "./src/screens/home";
import Add from "./src/screens/add";
import Login from "./src/screens/login";
import AnimeProfile from "./src/screens/animeProfile";
import Signup from "./src/screens/signup";
import Profile from "./src/screens/Profile";

// redux
import { auth, userDetails, notauth } from "./src/redux/action";
import { useDispatch, useSelector } from "react-redux";

const Stack = createStackNavigator();

const Route: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const access = useSelector((s: any) => s.isauth);

  useEffect(() => {
    AsyncStorage.getItem("jat")
      .then((value) => {
        if (value !== null) {
          const {
            exp,
            name,
            userid,
          }: { exp: number; name: string; userid: string } = jwtDecode(value);
          if (exp * 1000 < new Date().getTime()) {
            dispatch(notauth());
          } else {
            dispatch(
              userDetails({
                username: name,
                email: userid,
              })
            );
            dispatch(auth());
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {access ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Add" component={Add} />
            <Stack.Screen name="AnimeProfile" component={AnimeProfile} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Signup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
