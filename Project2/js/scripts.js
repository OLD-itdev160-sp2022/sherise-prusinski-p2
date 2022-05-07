// Data, classes, and utility functions
var resources = [];
var teams = [];
var progprojs= [];
var allocations = [];
var nextId = 1;
var months = [ "January", "February", "March", "April", "May", "June", 
                "July", "August", "September", "October", "November", "December" ];

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
        this.toString = function() {
            return "Team: "+ this.tName + ", First Name : " + this.fName + ", Last Name : " + this.lName;
        }
    }
}

class Allocation {
    constructor(id,progproj, resource, month) {
        this.id = id;
        this.progproj = progproj;
        this.resource = resource;
        this.month = month;
    }
}

function getLength(arr) {
    return Object.keys(arr).length;
}

//Add operations
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
    var teamIndex = -1;
    if(getLength(teams) > 0) {
        teamIndex = teams.findIndex((t) => t !== undefined && t.name === tname);
    }
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
    var progprojIndex = -1;
    if(progprojIndex > 0) {
        progprojIndex = progprojs.findIndex((p) => p !== undefined && p.name === pname);
    }
    if(progprojIndex < 0) {
        document.getElementById('dap-pname-in').disabled = false;
        document.getElementById('aap-pname-in').disabled = false;
        var pid = addOptionToDataList('dap-pname', pname);
        pid = addOptionToDataList('aap-pname', pname);
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
    var resourceIndex = -1;
    var rname = resource.toString();
    if(getLength(resources) > 0) {
        resourceIndex = resources.findIndex((r) => r !== undefined && r.toString() === rname);
    }
    if(resourceIndex < 0) {
        document.getElementById('dar-rname-in').disabled = false;
        document.getElementById('aar-rname-in').disabled = false;
        resource.id = addOptionToDataList('dar-rname', rname);
        resource.id = addOptionToDataList('aar-rname', rname);
        resources.push(resource);
        ++nextId;
    }
    else {
        alert(rname + ' already exists!');
    }
}

//Delete operations
function deleteTeam(event) {
    var tname = document.getElementById('dat-tname-in').value;
    var deleteIndex = -1;
    if(getLength(teams) > 0) {
        deleteIndex = teams.findIndex((t) => t !== undefined && t.name === tname);
    }
    if(deleteIndex > -1) {
        var deleteEls = document.querySelectorAll("#" + teams[deleteIndex].id);
        deleteEls.forEach((delEl)=>delEl.remove());
        delete teams[deleteIndex];
        if(getLength(teams) <= 1) {
            document.getElementById('anr-tname-in').disabled = true;
            document.getElementById('anr-tname-in').value = "";
            document.getElementById('dat-tname-in').disabled = true;
            document.getElementById('dat-tname-in').value = "";
        }
    }
}

function deleteProgramProject(event) {
    var pname = document.getElementById('dap-pname-in').value;
    var deleteIndex = -1;
    if(getLength(progprojs) > 0) {
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
        }
    }
}

function deleteResource(event) {
    var rname = document.getElementById('dar-rname-in').value;
    var deleteIndex = -1;
    if(getLength(resources) > 0) {
        deleteIndex = resources.findIndex((r) => r !== undefined && r.toString() === rname);
    }
    if(deleteIndex > -1) {
        var deleteEls = document.querySelectorAll("#" + resources[deleteIndex].id);
        deleteEls.forEach((delEl)=> delEl.remove());
        if(getLength(resources) <= 1) {
            document.getElementById('dar-rname-in').value = "";
            document.getElementById('dar-rname-in').disabled = true;
            document.getElementById('aar-rname-in').value = "";
            document.getElementById('aar-rname-in').disabled = true;
        }
        delete resources[deleteIndex];
    }
}

function createTableDataElem(value) {
    var elem = document.createElement('td');
    elem.className = "alloc_table_td";
    var textElem= document.createTextNode(value);
    elem.appendChild(textElem);
    return elem;
}

function allocate(event) {
    var rname = document.getElementById('aar-rname-in').value;
    var month = document.getElementById('aam-mname-in').value;
    var resource = undefined;

    if(month === "") {
        alert("Select a month from the list");
        return;
    }

    if(getLength(resources) > 0) {
        resource = resources.find((r) => r !== undefined && r.toString() === rname);
    }
    if(resource !== undefined) {
        var pname = document.getElementById('aap-pname-in').value;
        var progproj = undefined;
        if(getLength(progprojs) > 0) {
            progproj = progprojs.find((p) => p !== undefined && p.name === pname);
        }
        if(resource !== undefined) {
            var allocateObj = new Allocation(nextId, progproj, resource,month);
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
        else{
            alert("Non recoverable error occured during allocation operation!");
        }
    }
    else{
        alert("Non recoverable error occured during allocation operation!");
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