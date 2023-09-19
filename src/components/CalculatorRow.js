import React from 'react';

const CalculatorRow = ({ buttons }) => (
    <div className="row">
        {buttons.map((button) => (
            <button
                key={button.value}
                onClick={() => button.onClick(button.args)}
            >
                {button.value}
            </button>
        ))}
    </div>
);

export default CalculatorRow;
