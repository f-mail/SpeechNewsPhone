/////////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
/////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////
// CLASSES
/////////////////////////////////////////////////////////////////////////////////////

function NewsItem(source, title, desc = "", link = "", date = 0, weight = 1, priority = 100) {
    this.source = source;
    this.title = title;
    this.desc = desc;
    this.link = link;
    this.date = date;
    this.weight = weight;
    this.priority = priority;
}

/////////////////////////////////////////////////////////////////////////////////////
// UTILS FUNCTIONS
/////////////////////////////////////////////////////////////////////////////////////

function getDomXml(linkRss) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", linkRss, false);
    xhr.timeout = 7000;
    xhr.send();
    let parser = new DOMParser();
    return parser.parseFromString(xhr.responseText, "text/xml");
}

function getDomHtml(linkHtml) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", linkRss, false);
    xhr.timeout = 10000;
    xhr.send();
    let parser = new DOMParser();
    return parser.parseFromString(xhr.responseText, "text/html");
}

function getNewsItemsFromRss(rssLink, source) {
    let maxItems = 30; //max parsing items in rss feed
    let items = [];
    let dom = null;
    try {
        dom = getDomXml(rssLink);
    } catch(e) {
        console.log(e);
        return null;
    }
    let count = dom.evaluate('count(//item/title)', dom, null, XPathResult.ANY_TYPE, null);
    if (count.numberValue === 0) return null;
    maxItems = count.numberValue > maxItems ? maxItems : count.numberValue;    
    for (let i = 1; i <= maxItems; i++) {
        let title = dom.evaluate('//item[' + i + ']/title', dom, null, XPathResult.ANY_TYPE, null).iterateNext();
        let desc = dom.evaluate('//item[' + i + ']/description', dom, null, XPathResult.ANY_TYPE, null).iterateNext();
        desc = desc.textContent.trim();        
        let link = dom.evaluate('//item[' + i + ']/link', dom, null, XPathResult.ANY_TYPE, null).iterateNext();
        let pubDateOrigin = dom.evaluate('//item[' + i + ']/pubDate', dom, null, XPathResult.ANY_TYPE, null).iterateNext();
        let jsdate = new Date(pubDateOrigin.textContent);
        let pubDate = jsdate.getTime();
        let newsItem = new NewsItem(source, title.textContent, desc, link.textContent.replace(/\/\?.*/, "/"), pubDate);        
        items.push(newsItem);
    }
    return items;
}

function getErrorItem(source, title = null) {
    if (title === null) 
        title = `Ошибка при загрузке ${source}`;
    return new NewsItem(source, title, "", "", 0, 1000, 1000);
}


/////////////////////////////////////////////////////////////////////////////////////
// CORE
/////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////
// F1News

function loadF1News() {
    let source = "F1News";
    let urlRss = "http://www.f1news.ru/export/news.xml";
    let urlMain = "https://www.f1newss.ru/";
    return new Promise((res, rej) => {

        //load rss
        let items = getNewsItemsFromRss(urlRss, "F1News");
        if (items === null) {
            return res([getErrorItem(source)]);
        }

        //load main page
        let dom = null;
        try {
            dom = getDomHtml(urlMain);
        } catch(e) {
            console.log(e);
            return res(items.push(getErrorItem(source, "Ошибка при загрузке главной страницы F1News.")));            
        }

        res(items);

    });
}

/////////////////////////////////////////////////////////////////////////////////////
// Motorsport

function loadMotorsport() {
    let source = "Motorsport.com";
    let urlRss = "https://ru.motorsport.com/rss/f1/news";
    return new Promise((res, rej) => {
        let items = getNewsItemsFromRss(urlRss, "Motorsport");
        if (items === null) {
            items = ([getErrorItem(source)]);
        }
        res(items);
    });

}


