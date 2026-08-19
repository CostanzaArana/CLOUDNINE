// ==========================
// BACKDROP Y CONTROL DE SCROLL GLOBAL
// ==========================

const backdrop = document.getElementById("backdrop");

function toggleBodyScroll(disable) {
  document.body.style.overflow = disable ? "hidden" : "";
}

function openBackdrop() {
  if (backdrop) backdrop.classList.add("active");
  toggleBodyScroll(true);
}

function closeBackdrop() {
  if (backdrop) backdrop.classList.remove("active");
  toggleBodyScroll(false);
}

// Cierre global al tocar/cliquear fuera (en la zona oscura)
if (backdrop) {
  backdrop.addEventListener("click", () => {
    closeMenu();
    closeCart();
  });
}


// ==========================
// MENÚ LATERAL OVERLAY
// ==========================

const menuToggle = document.getElementById("menuToggle");
const menuOverlay = document.getElementById("menuOverlay");
const menuClose = document.getElementById("menuClose");

function openMenu() {
  if (menuOverlay) menuOverlay.classList.add("open");
  if (menuToggle) menuToggle.setAttribute("aria-expanded", "true");
  openBackdrop();
}

function closeMenu() {
  if (menuOverlay) menuOverlay.classList.remove("open");
  if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
  closeBackdrop();
}

if (menuToggle && menuOverlay) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuOverlay.classList.contains("open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

if (menuClose) {
  menuClose.addEventListener("click", closeMenu);
}


// ==========================
// CONFIGURACIÓN Y DÓLAR BLUE
// ==========================

const MARGIN = 1.65;
const FALLBACK_RATE = 1300;
const WHATSAPP_NUMBER = "5493547322726";

let dolarBlueRate = null;
let marcaSeleccionada = 'all'; // <--- AGREGAR ESTA LÍNEA AQUÍ


// ==========================
// TOAST NOTIFICATION
// ==========================

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}


// ==========================
// CATÁLOGO DE PRODUCTOS
// ==========================
/*
const PRODUCTS = [

  // =====================================================
  // DESCARTABLES - ELF BAR
  // =====================================================

  {
    brand: "ELF BAR",
    name: "BC5000",
    category: "descartables",
    image: "assets/BC5000.jpg",
    outOfStock: false,
    puffs: 5000,
    flavors: [
      { name: "Blackberry Cherry", usd: 5.5 },
      { name: "Cherry Dragon Fruit", usd: 5.5 },
      { name: "Sour Grape Chew", usd: 5.5 },
      { name: "Strawberry Banana", usd: 5.5 },
      { name: "Cranberry Puncher", usd: 5.5 },
      { name: "Banana Cake", usd: 5.5 },
      { name: "Pineapple Orange Mint", usd: 5.5 }
    ]
  },

  {
    brand: "ELF BAR",
    name: "TE5000",
    category: "descartables",
    image: "assets/TE5000.jpg",
    outOfStock: false,
    puffs: 5000,
    flavors: [
      { name: "Blue Razz Lemon", usd: 5.0 }
    ]
  },

  {
    brand: "ELF BAR",
    name: "TE6000",
    category: "descartables",
    image: "assets/TE6000.jpg",
    outOfStock: false,
    puffs: 6000,
    flavors: [
      { name: "Grape Ice", usd: 5.5 },
      { name: "Blue Razz Ice", usd: 5.5 },
      { name: "Strawberry Ice", usd: 5.5 },
      { name: "Apple Peach", usd: 5.5 },
      { name: "Lemon Drop", usd: 5.5 },
      { name: "Juicy Peach", usd: 5.5 },
      { name: "Hawaii Punch", usd: 5.5 },
      { name: "Clear", usd: 5.5 },
      { name: "Ice Mint", usd: 5.5 }
    ]
  },

  {
    brand: "ELF BAR",
    name: "BC10000",
    category: "descartables",
    image: "assets/BC10000.jpg",
    outOfStock: false,
    puffs: 10000,
    flavors: [
      { name: "Cherry Red Apple Lemon", usd: 10.0 },
      { name: "Pear Watermelon Dragonfruit", usd: 10.0 }
    ]
  },

  {
    brand: "ELF BAR",
    name: "BC15K",
    category: "descartables",
    image: "assets/BC15K.jpg",
    outOfStock: false,
    puffs: 15000,
    flavors: [
      { name: "Miami Mint", usd: 9.0, outOfStock: true },
      { name: "Bubbalo Grape", usd: 9.0 },
      { name: "Watermelon Ice", usd: 9.0 },
      { name: "Blue Razz Ice", usd: 9.0 },
      { name: "Peach Mango Watermelon", usd: 9.0 },
      { name: "Blueberry Ice", usd: 9.0 },
      { name: "Sakura Grape", usd: 9.0, outOfStock: true },
      { name: "Mango Grape", usd: 9.0 },
      { name: "Strawberry Watermelon", usd: 9.0 }
    ]
  },

  {
    brand: "ELF BAR",
    name: "GH23000",
    category: "descartables",
    image: "assets/GH23000.jpg",
    outOfStock: true,
    puffs: 23000,
    flavors: [
      { name: "Lime Grapfruit Ice", usd: 12.0 }
    ]
  },

  {
    brand: "ELF BAR",
    name: "TE30K",
    category: "descartables",
    image: "assets/TE30K.jpg",
    outOfStock: false,
    puffs: 30000,
    flavors: [
      { name: "Bubbaloo Grape", usd: 13.0 },
      { name: "Bubbaloo Tutti Frutty", usd: 13.0, outOfStock: true },
      { name: "Menthol", usd: 13.0 },
      { name: "Blueberry Ice", usd: 13.0, outOfStock: true },
      { name: "Strawberry Ice", usd: 13.0 }
    ]
  },

  {
    brand: "ELF BAR",
    name: "DUKE",
    category: "descartables",
    image: "assets/DUKE.jpg",
    outOfStock: false,
    puffs: 35000,
    flavors: [
      { name: "Blueberry Ice", usd: 12.5, outOfStock: true },
      { name: "Coconut Strawberry Ice", usd: 12.5, outOfStock: true },
      { name: "Blue Razz Ice", usd: 12.5, outOfStock: true },
      { name: "Fanta Grape", usd: 12.5, outOfStock: true },
      { name: "Grape Ice", usd: 12.5, outOfStock: true },
      { name: "Peach Mango Watermelon", usd: 12.5 },
      { name: "Watermelon Lemon Ice", usd: 12.5 }
    ]
  },

  {
    brand: "ELF BAR",
    name: "ICE KING",
    category: "descartables",
    image: "assets/ICE-KING.jpg",
    outOfStock: false,
    featured: true,
    puffs: 40000,
    flavors: [
      { name: "Cherry Fuse", usd: 13.5, outOfStock: true },
      { name: "Dragon Strawbanana", usd: 13.5 },
      { name: "Cherry Strazz", usd: 13.5, outOfStock: true },
      { name: "Double Apple Ice", usd: 13.5, outOfStock: true },
      { name: "Mango Magic", usd: 13.5, outOfStock: true },
      { name: "Miami Mint", usd: 13.5 },
      { name: "Baja Splash", usd: 13.5 },
      { name: "Sour Apple Ice", usd: 13.5, outOfStock: true },
      { name: "Peach", usd: 13.5, outOfStock: true },
      { name: "Strawberry Ice", usd: 13.5, outOfStock: true },
      { name: "Watermelon Ice", usd: 13.5, outOfStock: true },
      { name: "Green Apple Ice", usd: 13.5, outOfStock: true },
      { name: "Strawberry Watermelon", usd: 13.5, outOfStock: true },
      { name: "Grape Ice", usd: 13.5, outOfStock: true }
    ]
  },

  {
    brand: "ELF BAR",
    name: "TRIO",
    category: "descartables",
    image: "assets/TRIO.jpg",
    outOfStock: false,
    puffs: 40000,
    flavors: [
      { name: "Blue Razz Ice", usd: 13.5 },
      { name: "Blueberry Pom Slushy", usd: 13.5 },
      { name: "La Grape", usd: 13.5, outOfStock: true },
      { name: "Rasberry Watermelon", usd: 13.5 },
      { name: "Watermelon Ice", usd: 13.5 },
      { name: "Scary Berry", usd: 13.5 },
      { name: "Sakura Grape", usd: 13.5, outOfStock: true },
      { name: "Sour Strawberry Dragonfruit", usd: 13.5, outOfStock: true },
      { name: "Cool Menthol", usd: 13.5 },
      { name: "Pomegrate Blast", usd: 13.5 },
      { name: "Strawberry Orange Lime", usd: 13.5 },
      { name: "Pineapple Lime", usd: 13.5 }
    ]
  },

  {
    brand: "ELF BAR",
    name: "SOUR KING",
    category: "descartables",
    image: "assets/SOUR-KING.jpg",
    outOfStock: true,
    puffs: 40000,
    flavors: [
      { name: "Sour Pinkberry", usd: 13.5 },
      { name: "Sour Blue Razz Ice", usd: 13.5 },
      { name: "Sour Peach Rasberry", usd: 13.5 },
      { name: "Sour Island", usd: 13.5 },
      { name: "Citrico", usd: 13.5 }
    ]
  },


  // =====================================================
  // DESCARTABLES - IGNITE
  // =====================================================

  {
    brand: "IGNITE",
    name: "V40",
    category: "descartables",
    image: "assets/V40.jpg",
    outOfStock: false,
    puffs: 4000,
    flavors: [
      { name: "Strawberry Banana", usd: 5.0, outOfStock: true },
      { name: "Grape Ice", usd: 5.0 },
      { name: "Bluerazz Ice", usd: 5.0 },
      { name: "Peach Ice", usd: 5.0 },
      { name: "Pineapple Peach Lemonade", usd: 5.0 },
      { name: "Watermelon Ice", usd: 5.0, outOfStock: true },
      { name: "Mix Berries", usd: 5.5 },
      { name: "Strawberry Watermelon", usd: 5.5 },
      { name: "Peach Mango Watermelon", usd: 5.5 }
    ]
  },

  {
    brand: "IGNITE",
    name: "V50",
    category: "descartables",
    image: "assets/V50.jpg",
    outOfStock: true,
    puffs: 5000,
    flavors: [
      { name: "Green Apple", usd: 8.5 }
    ]
  },

  {
    brand: "IGNITE",
    name: "V55",
    category: "descartables",
    image: "assets/V55.jpg",
    outOfStock: false,
    puffs: 5500,
    flavors: [
      { name: "Watermelon Ice", usd: 9.0, outOfStock: true },
      { name: "Aloe Grape", usd: 9.0 },
      { name: "Melon Mix", usd: 9.0 },
      { name: "Minty Melon", usd: 9.0 },
      { name: "Blueberry Ice", usd: 9.0 },
      { name: "Vanilla Cream", usd: 11.0, outOfStock: true }
    ]
  },

  {
    brand: "IGNITE",
    name: "V80",
    category: "descartables",
    image: "assets/V80.jpg",
    outOfStock: false,
    puffs: 8000,
    flavors: [
      { name: "Blueberry Ice", usd: 9.5 },
      { name: "Grape Ice", usd: 9.5 },
      { name: "Strawberry Ice", usd: 9.5 },
      { name: "Tobacco", usd: 9.5 },
      { name: "Mojito Mint", usd: 9.5 },
      { name: "Frozen Grape", usd: 9.5 }
    ]
  },

  {
    brand: "IGNITE",
    name: "V120",
    category: "descartables",
    image: "assets/V120.jpg",
    outOfStock: true,
    puffs: 12000,
    flavors: [
      { name: "Aloe Grape", usd: 10.5 },
      { name: "Blue Razz Lemonade", usd: 10.5 },
      { name: "Lemon Line", usd: 10.5 }
    ]
  },

  {
    brand: "IGNITE",
    name: "V150",
    category: "descartables",
    image: "assets/V150.jpg",
    outOfStock: false,
    puffs: 15000,
    flavors: [
      { name: "Berry Blast", usd: 11.5 },
      { name: "Blueberry Ice", usd: 11.5 },
      { name: "Dragon Fruit Lemonade", usd: 11.5 },
      { name: "Sour Raspberry", usd: 11.5 }
    ]
  },

  {
    brand: "IGNITE",
    name: "V250",
    category: "descartables",
    image: "assets/V250.jpg",
    outOfStock: false,
    puffs: 25000,
    flavors: [
      { name: "Ice Mint", usd: 13.0, outOfStock: true },
      { name: "Strawberry Ice", usd: 13.0 },
      { name: "Pineapple Ice", usd: 13.0 },
      { name: "Grape Ice", usd: 13.0, outOfStock: true },
      { name: "Watermelon Ice", usd: 13.0, outOfStock: true },
      { name: "Strawberry Kiwi", usd: 13.0, outOfStock: true },
      { name: "Menthol", usd: 13.0, outOfStock: true }
    ]
  },

  {
    brand: "IGNITE",
    name: "V300",
    category: "descartables",
    image: "assets/V300.jpg",
    outOfStock: true,
    puffs: 30000,
    flavors: [
      { name: "Blueberry Ice", usd: 13.5 },
      { name: "Menthol", usd: 13.5 },
      { name: "Strawberry Banana", usd: 13.5 },
      { name: "Ice Mint", usd: 13.5 },
      { name: "Grape Ice", usd: 13.5 },
      { name: "Minty Melon", usd: 13.5 }
    ]
  },

  {
    brand: "IGNITE",
    name: "V400 MIX (Dos sabores)",
    image: "assets/V400-MIX.jpg",
    category: "descartables",
    outOfStock: false,
    featured: true,
    puffs: 40000,
    flavors: [
      { name: "Blueberry Ice + Rasberry Blackberry", usd: 14.9, outOfStock: true },
      { name: "Watermelon Ice + Cherry Ice", usd: 14.9, outOfStock: true },
      { name: "Grape Ice + Strawberry", usd: 14.9 },
      { name: "Strawberry Mango Ice + Banana Ice", usd: 14.9, outOfStock: true },
      { name: "Apple Ice + Strawberry Watermelon", usd: 14.9, outOfStock: true },
      { name: "Watermelon Grape Ice + Acai Ice", usd: 14.9, outOfStock: true },
      { name: "Grape Pop + Peach Ice", usd: 14.9, outOfStock: true },
      { name: "Banana Ice + Strawberry Ice", usd: 14.9, outOfStock: true },
      { name: "Orange Ice + Strawberry Ice", usd: 14.9 },
      { name: "Passion Fruit Sour Kiwi + Pineapple Ice", usd: 14.9, outOfStock: true }
    ]
  },

  {
    brand: "IGNITE",
    name: "V500 SLIM",
    category: "descartables",
    image: "assets/V500-SLIM.jpg",
    outOfStock: false,
    puffs: 50000,
    flavors: [
      { name: "Grape Ice", usd: 15.5, outOfStock: true },
      { name: "Strawberry Apple Watermelon", usd: 15.5 },
      { name: "Mango Passion Fruit", usd: 15.5 },
      { name: "Pineapple Mango", usd: 15.5 },
      { name: "Peach Grape", usd: 15.5 },
      { name: "Blueberry Ice", usd: 15.5, outOfStock: true }
    ]
  },


  // =====================================================
  // DESCARTABLES - THE BLACK SHEEP
  // =====================================================

  {
    brand: "THE BLACK SHEEP",
    name: "25K",
    category: "descartables",
    image: "assets/25K.jpg",
    outOfStock: false,
    puffs: 25000,
    flavors: [
      { name: "Strawberry Kiwi", usd: 9.0, outOfStock: true },
      { name: "Strawberry Bubblegum", usd: 9.0, outOfStock: true },
      { name: "Mango Grape", usd: 9.0 },
      { name: "Grape", usd: 9.0, outOfStock: true },
      { name: "One Mint", usd: 9.0 },
      { name: "Sour Green Apple", usd: 9.0, outOfStock: true },
      { name: "Passion Fruit", usd: 9.0, outOfStock: true }
    ]
  },

  {
    brand: "THE BLACK SHEEP",
    name: "ICE (Dos sabores)",
    category: "descartables",
    image: "assets/ICE.jpg",
    outOfStock: false,
    puffs: 30000,
    flavors: [
      { name: "Acai Strawberry / Grape Mango", usd: 14.5, outOfStock: true },
      { name: "Cherry Rasberry / Watermelon Strawberry", usd: 14.5 },
      { name: "Grape / Strawberry Banana", usd: 14.5 },
      { name: "Fresh Mint / Grape", usd: 14.5 },
      { name: "Strawberry Banana / Pineapple Coconut", usd: 14.5 }
    ]
  },

  {
    brand: "THE BLACK SHEEP",
    name: "40K (Dos sabores)",
    category: "descartables",
    image: "assets/40K.jpg",
    outOfStock: true,
    puffs: 40000,
    flavors: [
      { name: "Strawberry Kiwi / Fresh Mint", usd: 15.5 }
    ]
  },

  {
    brand: "THE BLACK SHEEP",
    name: "55K",
    category: "descartables",
    image: "assets/55K.jpg",
    outOfStock: false,
    puffs: 55000,
    flavors: [
      { name: "Aloe Grape", usd: 15.5, outOfStock: true },
      { name: "Strawberry Banana", usd: 15.5 },
      { name: "Watermelon Ice", usd: 15.5 },
      { name: "Blue Razz Ice", usd: 15.5 },
      { name: "Strawberry Ice", usd: 15.5 }
    ]
  },


  // =====================================================
  // DESCARTABLES - BLVK
  // =====================================================

  {
    brand: "BLVK",
    name: "JUST JUICE",
    category: "descartables",
    image: "assets/JUST-JUICE.jpg",
    outOfStock: false,
    puffs: 45000,
    flavors: [
      { name: "Dragon Strawbanana", usd: 14.0 },
      { name: "Grape Ice", usd: 14.0 },
      { name: "Strawberry Mango", usd: 14.0 },
      { name: "Blue Mint", usd: 14.0 }
    ]
  },


  // =====================================================
  // DESCARTABLES - LOST MARY
  // =====================================================

  {
    brand: "LOST MARY",
    name: "MO5000",
    category: "descartables",
    image: "assets/MO5000.jpg",
    outOfStock: false,
    puffs: 5000,
    flavors: [
      { name: "Blackberry Cherry Lemon", usd: 5.5 },
      { name: "Pure", usd: 5.5 },
      { name: "Plum Rose Mint", usd: 5.5 },
      { name: "Sour Gami Mint", usd: 5.5 },
      { name: "Alphonso Mango Ice", usd: 5.5 }
    ]
  },

  {
    brand: "LOST MARY",
    name: "MO20000",
    category: "descartables",
    image: "assets/MO20000.jpg",
    outOfStock: true,
    puffs: 20000,
    flavors: [
      { name: "Menthol", usd: 9.5 }
    ]
  },


  // =====================================================
  // DESCARTABLES - LOST VAPE
  // =====================================================

  {
    brand: "LOST VAPE",
    name: "ORION BAR",
    category: "descartables",
    image: "assets/ORION-BAR.jpg",
    outOfStock: false,
    featured: true,
    puffs: 10000,
    flavors: [
      { name: "Lush Ice", usd: 6.0 },
      { name: "Blue Razz Ice", usd: 6.0 },
      { name: "Pineaple Lemonade", usd: 6.0 },
      { name: "Rasberry Sour Apple", usd: 6.0 },
      { name: "Kiwi Passion Fruit Guava", usd: 6.0, outOfStock: true },
      { name: "Strawberry Summertime", usd: 6.0 }
    ]
  },


  // =====================================================
  // DESCARTABLES - NEVUX
  // =====================================================

  {
    brand: "NEVUX",
    name: "PULSE X",
    category: "descartables",
    image: "assets/PULSE-X.jpg",
    outOfStock: false,
    puffs: 40000,
    flavors: [
      { name: "Blue Razz Ice", usd: 12.0, outOfStock: true },
      { name: "Watermelon Ice", usd: 12.0, outOfStock: true },
      { name: "Miami Mint", usd: 12.0 }
    ]
  },


  // =====================================================
  // DESCARTABLES - AIRMEZ
  // =====================================================

  {
    brand: "AIRMEZ",
    name: "X-BEATS (Con buds)",
    image: "assets/X-BEATS.jpg",
    category: "descartables",
    outOfStock: false,
    puffs: 40000,
    flavors: [
      { name: "Grape Ice", usd: 13.5 },
      { name: "Strawberry Watermelon", usd: 13.5 },
      { name: "Bluerazz Ice", usd: 13.5 }
    ]
  },


  // =====================================================
  // DESCARTABLES - YOOZ
  // =====================================================

  {
    brand: "YOOZ",
    name: "LINKX 25000",
    category: "descartables",
    image: "assets/LINKX-25000.jpg",
    outOfStock: true,
    puffs: 25000,
    flavors: [
      { name: "Aloe Grape", usd: 12.0 },
      { name: "Watermelon Ice", usd: 12.0 }
    ]
  },


  // =====================================================
  // RECARGABLES - ELF BAR
  // =====================================================

  {
    brand: "ELF BAR",
    name: "ELFX 2",
    category: "recargables",
    image: "assets/ELFX-2.jpg",
    outOfStock: true,
    puffs: 600,
    flavors: [
      { name: "Sky Blue", usd: 18.0 }
    ]
  },

  {
    brand: "ELF BAR",
    name: "ELFX 2 - REPUESTO",
    category: "recargables",
    image: "assets/ELFX-2.jpg",
    outOfStock: true,
    info: "REPUESTO",
    flavors: [
      { name: "Resistencia completa x3", usd: 11.0 }
    ]
  },


  // =====================================================
  // RECARGABLES - IGNITE
  // =====================================================

  {
    brand: "IGNITE",
    name: "P100",
    category: "recargables",
    image: "assets/P100.jpg",
    outOfStock: false,
    featured: true,
    puffs: 10000,
    flavors: [
      { name: "Green Apple", usd: 14.5 },
      { name: "Grape Ice", usd: 14.5 },
      { name: "Strawberry Ice", usd: 14.5 },
      { name: "Ice Mint", usd: 14.5 }
    ]
  },

  {
    brand: "IGNITE",
    name: "P100 (RECARGA)",
    category: "recargables",
    image: "assets/P100.jpg",
    outOfStock: false,
    info: "RECARGA",
    flavors: [
      { name: "Blueberry Ice", usd: 9.0, outOfStock: true },
      { name: "Strawberry Kiwi", usd: 9.0 },
      { name: "Banana Ice", usd: 9.0 }
    ]
  },


  // =====================================================
  // RECARGABLES - THE BLACK SHEEP
  // =====================================================

  {
    brand: "THE BLACK SHEEP",
    name: "DUO MIX (RECARGABLE)",
    category: "recargables",
    image: "assets/DUO-MIX.jpg",
    outOfStock: false,
    featured: true,
    puffs: 30000,
    flavors: [
      { name: "Aloe Grape / Menthol", usd: 15.5 },
      { name: "Blue Magic / Aloe Grape", usd: 15.5, outOfStock: true },
      { name: "Fresh Mint / Passion Fruit", usd: 15.5 },
      { name: "Mango Orange", usd: 7.5, outOfStock: true },
      { name: "Miami Mint", usd: 7.5, outOfStock: true },
      { name: "Strawberry Watermelon", usd: 7.5 },
      { name: "Tropical Ice Bomb", usd: 7.5, outOfStock: true },
      { name: "Grape", usd: 7.5, outOfStock: true },
      { name: "Acai Strawbanana", usd: 7.5, outOfStock: true }
    ]
  },


  // =====================================================
  // LÍQUIDOS - IGNITE
  // =====================================================

  {
    brand: "IGNITE",
    name: "30ml",
    category: "liquidos",
    image: "assets/IGNITE-30ML.jpg",
    outOfStock: false,
    featured: true,
    ml: 30,
    flavors: [
      { name: "Berry Banana Sundae", usd: 10.0 },
      { name: "Mango Passion Breeze", usd: 10.0 },
      { name: "Green Apple Blizzard", usd: 10.0 },
      { name: "Mango Grape Apple Pops", usd: 10.0, outOfStock: true }
    ]
  },

  {
    brand: "IGNITE",
    name: "100ml",
    category: "liquidos",
    image: "assets/IGNITE-100ML.jpg",
    outOfStock: false,
    featured: true,
    ml: 100,
    flavors: [
      { name: "Watermelon Ice", usd: 12.0 },
      { name: "Strawberry Guava Ice", usd: 12.0 },
      { name: "Mango Ice", usd: 12.0 },
      { name: "Blueberry Ice", usd: 12.0 },
      { name: "Banana Ice", usd: 12.0 }
    ]
  },


  // =====================================================
  // LÍQUIDOS - THE BLACK SHEEP
  // =====================================================

  {
    brand: "THE BLACK SHEEP",
    name: "30ml",
    category: "liquidos",
    image: "assets/TBS-30ML.jpg",
    outOfStock: false,
    ml: 30,
    flavors: [
      { name: "Blue Razz Lemonade", usd: 10.0 },
      { name: "Mango Peach Watermelon", usd: 10.0, outOfStock: true }
    ]
  },


  // =====================================================
  // LÍQUIDOS - BLVK
  // =====================================================

  {
    brand: "BLVK",
    name: "60ml",
    category: "liquidos",
    image: "assets/BLVK-60ML.jpg",
    outOfStock: false,
    featured: true,
    ml: 60,
    flavors: [
      { name: "Grape Apple Ice", usd: 11.5 },
      { name: "Kiwi Pom Berry Ice", usd: 11.5 }
    ]
  }

];*/

// URL generada en el paso 1 por Google Apps Script
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwgOFv5CTOK2MQmwbL17LUnCRfGr3A1-G5aPvo3JE9-f7_iHzyJDxuVe8B5MnCldKh2aw/exec";

let PRODUCTS = [];


// ==========================
// FORMATO DE PESOS
// ==========================

const fmtARS = n =>
  n.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  });


// ==========================
// CÁLCULO DEL PRECIO
// ==========================

function priceFor(usd) {
  const rate = dolarBlueRate || FALLBACK_RATE;
  const precio = usd * rate * MARGIN;
  return Math.floor((precio + 100) / 500) * 500;
}


// ==========================
// Mapear los datos que vienen desde Google Sheets
// ==========================

async function fetchProductsFromSheet() {
  // 1. Intentar cargar inmediatamente desde la memoria local (¡Carga instantánea!)
  const cachedData = localStorage.getItem("cloudnine_products");
  if (cachedData) {
    PRODUCTS = JSON.parse(cachedData);
    if (typeof renderProducts === "function") renderProducts(); 
  }

  try {
    const res = await fetch(GOOGLE_SHEET_URL);
    const rawData = await res.json();

    const grouped = {};

    rawData.forEach(row => {
      // Clave única por producto
      const key = `${row.category}_${row.brand}_${row.name}`.toLowerCase();
      
      // Evaluamos si esta fila específica está marcada como destacada
      const isRowFeatured = row.featured === true || String(row.featured).toUpperCase() === "TRUE";

      if (!grouped[key]) {
        grouped[key] = {
          brand: String(row.brand || "").trim(),
          name: String(row.name || "").trim(),
          category: String(row.category || "").trim().toLowerCase(),
          image: row.image ? String(row.image).trim() : "assets/placeholder.jpg",
          featured: isRowFeatured,
          puffs: row.puffs ? Number(String(row.puffs).replace(",", ".")) : null,
          ml: row.ml ? Number(String(row.ml).replace(",", ".")) : null,
          info: row.info ? String(row.info) : null,
          flavors: []
        };
      } else {
        // SI EL PRODUCTO YA EXISTE: si esta nueva fila tiene featured = TRUE, actualizamos el producto
        if (isRowFeatured) {
          grouped[key].featured = true;
        }
      }

      // Agregar sabor a la lista de opciones
      if (row.flavor) {
        grouped[key].flavors.push({
          name: String(row.flavor).trim(),
          usd: Number(String(row.price_usd || 0).replace(",", ".")),
          outOfStock: row.flavor_outofstock === true || String(row.flavor_outofstock).toUpperCase() === "TRUE"
        });
      }
    });

    // Convertimos el objeto agrupado a array y calculamos automáticamente 
    // si el producto general está agotado basándonos en los sabores
    PRODUCTS = Object.values(grouped).map(product => {
      const isFullyOutOfStock = product.flavors.length > 0 && 
                                product.flavors.every(flavor => flavor.outOfStock);

      return {
        ...product,
        outOfStock: isFullyOutOfStock
      };
    });

    // 2. Guardar el nuevo resultado en la memoria local para futuras cargas
    localStorage.setItem("cloudnine_products", JSON.stringify(PRODUCTS));

    // 3. Volver a renderizar solo para refrescar con datos super actualizados
    if (typeof renderProducts === "function") renderProducts();

  } catch (error) {
    console.error("Error al obtener los datos de Google Sheets:", error);
  }
}


// ==========================
// DETECTAR PÁGINA HOME
// ==========================

function isHomePage() {
  const file = window.location.pathname.split("/").pop();
  return (file === "" || file === "index.html" || file === "index");
}


// ==========================
// CREAR TARJETA DE PRODUCTO
// ==========================

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "card";

  // 1. ORDENAMOS LOS SABORES: Disponibles primero, agotados al final
  const sortedFlavors = [...product.flavors].sort((a, b) => {
    const aOut = (a.outOfStock || product.outOfStock) ? 1 : 0;
    const bOut = (b.outOfStock || product.outOfStock) ? 1 : 0;
    return aOut - bOut;
  });

  // 2. GENERAMOS LAS OPCIONES EN BASE A LA LISTA ORDENADA
  const flavorOptions = sortedFlavors
    .map(flavor => {
      const isOut = flavor.outOfStock || product.outOfStock;
      const label = flavor.name + (isOut ? " (Agotado)" : "");
      return `<option value="${flavor.name}" ${isOut ? 'data-out="true"' : ''}>${label}</option>`;
    })
    .join("");

  let productInfo = "";

  if (product.puffs) {
    productInfo = `<p class="card-info">${product.puffs.toLocaleString("es-AR")} puffs</p>`;
  } else if (product.ml) {
    productInfo = `<p class="card-info">${product.ml} ml</p>`;
  } else if (product.info) {
    productInfo = `<p class="card-info">${product.info}</p>`;
  }

  const imageSrc = product.image || "assets/placeholder.jpg";

card.innerHTML = `
  <div class="card-img">
    <img src="${imageSrc}" alt="${product.brand} ${product.name}" loading="lazy">
  </div>
  <div class="card-body">
    <h3>${product.name}</h3>
    <label class="card-label">Sabor</label>
    <select class="card-select">
      ${flavorOptions}
    </select>
    ${productInfo}
    <label class="card-label">Cantidad</label>
    <input class="card-qty" type="number" min="1" value="1">
    <p class="card-price"></p>
    <button class="card-cta">Agregar al carrito</button>
  </div>
`;

  const selectEl = card.querySelector(".card-select");
  const qtyEl = card.querySelector(".card-qty");
  const priceEl = card.querySelector(".card-price");
  const ctaEl = card.querySelector(".card-cta");

  function currentFlavor() {
    const selectedName = selectEl.value;
    return product.flavors.find(flavor => flavor.name === selectedName);
  }

  function updateState() {
    const flavor = currentFlavor();
    if (!flavor) return;

    const isOut = flavor.outOfStock || product.outOfStock;

    if (isOut) {
      card.classList.add("out-of-stock");
      ctaEl.disabled = true;
      ctaEl.textContent = "Sin Stock";
      ctaEl.classList.add("disabled");
    } else {
      card.classList.remove("out-of-stock");
      ctaEl.disabled = false;
      ctaEl.textContent = "Agregar al carrito";
      ctaEl.classList.remove("disabled");
    }

    const qty = Math.max(1, parseInt(qtyEl.value) || 1);
    const total = priceFor(flavor.usd) * qty;
    priceEl.textContent = fmtARS(total);
  }

  selectEl.addEventListener("change", updateState);
  qtyEl.addEventListener("input", updateState);

  ctaEl.addEventListener("click", () => {
    const flavor = currentFlavor();
    if (!flavor || flavor.outOfStock || product.outOfStock) return;

    const qty = Math.max(1, parseInt(qtyEl.value) || 1);

    addToCart({
      brand: product.brand,
      name: product.name,
      flavor: flavor.name,
      usd: flavor.usd,
      qty
    });
  });

  updateState();

  return card;
}


// ==========================
// RENDERIZAR PRODUCTOS
// ==========================

let activePuffFilter = "all";

function renderProducts(searchTerm = "") {
  const genericGrid = document.getElementById("grid-productos") || document.getElementById("productos") || document.getElementById("catalogGrid");

  const containers = {
    descartables: document.getElementById("grid-descartables") || genericGrid,
    recargables: document.getElementById("grid-recargables") || genericGrid,
    liquidos: document.getElementById("grid-liquidos") || genericGrid
  };

  const home = isHomePage();
  const query = searchTerm.toLowerCase().trim();

  const cleaned = new Set();
  Object.values(containers).forEach(container => {
    if (container && !cleaned.has(container)) {
      container.innerHTML = "";
      cleaned.add(container);
    }
  });

  const isProductOutOfStock = (p) => {
    if (p.outOfStock) return true;
    if (p.flavors && p.flavors.length > 0) {
      return p.flavors.every(f => f.outOfStock);
    }
    return false;
  };

  const fullGrouped = {};
  PRODUCTS.forEach(product => {
    if (!fullGrouped[product.category]) {
      fullGrouped[product.category] = {};
    }
    if (!fullGrouped[product.category][product.brand]) {
      fullGrouped[product.category][product.brand] = [];
    }
    fullGrouped[product.category][product.brand].push(product);
  });

  buildNavigationMenu(fullGrouped);
  // Generar los botones de marcas según los productos cargados
  generarFiltrosMarcas(PRODUCTS);

  if (home && query === "") {
    const categories = ["descartables", "recargables", "liquidos"];

    categories.forEach(category => {
      const container = containers[category];
      if (!container) return;

      // Modifica tu filtro para ser más flexible:
      let featuredProducts = PRODUCTS.filter(p => p.category === category && (p.featured === true || String(p.featured).toLowerCase() === 'true'));

      if (featuredProducts.length === 0) {
        featuredProducts = PRODUCTS.filter(p => p.category === category).slice(0, 3);
      }

      featuredProducts.sort((a, b) => {
        return (isProductOutOfStock(a) ? 1 : 0) - (isProductOutOfStock(b) ? 1 : 0);
      });

      const homeGrid = document.createElement("div");
      homeGrid.className = "grid";

      featuredProducts.forEach(product => {
        const card = createProductCard(product);
        homeGrid.appendChild(card);
      });

      container.appendChild(homeGrid);
    });

    return;
  }

  const filteredGrouped = {};

PRODUCTS.forEach(product => {
    // NUEVO: Filtro por marca seleccionada
    if (marcaSeleccionada !== "all" && product.brand !== marcaSeleccionada) {
      return;
    }

    if (query !== "") {
      const matchBrand = product.brand.toLowerCase().includes(query);
      const matchName = product.name.toLowerCase().includes(query);
      const matchFlavor = product.flavors.some(f => f.name.toLowerCase().includes(query));

      if (!matchBrand && !matchName && !matchFlavor) return;
    }

    if (product.category === "descartables" && activePuffFilter !== "all" && product.puffs) {
      const puffs = product.puffs;
      if (activePuffFilter === "low" && puffs >= 10000) return;
      if (activePuffFilter === "mid" && (puffs < 10000 || puffs > 25000)) return;
      if (activePuffFilter === "high" && puffs < 30000) return;
    }

    if (!filteredGrouped[product.category]) {
      filteredGrouped[product.category] = {};
    }

    if (!filteredGrouped[product.category][product.brand]) {
      filteredGrouped[product.category][product.brand] = [];
    }

    filteredGrouped[product.category][product.brand].push(product);
  });

  Object.keys(containers).forEach(category => {
    const container = containers[category];
    if (!container) return;

    if (!filteredGrouped[category] || Object.keys(filteredGrouped[category]).length === 0) {
      if ((query !== "" || activePuffFilter !== "all") && container.innerHTML === "") {
        container.innerHTML = `<p class="no-results">No se encontraron productos con estos filtros.</p>`;
      }
      return;
    }

    Object.keys(filteredGrouped[category]).forEach(brand => {
      const products = filteredGrouped[category][brand];

      const sortedProducts = [...products].sort((a, b) => {
        return (isProductOutOfStock(a) ? 1 : 0) - (isProductOutOfStock(b) ? 1 : 0);
      });

      const brandSection = document.createElement("div");
      brandSection.className = "brand-section";

      const brandSlug = brand.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      brandSection.id = `${category}-${brandSlug}`;

      const brandTitle = document.createElement("h3");
      brandTitle.className = "brand-title";
      brandTitle.textContent = brand;

      const brandGrid = document.createElement("div");
      brandGrid.className = "grid brand-grid";

      sortedProducts.forEach(product => {
        const card = createProductCard(product);
        brandGrid.appendChild(card);
      });

      if (brandGrid.children.length > 0) {
        brandSection.appendChild(brandTitle);
        brandSection.appendChild(brandGrid);
        container.appendChild(brandSection);
      }
    });
  });

  handleInitialHashScroll();
}


// ==========================
// SCROLL AUTOMÁTICO (#HASH)
// ==========================

function handleInitialHashScroll() {
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }
}


// ==========================
// MANEJO DE BUSCADOR Y LUPA
// ==========================

const searchToggle = document.getElementById("searchToggle");
const searchBar = document.getElementById("searchBar");
const searchClose = document.getElementById("searchClose");
const searchInput = document.getElementById("searchInput");

function closeSearch() {
  if (searchBar) {
    searchBar.classList.remove("open");
  }
  if (searchInput && searchInput.value !== "") {
    searchInput.value = "";
    renderProducts("");
  }
}

if (searchToggle && searchBar) {
  searchToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = searchBar.classList.toggle("open");
    if (isOpen && searchInput) {
      searchInput.focus();
    } else {
      closeSearch();
    }
  });
}

if (searchClose) {
  searchClose.addEventListener("click", closeSearch);
}

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    renderProducts(e.target.value);
  });
}


// ==========================
// FILTROS DE PUFFS
// ==========================

const puffFiltersContainer = document.getElementById("puffFilters");

if (puffFiltersContainer) {
  const filterBtns = puffFiltersContainer.querySelectorAll(".filter-btn");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      activePuffFilter = btn.dataset.range;
      const currentQuery = searchInput ? searchInput.value : "";
      renderProducts(currentQuery);
    });
  });
}



function ordenarProductos(orden, btnElement) {
  // 1. Estilos visuales de los botones de precio
  document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.remove('active'));
  if (btnElement) {
    btnElement.classList.add('active');
  }

  // 2. Buscamos todas las grillas individuales de cada marca (.grid)
  const grids = document.querySelectorAll('.grid');

  grids.forEach(grid => {
    // Obtenemos solo las tarjetas (.card) de ESTA grilla
    const cards = Array.from(grid.children).filter(child => child.classList.contains('card'));
    
    if (cards.length <= 1) return;

    // 3. Ordenamos las tarjetas considerando disponibilidad y precio
    cards.sort((a, b) => {
      // Verificamos si la tarjeta o el botón están marcados como agotados / sin stock
      const sinStockA = a.classList.contains('out-of-stock') || a.querySelector('.card-cta')?.disabled;
      const sinStockB = b.classList.contains('out-of-stock') || b.querySelector('.card-cta')?.disabled;

      // REGLA 1: Si uno no tiene stock y el otro sí, el sin stock va al final
      if (sinStockA && !sinStockB) return 1;
      if (!sinStockA && sinStockB) return -1;

      // REGLA 2: Si ambos tienen el mismo estado de stock, ordenamos por precio
      const precioAEl = a.querySelector('.card-price');
      const precioBEl = b.querySelector('.card-price');
      
      const precioA = precioAEl ? parseFloat(precioAEl.textContent.replace(/[^0-9.-]+/g, '')) || 0 : 0;
      const precioB = precioBEl ? parseFloat(precioBEl.textContent.replace(/[^0-9.-]+/g, '')) || 0 : 0;

      return orden === 'asc' ? precioA - precioB : precioB - precioA;
    });

    // 4. Reorganizamos las tarjetas en su grilla
    cards.forEach(card => grid.appendChild(card));
  });
}



// ==========================================
// VERIFICACIÓN DE MAYORÍA DE EDAD (+18)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const ageModal = document.getElementById("ageModal");
  const btnYes = document.getElementById("btnAgeYes");
  const btnNo = document.getElementById("btnAgeNo");

  // Si ya verificó edad anteriormente, ocultamos el modal inmediatamente
  if (localStorage.getItem("ageVerified") === "true") {
    if (ageModal) ageModal.style.display = "none";
  } else {
    if (ageModal) ageModal.classList.add("show");
  }

  if (btnYes) {
    btnYes.addEventListener("click", () => {
      localStorage.setItem("ageVerified", "true");
      ageModal.classList.remove("show");
      setTimeout(() => {
        ageModal.style.display = "none";
      }, 300);
    });
  }

  if (btnNo) {
    btnNo.addEventListener("click", () => {
      alert("Debes ser mayor de 18 años para ingresar a esta tienda.");
      window.location.href = "https://www.google.com";
    });
  }
});




// ==========================
// NAVEGACIÓN Y SUB-MENÚS
// ==========================

function buildNavigationMenu(grouped) {
  const categories = ["descartables", "recargables", "liquidos"];

  categories.forEach(cat => {
    const subMenu = document.getElementById(`submenu-${cat}`);
    if (!subMenu) return;

    subMenu.innerHTML = "";

    const allLink = document.createElement("a");
    allLink.href = `${cat}.html`;
    allLink.textContent = "Todos los productos";
    subMenu.appendChild(allLink);

    if (grouped[cat]) {
      Object.keys(grouped[cat]).forEach(brand => {
        const brandSlug = brand.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const targetHash = `${cat}-${brandSlug}`;
        const brandLink = document.createElement("a");
        brandLink.href = `${cat}.html#${targetHash}`;
        brandLink.textContent = brand;

        brandLink.addEventListener("click", (e) => {
          closeMenu();

          const currentFile = window.location.pathname.split("/").pop();
          if (currentFile === `${cat}.html`) {
            e.preventDefault();
            window.history.pushState(null, null, `#${targetHash}`);
            const el = document.getElementById(targetHash);
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }
        });

        subMenu.appendChild(brandLink);
      });
    }
  });
}


// ==========================
// CARRITO DE COMPRAS
// ==========================

function getCart() {
  return JSON.parse(localStorage.getItem("cloudnine_cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("cloudnine_cart", JSON.stringify(cart));
  renderCartBadge();
}

function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(i => i.name === item.name && i.flavor === item.flavor);

  if (existing) {
    existing.qty += item.qty;
  } else {
    cart.push(item);
  }

  saveCart(cart);
  renderCartPanel();

  const itemTitle = item.brand ? `${item.brand} ${item.name}` : item.name;
  showToast(`¡Agregado! ${itemTitle} (${item.flavor})`);
}

function updateCartQty(index, delta) {
  const cart = getCart();
  if (!cart[index]) return;

  cart[index].qty += delta;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  saveCart(cart);
  renderCartPanel();
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCartPanel();
}


// ==========================
// CONTADOR DEL CARRITO
// ==========================

function renderCartBadge() {
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartCount = document.getElementById("cartCount");

  if (cartCount) {
    cartCount.textContent = totalQty;
  }
}


// ==========================
// PANEL DEL CARRITO Y ENVÍOS
// ==========================

function renderCartPanel() {
  const itemsEl = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");

  if (!itemsEl || !totalEl) return;

  const cart = getCart();
  itemsEl.innerHTML = "";

  let subtotal = 0;

  cart.forEach((item, index) => {
    const lineTotal = priceFor(item.usd) * item.qty;
    subtotal += lineTotal;

    const row = document.createElement("div");
    row.className = "cart-item";

    row.innerHTML = `
      <div class="cart-item-info">
        <span class="cart-item-title">
          ${item.brand ? item.brand + " " : ""}${item.name}
        </span>
        <span class="cart-item-sub">
          ${item.flavor ? item.flavor + " — " : ""}${fmtARS(lineTotal)}
        </span>
      </div>
      <div class="cart-item-controls">
        <button class="cart-qty-btn minus" aria-label="Restar">-</button>
        <span class="cart-item-qty">${item.qty}</span>
        <button class="cart-qty-btn plus" aria-label="Sumar">+</button>
        <button class="cart-remove-btn" aria-label="Quitar">×</button>
      </div>
    `;

    row.querySelector(".minus").addEventListener("click", () => updateCartQty(index, -1));
    row.querySelector(".plus").addEventListener("click", () => updateCartQty(index, 1));
    row.querySelector(".cart-remove-btn").addEventListener("click", () => removeFromCart(index));

    itemsEl.appendChild(row);
  });

  const deliverySelect = document.getElementById("deliveryMethod");
  const shippingBadge = document.getElementById("shippingCostBadge");
  let shippingCost = 0;

  if (deliverySelect) {
    if (deliverySelect.value === "alrededores") {
      shippingCost = 5000;
      if (shippingBadge) {
        shippingBadge.textContent = "+ $5.000";
        shippingBadge.className = "badge-paid";
      }
    } else {
      shippingCost = 0;
      if (shippingBadge) {
        shippingBadge.textContent = "¡GRATIS!";
        shippingBadge.className = "badge-free";
      }
    }
  }

  const total = subtotal + shippingCost;

  if (!cart.length) {
    totalEl.textContent = "Carrito vacío";
  } else {
    totalEl.textContent = `Total: ${fmtARS(total)}`;
  }
}


// ==========================
// ABRIR Y CERRAR CARRITO
// ==========================

const cartToggle = document.getElementById("cartToggle");
const cartPanel = document.getElementById("cartPanel");
const cartClose = document.getElementById("cartClose");

function openCart() {
  if (cartPanel) cartPanel.classList.add("open");
  openBackdrop();
  renderCartPanel();
}

function closeCart() {
  if (cartPanel) cartPanel.classList.remove("open");
  closeBackdrop();
}

if (cartToggle) {
  cartToggle.addEventListener("click", () => {
    const isOpen = cartPanel?.classList.contains("open");
    if (isOpen) {
      closeCart();
    } else {
      openCart();
    }
  });
}

if (cartClose) {
  cartClose.addEventListener("click", closeCart);
}


// ==========================
// PERSISTENCIA Y CHECKOUT POR WHATSAPP
// ==========================

const deliverySelect = document.getElementById("deliveryMethod");
const addressGroup = document.getElementById("addressGroup");
const townGroup = document.getElementById("townGroup");
const townSelect = document.getElementById("clientTown");
const customTownGroup = document.getElementById("customTownGroup");
const cartCheckout = document.getElementById("cartCheckout");

const CHECKOUT_STORAGE_KEY = "cloudnine_checkout_data";

function saveCheckoutData() {
  const checkoutData = {
    name: document.getElementById("clientName")?.value || "",
    method: deliverySelect?.value || "retiro",
    town: townSelect?.value || "",
    customTown: document.getElementById("clientCustomTown")?.value || "",
    address: document.getElementById("clientAddress")?.value || ""
  };

  localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(checkoutData));
}

function restoreCheckoutData() {
  const saved = localStorage.getItem(CHECKOUT_STORAGE_KEY);
  if (!saved) return;

  try {
    const data = JSON.parse(saved);

    const nameInput = document.getElementById("clientName");
    const customTownInput = document.getElementById("clientCustomTown");
    const addressInput = document.getElementById("clientAddress");

    if (nameInput) nameInput.value = data.name || "";

    if (deliverySelect && data.method) {
      deliverySelect.value = data.method;
      deliverySelect.dispatchEvent(new Event("change"));
    }

    if (townSelect && data.town) {
      townSelect.value = data.town;
      townSelect.dispatchEvent(new Event("change"));
    }

    if (customTownInput && data.customTown) customTownInput.value = data.customTown;
    if (addressInput && data.address) addressInput.value = data.address;

  } catch (e) {
    console.error("Error al restaurar datos de checkout:", e);
  }
}

if (deliverySelect) {
  deliverySelect.addEventListener("change", () => {
    const value = deliverySelect.value;

    if (value === "retiro") {
      if (addressGroup) addressGroup.style.display = "none";
      if (townGroup) townGroup.style.display = "none";
    } else if (value === "alta-gracia") {
      if (addressGroup) addressGroup.style.display = "block";
      if (townGroup) townGroup.style.display = "none";
    } else if (value === "alrededores") {
      if (addressGroup) addressGroup.style.display = "block";
      if (townGroup) townGroup.style.display = "block";
    }

    saveCheckoutData();
    if (typeof renderCartPanel === "function") renderCartPanel();
  });
}

if (townSelect) {
  townSelect.addEventListener("change", () => {
    if (townSelect.value === "Otro") {
      if (customTownGroup) customTownGroup.style.display = "block";
    } else {
      if (customTownGroup) customTownGroup.style.display = "none";
    }
    saveCheckoutData();
  });
}

["clientName", "clientAddress", "clientCustomTown"].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("input", saveCheckoutData);
  }
});

restoreCheckoutData();

if (cartCheckout) {
  cartCheckout.addEventListener("click", () => {
    const cart = getCart();
    if (cart.length === 0) {
      showToast("Tu carrito está vacío");
      return;
    }

    const nameInput = document.getElementById("clientName");
    const addressInput = document.getElementById("clientAddress");
    const customTownInput = document.getElementById("clientCustomTown");

    const name = nameInput ? nameInput.value.trim() : "";
    const method = deliverySelect ? deliverySelect.value : "retiro";
    const address = addressInput ? addressInput.value.trim() : "";

    let town = townSelect ? townSelect.value : "";
    if (town === "Otro" && customTownInput) {
      town = customTownInput.value.trim();
    }

    if (!name) {
      showToast("Por favor, ingresá tu nombre");
      if (nameInput) nameInput.focus();
      return;
    }

    if (method !== "retiro" && !address) {
      showToast("Por favor, ingresá tu dirección");
      if (addressInput) addressInput.focus();
      return;
    }

    if (method === "alrededores" && !town) {
      showToast("Por favor, especificá tu localidad");
      if (customTownInput && townSelect && townSelect.value === "Otro") customTownInput.focus();
      return;
    }

    let msg = `🛒 *NUEVO PEDIDO - CLOUD NINE*\n\n`;
    msg += `👤 *Cliente:* ${name}\n`;

    let shippingCost = 0;

    if (method === "retiro") {
      msg += `📍 *Entrega:* Retiro en persona\n`;
    } else if (method === "alta-gracia") {
      msg += `🛵 *Entrega:* Envío en Alta Gracia (GRATIS)\n`;
      msg += `📍 *Dirección:* ${address}\n`;
    } else if (method === "alrededores") {
      shippingCost = 5000;
      msg += `🛵 *Entrega:* Envío a Alrededores ($5.000)\n`;
      msg += `🏡 *Localidad:* ${town}\n`;
      msg += `📍 *Dirección:* ${address}\n`;
    }

    msg += `\n📦 *Detalle del pedido:*\n`;

    cart.forEach(item => {
      msg += `• ${item.brand ? item.brand + " " : ""}${item.name}${item.flavor ? " (" + item.flavor + ")" : ""} × ${item.qty}\n`;
    });

    const subtotal = cart.reduce((sum, item) => sum + priceFor(item.usd) * item.qty, 0);
    const total = subtotal + shippingCost;

    if (shippingCost > 0) {
      msg += `\n💰 *Subtotal:* ${fmtARS(subtotal)}`;
      msg += `\n🚚 *Envío:* $5.000`;
      msg += `\n💳 *Total final:* ${fmtARS(total)}`;
    } else {
      msg += `\n💳 *Total:* ${fmtARS(total)}`;
    }

    const cleanPhone = String(WHATSAPP_NUMBER).replace(/[^0-9]/g, '');
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(msg)}`;
    
    window.open(whatsappUrl, "_blank");

    localStorage.removeItem("cloudnine_cart");
    localStorage.removeItem(CHECKOUT_STORAGE_KEY);

    if (nameInput) nameInput.value = "";
    if (addressInput) addressInput.value = "";
    if (customTownInput) customTownInput.value = "";

    if (typeof renderCartBadge === "function") renderCartBadge();
    if (typeof renderCartPanel === "function") renderCartPanel();

    closeCart();
  });
}


// ==========================
// DÓLAR BLUE E INICIALIZACIÓN
// ==========================

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Cargar la cotización guardada si existe
  const savedRate = localStorage.getItem("cloudnine_dolar_rate");
  dolarBlueRate = savedRate ? Number(savedRate) : FALLBACK_RATE;

  // 2. Intentar actualizar el valor del Dólar Blue en tiempo real
  try {
    const res = await fetch("https://dolarapi.com/v1/dolares/blue");
    if (res.ok) {
      const data = await res.json();
      const liveRate = Number(data.venta);
      if (liveRate) {
        dolarBlueRate = liveRate;
        localStorage.setItem("cloudnine_dolar_rate", String(dolarBlueRate));
      }
    }
  } catch (e) {
    console.warn("No se pudo obtener la cotización del dólar blue, usando respaldo.");
  }

  // 3. Descargar productos desde la planilla de Google Sheets
  await fetchProductsFromSheet();

  // 4. Renderizar vista y carrito con datos actualizados
  renderProducts();
  renderCartPanel();
  renderCartBadge();
});



// ==========================
// FILTRO POR MARCAS Y RANGOS
// ==========================

function generarFiltrosMarcas(productos) {
  const brandContainer = document.getElementById('brandFilters');
  if (!brandContainer) return;

  // Detectar categoría actual de la página
  const currentPage = window.location.pathname.split("/").pop().replace(".html", "");
  
  // Filtrar productos por la categoría activa si aplica
  const productosCategoria = ['descartables', 'recargables', 'liquidos'].includes(currentPage)
    ? productos.filter(p => p.category === currentPage)
    : productos;

  // Extraer marcas únicas
  const marcas = ['all', ...new Set(productosCategoria.map(p => p.brand).filter(Boolean))];

  // Generar HTML de botones
  brandContainer.innerHTML = marcas.map(marca => `
    <button 
      class="filter-btn ${marca === marcaSeleccionada ? 'active' : ''}" 
      data-brand="${marca}"
      onclick="filtrarPorMarca('${marca}', this)">
      ${marca === 'all' ? 'Todas' : marca}
    </button>
  `).join('');
}

function filtrarPorMarca(marca, boton) {
  marcaSeleccionada = marca;

  // Marcar botón activo
  const botones = document.querySelectorAll('#brandFilters .filter-btn');
  botones.forEach(btn => btn.classList.remove('active'));
  if (boton) boton.classList.add('active');

  // Volver a renderizar productos aplicando el filtro
  const currentQuery = searchInput ? searchInput.value : "";
  renderProducts(currentQuery);
}