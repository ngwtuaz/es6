import adminTemplate from "../../views/admin_template.html?raw";
import userspage from "../../views/admin_user.html?raw";
import "bootstrap/dist/js/bootstrap";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
export function AdminUser() {
  document.getElementById("template").innerHTML = adminTemplate;
  document.getElementById("app").innerHTML = userspage;
  // console.log(document.getElementById("btn-save"));
  // saveUser();
  // handleEdit();
  displayUsers();
  Adduser();
}

let buildTr = ({ id, username, user, email }, key) => {
  return ` <tr>
        <th scope="row">${id}</th>
        <td>${user}</td>
        <td>${username}</td>
        <td>${email}</td>
        <td>
        <button id="edit_${key}" type="button" class="btn btn-outline-primary btn-edit">Edit</button>
        <button id="delete_${key}" type="button" class="btn btn-outline-danger btn-delete">Delete</button>
        </td>
      </tr>`;
};

function displayUsers() {
  fetch("https://asmes-a8f4d-default-rtdb.firebaseio.com/user.json")
    .then((response) => response.json())
    .then((users) => {
      let userTableBody = "";
      for (const key in users) {
        if (Object.prototype.hasOwnProperty.call(users, key)) {
          const userData = users[key];
          userTableBody += buildTr(userData, key);
        }
      }
      document.getElementById("tbody-user").innerHTML = userTableBody;

      // Add event listeners for edit and delete buttons after rendering the user table
      // handleDeleteUser();
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users. Please try again later.");
    });
}

// Call displayUsers to fetch and display users when the page loads

// Function to handle adding a new user
function handleAddUser(newUser) {
  fetch("https://asmes-a8f4d-default-rtdb.firebaseio.com/user.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then((response) => {
      if (response.ok) {
        alert("User added successfully!");
        // You may want to refresh the user list or perform other actions after adding
      } else {
        alert("Failed to add user.");
      }
    })
    .catch((error) => {
      console.error("Error adding user:", error);
      alert("Failed to add user. Please try again later.");
    });
}

// Function to handle editing a user
function handleEditUser(userId, updatedUserData) {
  fetch(`https://asmes-a8f4d-default-rtdb.firebaseio.com/user/${userId}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUserData),
  })
    .then((response) => {
      if (response.ok) {
        alert("User updated successfully!");
        // You may want to refresh the user list or perform other actions after updating
      } else {
        // alert("Failed to update user.");
      }
    })
    .catch((error) => {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again later.");
    });
}

// Function to handle deleting a user
function handleDeleteUser(userId) {
  fetch(`https://asmes-a8f4d-default-rtdb.firebaseio.com/user/${userId}.json`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        alert("User deleted successfully!");
      } else {
        alert("Failed to delete user.");
      }
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again later.");
    });
}

// Event listener for adding a new user
function Adduser() {
  document
    .getElementById("addUserButton")
    .addEventListener("click", function () {
      const newUser = {
        username: document.getElementById("newUsername").value,
        user: document.getElementById("newUser").value,
        email: document.getElementById("newEmail").value,
        id: document.getElementById("newID").value,
      };
      handleAddUser(newUser);
    });
}

// Event listener for editing a user
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn-edit")) {
    console.log(event.target);
    const userId = event.target.id.split("_")[1];
    const updatedUserData = {
      username: prompt("Enter new username"),
      user: prompt("Enter new user"),
      email: prompt("Enter new email"),
      id: prompt("enter new ID"),
    };
    handleEditUser(userId, updatedUserData);
  }
});

// Event listener for deleting a user
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn-delete")) {
    const userId = event.target.id.split("_")[1];
    handleDeleteUser(userId);
  }
});
