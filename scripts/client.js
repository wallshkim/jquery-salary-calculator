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
    // Only store if all input fields are entered
    if(firstName && lastName && employeeID && employeeTitle && annualSalary){
        console.log('yay all fields entered');
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
        // append to DOM
        $('tbody').append(`
            <tr>
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${employeeID}</td>
                <td>${employeeTitle}</td>
                <td>${annualSalary}</td>
                <button class="deleteButton">Delete</button>
            </tr>
        `)
    }// end if all fields are entered
    else{
        alert('Please complete all fields');
    }// end else fields are blank
    // clear inputs
    $('#firstName').val('');
    $('#lastName').val('');
    $('#employeeID').val('');
    $('#employeeTitle').val('');
    $('#annualSalary').val('');
}// end handleSubmitButton