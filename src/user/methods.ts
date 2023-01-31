import emitter from "@/emitter";

export const familys = [
  "Roboto Mono",
  "Segoe UI",
  "Fira Code",
  "IBM Plex Mono",
  "JetBrains Mono",
  "Source Code Pro",
  "Roboto",
  "Ubuntu",
  "Helvetica",
];

const ELEMENT_TO_STYLE = document.documentElement.style;
const GOOGLE_FONT_URL = `https://fonts.googleapis.com/css?family=`;

const changeFont = (font: string) => {
  ELEMENT_TO_STYLE.fontSize = `${Number(font) * 16}px`;
};

const changeFamily = (family: string) => {
  emitter.emit("FAMILY_HAS_CHANGED", family);
  if (familys.includes(family)) {
    document.getElementById("family-google")?.remove();
    document.head.innerHTML += `
    <link rel="stylesheet" href="${GOOGLE_FONT_URL}${family}" id='family-google' >
  `;
  }
  ELEMENT_TO_STYLE.fontFamily = `${family}, monospace`;
};

const methods: { [config: string]: any } = {
  font: changeFont,
  family: changeFamily,
};

export default methods;
