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
// TODO(marhcouto): better structure with side by side view
// TODO(marhcouto): recalculation process
// TODO(marhcouto): add current formula
// TODO(marhcouto): add more formulas

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

        // Iterate over the map with null inputs
        for (const [id, field] of idInputMapNull) {
            for (formula of field.formulas) {
                const necessaryFields = formula.necessary_ids.map(id => idInputMapNotNull.get(id)?.inputValue);
                console.log(formula.formula_id);
                if (necessaryFields.every(field => field !== undefined)) {
                    console.log("calculating");
                    field.inputValue = formula.calculate(...necessaryFields);
                    console.log(field.inputValue);
                }
            }
        }

        // Update the input fields with the calculated values
        for (const field of allFields) {
            const input = calculatorDiv.querySelector(`#${field.id}`);
            if (!isNaN(field.inputValue)) {
                input.value = field.inputValue;
            }
        }
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
            formulas: [
                {
                    formula_id: 'Cells and Weight',
                    necessary_ids: ['n_par_seg', 'n_series_seg', 'cell_weight'],
                    calculate: (n_par_seg, n_series_seg, cell_weight) => n_par_seg * n_series_seg * cell_weight
                }
            ]
        },
        {
            id: 'acc_n_par', // TODO(marhcouto): Make option for segments in parallel
            placeholder: 'Number of Parallels in the Accumulator',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'seg_n_par',
                    necessary_ids: ['seg_n_par'],
                    calculate: (seg_n_par) => seg_n_par
                }
            ]
        },
        {
            id: 'acc_n_series',
            placeholder: 'Number of Series in the Accumulator',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'seg_n_series_and_n_seg',
                    necessary_ids: ['seg_n_series', 'n_seg'],
                    calculate: (seg_n_series, n_seg) => seg_n_series * n_seg
                }
            ]
        },
        {
            id: 'acc_max_voltage',
            placeholder: 'Accumulator Maximum Voltage',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'cell_max_voltage_and_n_series',
                    necessary_ids: ['acc_n_series', 'cell_max_voltage'],
                    calculate: (acc_n_series, cell_max_voltage) => acc_n_series * cell_max_voltage
                },
                {
                    formula_id: 'seg_max_voltage_and_n_seg',
                    necessary_ids: ['seg_max_voltage', 'n_seg'],
                    calculate: (seg_max_voltage, n_seg) => seg_max_voltage * n_seg
                }
            ]
        },
        {
            id: 'acc_energy',
            placeholder: 'Accumulator Energy',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'Cells and Weight',
                    necessary_ids: ['n_par_seg', 'n_series_seg', 'cell_weight'],
                    calculate: (n_par_seg, n_series_seg, cell_weight) => n_par_seg * n_series_seg * cell_weight
                }
            ]
        },
        {
            id: 'acc_power',
            placeholder: 'Accumulator Power Output',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'Cells and Weight',
                    necessary_ids: ['n_par_seg', 'n_series_seg', 'cell_weight'],
                    calculate: (n_par_seg, n_series_seg, cell_weight) => n_par_seg * n_series_seg * cell_weight
                }
            ]
        },
        {
            id: 'acc_cappacity',
            placeholder: 'Accumulator Capacity',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'Cells and Weight',
                    necessary_ids: ['n_par_seg', 'n_series_seg', 'cell_weight'],
                    calculate: (n_par_seg, n_series_seg, cell_weight) => n_par_seg * n_series_seg * cell_weight
                }
            ]
        },
        {
            id: 'acc_equivalent_resistance',
            placeholder: 'Accumulator Equivalent Resistance',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'Cells and Weight',
                    necessary_ids: ['n_par_seg', 'n_series_seg', 'cell_weight'],
                    calculate: (n_par_seg, n_series_seg, cell_weight) => n_par_seg * n_series_seg * cell_weight
                }
            ]
        },
        {
            id: 'accumulator_maximum_current',
            placeholder: 'Accumulator Maximum Current',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'acc_max_voltage, acc_equivalent_resistance and acc_power',
                    necessary_ids: ['acc_max_voltage', 'acc_equivalent_resistance', 'acc_power'],
                    calculate: (acc_max_voltage, acc_equivalent_resistance, acc_power) => (acc_max_voltage + Math.sqrt(acc_max_voltage**2 - 4 * acc_equivalent_resistance * acc_power)) / (2 * acc_equivalent_resistance)
                }
            ]
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
            formulas: [
                {
                    formula_id: 'Cells and Weight',
                    necessary_ids: ['n_par_seg', 'n_series_seg', 'cell_weight'],
                    calculate: (n_par_seg, n_series_seg, cell_weight) => n_par_seg * n_series_seg * cell_weight
                }
            ]
        },
        {
            id: 'seg_n_series',
            placeholder: 'Number of Series in each Segment',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'Cells and Weight',
                    necessary_ids: ['n_par_seg', 'n_series_seg', 'cell_weight'],
                    calculate: (n_par_seg, n_series_seg, cell_weight) => n_par_seg * n_series_seg * cell_weight
                }
            ]
        },
        {
            id: 'seg_max_voltage',
            placeholder: 'Segment Maximum Voltage',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'Cells and Weight',
                    necessary_ids: ['n_par_seg', 'n_series_seg', 'cell_weight'],
                    calculate: (n_par_seg, n_series_seg, cell_weight) => n_par_seg * n_series_seg * cell_weight
                }
            ]
        },
        {
            id: 'seg_capacity',
            placeholder: 'Segment Capacity',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'Cells and Weight',
                    necessary_ids: ['n_par_seg', 'n_series_seg', 'cell_weight'],
                    calculate: (n_par_seg, n_series_seg, cell_weight) => n_par_seg * n_series_seg * cell_weight
                }
            ]
        },
        {
            id: 'seg_energy',
            placeholder: 'Segment Energy',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'Cells and Weight',
                    necessary_ids: ['n_par_seg', 'n_series_seg', 'cell_weight'],
                    calculate: (n_par_seg, n_series_seg, cell_weight) => n_par_seg * n_series_seg * cell_weight
                }
            ]
        },
        {
            id: 'segment_equivalent_resistance',
            placeholder: 'Segment Equivalent Resistance',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'Cells and Weight',
                    necessary_ids: ['n_par_seg', 'n_series_seg', 'cell_weight'],
                    calculate: (n_par_seg, n_series_seg, cell_weight) => n_par_seg * n_series_seg * cell_weight
                }
            ]
        },
        {
            id: 'seg_weight',
            placeholder: 'Segment Weight',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'cell_num_and_cell_weight',
                    necessary_ids: ['n_par_seg', 'n_series_seg', 'cell_weight'],
                    calculate: (n_par_seg, n_series_seg, cell_weight) => n_par_seg * n_series_seg * cell_weight
                },
                {
                    formula_id: 'seg_num_and_acc_weight',
                    necessary_ids: ['acc_weight', 'n_seg'],
                    calculate: (acc_weight, n_seg) => acc_weight / n_seg
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
            formulas: [
                {
                    formula_id: 'Cells and Weight',
                    necessary_ids: ['n_par_seg', 'n_series_seg', 'cell_weight'],
                    calculate: (n_par_seg, n_series_seg, cell_weight) => n_par_seg * n_series_seg * cell_weight
                }
            ]
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
            formulas: [
                {
                    formula_id: 'Cells and Weight',
                    necessary_ids: ['n_par_seg', 'n_series_seg', 'cell_weight'],
                    calculate: (n_par_seg, n_series_seg, cell_weight) => n_par_seg * n_series_seg * cell_weight
                }
            ]
        },
        {
            id: 'cell_energy',
            placeholder: 'Cell Energy',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'Cells and Weight',
                    necessary_ids: ['n_par_seg', 'n_series_seg', 'cell_weight'],
                    calculate: (n_par_seg, n_series_seg, cell_weight) => n_par_seg * n_series_seg * cell_weight
                }
            ]
        },
        {
            id: 'cell_internal_resistance',
            placeholder: 'Cell Internal Resistance',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'Cells and Weight',
                    necessary_ids: ['n_par_seg', 'n_series_seg', 'cell_weight'],
                    calculate: (n_par_seg, n_series_seg, cell_weight) => n_par_seg * n_series_seg * cell_weight
                }
            ]
        },
        {
            id: 'cell_weight',
            placeholder: 'Cell Weight',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'Cells and Weight',
                    necessary_ids: ['n_par_seg', 'n_series_seg', 'cell_weight'],
                    calculate: (n_par_seg, n_series_seg, cell_weight) => n_par_seg * n_series_seg * cell_weight
                }
            ]
        }
    ]
    },
];

createCalculator('Accumulator Segments Calculator', 
    sections,
);
