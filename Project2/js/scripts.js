var resources = [];
var teams = [];
var nextId = 1;

function Team(id, name) {
    this.id = id;
    this.name = name;
}

function Resource(id, fName, lName, tName, status) {
    this.id = id;
    this.fName = fName;
    this.lName = lName;
    this.tName = tName;
    this.status = status;
}

function addTeam(event) {
    var tname = document.getElementById('ant-tname').value;

    var team = new Team(nextId, tname);
    teams.push(team);
    nextId++;
}

function addResource(event) {
    var firstName = document.getElementById('anr-fname').value;
    var lastName = document.getElementById('anr-lname').value;
    var teamName = document.getElementById('anr-tname-in').value;
    var status = document.getElementById('anr-status-in').value;

    var resource = new Resource(nextId, firstName, lastName, teamName, status);
    resources.push(resource);
    nextId++;
}

function setUp() {
    document.getElementById('add-resource').onclick = addResource;
    document.getElementById('add-team').onclick = addTeam;
    anrTeamsListEl = document.getElementById('anr-tname');
}

function run() {
    setUp();
}

(function (window, document, undefined) {
    window.onload = run;
})(window, document, undefined);