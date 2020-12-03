LoadNews(feed)
    .then(res => {
        setLocal("load_errors", "1");
        if (res === null ) {  
            setLocal("load_errors", "1");          
            exit();
        } 
        setLocal("load_errors", "0");       

        if (!writeNewsToFiles(res, feed))
            setLocal("load_errors", "2");

        
        flash(`Загружено ${res.length} новостей (${feed})`);

        exit();
    });