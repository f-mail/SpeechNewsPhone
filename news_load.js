/////////////////////////////////////////////////////////////////////////////////////
// RENDERS
/////////////////////////////////////////////////////////////////////////////////////

function renderItems(items, title = "") {
    let titleHtml = document.createElement("p");
    titleHtml.innerHTML = title;

    let ol = document.createElement("ol");
    ol.className = "list";  
    for (let item of items) {
        let nobr = document.createElement("nobr");
        nobr.innerHTML =
        item.source + " > " +
        "W " + Math.round(item.weight) + " : " +
        "P " + item.priority + " :: " +
        item.title + " :: " +
        item.desc + " :: " +
        item.link + " :: " +
        item.date;
        let span = document.createElement("span");
        span.appendChild(nobr);
        let li = document.createElement("li");
        li.appendChild(span);
        ol.appendChild(li);
    }

    document.body.appendChild(titleHtml);
    document.body.appendChild(ol);
}

/////////////////////////////////////////////////////////////////////////////////////
// ENTRY POINT
/////////////////////////////////////////////////////////////////////////////////////

LoadNews("feed1")
    .then(res => renderItems(res));
