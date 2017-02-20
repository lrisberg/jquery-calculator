$(document).ready(function() {

  // ---INITIALIZATION--- //

  // ---FUNCTIONS--- //

  function clearDisplay() {
    $('#screen').text("");
  }

  function evaluateExpression() {
    console.log('Function to be evaluated is:', $('#screen').text());
    if ($('#screen').text().includes('x')) {
      console.log('That expression is multiplication');
    }
  }

  // ---EVENTS--- //

  $('#buttons-container').click(function(event) {
    let target = event.target;

    if ($(target).text() === 'C') {
      console.log('You clicked the clear button');
      clearDisplay();
    }

    else if ($(target).text() === '=') {
      console.log('You clicked the equals button');
      evaluateExpression();
    }

    else if (target.tagName === 'SPAN') {
      console.log('You clicked a', $(target).text());
      let currentNumbers = $('#screen').text();
      let newNumber = $(target).text();
      $('#screen').text(currentNumbers + newNumber);
    }
  })

})
