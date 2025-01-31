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

const Pmax_manual = 50;
const Pmax_dc = 75;

function generateFormulas(Pmax, denominator, factor, exp = 2, factor_division = 0.95) {
    return [
        {
            displayName: 'Calculate P team from P max',
            calculate: (tmax, final) => tmax * factor /
                Math.pow(
                    (denominator * (final - (1 - factor_division) * Pmax)) / (factor_division * Pmax) + 1,
                    1 / exp
                )
        },
        {
            displayName: 'Calculate P max from P team',
            calculate: (tteam, final) => (
                ((denominator * ((final - (1 - factor_division) * Pmax) / (factor_division * Pmax)) + 1) / factor**exp) *
                tteam**exp
            ) ** (1 / exp)
        },
        {
            displayName: 'Calculate Final Points from P team and P max',
            calculate: (tteam, tmax) => 
                Math.max(factor_division * Pmax * ((tmax * factor / tteam)**exp - 1) / denominator + (1 - factor_division) * Pmax, 0)
        }
    ];
}

const formulas_skidpad_manual = generateFormulas(Pmax_manual, 0.5625, 1.25)

const formulas_skidpad_manual_non_fsg = generateFormulas(75, 0.5625, 1.25)

const formulas_skidpad_dc = generateFormulas(Pmax_dc, 1.25, 1.5)

const formulas_skidpad_dv = [
    {
        displayName: 'Calculate R_DV with nALl and points',
        calculate: (nAll, points) => nAll + 1 - (points / 75) * nAll
    },
    {
        displayName: 'Calculate n_All with the R dv and points',
        calculate: (rDV, points) => (1 - rDV) / (points / 75 - 1)
    },
    {
        displayName: 'Calculate Points with N_all and R_dv',
        calculate: (rDV, nAll) => 75 * (nAll + 1 - rDV) / nAll
    }
]

const formulas_acceleration_manual = generateFormulas(50, 0.5, 1.5, 1)

const formulas_acceleration_manual_non_fsg = generateFormulas(75, 0.5, 1.5, 1)

const formulas_acceleration_dc = generateFormulas(75, 1, 2, 1)

const formulas_acceleration_dv = formulas_skidpad_dv

createCalculator('Manual Skidpad',
    [
        { id: 'tteam', placeholder: 'T team - Team\'s best time including penalties' },
        { id: 'tmax', placeholder: 'T Best - Overall best time including penalties (Without factor).' },
        { id: 'finalPoints', placeholder: 'Final Points (optional)' }
    ],
    formulas_skidpad_manual,
    '../assets/skidpad/skidpad_score.png'
);

createCalculator('Manual Skidpad Non FSG / FSPT',
    [
        { id: 'tteam11', placeholder: 'T team - Team\'s best time including penalties' },
        { id: 'tmax11', placeholder: 'T Best - Overall best time including penalties (Without factor).' },
        { id: 'finalPoints11', placeholder: 'Final Points (optional)' }
    ],
    formulas_skidpad_manual_non_fsg,
    '../assets/skidpad/skidpad_score.png'
);

createCalculator('Driverless Skidpad',
    [
        {id: 'r_dv', placeholder: 'R DV -> Ranking of the team\'s best autonomous time'},
        {id: 'n_all', placeholder: 'n_all -> Number of teams who have at least one valid manual or autonomous run'},
        {id: 'points', placeholder: 'Final Points'}
    ],
    formulas_skidpad_dv,
    '../assets/skidpad/DV_Skidpad.png'
)

createCalculator('DC Skidpad',
    [
        { id: 'tteam1', placeholder: 'T team - Team\'s best time including penalties' },
        { id: 'tmax1', placeholder: 'T best - Overall best time including penalties (Without factor).' },
        { id: 'finalPoints1', placeholder: 'Final Points (optional)' }
    ],
    formulas_skidpad_dc,
    '../assets/skidpad/skidpad_dc.png'
);


createCalculator('Manual Acceleration', 
    [
        { id: 'tteam2', placeholder: 'T team - Team\'s best time including penalties' },
        { id: 'tmax2', placeholder: 'T best - Overall best time including penalties (Without factor).' },
        { id: 'finalPoints2', placeholder: 'Final Points (optional)' }
    ],
    formulas_acceleration_manual,
    '../assets/acceleration/m_acceleration.png'
);

createCalculator('Manual Acceleration Non FSG / FSPT', 
    [
        { id: 'tteam22', placeholder: 'T team - Team\'s best time including penalties' },
        { id: 'tmax22', placeholder: 'T best - Ovreall best time including penalties (Without factor).' },
        { id: 'finalPoints22', placeholder: 'Final Points (optional)' }
    ],
    formulas_acceleration_manual_non_fsg,
    '../assets/acceleration/m_acceleration.png'
);

createCalculator('Driverless Acceleration',
    [
        {id: 'r_dv3333', placeholder: 'R DV -> Ranking of the team\'s best autonomous time'},
        {id: 'n_all3333', placeholder: 'n_all -> Number of teams who have at least one valid manual or autonomous run'},
        {id: 'points3333', placeholder: 'Number of points got'}
    ],
    formulas_acceleration_dv,
    '../assets/acceleration/dc_acceleration.png'
)

createCalculator('DC Acceleration', 
    [
        { id: 'tteam3', placeholder: 'T team - Team\'s best time including penalties' },
        { id: 'tmax3', placeholder: 'T best - Overall best time including penalties (Without factor).' },
        { id: 'finalPoints3', placeholder: 'Final Points (optional)' }
    ],
    formulas_acceleration_dc,
    '../assets/acceleration/dv_acceleration.png'
);


const formulas_autocross_manual = generateFormulas(100, 0.25, 1.25, 1)


const formulas_autocross_dc = [
    {
        displayName: 'Calculate t min',
        calculate: (tmax, tteam_total, finalPoints) => 
            - ((tmax - tteam_total - tmax * ((finalPoints-10)/90))/((finalPoints-10)/90)),
    },
    {
        displayName: 'Calculate t max',
        calculate: (tmin, tteam_total, finalPoints) => {
            if (tmin === finalPoints) {
                return "Impossible to solve tmin == tmax";
            }
            return (tteam_total - tmin * ((finalPoints - 10) / 90)) / ((90 - finalPoints + 10) / 90);
        }
    },
    {
        displayName: 'Calculate t total',
        calculate: (tmin, tmax, finalPoints) => 
            tmax - ((finalPoints - 10) * (tmax - tmin) / 90),
    },
    {
        displayName: 'Calculate Final Points',
        calculate: (tmin, tmax, tteam_total) => 
            Math.max(90 * (tmax - tteam_total) / (tmax - tmin) + 10, 0),
    }
];

createCalculator('Manual Autocross', 
    [
        { id: 'tteam4', placeholder: 'T team - Team\'s best time including penalties' },
        { id: 'tmax4', placeholder: 'T best - Overall best time including penalties (Without factor).' },
        { id: 'finalPoints4', placeholder: 'Final Points (optional)' }
    ],
    formulas_autocross_manual,
    '../assets/autocross/m_autocross.png'
);

createCalculator4('DC Autocross', 
    [
        { id: 'tteam5', placeholder: 'T min - fastest autocross time across all teams' },
        { id: 'tmax5', placeholder: 'T max - the time for driving the lap at 6 m/s' },
        { id: 'ttotal5', placeholder: 'T Total - given formula: min. between first run and average run time of the team' },
        { id: 'finalPoints5', placeholder: 'Final Points (optional)' },
    ],
    formulas_autocross_dc,
    '../assets/autocross/dc_autocross.png'
);

const formulas_endurance = generateFormulas(250, 0.333, 1.333, 1, 0.9)
const formulas_endurance_non_fsg = generateFormulas(325, 0.333, 1.333, 1, 0.9)


createCalculator('Endurance', 
    [
        { id: 'tteam6', placeholder: 'T team - Team\'s corrected elapsed time' },
        { id: 'tmax6', placeholder: 'T best - Overall best corrected elapsed time (Without factor)' },
        { id: 'finalPoints6', placeholder: 'Final Points' }
    ],
    formulas_endurance,
    '../assets/endurance/endurance.png'
);

createCalculator('Endurance Non FSG / FSPT', 
    [
        { id: 'tteam66', placeholder: 'T team - Team\'s corrected elapsed time' },
        { id: 'tmax66', placeholder: 'T best - Overall best corrected elapsed time (Without factor)' },
        { id: 'finalPoints66', placeholder: 'Final Points' }
    ],
    formulas_endurance_non_fsg,
    '../assets/endurance/endurance.png'
);

const formulas_efficiency = [
    {
        displayName: 'Calculate EF team',
        calculate: (ef_min, score) =>
        (1.5 * ef_min) - (score * (1.5 * ef_min - ef_min)) / 75,
    },
    {
        displayName: 'Calculate EF min',
        calculate: (tmin, tteam_total, finalPoints) => 
            "Impossible to solve, any value of tmax would solve this equation",
        
    },
    {
        displayName: 'Calculate final score',
        calculate: (ef_team, ef_min) => 
            75 * ((1.5 * ef_min - ef_team) / (1.5 * ef_min - ef_min)),
    },
];

createCalculator('Efficiency', 
    [
        { id: 'efteam', placeholder: 'EF team - Team\'s efficiency factor' },
        { id: 'efmin', placeholder: 'T min - lowest efficiency factor. EF max = 1.5 EF min' },
        { id: 'score', placeholder: 'Final Score' }
    ],
    formulas_efficiency,
    '../assets/endurance/efficiency.png'
);

const formulas_efficiency_non_fsg = [
    {
        displayName: 'Calculate EF team',
        calculate: (ef_min, score) =>
        (1.5 * ef_min) - (score * (1.5 * ef_min - ef_min)) / 100,
    },
    {
        displayName: 'Calculate EF min',
        calculate: (tmin, tteam_total, finalPoints) => 
            "Impossible to solve, any value of tmax would solve this equation",
        
    },
    {
        displayName: 'Calculate final score',
        calculate: (ef_team, ef_min) => 
            100 * ((1.5 * ef_min - ef_team) / (1.5 * ef_min - ef_min)),
    },
];

createCalculator('Efficiency Non FSG / FSPT', 
    [
        { id: 'efteam99', placeholder: 'EF team - Team\'s efficiency factor' },
        { id: 'efmin99', placeholder: 'T min - lowest efficiency factor. EF max = 1.5 EF min' },
        { id: 'score99', placeholder: 'Final Score' }
    ],
    formulas_efficiency_non_fsg,
    '../assets/endurance/efficiency.png'
);

const formulas_efficiency_factor = [
    {
        displayName: 'Calculate T',
        calculate: (e, ef) => Math.sqrt(ef / e),
    },
    {
        displayName: 'Calculate E',
        calculate: (t, ef) => ef / t**2
        
    },
    {
        displayName: 'Calculate final score',
        calculate: (t, e) => e * t ** 2 ,
    },
];

createCalculator('Efficiency Factor', 
    [
        { id: 'T', placeholder: 'Uncorrected elapsed driving time' },
        { id: 'E', placeholder: 'CV - corrected used fuel mass / EV - used energy' },
        { id: 'EF', placeholder: 'Final Score' }
    ],
    formulas_efficiency_factor,
    '../assets/endurance/efficiency_factor.png'
);



const formulas_trackdrive = [
    {
        displayName: 'Calculate T team',
        calculate: (t_best, score) => (2 * t_best) / (1 + (score / 150)),
    },
    {
        displayName: 'Calculate T best',
        calculate: (t_team, score) => (t_team * (1 + (score /150))) / 2
        
    },
    {
        displayName: 'Calculate final score',
        calculate: (t_team, t_best) => 150 * ((t_best * 2) / t_team - 1) ,
    },
];

createCalculator('Trackdrive', 
    [
        { id: 'tteam10', placeholder: 'T Team - Team\'s corrected elapsed time. Tteam is capped at Tmax' },
        { id: 'tbest10', placeholder: 'T Best - Corrected elapsed time of the fastest vehicle (Without factor). T max is 2 times T Best' },
        { id: 'score10', placeholder: 'Final Score' }
    ],
    formulas_trackdrive,
    '../assets/trackdrive/trackdrive.png'
);
