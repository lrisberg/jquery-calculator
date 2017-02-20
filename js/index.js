$(document).ready(function() {
  // ---STATE--- //

  let state = 'input';

  // ---FUNCTIONS--- //

  function add(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
  }

  function subtract(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
  }

  function multiply(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
  }

  function divide(firstNumber, secondNumber) {
    return firstNumber / secondNumber;
  }

  function evaluateExpression(expression, operator, action) {
    let firstNumber = expression.substring(0, expression.indexOf(operator));
    let lastNumber = expression.substring(expression.indexOf(operator) + 1);

    return action(firstNumber, lastNumber);
  }

  function clearDisplay() {
    $('#screen').text("");
  }

  function displayResult() {
    let expression = ($('#screen').text());
    if (expression.includes('x')) {
      let result = evaluateExpression(expression, 'x', multiply);
      ($('#screen')).text(result);
    }
    else if (expression.includes('÷')) {
      let result = evaluateExpression(expression, '÷', divide);
      ($('#screen')).text(result);
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
      if (state === 'result' && !$(target).hasClass('operator')) {
        clearDisplay();
        state = 'input';
      }
      state = 'input';
      let currentNumbers = $('#screen').text();
      let newNumber = $(target).text();
      $('#screen').text(currentNumbers + newNumber);
    }
  })
})
