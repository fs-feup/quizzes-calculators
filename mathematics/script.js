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

    // Create input fields
    inputFields.forEach(field => {
        const input = document.createElement('input');
        const text = document.createElement('div');
        text.innerText = field.placeholder;
        input.type = 'text';
        input.id = field.id;
        input.placeholder = field.placeholder;
        calculatorDiv.appendChild(text);
        calculatorDiv.appendChild(input);
    });

    const button = document.createElement('button');
    button.innerText = 'Calculate Area';
    button.onclick = () => {
        const input = document.getElementById(inputFields[0].id);
        value = input.value.replace(',', '.');
        const d = parseFloat(value);

        let resultParagraph = calculatorDiv.querySelector('.result');
        if (!resultParagraph) {
            resultParagraph = document.createElement('p');
            resultParagraph.className = 'result';
            calculatorDiv.appendChild(resultParagraph);
        }

        if (isNaN(d)) {
            resultParagraph.innerText = 'Enter a valid numeric distance.';
            resultParagraph.style.color = 'red';
            return;
        }

        // Only x**2 function
        const area = formulas[0].calculate(d);
        resultParagraph.innerText = `Result: ${area.toFixed(8)}`;
        resultParagraph.style.color = 'black';
    };

    calculatorDiv.appendChild(button);
    document.getElementById('calculator-container').appendChild(calculatorDiv);
}

// Formula for area under x² using midpoint approximation
const formulas = [
    {
        displayName: 'Calculate area under x²',
        calculate: (d) => (Math.PI / 8) * d * d
    }
];

createCalculator(
    'Midpoint Area Calculator for x²',
    [
        { id: 'distance', placeholder: 'Distance between points (d)' }
    ],
    formulas,
    '../assets/math/midpoint_area.png'
);
