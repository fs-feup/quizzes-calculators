function createCalculator(title, inputFields, formulas, imageUrl) {
    const calculatorDiv = document.createElement('div');
    calculatorDiv.className = 'calculator';

    const id = title.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^a-z0-9\-]/g, '');
    calculatorDiv.id = id;

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
        calculate: (half_cir_r2) => ((9*Math.PI**2 - 64) / (72*Math.PI)) * half_cir_r2**4
    },
    {
        displayName: 'Calculate r',
        calculate: (half_cir_I_x_bar) => ((72*Math.PI*half_cir_I_x_bar) / (9*Math.PI**2 - 64))**(1/4)
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
        calculate: (quarter_cir_r3) => ((9*(Math.PI**2) - 64) / (144*Math.PI)) * quarter_cir_r3**4
    },
    {
        displayName: 'Calculate r',
        calculate: (quarter_cir_I_x_bar) => ((144*Math.PI*quarter_cir_I_x_bar) / (9*(Math.PI**2) - 64))**(1/4)
    },
];

const formula_quarter_circle_I_y_bar = [
    {
        displayName: 'Calculate I_y_bar',
        calculate: (quarter_cir_r4) => ((9*(Math.PI**2) - 64) / (144*Math.PI)) * quarter_cir_r4**4
    },
    {
        displayName: 'Calculate r',
        calculate: (quarter_cir_I_y_bar) => ((144*Math.PI*quarter_cir_I_y_bar) / (9*(Math.PI**2) - 64))**(1/4)
    },
];

const formula_half_elipse_y_bar = [
    {
        displayName: 'Calculate y_bar',
        calculate: (half_elipse_b) => (4*half_elipse_b)/(3*Math.PI)
    },
    {
        displayName: 'Calculate b',
        calculate: (half_elipse_y_bar) => (3*Math.PI*half_elipse_y_bar) / 4
    },
];

const formula_half_elipse_area = [
    {
        displayName: 'Calculate area',
        calculate: (half_elipse_a, half_elipse_b1) => (Math.PI * half_elipse_a * half_elipse_b1) / 2
    },
    {
        displayName: 'Calculate a',
        calculate: (half_elipse_area, half_elipse_b1) => (2 * half_elipse_area / (Math.PI * half_elipse_b1))
    },
    {
        displayName: 'Calculate b',
        calculate: (half_elipse_area, half_elipse_a) => (2 * half_elipse_area / (Math.PI * half_elipse_a))
    },
];

const formula_half_elipse_I_x_bar = [
    {
        displayName: 'Calculate I_x_bar',
        calculate: (half_elipse_a1, half_elipse_b2) => ((9*Math.PI**2 - 64)/(72*Math.PI)) * half_elipse_a1 * half_elipse_b2**3
    },
    {
        displayName: 'Calculate a',
        calculate: (half_elipse_I_x_bar, half_elipse_b2) => ((72*Math.PI*half_elipse_I_x_bar) / (9*Math.PI**2 - 64)) / half_elipse_b2**3
    },
    {
        displayName: 'Calculate b',
        calculate: (half_elipse_I_x_bar, half_elipse_a1) => (((72*Math.PI*half_elipse_I_x_bar) / (9*Math.PI**2 - 64)) / half_elipse_a1)**(1/3)
    },
];

const formula_half_elipse_I_y_bar = [
    {
        displayName: 'Calculate I_y_bar',
        calculate: (half_elipse_a2, half_elipse_b3) => (Math.PI*half_elipse_a2**3*half_elipse_b3)/8
    },
    {
        displayName: 'Calculate a',
        calculate: (half_elipse_I_y_bar, half_elipse_b3) => ((8*half_elipse_I_y_bar) / (Math.PI*half_elipse_b3))**(1/3)
    },
    {
        displayName: 'Calculate b',
        calculate: (half_elipse_I_y_bar, half_elipse_a2) => (8*half_elipse_I_y_bar) / (Math.PI*half_elipse_a2**3)
    },
];

const formula_quarter_elipse_x_bar = [
    {
        displayName: 'Calculate x_bar',
        calculate: (quarter_elipse_a) => (4*quarter_elipse_a)/(3*Math.PI)
    },
    {
        displayName: 'Calculate a',
        calculate: (quarter_elipse_x_bar) => (3*Math.PI*quarter_elipse_x_bar) / 4
    },
];

const formula_quarter_elipse_y_bar = [
    {
        displayName: 'Calculate y_bar',
        calculate: (quarter_elipse_b) => (4*quarter_elipse_b)/(3*Math.PI)
    },
    {
        displayName: 'Calculate b',
        calculate: (quarter_elipse_y_bar) => (3*Math.PI*quarter_elipse_y_bar) / 4
    },
];

const formula_quarter_elipse_area = [
    {
        displayName: 'Calculate area',
        calculate: (quarter_elipse_a1, quarter_elipse_b1) => (Math.PI * quarter_elipse_a1 * quarter_elipse_b1) / 4
    },
    {
        displayName: 'Calculate a',
        calculate: (quarter_elipse_area, quarter_elipse_b1) => (4 * quarter_elipse_area / (Math.PI * quarter_elipse_b1))
    },
    {
        displayName: 'Calculate b',
        calculate: (quarter_elipse_area, quarter_elipse_a1) => (4 * quarter_elipse_area / (Math.PI * quarter_elipse_a1))
    },
];

const formula_quarter_elipse_I_x_bar = [
    {
        displayName: 'Calculate I_x_bar',
        calculate: (quarter_elipse_a2, quarter_elipse_b2) => ((9*Math.PI**2 - 64)/(144*Math.PI)) * quarter_elipse_a2 * quarter_elipse_b2**3
    },
    {
        displayName: 'Calculate a',
        calculate: (quarter_elipse_I_x_bar, quarter_elipse_b2) => ((144*Math.PI*quarter_elipse_I_x_bar) / (9*Math.PI**2 - 64)) / quarter_elipse_b2**3
    },
    {
        displayName: 'Calculate b',
        calculate: (quarter_elipse_I_x_bar, quarter_elipse_a2) => (((144*Math.PI*quarter_elipse_I_x_bar) / (9*Math.PI**2 - 64)) / quarter_elipse_a2)**(1/3)
    },
];

const formula_quarter_elipse_I_y_bar = [
    {
        displayName: 'Calculate I_y_bar',
        calculate: (quarter_elipse_a3, quarter_elipse_b3) => ((9*Math.PI**2 - 64)/(144*Math.PI)) * quarter_elipse_a3**3 * quarter_elipse_b3
    },
    {
        displayName: 'Calculate a',
        calculate: (quarter_elipse_I_y_bar, quarter_elipse_b3) => (((144*Math.PI*quarter_elipse_I_y_bar) / (9*Math.PI**2 - 64)) / quarter_elipse_b3)**(1/3)
    },
    {
        displayName: 'Calculate b',
        calculate: (quarter_elipse_I_y_bar, quarter_elipse_a3) => (((144*Math.PI*quarter_elipse_I_y_bar) / (9*Math.PI**2 - 64)) / quarter_elipse_a3**3)
    },
];

const formula_parabola_y_bar = [
    {
        displayName: 'Calculate y_bar',
        calculate: (para_h) => para_h*3/5
    },
    {
        displayName: 'Calculate h',
        calculate: (para_y_bar) => para_y_bar*5/3
    },
];

const formula_parabola_area = [
    {
        displayName: 'Calculate area',
        calculate: (para_a, para_h1) => (4*para_a*para_h1) / 3
    },
    {
        displayName: 'Calculate a',
        calculate: (para_area, para_h1) => (3*para_area) / (4*para_h1)
    },
    {
        displayName: 'Calculate h',
        calculate: (para_area, para_a) => (3*para_area) / (4*para_a)
    },
];

const formula_parabola_I_x_bar = [
    {
        displayName: 'Calculate I_x_bar',
        calculate: (para_a1, para_h2) => (16*para_a1*(para_h2**3)) / 175
    },
    {
        displayName: 'Calculate a',
        calculate: (para_I_x_bar, para_h2) => 175*para_I_x_bar / (16*para_h2**3)
    },
    {
        displayName: 'Calculate h',
        calculate: (para_I_x_bar, para_a1) => (175*para_I_x_bar / (16*para_a1))**(1/3)
    },
];

const formula_parabola_I_y_bar = [
    {
        displayName: 'Calculate I_y_bar',
        calculate: (para_a2, para_h3) => (4 * para_a2**3 * para_h3) / 15
    },
    {
        displayName: 'Calculate a',
        calculate: (para_I_y_bar, para_h3) => (15*para_I_y_bar / (4*para_h3))**(1/3)
    },
    {
        displayName: 'Calculate h',
        calculate: (para_I_y_bar, para_a2) => (15*para_I_y_bar / (4*para_a2**3))
    },
];

const formula_media_parabola_x_bar = [
    {
        displayName: 'Calculate x_bar',
        calculate: (a) => (3 * a) / 8,
    },
    {
        displayName: 'Calculate a',
        calculate: (x_bar) => (8 * x_bar) / 3,
    },
];

const formula_media_parabola_y_bar = [
    {
        displayName: 'Calculate y_bar',
        calculate: (h) => (3 * h) / 5,
    },
    {
        displayName: 'Calculate h',
        calculate: (y_bar) => (5 * y_bar) / 3,
    },
];

const formula_media_parabola_area = [
    {
        displayName: 'Calculate area',
        calculate: (a,h) => (2 * a * h) / 3,
    },
    {
        displayName: 'Calculate a',
        calculate: (area, h) => (3 * area) / (2*h),
    },
    {
        displayName: 'Calculate h',
        calculate: (area, a) => (3 * area) / (2 * a),
    },
];

const formula_media_parabola_I_x_bar = [
    {
        displayName: 'Calculate I x bar',
        calculate: (a,h) => (8 * a * h**3) / 175,
    },
    {
        displayName: 'Calculate a',
        calculate: (I_x_bar, h) => (175 * I_x_bar) / (8*h**3),
    },
    {
        displayName: 'Calculate h',
        calculate: (I_x_bar, a) => ((175 * I_x_bar) / (8 * a))**(1/3),
    },
];

const formula_media_parabola_I_y_bar = [
    {
        displayName: 'Calculate I y bar',
        calculate: (a,h) => (19 * h * a**3) / 480,
    },
    {
        displayName: 'Calculate a',
        calculate: (I_y_bar, h) => ((480 * I_y_bar) / (19*h))**(1/3),
    },
    {
        displayName: 'Calculate h',
        calculate: (I_y_bar, a) => ((480 * I_y_bar) / (19 * a**3)),
    },
];

const formula_parabolic_section_x_bar = [
    {
        displayName: 'Calculate x̄',
        calculate: (a) => (3 * a) / 4,
    },
    {
        displayName: 'Calculate a',
        calculate: (x_bar) => (4 * x_bar) / 3,
    },
];

const formula_parabolic_section_y_bar = [
    {
        displayName: 'Calculate ȳ',
        calculate: (h) => (3 * h) / 10,
    },
    {
        displayName: 'Calculate h',
        calculate: (y_bar) => (10 * y_bar) / 3,
    },
];

const formula_parabolic_section_area = [
    {
        displayName: 'Calculate Area (A)',
        calculate: (a, h) => (a * h) / 3,
    },
    {
        displayName: 'Calculate a',
        calculate: (area, h) => (3 * area) / h,
    },
    {
        displayName: 'Calculate h',
        calculate: (area, a) => (3 * area) / a,
    },
];

const formula_parabolic_section_I_x_bar = [
    {
        displayName: 'Calculate I_x̄',
        calculate: (a, h) => (37 * a * h**3) / 2100,
    },
    {
        displayName: 'Calculate a',
        calculate: (I_x_bar, h) => (2100 * I_x_bar) / (37 * h**3),
    },
    {
        displayName: 'Calculate h',
        calculate: (I_x_bar, a) => ((2100 * I_x_bar) / (37 * a))**(1 / 3),
    },
];

const formula_parabolic_section_I_y_bar = [
    {
        displayName: 'Calculate I_ȳ',
        calculate: (a, h) => h * a**3 / 80,
    },
    {
        displayName: 'Calculate a',
        calculate: (I_y_bar, h) => ((80 * I_y_bar) / h)**(1/3),
    },
    {
        displayName: 'Calculate h',
        calculate: (I_y_bar, a) => (80 * I_y_bar) / a**3,
    },
];

const formula_general_section_x_bar = [
    {
        displayName: 'Calculate x̄',
        calculate: (a, n) => ((n + 1) / (n + 2)) * a,
    },
    {
        displayName: 'Calculate a',
        calculate: (x_bar, n) => (x_bar * (n + 2)) / (n + 1),
    },
    {
        displayName: 'Calculate n',
        calculate: (x_bar, a) => "Impossible to solve for n"
    },
];

const formula_general_section_y_bar = [
    {
        displayName: 'Calculate ȳ',
        calculate: (h, n) => ((n + 1) / (4 * n + 2)) * h,
    },
    {
        displayName: 'Calculate h',
        calculate: (y_bar, n) => (y_bar * (4 * n + 2)) / (n + 1),
    },
    {
        displayName: 'Calculate n',
        calculate: (x_bar, a) => "Impossible to solve for n"
    },
];

const formula_general_section_area = [
    {
        displayName: 'Calculate Area (A)',
        calculate: (a, h, n) => (a * h) / (n + 1),
    },
    {
        displayName: 'Calculate a',
        calculate: (area, h, n) => (area * (n + 1)) / h,
    },
    {
        displayName: 'Calculate h',
        calculate: (area, a, n) => (area * (n + 1)) / a,
    },
    {
        displayName: 'Calculate n',
        calculate: (area, a, h) => "Impossible to solve for n"
    },
    
];

const formula_general_section_I_x_bar = [
    {
        displayName: 'Calculate I_x̄',
        calculate: (a, h, n) => ((7 * n**2 + 4 * n + 1) * a * h**3) / (12 * (3 * n + 1) * (2 * n + 1)**2),
    },
    {
        displayName: 'Calculate a',
        calculate: (I_x_bar, h, n) => (I_x_bar * 12 * (3 * n + 1) * (2 * n + 1)**2) / ((7 * n**2 + 4 * n + 1) * h**3),
    },
    {
        displayName: 'Calculate h',
        calculate: (I_x_bar, a, n) => ((I_x_bar * 12 * (3 * n + 1) * (2 * n + 1)**2) / ((7 * n**2 + 4 * n + 1) * a)) ** (1/3),
    },
    {
        displayName: 'Calculate n',
        calculate: (I_x_bar, a, h) => "Impossible to solve for n"
    },
];

const formula_general_section_I_y_bar = [
    {
        displayName: 'Calculate I_ȳ',
        calculate: (a, h, n) => (h * a**3) / ((n + 3) * (n + 2)**2),
    },
    {
        displayName: 'Calculate a',
        calculate: (I_y_bar, h, n) => ((I_y_bar * (n + 3) * (n + 2)**2) / h) ** (1/3),
    },
    {
        displayName: 'Calculate h',
        calculate: (I_y_bar, a, n) => (I_y_bar * (n + 3) * (n + 2)**2) / a**3,
    },
    {
        displayName: 'Calculate n',
        calculate: (I_y_bar, a, h) => "Impossible to solve for n"
    },
];

const formula_cylindrical_I = [
    {
        displayName: 'Calculate I',
        calculate: (D, d) => (Math.PI / 64) * ((D**4) - (d**4)),
    },
    {
        displayName: 'Calculate D',
        calculate: (I, d) => ((d**4) + (64 * I / Math.PI))**(1/4),
    },
    {
        displayName: 'Calculate d',
        calculate: (I, D) => ((D**4) - (64 * I / Math.PI))**(1/4),
    },
];

const formula_cylindrical_I_2 = [
    {
        displayName: 'Calculate I',
        calculate: (r_outer, r_inner) => (Math.PI / 4) * ((r_outer**4) - (r_inner**4)),
    },
    {
        displayName: 'Calculate r_outer',
        calculate: (I, r_inner) => ((4*I) / Math.PI + (r_inner**4))**(1/4),
    },
    {
        displayName: 'Calculate r_inner',
        calculate: (I, r_outer) => ((r_outer**4) - ((4 * I) / Math.PI))**(1/4),
    },
];

createCalculator('Rectangle x Center', 
    [
        { id: 'x_bar', placeholder: 'x_bar' },
        { id: 'B', placeholder: 'B' }
    ],
    formula_rectangle_x_bar,
    '../assets/structural/rectangle_x_bar.png'
);

createCalculator('Rectangle y Center', 
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

createCalculator('Rectangle I x', 
    [
        { id: 'I_x_bar', placeholder: 'I x bar' },
        { id: 'B2', placeholder: 'B' },
        { id: 'H2', placeholder: 'H' }
    ],
    formula_rectangle_I_x_bar,
    '../assets/structural/rectangle_I_x_bar.png'
);

createCalculator('Rectangle I y', 
    [
        { id: 'I_y_bar', placeholder: 'I y bar' },
        { id: 'B3', placeholder: 'B' },
        { id: 'H3', placeholder: 'H' }
    ],
    formula_rectangle_I_y_bar,
    '../assets/structural/rectangle_I_y_bar.png'
);


createCalculator('Triangle y Center', 
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

createCalculator('Triangle I x', 
    [
        { id: 'Tri_I_x_bar', placeholder: 'I x bar' },
        { id: 'Tri_B3', placeholder: 'B' },
        { id: 'Tri_H3', placeholder: 'H' }
    ],
    formula_triangle_I_x_bar,
    '../assets/structural/triangle_I_x_bar.png'
);

createCalculator('Rectangle Triangle x Center', 
    [
        { id: 'Tri2_x_bar', placeholder: 'x bar' },
        { id: 'Tri2_B', placeholder: 'B' },
    ],
    formula_triangle2_x_bar,
    '../assets/structural/triangle2_x_bar.png'
);

createCalculator('Rectangle Triangle y Center',
    [
        { id: 'Tri2_y_bar', placeholder: 'y bar' },
        { id: 'Tri2_H', placeholder: 'H' }
    ],
    formula_triangle2_y_bar,
    '../assets/structural/triangle2_y_bar.png'
);

createCalculator('Rectangle Triangle area',
    [
        { id: 'Tri2_area', placeholder: 'area' },
        { id: 'Tri2_B2', placeholder: 'B' },
        { id: 'Tri2_H2', placeholder: 'H' }
    ],
    formula_triangle2_area,
    '../assets/structural/triangle2_area.png'
);

createCalculator('Rectangle Triangle I x',
    [
        { id: 'Tri2_I_x_bar', placeholder: 'I x bar' },
        { id: 'Tri2_B3', placeholder: 'B' },
        { id: 'Tri2_H3', placeholder: 'H' }
    ],
    formula_triangle2_I_x_bar,
    '../assets/structural/triangle2_I_x_bar.png'
);

createCalculator('Rectangle Triangle I y',
    [
        { id: 'Tri2_I_y_bar', placeholder: 'I y bar' },
        { id: 'Tri2_B4', placeholder: 'B' },
        { id: 'Tri2_H4', placeholder: 'H' }
    ],
    formula_triangle2_I_y_bar,
    '../assets/structural/triangle2_I_y_bar.png'
);

createCalculator('Circle x Center',
    [
        { id: 'cir_x_bar', placeholder: 'x bar' },
        { id: 'cir_d_x', placeholder: 'D' }
    ],
    formula_circle_x_bar,
    '../assets/structural/circle_x_bar.png'
);

createCalculator('Circle y Center',
    [
        { id: 'cir_y_bar', placeholder: 'y bar' },
        { id: 'cir_d_y', placeholder: 'D' }
    ],
    formula_circle_y_bar,
    '../assets/structural/circle_y_bar.png'
);

createCalculator('Circle area',
    [
        { id: 'cir_area', placeholder: 'area' },
        { id: 'cir_r', placeholder: 'radius' }
    ],
    formula_circle_area,
    '../assets/structural/circle_area.png'
);

createCalculator('Circle I x',
    [
        { id: 'cir_I_x_bar', placeholder: 'I x bar' },
        { id: 'cir_r_x', placeholder: 'radius' }
    ],
    formula_circle_I_x_bar,
    '../assets/structural/circle_I_x_bar.png'
);

createCalculator('Circle I y',
    [
        { id: 'cir_I_y_bar', placeholder: 'I y bar' },
        { id: 'cir_r_y', placeholder: 'radius' }
    ],
    formula_circle_I_y_bar,
    '../assets/structural/circle_I_y_bar.png'
);

createCalculator('Half Circle x Center',
    [
        { id: 'half_cir_x_bar', placeholder: 'x bar' },
        { id: 'half_cir_D', placeholder: 'diameter' }
    ],
    formula_half_circle_x_bar,
    '../assets/structural/half_cir_x_bar.png'
);

createCalculator('Half Circle y Center',
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

createCalculator('Half Circle I x',
    [
        { id: 'half_cir_I_x_bar', placeholder: 'I x bar' },
        { id: 'half_cir_r2', placeholder: 'radius' }
    ],
    formula_half_circle_I_x_bar,
    '../assets/structural/half_cir_I_x_bar.png'
);

createCalculator('Half Circle I y',
    [
        { id: 'half_cir_I_y_bar', placeholder: 'I y bar' },
        { id: 'half_cir_r3', placeholder: 'radius' }
    ],
    formula_half_circle_I_y_bar,
    '../assets/structural/half_cir_I_y_bar.png'
);

createCalculator('Quarter Circle x Center',
    [
        { id: 'quarter_cir_x_bar', placeholder: 'x bar' },
        { id: 'quarter_cir_r', placeholder: 'radius' }
    ],
    formula_quarter_circle_x_bar,
    '../assets/structural/quarter_cir_x_bar.png'
);

createCalculator('Quarter Circle y Center',
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

createCalculator('Quarter Circle I x',
    [
        { id: 'quarter_cir_I_x_bar', placeholder: 'I x bar' },
        { id: 'quarter_cir_r3', placeholder: 'radius' }
    ],
    formula_quarter_circle_I_x_bar,
    '../assets/structural/quarter_cir_I_x_bar.png'
);

createCalculator('Quarter Circle I y',
    [
        { id: 'quarter_cir_I_y_bar', placeholder: 'I y bar' },
        { id: 'quarter_cir_r4', placeholder: 'radius' }
    ],
    formula_quarter_circle_I_y_bar,
    '../assets/structural/quarter_cir_I_y_bar.png'
);

createCalculator('Half Elipse y Center',
    [
        { id: 'half_elipse_y_bar', placeholder: 'y bar' },
        { id: 'half_elipse_b', placeholder: 'b' }
    ],
    formula_half_elipse_y_bar,
    '../assets/structural/half_elipse_y_bar.png'
)

createCalculator('Half Elipse area',
    [
        { id: 'half_elipse_area', placeholder: 'area' },
        { id: 'half_elipse_a', placeholder: 'a' },
        { id: 'half_elipse_b1', placeholder: 'b' }
    ],
    formula_half_elipse_area,
    '../assets/structural/half_elipse_area.png'
)

createCalculator('Half Elipse I x',
    [
        { id: 'half_elipse_I_x_bar', placeholder: 'I x bar' },
        { id: 'half_elipse_a1', placeholder: 'a' },
        { id: 'half_elipse_b2', placeholder: 'b' }
    ],
    formula_half_elipse_I_x_bar,
    '../assets/structural/half_elipse_I_x_bar.png'
)

createCalculator('Half Elipse I y',
    [
        { id: 'half_elipse_I_y_bar', placeholder: 'I y bar' },
        { id: 'half_elipse_a2', placeholder: 'a' },
        { id: 'half_elipse_b3', placeholder: 'b' }
    ],
    formula_half_elipse_I_y_bar,
    '../assets/structural/half_elipse_I_y_bar.png'
)

createCalculator('Quarter Elipse x Center',
    [
        { id: 'quarter_elipse_x_bar', placeholder: 'x bar' },
        { id: 'quarter_elipse_a', placeholder: 'a' }
    ],
    formula_quarter_elipse_x_bar,
    '../assets/structural/quarter_elipse_x_bar.png'
)

createCalculator('Quarter Elipse y Center',
    [
        { id: 'quarter_elipse_y_bar', placeholder: 'y bar' },
        { id: 'quarter_elipse_b', placeholder: 'b' }
    ],
    formula_quarter_elipse_y_bar,
    '../assets/structural/quarter_elipse_y_bar.png'
)

createCalculator('Quarter Elipse area',
    [
        { id: 'quarter_elipse_area', placeholder: 'area' },
        { id: 'quarter_elipse_a1', placeholder: 'a' },
        { id: 'quarter_elipse_b1', placeholder: 'b' }
    ],
    formula_quarter_elipse_area,
    '../assets/structural/quarter_elipse_area.png'
)

createCalculator('Quarter Elipse I x',
    [
        { id: 'quarter_elipse_I_x_bar', placeholder: 'I x bar' },
        { id: 'quarter_elipse_a2', placeholder: 'a' },
        { id: 'quarter_elipse_b2', placeholder: 'b' }
    ],
    formula_quarter_elipse_I_x_bar,
    '../assets/structural/quarter_elipse_I_x_bar.png'
)

createCalculator('Quarter Elipse I y',
    [
        { id: 'quarter_elipse_I_y_bar', placeholder: 'I y bar' },
        { id: 'quarter_elipse_a3', placeholder: 'a' },
        { id: 'quarter_elipse_b3', placeholder: 'b' }
    ],
    formula_quarter_elipse_I_y_bar,
    '../assets/structural/quarter_elipse_I_y_bar.png'
)

createCalculator('Parabola y Center',
    [
        { id: 'para_y_bar', placeholder: 'y bar' },
        { id: 'para_h', placeholder: 'h' }
    ],
    formula_parabola_y_bar,
    '../assets/structural/parabola_y_bar.png'
)

createCalculator('Parabola area',
    [
        { id: 'para_area', placeholder: 'area' },
        { id: 'para_a', placeholder: 'a' },
        { id: 'para_h1', placeholder: 'h' }
    ],
    formula_parabola_area,
    '../assets/structural/parabola_area.png'
)

createCalculator('Parabola I x',
    [
        { id: 'para_I_x_bar', placeholder: 'I x bar' },
        { id: 'para_a1', placeholder: 'a' },
        { id: 'para_h2', placeholder: 'h' }
    ],
    formula_parabola_I_x_bar,
    '../assets/structural/parabola_I_x_bar.png'
)

createCalculator('Parabola I y',
    [
        { id: 'para_I_y_bar', placeholder: 'I y bar' },
        { id: 'para_a2', placeholder: 'a' },
        { id: 'para_h3', placeholder: 'h' }
    ],
    formula_parabola_I_y_bar,
    '../assets/structural/parabola_I_y_bar.png'
)

createCalculator('Half Parabola x Center',
    [
        { id: 'med_par_x_bar', placeholder: 'x bar' },
        { id: 'med_par_a', placeholder: 'a' }
    ],
    formula_media_parabola_x_bar,
    '../assets/structural/media_parabola.png'
);

createCalculator('Half Parabola y Center',
    [
        { id: 'med_par_y_bar', placeholder: 'y bar' },
        { id: 'med_par_h', placeholder: 'h' }
    ],
    formula_media_parabola_y_bar,
    '../assets/structural/media_parabola.png'
);

createCalculator('Half Parabola area',
    [
        { id: 'med_par_area', placeholder: 'area' },
        { id: 'med_par_a2', placeholder: 'a' },
        { id: 'med_par_h2', placeholder: 'h' }
    ],
    formula_media_parabola_area,
    '../assets/structural/media_parabola.png'
);

createCalculator('Half Parabola I x',
    [
        { id: 'med_par_I_x_bar', placeholder: 'I x bar' },
        { id: 'med_par_a3', placeholder: 'a' },
        { id: 'med_par_h3', placeholder: 'h' }
    ],
    formula_media_parabola_I_x_bar,
    '../assets/structural/media_parabola.png'
);

createCalculator('Half Parabola I y',
    [
        { id: 'med_par_I_y_bar', placeholder: 'I y bar' },
        { id: 'med_par_a4', placeholder: 'a' },
        { id: 'med_par_h4', placeholder: 'h' }
    ],
    formula_media_parabola_I_y_bar,
    '../assets/structural/media_parabola.png'
);

// createCalculator('Extrato parabolico x Center',
//     [
//         { id: 'para_sec_x_bar', placeholder: 'x bar' },
//         { id: 'para_sec_a', placeholder: 'a' }
//     ],
//     formula_parabolic_section_x_bar,
//     '../assets/structural/extrato_parabolico.png'
// );

// createCalculator('Extrato parabolico y Center',
//     [
//         { id: 'para_sec_y_bar', placeholder: 'y bar' },
//         { id: 'para_sec_h', placeholder: 'h' }
//     ],
//     formula_parabolic_section_y_bar,
//     '../assets/structural/extrato_parabolico.png'
// );

// createCalculator('Extrato parabolico area',
//     [
//         { id: 'para_sec_area', placeholder: 'area' },
//         { id: 'para_sec_a1', placeholder: 'a' },
//         { id: 'para_sec_h1', placeholder: 'h' }
//     ],
//     formula_parabolic_section_area,
//     '../assets/structural/extrato_parabolico.png'
// );

// createCalculator('Extrato parabolico I x bar',
//     [
//         { id: 'para_sec_I_x_bar', placeholder: 'I x bar' },
//         { id: 'para_sec_a2', placeholder: 'a' },
//         { id: 'para_sec_h2', placeholder: 'h' }
//     ],
//     formula_parabolic_section_I_x_bar,
//     '../assets/structural/extrato_parabolico.png'
// );

// createCalculator('Extrato parabolico I y bar',
//     [
//         { id: 'para_sec_I_y_bar', placeholder: 'I y bar' },
//         { id: 'para_sec_a3', placeholder: 'a' },
//         { id: 'para_sec_h3', placeholder: 'h' }
//     ],
//     formula_parabolic_section_I_y_bar,
//     '../assets/structural/extrato_parabolico.png'
// );

// createCalculator('General section x bar',
//     [
//         { id: 'gen_sec_x_bar', placeholder: 'x bar' },
//         { id: 'gen_sec_a', placeholder: 'a' },
//         { id: 'gen_sec_n', placeholder: 'n' }
//     ],
//     formula_general_section_x_bar,
//     '../assets/structural/general_section.png'
// );

// createCalculator('General section y bar',
//     [
//         { id: 'gen_sec_y_bar', placeholder: 'y bar' },
//         { id: 'gen_sec_h', placeholder: 'h' },
//         { id: 'gen_sec_n1', placeholder: 'n' }
//     ],
//     formula_general_section_y_bar,
//     '../assets/structural/general_section.png'
// );

// createCalculator('General section area',
//     [
//         { id: 'gen_sec_area', placeholder: 'area' },
//         { id: 'gen_sec_a1', placeholder: 'a' },
//         { id: 'gen_sec_h1', placeholder: 'h' },
//         { id: 'gen_sec_n2', placeholder: 'n' }
//     ],
//     formula_general_section_area,
//     '../assets/structural/general_section.png'
// );

// createCalculator('General section I x bar',
//     [
//         { id: 'gen_sec_I_x_bar', placeholder: 'I x bar' },
//         { id: 'gen_sec_a2', placeholder: 'a' },
//         { id: 'gen_sec_h2', placeholder: 'h' },
//         { id: 'gen_sec_n3', placeholder: 'n' }
//     ],
//     formula_general_section_I_x_bar,
//     '../assets/structural/general_section.png'
// );

// createCalculator('General section I y bar',
//     [
//         { id: 'gen_sec_I_y_bar', placeholder: 'I y bar' },
//         { id: 'gen_sec_a3', placeholder: 'a' },
//         { id: 'gen_sec_h3', placeholder: 'h' },
//         { id: 'gen_sec_n4', placeholder: 'n' }
//     ],
//     formula_general_section_I_y_bar,
//     '../assets/structural/general_section.png'
// );

createCalculator('Hollow Shaft',
    [
        { id: 'cylindrical_I', placeholder: 'I' },
        { id: 'cylindrical_D', placeholder: 'D' },
        { id: 'cylindrical_d', placeholder: 'd' },
    ],
    formula_cylindrical_I,
    '../assets/structural/cylindrical_I.png'
);

// createCalculator('Hollow Shaft I 2',
//     [
//         { id: 'cylindrical_I2', placeholder: 'I' },
//         { id: 'cylindrical_r_outer', placeholder: 'r_outer' },
//         { id: 'cylindrical_r_inner', placeholder: 'r_inner' },
//     ],
//     formula_cylindrical_I_2,
//     '../assets/structural/cylindrical_I.png'
// );


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
            const [, P, A, L, E, I] = inputValues; 
            result = formulas[0].calculate(P, A, L, E, I);
            console.log(result)
        } else if (missingIndex === 1) {
            // Missing value for second input
            const [dMax, , A, L, E, I] = inputValues;
            result = formulas[1].calculate(dMax, A, L, E, I);
            console.log(result)
        } else if (missingIndex === 2) {
            // Missing value for third input
            const [dMax, P, , L, E, I] = inputValues;
            rightSide = -6.0 * E * I * dMax / P;
            coeff = - 0.75 * L * L;
            result = "Too hard to compute a. Possible solutions are the ones that satisfy: a^3 + " + coeff + "a = " + rightSide;
            console.log(result)
        } else if (missingIndex === 3) {
            // Missing value for third input
            const [dMax, P, A, , E, I] = inputValues;
            result = formulas[2].calculate(dMax, P, A,  E, I);
            console.log(result)
        } else if (missingIndex === 4) {
            // Missing value for third input
            const [dMax, P, A, L, , I] = inputValues;
            result = formulas[3].calculate(dMax, P, A, L, I);
            console.log(result)
        } else if (missingIndex === 5) {
            // Missing value for third input
            const [dMax, P, A, L, E, ] = inputValues;
            result = formulas[4].calculate(dMax, P, A, L, E);
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

const formula_beam_deflection1 = [
    {
        displayName: 'Calculate delta_max',
        calculate: (P, A, L, E, I) => (P * A * (3 * L**2 - 4 * A**2)) / (24 * E * I)
    },
    {
        displayName: 'Calculate P',
        calculate: (delta_max, A, L, E, I) => (delta_max * 24 * E * I) / (A * (3 * L**2 - 4 * A**2))
    },
    {
        displayName: 'Calculate L',
        calculate: (delta_max, P, A, E, I) => Math.sqrt(((delta_max * 24 * E * I / (P * A)) + 4 * A**2) / 3)
    },
    {
        displayName: 'Calculate E',
        calculate: (delta_max, P, A, L, I) => P*A*(3*L**2 - 4*A**2) / (delta_max * 24 * I)
    },
    {
        displayName: 'Calculate I',
        calculate: (delta_max, P, A, L, E) => P*A*(3*L**2 - 4*A**2) / (delta_max * 24 * E)
    }
];


function createCalculator3(title, inputFields, formulas, imageUrl) {
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
            const [, P, A, B, L, E, I] = inputValues; 
            result = formulas[0].calculate(P, A, B, L, E, I);
            console.log(result)
        } else if (missingIndex === 1) {
            // Missing value for second input
            const [dMax, , A, B, L, E, I] = inputValues;
            result = formulas[1].calculate(dMax, A, B, L, E, I);
            console.log(result)
        } else if (missingIndex === 2) {
            // Missing value for third input
            const [dMax, P, , B, L, E, I] = inputValues;
            rightSide = 1
            coeff = 1
            result = "Too hard to compute A";
            console.log(result)
        } else if (missingIndex === 3) {
            // Missing value for third input
            const [dMax, P, A, , L, E, I] = inputValues;
            result = "Too hard to compute B";
            console.log(result)
        } else if (missingIndex === 4) {
            // Missing value for third input
            const [dMax, P, A, B, , E, I] = inputValues;
            result = formulas[2].calculate(dMax, P, A, B, E, I);
            console.log(result)
        } else if (missingIndex === 5) {
            // Missing value for third input
            const [dMax, P, A, B, L, , I] = inputValues;
            result = formulas[3].calculate(dMax, P, A, B, L, I);
            console.log(result)
        }  else if (missingIndex === 6) {
            // Missing value for third input
            const [dMax, P, A, B, L, E, ] = inputValues;
            result = formulas[4].calculate(dMax, P, A, B, L, E);
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

const formula_beam_deflection3 = [
    {
        displayName: 'Calculate delta_max',
        calculate: (P, A, B, L, E, I) => P * A * B * (A + 2* B) * Math.sqrt(3 * A * (A + 2 * B)) / (27 * L *E * I)
    },
    {
        displayName: 'Calculate P',
        calculate: (delta_max, A, B, L, E, I) => (delta_max * 27 * L * E * I) / (A * B * (A + 2 * B) * Math.sqrt(3 * A * (A + 2 * B)))
    },
    {
        displayName: 'Calculate L',
        calculate: (delta_max, P, A, B, E, I) => P * A * B * (A + 2* B) * Math.sqrt(3 * A * (A + 2 * B)) / (27 * delta_max *E * I)
    },
    {
        displayName: 'Calculate E',
        calculate: (delta_max, P, A, B, L, I) => P * A * B * (A + 2* B) * Math.sqrt(3 * A * (A + 2 * B)) / (27 * delta_max * L * I)
    },
    {
        displayName: 'Calculate I',
        calculate: (delta_max, P, A, B, L, E) => P * A * B * (A + 2* B) * Math.sqrt(3 * A * (A + 2 * B)) / (27 * delta_max *E * L)
    }
];

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
            const [, a, b] = inputValues; 
            result = formulas[0].calculate(a,b);
            console.log(result)
        } else if (missingIndex === 1) {
            // Missing value for second input
            const [x,,b] = inputValues;
            result = formulas[1].calculate(x,b);
            console.log(result)
        } else if (missingIndex === 2) {
            // Missing value for third input
            const [x,a,] = inputValues;
            result = formulas[2].calculate(x,a);
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

const formula_beam_deflection4 = [
    {
        displayName: 'Calculate x',
        calculate: (a,b) => Math.sqrt(a * (a + 2 * b) / 3)
    },
    {
        displayName: 'Calculate a',
        calculate: (x,b) => (- 2 * b + Math.sqrt(4 * b * b + 12 * x * x)) / (2)
    },
    {
        displayName: 'Calculate b',
        calculate: (x,a) => (x * x * 3  - a * a ) / (2 * a)
    }
];


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
            const [, P, A, B, L] = inputValues; 
            result = formulas[0].calculate(P, A, B, L);
            console.log(result)
        } else if (missingIndex === 1) {
            // Missing value for second input
            const [m_max, , A, B, L] = inputValues;
            result = formulas[1].calculate(m_max, A, B, L);
            console.log(result)
        } else if (missingIndex === 2) {
            // Missing value for third input
            const [m_max, P , , B, L] = inputValues;
            result = formulas[2].calculate(m_max, P, B, L);
            console.log(result)
        } else if (missingIndex === 3) {
            // Missing value for third input
            const [m_max, P , A, , L] = inputValues;
            result = formulas[3].calculate(m_max, P, A, L);
            console.log(result)
        } else if (missingIndex === 4) {
            // Missing value for third input
            const [m_max, P , A, B ,] = inputValues;
            result = formulas[4].calculate(m_max, P, A, B);
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

const formula_beam_deflection5 = [
    {
        displayName: 'm_max',
        calculate: (P, A, B, L) => P * A * B / L
    },
    {
        displayName: 'Calculate P',
        calculate: (m_max, A, B, L) => m_max * L / (A * B)
    },
    {
        displayName: 'Calculate A',
        calculate: (m_max, P, B, L) => m_max * L / (P * B)
    },
    {
        displayName: 'Calculate B',
        calculate: (m_max, P, A, L) => m_max * L / (P * A)
    },
    {
        displayName: 'Calculate L',
        calculate: (m_max, P, A, B) => P * A * B / m_max
    }
];

function createCalculator6(title, inputFields, formulas, imageUrl) {
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
            const [, P, A, L] = inputValues; 
            result = formulas[0].calculate(P, A, L);
            console.log(result)
        } else if (missingIndex === 1) {
            // Missing value for second input
            const [R, , A, L] = inputValues;
            result = formulas[1].calculate(R, A, L);
            console.log(result)
        } else if (missingIndex === 2) {
            // Missing value for third input
            const [R, P , , L] = inputValues;
            result = formulas[2].calculate(R, P, L);
            console.log(result)
        } else if (missingIndex === 3) {
            // Missing value for third input
            const [R, P , A, ] = inputValues;
            result = formulas[3].calculate(R, P, A);
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

const formula_beam_deflection6 = [
    {
        displayName: 'R',
        calculate: (P, A, L) => P * A / L
    },
    {
        displayName: 'P',
        calculate: (R, A, L) => R * L / A
    },
    {
        displayName: 'Calculate A',
        calculate: (R, P, L) => R * L / P 
    },
    {
        displayName: 'Calculate L',
        calculate: (R, P, A) => P * A / R
    }
];
