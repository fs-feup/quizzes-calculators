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

        // Add event listener to change text color back to black on input
        input.addEventListener('input', () => {
            input.style.color = 'black';
        });

        const text = document.createElement('div');
        text.innerText = field.placeholder;
        sectionDiv.appendChild(text);
        sectionDiv.appendChild(input);
    });
}

const CALCULATION_LIMIT = 5;
function validByRules(fieldName, value) {
    if (fieldName === 'seg_energy' && value > 6000000) {
        return false;
    } else if (fieldName === "acc_max_voltage" && value > 600) {
        return false;
    } else if (fieldName === "seg_weight" && value > 12000) {
        return false;
    } else if (fieldName === "seg_max_voltage" && value > 120) {
        return false;
    }
    return true;
}

function createCalculator(title, sections, divId) {
    const calculatorDiv = document.createElement('div');
    calculatorDiv.className = 'calculator';

    
    // Create title element
    const titleElement = document.createElement('h2');
    titleElement.innerText = title;
    calculatorDiv.appendChild(titleElement);

    // Create notes section
    const notes = document.createElement('div');
    const notesSubTitle = document.createElement('h3');
    notesSubTitle.innerText = 'Configurations';
    const instructions = document.createElement('div');
    instructions.innerText = 'To use the calculator, fill in the fields with the values you have and click the calculate button.\
    The calculator will calculate all the missing values it possibly can, which will show blue.\
    Red values indicate that the value is violating rules.\
    If you want to calculate for an accumulator with the segments in parallel, check the box below.\
    \nCalculations take into account SI units.';
    const checkBoxDiv = document.createElement('p');
    checkBoxDiv.id = 'segments-checkbox-div';
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.id = 'segments-checkbox';
    const checkBoxText = document.createElement('span');
    checkBoxText.innerText = 'Segments are in parallel?:';
    checkBoxText.id = 'segments-checkbox-text';
    checkBoxDiv.appendChild(checkBoxText);
    checkBoxDiv.appendChild(checkBox);
    const rulesDiv = document.createElement('div');
    const rulesText = document.createElement('h3');
    const rules = document.createElement('span');
    rulesText.innerText = 'Rules';
    rules.innerText = 'EV 4.1.1 The maximum allowed voltage\
     that may occur between any two electric connections is 600 V DC\
     and for motor controller and Accumulator Management System (AMS)\
     internal low power control signals 630 V DC.\n\n\
     EV 5.3.2 Each TS accumulator segment must not exceed a maximum\
     static voltage of 120 V DC, amaximum energy of 6 MJ, see EV 5.1.2,\
     and a maximum mass of 12 kg.';
    rules.innerHTML = rules.innerHTML.replace(/600 V DC/g, '<b>600 V DC</b>');
    rules.innerHTML = rules.innerHTML.replace(/630 V DC/g, '<b>630 V DC</b>');
    rules.innerHTML = rules.innerHTML.replace(/12 kg/g, '<b>12 kg</b>');
    rules.innerHTML = rules.innerHTML.replace(/120 V DC/g, '<b>120 V DC</b>');
    rules.innerHTML = rules.innerHTML.replace(/6 MJ/g, '<b>6 MJ</b>');
    instructions.innerHTML = instructions.innerHTML.replace(/calculate all the missing values it possibly can/g, '<b>calculate all the missing values it possibly can</b>');
    instructions.innerHTML = instructions.innerHTML.replace(/violating rules/g, '<b>violating rules</b>');
    instructions.innerHTML = instructions.innerHTML.replace(/blue/g, '<span style="color:blue">blue</span>');
    instructions.innerHTML = instructions.innerHTML.replace(/Red/g, '<span style="color:red">Red</span>');
    rulesDiv.appendChild(rulesText);
    rulesDiv.appendChild(rules);
    notes.appendChild(instructions);
    notes.appendChild(notesSubTitle);
    notes.appendChild(checkBoxDiv);
    notes.appendChild(rulesDiv);
    calculatorDiv.appendChild(notes);
    
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
    let calculatedFields = [];

    const calculateButton = document.createElement('button');
    calculateButton.innerText = 'Calculate';
    calculateButton.onclick = () => {

        calculatedFields = [];
        let segments_in_par = document.getElementById('segments-checkbox').checked;

        // Because only direct formulas are used, we need to run
        // the calculation multiple times to ensure all possible fields are calculated
        let calculated_some = false; 
        let cycle_count = 0; 
        do {
            calculated_some = false;

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
                    if (necessaryFields.every(field => field !== undefined)) {
                        console.log(`Calculating ${field.id} with formula ${formula.formula_id}`);
                        calculated_some = true;
                        field.inputValue = formula.calculate(segments_in_par, ...necessaryFields);
                        console.log(`Calculated ${field.id} with value ${field.inputValue}`);
                    }
                }
            }

            // Update the input fields with the calculated values and turn the text blue
            for (const field of idInputMapNull.values()) {
                const input = calculatorDiv.querySelector(`#${field.id}`);
                if (!isNaN(field.inputValue)) {
                    input.value = field.inputValue;
                    // If the field is the segment energy and the value is greater than 6 MJ, turn the text red
                    input.style.color = validByRules(field.id, field.inputValue) ? 'blue' : 'red';
                    calculatedFields.push(field);
                }
            }
            cycle_count++;
        } while (calculated_some && cycle_count < CALCULATION_LIMIT);

    };

    const resetCalculatedButton = document.createElement('button');
    resetCalculatedButton.innerText = 'Reset Calculated Fields';
    resetCalculatedButton.onclick = () => {
        for (const field of calculatedFields) {
            console.log(`Resetting ${field.id}`);
            const input = calculatorDiv.querySelector(`#${field.id}`);
            input.value = '';
            input.style.color = 'black';
        }
    };

    // Make the buttons separate
    const div1 = document.createElement('div');
    div1.style.marginTop = '10px';

    calculatorDiv.appendChild(calculateButton);
    calculatorDiv.appendChild(div1);
    calculatorDiv.appendChild(resetCalculatedButton);
    document.getElementById(divId).appendChild(calculatorDiv);
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
                    formula_id: 'acc_weight_and_seg_weight',
                    necessary_ids: ['acc_weight', 'seg_weight'],
                    calculate: (segs_in_par, acc_weight, seg_weight) => Math.floor(acc_weight / seg_weight)
                },
                {
                    formula_id: 'acc_max_voltage_and_seg_max_voltage',
                    necessary_ids: ['acc_max_voltage', 'seg_max_voltage'],
                    calculate: (segs_in_par, acc_max_voltage, seg_max_voltage) => !segs_in_par ? Math.floor(acc_max_voltage / seg_max_voltage) : seg_max_voltage
                },
                {
                    formula_id: 'seg_n_series_and_acc_n_series',
                    necessary_ids: ['seg_n_series', 'acc_n_series'],
                    calculate: (segs_in_par, seg_n_series, acc_n_series) => !segs_in_par ? Math.floor(acc_n_series / seg_n_series) : undefined
                },
                {
                    formula_id: 'seg_n_par_and_acc_n_par',
                    necessary_ids: ['seg_n_par', 'acc_n_par'],
                    calculate: (segs_in_par, seg_n_par, acc_n_par) => !segs_in_par ? undefined : acc_n_par / seg_n_par
                },
                {
                    formula_id: 'acc_n_par',
                    necessary_ids: ['acc_n_par'],
                    calculate: (segs_in_par, acc_n_par) => acc_n_par
                },
                {
                    formula_id: 'acc_energy_and_seg_energy',
                    necessary_ids: ['acc_energy', 'seg_energy'],
                    calculate: (segs_in_par, acc_energy, seg_energy) => Math.floor(acc_energy / seg_energy)
                },
                {
                    formula_id: 'acc_capacity_and_seg_capacity',
                    necessary_ids: ['acc_capacity', 'seg_capacity'],
                    calculate: (segs_in_par, acc_capacity, seg_capacity) => !segs_in_par ? undefined : Math.floor(acc_capacity / seg_capacity)
                }
            ]
        },
        {
            id: 'acc_n_par', // TODO(marhcouto): Make option for segments in par
            placeholder: 'Number of parallels in the Accumulator',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'n_seg_and_seg_n_par',
                    necessary_ids: ['n_seg', 'seg_n_par'],
                    calculate: (segs_in_par, n_seg, seg_n_par) => !segs_in_par ? seg_n_par : seg_n_par * n_seg
                },
                {
                    formula_id: 'acc_energy_and_acc_n_series_and_cell_energy',
                    necessary_ids: ['acc_energy', 'acc_n_series','cell_energy'],
                    calculate: (segs_in_par, acc_energy, acc_n_series, cell_energy) => Math.floor(acc_energy / (cell_energy * acc_n_series))
                },
                {
                    formula_id: 'acc_capacity_and_cell_capacity',
                    necessary_ids: ['acc_capacity', 'cell_capacity'],
                    calculate: (segs_in_par, acc_capacity, cell_capacity) => Math.floor(acc_capacity / cell_capacity)
                },
                {
                    formula_id: 'acc_internal_resistance_and_acc_n_series_and_cell_internal_resistance',
                    necessary_ids: ['acc_equivalent_resistance', 'acc_n_series','cell_internal_resistance'],
                    calculate: (segs_in_par, acc_equivalent_resistance, acc_n_series, cell_internal_resistance) => Math.floor(cell_internal_resistance * acc_n_series / acc_equivalent_resistance)
                },
                {
                    formula_id: 'acc_weight_and_acc_n_series_and_cell_weight',
                    necessary_ids: ['acc_weight', 'acc_n_series','cell_weight'],
                    calculate: (segs_in_par, acc_weight, acc_n_series, cell_weight) => Math.floor(acc_weight / (cell_weight * acc_n_series))
                },
            ]
        },
        {
            id: 'acc_n_series',
            placeholder: 'Number of series in the Accumulator',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'seg_n_series_and_n_seg',
                    necessary_ids: ['seg_n_series', 'n_seg'],
                    calculate: (segs_in_par, seg_n_series, n_seg) => !segs_in_par ? seg_n_series * n_seg : seg_n_series
                },
                {
                    formula_id: 'acc_max_voltage_and_cell_max_voltage',
                    necessary_ids: ['acc_max_voltage', 'cell_max_voltage'],
                    calculate: (segs_in_par, acc_max_voltage, cell_max_voltage) => Math.floor(acc_max_voltage / cell_max_voltage)
                },
                {
                    formula_id: 'acc_energy_and_acc_n_par_and_cell_energy',
                    necessary_ids: ['acc_energy', 'acc_n_par','cell_energy'],
                    calculate: (segs_in_par, acc_energy, acc_n_par, cell_energy) => Math.floor(acc_energy / (cell_energy * acc_n_par))
                },
                {
                    formula_id: 'acc_internal_resistance_and_acc_n_par_and_cell_internal_resistance',
                    necessary_ids: ['acc_equivalent_resistance', 'acc_n_par','cell_internal_resistance'],
                    calculate: (segs_in_par, acc_equivalent_resistance, acc_n_par, cell_internal_resistance) => Math.floor(acc_equivalent_resistance * acc_n_par / cell_internal_resistance)
                },
                {
                    formula_id: 'acc_weight_and_acc_n_par_and_cell_weight',
                    necessary_ids: ['acc_weight', 'acc_n_par','cell_weight'],
                    calculate: (segs_in_par, acc_weight, acc_n_par, cell_weight) => Math.floor(acc_weight / (cell_weight * acc_n_par))
                },
            ]
        },
        {
            id: 'acc_max_voltage',
            placeholder: 'Accumulator Maximum Voltage (Volts)',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'acc_capacity_and_acc_energy',
                    necessary_ids: ['acc_capacity', 'acc_energy'],
                    calculate: (segs_in_par, acc_capacity, acc_energy) => acc_energy / (acc_capacity * 3600)
                },
                {
                    formula_id: 'cell_max_voltage_and_acc_n_series',
                    necessary_ids: ['acc_n_series', 'cell_max_voltage'],
                    calculate: (segs_in_par, acc_n_series, cell_max_voltage) => acc_n_series * cell_max_voltage
                },
                {
                    formula_id: 'seg_max_voltage_and_n_seg',
                    necessary_ids: ['seg_max_voltage', 'n_seg'],
                    calculate: (segs_in_par, seg_max_voltage, n_seg) => !segs_in_par ? seg_max_voltage * n_seg : seg_max_voltage
                }
            ]
        },
        {
            id: 'acc_power',
            placeholder: 'Accumulator Power Output (Watts)',
            inputValue: null,
            formulas: [
                {
                    formula_id: '-',
                    necessary_ids: ['seg_n_par', 'seg_n_series', 'cell_weight'],
                    calculate: () => undefined
                }
            ]
        },
        {
            id: 'acc_cappacity',
            placeholder: 'Accumulator Capacity (Ah)',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'seg_capacity_and_n_seg',
                    necessary_ids: ['seg_capacity', 'n_seg'],
                    calculate: (segs_in_par, seg_capacity, n_seg) => seg_capacity * n_seg
                },
                {
                    formula_id: 'cell_capacity_and_acc_n_par',
                    necessary_ids: ['acc_n_par', 'cell_capacity'],
                    calculate: (segs_in_par, acc_n_par, cell_capacity) => acc_n_par * cell_capacity
                },
                {
                    formula_id: 'acc_energy_and_acc_max_voltage',
                    necessary_ids: ['acc_energy', 'acc_max_voltage'],
                    calculate: (segs_in_par, acc_energy, acc_max_voltage) => acc_energy / (acc_max_voltage * 3600)
                }
            ]
        },
        {
            id: 'acc_energy',
            placeholder: 'Accumulator Energy (Joules)',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'seg_energy_and_n_seg',
                    necessary_ids: ['seg_energy', 'n_seg'],
                    calculate: (segs_in_par, seg_energy, n_seg) => seg_energy * n_seg
                },
                {
                    formula_id: 'cell_energy_and_acc_n_series_and_acc_n_par',
                    necessary_ids: ['acc_n_series', 'acc_n_par', 'cell_energy'],
                    calculate: (segs_in_par, acc_n_series, acc_n_par, cell_energy) => acc_n_series * acc_n_par * cell_energy
                },
                {
                    formula_id: 'acc_capacity_and_acc_max_voltage',
                    necessary_ids: ['acc_capacity', 'acc_max_voltage'],
                    calculate: (segs_in_par, acc_capacity, acc_max_voltage) => acc_capacity * 3600 * acc_max_voltage
                }
            ]
        },
        {
            id: 'acc_equivalent_resistance',
            placeholder: 'Accumulator Equivalent Resistance (Ohms)',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'cell_internal_resistance_and_acc_n_series_and_acc_n_par',
                    necessary_ids: ['cell_internal_resistance', 'acc_n_series', 'acc_n_par'],
                    calculate: (segs_in_par, cell_internal_resistance, acc_n_series, acc_n_par) => cell_internal_resistance * acc_n_series / acc_n_par
                },
                {
                    formula_id: 'n_seg_and_seg_internal_resistance',
                    necessary_ids: ['n_seg', 'seg_equivalent_resistance'],
                    calculate: (segs_in_par, n_seg, seg_equivalent_resistance) => !segs_in_par ? seg_equivalent_resistance * n_seg : seg_equivalent_resistance / n_seg
                }
            ]
        },
        {
            id: 'accumulator_maximum_current',
            placeholder: 'Accumulator Maximum Current (Amperes)',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'acc_max_voltage, acc_equivalent_resistance and acc_power',
                    necessary_ids: ['acc_max_voltage', 'acc_equivalent_resistance', 'acc_power'],
                    calculate: (segs_in_par, acc_max_voltage, acc_equivalent_resistance, acc_power) => (acc_max_voltage + Math.sqrt(acc_max_voltage**2 - 4 * acc_equivalent_resistance * acc_power)) / (2 * acc_equivalent_resistance)
                }
            ]
        },
        {
            id: 'accumulator_maximum_current_2',
            placeholder: 'Accumulator Maximum Current (Second Value) (Amperes)',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'acc_max_voltage, acc_equivalent_resistance and acc_power',
                    necessary_ids: ['acc_max_voltage', 'acc_equivalent_resistance', 'acc_power'],
                    calculate: (segs_in_par, acc_max_voltage, acc_equivalent_resistance, acc_power) => (acc_max_voltage - Math.sqrt(acc_max_voltage**2 - 4 * acc_equivalent_resistance * acc_power)) / (2 * acc_equivalent_resistance)
                }
            ]
        },
        {
            id: 'acc_weight',
            placeholder: 'Accumulator Weight (grams)',
            inputValue: null,
            formulas: [
            {
                formula_id: 'seg_num_and_seg_weight',
                necessary_ids: ['n_seg', 'seg_weight'],
                calculate: (segs_in_par, n_seg, seg_weight) => n_seg * seg_weight
            },
            {
                formula_id: 'cell_num_and_cell_weight',
                necessary_ids: ['acc_n_par', 'acc_n_series', 'cell_weight'],
                calculate: (segs_in_par, seg_n_par, seg_n_series, cell_weight) => seg_n_par * seg_n_series * cell_weight
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
            placeholder: 'Number of pars in each Segment',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'n_seg_and_acc_n_par',
                    necessary_ids: ['n_seg', 'acc_n_par'],
                    calculate: (segs_in_par, n_seg, acc_n_par) => !segs_in_par ? acc_n_par : acc_n_par / n_seg
                },
                {
                    formula_id: 'seg_energy_and_seg_n_series_and_cell_energy',
                    necessary_ids: ['seg_energy', 'seg_n_series','cell_energy'],
                    calculate: (segs_in_par, seg_energy, seg_n_series, cell_energy) => Math.floor(seg_energy / (cell_energy * seg_n_series))
                },
                {
                    formula_id: 'seg_capacity_and_cell_capacity',
                    necessary_ids: ['seg_capacity', 'cell_capacity'],
                    calculate: (segs_in_par, seg_capacity, cell_capacity) => Math.floor(seg_capacity / cell_capacity)
                },
                {
                    formula_id: 'seg_internal_resistance_and_seg_n_series_and_cell_internal_resistance',
                    necessary_ids: ['seg_equivalent_resistance', 'seg_n_series','cell_internal_resistance'],
                    calculate: (segs_in_par, seg_equivalent_resistance, seg_n_series, cell_internal_resistance) => Math.floor(cell_internal_resistance * seg_n_series / seg_equivalent_resistance)
                },
                {
                    formula_id: 'seg_weight_and_seg_n_series_and_cell_weight',
                    necessary_ids: ['seg_weight', 'seg_n_series','cell_weight'],
                    calculate: (segs_in_par, seg_weight, seg_n_series, cell_weight) => Math.floor(seg_weight / (cell_weight * seg_n_series))
                },
            ]
        },
        {
            id: 'seg_n_series',
            placeholder: 'Number of Series in each Segment',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'acc_n_series_and_n_seg',
                    necessary_ids: ['acc_n_series', 'n_seg'],
                    calculate: (segs_in_par, acc_n_series, n_seg) => !segs_in_par ? acc_n_series / n_seg : acc_n_series
                },
                {
                    formula_id: 'seg_max_voltage_and_cell_max_voltage',
                    necessary_ids: ['seg_max_voltage', 'cell_max_voltage'],
                    calculate: (segs_in_par, seg_max_voltage, cell_max_voltage) => Math.floor(seg_max_voltage / cell_max_voltage)
                },
                {
                    formula_id: 'seg_energy_and_seg_n_par_and_cell_energy',
                    necessary_ids: ['seg_energy', 'seg_n_par','cell_energy'],
                    calculate: (segs_in_par, seg_energy, seg_n_par, cell_energy) => Math.floor(seg_energy / (cell_energy * seg_n_par))
                },
                {
                    formula_id: 'seg_internal_resistance_and_seg_n_par_and_cell_internal_resistance',
                    necessary_ids: ['seg_equivalent_resistance', 'seg_n_par','cell_internal_resistance'],
                    calculate: (segs_in_par, seg_equivalent_resistance, seg_n_par, cell_internal_resistance) => Math.floor(seg_equivalent_resistance * seg_n_par / cell_internal_resistance)
                },
                {
                    formula_id: 'seg_weight_and_seg_n_par_and_cell_weight',
                    necessary_ids: ['seg_weight', 'seg_n_par','cell_weight'],
                    calculate: (segs_in_par, seg_weight, seg_n_par, cell_weight) => Math.floor(seg_weight / (cell_weight * seg_n_par))
                },
            ]
        },
        {
            id: 'seg_max_voltage',
            placeholder: 'Segment Maximum Voltage (Volts)',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'seg_capacity_and_seg_energy',
                    necessary_ids: ['seg_capacity', 'seg_energy'],
                    calculate: (segs_in_par, seg_capacity, seg_energy) => seg_energy / (seg_capacity * 3600)
                },
                {
                    formula_id: 'cell_max_voltage_and_seg_n_series',
                    necessary_ids: ['seg_n_series', 'cell_max_voltage'],
                    calculate: (segs_in_par, seg_n_series, cell_max_voltage) => seg_n_series * cell_max_voltage
                },
                {
                    formula_id: 'acc_max_voltage_and_n_seg',
                    necessary_ids: ['n_seg', 'acc_max_voltage'],
                    calculate: (segs_in_par, n_seg, acc_max_voltage) => !segs_in_par ? acc_max_voltage / n_seg : acc_max_voltage
                }
            ]
        },
        {
            id: 'seg_capacity',
            placeholder: 'Segment Capacity (Ah)',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'seg_energy_and_seg_max_voltage',
                    necessary_ids: ['seg_energy', 'seg_max_voltage'],
                    calculate: (segs_in_par, seg_energy, seg_max_voltage) => seg_energy / (seg_max_voltage * 3600)
                },
                {
                    formula_id: 'seg_n_par_and_and_cell_capacity',
                    necessary_ids: ['seg_n_par', 'cell_capacity'],
                    calculate: (segs_in_par, seg_n_par, cell_capacity) => seg_n_par * cell_capacity
                },
                {
                    formula_id: 'acc_capacity_and_n_seg',
                    necessary_ids: ['n_seg', 'acc_capacity'],
                    calculate: (segs_in_par, n_seg, acc_capacity) => acc_capacity / n_seg
                }
            ]
        },
        {
            id: 'seg_energy',
            placeholder: 'Segment Energy (Joules)',
            inputValue: null,
            formulas: [
                // {
                //     formula_id: 'n_par_seg_and_n_series_seg_and_cell_capacity_and_cell_max_voltage',
                //     necessary_ids: ['seg_n_par', 'seg_n_series', 'cell_capacity', 'cell_max_voltage'],
                //     calculate: (seg_n_par, seg_n_series, cell_capacity, cell_max_voltage) => seg_n_par * seg_n_series * cell_capacity * cell_max_voltage
                // },
                {
                    formula_id: 'n_par_seg_and_n_series_seg_and_cell_energy',
                    necessary_ids: ['seg_n_par', 'seg_n_series', 'cell_energy'],
                    calculate: (segs_in_par, seg_n_par, seg_n_series, cell_energy) => seg_n_par * seg_n_series * cell_energy
                },
                {
                    formula_id: 'seg_capacity_and_seg_max_voltage',
                    necessary_ids: ['seg_capacity', 'seg_max_voltage'],
                    calculate: (segs_in_par, seg_capacity, seg_max_voltage) => seg_capacity * 3600 * seg_max_voltage
                },
                {
                    formula_id: 'acc_energy_and_n_seg',
                    necessary_ids: ['n_seg', 'acc_energy'],
                    calculate: (segs_in_par, n_seg, acc_energy) => acc_energy / n_seg
                }
            ]
        },
        {
            id: 'seg_equivalent_resistance',
            placeholder: 'Segment Equivalent Resistance (Ohms)',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'cell_internal_resistance_and_seg_n_series_and_seg_n_par',
                    necessary_ids: ['cell_internal_resistance', 'seg_n_series', 'seg_n_par'],
                    calculate: (segs_in_par, cell_internal_resistance, seg_n_series, seg_n_par) => cell_internal_resistance * seg_n_series / seg_n_par
                },
                {
                    formula_id: 'n_seg_and_acc_equivalent_resistance',
                    necessary_ids: ['n_seg', 'acc_equivalent_resistance'],
                    calculate: (segs_in_par, n_seg, acc_equivalent_resistance) => !segs_in_par ? acc_equivalent_resistance / n_seg : acc_equivalent_resistance * n_seg
                }
            ]
        },
        {
            id: 'seg_weight',
            placeholder: 'Segment Weight (grams)',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'cell_num_and_cell_weight',
                    necessary_ids: ['seg_n_par', 'seg_n_series', 'cell_weight'],
                    calculate: (segs_in_par, seg_n_par, seg_n_series, cell_weight) => seg_n_par * seg_n_series * cell_weight
                },
                {
                    formula_id: 'seg_num_and_acc_weight',
                    necessary_ids: ['acc_weight', 'n_seg'],
                    calculate: (segs_in_par, acc_weight, n_seg) => acc_weight / n_seg
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
            placeholder: 'Cell Maximum Voltage (Volts)',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'cell_capacity_and_cell_energy',
                    necessary_ids: ['cell_capacity', 'cell_energy'],
                    calculate: (segs_in_par, cell_capacity, cell_energy) => cell_energy / (cell_capacity * 3600)
                },
                {
                    formula_id: 'seg_max_voltage_and_seg_n_series',
                    necessary_ids: ['seg_max_voltage', 'seg_n_series'],
                    calculate: (segs_in_par, seg_max_voltage, seg_n_series) => seg_max_voltage / seg_n_series
                },
                {
                    formula_id: 'acc_max_voltage_and_acc_n_series',
                    necessary_ids: ['acc_max_voltage', 'acc_n_series'],
                    calculate: (segs_in_par, acc_max_voltage, acc_n_series) => acc_max_voltage / acc_n_series
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
            placeholder: 'Cell Capacity (Ah)',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'cell_energy_and_cell_max_voltage',
                    necessary_ids: ['cell_energy', 'cell_max_voltage'],
                    calculate: (segs_in_par, cell_energy, cell_max_voltage) => cell_energy / (cell_max_voltage * 3600)
                },
                {
                    formula_id: 'seg_capacity_and_seg_n_series_and_seg_n_par',
                    necessary_ids: ['seg_capacity', 'seg_n_par'],
                    calculate: (segs_in_par, seg_capacity, seg_n_par) => seg_capacity / seg_n_par
                },
                {
                    formula_id: 'acc_capacity_and_acc_n_par',
                    necessary_ids: ['acc_capacity', 'acc_n_par'],
                    calculate: (segs_in_par, acc_capacity, acc_n_par) => acc_capacity / acc_n_par
                }
            ]
        },
        {
            id: 'cell_energy',
            placeholder: 'Cell Energy (Joules)',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'cell_capacity_and_cell_max_voltage',
                    necessary_ids: ['cell_capacity', 'cell_max_voltage'],
                    calculate: (segs_in_par, cell_capacity, cell_max_voltage) => cell_capacity * 3600 * cell_max_voltage
                },
                {
                    formula_id: 'seg_energy_and_seg_n_series_and_seg_n_par',
                    necessary_ids: ['seg_energy', 'seg_n_series', 'seg_n_par'],
                    calculate: (segs_in_par, seg_energy, seg_n_series, seg_n_par) => seg_energy / (seg_n_series * seg_n_par)
                },
                {
                    formula_id: 'acc_energy_and_acc_n_series_and_acc_n_par',
                    necessary_ids: ['acc_energy', 'acc_n_series', 'acc_n_par'],
                    calculate: (segs_in_par, acc_energy, acc_n_series, acc_n_par) => acc_energy / (acc_n_series * acc_n_par)
                }
            ]
        },
        {
            id: 'cell_internal_resistance',
            placeholder: 'Cell Internal Resistance (Ohms)',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'acc_equivalent_resistance_and_acc_n_series_and_acc_n_par',
                    necessary_ids: ['acc_equivalent_resistance', 'acc_n_series', 'acc_n_par'],
                    calculate: (segs_in_par, acc_equivalent_resistance, acc_n_series, acc_n_par) => acc_equivalent_resistance * acc_n_par / acc_n_series
                },
                {
                    formula_id: 'seg_internal_resistance_and_seg_n_series_and_seg_n_par',
                    necessary_ids: ['seg_equivalent_resistance', 'seg_n_series', 'seg_n_par'],
                    calculate: (segs_in_par, seg_equivalent_resistance, seg_n_series, seg_n_par) => seg_equivalent_resistance * seg_n_par / seg_n_series
                }
            ]
        },
        {
            id: 'cell_weight',
            placeholder: 'Cell Weight (grams)',
            inputValue: null,
            formulas: [
                {
                    formula_id: 'seg_weight_and_seg_n_series_and_seg_n_par',
                    necessary_ids: ['seg_weight', 'seg_n_series', 'seg_n_par'],
                    calculate: (segs_in_par, seg_weight, seg_n_series, seg_n_par) => seg_weight / (seg_n_series * seg_n_par)
                },
                {
                    formula_id: 'acc_weight_and_acc_n_series_and_acc_n_par',
                    necessary_ids: ['acc_weight', 'acc_n_series', 'acc_n_par'],
                    calculate: (segs_in_par, acc_weight, acc_n_series, acc_n_par) => acc_weight / (acc_n_series * acc_n_par)
                }
            ]
        }
    ]
    },
];

createCalculator('Accumulator Segments Calculator', 
    sections, 'calculator-container'
);