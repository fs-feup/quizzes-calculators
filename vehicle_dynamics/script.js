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
        if (missingIndex === -1) {
            result = formulas[0].calculate(...inputValues);
        } else {
            result = 'Please fill in all input fields.';
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
        displayName: 'Calculate V',
        calculate: (m, g, R, mu, p, Cl, A) => Math.sqrt((m * g) / ((1 / R) * (m / mu) - (0.5 * p * Cl * A)))
    }
];

createCalculator('Vehicle Dynamics Calculator',
    [
        { id: 'm', placeholder: 'Mass (m)' },
        { id: 'g', placeholder: 'Gravitational Acceleration (g)' },
        { id: 'R', placeholder: 'Radius (R)' },
        { id: 'mu', placeholder: 'Coefficient of Friction (μ)' },
        { id: 'p', placeholder: 'Air Density (ρ)' },
        { id: 'Cl', placeholder: 'Lift Coefficient (Cl)' },
        { id: 'A', placeholder: 'Cross-sectional Area (A)' }
    ],
    formulas_vehicle_dynamics,
    '../assets/vd/image.png'
);