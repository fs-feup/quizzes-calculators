// Function to create a new set of input fields
function createInputFields(container) {
    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';

    const xInput = document.createElement('input');
    xInput.type = 'number';
    xInput.placeholder = 'x';
    xInput.className = 'coordinate';

    const yInput = document.createElement('input');
    yInput.type = 'number';
    yInput.placeholder = 'y';
    yInput.className = 'coordinate';

    const zInput = document.createElement('input');
    zInput.type = 'number';
    zInput.placeholder = 'z';
    zInput.className = 'coordinate';

    const massInput = document.createElement('input');
    massInput.type = 'number';
    massInput.placeholder = 'mass';
    massInput.className = 'mass';

    inputGroup.appendChild(xInput);
    inputGroup.appendChild(yInput);
    inputGroup.appendChild(zInput);
    inputGroup.appendChild(massInput);

    container.insertBefore(inputGroup, container.querySelector('.buttons'));
}

// Function to calculate the center of mass
function calculateCenterOfMass(inputs) {
    let totalMass = 0;
    let xSum = 0;
    let ySum = 0;
    let zSum = 0;

    inputs.forEach(inputGroup => {
        const x = parseFloat(inputGroup.querySelector('.coordinate[placeholder="x"]').value);
        const y = parseFloat(inputGroup.querySelector('.coordinate[placeholder="y"]').value);
        const z = parseFloat(inputGroup.querySelector('.coordinate[placeholder="z"]').value);
        const mass = parseFloat(inputGroup.querySelector('.mass').value);

        if (!isNaN(x) && !isNaN(y) && !isNaN(z) && !isNaN(mass)) {
            totalMass += mass;
            xSum += x * mass;
            ySum += y * mass;
            zSum += z * mass;
        }
    });

    return {
        x: xSum / totalMass,
        y: ySum / totalMass,
        z: zSum / totalMass
    };
}

// Main function to create the calculator
function createCenterOfMassCalculator() {
    const container = document.getElementById('calculator-container');
    const calculatorDiv = document.createElement('div');
    calculatorDiv.className = 'calculator';

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'buttons';

    const addButton = document.createElement('button');
    addButton.innerText = 'Add Part';
    addButton.onclick = () => createInputFields(calculatorDiv);

    const calculateButton = document.createElement('button');
    calculateButton.innerText = 'Calculate Center of Mass';
    calculateButton.onclick = () => {
        const inputGroups = calculatorDiv.querySelectorAll('.input-group');
        const result = calculateCenterOfMass(inputGroups);
        resultParagraph.innerText = `Center of Mass: (x: ${result.x}, y: ${result.y}, z: ${result.z})`;
    };

    const resultParagraph = document.createElement('p');
    resultParagraph.className = 'result';

    buttonsDiv.appendChild(addButton);
    buttonsDiv.appendChild(calculateButton);
    calculatorDiv.appendChild(buttonsDiv);
    calculatorDiv.appendChild(resultParagraph);
    container.appendChild(calculatorDiv);

    // Add the first set of input fields
    createInputFields(calculatorDiv);
}

// Initialize the calculator
createCenterOfMassCalculator();