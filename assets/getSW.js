if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js?v2", {
    scope: "." // <--- THIS BIT IS REQUIRED
  });
}
