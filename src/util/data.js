export function getProjectIcons(projectName) {
    const projectIcons = [
        "yosemite.jpg",
        "yosemite.jpg",
    ];
    return projectIcons;
}

export function getProjects() {
    const projects = [
        {
            title: "iOS Reminder",
            intro: "XCode",
            name: "ios-reminder",
        },
        {
            title: "Second",
            intro: "Super code",
            name: "name",
        },
    ];
    return projects;
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

export function findWorkInformation(id, callback) {
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
