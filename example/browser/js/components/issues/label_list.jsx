import * as React from "react";

function Label({label}) {
  return (
    <div className="float-left secondary label margin-right-1 margin-bottom-1">
      <span>{label.name}</span>
    </div>
  );
}

function LabelList({labels}) {
  let elements = [];

  for(let i = 0, c = labels.length; i < c; i++) {
    elements.push(<Label label={labels[i]} key={labels[i].id} />);
  }

  return (<div className="clearfix">{elements}</div>);
}

export default LabelList;
