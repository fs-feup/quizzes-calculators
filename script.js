function createCalculator(title, inputFields, formulas) {
    const calculatorDiv = document.createElement('div');
    calculatorDiv.className = 'calculator';
    calculatorDiv.innerHTML = `<h2>${title}</h2>`;

    // Create input fields
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
        // Get input values
        const inputValues = inputFields.map(field => parseFloat(document.getElementById(field.id).value));
        
        // Determine which value is missing
        let missingIndex = inputValues.findIndex(value => isNaN(value));
        
        // Calculate the result based on the missing index
        let result;
        if (missingIndex === 0) {
            // Missing value for first input
            const [pteam, pmax] = inputValues.slice(1); // Get pmax
            result = formulas[0].calculate(pteam, pmax); // Formula for first input missing
        } else if (missingIndex === 1) {
            // Missing value for second input
            const [pteam, pmax] = inputValues; // Get pteam
            result = formulas[1].calculate(pteam, pmax); // Formula for second input missing
        } else if (missingIndex === 2) {
            // Missing value for third input
            const [pteam, pmax] = inputValues.slice(0, 2); // Get pteam and pmax
            result = formulas[2].calculate(pteam, pmax); // Formula for third input missing
        } else {
            // All inputs provided, calculate final result if needed
            result = 'Please leave one input empty to calculate the missing value.';
        }
        
        // Check for existing result paragraph
        let resultParagraph = calculatorDiv.querySelector('.result');
        
        if (!resultParagraph) {
            resultParagraph = document.createElement('p');
            resultParagraph.className = 'result';
            calculatorDiv.appendChild(resultParagraph);
        }

        resultParagraph.innerText = `Result: ${result}`;
    };

    calculatorDiv.appendChild(button);
    document.getElementById('calculator-container').appendChild(calculatorDiv);
}

// Example usage:

// Define the formulas
const formulas = [
    {
        displayName: 'Calculate P team from P max',
        calculate: (pmax, final) => final * pmax / 70 // Example logic, modify as needed
    },
    {
        displayName: 'Calculate P max from P team',
        calculate: (pteam, final) => (70 * pteam) / final // Example logic, modify as needed
    },
    {
        displayName: 'Calculate a third value, e.g., Final Points from P team and P max',
        calculate: (pteam, pmax) => (70 * (pteam / pmax)) // Example logic
    }
];

// Create calculators for the required values
createCalculator('Non Finalist Business Plan Presentation Points', 
    [
        { id: 'pteam', placeholder: 'P team - Score awarded to the team' },
        { id: 'pmax', placeholder: 'P max - Highest score of any non-finalist team' },
        { id: 'finalPoints', placeholder: 'Final Points (optional)' } // Optional for the third value
    ],
    formulas
);

createCalculator('Cost and Manufacturing Points', 
    [
        { id: 'pteam2', placeholder: 'P team - Score awarded to the team' },
        { id: 'pmax2', placeholder: 'P max - Highest score of any non-finalist team' },
        { id: 'finalPoints2', placeholder: 'Final Points (optional)' } // Optional for the third value
    ],
    formulas
);
