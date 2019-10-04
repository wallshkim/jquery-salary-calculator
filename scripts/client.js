$(document).ready(readyNow);

let employees = [];

function readyNow(){
    console.log('in readyNow');
    $('#submitButton').on('click', handleSubmitButton);
}

function handleSubmitButton () {
    console.log('I was clicked!');
    // create empty object to store info
    let employeeInfo = {};
    // collect input values
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let employeeID = $('#employeeID').val();
    let employeeTitle = $('#employeeTitle').val();
    let annualSalary = $('#annualSalary').val();
    // store in employee object
    employeeInfo.firstName = firstName
    employeeInfo.lastName = lastName
    employeeInfo.employeeID = employeeID
    employeeInfo.employeeTitle = employeeTitle
    employeeInfo.annualSalary = annualSalary
    // check object
    console.log(employeeInfo);
    // push object into employees array
    employees.push(employeeInfo);
    // check array
    console.log(employees);
    // append
    // clear
}// end handleSubmitButton