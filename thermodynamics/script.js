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
        input.type = 'text';
        input.id = field.id;
        input.placeholder = field.placeholder;
        calculatorDiv.appendChild(text);
        calculatorDiv.appendChild(input);
    });

    const button = document.createElement('button');
    button.innerText = 'Calculate';
    button.onclick = () => {
        // Get input values
        const inputValues = inputFields.map(field => {
            const value = document.getElementById(field.id).value.replace(',', '.');
            return parseFloat(value);
        });

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

        if(isNaN(result) && missingIndex >=0){
            result = 'Invalid input values. Please check your entries.';
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
        const text = document.createElement('div');
        text.innerText = field.placeholder;
        input.type = 'text';
        input.id = field.id;
        input.placeholder = field.placeholder;
        calculatorDiv.appendChild(text);
        calculatorDiv.appendChild(input);
    });

    const button = document.createElement('button');
    button.innerText = 'Calculate';
    button.onclick = () => {
        // Get input values
        const inputValues = inputFields.map(field => {
            const value = document.getElementById(field.id).value.replace(',', '.');
            return parseFloat(value);
        });

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
        if(isNaN(result) && missingIndex >=0){
            result = 'Invalid input values. Please check your entries.';
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
        { id: 'P1', placeholder: 'Pressure 1 (P1, in Pa)' },
        { id: 'V1', placeholder: 'Volume 1 (V1, in m³)' },
        { id: 'n1', placeholder: 'Moles 1 (n1)' },
        { id: 'T1', placeholder: 'Temperature 1 (T1, in K)' },
        { id: 'P2', placeholder: 'Pressure 2 (P2, in Pa)' },
        { id: 'V2', placeholder: 'Volume 2 (V2, in m³)' },
        { id: 'n2', placeholder: 'Moles 2 (n2)' },
        { id: 'T2', placeholder: 'Temperature 2 (T2, in K)' }
    ],
    perfectGasFormulas,
    '../assets/fluid-dynamics/perfect_gas.png'
);



function createThermoCycleSolver(title, imageUrl) {
    const container = document.getElementById('calculator-container');
    const calculatorDiv = document.createElement('div');
    calculatorDiv.className = 'calculator';

    // --- Title + Image ---
    const titleElement = document.createElement('h2');
    titleElement.innerText = title;
    calculatorDiv.appendChild(titleElement);
    if (imageUrl) {
        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = 'Cycle Diagram';
        image.className = 'calculator-image';
        calculatorDiv.appendChild(image);
    }

    // --- Build Inputs for p, V, T at each point ---
    for (let i = 1; i <= 4; i++) {
        const pointDiv = document.createElement('div');
        pointDiv.className = 'point-section';
        const pointTitle = document.createElement('h3');    
        pointTitle.innerText = `Point ${i}`;
        pointDiv.appendChild(pointTitle);

        ['p', 'V', 'T'].forEach(k => {
            const label = document.createElement('label');
            label.innerText = `${k}${i} (${k === 'p' ? 'bar' : k === 'V' ? 'm³' : 'K'})`;
            const input = document.createElement('input');
            input.type = 'text';
            input.id = `${k}${i}`;
            input.placeholder = `${k}${i}`;
            pointDiv.appendChild(label);
            pointDiv.appendChild(input);
        });

        calculatorDiv.appendChild(pointDiv);
    }

    // --- Calculate Button ---
    const btn = document.createElement('button');
    btn.innerText = 'Calculate';
    calculatorDiv.appendChild(btn);

    // --- Result Area ---
    const resultParagraph = document.createElement('pre');
    resultParagraph.className = 'result';
    calculatorDiv.appendChild(resultParagraph);

    // --- Helper to parse input fields (now handles commas and spaces) ---
    const parseField = id => {
        const el = document.getElementById(id);
        if (!el) return NaN;
        let v = el.value.trim();

        // Replace comma with dot, and remove all spaces
        v = v.replace(',', '.').replace(/\s+/g, '');

        if (v === '') return NaN;
        const num = parseFloat(v);
        return isNaN(num) ? NaN : num;
    };

    btn.onclick = function() {
        const vals = {};
        for (let i = 1; i <= 4; i++) {
            vals[`p${i}`] = parseField(`p${i}`);
            vals[`V${i}`] = parseField(`V${i}`);
            vals[`T${i}`] = parseField(`T${i}`);
        }

        const barToPa = 1e5;
        let changed = true;
        const maxIter = 10;
        let iter = 0;

        function eq(a, b) {
            if (isNaN(a) && isNaN(b)) return true;
            if (isNaN(a) || isNaN(b)) return false;
            return Math.abs(a - b) < 1e-9;
        }

        while (changed && iter < maxIter) {
            iter++;
            changed = false;

            const snapshot = {};
            for (let i = 1; i <= 4; i++) {
                snapshot[`p${i}`] = vals[`p${i}`];
                snapshot[`V${i}`] = vals[`V${i}`];
                snapshot[`T${i}`] = vals[`T${i}`];
            }

            // --- 1) Isochoric relations ---
            if (!isNaN(vals.V2) && isNaN(vals.V3)) vals.V3 = vals.V2;
            if (!isNaN(vals.V3) && isNaN(vals.V2)) vals.V2 = vals.V3;
            if (!isNaN(vals.V1) && isNaN(vals.V4)) vals.V4 = vals.V1;
            if (!isNaN(vals.V4) && isNaN(vals.V1)) vals.V1 = vals.V4;

            // --- 2) Isothermal relations ---
            if (isNaN(vals.p2) && !isNaN(vals.p1) && !isNaN(vals.V1) && !isNaN(vals.V2))
                vals.p2 = (vals.p1 * vals.V1) / vals.V2;
            if (isNaN(vals.p1) && !isNaN(vals.p2) && !isNaN(vals.V2) && !isNaN(vals.V1))
                vals.p1 = (vals.p2 * vals.V2) / vals.V1;

            if (isNaN(vals.p4) && !isNaN(vals.p3) && !isNaN(vals.V3) && !isNaN(vals.V4))
                vals.p4 = (vals.p3 * vals.V3) / vals.V4;
            if (isNaN(vals.p3) && !isNaN(vals.p4) && !isNaN(vals.V4) && !isNaN(vals.V3))
                vals.p3 = (vals.p4 * vals.V4) / vals.V3;

            // --- 3) Find reference triple (including updated values) ---
            let ref = null;
            for (let i = 1; i <= 4; i++) {
                if (!isNaN(vals[`p${i}`]) && !isNaN(vals[`V${i}`]) && !isNaN(vals[`T${i}`])) {
                    ref = i;
                    break;
                }
            }

            // --- 4) Compute T from reference ---
            if (ref !== null) {
                const kSI = (vals[`p${ref}`] * barToPa * vals[`V${ref}`]) / vals[`T${ref}`];
                for (let i = 1; i <= 4; i++) {
                    if (!isNaN(vals[`p${i}`]) && !isNaN(vals[`V${i}`])) {
                        vals[`T${i}`] = (vals[`p${i}`] * barToPa * vals[`V${i}`]) / kSI;
                    }
                }
            } else {
                // --- 5) Isochoric relation for 2→3 or 4→1 ---
                if (!isNaN(vals.T2) && !isNaN(vals.p2) && !isNaN(vals.p3) && !isNaN(vals.V2) && !isNaN(vals.V3) && Math.abs(vals.V2 - vals.V3) < 1e-9) {
                    vals.T3 = vals.T2 * (vals.p3 / vals.p2);
                    vals.T4 = vals.T3;
                    vals.T1 = vals.T2;
                }
                if (!isNaN(vals.T1) && !isNaN(vals.p1) && !isNaN(vals.p4) && !isNaN(vals.V1) && !isNaN(vals.V4) && Math.abs(vals.V1 - vals.V4) < 1e-9) {
                    vals.T4 = vals.T1 * (vals.p4 / vals.p1);
                    vals.T3 = vals.T4;
                    vals.T2 = vals.T1;
                }
            }

            // --- 6) Propagate isothermal equalities ---
            if (!isNaN(vals.T2) && isNaN(vals.T1)) vals.T1 = vals.T2;
            if (!isNaN(vals.T1) && isNaN(vals.T2)) vals.T2 = vals.T1;
            if (!isNaN(vals.T3) && isNaN(vals.T4)) vals.T4 = vals.T3;
            if (!isNaN(vals.T4) && isNaN(vals.T3)) vals.T3 = vals.T4;

            // --- 7) Detect changes ---
            for (let i = 1; i <= 4; i++) {
                if (!eq(snapshot[`p${i}`], vals[`p${i}`]) || !eq(snapshot[`V${i}`], vals[`V${i}`]) || !eq(snapshot[`T${i}`], vals[`T${i}`])) {
                    changed = true;
                    break;
                }
            }
        }

        // --- Display results ---
        let result = 'Calculated State Variables:\n\n';
        for (let i = 1; i <= 4; i++) {
            result += `Point ${i}:\n`;
            result += `  p${i} = ${vals[`p${i}`] ? vals[`p${i}`].toFixed(3) : '—'} bar\n`;
            result += `  V${i} = ${vals[`V${i}`] ? vals[`V${i}`].toFixed(3) : '—'} m³\n`;
            result += `  T${i} = ${vals[`T${i}`] ? vals[`T${i}`].toFixed(2) : '—'} K\n\n`;
        }

        resultParagraph.textContent = result;
    };

    container.appendChild(calculatorDiv);
}

// --- Initialize the solver ---
createThermoCycleSolver('Thermodynamic Cycle Solver', '../assets/thermodynamics/cycle.png');
