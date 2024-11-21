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
        if(title === 'Spring rate'){
            switch (missingIndex) {
                case 0:
                    // Missing value for first input
                    [,g,mean,n,d] = inputValues;
                    result = formulas[0].calculate(g,mean,n,d);
                    break;
                case 1:
                    // Missing value for second input
                    [k,,mean,n,d] = inputValues;
                    result = formulas[1].calculate(k,mean,n,d);
                    break;
                case 2:
                    // Missing value for third input
                    [k,g,,n,d] = inputValues; // skip third input
                    result = formulas[2].calculate(k,g,n,d);
                    break;
                case 3:
                    // Missing value for fourth input
                    [k,g,mean,,d] = inputValues;
                    result = formulas[2].calculate(k,g,n,d);
                    break;
                case 4:
                    // Missing value for fifth input
                    [k,g,mean,n,] = inputValues; // Skip fifth input
                    result = formulas[4].calculate(k,g,mean,n);
                    break;
                default:
                    result = 'Please leave one input empty to calculate the missing value.';
                    break;
            }
        }else if(title === 'Natural Frequency in radians'){
            switch (missingIndex) {
                case 0:
                    // Missing value for first input
                    [,k,m] = inputValues;
                    result = formulas[0].calculate(k,m);
                    break;
                case 1:
                    // Missing value for second input
                    [w,,m] = inputValues;
                    result = formulas[1].calculate(w,m);
                    break;
                case 2:
                    // Missing value for third input
                    [w,k,] = inputValues;
                    result = formulas[2].calculate(w,k);
                    break;
                default:
                    result = 'Please leave one input empty to calculate the missing value.';
                    break;
            }
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

// Spring Rate
// k = spring rate 
// g = shear modulus of elasticity of the spring material
// mean = mean diameter of the springs coils
// n = number of active coils 
// d = diameter of spring wire

const formulas_spring_rate = [
    {
        displayName: 'Calculate spring rate from diameter of spring wire, elasticity, mean diameter and number of active coils',
        calculate: (g,mean,n,d) => (Math.pow(d, 4) * g) / (8 * Math.pow(mean, 3) * n)
    },
    {
        displayName: 'Calculate shear modulos of elasticity of the spring material',
        calculate: (k,mean,n,d) => (8 * Math.pow(mean, 3) * n * k) / Math.pow(d, 4)
    },
    {
        displayName: 'Calculate mean diameter of points',
        calculate: (k,g,n,d) => Math.pow((Math.pow(d, 4) * g) / (8 * n * k), 1 / 3)
    },
    {
        displayName: 'Calculate number of active coils',
        calculate: (k,g,mean,d) => (Math.pow(d, 4) * g) / (8 * Math.pow(mean, 3) * k)
    },
    {
        displayName: 'Calculate wire diameter',
        calculate: (k,g,mean,n) => Math.pow((8 * Math.pow(mean, 3) * n * k) / g, 1 / 4)
    }
];

createCalculator('Spring rate', 
    [
        { id: 'k', placeholder: 'Spring rate (k)' },
        { id: 'g', placeholder: 'Shear modulus of elasticity of the spring material (G)' },
        { id: 'mean', placeholder: 'Mean diameter of the springs coils (D)' },
        { id: 'n', placeholder: 'Number of active coils (N)' },
        { id: 'd', placeholder: 'Diameter of spring wire (d)' }
    ],
    formulas_spring_rate,
    '../assets/vb/spring_rate.png'
);

// Natural frequency
// w = natural frequecy
// k = spring constant
// m = mass

const formulas_natural_f = [
    {
        displayName: 'Calculate natural frequency (w0) from k and m',
        calculate: (k2,m) => Math.sqrt(k2 / m)
    },
    {
        displayName: 'Calculate spring constant k from w and m',
        calculate: (w,m) => Math.pow(w,2) * m 
    },
    {
        displayName: 'Calculate mass m from w and k',
        calculate: (w,k2) => Math.pow(w,2) * k2
    }
];

createCalculator('Natural Frequency in radians', 
    [
        { id: 'w', placeholder: 'Natural frequency in radians (w)' },
        { id: 'k2', placeholder: 'Spring constant in N/m (k)' },
        { id: 'm', placeholder: 'mass in kg (m)' }
    ],
    formulas_natural_f,
    '../assets/vb/natural_f.png'
);
