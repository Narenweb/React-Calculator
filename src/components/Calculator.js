import React, { useState } from 'react';
import '../styles/Calculator.scss';

const Calculator = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const handleDigitClick = (digit) => {
        if (waitingForOperand) {
            setDisplayValue(String(digit));
            setWaitingForOperand(false);
        } else {
            setDisplayValue((prevValue) =>
                prevValue === '0' ? String(digit) : prevValue + digit
            );
        }
    };
    const handleOperatorClick = (nextOperator) => {
        if (operator && !waitingForOperand) {
            setOperator(nextOperator);
            return;
        }

        if (previousValue === null) {
            setPreviousValue(displayValue);
        } else if (operator) {
            const result = calculate(previousValue, displayValue, operator);
            setDisplayValue(String(result));
            setPreviousValue(String(result));
        }

        setWaitingForOperand(true);
        setOperator(nextOperator);

        // Update displayValue to include the operator
        setDisplayValue((prevValue) => prevValue + nextOperator);
    };


    const handleEqualsClick = () => {
        if (!operator || previousValue === null) {
            return;
        }

        const result = calculate(previousValue, displayValue, operator);

        setDisplayValue(String(result));
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(true);
    };

    const handleClearAll = () => {
        setDisplayValue('0');
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(false);
    };

    const handleDeleteLastCharacter = () => {
        const newValue = displayValue.slice(0, -1);
        setDisplayValue(newValue === '' ? '0' : newValue);
    };

    const calculate = (a, b, operator) => {
        a = parseFloat(a);
        b = parseFloat(b);

        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                if (b === 0) {
                    return 'Error';
                }
                return a / b;
            default:
                return 'Error';
        }
    };

    return (
        <div className="calculator">
            <h1 className="heading">Calculator</h1>
            <div className="display">{displayValue}</div>
            <div className="buttons">
                <div className="row">
                    <button onClick={handleClearAll}>AC</button>
                    <button onClick={handleDeleteLastCharacter}>DEL</button>
                </div>
                <div className="row">
                    <button onClick={() => handleDigitClick(7)}>7</button>
                    <button onClick={() => handleDigitClick(8)}>8</button>
                    <button onClick={() => handleDigitClick(9)}>9</button>
                    <button onClick={() => handleOperatorClick('+')}>+</button>
                </div>
                <div className="row">
                    <button onClick={() => handleDigitClick(4)}>4</button>
                    <button onClick={() => handleDigitClick(5)}>5</button>
                    <button onClick={() => handleDigitClick(6)}>6</button>
                    <button onClick={() => handleOperatorClick('-')}>-</button>
                </div>
                <div className="row">
                    <button onClick={() => handleDigitClick(1)}>1</button>
                    <button onClick={() => handleDigitClick(2)}>2</button>
                    <button onClick={() => handleDigitClick(3)}>3</button>
                    <button onClick={() => handleOperatorClick('*')}>*</button>
                </div>
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
