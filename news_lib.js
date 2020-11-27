/////////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
/////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////
// CLASSES
/////////////////////////////////////////////////////////////////////////////////////

//#region classes

function NewsItem(source, title, desc = null, link = null, date = null, weight = 1, priority = 1) {
    this.source = source;
    this.title = title.trim();
    this.desc = desc;
    if (desc === null) this.desc = "(empty)";
    this.link = link;
    if (link === null) this.link = "(empty)"; else this.link = link.trim();    
    this.date = date;
    if (date === null) this.date = 0;
    this.weight = weight;
    this.priority = priority;
    this.isError = false;
}

//#endregion

/////////////////////////////////////////////////////////////////////////////////////
// UTILS FUNCTIONS
/////////////////////////////////////////////////////////////////////////////////////

//#region utils

function asyncDomXml(linkRss, handlerDom) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", linkRss);    
    xhr.timeout = 12000;
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
    xhr.timeout = 15000;
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
    let maxItems = 40; //max parsing items in rss feed
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
    let item = new NewsItem(source, title, null, null, null, 10000, 10000);
    item.isError = true;
    return item;
}

function compareLinks(link1 = "", link2 = "") {    
    if (!(typeof link1 === 'string' && typeof link2 === 'string')) return false;
    let regexp = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
    link1 = link1.trim().replace(regexp, "$5");
    link2 = link2.trim().replace(regexp, "$5"); 
    return (link1 === link2);
}

function updateWeightPerDate(items) {
    const weightDateHour = 2;
    let now = new Date();
    for (let item of items) {
        let old = now - item.date;
        old = old / 3600000;
        let dateWeight = (48 - old) * (weightDateHour * 0.5); //apply to old 2 days only
        if (dateWeight > 0) item.weight += dateWeight;
    }
}

function cleanContent(items) {
    if (items.length === 0) return;

    let allDescs = "";
    for (let i = 0, len = items.length; i < len; i++) {
        allDescs += items[i].desc.replace(/<[^<]*?<\/.*?>/gm, "").replace(/<.*?>/gm, " ").trim(); //clearing html tags
        if (i < (len - 1)) allDescs += 'ł';
    }        

    //decode html entities
    let textArea = document.createElement('textarea');
    textArea.innerHTML = allDescs;
    allDescs = textArea.value;

    let arrDescs = allDescs.split('ł');

    for (let i = 0, len = arrDescs.length; i < len; i++) {
        items[i].desc = arrDescs[i];
    }
}

function filterTitles(items, arrSkipRegex) {
    let i = items.length;
    while(i--) {
        let isSkip = false;
        for (let reg of arrSkipRegex) {
            if (items[i].title.search(reg) >= 0)
            {
                items.splice(i, 1); 
                break;           
            }
        }
    }    
}

//add numbers for speech
function addNumbersForSpeech(items) {
    for(let i = 1; i < items.length; i++) {
        if ((i+1) % 5 == 0) 
            items[i].title = (i+1).toString() + ". " + items[i].title;
    }
}

function getFullLink(baseUrl, url) {
    return baseUrl.trim().replace(/\/+$/, "") + "/" +
        url.trim().replace(/^\/+/, "");
}

function convertTextToNumber(txt) {
    txt = txt.trim().replace(/"/, "").replace(/,/, ".");
    let multi = 1;
    if (txt.search(/k/i) >=0 ) {
        multi = 1000;
        txt = txt.replace(/k/gi, "");
    }
    if (+txt) {
        return txt * multi;
    }
    else {
        return 0;
    }
}

//#endregion
 
/////////////////////////////////////////////////////////////////////////////////////
// CORE
/////////////////////////////////////////////////////////////////////////////////////

//#region core

function LoadNews(feed) {

    let maxItems = 15;
    let arrPromises = null;
    
    
    if (feed === "feed1") {
        maxItems = 30;
        arrPromises = [
            loadF1News(),
            loadMotorsport(),
            loadSportbox(),
            loadChampionat()
        ]
    }


    return new Promise(res => {

        Promise.all(arrPromises)
            .then(arrModulesItems => {

                //concat all array-results
                if (arrModulesItems.length === 0) {
                    return res([]);
                }
                let items = arrModulesItems.flat();                

                //check if all items - network errors - then split all to single item
                let isAllErrors = items.every(item => { return item.isError; });                
                if (isAllErrors) {
                    return res(null);
                }
 
                // >>> PIPELNE >>>

                // Sort by weights
                items.sort((a, b) => { return b.weight - a.weight });                
                
                // Remove Extra 
                if (items.length > (maxItems * 2)) 
                    items = items.slice(0, maxItems*2);

                // Remove Fouls
                removeFouls(items, feed);

                // Remove Extra 
                if (items.length > maxItems) 
                    items = items.slice(0, maxItems);

                // Cleaning Content
                cleanContent(items);

                
               
                // Sort by priority, then - by date
                items.sort((a, b) => { return a.priority - b.priority ||  a.date - b.date}); 

                addNumbersForSpeech(items);

                res(items);
            });
    })    
}

//#endregion


/////////////////////////////////////////////////////////////////////////////////////
// PARSING MODULES
/////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////
// F1News.ru

//#region f1news.ru

function loadF1News() {

    const source = "f1news";
    const urlRss = "http://www.f1news.ru/export/news.xml";
    const urlMain = "https://www.f1news.ru/";
    const baseWeight = 100;
    const addWeightMain = 150;

    return new Promise((res, rej) => {

        //load rss
        asyncNewsItemsFromRss(urlRss, source, (items) => {

            if (items === null) {
                return res([getErrorItem(source)]);
            }

            filterTitles(items, [ 
                /Пять прямых трансляций$/,
                /Этап конкурса прогнозов$/,
                /: Комментарии перед этапом/,
                /: Круглые числа/,
                /^\d+ минут до старта/,
                /: Точка самого серьёзного торможения/
            ])
            items.forEach(item => item.weight = baseWeight);
            updateWeightPerDate(items);
    
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

//#endregion

/////////////////////////////////////////////////////////////////////////////////////
// Motorsport.com

//#region motorsport.com

function loadMotorsport() {

    const source = "Motorsport.com";
    const urlRss = "http://ru.motorsport.com/rss/f1/news/";    
    const urlMain = "https://ru.motorsport.com/";
    const urlTrand = "https://ru.motorsport.com/all/news/"
    const baseWeight = 95;
    const addWeightMain = 100;
    const addWeightTrand = 80;

    return new Promise((res, rej) => {
        asyncNewsItemsFromRss(urlRss, source, (items) => {
            if (items === null) {
                return res([getErrorItem(source)]);
            }
            items.forEach(item => item.weight = baseWeight);
            updateWeightPerDate(items);


            //using promises for parallel loads
            Promise.all([

                new Promise(resMain => {

                    //load main page            
                    asyncDomHtml(urlMain, dom => {

                        if (dom === null) {
                            items.push(getErrorItem(source, "Ошибка при загрузке главной страницы motorsport"));
                            return res(items);
                        }

                        try {

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
                        }
                        catch(e) {
                            items.push(getErrorItem(source, "Ошибка парсинга motorsport.com"));
                        }

                        resMain();
                    });
                }),

                new Promise(resTrand => {

                    //load trand page
                    asyncDomHtml(urlTrand, dom => {

                        if (dom === null) {
                            items.push(getErrorItem(source, "Ошибка при загрузке страницы списка новостей motorsport"));
                            return res(items);
                        }

                        try {

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
                        }
                        catch(e) {
                            items.push(getErrorItem(source, "Ошибка парсинга motorsport.com"));
                        }

                        resTrand();                        
                    });   
                })

            ])
                .then(arrRes => res(items));                
                      
        });        
    });
}

//#endregion

/////////////////////////////////////////////////////////////////////////////////////
// Sportbox.ru

//#region sportbox.ru

function loadSportbox() {

    const source = "sportbox.ru";    
    const urlMain = "https://news.sportbox.ru/";    
    const baseWeight = 200;
    const basePriority = 100;
    let items = [];
    
    return new Promise((res, rej) => {
        asyncDomHtml(urlMain,  dom => {            
            
            if (dom === null) {
                items.push(getErrorItem(source, "Ошибка при загрузке sportbox.ru"));
                return res(items);
            }

            try {

                const elementLink = dom.querySelector("div._Sportbox_Spb2015_Components_NewsOfDayBlock_NewsOfDayBlock a");
                const elementTitle = dom.querySelector("div.news_of_day--desc");                

                let link = getFullLink(urlMain, elementLink.pathname);
                let title = elementTitle.textContent;

                items.push( new NewsItem(source, title, null, link, null, baseWeight, basePriority)); 

                filterTitles(items, [
                    /^LIVE/
                ])
            } 
            catch(e) {
                console.log(e);
                items.push(getErrorItem(source, "Ошибка парсинга sportbox.ru"));
                return res(items);
            }

            return res(items);                      
        });        
    });
}

//#endregion

/////////////////////////////////////////////////////////////////////////////////////
// championat.com

//#region championat.com

function loadChampionat() {

    const source = "championat.com";    
    const urlMain = "https://www.championat.com/";    
    const baseWeight = 200;
    const basePriority = 100;
    const prob1News = 45;
    const prob2News = 40;
    const prob3News = 15;
    let items = [];
    
    return new Promise((res, rej) => {
        asyncDomHtml(urlMain,  dom => {            
            
            if (dom === null) {
                items.push(getErrorItem(source, "Ошибка при загрузке championat.ru"));
                return res(items);
            }

            try {

                let elements = dom.querySelectorAll("div.tabs-content._popular.js-topnews-content li.news-item"); 
                let arrPopulars = [];  
                
                elements.forEach((element) => {
                    let htmlA = element.querySelector("a.news-item__title");
                    let htmlComms = element.querySelector("span.js-comments-count");
                    let htmlNews = {
                        title : htmlA.textContent,
                        link : htmlA.pathname,
                        commId : htmlComms.getAttribute('data-id') //get id news
                    }
                    arrPopulars.push(htmlNews);
                })

                //championat.com using xhr request to get comms count
                let isCorrectCommsLoad = false;
                let linkCommCount = "https://c.rambler.ru/api/app/5/comments-count?";
                arrPopulars.forEach(i => linkCommCount += "xid=" + i.commId + "&");
                linkCommCount.replace(/\&$/, "");
                fetch(linkCommCount)
                    .then(resComms => resComms.json(),
                        error => {
                        console.log(error);
                        items.push(getErrorItem(source, "Ошибка при згарузке и парсинге json страницы комментариев championat.com"));                        
                        return res(items);
                    })
                    .then(jsonComms => {

                         //console.log(jsonComms);
                         try { 

                            for(id in jsonComms.xids) {
                                console.log(id + " val = " + jsonComms.xids[id]);
                                let popIndex = arrPopulars.findIndex(pop => pop.commId === id);
                                arrPopulars[popIndex].comms = jsonComms.xids[id];
                            }

                            arrPopulars.sort((a, b) => { return b.comms - a.comms; }); 
                    
                            //select count using random
                            let countNews = 1;
                            let prob = Math.random() * 100;
                            if (prob < prob1News) countNews = 1;
                            else if (prob < (prob1News+prob2News)) countNews = 2;
                            else countNews = 3;

                            if (arrPopulars.length > countNews) {
                                arrPopulars.splice(countNews);
                            }

                            arrPopulars.forEach(pop => {
                                items.push( new NewsItem(source, pop.title, null, getFullLink(urlMain, pop.link), null, baseWeight,
                                    basePriority));
                            })
                        }
                        catch(e) {
                            console.log(e);
                            items.push(getErrorItem(source, "Ошибка при згарузке и парсинге json страницы комментариев championat.com"));                        
                            return res(items);
                        }

                        return res(items);        

                    },
                    error => { 
                        console.log(error);
                        items.push(getErrorItem(source, "Ошибка при згарузке и парсинге json страницы комментариев championat.com"));                        
                        return res(items);

                    }); 
                
            } 
            catch(e) {
                console.log(e);
                items.push(getErrorItem(source, "Ошибка парсинга championat.com"));
                return res(items);
            }

                          
        });        
    });
}

//#endregion


