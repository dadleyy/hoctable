import i18n from "../services/i18n";

function About({ resolution }) {
  let { content } = resolution;
  let __html = marked(content.fields.description);
  let inner_html = { __html };

  return (
    <div className="container">
      <div className="clearfix content" dangerouslySetInnerHTML={inner_html} />
    </div>
  );
}

export default About;
