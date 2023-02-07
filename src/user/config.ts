import emitter from "@/emitter";
import methods from "./methods";
import { getLocal, setLocal } from "@/helpers";

import type { UserConfig } from "env";

const handleUpdate = (value: unknown) => {
  if (!value || ["string", "number", "boolean"].includes(typeof value)) return;
  const configObj = value as { [key: string]: string };
  const configName = Object.keys(configObj)[0];
  const configValue = configObj[configName];

  if (configName in config && configName in methods) {
    config[configName as keyof UserConfig] = configValue;
    methods[configName](configValue);
    setLocal("config", config);
  }
};

const handleExistentLocal = (config: UserConfig) => {
  Object.keys(config).forEach((k) => {
    if (k in methods) methods[k](config[k as keyof UserConfig]);
  });
};

const initialCheck = () => {
  const localConfig = getLocal<UserConfig>("config");
  if (!localConfig) setLocal("config", config);
  config = localConfig;
  handleExistentLocal(localConfig);
};

let config: UserConfig = {
  font: "1",
  family: "Segoe UI",
  theme: "Default",
  styleItem: "default",
};

initialCheck();
emitter.on("UPDATE_USER_CONFIG", handleUpdate);
