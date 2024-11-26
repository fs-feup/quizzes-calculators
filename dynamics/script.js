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
            const [, pmax, final] = inputValues; // Skip the first value
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

function createCalculator4(title, inputFields, formulas, imageUrl) {
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
            const [, b, c, d] = inputValues; // Skip the first value
            result = formulas[0].calculate(b, c, d);
            console.log(result);
        } else if (missingIndex === 1) {
            // Missing value for second input
            const [a, , c, d] = inputValues; // Skip the second value
            result = formulas[1].calculate(a, c, d);
            console.log(result);
        } else if (missingIndex === 2) {
            // Missing value for third input
            const [a, b, , d] = inputValues; // Skip the third value
            result = formulas[2].calculate(a, b, d);
            console.log(result);
        } else if (missingIndex === 3) {
            // Missing value for fourth input
            const [a, b, c] = inputValues.slice(0, 3); // Use only the first three values
            result = formulas[3].calculate(a, b, c);
            console.log(result);
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


function createCalculator5(title, inputFields, formulas, imageUrl) {
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
            const [, b, c, d, e] = inputValues; // Skip the first value
            result = formulas[0].calculate(b, c, d, e);
            console.log(result);
        } else if (missingIndex === 1) {
            // Missing value for second input
            const [a, , c, d, e] = inputValues; // Skip the second value
            result = formulas[1].calculate(a, c, d, e);
            console.log(result);
        } else if (missingIndex === 2) {
            // Missing value for third input
            const [a, b, , d, e] = inputValues; // Skip the third value
            result = formulas[2].calculate(a, b, d, e);
            console.log(result);
        } else if (missingIndex === 3) {
            // Missing value for fourth input
            const [a, b, c, , e] = inputValues; // Skip the fourth value
            result = formulas[3].calculate(a, b, c, e);
            console.log(result);
        } else if (missingIndex === 4) {
            // Missing value for fifth input
            const [a, b, c, d] = inputValues.slice(0, 4); // Use only the first four values
            result = formulas[4].calculate(a, b, c, d);
            console.log(result);
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

function generateFormulas(Pmax, denominator, factor, exp = 2) {
    return [
        {
            displayName: 'Calculate P team from P max',
            calculate: (tmax, final) => Math.sqrt(
                (factor**exp * tmax**exp) /
                ((denominator * ((final - 0.05 * Pmax) / (0.95 * Pmax)) + 1) / factor)
            )
        },
        {
            displayName: 'Calculate P max from P team',
            calculate: (tteam, final) => Math.sqrt(
                ((denominator * ((final - 0.05 * Pmax) / (0.95 * Pmax)) + 1) / factor**exp) *
                tteam**exp
            )
        },
        {
            displayName: 'Calculate Final Points from P team and P max',
            calculate: (tteam, tmax) => 
                0.95 * Pmax * ((tmax * factor / tteam)**exp - 1) / denominator + 0.05 * Pmax
        }
    ];
}

const formulas_skidpad_manual = generateFormulas(Pmax_manual, 0.5625, 1.25)

const formulas_skidpad_dc = generateFormulas(Pmax_dc, 1.25, 1.5)

const formulas_acceleration_manual = generateFormulas(50, 0.5, 1.5, 1)

const formulas_acceleration_dc = generateFormulas(75, 1, 2)

const formulas_skidpad_dv = [
    {
        displayName: 'Calculate R_DV with nALl and points',
        calculate: (nAll, points) => nAll + 1 + (points / 75) * nAll
    },
    {
        displayName: 'Calculate n_All with the R dv and points',
        calculate: (rDV, points) => (1 - rDV) / (points / 75 - 1)
    },
    {
        displayName: 'Calculate Points with N_all and R_dv',
        calculate: (rDV, nAll) => 75 * (nAll + 1 - rDV) / nAll
    }
]

createCalculator('Manual Skidpad',
    [
        { id: 'tteam', placeholder: 'T team - Team\'s best manual mode including penalties' },
        { id: 'tmax', placeholder: 'T max - Fastest manual mode vehicle including penalties.' },
        { id: 'finalPoints', placeholder: 'Final Points (optional)' }
    ],
    formulas_skidpad_manual,
    '../assets/skidpad/skidpad_score.png'
);

createCalculator('Driverless Skidpad',
    [
        {id: 'r_dv', placeholder: 'R DV -> Team\'s best autonomous time'},
        {id: 'n_all', placeholder: 'n_all -> Number of teams who have at least one valid manual or autonomous run'},
        {id: 'points', placeholder: 'Number of points got'}
    ],
    formulas_skidpad_dv,
    '../assets/skidpad/DV_Skidpad.png'
)

createCalculator('DC Skidpad',
    [
        { id: 'tteam1', placeholder: 'T team - Team\'s best manual mode including penalties' },
        { id: 'tmax1', placeholder: 'T max - Fastest manual mode vehicle including penalties.' },
        { id: 'finalPoints1', placeholder: 'Final Points (optional)' }
    ],
    formulas_skidpad_dc,
    '../assets/skidpad/skidpad_dc.png'
);


createCalculator('Manual Acceleration', 
    [
        { id: 'tteam2', placeholder: 'T team - Team\'s best manual mode including penalties' },
        { id: 'tmax2', placeholder: 'T max - Fastest manual mode vehicle including penalties.' },
        { id: 'finalPoints2', placeholder: 'Final Points (optional)' }
    ],
    formulas_acceleration_manual,
    '../assets/acceleration/m_acceleration.png'
);
