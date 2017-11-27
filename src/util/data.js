export function getIntro(callback) {
    readFile("data/intro.txt", callback);
}

// get information for a section based on given name
function getSectionInfo(name, findInformation, onSuccess) {
    const result = [];
    let resultCount = 0;

    // put content at given index into result
    function putInfo(index, content) {
        result[index] = content;
        resultCount--;
        if (resultCount === 0) {
            onSuccess(result);
        }
    }

    // parse information based on entry ids
    function parseInfo(content) {
        const ids = content.split("\n");
        for (let i = 0; i < ids.length; i++) {
            result.push({});
        }
        resultCount = ids.length;
        for (let i = 0; i < ids.length; i++) {
            findInformation(ids[i], i, putInfo);
        }
    }
    readFile(`data/${name}/id.txt`, parseInfo);
}

export function getProjects(onSuccess) {
    getSectionInfo("project", findProjectInformation, onSuccess);
}

function findProjectInformation(id, index, callback) {
    let project = {
        id: id,
    };
    let fieldCount = 7;
    // get content from file
    function getInfo(key, path, shouldParse) {
        readFile(path, r => {
            let content = r;
            if (shouldParse) {
                content = r.split("#");
                if (content[0].length === 0) {
                    content = [];
                }
            }
            project[key] = content;
            fieldCount--;
            if (fieldCount === 0) {
                callback(index, project);
            }
        });
    }
    getInfo("title", `data/project/${id}/title.txt`);
    getInfo("intro", `data/project/${id}/intro.txt`);
    getInfo("description", `data/project/${id}/description.txt`);
    getInfo("languages", `data/project/${id}/language.txt`, true);
    getInfo("imgs", `data/project/${id}/img.txt`, true);
    getInfo("summary", `data/project/${id}/summary.txt`);
    getInfo("technology", `data/project/${id}/technology.txt`);
}

export function getWork(onSuccess) {
    getSectionInfo("work", findWorkInformation, onSuccess);
}

function findWorkInformation(id, index, callback) {
    let work = {};
    let fieldCount = 5;
    // get content from file
    function getInfo(key, path) {
        readFile(path, r => {
            work[key] = r;
            fieldCount--;
            if (fieldCount === 0) {
                callback(index, work);
            }
        });
    }
    getInfo("title", `data/work/${id}/title.txt`);
    getInfo("intro", `data/work/${id}/intro.txt`);
    getInfo("description", `data/work/${id}/description.txt`);
    getInfo("summary", `data/work/${id}/summary.txt`);
    getInfo("technology", `data/work/${id}/technology.txt`);
}

function readFile(uri, callback) {
    const file = new XMLHttpRequest();
    file.open("GET", uri, true);
    file.onreadystatechange = () => {
        if (file.readyState === 4) {
            if (file.status === 200 || file.status === 0) {
                callback(file.responseText);
            }
        }
    };
    file.send(null);
}
