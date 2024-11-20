function createCalculator(title, inputFields, formulas, imageUrl) {
    const calculatorDiv = document.createElement('div');
    calculatorDiv.className = 'calculator';

    // Create title element
    const titleElement = document.createElement('h2');
    titleElement.innerText = title;
    calculatorDiv.appendChild(titleElement);

    if (imageUrl) {
        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = 'Calculator Image';
        image.className = 'calculator-image';
        calculatorDiv.appendChild(image);
    }

    // Create input fields with ids
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
        
        let result;
        if (missingIndex === 0) {
            // Missing value for first input
            const [ , pmax, final] = inputValues; // Skip the first value
            result = formulas[0].calculate(pmax, final);
            console.log(result)
        } else if (missingIndex === 1) {
            // Missing value for second input
            const [pteam, , final] = inputValues; // Skip the second value
            result = formulas[1].calculate(pteam, final);
            console.log(result)
        } else if (missingIndex === 2) {
            // Missing value for third input
            const [tteam, tmax] = inputValues.slice(0, 2); // Use only the first two values
            result = formulas[2].calculate(tteam, tmax);
            console.log(result)
        } else {
            result = 'Please leave one input empty to calculate the missing value.';
        }
        
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

const Pmax_manual = 50;
const Pmax_dc = 75;

const formulas_skidpad_manual = [
    {
        displayName: 'Calculate P team from P max',
        calculate: (tmax, final) => Math.sqrt((1.25**2 * tmax **2) / ((0.5625 * ((final - 0.05 * Pmax_manual)/(0.95*Pmax_manual)) + 1)/1.25))
    },
    {
        displayName: 'Calculate P max from P team',
        calculate: (tteam, final) => Math.sqrt(((0.5625 * ((final - 0.05 * Pmax_manual)/(0.95*Pmax_manual)) + 1)/1.25**2) * tteam **2)
    },
    {
        displayName: 'Calculate a third value, e.g., Final Points from P team and P max',
        calculate: (tteam, tmax) => 0.95 * Pmax_manual * ((tmax * 1.25 / tteam)**2 - 1) / 0.5625 + 0.05 * Pmax_manual
    }
];

const formulas_skidpad_dc = [
    {
        displayName: 'Calculate P team from P max',
        calculate: (tmax, final) => Math.sqrt((1.5**2 * tmax **2) / ((1.25 * ((final - 0.05 * Pmax_dc)/(0.95*Pmax_dc)) + 1)/1.5))
    },
    {
        displayName: 'Calculate P max from P team',
        calculate: (tteam, final) => Math.sqrt(((1.25 * ((final - 0.05 * Pmax_dc)/(0.95*Pmax_dc)) + 1)/1.5**2) * tteam **2)
    },
    {
        displayName: 'Calculate a third value, e.g., Final Points from P team and P max',
        calculate: (tteam, tmax) => 0.95 * Pmax_dc * ((tmax * 1.5 / tteam)**2 - 1) / 1.25 + 0.05 * Pmax_dc
    }
];

createCalculator('Manual Skidpad', 
    [
        { id: 'tteam', placeholder: 'T team - Team\'s best manual mode including penalties' },
        { id: 'tmax', placeholder: 'T max - Fastest manual mode vehicle including penalties.' },
        { id: 'finalPoints', placeholder: 'Final Points (optional)' }
    ],
    formulas_skidpad_manual,
    '../assets/skidpad/skidpad_score.png'
);

createCalculator('DC Skidpad', 
    [
        { id: 'tteam1', placeholder: 'T team - Team\'s best manual mode including penalties' },
        { id: 'tmax1', placeholder: 'T max - Fastest manual mode vehicle including penalties.' },
        { id: 'finalPoints1', placeholder: 'Final Points (optional)' }
    ],
    formulas_skidpad_dc,
    '../assets/skidpad/skidpad_dc.png'
);

