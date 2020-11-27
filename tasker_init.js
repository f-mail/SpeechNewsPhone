LoadNews(feed)
    .then(res => {
        
        if (res === null) {  
            setLocal("load_errors", "1");          
            exit();
        }

        if (!writeNewsToFiles(res, feed))
            setLocal("load_errors", "2");

        flash(`Загружено ${res.length}" новостей (${feed})`);

        exit();
    });