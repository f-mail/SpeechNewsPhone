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
    xhr.timeout = 15000;
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
    /*xhr.ontimeout = () => {
        console.error(`[timeout] : ${linkRss}`)
        return handlerDom(null)
    }; */   
}

function asyncDomHtml(linkHtml, handlerDom) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", linkHtml);    
    xhr.timeout = 30000;
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
    /*xhr.ontimeout = () => {
        console.error(`[timeout] : ${linkHtml}`)
        return handlerDom(null)
    }; */ 
}

function asyncNewsItemsFromRss(rssLink, source, maxItems, handlerMain) {
    //let maxItems = 30; //max parsing items in rss feed
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

    for (let i = 0, len = items.length; i < len; i++) {
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

function filterText(txt, sourceReplace, targetReplace = "") {
    txt = txt.replace(sourceReplace, targetReplace);
    return txt;
}


//add numbers for speech
function addNumbersForSpeech(items) {
    for(let i = 1; i < items.length; i++) {
        if ((i+1) % 15 == 0) 
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

function shuffleArray(arr) {
    var j, x, i;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }    
}

function getFirstSentence(txt) {
    let sen = txt.match(/^.*?[.!?](?:\s|$)(?!.*\))/);
    if (sen === null) return txt;
    return sen[0];
}

function removeDuplicats(arr) {
    let arrResult = {};
    for (let i = 0, n = arr.length; i < n; i++) {
        let item = arr[i];
        arrResult[item.title] = item;
    }

    let i = 0;
    let nonDuplicatedArray = [];    
    for(var item in arrResult) {
        nonDuplicatedArray[i++] = arrResult[item];
    }
    return nonDuplicatedArray;    
}

function setTagForNewsBlock(items, tag) { //нужно перенести функцию в pipeline, сортировка тут неуместна
    if (items.length === 0)
        return items;
    items.sort((a, b) => { return b.weight - a.weight }); 
    items.sort((a, b) => { return a.priority - b.priority ||  a.date - b.date}); 
    
    items[0].title = tag + ": " + items[0].title;
    return items;
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
            //loadChampionat()
        ]
    }

    if (feed === "feed2") {
        maxItems = 24;
        arrPromises = [
            load3dnews(),
            loadOverclockers(),
            // loadSakhalin(),
            loadHabr(),
            loadHabrNews()
            // loadSvoboda(),
            // loadYandex("main"),
            // loadYandex("world"),
            // loadYandex("culture"),
            // loadYandex("computers"),                                               
            // loadYandex("science")            
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

                // Remove Duplicats
                items = removeDuplicats(items);

                // Remove Extra 
                if (items.length > maxItems) 
                    items = items.slice(0, maxItems);

                // Cleaning Content
                cleanContent(items);

                // Shuffle
                //shuffleArray(items);                
               
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
        asyncNewsItemsFromRss(urlRss, source, 30, (items) => {

            if (items === null) {
                return res([getErrorItem(source)]);
            }

            filterTitles(items, [ 
                /Пять прямых трансляций$/,
                /Этап конкурса прогнозов$/,
                /: Комментарии перед этапом/,
                /: Круглые числа/,
                /^\d+ минут до старта/,
                /: Точка самого серьёзного торможения/,
                /: Все цитаты/,
                /: Пресс-конференция/,
                /: Комментарии после/,
                /: Круг за кругом/,
                /: Порядок смены шина/
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
        asyncNewsItemsFromRss(urlRss, source, 30, (items) => {
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
                            if (elements.length == 0) throw "empty elements";
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
                            if (elements.length == 0) throw "empty elements";
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

    const source = "sport.ru";    
    const urlMain = "https://sport.ru/";    
    const baseWeight = 200;
    const basePriority = 100;
    let items = [];
    
    return new Promise((res, rej) => {
        asyncDomHtml(urlMain,  dom => {            
            
            if (dom === null) {
                items.push(getErrorItem(source));
                return res(items);
            }

            try {

                const elementLink = dom.querySelector("div.articles-item-large a");
                const elementTitle = dom.querySelector("div.articles-item-large h3");                

                let link = getFullLink(urlMain, elementLink.pathname);
                let title = elementTitle.textContent;

                items.push( new NewsItem(source, title, null, link, null, baseWeight, basePriority)); 

                filterTitles(items, [
                    /^LIVE/
                ])
            } 
            catch(e) {
                console.log(e);
                items.push(getErrorItem(source, "Ошибка парсинга sport.ru"));
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
    const prob1News = 40;
    const prob2News = 40;
    const prob3News = 20;
    let items = [];
    
    return new Promise((res, rej) => {
        asyncDomHtml(urlMain,  dom => {            
            
            if (dom === null) {
                items.push(getErrorItem(source));
                return res(items);
            }

            try {

                let elements = dom.querySelectorAll("div.top-news div.top-news__wrap div._main li.news-item"); 
                if (elements.length == 0) throw "emmpty elements";
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

                            if (countNews === 0)
                                arrPopulars = [];                            

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


/////////////////////////////////////////////////////////////////////////////////////
// Habr

//#region habr.com

function loadHabr() {

    const source = "habr.com";
    const urlRss = "https://habr.com/ru/rss/best/daily/?fl=ru";    
    const baseWeight = 100;
    const basePriority = 800;

    const prob1News = 60;
    const prob2News = 30;
    const prob3News = 10;
    

    return new Promise((res, rej) => {

        //load rss
        asyncNewsItemsFromRss(urlRss, source, 5, (items) => {

            if (items === null) {
                return res([getErrorItem(source)]);
            }
            
            items.forEach(item => item.weight = baseWeight);
            items.forEach(item => item.priority = basePriority);
            items.forEach(item => item.desc = "(empty)");
            items.forEach(item => item.date = 0);

            //updateWeightPerDate(items); 

            //select count using random
            let countNews = 1;
            let prob = Math.random() * 100;
            if (prob < prob1News) countNews = 1;
            else if (prob < (prob1News+prob2News)) countNews = 2;            
            else countNews = 3;

            if (items.length > countNews)
                items.splice(countNews);

            res(items);            
        });         
    });
}

function loadHabrNews() {

    const source = "habr.com/news";
    const urlRss = "https://habr.com/ru/rss/news/?fl=ru";    
    const baseWeight = 80;
    const basePriority = 700;

    const prob1News = 50;
    const prob2News = 40;
    const prob3News = 10;
    

    return new Promise((res, rej) => {

        //load rss
        asyncNewsItemsFromRss(urlRss, source, 5, (items) => {

            if (items === null) {
                return res([getErrorItem(source)]);
            }
            
            items.forEach(item => item.weight = baseWeight);
            items.forEach(item => item.priority = basePriority);
            items.forEach(item => item.desc = "(empty)");
            items.forEach(item => item.date = 0);

            updateWeightPerDate(items); 

            //select count using random
            let countNews = 1;
            let prob = Math.random() * 100;
            if (prob < prob1News) countNews = 1;
            else if (prob < (prob1News+prob2News)) countNews = 2;            
            else countNews = 3;

            if (items.length > countNews)
                items.splice(countNews);

            items = setTagForNewsBlock(items, "HABR");

            res(items);            
        });         
    });
}

//#endregion


/////////////////////////////////////////////////////////////////////////////////////
// radio svoboda

//#region svoboda

function loadSvoboda() {

    const source = "svoboda.org";
    const urlRss = "https://d19jioddu7q9d3.cloudfront.net/api/zmrpmye$tpmv";    
    const baseWeight = 90;
    const basePriority = 600;

    const prob1News = 60;
    const prob2News = 20;
    const prob3News = 20;
    

    return new Promise((res, rej) => {

        //load rss
        asyncNewsItemsFromRss(urlRss, source, 5, (items) => {

            if (items === null) {
                return res([getErrorItem(source)]);
            }
            
            items.forEach(item => item.weight = baseWeight);
            items.forEach(item => item.priority = basePriority);
            items.forEach(item => item.desc = "(empty)");
            items.forEach(item => item.date = 0);

            updateWeightPerDate(items); 

            //select count using random
            let countNews = 1;
            let prob = Math.random() * 100;
            if (prob < prob1News) countNews = 1;
            else if (prob < (prob1News+prob2News)) countNews = 2;            
            else countNews = 3;

            if (items.length > countNews)
                items.splice(countNews);

            items = setTagForNewsBlock(items, "СВОБОДА");

            res(items);            
        });         
    });
}

//#endregion


/////////////////////////////////////////////////////////////////////////////////////
// 3DNews

//#region 3DNews.ru

function load3dnews() {

    const source = "3dnews.ru";    
    const urlMain = "https://3dnews.ru/"; 
    const urlNews = "https://3dnews.ru/news";
    const baseWeight = 100;
    const basePriority = 10;
    const countNews = 8;
    const weightOrder = 10; //weight for order by fresh
    let items = [];
    
    return new Promise((res, rej) => {
        asyncDomHtml(urlNews,  dom => {            
            
            if (dom === null) {
                items.push(getErrorItem(source));
                return res(items);
            }

            try {

                const elements= dom.querySelectorAll("div#section-content.news-feed-all div.article-entry.marker_imp");  
                let arrMain = [];
                let j = countNews;

                if (elements.length === 0) throw ("no elements");
                elements.forEach(element => {
                    if (arrMain.length >= countNews) return;

                    let link = element.querySelector("a.entry-header").pathname;
                    let title = element.querySelector("h1").textContent;
                    title = filterText(title, "S.T.A.L.K.E.R.", "STALKER");
                    let desc = element.querySelector("p").textContent;
                    let weight = --j * weightOrder;
                    let item = {
                        title,
                        link,
                        desc,
                        weight
                    }
                    arrMain.push(item);
                });

                arrMain.forEach(i => {
                    //items.push( new NewsItem(source, i.title, getFirstSentence(i.desc), 
                    //    getFullLink(urlMain, i.link), null, baseWeight + i.weight, basePriority));
                    items.push( new NewsItem(source, i.title, null, 
                        getFullLink(urlMain, i.link), null, baseWeight + i.weight, basePriority));
                });

            } 
            catch(e) {
                console.log(e);
                items.push(getErrorItem(source, "Ошибка парсинга 3dnews"));
                return res(items);
            }

            return res(items);                      
        });        
    });
}

//#endregion

/////////////////////////////////////////////////////////////////////////////////////
// Overclockers.ru

//#region overclockers.ru

function loadOverclockers() {

    const source = "overclockers.ru";    
    const urlMain = "https://overclockers.ru/";
    const baseWeight = 50;
    const basePriority = 20;
    const countNews = 8;
    const weightPerComm = 2;
    const weightPerOrder = 1
    const prob2News = 30;
    const prob3News = 60;
    const prob5News = 10;
    let items = [];
    
    return new Promise((res, rej) => {
        asyncDomHtml(urlMain,  dom => {            
            
            if (dom === null) {
                items.push(getErrorItem(source));
                return res(items);
            }

            try {

                const elements= dom.querySelectorAll("div[data-tab=newsAll] div.feed.news.mixed-news-wrap div.event"); 
                if (elements.length === 0) throw ("no elements"); 

                let arrMain = [];
                let j = elements.length;

                //select count using random
                let countNews = 1;
                let prob = Math.random() * 100;
                if (prob < prob2News) countNews = 2;
                else if (prob < (prob2News+prob3News)) countNews = 3;                               
                else countNews = 5;
                
                elements.forEach(element => {
                    if (arrMain.length >= countNews) return;

                    let link = element.querySelector("div.summary>a").pathname;
                    let title = element.querySelector("div.summary>a").textContent;                    
                    let comms = convertTextToNumber(element.querySelector("span.cc-real").textContent);
                    let weight = (comms * weightPerComm) + (j-- * weightPerOrder);
                    let item = {
                        title,
                        link,
                        comms,
                        weight                        
                    }
                    arrMain.push(item);
                });

                arrMain.sort((a, b) => { return b.weight - a.weight; });

                arrMain.forEach(i => {
                    items.push( new NewsItem(source, i.title, null, 
                        getFullLink(urlMain, i.link), null, baseWeight + i.weight, basePriority));
                });

            } 
            catch(e) {
                console.log(e);
                items.push(getErrorItem(source, "Ошибка парсинга overclockers"));
                return res(items);
            }

            return res(items);                      
        });        
    });
}

//#endregion

/////////////////////////////////////////////////////////////////////////////////////
// Sakhalin.info

//#region sakhalin.info
function loadSakhalin() {

    const source = "sakhalin.info";    
    const urlMain = "https://iasakh.com/";
    const baseWeight = 0;
    const basePriority = 500;
    const prob1News = 25;
    const prob2News = 35;
    const prob3News = 30;
    const prob5News = 10;
    const weightPerComm = 0.2;
    const weightPerView = 0.003;
    let items = [];
    
    return new Promise((res, rej) => {
        asyncDomHtml(urlMain,  dom => {            
            
            if (dom === null) {
                items.push(getErrorItem(source));
                return res(items);
            }

            try {

                const elements= dom.querySelectorAll("div.picture-of-the-day__main-list div.popular-story"); 
                if (elements.length === 0) throw ("no elements"); 

                let arrMain = [];
                
                elements.forEach(element => {
                    //if (arrMain.length >= countNews) return;

                    let link = element.querySelector("a.popular-story__link").pathname;
                    let title = element.querySelector("div.popular-story__title>a.popular-story__link").textContent;                    
                    let views = element.querySelector("span.popular-story__stat_views-popular");
                    let comms = element.querySelector("a.popular-story__stat_comments-popular,a.popular-story__stat_comments");


                    if (views === null) views = "0"; else views = views.textContent;
                    if (comms === null) comms  = "0"; else comms = comms.textContent;
                    
                    views = convertTextToNumber(views);
                    comms = convertTextToNumber(comms);
                    let weight = (views * weightPerView)  + (comms * weightPerComm);
                    
                    let item = {
                        title,
                        link,
                        views,
                        comms,
                        weight                       
                    }
                    arrMain.push(item);
                });

                arrMain.sort((a, b) => { return b.weight - a.weight; });

                if (arrMain[0].weight === 0) throw ("sakh.com - all views or comms is 0");

                //select count using random
                let countNews = 1;
                let prob = Math.random() * 100;
                if (prob < prob1News) countNews = 1;
                else if (prob < (prob1News+prob2News)) countNews = 2;
                else if (prob < (prob1News+prob2News+prob3News)) countNews = 3;
                else countNews = 5;

                if (arrMain.length > countNews) {
                    arrMain.splice(countNews);
                }                

                arrMain.forEach(i => {
                    items.push( new NewsItem(source, i.title, null, 
                        getFullLink(urlMain, i.link), null, baseWeight + i.weight, basePriority));
                });

            } 
            catch(e) {
                console.log(e);
                items.push(getErrorItem(source, "Ошибка парсинга sakh.com"));
                return res(items);
            }

            return res(items);                      
        });        
    });
}

//#endregion

/////////////////////////////////////////////////////////////////////////////////////
// Yandex.ru

//#region yandex news

function asyncDomYandex(linkHtml, handlerDom) {

    let parser = new DOMParser();
    return handlerDom(parser.parseFromString(linkHtml, "text/html"));

    // let xhr = new XMLHttpRequest();
    // xhr.open("GET", linkHtml);
    // //xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36");    
    // xhr.timeout = 30000;
    // xhr.send();
    // xhr.onreadystatechange = () => {
    //     if (xhr.readyState != 4) return;
    //     if (xhr.status != 200) {
    //         console.error(`[xhr error] ${xhr.status} : ${linkHtml}`)
    //         return handlerDom(null);
    //     }
    //     let parser = new DOMParser();
    //     return handlerDom(parser.parseFromString(xhr.responseText, "text/html"));
    // };
    /*xhr.ontimeout = () => {
        console.error(`[timeout] : ${linkHtml}`)
        return handlerDom(null)
    }; */ 
}

function loadYandex(type) {

    let source = "yandex.news.main";    
    let urlBase = "https://dzen.ru/news";
    //let urlMain = "https://yandex.ru/news";
    let urlMain = yamain;
    
    let baseWeight = 100;
    let basePriority = 300;
    let prob1News = 60;
    let prob2News = 30;
    let prob3News = 9;
    let prob5News = 1;
    let weightPerOrder = 30;
    let timeout = 0;    
    let items = [];

    if (type === "world") {
        //urlMain = "https://dzen.ru/news/rubric/world";
        urlMain = yaworld;
        source = "yandex.news.world";
        baseWeight -= 5;
        basePriority += 10;
        prob1News = 70;
        prob2News = 20;
        prob3News = 9;
        prob5News = 1;
        timeout = 50;
    }
    else if (type === "science") {
        //urlMain = "https://dzen.ru/news/rubric/science";
        urlMain = yascience;
        source = "yandex.news.science";
        baseWeight -= 10;
        basePriority += 20;
        prob1News = 60;
        prob2News = 30;
        prob3News = 6;
        prob5News = 3;
        timeout = 100;
    }
    else if (type === "computers") {
        //urlMain = "https://yandex.ru/news/rubric/computers";
        urlMain = yacomputers;
        source = "yandex.news.computers";
        baseWeight -= 15;
        basePriority += 40;
        prob1News = 70;
        prob2News = 15;
        prob3News = 4;
        prob5News = 1;
        timeout = 150;
    }
    else if (type === "culture") {
        //urlMain = "https://yandex.ru/news/rubric/culture";
        urlMain = yaculture;
        source = "yandex.news.computers";
        baseWeight -= 20;
        basePriority += 30;
        prob1News = 70;
        prob2News = 20;
        prob3News = 4;
        prob5News = 1;
        timeout = 150;
    }
    
    
    return new Promise((res, rej) => {
        setTimeout(asyncDomYandex, timeout, urlMain,  dom => {            
            
            if (dom === null) {
                items.push(getErrorItem("Ошибка при загрузке yandex news."));
                return res(items);
            }

            try {

                let arrMain = [];
                
                //mobile version
                let elements = dom.querySelectorAll("div.news-feed article.news-card");
                if (elements.length === 0) 
                {
                    //alternate version
                    elements = dom.querySelectorAll("div.news-app__content div.mg-card__inner");
                }			
				
				if (elements.length === 0) 
                {
                    //alternate version
                    elements = dom.querySelectorAll("div.news-feed div.mg-card__inner");
                }                

                if (elements.length === 0) 
                {
                    //alternate version
                    elements = dom.querySelectorAll("div.news-feed article.mg-card");
                }
                if (elements.length === 0) 
                {
                    //desktop version
                    elements = dom.querySelectorAll("div.news-top-stories article.news-card");
                }
                if (elements.length === 0) 
                {
                    //desktop alternate version
                    elements = dom.querySelectorAll("div.news-top-stories article.mg-card");
                }
                if (elements.length === 0) 
                {                    
                    arrMain.push(getErrorItem(source, "Не нашли новости для:" + source));
                }                    

                
                //select count using random
                let countNews = 1;
                let prob = Math.random() * 100;
                if (prob < prob1News) countNews = 1;
                else if (prob < (prob1News+prob2News)) countNews = 2;
                else if (prob < (prob1News+prob2News+prob3News)) countNews = 3; 
                else if (prob < (prob1News+prob2News+prob3News+prob5News)) countNews = 5;             
                else countNews = 0;

                if (countNews === 0)
                    return res(items); 

                let j = countNews;
                
                elements.forEach(element => {
                    if (arrMain.length >= countNews) return;
                    
                    let link = element.querySelector("a.news-card__link");
                    let title = element.querySelector("h2.news-card__title");   
                    
                    if (link === null) {
                        link = element.querySelector("a.mg-card__link");
                        title = element.querySelector("h2.mg-card__title"); 
                    }

                    link = link.pathname;
                    title = title.textContent;
                                     
                    
                    let weight = --j * weightPerOrder; 
                    
                    let item = {
                        title,
                        link,                        
                        weight                       
                    }
                    arrMain.push(item);
                    
                });                

                arrMain.sort((a, b) => { return b.weight - a.weight; });


                /*setTimeout( {() => arrMain.forEach(i => {
                    let fullUrl = getFullLink(urlBase, i.link);
                    
                    asyncDomHtml(fullUrl, (domPage) => {
                        let find = domPage.querySelector("news-story__subtitle-text");
                        console.log(find.textContent);
                    })
                    
                })
            }, 1000);*/

                //select count using random
                /*let countNews = 1;
                let prob = Math.random() * 100;
                if (prob < prob1News) countNews = 1;
                else if (prob < (prob1News+prob2News)) countNews = 2;
                else if (prob < (prob1News+prob2News+prob3News)) countNews = 3;
                else countNews = 5;

                if (arrMain.length > countNews) {
                    arrMain.splice(countNews);
                }  */              

                arrMain.forEach(i => {
                    items.push( new NewsItem(source, i.title, null, 
                        getFullLink(urlBase, i.link), null, baseWeight + i.weight, basePriority));
                });

            } 
            catch(e) {
                console.log(e);
                items.push(getErrorItem(source, "Ошибка парсинга yandex news"));
                return res(items);
            }

            return res(items);                      
        });        
    });
}

//#endregion

