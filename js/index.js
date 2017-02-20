$(document).ready(function() {
  // ---STATE--- //

  let state = 'input';
  let operator = '';

  // ---FUNCTIONS--- //

  function clearDisplay() {
    $('#screen').text("");
  }

  function concatToDisplay(target) {
    let currentNumbers = $('#screen').text();
    let newNumber = $(target).text();
    $('#screen').text(currentNumbers + newNumber);
  }

  function setDisplay(target) {
    $('#screen').text($(target).text());
  }

  function displayError() {
    ($('#screen')).text('Error');
    state = 'error';
  }

  function add(firstNumber, secondNumber) {
    return parseInt(firstNumber) + parseInt(secondNumber);
  }

  function subtract(firstNumber, secondNumber) {
    return parseInt(firstNumber) - parseInt(secondNumber);
  }

  function multiply(firstNumber, secondNumber) {
    return parseInt(firstNumber) * parseInt(secondNumber);
  }

  function divide(firstNumber, secondNumber) {
    return parseInt(firstNumber) / parseInt(secondNumber);
  }

  function checkFormat(expression) {
    // returns 'invalid' if expression has more than one operator
    let operators = ['x', '÷', '+', '-']
    let count = 0;
    for (let char of expression) {
      if (operators.includes(char)) {
        count += 1;
      }
    }
    if (count > 1) {
      return 'invalid';
    }
    else {
      return 'valid';
    }
  }

  function evaluateExpression(expression, operator, action) {
    let firstNumber = expression.substring(0, expression.indexOf(operator));
    let lastNumber = expression.substring(expression.indexOf(operator) + 1);

    return action(firstNumber, lastNumber);
  }

  function displayResult() {
    let expression = ($('#screen').text());
    if (checkFormat(expression) === 'invalid') {
      displayError();

      return;
    }
    else if (expression.includes('x')) {
      let result = evaluateExpression(expression, 'x', multiply);
      ($('#screen')).text(result);
    }
    else if (expression.includes('÷')) {
      let result = evaluateExpression(expression, '÷', divide);

      // display error in case of divide by zero (aka NaN)
      if (isNaN(result) || result === Infinity) {
        displayError();

        return;
      }
      else {
        ($('#screen')).text(result);
      }
    }
    else if (expression.includes('+')) {
      let result = evaluateExpression(expression, '+', add);
      ($('#screen')).text(result);
    }
    else if (expression.includes('-')) {
      let result = evaluateExpression(expression, '-', subtract);
      ($('#screen')).text(result);
    }
    state = 'result';
  }

  // ---EVENTS--- //

  $('#buttons-container').click(function(event) {
    let target = event.target;

    if ($(target).text() === 'C') {
      clearDisplay();
    }

    else if ($(target).text() === '=') {
      displayResult();
    }

    else if (target.tagName === 'SPAN') {
      // allow concatenation of operators, but not numbers, to a result
      if (state === 'result' && $(target).hasClass('operator')) {
        concatToDisplay(target);
        state = 'input';
      }

      // begin new calculation after a result is displayed
      else if (state === 'result') {
        setDisplay(target);
        state = 'input';
      }

      // add number or operator to expression normally
      else if (state === 'input') {
        concatToDisplay(target);
      }

      // begin new calculation after error is displayed
      else if (state === 'error') {
        setDisplay(target);
        state = 'input';
      }
    }
  })
})
