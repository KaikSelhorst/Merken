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
