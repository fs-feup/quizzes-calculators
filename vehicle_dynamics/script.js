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

        let result;
        if (missingIndex === 0) {
            const [, g, R, mu, Cl, A, V] = inputValues;
            result = 'This formula cannot be used to calculate the mass.';
        } else if (missingIndex === 1) {
            const [m, , R, mu, Cl, A, V] = inputValues;
            result = 'This formula cannot be used to calculate the gravity acceleration.';
        } else if (missingIndex === 2) {
            const [m, g, , mu, Cl, A, V] = inputValues;
            result = formulas[0].calculate(m, g, mu, Cl, A, V);
        } else if (missingIndex === 3) {
            const [m, g, R, , Cl, A, V] = inputValues;
            result = formulas[1].calculate(m, g, R, Cl, A, V);
        } else if (missingIndex === 4) {
            const [m, g, R, mu, , A, V] = inputValues;
            result = formulas[2].calculate(m, g, R, mu, A, V);
        } else if (missingIndex === 5) {
            const [m, g, R, mu, Cl, , V] = inputValues;
            result = formulas[3].calculate(m, g, R, mu, Cl, V);
        } else if (missingIndex === 6) {
            const [m, g, R, mu, Cl, A, ] = inputValues;
            result = formulas[4].calculate(m, g, R, mu, Cl, A);
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

const formulas_vehicle_dynamics = [
    {
        displayName: 'Calculate R',
        calculate: (m, g, mu, Cl, A, V) => m / (mu * (m * g / V**2 + 0.5 * 1.204 * Cl * A))
    },
    {
        displayName: 'Calculate mu',
        calculate: (m, g, R, Cl, A, V) => m / (R * (m * g / V**2 + 0.5 * 1.204 * Cl * A))
    },
    {
        displayName: 'Calculate Cl',
        calculate: (m, g, R, mu, A, V) => 2 / (1.204 * A) * (m / (R * mu) - m * g / V**2)
    },
    {
        displayName: 'Calculate A',
        calculate: (m, g, R, mu, Cl, V) => 2 / (1.204 * Cl) * (m / (R * mu) - m * g / V**2)
    },
    {
        displayName: 'Calculate V',
        calculate: (m, g, R, mu, Cl, A) => Math.sqrt((m * g) / ((1 / R) * (m / mu) - (0.5 * 1.204 * Cl * A)))
    }
];

createCalculator('Curving Problem',
    [
        { id: 'm', placeholder: 'Mass (m)' },
        { id: 'g', placeholder: 'Gravitational Acceleration (g)' },
        { id: 'R', placeholder: 'Radius (R)' },
        { id: 'mu', placeholder: 'Coefficient of Friction (μ)' },
        { id: 'Cl', placeholder: 'Lift Coefficient (Cl)' },
        { id: 'A', placeholder: 'Cross-sectional Area (A)' },
        { id: 'V', placeholder: 'Velocity (V)' }
    ],
    formulas_vehicle_dynamics,
    '../assets/vd/image.png'
);