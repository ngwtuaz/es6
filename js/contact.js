import userTemplate from "../views/user_template.html?raw";
import contactpage from "../views/contact.html?raw";

export function BuildConTact() {
  document.getElementById("template").innerHTML = userTemplate;
  document.getElementById("app").innerHTML = contactpage;
}
