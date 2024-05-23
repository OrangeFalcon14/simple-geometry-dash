export interface Bindings {
  " ": Function;
}

export function initInput(bindings: Bindings): void {
  window.addEventListener("keydown", (event) => {
    for (let [key, callback] of Object.entries(bindings)) {
      if (event.key == key) callback();
    }
  });
}
