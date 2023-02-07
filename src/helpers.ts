import router from "./router";

export const getLocal = <T>(localName: string): T => {
  const local = localStorage.getItem(localName)!;
  return JSON.parse(local);
};

export const setLocal = (localName: string, value: unknown) => {
  const valueToString = JSON.stringify(value);
  localStorage.setItem(localName, valueToString);
};

export const goTo = (id: number) => {
  router.push("/workspace/" + id);
};

export const outsideClick = (
  element: HTMLElement,
  events: string[],
  callback: Function
) => {
  const html = document.documentElement;
  const outside = "data-outside";
  function handleOutsideClick(event: Event) {
    if (event.target && event.target instanceof HTMLElement) {
      if (!element.contains(event.target)) {
        element.removeAttribute(outside);
        events.forEach((userEvent) => {
          html.removeEventListener(userEvent, handleOutsideClick);
        });
        callback();
      }
    }
  }

  if (!element.hasAttribute(outside)) {
    events.forEach((userEvent) => {
      setTimeout(() => html.addEventListener(userEvent, handleOutsideClick));
    });
    element.setAttribute(outside, "");
  }
};

export const romanize = (num: number) => {
  let roman = "";
  const lookup: { [key: string]: number } = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  for (const i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
};

export const captalize = (str: string) => {
  const capt = (word: string) => word[0].toUpperCase() + word.slice(1);

  const strArr = str.split(" ");

  return strArr.map(capt).join(" ");
};
