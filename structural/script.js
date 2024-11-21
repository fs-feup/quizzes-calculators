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
        if (missingIndex === 0) {
            // Missing value for first input
            const [ , pmax, final] = inputValues; // Skip the first value
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


const formula_rectangle_x_bar = [
    {
        displayName: 'Calculate x_bar',
        calculate: (B) => B / 2
    },
    {
        displayName: 'Calculate B',
        calculate: (x_bar) => x_bar * 2
    }
];

const formula_rectangle_y_bar = [
    {
        displayName: 'Calculate y_bar',
        calculate: (H) => H / 2
    },
    {
        displayName: 'Calculate H',
        calculate: (y_bar) => y_bar * 2
    }
];


const formula_rectangle_area = [
    {
        displayName: 'Calculate area',
        calculate: (B1, H1) => B1 * H1
    },
    {
        displayName: 'Calculate B',
        calculate: (area, H1) => area / H1
    },
    {
        displayName: 'Calculate H',
        calculate: (area, B1) => area / B1
    }
];

const formula_rectangle_I_x_bar = [
    {
        displayName: 'Calculate I_x_bar',
        calculate: (B2, H2) => (B2 * H2**3) / 12
    },
    {
        displayName: 'Calculate B',
        calculate: (I_x_bar, H2) => (12 * I_x_bar) / H2**3
    },
    {
        displayName: 'Calculate H',
        calculate: (I_x_bar, B2) => ((12*I_x_bar) / B2)**(1/3)
    }
];

const formula_rectangle_I_y_bar = [
    {
        displayName: 'Calculate I_y_bar',
        calculate: (B3, H3) => (H3 * B3**3) / 12
    },
    {
        displayName: 'Calculate B',
        calculate: (I_y_bar, H3) => ((12*I_y_bar) / H3)**(1/3)
    },
    {
        displayName: 'Calculate H',
        calculate: (I_y_bar, B3) => (12 * I_y_bar) / B3**3
    }
];


createCalculator('Rectangle x bar', 
    [
        { id: 'x_bar', placeholder: 'x_bar' },
        { id: 'B', placeholder: 'B' }
    ],
    formula_rectangle_x_bar,
    '../assets/structural/rectangle_x_bar.png'
);

createCalculator('Rectangle y bar', 
    [
        { id: 'y_bar', placeholder: 'y_bar' },
        { id: 'H', placeholder: 'H' }
    ],
    formula_rectangle_y_bar,
    '../assets/structural/rectangle_y_bar.png'
);

createCalculator('Rectangle area', 
    [
        { id: 'area', placeholder: 'area' },
        { id: 'B1', placeholder: 'B' },
        { id: 'H1', placeholder: 'H' }
    ],
    formula_rectangle_area,
    '../assets/structural/rectangle_area.png'
);

createCalculator('Rectangle I x bar', 
    [
        { id: 'I_x_bar', placeholder: 'I x bar' },
        { id: 'B2', placeholder: 'B' },
        { id: 'H2', placeholder: 'H' }
    ],
    formula_rectangle_I_x_bar,
    '../assets/structural/rectangle_I_x_bar.png'
);

createCalculator('Rectangle I y bar', 
    [
        { id: 'I_y_bar', placeholder: 'I y bar' },
        { id: 'B3', placeholder: 'B' },
        { id: 'H3', placeholder: 'H' }
    ],
    formula_rectangle_I_y_bar,
    '../assets/structural/rectangle_I_y_bar.png'
);
