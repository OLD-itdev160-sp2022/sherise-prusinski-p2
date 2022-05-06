var resources = [];
var teams = [];
var progprojs= [];
var nextId = 1;

class Team {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class ProgramProject {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class Resource {
    constructor(id, fName, lName, tName, status) {
        this.id = id;
        this.fName = fName;
        this.lName = lName;
        this.tName = tName;
        this.status = status;
    }
}

function addOptionToDataList(elementName,optionName) {

    var dataListEl = document.getElementById(elementName);
    var fragment = document.createDocumentFragment();

    var optionEl = document.createElement('option');
    var optionTextEl = document.createTextNode(optionName);
    optionEl.id = 'option'+ nextId ;
    optionEl.value = optionName;
    optionEl.appendChild(optionTextEl);
    fragment.appendChild(optionEl);
    dataListEl.appendChild(fragment);
    return optionEl.id;
}

function addTeam(event) {
    var tname = document.getElementById('ant-tname').value;
    var teamIndex = teams.findIndex((t) => t.name === tname);
    if(teamIndex < 0) {
        var teamListInputEl = document.getElementById('anr-tname-in');
        teamListInputEl.disabled = false;
        var teamListInputEl = document.getElementById('dat-tname-in');
        teamListInputEl.disabled = false;
        var tid = addOptionToDataList('anr-tname', tname);
        tid = addOptionToDataList('dat-tname', tname);
        var team = new Team(tid, tname);
        teams.push(team);
        ++nextId;
    }
    else {
        alert(tname + ' already exists!');
    }
}

function addProgramProject(event) {
    var pname = document.getElementById('anp-pname').value;

    var progprojIndex = progprojs.findIndex((p) => p.name === pname);
    if(progprojIndex < 0) {
        var progprojListInputEl = document.getElementById('dap-pname-in');
        progprojListInputEl.disabled = false;
        var pid = addOptionToDataList('dap-pname', pname);
        var progproj = new ProgramProject(pid, pname);
        progprojs.push(progproj);
        ++nextId;
    }
    else {
        alert(pname + ' already exists!');
    }
}

function addResource(event) {
    var firstName = document.getElementById('anr-fname').value;
    var lastName = document.getElementById('anr-lname').value;
    var teamName = document.getElementById('anr-tname-in').value;
    var status = document.getElementById('anr-status-in').value;

    var resource = new Resource(nextId, firstName, lastName, teamName, status);
    resources.push(resource);
    ++nextId;
}

function deleteTeam(event) {
    var tname = document.getElementById('dat-tname-in').value;
    var deleteIndex = teams.findIndex((t) => t.name === tname);
    var deleteEls = document.querySelectorAll("#" + teams[deleteIndex].id);
    deleteEls.forEach((delEl)=>delEl.remove());
    delete teams[deleteIndex];
    if(teams.length <= 2) {
        document.getElementById('anr-tname-in').disabled = true;
        document.getElementById('dat-tname-in').disabled = true;
    }
}

function deleteProgramProject(event) {
    var pname = document.getElementById('dap-pname-in').value;
    var deleteIndex = progprojs.findIndex((p) => p.name === pname);
    var deleteEls = document.querySelectorAll("#" + progprojs[deleteIndex].id);
    deleteEls.forEach((delEl)=>delEl.remove());
    delete progprojs[deleteIndex];
    if(progprojs.length <= 2) {
        document.getElementById('dap-pname-in').disabled = true;
    }
}

function setUp() {
    var team = new Team(nextId, "None");
    teams.push(team);

    var progproj = new ProgramProject(nextId, "None");
    progprojs.push(progproj);

    document.getElementById('add-resource').onclick = addResource;
    document.getElementById('add-team').onclick = addTeam;
    document.getElementById('add-progproj').onclick = addProgramProject;
    document.getElementById('delete-team').onclick = deleteTeam;
    document.getElementById('delete-progproj').onclick = deleteProgramProject;
}

function run() {
    setUp();
}

(function (window, document, undefined) {
    window.onload = run;
})(window, document, undefined);