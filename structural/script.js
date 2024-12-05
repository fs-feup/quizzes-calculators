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
        if(missingIndex >= 0 && missingIndex <= 4){
            const arguments = inputValues.slice(0,missingIndex).concat(inputValues.slice(missingIndex+1));
            result = formulas[missingIndex].calculate(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);
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

const formula_young_modulus = [
    {
        displayName: 'Calculate young modulus',
        calculate: (stress,strain) => stress/strain
    },
    {
        displayName: 'Calculate stress',
        calculate: (young,strain) => young*strain
    },
    {
        displayName: 'Calculate strain',
        calculate: (young,stress) => stress/young
    },
]

const formula_young_modulus_alternative = [
    {
        displayName: 'Calculate modulus of elasticity (E)',
        calculate: (force, area, deltaL, length) => (force / area) / (deltaL / length)
    },
    {
        displayName: 'Calculate force (F)',
        calculate: (modulus, area, deltaL, length) => modulus * (deltaL / length) * area
    },
    {
        displayName: 'Calculate area (A)',
        calculate: (modulus, force, deltaL, length) => force / (modulus * (deltaL / length))
    },
    {
        displayName: 'Calculate change in length (ΔL)',
        calculate: (modulus, force, area, length) => (force / area) / (modulus / length)
    },
    {
        displayName: 'Calculate original length (L)',
        calculate: (modulus, force, area, deltaL) => modulus * deltaL / (force / area)
    }
]

const formula_point_load_reaction = [
    {
        displayName: 'Calculate Reaction Force (R_A or R_B)',
        calculate: (load) => load / 2,
    },
    {
        displayName: 'Calculate Load (P) from Reaction Force',
        calculate: (reaction) => reaction * 2,
    }
]

const formula_point_load_moment = [
    {
        displayName: 'Calculate Maximum Moment (M_max)',
        calculate: (load, length) => (load * length) / 4,
    },
    {
        displayName: 'Calculate Load (P) from Moment',
        calculate: (moment, length) => (moment * 4) / length,
    },
    {
        displayName: 'Calculate Length (L) from Moment',
        calculate: (moment, load) => (moment * 4) / load,
    }
]

const formula_point_load_deflection = [
    {
        displayName: 'Calculate Maximum Deflection (Δ_max)',
        calculate: (load, length, youngModulus, momentOfInertia) =>
            (load * Math.pow(length, 3)) / (48 * youngModulus * momentOfInertia),
    },
    {
        displayName: 'Calculate Load (P)',
        calculate: (deflection, length, youngModulus, momentOfInertia) =>
            (deflection * 48 * youngModulus * momentOfInertia) / Math.pow(length, 3),
    },
    {
        displayName: 'Calculate Length (L)',
        calculate: (deflection, load, youngModulus, momentOfInertia) =>
            Math.cbrt((deflection * 48 * youngModulus * momentOfInertia) / load),
    },
    {
        displayName: 'Calculate Young’s Modulus (E)',
        calculate: (deflection, load, length, momentOfInertia) =>
            (load * Math.pow(length, 3)) / (48 * deflection * momentOfInertia),
    },
    {
        displayName: 'Calculate Moment of Inertia (I)',
        calculate: (deflection, load, length, youngModulus) =>
            (load * Math.pow(length, 3)) / (48 * deflection * youngModulus),
    }
];

const formula_udl_reaction = [
    {
        displayName: 'Calculate Reaction Force (R_A or R_B)',
        calculate: (uniformLoad, length) => (uniformLoad * length) / 2,
    },
    {
        displayName: 'Calculate Load (w) from Reaction Force',
        calculate: (reaction, length) => (reaction * 2) / length,
    },
    {
        displayName: 'Calculate Length (L) from Reaction Force',
        calculate: (reaction, uniformLoad) => (reaction * 2) / uniformLoad,
    }
];

const formula_udl_moment = [
    {
        displayName: 'Calculate Maximum Moment (M_max)',
        calculate: (uniformLoad, length) => (uniformLoad * Math.pow(length, 2)) / 8,
    },
    {
        displayName: 'Calculate Load (w) from Moment',
        calculate: (moment, length) => (moment * 8) / Math.pow(length, 2),
    },
    {
        displayName: 'Calculate Length (L) from Moment',
        calculate: (moment, uniformLoad) => Math.sqrt((moment * 8) / uniformLoad),
    }
];

const formula_udl_deflection = [
    {
        displayName: 'Calculate Maximum Deflection (Δ_max)',
        calculate: (uniformLoad, length, youngModulus, momentOfInertia) =>
            (5 * uniformLoad * Math.pow(length, 4)) / (384 * youngModulus * momentOfInertia),
    },
    {
        displayName: 'Calculate Load (w) from Deflection',
        calculate: (deflection, length, youngModulus, momentOfInertia) =>
            (deflection * 384 * youngModulus * momentOfInertia) / (5 * Math.pow(length, 4)),
    },
    {
        displayName: 'Calculate Length (L) from Deflection',
        calculate: (deflection, uniformLoad, youngModulus, momentOfInertia) =>
            Math.pow((deflection * 384 * youngModulus * momentOfInertia) / (5 * uniformLoad), 1 / 4),
    },
    {
        displayName: 'Calculate Young’s Modulus (E) from Deflection',
        calculate: (deflection, uniformLoad, length, momentOfInertia) =>
            (5 * uniformLoad * Math.pow(length, 4)) / (384 * deflection * momentOfInertia),
    },
    {
        displayName: 'Calculate Moment of Inertia (I) from Deflection',
        calculate: (deflection, uniformLoad, length, youngModulus) =>
            (5 * uniformLoad * Math.pow(length, 4)) / (384 * deflection * youngModulus),
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

createCalculator('Young modulus (elasticity) formula',
    [
        {id: 'young_modu1', placeholder: 'young modulus in (Pa)'},
        {id: 'stress1', placeholder: 'stress (force per unit area)'},
        {id: 'strain1', placeholder: 'strain (deformation)'}
    ],
    formula_young_modulus,
    '../assets/structural/young_modulus.png'
);

createCalculator('Young modulus (elasticity) alternative formula', 
    [
        {id: 'young_modulus1', placeholder: 'Young modulus in (Pa)'},
        {id: 'young_force1', placeholder: 'Force (N)'},
        {id: 'young_area1', placeholder: 'Cross-sectional area (m²)'},
        {id: 'young_delta_length1', placeholder: 'Change in length (ΔL in m)'},
        {id: 'young_original_length1', placeholder: 'Original length (L in m)'}
    ],
    formula_young_modulus_alternative,
    '../assets/structural/young_modulus_altern.png'
);

createCalculator('Point load Reaction',
    [
        { id: 'reaction1345', placeholder: 'reaction' },
        { id: 'load343', placeholder: 'load (P)' }
    ],
    formula_point_load_reaction,
    '../assets/structural/pointload_reaction.png'
);

createCalculator('Point Load Moment', 
    [
        { id: 'moment54654', placeholder: 'Maximum Moment' },
        { id: 'load54654', placeholder: 'Load (P)' },
        { id: 'length654779', placeholder: 'Length (L)' }
    ],
    formula_point_load_moment,
    '../assets/structural/point_load_moment.png'
);

createCalculator('Point Load Deflection', 
    [
        { id: 'deflection24536', placeholder: 'Deflection (Δ)' },
        { id: 'load_97867', placeholder: 'Load (P)' },
        { id: 'length_5y6u657', placeholder: 'Length (L)' },
        { id: 'youngModulus_433598', placeholder: 'Young Modulus (E)' },
        { id: 'momentOfInertia_328jfn', placeholder: 'Moment of Inertia (I)' }
    ],
    formula_point_load_deflection,
    '../assets/structural/point_load_deflection.png'
);

createCalculator('UDL Reaction', 
    [
        { id: 'reaction134545', placeholder: 'reaction' },
        { id: 'uniformLoad_346546', placeholder: 'Uniform Load (w)' },
        { id: 'length_456b4h', placeholder: 'Length (L)' }
    ],
    formula_udl_reaction,
    '../assets/structural/udl_reaction.png'
);

createCalculator('UDL Moment', 
    [
        { id: 'moment_54654', placeholder: 'Maximum Moment' },
        { id: 'uniformLoad', placeholder: 'Uniform Load (w)' },
        { id: 'length', placeholder: 'Length (L)' }
    ],
    formula_udl_moment,
    '../assets/structural/udl_moment.png'
);

createCalculator('UDL Deflection', 
    [
        { id: 'deflection2', placeholder: 'Deflection (Δ)' },
        { id: 'load2', placeholder: 'Load (P)' },
        { id: 'length2', placeholder: 'Length (L)' },
        { id: 'young_Modulus2', placeholder: 'Young Modulus (E)' },
        { id: 'momentOfInertia2', placeholder: 'Moment of Inertia (I)' }
    ],
    formula_udl_deflection,
    '../assets/structural/udl_deflection.png'
);



