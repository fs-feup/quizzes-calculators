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

        // Check for missing values
        if (inputValues.some(isNaN)) {
            alert('Please fill in all input fields.');
            return;
        }

        const [yaw_rate, vx, vy, L, T, delta, wf] = inputValues;

        // Calculate slip angles
        const v_FL_x = vx - yaw_rate * (T / 2);
        const v_FL_y = vy + yaw_rate * (L * wf);
        const alpha_FL = Math.abs(delta - Math.atan2(v_FL_y, v_FL_x)) * (180 / Math.PI);

        const v_FR_x = vx + yaw_rate * (T / 2);
        const v_FR_y = vy + yaw_rate * (L * wf);
        const alpha_FR = Math.abs(delta - Math.atan2(v_FR_y, v_FR_x)) * (180 / Math.PI);

        const v_RL_x = vx - yaw_rate * (T / 2);
        const v_RL_y = vy - yaw_rate * (L * (1 - wf));
        const alpha_RL = Math.abs(-Math.atan2(v_RL_y, v_RL_x)) * (180 / Math.PI);

        const v_RR_x = vx + yaw_rate * (T / 2);
        const v_RR_y = vy - yaw_rate * (L * (1 - wf));
        const alpha_RR = Math.abs(-Math.atan2(v_RR_y, v_RR_x)) * (180 / Math.PI);

        let resultParagraph = calculatorDiv.querySelector('.result');

        if (!resultParagraph) {
            resultParagraph = document.createElement('p');
            resultParagraph.className = 'result';
            calculatorDiv.appendChild(resultParagraph);
        }

        resultParagraph.innerText = `Results:\nAlpha_FL: ${alpha_FL.toFixed(2)}°\nAlpha_FR: ${alpha_FR.toFixed(2)}°\nAlpha_RL: ${alpha_RL.toFixed(2)}°\nAlpha_RR: ${alpha_RR.toFixed(2)}°`;
    };

    calculatorDiv.appendChild(button);
    document.getElementById('calculator-container').appendChild(calculatorDiv);
}

function createCalculator2(title, inputFields, formulas, imageUrl) {
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
            const [, g, R, mu, rho, Cl, A, V] = inputValues;
            result = formulas[0].calculate(g, R, mu, rho, Cl, A, V);
        } else if (missingIndex === 1) {
            const [m, , R, mu, rho, Cl, A, V] = inputValues;
            result = formulas[1].calculate(m, R, mu, rho, Cl, A, V);
        } else if (missingIndex === 2) {
            const [m, g, , mu, rho, Cl, A, V] = inputValues;
            result = formulas[2].calculate(m, g, mu, rho, Cl, A, V);
        } else if (missingIndex === 3) {
            const [m, g, R, , rho, Cl, A, V] = inputValues;
            result = formulas[3].calculate(m, g, R, rho, Cl, A, V);
        } else if (missingIndex === 4) {
            const [m, g, R, mu, , Cl, A, V] = inputValues;
            result = formulas[4].calculate(m, g, R, mu, Cl, A, V);
        } else if (missingIndex === 5) {
            const [m, g, R, mu, rho, , A , V] = inputValues;
            result = formulas[5].calculate(m, g, R, mu, rho, A, V);
        } else if (missingIndex === 6) {
            const [m, g, R, mu, rho, Cl, , V ] = inputValues;
            result = formulas[6].calculate(m, g, R, mu, rho, Cl, V);
        } else if (missingIndex === 7) {
            const [m, g, R, mu, rho, Cl, A , ] = inputValues;
            result = formulas[7].calculate(m, g, R, mu, rho, Cl, A);
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

const curving_problem_formulas = [
    {
        displayName: 'Calculate m',
        calculate: (g, R, mu, rho, Cl, A, V) => (0.5 * rho * Cl * A * V**2) / (V ** 2 / (mu * R) - g)
    },
    {
        displayName: 'Calculate g',
        calculate: (m, R, mu, rho, Cl, A, V) => V**2 * (m / (mu * R) - 0.5 * rho * Cl * A) / m
    },
    {
        displayName: 'Calculate R',
        calculate: (m, g, mu, rho, Cl, A, V) => m / (mu * (m * g / V**2 + 0.5 * rho * Cl * A))
    },
    {
        displayName: 'Calculate mu',
        calculate: (m, g, R, rho, Cl, A, V) => m / (R * (m * g / V**2 + 0.5 * rho * Cl * A))
    },
    {
        displayName: 'Calculate rho',
        calculate: (m, g, R, mu, Cl, A, V) => 2 * m * (V**2 / (mu * R) - g) / (Cl * A * V**2)
    },
    {
        displayName: 'Calculate Cl',
        calculate: (m, g, R, mu, rho, A, V) => 2 / (rho * A) * (m / (R * mu) - m * g / V**2)
    },
    {
        displayName: 'Calculate A',
        calculate: (m, g, R, mu, rho, Cl, V) => 2 / (rho * Cl) * (m / (R * mu) - m * g / V**2)
    },
    {
        displayName: 'Calculate V',
        calculate: (m, g, R, mu, rho, Cl, A) => Math.sqrt((m * g) / ((1 / R) * (m / mu) - (0.5 * rho * Cl * A)))
    }
];

createCalculator2('Curving Problem',
    [
        { id: 'm', placeholder: 'Mass (m) [kg]' },
        { id: 'g', placeholder: 'Gravitational Acceleration (g) [m/s²]' },
        { id: 'R', placeholder: 'Radius (r) [m]' },
        { id: 'mu', placeholder: 'Coefficient of Friction (μ)' },
        { id: 'rho', placeholder: 'Density of Air (ρ) [kg/m³]' },
        { id: 'Cl', placeholder: 'Lift Coefficient (Cl)' },
        { id: 'A', placeholder: 'Cross-sectional Area (A) [m²]' },
        { id: 'V', placeholder: 'Velocity (V) [m/s]' }
    ],
    curving_problem_formulas,
    '../assets/vd/image.png'
);

createCalculator('Slip Angle Calculator',
    [
        { id: 'yaw_rate', placeholder: 'Yaw Rate [rad/s]' },
        { id: 'vx', placeholder: 'Longitudinal Velocity [m/s]' },
        { id: 'vy', placeholder: 'Lateral Velocity [m/s]' },
        { id: 'L', placeholder: 'Wheelbase [m]' },
        { id: 'T', placeholder: 'Track Width [m]' },
        { id: 'delta', placeholder: 'Steering Angle [rad]' },
        { id: 'wf', placeholder: 'Weight Distribution Front - value between 0 and 1' }
    ],
    null,
    '../assets/vehicle/slip_angle.gif');

    
    const weight_transfer_x_formulas = [
        {
            displayName: 'Calculate F',
            calculate: (h_m, delta, L) => (L * delta / h_m)
        },
        {
            displayName: 'Calculate h_m',
            calculate: (F, delta, L) => (L * delta / F)
        },
        {
            displayName: 'Calculate L',
            calculate: (F, h_m, delta) => (F * h_m / delta)
        },
        {
            displayName: 'Calculate delta',
            calculate: (F, h_m, L) => (F * h_m / L)
        }
    ];
    
    createCalculator4('Longitudinal Weight Transfer Calculator',
        [
            { id: 'Fefwdqrg', placeholder: 'Force [N]' },
            { id: 'h_mwdqdeg', placeholder: 'Height of center of mass [m]' },
            { id: 'Lgefv', placeholder: 'Wheelbase [m]' },
            { id: 'deltawdvfv', placeholder: 'Longitudinal Weight Transfer [N]' }
        ],
        weight_transfer_x_formulas,
        '../assets/vd/lon_weight_transfer.png'
    );
    
    const weight_transfer_y_formulas = [
        {
            displayName: 'Calculate F',
            calculate: (h_m, delta, T) => (T * delta / h_m)
        },
        {
            displayName: 'Calculate h_m',
            calculate: (F, delta, T) => (T * delta / F)
        },
        {
            displayName: 'Calculate T',
            calculate: (F, h_m, delta) => (F * h_m / delta)
        },
        {
            displayName: 'Calculate delta',
            calculate: (F, h_m, T) => (F * h_m / T)
        }
    ];
    
    createCalculator4('Lateral Weight Transfer Calculator',
        [
            { id: 'Ff', placeholder: 'Force [N]' },
            { id: 'h_mf', placeholder: 'Height of center of mass [m]' },
            { id: 'Tf', placeholder: 'Track Width [m]' },
            { id: 'deltaf', placeholder: 'Lateral Weight Transfer [N]' }
        ],
        weight_transfer_y_formulas,
        '../assets/vd/lat_weight_transfer.png'
    );
    