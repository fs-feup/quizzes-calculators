function createCalculator(title, inputFields, calculateFunction) {
    const calculatorDiv = document.createElement('div');
    calculatorDiv.className = 'calculator';
    calculatorDiv.innerHTML = `<h2>${title}</h2>`;

    inputFields.forEach(field => {
        const input = document.createElement('input');
        input.type = 'number';
        input.id = field.id;
        input.placeholder = field.placeholder;
        calculatorDiv.appendChild(input);
    });

    const button = document.createElement('button');
    button.innerText = 'Calculate';
    button.onclick = () => {
        const result = calculateFunction(inputFields.map(field => parseFloat(document.getElementById(field.id).value)));
        const resultParagraph = document.createElement('p');
        resultParagraph.innerText = `Result: ${result}`;
        calculatorDiv.appendChild(resultParagraph);
    };
    
    calculatorDiv.appendChild(button);
    document.getElementById('calculator-container').appendChild(calculatorDiv);
}


const formulas = [
    {
        displayName: 'Calculate P team from P max',
        calculate: (pmax, final) => final * pmax / 70
    },
    {
        displayName: 'Calculate P max from P team',
        calculate: (pteam, final) => (70 * pteam) / final
    },
    {
        displayName: 'Calculate a third value, e.g., Final Points from P team and P max',
        calculate: (pteam, pmax) => (70 * (pteam / pmax))
    }
];

// Example of dynamic calculator
createCalculator('Formula Student Points Calculation',
    [
        { id: 'pteam', placeholder: 'P team - Score awarded to the team' },
        { id: 'pmax', placeholder: 'P max - Highest score of any non-finalist team' },
        //{ id: 'finalPoints', placeholder: 'Final Points (optional)' }
    ],
    formulas
);
