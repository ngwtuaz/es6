import userTemplate from "../views/user_template.html?raw";
import homepage from "../views/home.html?raw";
import axios from "axios";

function buildProducts({ name, price, image }) {
  return `<div class="box">
  <div class="name">
     <h6>
        ${name}
     </h6>
  </div>
  <div class="img-box">
     <img src="${image}" alt="">
  </div>
  <div class="detail-box">
     <h5>
        $<span>${price}</span>
     </h5>
     <a href="">
        Buy Now
     </a>
  </div>
</div>`;
}

async function getDataListProducts() {
  let respone = await axios.get(
    "https://asmes-a8f4d-default-rtdb.firebaseio.com/products.json"
  );
  let stringHtml = "";
  for (const key in respone.data) {
    if (Object.hasOwnProperty.call(respone.data, key)) {
      const element = respone.data[key];
      stringHtml += buildProducts(element);
    }
  }
  // respone.data.forEach(element => {
  //   stringHtml += buildProducts(element);
  // });
  return stringHtml;
}

export function BuildHome() {
  document.getElementById("template").innerHTML = userTemplate;
  document.getElementById("app").innerHTML = homepage;
  getDataListProducts().then(function (data) {
    document.getElementById("list-products").innerHTML = data;
  })
}
