// ------------------ CUSTOM QUERY SELECTOR --------------------
const $ = document.querySelector.bind(document);
const $All = document.querySelectorAll.bind(document);

// ------------------ HTML ITEMS --------------------
let ITEM_HTML = [];

// ------------------ CONTROL FLEX BOX DROP DOWN --------------------
const toggleBtn = $All(".control-flexbox__drop-down-btn");
const flexBoxButtons = $All(".control-flexbox__buttons-wrapper");

const displayArea = $(".display-flexbox__area");

// ------------------ GENERATE RANDOM HEX COLOR --------------------
const generateRandomColor = () => {
  let color = "";
  for (let i = 1; i <= 6; i++) {
    const random = Math.floor(Math.random() * 16);
    color += random.toString(16);
  }
  return `#${color}`;
};

// ------------------ REMOVE ALL CLASS LIST FUNCTION --------------------
const removeAllClassList = (selector, removeClass) => {
  selector.forEach((item) => {
    item.classList.remove(removeClass);
  });
};

// ------------------ CSS OBJECT --------------------
let generateCSS = { display: "flex" };

// ------------------ DORP DOWN ON CLICK --------------------
toggleBtn.forEach((button) => {
  const parentEl = button.parentElement;
  const btnItemWrapper = parentEl.querySelector(
    ".control-flexbox__buttons-wrapper"
  );
  const icon = parentEl.querySelector(".control-flexbox__drop-down-icon");
  button.addEventListener("click", () => {
    btnItemWrapper.classList.toggle("open-control-flex-box");
    icon.classList.toggle("open-control-flex-box-icon");
  });
  const allBtnItems = btnItemWrapper.querySelectorAll(".control-flexbox__btn");

  allBtnItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const property = button.innerText.toLowerCase();
      const value = e.target.innerText;

      generateCSS[property] = value;
      displayArea.style[property] = value;

      removeAllClassList(allBtnItems, "control-flexbox__btn--active");
      item.classList.toggle("control-flexbox__btn--active");
    });
  });
});

// ------------------ RESET TO DEFAULT --------------------
const resetCode = $(".header__reset-default-btn");
resetCode.addEventListener("click", () => {
  displayArea.removeAttribute("style");

  removeAllClassList(
    $All(".control-flexbox__btn"),
    "control-flexbox__btn--active"
  );

  generateCSS = { display: "flex" };
});

// ------------------ RENDER ALL ITEMS --------------------
const renderItem = () => {
  displayArea.innerHTML = ITEM_HTML.join(" ");
  isItemLength0();
  deleteItem();
};

// ------------------ ADD ITEM --------------------
const addItem = $(".display-flexbox__add-items-btn");
const addItemText = $(".display-flexbox__add-items-txt");
const addSingleItem = () => {
  const createItem = `<div style="background-color: ${generateRandomColor()};" class="display-flexbox__item">
              <h1 class="display-flexbox__item-count">${
                ITEM_HTML.length + 1
              }</h1>
              <button type="button" class="display-flexbox__item-delete-btn">
                <i class="fa-solid fa-trash display-flexbox__item-delete-icon"></i>
              </button>
            </div>`;

  ITEM_HTML.push(createItem);
  renderItem();
};

addItem.addEventListener("click", addSingleItem);
addItemText.addEventListener("click", addSingleItem);

// if length 0
const isItemLength0 = () => {
  if (ITEM_HTML.length) addItemText.style.display = "none";
  else addItemText.style.display = "block";
};

// ------------------ DELETE ITEM --------------------
const deleteItem = () => {
  const allDeleteBtn = $All(".display-flexbox__item-delete-btn");

  allDeleteBtn.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      ITEM_HTML.splice(i, 1);
      renderItem();
    });
  });
};

// ------------------ SHOW CODES --------------------
const tabButtons = $All(".show-code__btn");
const tabButtonWrapper = $(".show-code__tabs");
const htmlCode = $(".html-code");
const cssCode = $(".css-code");
const copyCodeBtn = $(".copy-code");

// ------------------ COPY CODE --------------------
const copyToClipboard = async (text = "Hello") => {
  try {
    await navigator.clipboard.writeText(text);

    copyCodeBtn.innerHTML = `<i class="fa-solid fa-check check__icon"></i>`;
    setTimeout(() => {
      copyCodeBtn.innerHTML = `<i class="fa-regular fa-copy copy-code__icon"></i>`;
    }, 1000);
  } catch (error) {
    alert(error.message || "Fail to copy. 😭");
  }
};

copyCodeBtn.addEventListener("click", (e) =>
  copyToClipboard(cssCode.innerText)
);

// ------------------ HTML AND CSS TAB BUTTON --------------------
tabButtonWrapper.addEventListener("click", (e) => {
  const target = e.target;
  if (!(target instanceof HTMLButtonElement)) return;

  removeAllClassList(tabButtons, "show-code__btn--active");
  target.classList.add("show-code__btn--active");

  switch (target.innerText) {
    case "CSS": {
      htmlCode.style.display = "none";
      cssCode.style.display = "block";
      copyCodeBtn.addEventListener("click", (e) =>
        copyToClipboard(cssCode.innerText)
      );
      break;
    }
    case "HTML": {
      cssCode.style.display = "none";
      htmlCode.style.display = "block";
      copyCodeBtn.addEventListener("click", (e) =>
        copyToClipboard(htmlCode.innerText)
      );
      break;
    }
  }
});

// ------------------ GENERATE CSS CODE --------------------
const generateCSSCode = () => {
  const cssArr = Object.entries(generateCSS);

  const formattedCodes = cssArr
    .map((item) => {
      return `<span class="property">${item[0]}:</span> <span class="value">${item[1]};</span>`;
    })
    .join("\n\t");

  $(".show-css-code").innerHTML = formattedCodes;
};

// ------------------ GENERATE HTML CODES --------------------
const generateHTMLCode = () => {
  const formattedHTMLCodes = ITEM_HTML.map((_, index) => {
    return `<span class="angle">&lt;</span><span class="tag">div</span> <span class="class">class=</span><span class="class-name">"item__${++index}"</span><span class="angle">&gt;</span>${index}<span class="angle">&lt;/</span><span class="tag">div</span><span class="angle">&gt;</span>`;
  }).join("\n\t");

  $(".show-html-code").innerHTML = formattedHTMLCodes;
};

// ------------------ SHOW CODES MODAL --------------------
const modal = $(".show-code");
const showModal = () => {
  modal.style.display = "block";

  generateCSSCode();
  generateHTMLCode();
};

const showCodesBtn = $(".header__show-code-btn");
showCodesBtn.addEventListener("click", showModal);

const closeShowCodeModal = () => (modal.style.display = "none");

const overlayBg = $(".show-code__overlay");
overlayBg.addEventListener("click", closeShowCodeModal);

const closeBtn = $(".show-code__close-btn");
closeBtn.addEventListener("click", closeShowCodeModal);
