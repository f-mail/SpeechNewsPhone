/////////////////////////////////////////////////////////////////////////////////////
// RENDERS
/////////////////////////////////////////////////////////////////////////////////////

function renderItems(arrItems, title = "") {
  let titleHtml = document.createElement("p");
  titleHtml.innerHTML = title;

  let ol = document.createElement("ol");
  ol.className = "list";
  for (let items of arrItems) {
    for (let item of items) {
      let nobr = document.createElement("nobr");
      nobr.innerHTML =
         item.source + " > " +
         item.title + " :: " +
         item.desc + " :: " +
         item.date;
      let span = document.createElement("span");
      span.appendChild(nobr);
      let li = document.createElement("li");
      li.appendChild(span);
      ol.appendChild(li);
    }
  }
  document.body.appendChild(titleHtml);
  document.body.appendChild(ol);
}

/////////////////////////////////////////////////////////////////////////////////////
// ENTRY POINT
/////////////////////////////////////////////////////////////////////////////////////

var news = Promise.all([
    loadF1News(),
    loadMotorsport()
]).then((arrItems) => {
  renderItems(arrItems, "RSS");
});
