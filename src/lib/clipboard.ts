import * as Clipboard from "expo-clipboard";
import flashMessage from "./flashMessage";

export const copyToClipboard = (text: string) => {
  (Clipboard as any).setString(text);
  flashMessage("copied!");
};
