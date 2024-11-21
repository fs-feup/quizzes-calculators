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

const formulas_skidpad_manual = [
    {
        displayName: 'Calculate P team from P max',
        calculate: (tmax, final) => Math.sqrt((1.25 ** 2 * tmax ** 2) / ((0.5625 * ((final - 0.05 * Pmax_manual) / (0.95 * Pmax_manual)) + 1) / 1.25))
    },
    {
        displayName: 'Calculate P max from P team',
        calculate: (tteam, final) => Math.sqrt(((0.5625 * ((final - 0.05 * Pmax_manual) / (0.95 * Pmax_manual)) + 1) / 1.25 ** 2) * tteam ** 2)
    },
    {
        displayName: 'Calculate a third value, e.g., Final Points from P team and P max',
        calculate: (tteam, tmax) => 0.95 * Pmax_manual * ((tmax * 1.25 / tteam) ** 2 - 1) / 0.5625 + 0.05 * Pmax_manual
    }
];

const formulas_skidpad_dc = [
    {
        displayName: 'Calculate P team from P max',
        calculate: (tmax, final) => Math.sqrt((1.5 ** 2 * tmax ** 2) / ((1.25 * ((final - 0.05 * Pmax_dc) / (0.95 * Pmax_dc)) + 1) / 1.5))
    },
    {
        displayName: 'Calculate P max from P team',
        calculate: (tteam, final) => Math.sqrt(((1.25 * ((final - 0.05 * Pmax_dc) / (0.95 * Pmax_dc)) + 1) / 1.5 ** 2) * tteam ** 2)
    },
    {
        displayName: 'Calculate a third value, e.g., Final Points from P team and P max',
        calculate: (tteam, tmax) => 0.95 * Pmax_dc * ((tmax * 1.5 / tteam) ** 2 - 1) / 1.25 + 0.05 * Pmax_dc
    }
];

const formulas_velocity_equation = [
    {
        displayName: 'Calculate v from vi, a, and t',
        calculate: (vi, a, t) => vi + a * t
    },
    {
        displayName: 'Calculate vi from v, a, and t',
        calculate: (v, a, t) => v - a * t
    },
    {
        displayName: 'Calculate a from v, vi, and t',
        calculate: (v, vi, t) => (v - vi) / t
    },
    {
        displayName: 'Calculate t from v, vi, and a',
        calculate: (v, vi, a) => (v - vi) / a
    },
];

const formulas_positions_equation = [
    {
        displayName: 'Calculate x from xi, vi, a, and t',
        calculate: (xi, vi, a, t) => xi + vi * t + 0.5 * a * t ** 2
    },
    { 
        displayName: 'Calculate vi from x, xi, a, and t',
        calculate: (x, xi, a, t) => (x - xi - 0.5 * a * t ** 2) / t
    },
    {
        displayName: 'Calculate a from x, xi, vi, and t',
        calculate: (x, xi, vi, t) => (x - xi - vi * t) / (0.5 * t ** 2)
    },
    {
        displayName: 'Calculate t from x, xi, vi, and a',
        calculate: (x, xi, vi, a) => (-vi + Math.sqrt(vi ** 2 + 2 * a * (x - xi))) / a
    },
    {
        displayName: 'Calculate xi from x, vi, a, and t',
        calculate: (x, vi, a, t) => x - vi * t - 0.5 * a * t ** 2
    }
];

const formulas_velocity_squared = [
    {
        displayName: 'Calculate v from vi, a, x, and xi',
        calculate: (vi, a, x, xi) => Math.sqrt(vi ** 2 + 2 * a * (x - xi))
    },
    {
        displayName: 'Calculate vi from v, a, x, and xi',
        calculate: (v, a, x, xi) => Math.sqrt(v ** 2 - 2 * a * (x - xi))
    },
    {
        displayName: 'Calculate a from v, vi, x, and xi',
        calculate: (v, vi, x, xi) => (v ** 2 - vi ** 2) / (2 * (x - xi))
    },
    {
        displayName: 'Calculate x from v, vi, a, and xi',
        calculate: (v, vi, a, xi) => ((v ** 2 - vi ** 2) / (2 * a)) + xi
    },
    {
        displayName: 'Calculate xi from v, vi, a, and x',
        calculate: (v, vi, a, x) => x - ((v ** 2 - vi ** 2) / (2 * a))
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

createCalculator4('Velocity Equation', [
    { id: 'v', placeholder: 'v - Final Velocity' },
    { id: 'vi', placeholder: 'v0 - Initial Velocity' },
    { id: 'a', placeholder: 'a - Acceleration' },
    { id: 't', placeholder: 't - Time' },
],
    formulas_velocity_equation,
    '../assets/motion/velocity.png'
);

createCalculator5('Positions Equation', [
    { id: 'x', placeholder: 'x - Final Position' },
    { id: 'xi', placeholder: 'x0 - Initial Position' },
    { id: 'vi', placeholder: 'v0 - Initial Velocity' },
    { id: 'a', placeholder: 'a - Acceleration' },
    { id: 't', placeholder: 't - Time' },
],
    formulas_positions_equation,
    '../assets/motion/position.png'
);

createCalculator5('Velocity from Positions Equation', [
    { id: 'v', placeholder: 'v - Final Velocity' },
    { id: 'vi', placeholder: 'v0 - Initial Velocity' },
    { id: 'a', placeholder: 'a - Acceleration' },
    { id: 'x', placeholder: 'x - Final Position' },
    { id: 'xi', placeholder: 'x0 - Initial Position' },
],
    formulas_velocity_squared,
    '../assets/motion/velocity_positions.png'
);

