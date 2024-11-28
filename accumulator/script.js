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

    const allFields = sections.map(section => section.fields).flat();

    const button = document.createElement('button');
    button.innerText = 'Calculate';
    button.onclick = () => {

        // Get input values
        for (const field of allFields) {
            const input = calculatorDiv.querySelector(`#${field.id}`);
            field.inputValue = parseFloat(input.value);
        }
        
        // Divide the fields into null and non null fields
        // Map format for quick lookup
        const idInputMapNotNull = new Map(allFields.filter(field => !isNaN(field.inputValue)).map(field => [field.id, field]));
        const idInputMapNull = new Map(allFields.filter(field => isNaN(field.inputValue)).map(field => [field.id, field]));


        console.log(idInputMapNotNull);
        console.log(idInputMapNull);

        // Iterate over the map with null inputs
        for (const [id, field] of idInputMapNull) {
            for (formula of field.formulas) {
                const necessaryFields = formula.necessary_ids.map(id => idInputMapNotNull.get(id).inputValue);
                field.inputValue = formula.calculate(...necessaryFields);
            }
        }

        // // Create a map out of the fields with the id as the key
        // const fieldsMap = allFields.reduce((map, field) => {
        //     map[field.id] = field;
        //     return map;
        // }, {});
        // console.log(fieldsMap);



        // let result;
        // if (missingIndex === 0) {
        //     // Missing inputValue for first input
        //     const [ , pmax, final] = inputValues; // Skip the first inputValue
        //     result = fields[0].calculate(pmax, final);
        // } else if (missingIndex === 1) {
        //     // Missing inputValue for second input
        //     const [pteam, , final] = inputValues; // Skip the second inputValue
        //     result = fields[1].calculate(pteam, final);
        // } else if (missingIndex === 2) {
        //     // Missing inputValue for third input
        //     const [pteam, pmax] = inputValues.slice(0, 2); // Use only the first two values
        //     result = fields[2].calculate(pteam, pmax);
        // } else {
        //     result = 'Please leave one input empty to calculate the missing inputValue.';
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
            inputValue: null,
            calculate: (pmax, final) => final * pmax / 70
        },
        {
            id: 'acc_n_par',
            placeholder: 'Number of Parallels in the Accumulator',
            inputValue: null,
            calculate: (pmax, final) => final * pmax / 70
        },
        {
            id: 'acc_n_series',
            placeholder: 'Number of Series in the Accumulator',
            inputValue: null,
            calculate: (pmax, final) => final * pmax / 70
        },
        // {
        //     id: 'acc_nom_voltage',
        //     placeholder: 'Accumulator Nominal Voltage',
        //     inputValue: null,     
        //     calculate: (pmax, final) => final * pmax / 70
        // },
        {
            id: 'acc_max_voltage',
            placeholder: 'Accumulator Maximum Voltage',
            inputValue: null,
            calculate: (pmax, final) => final * pmax / 70
        },
        {
            id: 'acc_energy',
            placeholder: 'Accumulator Energy',
            inputValue: null,
            calculate: (pmax, final) => final * pmax / 70
        },
        {
            id: 'acc_cappacity',
            placeholder: 'Accumulator Capacity',
            inputValue: null,
            calculate: (pmax, final) => final * pmax / 70
        },
        {
            id: 'acc_weight',
            placeholder: 'Accumulator Weight',
            inputValue: null,
            formulas: [
            {
                formula_id: 'seg_num_and_weight',
                necessary_ids: ['n_seg', 'seg_weight'],
                calculate: (n_seg, seg_weight) => n_seg * seg_weight
            },
            {
                formula_id: 'cell_num_and_weight',
                necessary_ids: ['n_par_seg', 'n_series_seg', 'cell_weight'],
                calculate: (n_par_seg, n_series_seg, cell_weight) => n_par_seg * n_series_seg * cell_weight
            },
            ]
        },
    ]
    },
    {
        section_name: 'Segment',
        fields: [
        {
            id: 'seg_n_par',
            placeholder: 'Number of Parallels in each Segment',
            inputValue: null,
            calculate: (pteam, final) => (70 * pteam) / final
        },
        {
            id: 'seg_n_series',
            placeholder: 'Number of Series in each Segment',
            inputValue: null,
            calculate: (pteam, pmax) => (70 * (pteam / pmax))
        },
        {
            id: 'seg_max_voltage',
            placeholder: 'Segment Maximum Voltage',
            inputValue: null,
            calculate: (pteam, pmax) => (70 * (pteam / pmax))
        },
        {
            id: 'seg_capacity',
            placeholder: 'Segment Capacity',
            inputValue: null,
            calculate: (pteam, pmax) => (70 * (pteam / pmax))
        },
        {
            id: 'seg_energy',
            placeholder: 'Segment Energy',
            inputValue: null,
            calculate: (pteam, pmax) => (70 * (pteam / pmax))
        },
        {
            id: 'seg_weight',
            placeholder: 'Segment Weight',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'Cells and Weight',
                    necessary_ids: ['n_par_seg', 'n_series_seg', 'cell_weight'],
                    calculate: (n_par_seg, n_series_seg, cell_weight) => n_par_seg * n_series_seg * cell_weight
                }
            ]
        },
    ]
    },
    {
        section_name: 'Cell',
        fields: [
        // {
        //     id: 'cell_nom_voltage',
        //     placeholder: 'Cell Nominal Voltage',
        //     inputValue: null,     
        //     calculate: (pteam, final) => (70 * pteam) / final
        // },
        {
            id: 'cell_max_voltage',
            placeholder: 'Cell Maximum Voltage',
            inputValue: null,
            calculate: (pteam, pmax) => (70 * (pteam / pmax))
        },
        // {
        //     id: 'cell_min_voltage',
        //     placeholder: 'Cell Minimum Voltage',
        //     inputValue: null,     
        //     calculate: (pteam, pmax) => (70 * (pteam / pmax))
        // },
        {
            id: 'cell_capacity',
            placeholder: 'Cell Capacity',
            inputValue: null,
            calculate: (pteam, pmax) => (70 * (pteam / pmax))
        },
        {
            id: 'cell_energy',
            placeholder: 'Cell Energy',
            inputValue: null,
            calculate: (pteam, pmax) => (70 * (pteam / pmax))
        },
        {
            id: 'cell_weight',
            placeholder: 'Cell Weight',
            inputValue: null,
            calculate: (pteam, pmax) => (70 * (pteam / pmax))
        }]
    },
];

createCalculator('Accumulator Segments Calculator', 
    sections,
);
