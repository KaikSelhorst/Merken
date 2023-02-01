import emitter from "@/emitter";

export const familys = ["Segoe UI", "Helvetica", "Georgia", "Gill Sans"];

const ELEMENT_TO_STYLE = document.documentElement.style;

const changeFont = (font: string) => {
  ELEMENT_TO_STYLE.fontSize = `${Number(font) * 16}px`;
};

const changeFamily = (family: string) => {
  emitter.emit("FAMILY_HAS_CHANGED", family);
  ELEMENT_TO_STYLE.fontFamily = `${family}, sans-serif`;
};

const methods: { [config: string]: any } = {
  font: changeFont,
  family: changeFamily,
};

export default methods;
