import "./style.css";
import "./css/bootstrap.css";
import "./css/responsive.css";
import Navigo from "navigo"; // When using ES modules.
const router = new Navigo("/");
import { BuildHome } from "./js/home";
import { BuildConTact } from "./js/contact";
import { BuildAbout } from "./js/about";
import { BuildShop } from "./js/shop";
import { AdminHome } from "./js/admin/home";
import { AdminUser } from "./js/admin/user";

router
  .on("/", function () {
    BuildHome();
  })
  .on("/home", function () {
    BuildHome();
  })
  .on("/contact", function () {
    BuildConTact();
  })
  .on("/shop", function () {
    BuildShop();
  })
  .on("/about", function () {
    BuildAbout();
  })
  .on("/admin", function () {
    AdminHome();
  })
  .on("/admin/users", function () {
    AdminUser();
  })

router.resolve();