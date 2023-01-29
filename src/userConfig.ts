import emitter from "./emitter";

import type { UserConfig } from "env";
import { getLocal, setLocal } from "./helpers";

const changeFont = (font: string) => {
  document.documentElement.style.fontSize = `${Number(font) * 16}px`;
};
const changeFamily = (family: string) => {
  document.documentElement.style.fontFamily = `${family}, monospace`;
};

const handleProperty = (value: unknown) => {
  if (!value) return;
  const property = value as { [key: string]: string };
  const propertyName = Object.keys(property)[0];
  const propertyValue = property[propertyName];
  if (propertyName in userConfig && propertyName in configurations) {
    userConfig[propertyName as keyof UserConfig] = propertyValue;
    configurations[propertyName](propertyValue);
    setLocal("config", userConfig);
  }
};

let userConfig: UserConfig = {
  font: "1",
  family: "Segoe UI",
};

const configurations: { [key: string]: any } = {
  font: changeFont,
  family: changeFamily,
};

if (!getLocal("config")) {
  setLocal("config", userConfig);
} else {
  userConfig = getLocal<UserConfig>("config");
  Object.keys(userConfig).forEach((key: string) => {
    if (key in configurations) {
      configurations[key](userConfig[key as keyof UserConfig]);
    }
  });
}

emitter.on("UPDATE_USER_CONFIG", handleProperty);
