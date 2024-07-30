import adminTemplate from "../../views/admin_template.html?raw";
import products from "../../views/admin_products.html?raw";
import "bootstrap/dist/js/bootstrap";
import axios from "axios";

export function AdminHome() {
  document.getElementById("template").innerHTML = adminTemplate;
  document.getElementById("app").innerHTML = products;
  getDataProducts().then(function (data) {
    // console.log(data);
    document.getElementById("tbody-products").innerHTML = data;
  });
  Adduser();
}

let buildTr = ({ name, detail, price, image, id }, key) => {
  return ` <tr>
      <th scope="row">${name}(${id})</th>
      <td>${detail}</td>
      <td>${price}</td>
      <td>${image}</td>
      <td>
      <button id="edit_${key}" type="button" class="btn btn-outline-primary btn-edit-pr">Edit</button>
      <button id="delete_${key}" type="button" class="btn btn-outline-danger btn-delete-pr">Delete</button>
      </td>
    </tr>`;
};

async function getDataProducts() {
  let respone = await axios.get(
    "https://asmes-a8f4d-default-rtdb.firebaseio.com/products.json"
  );
  let stringHtml = "";
  for (const key in respone.data) {
    if (Object.hasOwnProperty.call(respone.data, key)) {
      const element = respone.data[key];
      stringHtml += buildTr(element, key);
    }
  }
  // respone.data.forEach((element) => {
  //   stringHtml += buildTr(element);
  // });
  return stringHtml;
}

function handleAddUser(newPr) {
  fetch("https://asmes-a8f4d-default-rtdb.firebaseio.com/products.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPr),
  })
    .then((response) => {
      if (response.ok) {
        alert("Pr added successfully!");
        // You may want to refresh the user list or perform other actions after adding
      } else {
        alert("Failed to add Pr.");
      }
    })
    .catch((error) => {
      console.error("Error adding Pr:", error);
      alert("Failed to add Pr. Please try again later.");
    });
}

// Function to handle editing a user
function handleEditUser(userId, updatedUserData) {
  fetch(
    `https://asmes-a8f4d-default-rtdb.firebaseio.com/products/${userId}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUserData),
  }
  )
    .then((response) => {
      if (response.ok) {
        alert("Product updated successfully!");
        // You may want to refresh the user list or perform other actions after updating
      } else {
        // alert("Failed to update user.");
      }
    })
    .catch((error) => {
      console.error("Error updating user:", error);
      alert("Failed to update product. Please try again later.");
    });
}

// Function to handle deleting a user
function handleDeleteUser(userId) {
  // console.log(userId);
  fetch(
    `https://asmes-a8f4d-default-rtdb.firebaseio.com/products/${userId}.json`, {
    method: "DELETE",
  }
  )
    .then((response) => {
      if (response.ok) {
        alert("User deleted successfully!");
      } else {
        alert("Failed to delete product.");
      }
    })
    .catch((error) => {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again later.");
    });
}

// Event listener for adding a new user
function Adduser() {
  document
    .getElementById("addUserButton")
    .addEventListener("click", function () {
      // Get input values
      const newName = document.getElementById("newName").value;
      const newPrice = document.getElementById("newPrice").value;
      const newDetail = document.getElementById("newDetail").value;
      const newImg = document.getElementById("newImg").value;
      const newIdct = document.getElementById("newIdct").value;
      const newId = document.getElementById("newId").value;

      // Basic validation
      if (!newName || !newPrice || !newDetail || !newImg || !newIdct || !newId) {
        alert("Please fill out all fields");
        return;
      }

      // More specific validation can be added here if needed

      // If all fields are filled, create the newPr object and proceed
      const newPr = {
        name: newName,
        price: newPrice,
        detail: newDetail,
        image: newImg,
        cate_id: newIdct,
        id: newId,
      };
      handleAddUser(newPr);
    });
}


// Event listener for editing a user
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn-edit-pr")) {
    const userId = event.target.id.split("_")[1];
    const updatedUserData = {
      name: prompt("Enter new name"),
      price: prompt("Enter new Price"),
      detail: prompt("Enter new Detail"),
      image: prompt("Enter New image"),
      id: prompt("enter new ID"),
    };
    handleEditUser(userId, updatedUserData);
  }
});

// Event listener for deleting a user
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn-delete-pr")) {
    console.log(event.target);
    const userId = event.target.id.split("_")[1];
    handleDeleteUser(userId);
  }
});