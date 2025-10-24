function createCalculator(title, inputFields, formulas, imageUrl) {
    const calculatorDiv = document.createElement('div');
    calculatorDiv.className = 'calculator';
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

    // Create input fields
    inputFields.forEach(field => {
        const input = document.createElement('input');
        const text = document.createElement('div');
        text.innerText = field.placeholder;
        input.type = 'number';
        input.id = field.id;
        input.placeholder = field.placeholder;
        calculatorDiv.appendChild(text);
        calculatorDiv.appendChild(input);
    });

    const button = document.createElement('button');
    button.innerText = 'Calculate';
    button.onclick = () => {
        // Get input values
        const inputValues = inputFields.map(field => {
            const value = document.getElementById(field.id).value.replace(',', '.');
            return parseFloat(value);
        });
        
        // Determine which value is missing
        let missingIndex = inputValues.findIndex(value => isNaN(value));
        
        let result;
        if (missingIndex === 0) {
            // Missing value for first input
            const [ , pmax, final] = inputValues; // Skip the first value
            result = formulas[0].calculate(pmax, final);
        } else if (missingIndex === 1) {
            // Missing value for second input
            const [pteam, , final] = inputValues; // Skip the second value
            result = formulas[1].calculate(pteam, final);
        } else if (missingIndex === 2) {
            // Missing value for third input
            const [pteam, pmax] = inputValues.slice(0, 2); // Use only the first two values
            result = formulas[2].calculate(pteam, pmax);
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

const formulas_austria = [
    {
        displayName: 'Calculate P team from P max',
        calculate: (pmax, final) => final * pmax / 71
    },
    {
        displayName: 'Calculate P max from P team',
        calculate: (pteam, final) => (71 * pteam) / final
    },
    {
        displayName: 'Calculate a third value, e.g., Final Points from P team and P max',
        calculate: (pteam, pmax) => (71 * (pteam / pmax))
    }
];


createCalculator('Non Finalist Business Plan Presentation Points', 
    [
        { id: 'pteam', placeholder: 'P team - Score awarded to the team' },
        { id: 'pmax', placeholder: 'P max - Highest score of any non-finalist team' },
        { id: 'finalPoints', placeholder: 'Final Score' }
    ],
    formulas,
    '../assets/bpp/bpp_score.png'
);


createCalculator('Non Finalist Business Plan Presentation Points Austria', 
    [
        { id: 'pteamAustria', placeholder: 'P team / your - Score awarded to the team' },
        { id: 'pmaxAustria', placeholder: 'P min-F - Lowest score of any finalist team' },
        { id: 'finalPointsAustria', placeholder: 'Final Score' }
    ],
    formulas_austria,
    '../assets/bpp/bpp_score_austria.png'
);
