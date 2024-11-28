function createCalculator(title, inputFields, formulas, imageUrl) {
    const calculatorDiv = document.createElement('div');
    calculatorDiv.className = 'calculator';

    // Create image element if imageUrl is provided

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
            // Missing value for first input
            const [, airDensity, velocity, area, drag] = inputValues; // Skip the first value
            result = formulas[0].calculate(airDensity, velocity, area, drag);
        } else if (missingIndex === 1) {
            // Missing value for second input
            const [dCoeff, , velocity, area, drag] = inputValues; // Skip the second value
            result = formulas[1].calculate(dCoeff, velocity, area, drag);
        } else if (missingIndex === 2) {
            // Missing value for third input
            const [dCoeff, airDensity, , area, drag] = inputValues; // Use only the first two values
            result = formulas[2].calculate(dCoeff, airDensity, area, drag);
        } else if (missingIndex === 3) {
            // Missing value for third input
            const [dCoeff, airDensity, velocity, , drag] = inputValues; // Use only the first two values
            result = formulas[3].calculate(dCoeff, airDensity, velocity, drag);
        } else if (missingIndex === 4) {
            // Missing value for third input
            const [dCoeff, airDensity, velocity, area,] = inputValues; // Use only the first two values
            result = formulas[4].calculate(dCoeff, airDensity, velocity, area);
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
        displayName: 'Calculate Drag/Lift Coefficient',
        calculate: (airDensity, velocity, area, drag) => 2 * drag / (area * airDensity * velocity * velocity)
    },
    {
        displayName: 'Calculate Air Density',
        calculate: (dragCoefficient, velocity, area, drag) => 2 * drag / (dragCoefficient * area * velocity * velocity)
    },
    {
        displayName: 'Calculate Velocity',
        calculate: (dragCoefficient, airDensity, area, drag) => Math.sqrt(2 * drag / (dragCoefficient * area * airDensity))
    },
    {
        displayName: 'Calculate Crossection Area',
        calculate: (dragCoefficient, airDensity, velocity, drag) => 2 * drag / (dragCoefficient * airDensity * velocity * velocity)
    },
    {
        displayName: 'Calculate Drag/Lift',
        calculate: (dragCoefficient, airDensity, velocity, area) => area * dragCoefficient * airDensity * velocity * velocity / 2
    }
];

createCalculator('Drag and Lift Calculator',
    [
        { id: 'dCoeff', placeholder: 'Drag/Lift Coefficient' },
        { id: 'airDensity', placeholder: 'Air Density' },
        { id: 'velocity', placeholder: 'Velocity' },
        { id: 'area', placeholder: 'Effective Cross-sectional Area' },
        { id: 'drag', placeholder: 'Drag/Lift Force' }

    ],
    formulas,
    '../assets/fluid-dynamics/drag-lift.png'
);

function createReynoldsCalculator(title, inputFields, formulas, imageUrl) {
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
            // Missing value for first input
            const [, density, length, velocity, viscosity] = inputValues; // Skip the first value
            result = reynoldsFormulas[0].calculate(density, length, velocity, viscosity);
        } else if (missingIndex === 1) {
            // Missing value for second input
            const [reynolds, , length, velocity, viscosity] = inputValues; // Skip the second value
            result = reynoldsFormulas[1].calculate(reynolds, length, velocity, viscosity);
        } else if (missingIndex === 2) {
            // Missing value for third input
            const [reynolds, density, , velocity, viscosity] = inputValues; // Use only the first two values
            result = reynoldsFormulas[2].calculate(reynolds, density, velocity, viscosity);
        } else if (missingIndex === 3) {
            // Missing value for fourth input
            const [reynolds, density, length, , viscosity] = inputValues; // Use only the first three values
            result = reynoldsFormulas[3].calculate(reynolds, density, length, viscosity);
        } else if (missingIndex === 4) {
            // Missing value for fourth input
            const [reynolds, density, length, velocity,] = inputValues; // Use only the first three values
            result = reynoldsFormulas[4].calculate(reynolds, density, length, velocity);
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

const reynoldsFormulas = [
    {
        displayName: 'Calculate Reynolds Number',
        calculate: (density, length, velocity, viscosity) => density * length * velocity / viscosity
    },
    {
        displayName: 'Calculate Density',
        calculate: (reynoldsNumber, length, velocity, viscosity) => reynoldsNumber * viscosity / (velocity * length)
    },
    {
        displayName: 'Calculate Length',
        calculate: (reynoldsNumber, density, velocity, viscosity) => reynoldsNumber * viscosity / (density * velocity)
    },
    {
        displayName: 'Calculate Velocity',
        calculate: (reynoldsNumber, density, length, viscosity) => reynoldsNumber * viscosity / (density * length)
    },
    {
        displayName: 'Calculate Viscosity',
        calculate: (reynoldsNumber, density, length, velocity) => density * length * velocity / reynoldsNumber
    }
];

createReynoldsCalculator('Reynolds Number Calculator',
    [
        { id: 'reynolds', placeholder: 'Reynolds Number (Re)' },
        { id: 'density', placeholder: 'Density (rho)' },
        { id: 'length', placeholder: 'Characteristic Length (l)' },
        { id: 'fluidVelocity', placeholder: 'Velocity (v)' },
        { id: 'viscosity', placeholder: 'Dynamic Viscosity (u)' }
    ],
    reynoldsFormulas,
    '../assets/fluid-dynamics/reynolds_number.png'
);

function createPerfectGasCalculator(title, inputFields, formulas, imageUrl) {
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
            const [, V1, n1, T1, P2, V2, n2, T2] = inputValues;
            result = perfectGasFormulas[0].calculate(V1, n1, T1, P2, V2, n2, T2);
        } else if (missingIndex === 1) {
            const [P1, , n1, T1, P2, V2, n2, T2] = inputValues;
            result = perfectGasFormulas[1].calculate(P1, n1, T1, P2, V2, n2, T2);
        } else if (missingIndex === 2) {
            const [P1, V1, , T1, P2, V2, n2, T2] = inputValues;
            result = perfectGasFormulas[2].calculate(P1, V1, T1, P2, V2, n2, T2);
        } else if (missingIndex === 3) {
            const [P1, V1, n1, , P2, V2, n2, T2] = inputValues;
            result = perfectGasFormulas[3].calculate(P1, V1, n1, P2, V2, n2, T2);
        } else if (missingIndex === 4) {
            const [P1, V1, n1, T1, , V2, n2, T2] = inputValues;
            result = perfectGasFormulas[4].calculate(P1, V1, n1, T1, V2, n2, T2);
        } else if (missingIndex === 5) {
            const [P1, V1, n1, T1, P2, , n2, T2] = inputValues;
            result = perfectGasFormulas[5].calculate(P1, V1, n1, T1, P2, n2, T2);
        } else if (missingIndex === 6) {
            const [P1, V1, n1, T1, P2, V2, , T2] = inputValues;
            result = perfectGasFormulas[6].calculate(P1, V1, n1, T1, P2, V2, T2);
        } else if (missingIndex === 7) {
            const [P1, V1, n1, T1, P2, V2, n2, ] = inputValues;
            result = perfectGasFormulas[7].calculate(P1, V1, n1, T1, P2, V2, n2);
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

const perfectGasFormulas = [
    {
        displayName: 'Calculate P1',
        calculate: (V1, n1, T1, P2, V2, n2, T2) => (P2 * V2 * n1 * T1) / (n2 * T2 * V1)
    },
    {
        displayName: 'Calculate V1',
        calculate: (P1, n1, T1, P2, V2, n2, T2) => (P2 * V2 * n1 * T1) / (P1 * n2 * T2)
    },
    {
        displayName: 'Calculate n1',
        calculate: (P1, V1, T1, P2, V2, n2, T2) => (P1 * V1 * n2 * T2) / (P2 * V2 * T1)
    },
    {
        displayName: 'Calculate T1',
        calculate: (P1, V1, n1, P2, V2, n2, T2) => (P1 * V1 * n2 * T2) / (P2 * V2 * n1)
    },
    {
        displayName: 'Calculate P2',
        calculate: (P1, V1, n1, T1, V2, n2, T2) => (P1 * V1 * n2 * T2) / (n1 * T1 * V2)
    },
    {
        displayName: 'Calculate V2',
        calculate: (P1, V1, n1, T1, P2, n2, T2) => (P1 * V1 * n2 * T2) / (P2 * n1 * T1)
    },
    {
        displayName: 'Calculate n2',
        calculate: (P1, V1, n1, T1, P2, V2, T2) => (P2 * V2 * n1 * T1) / (P1 * V1 * T2)
    },
    {
        displayName: 'Calculate T2',
        calculate: (P1, V1, n1, T1, P2, V2, n2) => (P2 * V2 * n1 * T1) / (P1 * V1 * n2)
    }
];

createPerfectGasCalculator('Perfect Gas Law Calculator',
    [
        { id: 'P1', placeholder: 'Pressure 1 (P1)' },
        { id: 'V1', placeholder: 'Volume 1 (V1)' },
        { id: 'n1', placeholder: 'Moles 1 (n1)' },
        { id: 'T1', placeholder: 'Temperature 1 (T1)' },
        { id: 'P2', placeholder: 'Pressure 2 (P2)' },
        { id: 'V2', placeholder: 'Volume 2 (V2)' },
        { id: 'n2', placeholder: 'Moles 2 (n2)' },
        { id: 'T2', placeholder: 'Temperature 2 (T2)' }
    ],
    perfectGasFormulas,
    '../assets/fluid-dynamics/perfect_gas.png'
);