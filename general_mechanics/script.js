function createImage(title, imageUrl) {
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

    document.getElementById('calculator-container').appendChild(calculatorDiv);
}





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
        calculate: (xi1, vi1, a1, t1) => xi1 + vi1 * t1 + 0.5 * a1 * t1 ** 2
    },
    {
        displayName: 'Calculate xi from x, vi, a, and t',
        calculate: (x1, vi1, a1, t1) => x1 - vi1 * t1 - 0.5 * a1 * t1 ** 2
    },
    { 
        displayName: 'Calculate vi from x, xi, a, and t',
        calculate: (x1, xi1, a1, t1) => (x1 - xi1 - 0.5 * a1 * t1 ** 2) / t1
    },
    {
        displayName: 'Calculate a from x, xi, vi, and t',
        calculate: (x1, xi1, vi1, t1) => (x1 - xi1 - vi1 * t1) / (0.5 * t1 ** 2)
    },
    {
        displayName: 'Calculate t from x, xi, vi, and a',
        calculate: (x1, xi1, vi1, a1) => Math.max((-vi1 + Math.sqrt(vi1 ** 2 + 2 * a1 * (x1 - xi1))) / a1, (-vi1 - Math.sqrt(vi1 ** 2 + 2 * a1 * (x1 - xi1))) / a1 )
    }
];

const formulas_velocity_squared = [
    {
        displayName: 'Calculate v from vi, a, x, and xi',
        calculate: (vi2, a2, x2, xi2) => Math.sqrt(vi2 ** 2 + 2 * a2 * (x2 - xi2))
    },
    {
        displayName: 'Calculate vi from v, a, x, and xi',
        calculate: (v2, a2, x2, xi2) => Math.sqrt(v2 ** 2 - 2 * a2 * (x2 - xi2))
    },
    {
        displayName: 'Calculate a from v, vi, x, and xi',
        calculate: (v2, vi2, x2, xi2) => (v2 ** 2 - vi2 ** 2) / (2 * (x2 - xi2))
    },
    {
        displayName: 'Calculate x from v, vi, a, and xi',
        calculate: (v2, vi2, a2, xi2) => ((v2 ** 2 - vi2 ** 2) / (2 * a2)) + xi2
    },
    {
        displayName: 'Calculate xi from v, vi, a, and x',
        calculate: (v2, vi2, a2, x2) => x2 - ((v2 ** 2 - vi2 ** 2) / (2 * a2))
    }
];


// Teorema do trabalho e energia
const formulas_work_energy = [
    {
        displayName: 'Calculate w from vg, ve, and t',
        calculate: (vg, ve, t) => vg + ve + t
    },
    {
        displayName: 'Calculate vg from w, ve, and t',
        calculate: (w, ve, t) => w - ve - t
    },
    {
        displayName: 'Calculate ve from w, vg, and t',
        calculate: (w, vg, t) => w - vg - t
    },
    {
        displayName: 'Calculate t from w, vg, and ve',
        calculate: (w, vg, ve) =>  w - vg - ve
    },
];


// Energia Potencial Gravitica
const formulas_epg = [
    {
        displayName: 'Calculate Vg from m, g, and h',
        calculate: (m, g, h) => m * g * h
    },
    {
        displayName: 'Calculate m from Vg, g, and h',
        calculate: (vg, g, h) => vg / (g * h)
    },
    {
        displayName: 'Calculate g from Vg, m, and h',
        calculate: (vg, m, h) => vg / (m * h)
    },
    {
        displayName: 'Calculate h from Vg, m, and g',
        calculate: (vg, m, g) => vg / (m * g)
    },
];

// Energia Potencial Elastica com deformacao angular
const formulas_epe = [
    { 
        displayName : 'Calculate Ve from k, l, kl and θ',
        calculate: (k, l, kl, θ) => 0.5 * k * l**2 + 0.5 * kl * θ**2
    },
    {
        displayName : 'Calculate k from Ve, l, kl and θ',
        calculate: (ve, l, kl, θ) => (ve - 0.5 * kl * θ**2) / (0.5 * l**2)
    },
    {
        displayName : 'Calculate l from Ve, k, kl and θ',
        calculate: (ve, k, kl, θ) => Math.sqrt((ve - 0.5 * kl * θ**2) / (0.5 * k))
    },
    {
        displayName : 'Calculate kl from Ve, k, l and θ',
        calculate: (ve, k, l, θ) => (ve - 0.5 * k * l**2) / (0.5 * θ**2)
    },
    {
        displayName : 'Calculate θ from Ve, k, l and kl',
        calculate: (ve, k, l, kl) => Math.sqrt((ve - 0.5 * k * l**2) / (0.5 * kl))
    }
];



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
    { id: 'x1', placeholder: 'x - Final Position' },
    { id: 'xi1', placeholder: 'x0 - Initial Position' },
    { id: 'vi1', placeholder: 'v0 - Initial Velocity' },
    { id: 'a1', placeholder: 'a - Acceleration' },
    { id: 't1', placeholder: 't - Time' },
],
    formulas_positions_equation,
    '../assets/motion/position.png'
);

createCalculator5('Velocity from Positions Equation', [
    { id: 'v2', placeholder: 'v - Final Velocity' },
    { id: 'vi2', placeholder: 'v0 - Initial Velocity' },
    { id: 'a2', placeholder: 'a - Acceleration' },
    { id: 'x2', placeholder: 'x - Final Position' },
    { id: 'xi2', placeholder: 'x0 - Initial Position' },
],
    formulas_velocity_squared,
    '../assets/motion/velocity_positions.png'
);

createCalculator4('Work and Energy Theorem', [
    { id: 'w3', placeholder: 'W - Work' },
    { id: 'vg3', placeholder: 'ΔVg - Gravitational Potential Energy' },
    { id: 've3', placeholder: 'ΔVe - Elastic Potential Energy' },
    { id: 't3', placeholder: 'ΔT - Kinetic Energy' },
],
    formulas_work_energy,
    '../assets/motion/workenergytheorem.png'
);

createCalculator4('Gravitational Potential Energy', [
    { id: 'vg4', placeholder: 'Vg - Gravitational Potential Energy' },
    { id: 'm4', placeholder: 'm - Mass' },
    { id: 'g4', placeholder: 'g - Gravity' },
    { id: 'h4', placeholder: 'h - Height' },
],
    formulas_epg,
    '../assets/motion/epg.png'
);

createCalculator5('Elastic Potential Energy', [
    { id: 've5', placeholder: 'Ve - Elastic Potential Energy' },
    { id: 'k5', placeholder: 'k - Spring Constant' },
    { id: 'l5', placeholder: 'Δl - Length' },
    { id: 'kl5', placeholder: 'kl - Angular Deformation Constant' },
    { id: 'θ5', placeholder: 'Δθ - Angular Deformation' },
],
    formulas_epe,
    '../assets/motion/epe.png'
);

createImage('Work from Non-Conservative Forces', '../assets/motion/nonconservative.png');

createImage('Kinetic Energy', '../assets/motion/kineticenergy.png');