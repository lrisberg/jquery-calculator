$(document).ready(function() {
  // ---STATE--- //

  let state = 'input';

  // ---FUNCTIONS--- //

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

  function evaluateExpression(expression, operator, action) {
    let firstNumber = expression.substring(0, expression.indexOf(operator));
    let lastNumber = expression.substring(expression.indexOf(operator) + 1);

    return action(firstNumber, lastNumber);
  }

  function clearDisplay() {
    $('#screen').text("");
  }

  function displayResult() {
    state = 'result';
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
      console.log(result);
    }
    else if (expression.includes('-')) {
      let result = evaluateExpression(expression, '-', subtract);
      ($('#screen')).text(result);
    }
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
      if (state === 'result' && $(target).hasClass('operator')) {
        state = 'input';
        let currentNumbers = $('#screen').text();
        let newNumber = $(target).text();
        $('#screen').text(currentNumbers + newNumber);
      }
      else if (state === 'result') {
        clearDisplay();
        state = 'input';
        $('#screen').text($(target).text());
      }
      else if (state === 'input') {
        let currentNumbers = $('#screen').text();
        let newNumber = $(target).text();
        $('#screen').text(currentNumbers + newNumber);
      }
    }
  })
})
