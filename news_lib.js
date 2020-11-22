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

function asyncDomXml(linkRss, handlerDom) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", linkRss);    
    xhr.timeout = 7000;
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            console.error(`[xhr error] ${xhr.status} : ${linkRss}`)
            return handlerDom(null);
        }
        let parser = new DOMParser();
        return handlerDom(parser.parseFromString(xhr.responseText, "text/xml"));
    };
    xhr.ontimeout = () => {
        console.error(`[timeout] : ${linkRss}`)
        return handlerDom(null)
    };    
}

function asyncDomHtml(linkHtml, handlerDom) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", linkHtml);    
    xhr.timeout = 10000;
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            console.error(`[xhr error] ${xhr.status} : ${linkHtml}`)
            return handlerDom(null);
        }
        let parser = new DOMParser();
        return handlerDom(parser.parseFromString(xhr.responseText, "text/html"));
    };
    xhr.ontimeout = () => {
        console.error(`[timeout] : ${linkHtml}`)
        return handlerDom(null)
    };  
}

function asyncNewsItemsFromRss(rssLink, source, handlerMain) {
    let maxItems = 50; //max parsing items in rss feed
    let items = [];
    asyncDomXml(rssLink, (dom) => {
        if (dom === null) {
            return handlerMain(null);
        }
        let count = dom.evaluate('count(//item/title)', dom, null, XPathResult.ANY_TYPE, null);
        if (count.numberValue === 0) {
            return handlerMain(null);
        } 
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
        return handlerMain(items);
    })    
}

function getErrorItem(source, title = null) {
    if (title === null) 
        title = `Ошибка при загрузке ${source}`;
    return new NewsItem(source, title, "", "", 0, 1000, 1000);
}

function compareLinks(link1 = "", link2 = "") {    
    if (!(typeof link1 === 'string' && typeof link2 === 'string')) return false;
    let regexp = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
    link1 = link1.trim().replace(regexp, "$5");
    link2 = link2.trim().replace(regexp, "$5"); 
    return (link1 === link2);
}


/////////////////////////////////////////////////////////////////////////////////////
// CORE
/////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////
// F1News.ru

function loadF1News() {

    const source = "f1news";
    const urlRss = "http://www.f1news.ru/export/news.xml";
    const urlMain = "https://www.f1news.ru/";
    const baseWeight = 50;
    const addWeightMain = 100;

    return new Promise((res, rej) => {

        //load rss
        asyncNewsItemsFromRss(urlRss, source, (items) => {

            if (items === null) {
                return res([getErrorItem(source)]);
            }
            items.forEach(item => item.weight = baseWeight);
    
            //load main page
            asyncDomHtml(urlMain, (dom) => {

                if (dom === null)  {
                    items.push(getErrorItem(source, "Ошибка при загрузке главной страницы f1news."));
                    return res(items);            
                }

                let strLink = dom.querySelector("a.b-home-super-news__link");
                if (strLink === null) {
                    items.push(getErrorItem(source, "На сайте f1news не найдена главная новость."));
                    return res(items);
                }
                let data = strLink.pathname;
                for (let item of items) {         
                    if (compareLinks(data, item.link)) {
                        item.weight += addWeightMain;
                        item.title = "Новость дня: " + item.title;
                        break;
                    }
                }

                res(items);
            }); 
        }); 
    });
}

/////////////////////////////////////////////////////////////////////////////////////
// Motorsport.com

function loadMotorsport() {

    const source = "Motorsport.com";
    const urlRss = "http://ru.motorsport.com/rss/f1/news/";    
    const urlMain = "https://ru.motorsport.com/";
    const urlTrand = "https://ru.motorsport.com/all/news/"
    const baseWeight = 50;
    const addWeightMain = 50;
    const addWeightTrand = 30;

    return new Promise((res, rej) => {
        asyncNewsItemsFromRss(urlRss, source, (items) => {
            if (items === null) {
                items = ([getErrorItem(source)]);
            }
            items.forEach(item => item.weight = baseWeight);

            //load main page
            asyncDomHtml(urlMain, dom => {

                if (dom === null) {
                    items.push(getErrorItem(source, "Ошибка при загрузке главной страницы motorsport"));
                    return res(items);
                }

                const elements = dom.querySelectorAll("div.ms-top-block-main h3.ms-item_title>a.ms-item_link");
                const linksMain = [];
                elements.forEach(element => {
                    let data = element.pathname;
                    linksMain.push(data);
                });

                for (let item of items) {
                    if (linksMain.find(link => { return compareLinks(link, item.link) }))
                        item.weight += addWeightMain;
                }

                //load trand page
                asyncDomHtml(urlTrand, dom => {

                    if (dom === null) {
                        items.push(getErrorItem(source, "Ошибка при загрузке страницы списка новостей motorsport"));
                        return res(items);
                    }

                    const elements = dom.querySelectorAll("div.ms-side-widget--trending a.ms-item_link--text");
                    const linksTrand = [];
                    elements.forEach(element => {
                        let data = element.pathname;
                        linksTrand.push(data);
                    });

                    for (let item of items) {
                        if (linksTrand.find(link => { return compareLinks(link, item.link) }))
                            item.weight += addWeightTrand;
                    }

                    res(items);
                });                
            });            
        });        
    });
}


