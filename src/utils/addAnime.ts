import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { add_data } from "../redux/action";
import flashMessage from "../lib/flashMessage";
import { Dispatch } from "redux";

export const addAnime = async (
  title: string,
  image_url: string,
  mal_id: string,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: Dispatch<any>
) => {
  setShow(true);
  const send = { title, image_url, mal_id };
  try {
    const jat = await AsyncStorage.getItem("jat");
    const { data } = await axios.post("/anime/add", send, {
      headers: {
        hauth: jat,
      },
    });
    dispatch(add_data(data.data));
    flashMessage("added!");
  } catch (err) {
    flashMessage("something went wrong while adding!");
  }
  setShow(false);
};
