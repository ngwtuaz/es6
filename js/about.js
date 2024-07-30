import userTemplate from "../views/user_template.html?raw";
import aboutpage from "../views/about.html?raw";

export function BuildAbout() {
  document.getElementById("template").innerHTML = userTemplate;
  document.getElementById("app").innerHTML = aboutpage;
}
