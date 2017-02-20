$(document).ready(function() {

  // ---INITIALIZATION--- //

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

  function divideNumbers(expression) {
    let indexOfOperator = expression.indexOf('÷');
    let firstNumber = expression.substring(0, indexOfOperator);
    let lastNumber = expression.substring(indexOfOperator + 1);
    let result = firstNumber / lastNumber;

    return result;
  }

  function evaluateExpression(expression, operator, action) {
    let indexOfOperator = expression.indexOf(operator);
    let firstNumber = expression.substring(0, indexOfOperator);
    let lastNumber = expression.substring(indexOfOperator + 1);

    return action(firstNumber, lastNumber);
  }

  function clearDisplay() {
    $('#screen').text("");
  }

  function updateDisplay() {
    let expression = ($('#screen').text());
    if (expression.includes('x')) {
      console.log('That expression was multiplication');
      let result = evaluateExpression(expression, 'x', multiply);
      ($('#screen')).text(result);
    }
    else if (expression.includes('÷')) {
      console.log('That expression was division');
      let result = evaluateExpression(expression, '÷', divide);
      ($('#screen')).text(result);
    }
    else if (expression.includes('+')) {
      console.log('That expression was addition');
      let result = evaluateExpression(expression, '+', add);
      ($('#screen')).text(result);
    }
    else if (expression.includes('-')) {
      console.log('That expression was subtraction');
      let result = evaluateExpression(expression, '-', subtract);
      ($('#screen')).text(result);
    }
    state = 'result';
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
      updateDisplay();
    }

    else if (target.tagName === 'SPAN') {
      if (state === 'result') {
        clearDisplay();
        state = 'input';
      }
      console.log('You clicked a', $(target).text());
      let currentNumbers = $('#screen').text();
      let newNumber = $(target).text();
      $('#screen').text(currentNumbers + newNumber);
    }
  })

  // function takeActionOn(person, action) {
  //   action(person)
  // }
  //
  // let adam = { name: 'Adam' };
  //
  // function sayHello(person) {
  //   console.log("Hello", person.name);
  // }
  //
  // function deleteFromDatabase(person) {
  //   // do the things
  // }
  //
  // takeActionOn(adam, sayHello);

})
