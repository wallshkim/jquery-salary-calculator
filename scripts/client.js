$(document).ready(readyNow);

let totalAnnualCosts = 0;
let totalMonthlyCosts = 0;

function readyNow() {
    // jQuery sourced correctly?
    console.log('in readyNow');
    // Create event listener for handleSubmitButton
    $('#submitButton').on('click', handleSubmitButton);
    // Create event listener for deleteButton
    $('#employeeTable').on('click', '.deleteButton', handleDeleteButton)
}

function handleSubmitButton() {
    // check handleSubmit being called correctly
    console.log('I was clicked!');
    // get input values and store in variables
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let employeeID = $('#employeeID').val();
    let employeeTitle = $('#employeeTitle').val();
    let annualSalary = Number($('#annualSalary').val());
    // Require all inputs to be filled in
    if (firstName && lastName && employeeID && employeeTitle && annualSalary) {
        // Append all inputs to table body on DOM
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
        // Add employee's annual salary to the totalAnnualCosts
        totalAnnualCosts += annualSalary;
        // make sure math is working
        console.log('Total Annual Costs: ', totalAnnualCosts);
        // Divide to get totalMonthlyCosts
        totalMonthlyCosts = totalAnnualCosts / 12;
        // make sure math is working
        console.log('Total Monthly Costs: ', totalMonthlyCosts);
        // put through displayMonthlyCostsUSD to get it on DOM in currency format
        displayTotalMonthlyCostsUSD();
        // clear all inputs
        $('#firstName').val('');
        $('#lastName').val('');
        $('#employeeID').val('');
        $('#employeeTitle').val('');
        $('#annualSalary').val('');
    }// end if all fields are entered
    else {
        alert('Please complete all fields');
    }// end else fields are blank
}// end handleSubmitButton

function displayTotalMonthlyCostsUSD() {
    // check function being called correctly
    console.log('in displayMonthlyCostsUSD');
    // change totalMonthlyCosts number into USD currency format -- found this Intl.NumberFormat on MDN web docs
    /* Parameters: 
        (1) locales argument: telling it to use American english 
        (2) style should be currency 
        (3) currency used should be USD*/
    let totalMonthlyCostsUSD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalMonthlyCosts);
    // make sure currency formatting is working
    console.log('Currency formatted: ', totalMonthlyCostsUSD);
    // display totalMonthlyCostsUSD on DOM
    $('#totalMonthlyOutput').text(totalMonthlyCostsUSD);
    // If the total monthly cost exceeds $20,000 add a red background
    if (totalMonthlyCosts > 20000) {
        console.log('Oh no! Went over 20000 in monthly costs!');
        $('#totalMonthlyOutput').css('background-color', 'red');
    }// end if exceeds 20000 then make red
    // If below or changes back to below then make transparent
    else {
        console.log('Yay! We are under 20000 in monthly costs');
        $('#totalMonthlyOutput').css('background-color', 'transparent');
    }// end else change to transparent
}// end displayTotalMonthlyCostsUSD

function handleDeleteButton() {
    // make sure function being called properly
    console.log('delete button was clicked!');
    // remove deleted employee row from table
    $(this).closest('tr').remove();
    // get annualSalary of deleted employee (parent is td and closest previous td has annual salary)
    let deletedAnnualSalary = Number($(this).parent().prev().text());
    // make sure it's getting the correct text
    console.log('Deleted Annual Salary: ', deletedAnnualSalary);
    // subtract deleted salary from totalAnnualCosts
    totalAnnualCosts -= deletedAnnualSalary;
    // Make sure math is working
    console.log('Total Annual Costs minus deleted annual salary: ', totalAnnualCosts);
    // convert to totalMonthly Costs
    totalMonthlyCosts = totalAnnualCosts/12;
    // make sure math is working
    console.log('totalMonthlyCosts after employee deletion:', totalMonthlyCosts);
    // display new totalMonthlyCosts on DOM
    displayTotalMonthlyCostsUSD();
}// end handleDeleteButton