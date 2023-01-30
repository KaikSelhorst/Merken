import emitter from "@/emitter";

const ELEMENT_TO_STYLE = document.documentElement.style;

const changeFont = (font: string) => {
  ELEMENT_TO_STYLE.fontSize = `${Number(font) * 16}px`;
};

const changeFamily = (family: string) => {
  ELEMENT_TO_STYLE.fontFamily = `${family}, monospace`;
  emitter.emit("FAMILY_HAS_CHANGED", family);
};

const methods: { [config: string]: any } = {
  font: changeFont,
  family: changeFamily,
};

export default methods;
