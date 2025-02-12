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
        if(missingIndex >= 0 && missingIndex <= 4){
            const arguments = inputValues.slice(0,missingIndex).concat(inputValues.slice(missingIndex+1));
            result = formulas[missingIndex].calculate(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);
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

// Spring Rate
// k = spring rate 
// g = shear modulus of elasticity of the spring material
// mean = mean diameter of the springs coils
// n = number of active coils 
// d = diameter of spring wire

const formulas_spring_rate = [
    {
        displayName: 'Calculate spring rate from diameter of spring wire, elasticity, mean diameter and number of active coils',
        calculate: (g0,mean0,n0,d0) => (Math.pow(d0, 4) * g0) / (8 * Math.pow(mean0, 3) * n0)
    },
    {
        displayName: 'Calculate shear modulos of elasticity of the spring material',
        calculate: (k0,mean0,n0,d0) => (8 * Math.pow(mean0, 3) * n0 * k0) / Math.pow(d0, 4)
    },
    {
        displayName: 'Calculate mean diameter of points',
        calculate: (k0,g0,n0,d0) => Math.pow((Math.pow(d0, 4) * g0) / (8 * n0 * k0), 1 / 3)
    },
    {
        displayName: 'Calculate number of active coils',
        calculate: (k0,g0,mean0,d0) => (Math.pow(d0, 4) * g0) / (8 * Math.pow(mean0, 3) * k0)
    },
    {
        displayName: 'Calculate wire diameter',
        calculate: (k0,g0,mean0,n0) => Math.pow((8 * Math.pow(mean0, 3) * n0 * k0) / g0, 1 / 4)
    }
];

createCalculator('Spring rate', 
    [
        { id: 'k0', placeholder: 'Spring rate (k, in N/m)' },
        { id: 'g0', placeholder: 'Shear modulus of elasticity of the spring material (G, in Pa)' },
        { id: 'mean0', placeholder: 'Mean diameter of the springs coils (D, in m)' },
        { id: 'n0', placeholder: 'Number of active coils (N)' },
        { id: 'd0', placeholder: 'Diameter of spring wire (d, in m)' }
    ],
    formulas_spring_rate,
    '../assets/vb/spring_rate.png'
);

// Natural frequency
// w = angular natural frequecy
// k = spring constant
// m = mass

const formulas_natural_f = [
    {
        displayName: 'Calculate angular natural frequency (w0) from k and m',
        calculate: (k1,m1) => Math.sqrt(k1 / m1)
    },
    {
        displayName: 'Calculate spring constant k from w and m',
        calculate: (w1,m1) => Math.pow(w1,2) * m1 
    },
    {
        displayName: 'Calculate mass m from w and k',
        calculate: (w1,k1) => k1 / Math.pow(w1,2) 
    }
];

createCalculator('Natural angular frequency' , 
    [
        { id: 'w1', placeholder: 'Natural angular frequency (w, in radians)' },
        { id: 'k1', placeholder: 'Spring constant (k, in N/m)' },
        { id: 'm1', placeholder: 'mass (m, in kg)' }
    ],
    formulas_natural_f,
    '../assets/vb/natural_f.png'
);

const formulas_damping_r = [
    {
        displayName: 'Calculate damping ratio',
        calculate: (c2,m2,k2) => c2 / (2 * Math.sqrt(m2 * k2))
    },
    {
        displayName: 'Calculate c',
        calculate: (zeta2,m2,k2) => 2 * zeta2 * Math.sqrt(m2 * k2)
    },
    {
        displayName: 'Calculate mean diameter of points',
        calculate: (zeta2,c2,k2) => Math.pow(c2, 2) / (4 * Math.pow(zeta2, 2) * k2)
    },
    {
        displayName: 'Calculate number of active coils',
        calculate: (zeta2,c2,m2,) => Math.pow(c2, 2) / (4 * Math.pow(zeta2, 2) * m2)
    }
];

createCalculator('Damping ratio', 
    [
        { id: 'zeta2', placeholder: 'Damping ratio (zeta)' },
        { id: 'c2', placeholder: 'Damping coefficient (c, in N*s/m)' },
        { id: 'm2', placeholder: 'mass (m, in kg)' },
        { id: 'k2', placeholder: 'Spring constant (k, in N/m)' }
    ],
    formulas_damping_r,
    '../assets/vb/damping_r.png'
);