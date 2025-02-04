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
        const inputValues = inputFields.map(field => parseFloat(document.getElementById(field.id).value));

        // Determine which value is missing
        let missingIndex = inputValues.findIndex(value => isNaN(value));

        let result;
        if (missingIndex === 0) {
            const [, m, c, dT] = inputValues;
            result = formulas[0].calculate(m, c, dT);
        } else if (missingIndex === 1) {
            const [Q, , c, dT] = inputValues;
            result = formulas[1].calculate(Q, c, dT);
        } else if (missingIndex === 2) {
            const [Q, m, , dT] = inputValues;
            result = formulas[2].calculate(Q, m, dT);
        } else if (missingIndex === 3) {
            const [Q, m, c,  ] = inputValues;
            result = formulas[3].calculate(Q, m, c);
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
        displayName: 'Calculate Q',
        calculate: (m, c, dT) => m * c * dT
    },
    {
        displayName: 'Calculate mass',
        calculate: (Q, c, dT) => Q / (c * dT)
    },
    {
        displayName: 'Calculate specific heat',
        calculate: (Q, m , dT) => Q / (m * dT)
    },
    {
        displayName: 'Calculate Change in temperature',
        calculate: (Q, m, c) => Q / (m * c)
    }
];

createCalculator('Termodynamics Calculator',
    [
        { id: 'dQ', placeholder: 'Change in thermal energy (Q) [J]' },
        { id: 'm', placeholder: 'Mass (m) [kg]' },
        { id: 'c', placeholder: 'Specific Heat (c) [J·kg⁻¹·K⁻¹]' },
        { id: 'dT', placeholder: 'Change in temperature (T) [K]' }
    ],
    formulas,
    '../assets/thermodynamics/termo.png'
);