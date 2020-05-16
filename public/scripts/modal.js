const modalInit = () => {
  const searchBtn = document.getElementsByClassName("search-button")[0],
    searchInput = document.getElementsByClassName("search-input")[0],
    modalBtn = document.getElementsByClassName("modal-button")[0];
  searchBtn.addEventListener("click", handleSubmit);
  searchInput.addEventListener("keyup", function (e) {
    if (e.keyCode == 13) {
      handleSubmit();
    }
  });
  modalBtn.addEventListener("click", handleModal);
};

const handleModal = () => {
  const modalWrap = document.getElementsByClassName("modal-wrapper")[0],
    loading = document.getElementsByClassName("modal-loading")[0],
    contents = document.getElementsByClassName("modal-contents")[0];
    loading.style.display = "block";
  modalWrap.style.display = "none";
  contents.remove();
};

const handleSubmit = () => {
  const searchInput = document.getElementsByClassName("search-input")[0],
    resultTitle = document.getElementsByClassName("search-result-title")[0],
    modalWrap = document.getElementsByClassName("modal-wrapper")[0];

  const value = searchInput.value;
  callAPI(value);
  searchInput.value = "";
  resultTitle.innerText = `Keywords: ${value}`;
  modalWrap.style.display = "block";
};

const callAPI = async (text) => {
  let data = [];
  await axios
    .get("https://dapi.kakao.com/v3/search/book", {
      params: { query: `${text}` },
      headers: { Authorization: "KakaoAK 35045909edb8ba6d74780353c9ad8d92" },
    })
    .then((res) => (data = res.data.documents))
    .catch((error) => console.log(`API error: ${error}`));
  paintResult(data);
};

const paintResult = (data) => {
  const loading = document.getElementsByClassName("modal-loading")[0],
    contents = document.getElementsByClassName("modal-contents-wrapper")[0];
  loading.style.display = "none";
  const modalContents = document.createElement("div");
  modalContents.className="modal-contents";
  for (let i = 0; i < data.length; i++) {
    const div = document.createElement("div");
    div.className = "search-book";
    const bookText = document.createElement("div");
    bookText.className = "book-text";
    const imgWrap = document.createElement("div");
    imgWrap.className = "imgWrap";
    const link = document.createElement("a");
    link.href = data[i].url;
    const imgCard = document.createElement("div");
    imgCard.className = "imgCard";
    const more = document.createElement("p");
    more.innerHTML = `<i class="fas fa-search-plus"></i> more view`;
    imgCard.appendChild(more);
    const img = document.createElement("img");
    img.src = data[i].thumbnail;
    img.alt = data[i].title;
    img.className = "book-thumbnail";

    imgWrap.appendChild(imgCard);
    imgWrap.appendChild(img);
    link.appendChild(imgWrap);
    div.appendChild(link);

    const title = document.createElement("p");
    title.innerText = data[i].title;
    title.className = "book-title";
    const littleText = document.createElement("div");
    littleText.className = "book-subText";
    const author = document.createElement("span");
    author.className = "author";
    let author_str = !data[i].authors[1]
      ? "by " + data[i].authors[0]
      : "by " + data[i].authors[0] + ", " + data[i].authors[1] + ", et al.";
    author_str += "(Author)";
    if (data[i].translators.length >= 1) {
      author_str +=
        data[i].translators.length === 1
          ? ", " + data[i].translators[0]
          : ", " + data[i].translators[0] + ", et al.";
      author_str += "(Translator)";
    }
    author.innerText = author_str;
    const publisher = document.createElement("span");
    publisher.innerText = data[i].publisher;
    publisher.className = "publisher";
    const datetime = document.createElement("span");
    datetime.innerText = data[i].datetime.substring(0, 10);
    datetime.className = "datetime";

    littleText.appendChild(author);
    littleText.appendChild(publisher);
    littleText.appendChild(datetime);

    const price = document.createElement("div");
    price.innerText = data[i].price;
    price.className = "price";
    const description = document.createElement("div");
    description.innerText = data[i].contents;
    description.className = "book-description";

    bookText.appendChild(title);
    bookText.appendChild(littleText);
    bookText.appendChild(price);
    bookText.appendChild(description);
    div.appendChild(bookText);
    modalContents.appendChild(div);
  }
  contents.appendChild(modalContents);
  hoverEvent();
};

const hoverEvent = () => {
  const thumbnail = document.querySelectorAll(".book-thumbnail");
  for(let i=0; i<thumbnail.length; i++){
    thumbnail[i].parentNode.addEventListener("mouseenter", handleHoverIn);
    thumbnail[i].parentNode.addEventListener("mouseleave", handleHoverOut);
  }
}

const handleHoverIn = (e) => {
  const card = e.target,
  img = card.firstChild;
  img.style.display = "flex";
}

const handleHoverOut = (e) => {
  const card = e.target,
  img = card.firstChild;
  img.style.display = "none";
}

modalInit();
