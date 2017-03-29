import i18n from "../services/i18n";
import link from "../services/links";
import * as ENV from "config/environment";

function Header() {
  const { external_urls } = ENV;

  return (
    <section className="hero is-dark">
      <div className="hero-body">
        <div className="container level">
          <div className="level-left">
            <div className="clearfix">
              <h1 className="title"><a href={link("home")}>{i18n("project_title")}</a></h1>
              <h2 className="subtitle">{i18n("project_subtitle")}</h2>
            </div>
          </div>
          <div className="level-right">
            <div className="float-left margin-right-30">
              <a href={link("about")}>{i18n("about")}</a>
            </div>
            <div className="float-left">
              <a href={external_urls ? external_urls.github_project : '/'}>
                <i className="ion-social-github icon fs-40"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
