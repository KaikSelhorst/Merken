import type { Workspace } from "env";
import router from "./router";

export const getLocal = (): Workspace[] => {
  const local = localStorage.getItem("workspaces")!;
  return JSON.parse(local);
};

export const setLocal = (value: unknown) => {
  const valueToString = JSON.stringify(value);
  localStorage.setItem("workspaces", valueToString);
};

export const goTo = (id: number) => {
  router.push("/workspace/" + id);
};
