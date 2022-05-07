# sherise-prusinski-p2
Project Description: Web based application for simple project/program and resource allocation at monthly resolution

Feature list: 
1. Add/Delete team
2. Add/Delete program/project
3. Add/Delete Resources with first name, last name, team name, availability status.
4. Able to allocate resource to a project/program for a particular month

Technical tasks:
1. Create functionality for user to provide details for team, resource, project/program
    a. Create an array to hold team details with an id and a name.
    b. Create an array to hold resource  details with an id , first name, last name, availability status.
    c. Create an array to hold program/project details with an id, and a name
2. Add Operations:
    a. Add an object of a program/project and populate respective data lists for Delete/Alloc operations
    b. Add an object of a team
    c. Add an object of a resource and populate respective data lists for Delete/Alloc operations
    d. Enable/disable appropriate user controls
3. Delete Operations:
    a. Find and delete an object of a program/project from Delete/Alloc datalists
    b. Find and delete an object of a team
    c. Find and delete an object of a resource from Delete/Alloc datalists
    d. Enable/disable appropriate user controls
4. Allocate Operation:
    a. Populate time period datalist at the start of application and setup
    b. Create an object entry in an array for each allocate operation to hold associated details like resource, program/project and month details/objects.
    c. Render a viewing table of the allocation of resource done.