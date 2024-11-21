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
        }  else if (missingIndex === 4) {
            // Missing value for third input
            const [dCoeff, airDensity, velocity, area, ] = inputValues; // Use only the first two values
            result = formulas[4].calculate(dCoeff, airDensity, velocity, area);
        }else {
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
        calculate: (dragCoefficient, airDensity, velocity, area) => area * dragCoefficient * airDensity * velocity * velocity/ 2
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
