import React, { useState, useEffect } from 'react';
import '../styles/Calculator.scss';
import CalculatorRow from './CalculatorRow'; // Import the CalculatorRow component

const Calculator = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);
    const [expression, setExpression] = useState('');

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const scrollToRight = () => {
        const display = document.querySelector('.display');
        if (display) {
            display.scrollLeft = display.scrollWidth - display.clientWidth;
        }
    };

    const handleDigitClick = (digit) => {
        setDisplayValue((prevText) => {
            const newText = prevText === '0' ? String(digit) : prevText + digit;
            scrollToRight();
            return newText;
        });
        setExpression((prevExpression) => prevExpression + digit);
    };

    const handleOperatorClick = (nextOperator) => {
        if (operator && !waitingForOperand) {
            const result = calculate(previousValue, displayValue, operator);
            setPreviousValue(String(result));
        } else {
            setPreviousValue(displayValue);
        }

        setOperator(nextOperator);
        setWaitingForOperand(true);

        setExpression((prevExpression) => prevExpression + nextOperator);

        scrollToRight();

        setDisplayValue('0');
    };

    const handleEqualsClick = () => {
        alert("pressed");
        if (expression === '') {
            return;
        }
        const expressionParts = expression.split(/([+\-*/])/g);
        const operands = [];
        const operators = [];

        expressionParts.forEach((part) => {
            if (['+', '-', '*', '/'].includes(part)) {
                operators.push(part);
            } else {
                operands.push(part);
            }
        });
        const result = calculate(operands, operators);
        setDisplayValue(String(result));
        setExpression('');
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(true);
        console.log('handleEqualsClick called');
    };

    const handleClearAll = () => {
        setDisplayValue('0');
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(false);
        setExpression('');
    };

    const handleDeleteLastCharacter = () => {
        const newValue = displayValue.slice(0, -1);
        setDisplayValue(newValue === '' ? '0' : newValue);

        setExpression((prevExpression) => prevExpression.slice(0, -1));
    };

    const handleKeyDown = (event) => {
        const key = event.key;
        console.log('Key pressed:', key);
        if (/[0-9]/.test(key)) {
            handleDigitClick(key);
        } else if (['+', '-', '*', '/', '='].includes(key)) {
            handleOperatorClick(key);
        } else if (key === 'Enter') {
            console.log('Enter key pressed');
            handleEqualsClick();
        } else if (key === 'Escape') {
            handleClearAll();
        } else if (key === 'Backspace') {
            handleDeleteLastCharacter();
        } else if (key === '.') {
            handleOperatorClick(key);
        }
    };

    const calculate = (operands, operators) => {
        const numbers = operands.map(parseFloat);

        let result = numbers[0];

        for (let i = 0; i < operators.length; i++) {
            const operator = operators[i];
            const nextNumber = numbers[i + 1];

            switch (operator) {
                case '+':
                    result += nextNumber;
                    break;
                case '-':
                    result -= nextNumber;
                    break;
                case '*':
                    result *= nextNumber;
                    break;
                case '/':
                    if (nextNumber === 0) {
                        return 'Error';
                    }
                    result /= nextNumber;
                    break;
                default:
                    return 'Error';
            }
        }

        return result;
    };

    const rows = [
        [
            { value: 'AC', onClick: handleClearAll },
            { value: 'DEL', onClick: handleDeleteLastCharacter },
        ],
        [
            { value: '7', onClick: handleDigitClick, args: 7 },
            { value: '8', onClick: handleDigitClick, args: 8 },
            { value: '9', onClick: handleDigitClick, args: 9 },
            { value: '+', onClick: handleOperatorClick, args: '+' },
        ],
        [
            { value: '4', onClick: handleDigitClick, args: 4 },
            { value: '5', onClick: handleDigitClick, args: 5 },
            { value: '6', onClick: handleDigitClick, args: 6 },
            { value: '-', onClick: handleDigitClick, args: '-' },
        ],
        [
            { value: '1', onClick: handleDigitClick, args: 1 },
            { value: '2', onClick: handleDigitClick, args: 2 },
            { value: '3', onClick: handleDigitClick, args: 3 },
            { value: '*', onClick: handleDigitClick, args: '*' },
        ],
    ];

    return (
        <div className="calculator">
            <h1 className="heading">Calculator</h1>
            <div className="display">{expression || displayValue}</div>
            <div className="buttons">
                {rows.map((row, index) => (
                    <CalculatorRow key={index} buttons={row} />
                ))}
                <div className="row">
                    <button onClick={() => handleDigitClick(0)}>0</button>
                    <button onClick={() => handleOperatorClick('.')}>.</button>
                    <button onClick={handleEqualsClick}>=</button>
                    <button onClick={() => handleOperatorClick('/')}>/</button>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
