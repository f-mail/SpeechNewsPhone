function asyncDomHtml(linkHtml, handlerDom) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", linkHtml); 
    xhr.setRequestHeader('Content-Type', 'text/html; charset=UTF-8');   
    xhr.timeout = 35000;
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
    };*/  
}

function getContent(url, handlerError = null) {

    //интерфакс гонит в win-1251
    //https://vestikavkaza.ru/material/329673?utm_source=yxnews&utm_medium=desktop network error

    return new Promise(res => {

        const defineBlocks = [
            "div.article__content p",
            "div.article-content p",
            "div.article_content p",
            "div.article__body p",            
            "div.article_text p",
            "div.article-text p",
            "div.article__text p",
            "div.article__body div.article-text-body p",
            "div.article_text_wrapper p",
            "div.articleBody p",
            "div.article__text p",
            "div.article-text-body p",
            "div.js-mediator-article p",
            "div.b-material-wrapper__text p",
            "div.b-text__content p",
            "div.b-text p",            
            "div.page-content p",
            "div.news-content-text p",
            "div.mainContent p",
            "div.article p",
            "div.content-body p",
            "div.content p",
            "div.text-content p",
            "div.newtext p",
            "div.mainContent p",
            "div.workarea-text p" ,
            "article p"               
        ];

        asyncDomHtml(url, dom => {
            if (dom === null) {
                if (handlerError) handlerError({ url, error : "network error"});
                return res(null);
            }
        

            content = null;

            //first - use define blocks
            for (let block of defineBlocks) {
                content = findText(dom, block);
                if (content != null) break;
            }            

            //second = body p
            if (content === null) {
                content = findText(dom, "body p", true);
                if (content && handlerError) handlerError({ url, error : "mismatch in define blocks : find only [body p]"});
            }

            //third = body span
            if (content === null) {
                content = findText(dom, "body span", true);
                if (content && handlerError) handlerError({ url, error : "mismatch in define blocks : find only [body span]"});
            }

            //no find
            if (content === null) {
                if (handlerError) handlerError({ url, error : "no find content"});
            }

            return res(content);
        });
    });
}

function findText(dom, block, isStrict = false) {
    let data = dom.querySelectorAll(block);
    let text = "";
    if (data.length == 0) {
        return null;
    }
    else {
        data.forEach((p) => {
            let piece = p.textContent.trim();
            let textArea = document.createElement('textarea');
            textArea.innerHTML = piece;
            piece = textArea.value;

            if (isStrict && piece.length < 50) return;
            if (piece.search(/[\.,\?\!]{1}$/gm) < 0)
                piece += ".";
            text += piece + "\n";
        });        
    }
    if (text == "") return null;
    return text;
}

