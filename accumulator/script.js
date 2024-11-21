function createSection(subTitleName, fields, motherDiv) {
    const sectionDiv = document.createElement('div');
    const subTitle3 = document.createElement('h3');
    subTitle3.innerText = subTitleName;
    motherDiv.appendChild(sectionDiv);
    sectionDiv.appendChild(subTitle3);

    // Create input fields
    fields.forEach(field => {
        const input = document.createElement('input');
        input.type = 'number';
        input.id = field.id;
        input.placeholder = field.placeholder;
        input.dispatchEvent(new Event('input'));
        sectionDiv.appendChild(input);
    });
}

function createCalculator(title, sections, imageUrl) {
    const calculatorDiv = document.createElement('div');
    calculatorDiv.className = 'calculator';

    
    // Create title element
    const titleElement = document.createElement('h2');
    titleElement.innerText = title;
    calculatorDiv.appendChild(titleElement);
    
    // Create image element if imageUrl is provided
    // if (imageUrl) {
    //     const image = document.createElement('img');
    //     image.src = imageUrl;
    //     image.alt = 'Calculator Image';
    //     image.className = 'calculator-image';
    //     calculatorDiv.appendChild(image);
    // }

    sections.forEach(section => {
        createSection(section.section_name, section.fields, calculatorDiv);
    });

    const button = document.createElement('button');
    button.innerText = 'Calculate';
    button.onclick = () => {
        // Get input values
        // const inputValues = inputFields.map(field => parseFloat(document.getElementById(field.id).value));
        
        // // Determine which value is missing
        // let missingIndex = inputValues.findIndex(value => isNaN(value));
        
        // let result;
        // if (missingIndex === 0) {
        //     // Missing value for first input
        //     const [ , pmax, final] = inputValues; // Skip the first value
        //     result = fields[0].calculate(pmax, final);
        // } else if (missingIndex === 1) {
        //     // Missing value for second input
        //     const [pteam, , final] = inputValues; // Skip the second value
        //     result = fields[1].calculate(pteam, final);
        // } else if (missingIndex === 2) {
        //     // Missing value for third input
        //     const [pteam, pmax] = inputValues.slice(0, 2); // Use only the first two values
        //     result = fields[2].calculate(pteam, pmax);
        // } else {
        //     result = 'Please leave one input empty to calculate the missing value.';
        // }
        
        // let resultParagraph = calculatorDiv.querySelector('.result');
        
        // if (!resultParagraph) {
        //     resultParagraph = document.createElement('p');
        //     resultParagraph.className = 'result';
        //     calculatorDiv.appendChild(resultParagraph);
        // }
    
        // resultParagraph.innerText = `Result: ${result}`;
    };

    calculatorDiv.appendChild(button);
    document.getElementById('calculator-container').appendChild(calculatorDiv);
}


const sections = [
    {
        section_name: 'Accumulator',
        fields: [{
            id: 'n_seg',
            placeholder: 'Number of Segments',
            calculate: (pmax, final) => final * pmax / 70
        },
        {
            id: 'n_par',
            placeholder: 'Number of Parallels in the Accumulator',
            calculate: (pmax, final) => final * pmax / 70
        },
        {
            id: 'n_series',
            placeholder: 'Number of Series in the Accumulator',
            calculate: (pmax, final) => final * pmax / 70
        },
        {
            id: 'acc_weight',
            placeholder: 'Accumulator Weight',
            calculate: (pmax, final) => final * pmax / 70
        },
    ]
    },
    {
        section_name: 'Cell',
        fields: [{
            id: 'cell_nom_voltage',
            placeholder: 'Cell Nominal Voltage',
            calculate: (pteam, final) => (70 * pteam) / final
        },
        {
            id: 'cell_max_voltage',
            placeholder: 'Cell Maximum Voltage',
            calculate: (pteam, pmax) => (70 * (pteam / pmax))
        },
        {
            id: 'cell_min_voltage',
            placeholder: 'Cell Minimum Voltage',
            calculate: (pteam, pmax) => (70 * (pteam / pmax))
        },
        {
            id: 'cell_nom_capacity',
            placeholder: 'Nominal Capacity',
            calculate: (pteam, pmax) => (70 * (pteam / pmax))
        },
        {
            id: 'cell_weight',
            placeholder: 'Cell Weight',
            calculate: (pteam, pmax) => (70 * (pteam / pmax))
        }]
    },
];

createCalculator('Accumulator Segments Calculator', 
    sections,
);
