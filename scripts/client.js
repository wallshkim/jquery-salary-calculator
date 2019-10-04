$(document).ready(readyNow);

function readyNow(){
    console.log('in readyNow');
    $('#submitButton').on('click', handleSubmitButton);
}

function handleSubmitButton () {
    console.log('I was clicked!');
    
}// end handleSubmitButton