function Markdown({text}) {
  let body = {__html: marked(text)};

  function highlight(block) {
    if(!block) return;
    let code = block.getElementsByTagName("pre");

    for(let i = 0, c = code.length; i < c; i++) {
      hljs.highlightBlock(code[i]);
    }
  }

  return (
    <div className="markdown">
      <div className="clearfix" dangerouslySetInnerHTML={body} ref={highlight}></div>
    </div>
  );
}

export default Markdown;
