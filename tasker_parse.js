getContent(link, handlerErrorParsing)
    .then(content => {
        if (content) {
            setLocal("article", content);
            setLocal("find", "true"); 
        }           
        exit();
    });