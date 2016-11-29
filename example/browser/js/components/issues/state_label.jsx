function Label({state}) {
  let class_name = "secondary label";

  switch(state) {
    case "open":
      class_name = "success label";
      break;
    case "closed":
      class_name = "alert label";
      break;
  }

  return (
    <div className="inline-block issue-state-label">
      <div className={class_name}>
        <p>{state}</p>
      </div>
    </div>
  );
}

export default Label;
