$(document).ready(readyNow);

let employees = [];
let totalMonthlyCosts = 0;

function readyNow () {
    console.log('in readyNow');
    // Create event listener for handleSubmitButton
    $('#submitButton').on('click', handleSubmitButton);
    // Create event listener for deleteButton
    $('tbody').on('click', '.deleteButton', handleDelete)
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
        console.log('employeeInfo object', employeeInfo);
        // push object into employees array
        employees.push(employeeInfo);
        // check array
        console.log('employees array', employees);
        // append to DOM
        $('tbody').append(`
            <tr id="newEmployeeOutput">
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${employeeID}</td>
                <td>${employeeTitle}</td>
                <td class"annualSalaryOutput">${annualSalary}</td>
                <td><button class="deleteButton">Delete</button></td>
            </tr>
        `)
        // call function
        calculateMonthlyCosts();
        // clear inputs
        $('#firstName').val('');
        $('#lastName').val('');
        $('#employeeID').val('');
        $('#employeeTitle').val('');
        $('#annualSalary').val('');
    }// end if all fields are entered
    else{
        alert('Please complete all fields');
    }// end else fields are blank
}// end handleSubmitButton

function calculateMonthlyCosts () {
    console.log('employees array', employees);
    // loop through employees array for each salary
    for(employee of employees){
        let employeeMonthlySalary = (employee.annualSalary)/12;
        totalMonthlyCosts += employeeMonthlySalary;
        console.log('totalMonthlyCost is:', totalMonthlyCosts);
        console.log('employeeMonthlySalary', (employee.annualSalary) / 12);
    }// end for
    // replace output on DOM with new number in currency format -- found this Intl.NumberFormat on MDN web docs
    let totalMonthlyUSD = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalMonthlyCosts)
    $('#totalMonthlyOutput').text(totalMonthlyUSD);
    //If the total monthly cost exceeds $20,000
    //add a red background color to the total monthly cost.
    if(totalMonthlyCosts > 20000){
        $('#totalMonthlyOutput').css('background-color', 'red');
    }// end if
    else{
        $('#totalMonthlyOutput').css('background-color', 'transparent');
    }// end else
    //reset cost
    totalMonthlyCosts = 0;
}// end calculateMonthlyCosts

function handleDelete(){
    console.log('Delete Button was clicked!');
    // removes employee from DOM when delete button is clicked
    $(this).closest('tr').remove();
    // Once employee deleted, update totalMonthlyCost
    // get annualSalary of this employee
    let thisAnnualSalary = Number($(this).parent().prev().text());
    console.log(thisAnnualSalary);
    // get totalMonthlyCosts from DOM
    totalMonthlyCosts = Number($('#totalMonthlyOutput').text());
    console.log('totalMonthlyCosts from DOM', totalMonthlyCosts);
    // subtract from totalMonthlyCosts
    totalMonthlyCosts -= (thisAnnualSalary/12);
    console.log('totalMonthlyCosts minus employeeMonthlyCosts', totalMonthlyCosts);
    // replace output on DOM with new number
    $('#totalMonthlyOutput').text(Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalMonthlyCosts));
    // also remove employeeInfo object from array
}