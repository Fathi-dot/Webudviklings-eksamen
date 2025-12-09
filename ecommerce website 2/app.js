const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
  {
    id: 1,
    title: "Hydrating Mist",
    price: 25,
    desc: "A refreshing mist to hydrate and rejuvenate your skin anytime, anywhere.",
    colors: [
      {
        code: "lightblue",
        img: "cleanser.jpeg",
      },
      {
        code: "lightgray",
        img: "serum 7.webp",
      },
    ],
  },
  {
    id: 2,
    title: "Vitamin C Serum",
    price: 45,
    desc: "Brighten your complexion with our powerful Vitamin C serum rich in antioxidants.",
    colors: [
      {
        code: "orange",
        img: "vitamin c.jpeg",
      },
      {
        code: "peachpuff",
        img: "Vitamin c.jpeg",
      },
    ],
  },
  {
    id: 3,
    title: "Aloe Cleanser",
    price: 19,
    desc: "Gently cleanse and soothe your skin with natural aloe vera extracts.",
    colors: [
      {
        code: "lightgreen",
        img: "Cleanser.jpeg",
      },
      {
        code: "mintcream",
        img: "Cleanser.jpeg",
      },
    ],
  },
  {
    id: 4,
    title: "Night Repair Cream",
    price: 60,
    desc: "Repair and nourish your skin overnight for a radiant glow by morning.",
    colors: [
      {
        code: "lavender",
        img: "Night repair.jpeg",
      },
      {
        code: "thistle",
        img: "Night repair.jpeg",
      },
    ],
  },
  {
    id: 5,
    title: "SPF Day Lotion",
    price: 35,
    desc: "Protect your skin daily with our lightweight SPF lotion.",
    colors: [
      {
        code: "beige",
        img: "SPF.jpeg",
      },
      {
        code: "white",
        img: "SPF.jpeg",
      },
    ],
  },
];

let choosenProduct = products[0];

const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");


menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    wrapper.style.transform = `translateX(${-100 * index}vw)`;
    choosenProduct = products[index];


    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;


    const container = document.querySelector(".productImg").parentNode;
    document.querySelector(".productImg").remove();


    let media;
    const isVideo = choosenProduct.colors[0].img.includes(".mp4");
    if (isVideo) {
      media = document.createElement("video");
      media.autoplay = true;
      media.muted = true;
      media.loop = true;
      media.className = "productImg";

      const source = document.createElement("source");
      source.src = choosenProduct.colors[0].img;
      source.type = "video/mp4";
      media.appendChild(source);
    } else {
      media = document.createElement("img");
      media.src = choosenProduct.colors[0].img;
      media.className = "productImg";
    }
    container.insertBefore(media, container.firstChild);


    currentProductColors.forEach((color, i) => {
      color.style.backgroundColor = choosenProduct.colors[i].code;
    });
  });
});


currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    const container = document.querySelector(".productImg").parentNode;
    document.querySelector(".productImg").remove();

    const isVideo = choosenProduct.colors[index].img.includes(".mp4");
    let media;
    if (isVideo) {
      media = document.createElement("video");
      media.autoplay = true;
      media.muted = true;
      media.loop = true;
      media.className = "productImg";

      const source = document.createElement("source");
      source.src = choosenProduct.colors[index].img;
      source.type = "video/mp4";
      media.appendChild(source);
    } else {
      media = document.createElement("img");
      media.src = choosenProduct.colors[index].img;
      media.className = "productImg";
    }

    container.insertBefore(media, container.firstChild);
  });
});


// Product popup (checkout popup)
const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});

// Chat popup: åbne og lukke
const chatButton = document.getElementById('chatButton');
const chatPopup = document.getElementById('chatPopup');
const chatClose = document.getElementById('chatClose');

chatButton.addEventListener('click', () => {
  chatPopup.style.display = 'flex';
});

chatClose.addEventListener('click', () => {
  chatPopup.style.display = 'none';
});

const chatQuestions = document.querySelectorAll('.chat-question');

chatQuestions.forEach((question) => {
  question.addEventListener('click', () => {
    // Først luk alle andre svar
    chatQuestions.forEach(q => {
      if (q !== question) {
        q.classList.remove('active');
        q.nextElementSibling.classList.remove('show');
      }
    });

    // Toggle aktivt spørgsmål
    question.classList.toggle('active');
    question.nextElementSibling.classList.toggle('show');
  });
});

const subscribeButton = document.getElementById('subscribeButton');
const thankYouMessage = document.getElementById('thankYouMessage');

subscribeButton.addEventListener('click', (e) => {
  e.preventDefault(); // Forhindrer side reload
  thankYouMessage.style.display = 'block'; // Viser besked
  subscribeButton.disabled = true; // Deaktiverer knappen
  subscribeButton.innerText = "Subscribed!";
});


let basketCount = 0; // Starter med 0 varer i kurven


const basketCountElement = document.querySelector(".basketCount");

// Function to update basket count display
function updateBasketCount() {
  basketCountElement.textContent = basketCount; // Opdaterer antallet af varer i kurven
}

const buyButtons = document.querySelectorAll(".productButton");


buyButtons.forEach(button => {
  button.addEventListener("click", () => {
    basketCount++; 
    updateBasketCount(); 
  });
});

const searchInput = document.querySelector(".searchInput");
const searchResults = document.getElementById("searchResults");

searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase().trim();
  searchResults.innerHTML = "";

  if (query.length === 0) {
    searchResults.style.display = "none";
    return;
  }

  const matchedProducts = products.filter(product =>
    product.title.toLowerCase().includes(query)
  );

  if (matchedProducts.length > 0) {
    searchResults.style.display = "block";
    matchedProducts.forEach(product => {
      const resultItem = document.createElement("div");
      resultItem.className = "searchResultItem";

      resultItem.innerHTML = `
        <img src="${product.colors[0].img}" alt="${product.title}">
        <span>${product.title}</span>
      `;

      resultItem.addEventListener("click", () => {
        // Gem valgte produkt i localStorage og skift side
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "product.html";
      });

      searchResults.appendChild(resultItem);
    });
  } else {
    searchResults.style.display = "none";
  }
});



