$(document).ready(readyNow);

let employees = [];
let totalMonthlyCosts = 0;

function readyNow () {
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
        console.log('employeeInfo object', employeeInfo);
        // push object into employees array
        employees.push(employeeInfo);
        // check array
        console.log('employees array', employees);
        // append to DOM
        $('tbody').append(`
            <tr>
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${employeeID}</td>
                <td>${employeeTitle}</td>
                <td>${annualSalary}</td>
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
    $('#totalMonthlyOutput').text(Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalMonthlyCosts));
    //If the total monthly cost exceeds $20,000
    //add a red background color to the total monthly cost.
    if(totalMonthlyCosts > 20000){
        $('#totalMonthlyOutput').css('background-color', 'red');
    }// end if
    else{
        $('#totalMonthlyOutput').css('background-color', 'transparent');
    }
    //reset cost
    totalMonthlyCosts = 0;
}// end calculateMonthlyCosts