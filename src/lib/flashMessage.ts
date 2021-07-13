import { ToastAndroid } from "react-native";

export default function flashMessage(text: string = "Loading...") {
  ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.CENTER);
}
