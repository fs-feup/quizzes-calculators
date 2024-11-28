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

const formula_triangle_y_bar = [
    {
        displayName: 'Calculate y_bar',
        calculate: (Tri_H) => Tri_H/3
    },
    {
        displayName: 'Calculate H',
        calculate: (Tri_y_bar) => Tri_y_bar*3
    },
];

const formula_triangle_area = [
    {
        displayName: 'Calculate area',
        calculate: (Tri_B2, Tri_H2) => (Tri_B2 * Tri_H2) / 2
    },
    {
        displayName: 'Calculate B',
        calculate: (Tri_area, Tri_H2) => (2 * Tri_area) / Tri_H2
    },
    {
        displayName: 'Calculate H',
        calculate: (Tri_area, Tri_B2) => (2 * Tri_area) / Tri_B2
    },
];

const formula_triangle_I_x_bar = [
    {
        displayName: 'Calculate I_x_bar',
        calculate: (Tri_B3, Tri_H3) => (Tri_B3 * Tri_H3**3) / 36
    },
    {
        displayName: 'Calculate B',
        calculate: (Tri_I_x_bar, Tri_H3) => (36 * Tri_I_x_bar) / Tri_H3**3
    },
    {
        displayName: 'Calculate H',
        calculate: (Tri_I_x_bar, Tri_B3) => ((36 * Tri_I_x_bar) / Tri_B3)**(1/3)
    },
];

const formula_triangle2_x_bar = [
    {
        displayName: 'Calculate x_bar',
        calculate: (Tri2_B) => Tri2_B/3
    },
    {
        displayName: 'Calculate B',
        calculate: (Tri2_x_bar) => Tri2_x_bar*3
    },
];

const formula_triangle2_y_bar = [
    {
        displayName: 'Calculate y_bar',
        calculate: (Tri2_H) => Tri2_H/3
    },
    {
        displayName: 'Calculate H',
        calculate: (Tri2_y_bar) => Tri2_y_bar*3
    },
];

const formula_triangle2_area = [
    {
        displayName: 'Calculate area',
        calculate: (Tri2_B2, Tri2_H2) => (Tri2_B2 * Tri2_H2) / 2
    },
    {
        displayName: 'Calculate B',
        calculate: (Tri2_area, Tri2_H2) => (2 * Tri2_area) / Tri2_H2
    },
    {
        displayName: 'Calculate H',
        calculate: (Tri2_area, Tri2_B2) => (2 * Tri2_area) / Tri2_B2
    },
];

const formula_triangle2_I_x_bar = [
    {
        displayName: 'Calculate I_x_bar',
        calculate: (Tri2_B3, Tri2_H3) => (Tri2_B3 * Tri2_H3**3) / 36
    },
    {
        displayName: 'Calculate B',
        calculate: (Tri2_I_x_bar, Tri2_H3) => (36 * Tri2_I_x_bar) / Tri2_H3**3
    },
    {
        displayName: 'Calculate H',
        calculate: (Tri2_I_x_bar, Tri2_B3) => ((36 * Tri2_I_x_bar) / Tri2_B3)**(1/3)
    },
];

const formula_triangle2_I_y_bar = [
    {
        displayName: 'Calculate I_y_bar',
        calculate: (Tri2_B4, Tri2_H4) => (Tri2_H4 * Tri2_B4**3) / 36
    },
    {
        displayName: 'Calculate B',
        calculate: (Tri2_I_y_bar, Tri2_H4) => ((36 * Tri2_I_y_bar) / Tri2_H4)**(1/3)
    },
    {
        displayName: 'Calculate H',
        calculate: (Tri2_I_y_bar, Tri2_B4) => (36 * Tri2_I_y_bar) / Tri2_B4**3
    },
];

const formula_circle_x_bar = [
    {
        displayName: 'Calculate x_bar',
        calculate: (cir_d_x) => cir_d_x/2
    },
    {
        displayName: 'Calculate D',
        calculate: (cir_x_bar) => cir_x_bar*2
    },
];

const formula_circle_y_bar = [
    {
        displayName: 'Calculate y_bar',
        calculate: (cir_d_y) => cir_d_y/2
    },
    {
        displayName: 'Calculate D',
        calculate: (cir_y_bar) => cir_y_bar*2
    },
];

const formula_circle_area = [
    {
        displayName: 'Calculate area',
        calculate: (cir_r) => Math.PI * cir_r**2
    },
    {
        displayName: 'Calculate r',
        calculate: (cir_area) => (cir_area / Math.PI)**(1/2)
    },
];

const formula_circle_I_x_bar = [
    {
        displayName: 'Calculate I_x_bar',
        calculate: (cir_r_x) => (Math.PI * cir_r_x**4) / 4
    },
    {
        displayName: 'Calculate r',
        calculate: (cir_I_x_bar) => (4 * cir_I_x_bar / Math.PI)**(1/4)
    },
];

const formula_circle_I_y_bar = [
    {
        displayName: 'Calculate I_x_bar',
        calculate: (cir_r_y) => (Math.PI * cir_r_y**4) / 4
    },
    {
        displayName: 'Calculate r',
        calculate: (cir_I_y_bar) => (4 * cir_I_y_bar / Math.PI)**(1/4)
    },
];

const formula_half_circle_x_bar = [
    {
        displayName: 'Calculate x_bar',
        calculate: (half_cir_D) => half_cir_D/2
    },
    {
        displayName: 'Calculate D',
        calculate: (half_cir_x_bar) => half_cir_x_bar*2
    },
];

const formula_half_circle_y_bar = [
    {
        displayName: 'Calculate y_bar',
        calculate: (half_cir_r) => (4*half_cir_r)/(3*Math.PI)
    },
    {
        displayName: 'Calculate r',
        calculate: (half_cir_y_bar) => (3*Math.PI*half_cir_y_bar) / 4
    },
];

const formula_half_circle_area = [
    {
        displayName: 'Calculate area',
        calculate: (half_cir_r1) => (Math.PI * half_cir_r1**2) / 2
    },
    {
        displayName: 'Calculate r',
        calculate: (half_cir_area) => (2 * half_cir_area / Math.PI)**(1/2)
    },
];

const formula_half_circle_I_x_bar = [
    {
        displayName: 'Calculate I_x_bar',
        calculate: (half_cir_r2) => ((9*(Math.PI**2) - 64) / 72*Math.PI) * half_cir_r2**4
    },
    {
        displayName: 'Calculate r',
        calculate: (half_cir_I_x_bar) => ((72*Math.PI*half_cir_I_x_bar) / (9*(Math.PI**2) - 64))**(1/4)
    },
];

const formula_half_circle_I_y_bar = [
    {
        displayName: 'Calculate I_y_bar',
        calculate: (half_cir_r3) => (Math.PI * half_cir_r3**4) / 8
    },
    {
        displayName: 'Calculate r',
        calculate: (half_cir_I_y_bar) => (8 * half_cir_I_y_bar / Math.PI)**(1/4)
    },
];

const formula_quarter_circle_x_bar = [
    {
        displayName: 'Calculate x_bar',
        calculate: (quarter_cir_r) => (4*quarter_cir_r)/(3*Math.PI)
    },
    {
        displayName: 'Calculate r',
        calculate: (quarter_cir_x_bar) => (3*Math.PI*quarter_cir_x_bar) / 4
    },
];

const formula_quarter_circle_y_bar = [
    {
        displayName: 'Calculate y_bar',
        calculate: (quarter_cir_r1) => (4*quarter_cir_r1)/(3*Math.PI)
    },
    {
        displayName: 'Calculate r',
        calculate: (quarter_cir_y_bar) => (3*Math.PI*quarter_cir_y_bar) / 4
    },
];

const formula_quarter_circle_area = [
    {
        displayName: 'Calculate area',
        calculate: (quarter_cir_r2) => (Math.PI * quarter_cir_r2**2) / 4
    },
    {
        displayName: 'Calculate r',
        calculate: (quarter_cir_area) => (4 * quarter_cir_area / Math.PI)**(1/2)
    },
];

const formula_quarter_circle_I_x_bar = [
    {
        displayName: 'Calculate I_x_bar',
        calculate: (quarter_cir_r3) => ((9*(Math.PI**2) - 64) / 144*Math.PI) * quarter_cir_r3**4
    },
    {
        displayName: 'Calculate r',
        calculate: (quarter_cir_I_x_bar) => ((144*Math.PI*quarter_cir_I_x_bar) / (9*(Math.PI**2) - 64))**(1/4)
    },
];

const formula_quarter_circle_I_y_bar = [
    {
        displayName: 'Calculate I_y_bar',
        calculate: (quarter_cir_r4) => ((9*(Math.PI**2) - 64) / 144*Math.PI) * quarter_cir_r4**4
    },
    {
        displayName: 'Calculate r',
        calculate: (quarter_cir_I_y_bar) => ((144*Math.PI*quarter_cir_I_y_bar) / (9*(Math.PI**2) - 64))**(1/4)
    },
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


createCalculator('Triangle y bar', 
    [
        { id: 'Tri_y_bar', placeholder: 'y bar' },
        { id: 'Tri_H', placeholder: 'H' },
    ],
    formula_triangle_y_bar,
    '../assets/structural/triangle_y_bar.png'
);

createCalculator('Triangle area', 
    [
        { id: 'Tri_area', placeholder: 'area' },
        { id: 'Tri_B2', placeholder: 'B' },
        { id: 'Tri_H2', placeholder: 'H' }
    ],
    formula_triangle_area,
    '../assets/structural/triangle_area.png'
);

createCalculator('Triangle I x bar', 
    [
        { id: 'Tri_I_x_bar', placeholder: 'I x bar' },
        { id: 'Tri_B3', placeholder: 'B' },
        { id: 'Tri_H3', placeholder: 'H' }
    ],
    formula_triangle_I_x_bar,
    '../assets/structural/triangle_I_x_bar.png'
);

createCalculator('Triangle x bar', 
    [
        { id: 'Tri2_x_bar', placeholder: 'x bar' },
        { id: 'Tri2_B', placeholder: 'B' },
    ],
    formula_triangle2_x_bar,
    '../assets/structural/triangle2_x_bar.png'
);

createCalculator('Triangle y bar',
    [
        { id: 'Tri2_y_bar', placeholder: 'y bar' },
        { id: 'Tri2_H', placeholder: 'H' }
    ],
    formula_triangle2_y_bar,
    '../assets/structural/triangle2_y_bar.png'
);

createCalculator('Triangle area',
    [
        { id: 'Tri2_area', placeholder: 'area' },
        { id: 'Tri2_B2', placeholder: 'B' },
        { id: 'Tri2_H2', placeholder: 'H' }
    ],
    formula_triangle2_area,
    '../assets/structural/triangle2_area.png'
);

createCalculator('Triangle I x bar',
    [
        { id: 'Tri2_I_x_bar', placeholder: 'I x bar' },
        { id: 'Tri2_B3', placeholder: 'B' },
        { id: 'Tri2_H3', placeholder: 'H' }
    ],
    formula_triangle2_I_x_bar,
    '../assets/structural/triangle2_I_x_bar.png'
);

createCalculator('Triangle I y bar',
    [
        { id: 'Tri2_I_y_bar', placeholder: 'I y bar' },
        { id: 'Tri2_B4', placeholder: 'B' },
        { id: 'Tri2_H4', placeholder: 'H' }
    ],
    formula_triangle2_I_y_bar,
    '../assets/structural/triangle2_I_y_bar.png'
);

createCalculator('Circle x bar',
    [
        { id: 'cir_x_bar', placeholder: 'x bar' },
        { id: 'cir_d_x', placeholder: 'D' }
    ],
    formula_circle_x_bar,
    '../assets/structural/circle_x_bar.png'
);

createCalculator('Circle y bar',
    [
        { id: 'cir_y_bar', placeholder: 'y bar' },
        { id: 'cir_d_y', placeholder: 'D' }
    ],
    formula_circle_y_bar,
    '../assets/structural/circle_y_bar.png'
);

createCalculator('Circle area with radius',
    [
        { id: 'cir_area', placeholder: 'area' },
        { id: 'cir_r', placeholder: 'radius' }
    ],
    formula_circle_area,
    '../assets/structural/circle_area.png'
);

createCalculator('Circle I x bar',
    [
        { id: 'cir_I_x_bar', placeholder: 'I x bar' },
        { id: 'cir_r_x', placeholder: 'radius' }
    ],
    formula_circle_I_x_bar,
    '../assets/structural/circle_I_x_bar.png'
);

createCalculator('Circle I y bar',
    [
        { id: 'cir_I_y_bar', placeholder: 'I y bar' },
        { id: 'cir_r_y', placeholder: 'radius' }
    ],
    formula_circle_I_y_bar,
    '../assets/structural/circle_I_y_bar.png'
);

createCalculator('Half Circle x bar',
    [
        { id: 'half_cir_x_bar', placeholder: 'x bar' },
        { id: 'half_cir_D', placeholder: 'diameter' }
    ],
    formula_half_circle_x_bar,
    '../assets/structural/half_cir_x_bar.png'
);

createCalculator('Half Circle y bar',
    [
        { id: 'half_cir_y_bar', placeholder: 'y bar' },
        { id: 'half_cir_r', placeholder: 'radius' }
    ],
    formula_half_circle_y_bar,
    '../assets/structural/half_cir_y_bar.png'
);

createCalculator('Half Circle area',
    [
        { id: 'half_cir_area', placeholder: 'area' },
        { id: 'half_cir_r1', placeholder: 'radius' }
    ],
    formula_half_circle_area,
    '../assets/structural/half_cir_area.png'
);

createCalculator('Half Circle I x bar',
    [
        { id: 'half_cir_I_x_bar', placeholder: 'I x bar' },
        { id: 'half_cir_r2', placeholder: 'radius' }
    ],
    formula_half_circle_I_x_bar,
    '../assets/structural/half_cir_I_x_bar.png'
);

createCalculator('Half Circle I y bar',
    [
        { id: 'half_cir_I_y_bar', placeholder: 'I y bar' },
        { id: 'half_cir_r3', placeholder: 'radius' }
    ],
    formula_half_circle_I_y_bar,
    '../assets/structural/half_cir_I_y_bar.png'
);

createCalculator('Quarter Circle x bar',
    [
        { id: 'quarter_cir_x_bar', placeholder: 'x bar' },
        { id: 'quarter_cir_r', placeholder: 'radius' }
    ],
    formula_quarter_circle_x_bar,
    '../assets/structural/quarter_cir_x_bar.png'
);

createCalculator('Quarter Circle y bar',
    [
        { id: 'quarter_cir_y_bar', placeholder: 'y bar' },
        { id: 'quarter_cir_r1', placeholder: 'radius' }
    ],
    formula_quarter_circle_y_bar,
    '../assets/structural/quarter_cir_y_bar.png'
);

createCalculator('Quarter Circle area',
    [
        { id: 'quarter_cir_area', placeholder: 'area' },
        { id: 'quarter_cir_r2', placeholder: 'radius' }
    ],
    formula_quarter_circle_area,
    '../assets/structural/quarter_cir_area.png'
);

createCalculator('Quarter Circle I x bar',
    [
        { id: 'quarter_cir_I_x_bar', placeholder: 'I x bar' },
        { id: 'quarter_cir_r3', placeholder: 'radius' }
    ],
    formula_quarter_circle_I_x_bar,
    '../assets/structural/quarter_cir_I_x_bar.png'
);

createCalculator('Quarter Circle I y bar',
    [
        { id: 'quarter_cir_I_y_bar', placeholder: 'I y bar' },
        { id: 'quarter_cir_r4', placeholder: 'radius' }
    ],
    formula_quarter_circle_I_y_bar,
    '../assets/structural/quarter_cir_I_y_bar.png'
);
