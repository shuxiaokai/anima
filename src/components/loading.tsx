import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

export default function Loading() {
  const spinAnim = useRef(new Animated.Value(0)).current;

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <View style={styles.box}>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          transform: [{ rotate: spin }, { perspective: 1000 }],
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 10,
            left: 20,
            backgroundColor: "rgba(255,255,255,0.7)",
            height: 10,
            width: 10,
            borderRadius: 100,
          }}
        />

        <View
          style={{
            position: "absolute",
            top: 20,
            left: 10,
            backgroundColor: "rgba(255,255,255,0.7)",
            height: 10,
            width: 10,
            borderRadius: 100,
          }}
        />
        <View
          style={{
            position: "absolute",
            top: 30,
            left: 20,
            backgroundColor: "rgba(255,255,255,0.7)",
            height: 10,
            width: 10,
            borderRadius: 100,
          }}
        />

        <View
          style={{
            position: "absolute",
            top: 20,
            right: 10,
            backgroundColor: "rgba(255,255,255,0.7)",
            height: 10,
            width: 10,
            borderRadius: 100,
          }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    position: "relative",
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
});
