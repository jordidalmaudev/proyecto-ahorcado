window.onload = () => {
  window.addEventListener("message", (event) => {
    if (event.origin == "http://127.0.0.1:5500") {
      let intentos = event.data;
      let imagenIntentos = document.getElementById("imagenIntentos");
      imagenIntentos.src = `./img/${intentos}.jpg`;
    }
  });
};
