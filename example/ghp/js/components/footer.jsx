import * as env from "config/environment";

function Footer() {
  let { author } = env;

  return (
    <main className="hero">
      <div className="hero-body">
        <div className="container level">
          <div className="level-left">
            <p><span>&copy;</span><span>{new Date().getFullYear()}</span> <span>{author}</span></p>
          </div>
          <div className="level-right">
            <a href="https://github.com/dadleyy/hoctable" className="button is-info">
              <i className="ion-social-github icon is-medium"></i>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Footer;
