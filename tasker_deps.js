/////////////////////////////////////////////////////////////////////////////////////
// TASKER DEPENDENCIES (USING BUILT-IN TASKER'S FUNCTIONS)
/////////////////////////////////////////////////////////////////////////////////////

const FileFoulsCacheMaxItems = 600;

function removeFouls(items, feed) {
    const fileName = `${global('%NewsBaseFolder')}/fouls.cache.${feed}.txt`;
    try {
        let contents = readFile(fileName);
        let hashes = contents.trim('\n').split('\n');        

        //compress
        if (hashes.length > FileFoulsCacheMaxItems) {
            hashes.splice(0, hashes.length / 2);            

            //write compress content
            let output = "";
            for (let hash of hashes) {
                output += hash + "\n";
            }
            writeFile(fileName, output, false);
        }

        let i = items.length;
        while(i--) {
            let item = items[i];
            let isFind = hashes.indexOf(md5(item.title));
            if (isFind < 0) 
                isFind = hashes.indexOf(md5(item.link));
            if (isFind >= 0) {
                items.splice(i, 1);
            }
        } 

    } catch {
        flash("Файл кэша новостей не найден.");
    }
     
}

//polyfill for array.flat()
if (!Array.prototype.flat)
Array.prototype.flat = function (depth = 1) {
   depth = isNaN(depth) ? 0 : Math.floor(depth);
if (depth < 1) return this.slice();
return [].concat(
      ...(depth < 2)
         ? this
         : this.map(v => Array.isArray(v) ? v.flat(depth - 1) : v)
   )
};

//write news to file
function writeNewsToFiles(items, feed) {
    let pathPrefix = `${global('%NewsBaseFolder')}/news.${feed}`;
    let allTitles = "";
    let allDescs = "";
    let allLinks = "";
    let allDates = "";

    if (items.length == 0) {
        allTitles = "(empty)¶";
        allDescs = "(empty)¶";
        allLinks = "(empty)¶";
        allDates = "(empty)¶";
    }

    for(let i = 0; i < items.length; i++) {
        let item = items[i];
        allTitles += item.title + '¶';
        allDescs += item.desc + '¶';
        allLinks += item.link + '¶';
        let date = "(empty)";
        if (item.date > 0) date = item.date.toString();
        allDates += date + '¶';
    }
    try {
        writeFile(pathPrefix + '.titles.txt', allTitles, false);
        writeFile(pathPrefix + '.descs.txt', allDescs, false);
        writeFile(pathPrefix + '.links.txt', allLinks, false);
        writeFile(pathPrefix + '.dates.txt', allDates, false);
    } catch {
        return false;
    }
    return true;
}

//save error if raise while js parsing
function handlerErrorParsing(e) {
    const fileName = `${global('%NewsBaseFolder')}/wrong_sites_parsing.txt`;
    let txt = "> " + e.error + "\n" + e.url + "\n\n";
    writeFile(fileName, txt, true);
}