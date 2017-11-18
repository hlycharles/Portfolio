export function getIntro(callback) {
    readFile("/data/intro.txt", callback);
}

export function getProjects(callback) {
    const result = [];
    let projectCount = 0;

    function putProject(index, content) {
        result[index] = content;
        projectCount--;
        if (projectCount === 0) {
            callback(result);
        }
    }

    function parseProject(content) {
        const ids = content.split("\n");
        for (let i = 0; i < ids.length; i++) {
            result.push({});
        }
        projectCount = ids.length;
        ids.forEach(id => {
            findProjectInformation(id, putProject);
        })
    }
    readFile("/data/project/id.txt", parseProject);
}

function findProjectInformation(id, callback) {
    let project = {
        id: id,
    };
    let fieldCount = 7;
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
                callback(id, project);
            }
        });
    }
    getInfo("title", `/data/project/${id}/title.txt`);
    getInfo("intro", `/data/project/${id}/intro.txt`);
    getInfo("description", `/data/project/${id}/description.txt`);
    getInfo("languages", `/data/project/${id}/language.txt`, true);
    getInfo("imgs", `/data/project/${id}/img.txt`, true);
    getInfo("summary", `/data/project/${id}/summary.txt`);
    getInfo("technology", `/data/project/${id}/technology.txt`);
}

export function getWork(callback) {
    const result = [];
    let workCount = 0;
    function putWork(index, content) {
        result[index] = content;
        workCount--;
        if (workCount === 0) {
            callback(result);
        }
    }

    function parseWork(content) {
        const ids = content.split("\n");
        for (let i = 0; i < ids.length; i++) {
            result.push({});
        }
        workCount = ids.length;
        ids.forEach(id => {
            findWorkInformation(id, putWork);
        })
    }
    readFile("/data/work/id.txt", parseWork);
}

function findWorkInformation(id, callback) {
    let work = {};
    let fieldCount = 5;
    function getInfo(key, path) {
        readFile(path, r => {
            work[key] = r;
            fieldCount--;
            if (fieldCount === 0) {
                callback(id, work);
            }
        });
    }
    getInfo("title", `/data/work/${id}/title.txt`);
    getInfo("intro", `/data/work/${id}/intro.txt`);
    getInfo("description", `/data/work/${id}/description.txt`);
    getInfo("summary", `/data/work/${id}/summary.txt`);
    getInfo("technology", `/data/work/${id}/technology.txt`);
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
