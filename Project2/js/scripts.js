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

    var team = new Team(nextId, tname);
    var teamIndex = teams.findIndex((t) => t.name === tname);
    if(teamIndex < 0) {
        var teamListInputEl = document.getElementById('anr-tname-in');
        teamListInputEl.disabled = false;
        var teamListInputEl = document.getElementById('dat-tname-in');
        teamListInputEl.disabled = false;
        team.id = addOptionToDataList('anr-tname', tname);
        team.id = addOptionToDataList('dat-tname', tname);
        teams.push(team);
        ++nextId;
    }
    else {
        alert(tname + ' already exists!');
    }
}

function addProgramProject(event) {
    var pname = document.getElementById('anp-pname').value;

    var progproj = new ProgramProject(nextId, pname);
    progprojs.push(progproj);
    ++nextId;
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
}

function setUp() {
    var team = new Team(nextId, "None");
    teams.push(team);

    document.getElementById('add-resource').onclick = addResource;
    document.getElementById('add-team').onclick = addTeam;
    document.getElementById('add-progproj').onclick = addProgramProject;
    document.getElementById('delete-team').onclick = deleteTeam;
}

function run() {
    setUp();
}

(function (window, document, undefined) {
    window.onload = run;
})(window, document, undefined);