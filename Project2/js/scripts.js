// Data, classes, and utility functions
var resources = [];
var teams = [];
var progprojs = [];
var allocations = [];
var nextId = 1;
var months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

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
        this.toString = function () {
            return "Team: " + this.tName + ", First Name : " + this.fName + ", Last Name : " + this.lName;
        }
    }
}

class Allocation {
    constructor(id, progproj, resource, month) {
        this.id = id;
        this.progproj = progproj;
        this.resource = resource;
        this.month = month;
    }
}

function getLength(arr) {
    return Object.keys(arr).length;
}

function checkAllocateOpAvailable() {
    document.getElementById('allocate').disabled = 
        !(document.getElementById('aar-rname-in').disabled === false &&
          document.getElementById('aap-pname-in').disabled === false);
}

//Add operations
function addOptionToDataList(elementName, optionName) {

    var dataListEl = document.getElementById(elementName);
    var fragment = document.createDocumentFragment();

    var optionEl = document.createElement('option');
    var optionTextEl = document.createTextNode(optionName);
    optionEl.id = 'option' + nextId;
    optionEl.value = optionName;
    optionEl.appendChild(optionTextEl);
    fragment.appendChild(optionEl);
    dataListEl.appendChild(fragment);
    return optionEl.id;
}

function addTeam(event) {
    var tname = document.getElementById('ant-tname').value;
    
    if (tname === "") {
        alert("Add Opertions : Enter team name!");
        return;
    }

    var teamIndex = -1;
    if (getLength(teams) > 0) {
        teamIndex = teams.findIndex((t) => t !== undefined && t.name === tname);
    }
    if (teamIndex < 0) {
        document.getElementById('anr-tname-in').disabled = false;
        document.getElementById('dat-tname-in').disabled = false;
        document.getElementById('dap-pname-in').disabled = false;
        document.getElementById('delete-team').disabled = false;
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
    
    if (pname === "") {
        alert("Add Opertions : Enter program/project name!");
        return;
    }

    var progprojIndex = -1;
    if (getLength(progprojs) > 0) {
        progprojIndex = progprojs.findIndex((p) => p !== undefined && p.name === pname);
    }
    if (progprojIndex < 0) {
        document.getElementById('dap-pname-in').disabled = false;
        document.getElementById('aap-pname-in').disabled = false;
        document.getElementById('delete-progproj').disabled = false;
        var pid = addOptionToDataList('dap-pname', pname);
        pid = addOptionToDataList('aap-pname', pname);
        var progproj = new ProgramProject(pid, pname);
        progprojs.push(progproj);
        ++nextId;
        checkAllocateOpAvailable();
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

    if (firstName === "") {
        alert("Add Opertions : Enter First Name for resource!");
        return;
    }
    if (lastName === "") {
        alert("Add Opertions : Enter Last Name for resource!");
        return;
    }
    if (teamName === "") {
        alert("Add Opertions : Select or enter Team Name for resource!");
        return;
    }
    if (status === "") {
        alert("Add Opertions : Select or enter Status for resource!");
        return;
    }

    var resource = new Resource(nextId, firstName, lastName, teamName, status);
    var resourceIndex = -1;
    var rname = resource.toString();
    if (getLength(resources) > 0) {
        resourceIndex = resources.findIndex((r) => r !== undefined && r.toString() === rname);
    }
    if (resourceIndex < 0) {
        document.getElementById('dar-rname-in').disabled = false;
        document.getElementById('aar-rname-in').disabled = false;
        document.getElementById('delete-resource').disabled = false;
        resource.id = addOptionToDataList('dar-rname', rname);
        resource.id = addOptionToDataList('aar-rname', rname);
        resources.push(resource);
        ++nextId;
        checkAllocateOpAvailable();
    }
    else {
        alert(rname + ' already exists!');
    }
}

//Delete operations
function deleteTeam(event) {
    var tname = document.getElementById('dat-tname-in').value;

    if (tname === "") {
        alert("Delete Opertions : Select or enter a team");
        return;
    }

    var deleteIndex = -1;
    if (getLength(teams) > 0) {
        deleteIndex = teams.findIndex((t) => t !== undefined && t.name === tname);
    }
    if (deleteIndex > -1) {
        var deleteEls = document.querySelectorAll("#" + teams[deleteIndex].id);
        deleteEls.forEach((delEl) => delEl.remove());
        delete teams[deleteIndex];
        if (getLength(teams) <= 1) {
            document.getElementById('anr-tname-in').disabled = true;
            document.getElementById('anr-tname-in').value = "";
            document.getElementById('dat-tname-in').disabled = true;
            document.getElementById('dat-tname-in').value = "";
            document.getElementById('delete-team').disabled = true;
        }
    }
}

function deleteProgramProject(event) {
    var pname = document.getElementById('dap-pname-in').value;

    if (pname === "") {
        alert("Delete Opertions : Select or enter a program/project");
        return;
    }

    var deleteIndex = -1;
    if (getLength(progprojs) > 0) {
        deleteIndex = progprojs.findIndex((p) => p !== undefined && p.name === pname);
    }
    if (deleteIndex > -1) {
        var deleteEls = document.querySelectorAll("#" + progprojs[deleteIndex].id);
        deleteEls.forEach((delEl) => delEl.remove());
        delete progprojs[deleteIndex];
        if (getLength(progprojs) <= 1) {
            document.getElementById('dap-pname-in').value = "";
            document.getElementById('dap-pname-in').disabled = true;
            document.getElementById('aap-pname-in').value = "";
            document.getElementById('aap-pname-in').disabled = true;
            document.getElementById('delete-progproj').disabled = true;
            checkAllocateOpAvailable();
        }
    }
}

function deleteResource(event) {
    var rname = document.getElementById('dar-rname-in').value;

    if (rname === "") {
        alert("Delete Opertions : Select or enter a resource!");
        return;
    }

    var deleteIndex = -1;
    if (getLength(resources) > 0) {
        deleteIndex = resources.findIndex((r) => r !== undefined && r.toString() === rname);
    }
    if (deleteIndex > -1) {
        var deleteEls = document.querySelectorAll("#" + resources[deleteIndex].id);
        deleteEls.forEach((delEl) => delEl.remove());
        if (getLength(resources) <= 1) {
            document.getElementById('dar-rname-in').value = "";
            document.getElementById('dar-rname-in').disabled = true;
            document.getElementById('aar-rname-in').value = "";
            document.getElementById('aar-rname-in').disabled = true;
            document.getElementById('delete-resource').disabled = true;
            checkAllocateOpAvailable();
        }
        delete resources[deleteIndex];
    }
}

function createTableDataElem(value) {
    var elem = document.createElement('td');
    elem.className = "alloc_table_td";
    var textElem = document.createTextNode(value);
    elem.appendChild(textElem);
    return elem;
}

function allocate(event) {
    var rname = document.getElementById('aar-rname-in').value;
    var month = document.getElementById('aam-mname-in').value;
    var pname = document.getElementById('aap-pname-in').value;
    var resource = undefined;

    if (month === "") {
        alert("Allocate Opertions : Select or enter a month!");
        return;
    }
    if (rname === "") {
        alert("Allocate Opertions : Select or enter a resource!");
        return;
    }
    if (pname === "") {
        alert("Allocate Opertions : Select or enter a program/project");
        return;
    }

    if (getLength(resources) > 0) {
        resource = resources.find((r) => r !== undefined && r.toString() === rname);
    }
    if (resource !== undefined) {
        var progproj = undefined;
        if (getLength(progprojs) > 0) {
            progproj = progprojs.find((p) => p !== undefined && p.name === pname);
        }
        if (resource !== undefined) {
            var allocateObj = new Allocation(nextId, progproj, resource, month);
            allocations.push(allocateObj);
            ++nextId;
            document.getElementById('allocation-table').hidden = false;
            var allocTableEl = document.getElementById('allocation-table-body');
            var allocTableRowEl = document.createElement('tr');
            allocTableRowEl.id = "tr" + allocateObj.id;

            var allocTableDataResourceNameEl = createTableDataElem(resource.toString());
            var allocTableDataProgProjNameEl = createTableDataElem(progproj.name);
            var allocTableTimePeriodNameEl = createTableDataElem(month);

            allocTableRowEl.appendChild(allocTableDataResourceNameEl);
            allocTableRowEl.appendChild(allocTableDataProgProjNameEl);
            allocTableRowEl.appendChild(allocTableTimePeriodNameEl);
            allocTableEl.appendChild(allocTableRowEl);
        }
        else {
            alert("Allocate Opertions : Non-recoverable error occured during allocation operation!");
        }
    }
    else {
        alert("Allocate Opertions : Non-recoverable error occured during allocation operation!");
    }
}

function setUp() {
    var team = new Team(nextId, "None");
    teams.push(team);

    var progproj = new ProgramProject(nextId, "None");
    progprojs.push(progproj);

    months.forEach((month) => {
        month !== undefined && addOptionToDataList("aam-mname", month);
    });

    allocateEnabled = false;

    document.getElementById('add-team').onclick = addTeam;
    document.getElementById('add-progproj').onclick = addProgramProject;
    document.getElementById('add-resource').onclick = addResource;
    document.getElementById('delete-team').onclick = deleteTeam;
    document.getElementById('delete-progproj').onclick = deleteProgramProject;
    document.getElementById('delete-resource').onclick = deleteResource;
    document.getElementById('allocate').onclick = allocate;
}

function run() {
    setUp();
}

(function (window, document, undefined) {
    window.onload = run;
})(window, document, undefined);