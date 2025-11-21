// === FSG CHASSIS CALCULATOR WITH AUTO CALC ===

const calculators = [];

const MIN_REQUIREMENTS = [
    { thickness: 2.0, area: 173, inertia: 11320 }, // S1
    { thickness: 1.2, area: 119, inertia: 8509 },  // S2
    { thickness: 1.2, area: 91, inertia: 6695 }    // S3
];

function createCalculator(index, formulas) {
    const calculatorDiv = document.createElement('div');
    calculatorDiv.className = 'calculator';

    // Title
    const title = document.createElement('h3');
    title.innerText = `Calculator #${index + 1}`;
    calculatorDiv.appendChild(title);

    // Inputs
    const outerLabel = document.createElement('label');
    outerLabel.innerText = 'Outer diameter / width (mm)';
    calculatorDiv.appendChild(outerLabel);

    const outerInput = document.createElement('input');
    outerInput.type = 'text';
    outerInput.placeholder = 'Outer diameter / width (mm)';
    calculatorDiv.appendChild(outerInput);

    const thickLabel = document.createElement('label');
    thickLabel.innerText = 'Thickness (mm)';
    calculatorDiv.appendChild(thickLabel);

    const thickInput = document.createElement('input');
    thickInput.type = 'text';
    thickInput.placeholder = 'Thickness (mm)';
    calculatorDiv.appendChild(thickInput);

    // Shape toggle
    const shapeLabel = document.createElement('label');
    shapeLabel.innerText = 'Shape';
    shapeLabel.classList.add('shape-label');
    calculatorDiv.appendChild(shapeLabel);

    const switchWrap = document.createElement('div');
    switchWrap.className = 'switch-wrap';
    calculatorDiv.appendChild(switchWrap);

    const circularText = document.createElement('span');
    circularText.innerText = 'Circular';

    const rectText = document.createElement('span');
    rectText.innerText = 'Quadrangular';

    const toggleLabel = document.createElement('label');
    toggleLabel.className = 'switch';

    const toggleInput = document.createElement('input');
    toggleInput.type = 'checkbox';

    const slider = document.createElement('span');
    slider.className = 'slider';

    toggleLabel.appendChild(toggleInput);
    toggleLabel.appendChild(slider);

    switchWrap.append(circularText, toggleLabel, rectText);

    // Result container
    const resultContainer = document.createElement('div');
    resultContainer.className = 'result-container';
    calculatorDiv.appendChild(resultContainer);

    // Rows
    const rowNames = ['Thickness', 'Cross area', 'Inertia'];
    const squares = [];

    rowNames.forEach(rowName => {
        const row = document.createElement('div');
        row.className = 'result-row';

        const nameDiv = document.createElement('div');
        nameDiv.innerText = rowName;
        nameDiv.className = 'name';
        row.appendChild(nameDiv);

        const valDiv = document.createElement('div');
        valDiv.innerText = '0.00';
        valDiv.className = 'value';
        row.appendChild(valDiv);

        const squaresContainer = document.createElement('div');
        squaresContainer.className = 'squares-container';

        const squareDivs = [];
        for (let s = 1; s <= 3; s++) {
            const sq = document.createElement('div');
            sq.innerText = `S${s}`;
            sq.className = 'square';
            sq.style.backgroundColor = 'grey'; // INITIAL GREY
            squareDivs.push(sq);
            squaresContainer.appendChild(sq);
        }

        row.appendChild(squaresContainer);
        squares.push({ valDiv, squareDivs });

        resultContainer.appendChild(row);
    });

    // AUTO CALCULATE FUNCTION
    function recalc() {
        const d_ext = parseFloat(outerInput.value.replace(',', '.'));
        const thickness = parseFloat(thickInput.value.replace(',', '.'));
        const shape = toggleInput.checked ? 'quadrangular' : 'circular';

        // If not valid, reset squares to grey
        if (isNaN(d_ext) || isNaN(thickness)) {
            squares.forEach(row => {
                row.valDiv.innerText = '0.00';
                row.squareDivs.forEach(sq => sq.style.backgroundColor = 'grey');
            });
            return;
        }

        const area = formulas.area(shape, d_ext, thickness);
        const inertia = formulas.inertia(shape, d_ext, thickness);
        const values = [thickness, area, inertia];

        values.forEach((val, i) => {
            squares[i].valDiv.innerText = val.toFixed(2);

            squares[i].squareDivs.forEach((sq, s) => {
                let minVal;
                if (i === 0) minVal = MIN_REQUIREMENTS[s].thickness;
                else if (i === 1) minVal = MIN_REQUIREMENTS[s].area;
                else minVal = MIN_REQUIREMENTS[s].inertia;

                sq.style.backgroundColor = val >= minVal ? 'green' : 'red';
            });
        });
    }

    // Auto update on user input
    outerInput.addEventListener('input', recalc);
    thickInput.addEventListener('input', recalc);
    toggleInput.addEventListener('change', recalc);

    document.getElementById('calculator-container').appendChild(calculatorDiv);

    calculators[index] = { outerInput, thickInput, toggleInput, squares };
}

// Formulas
const formulas = {
    area: (shape, D, t) => shape === 'circular'
        ? Math.PI * ((D * D) - ((D - 2 * t) ** 2)) / 4
        : (D * D) - ((D - 2 * t) ** 2),
    inertia: (shape, D, t) => shape === 'circular'
        ? Math.PI * ((D ** 4) - ((D - 2 * t) ** 4)) / 64
        : ((D ** 4) - ((D - 2 * t) ** 4)) / 12
};

// Number of calculators
const numInput = document.getElementById('numCalculators');
numInput.classList.add('num-input');

numInput.addEventListener('change', () => {
    const num = parseInt(numInput.value) || 1;

    for (let i = calculators.length; i < num; i++) {
        createCalculator(i, formulas);
    }

    while (calculators.length > num) {
        const calc = calculators.pop();
        calc.outerInput.parentElement.remove();
    }
});

numInput.dispatchEvent(new Event('change'));
