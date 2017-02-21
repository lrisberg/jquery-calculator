$(document).ready(function() {
  // This calculator is mostly functional with the exception of one known bug
  // where pressing two operators sequentially displays "Error" concatenated by
  // the second operator. It should replace the first operator with the new
  // one. Bug resulted from not planning ahead for all the features I wanted to
  // add such that the current implementation isn't scalable for easily adding
  // new features. If I have time to do this over I'd probably rewrite this app
  // so that it evaluates expressions based on what button was pressed last
  // instead of evaluating expressions based on what is currently displayed in
  // the screen.

  // ---STATE--- //

  let state = 'input';

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
    return parseFloat(firstNumber) + parseFloat(secondNumber);
  }

  function subtract(firstNumber, secondNumber) {
    return parseFloat(firstNumber) - parseFloat(secondNumber);
  }

  function multiply(firstNumber, secondNumber) {
    return parseFloat(firstNumber) * parseFloat(secondNumber);
  }

  function divide(firstNumber, secondNumber) {
    return parseFloat(firstNumber) / parseFloat(secondNumber);
  }


  function checkIfOperatorIsOnScreen() {
    // Purpose: used to check if an operator is already on the screen.
    // If one operator is already there, pressing another operator will
    // evaluate the current expression and apply the second operator to
    // the result so that operators may be chained together without pressing =
    let expression = $('#screen').text();
    let operators = ['x', '÷', '+', '-'];
    for (let char of expression) {
      if (operators.includes(char)) {
        return true;
      }
    }

    return false;
  }

  // evaluates expression in number-(operator)-number format
  function evaluateExpression(expression, operator, action) {
    let firstNumber = expression.substring(0, expression.indexOf(operator));
    let lastNumber = expression.substring(expression.indexOf(operator) + 1);

    return action(firstNumber, lastNumber);
  }

  // decides which operator to use to evaluate the expression
  function discernOperator() {
    let expression = ($('#screen').text());
    if (expression.includes('x')) {
      expression = evaluateExpression(expression, 'x', multiply);
    }
    else if (expression.includes('÷')) {
      expression = evaluateExpression(expression, '÷', divide);

      // display error in case of divide by zero (aka NaN/Infinity)
      if (isNaN(expression) || expression === Infinity) {
        expression = 'Error';
        state = 'error';
      }
    }
    else if (expression.includes('+')) {
      expression = evaluateExpression(expression, '+', add);
    }
    else if (expression.includes('-')) {
      expression = evaluateExpression(expression, '-', subtract);
    }

    return expression;
  }

  function displayResult(result) {
    ($('#screen')).text(result);
  }

  // ---EVENTS--- //

  $('#buttons-container').click(function(event) {
    let target = event.target;

    if ($(target).text() === 'C') {
      clearDisplay();
      state = 'input';
    }

    else if ($(target).text() === '=') {
      displayResult(discernOperator());
      state = 'result';
    }

    else if (target.tagName === 'SPAN') {
      // allow concatenation of operators, but not numbers, to a result
      if (state === 'result' && $(target).hasClass('operator')) {
        concatToDisplay(target);
        state = 'input';
      }

      // begin new calculation on pressing a number after a result is displayed
      else if (state === 'result') {
        setDisplay(target);
        state = 'input';
      }

      else if (checkIfOperatorIsOnScreen() && $(target).hasClass('operator')) {
        displayResult(discernOperator());
        concatToDisplay(target);
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
