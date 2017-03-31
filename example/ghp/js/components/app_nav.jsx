import i18n from "../services/i18n";
import link from "../services/links";
import Router from "../router";

function AppNav() {
  let { active: active_route } = Router;
  let { path } = active_route;

  return (
    <div className="tabs">
      <ul>
        <li className={path === "movies" ? "is-active" : "inactive"}>
          <a href={link("movies")}>{i18n("movies")}</a>
        </li>
        <li className={path === "restaurants" ? "is-active" : "inactive"}>
          <a href={link("restaurants")}>{i18n("restaurants")}</a>
        </li>
      </ul>
    </div>
  );
}

export default AppNav;
