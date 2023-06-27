//DECLARO LOS PRODUCTOS DE UN ARRAYS DE OBJETOS PARA QUE SEA DINAMICO.
const dbMarket = [
  {
    id: 1,
    nombre: "Arroz",
    precio: 1300,
    imagen: "assets/img/productos/arroz.jpg",
  },
  {
    id: 2,
    nombre: "Cebollas",
    precio: 800,
    imagen: "assets/img/productos/cebolla.jpg",
  },
  {
    id: 3,
    nombre: "Bebidas",
    precio: 1800,
    imagen: "assets/img/productos/bebidas.png",
  },
  {
    id: 4,
    nombre: "Detergente",
    precio: 5600,
    imagen: "assets/img/productos/detergente.jpg",
  },
];

// INICIO DECLARANDO EL ARRAY DE CARRITO

let carrito = [];
const moneda = "$";
// MANIPULO EL DOM.
const galeriaProductosDOM = document.querySelector(".container-productos");
const carritoDOM = document.querySelector(".carrito");
const totalDOM = document.querySelector("#total");
const botonVaciarDOM = document.querySelector("#btn-vaciar");

/* vamos a crear una funcion que renderize todos los datos que dejamos en la BD. No confundir con el carrito es para mostrar los elementos  */

function mostrarProductos() {
  dbMarket.forEach((producto) => {
    //estructura a integrar por cada producto
    const tarjetaContainer = document.createElement("div");
    tarjetaContainer.classList.add("card", "col-sm-4", "tarjeta-cuerpo"); //añadimos la clase card
    // Body tarjeta
    const bodyTarjeta = document.createElement("div");
    bodyTarjeta.classList.add("card-body");
    //titulo
    const tituloTarjeta = document.createElement("h5");
    tituloTarjeta.classList.add("card-title");
    tituloTarjeta.textContent = `${producto.nombre}`;
    // Imagen de tarjeta
    const imagenTarjeta = document.createElement("img");
    imagenTarjeta.classList.add("card-img-top", "img-fluid", "img-tarjeta");
    imagenTarjeta.setAttribute("src", producto.imagen); //seteo el src y añado la descripcion de mi objeto
    //precio
    const precioTarjeta = document.createElement("p");
    precioTarjeta.classList.add("card-text");
    precioTarjeta.textContent = `${moneda}${producto.precio}`;
    // Boton de añadir al carrito
    const botonAñadir = document.createElement("button");
    botonAñadir.classList.add("btn", "btn-primary");
    botonAñadir.textContent = "Añadir al Carrito.";
    botonAñadir.setAttribute("marcador", producto.id);
    botonAñadir.addEventListener("click", aniadirCarrito);
    //botonAñadir.addEventListener('click',anadirAlCarrito);

    //Armamos la tarjeta
    //con appenchild lo insertamos como hijo del contenedor nombado antes
    bodyTarjeta.appendChild(tituloTarjeta);
    bodyTarjeta.appendChild(precioTarjeta);
    bodyTarjeta.appendChild(botonAñadir);

    tarjetaContainer.appendChild(imagenTarjeta);
    tarjetaContainer.appendChild(bodyTarjeta);
    galeriaProductosDOM.appendChild(tarjetaContainer);
  });
}
// FUNCION AÑADIR AL CARRITO
function aniadirCarrito(evento) {
  carrito.push(evento.target.getAttribute("marcador"));
  //actualizar carrito - render carrito
  renderCarrito();
}
//crearemos la funcion para renderizar el carrito
function renderCarrito() {
  carritoDOM.textContent = "";
  // elimar duplicados -creando una copia del arreglo principal
  const carritoSinDuplicados = [...new Set(carrito)];
  carritoSinDuplicados.forEach((item) => {
    // obtenemos el indice segun necesitemos
    const miItem = dbMarket.filter((itemDB) => {
      return itemDB.id === parseInt(item);
    });

    //cuenta el numero de veces que se repite el producto
    const cantidadRepiteUnidades = carrito.reduce((total, itemID) => {
      //si coinciden reduce si no mantengo
      return itemID === item ? (total += 1) : total;
    }, 0);

    // creamos el item dentro d ela lista mediante LI inyecto
    const miLiCarrito = document.createElement("li");
    miLiCarrito.classList.add("list-group-item", "text-right", "mx-2");

    miLiCarrito.textContent = `${cantidadRepiteUnidades} x ${miItem[0].nombre} - ${moneda}${miItem[0].precio}`;

    //boton eliminar item
    const miBoton = document.createElement("button");
    miBoton.classList.add("btn", "btn-danger", "mx-5");
    miBoton.textContent = "X";
    miBoton.style.marginLeft = "1rem";
    miBoton.dataset.item = item;
    miBoton.addEventListener("click", borrarItemCarrito); // falta asignar el evento al btn

    // juntamos lo creado mediante nodps
    miLiCarrito.appendChild(miBoton);
    carritoDOM.appendChild(miLiCarrito);
  });
  // render el precio total
  totalDOM.textContent = calcularTotal();
}

//FUNCION PARA CALCULAR EL TOTAL
function calcularTotal() {
  // 1- recorremos el array del carrito
  return carrito.reduce((total, item) => {
    //sacamos el precio de cada item
    const miItem = dbMarket.filter((itemDB) => {
      return itemDB.id === parseInt(item);
    });
    return total + miItem[0].precio;
  }, 0);
}

//FUNCION PARA BORRAR ITEM DE CARRITO
function borrarItemCarrito(evento) {
  // Obtenemos el producto ID que hay en el boton pulsado
  const id = evento.target.dataset.item;
  // Borramos todos los productos
  carrito = carrito.filter((carritoId) => {
    return carritoId !== id;
  });
  // volvemos a renderizar
  renderCarrito();
}

//renderizar a pantalla llamar a las funciones
mostrarProductos();
renderCarrito();
