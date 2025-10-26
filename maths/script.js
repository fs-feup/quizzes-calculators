function createMidpointAreaCalculator(title, imageUrl) {
    const calculatorDiv = document.createElement('div');
    calculatorDiv.className = 'calculator';
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

    const inputs = [
        { id: 'fx', placeholder: 'f(x) = polynomial or standard function' },
        { id: 'distance', placeholder: 'd = distance between points' }
    ];

    inputs.forEach(field => {
        const label = document.createElement('div');
        label.innerText = field.placeholder;
        const input = document.createElement('input');
        input.type = 'text';
        input.id = field.id;
        input.placeholder = field.placeholder;
        calculatorDiv.appendChild(label);
        calculatorDiv.appendChild(input);
    });

    const button = document.createElement('button');
    button.innerText = 'Calculate Area';
    button.onclick = () => {
        try {
            const fxInput = document.getElementById('fx').value.trim();
            const d = parseFloat(document.getElementById('distance').value);

            if (!fxInput || isNaN(d)) {
                alert('Enter a valid function and numeric distance.');
                return;
            }

            const fx = fxInput.replace(/\s+/g, ''); // remove spaces
            let area;
            let error = null;

            // Regex to detect a parabola: ax**2 + bx + c, where a != 0
            const parabolaRegex = /^([-+]?\d*\.?\d*)x\*\*2([+-]\d*\.?\d*)?x?([+-]\d*\.?\d*)?$/;

            if (parabolaRegex.test(fx)) {
                // extract coefficient a
                const aMatch = fx.match(/^([-+]?\d*\.?\d*)x\*\*2/);
                let a = parseFloat(aMatch[1]);
                if (isNaN(a)) a = 1; // x**2 case
                area = (Math.PI / 8) * (d * d) * Math.abs(a); // scale with a
            } else if (fx === 'sin(x)' || fx === 'cos(x)') {
                area = 0.5 * d * d; // approximate, over [-π/2, π/2]
            } else {
                error = 'Function not supported. Only parabolas, sin(x) or cos(x) are allowed.';
            }

            // Display result
            let resultParagraph = calculatorDiv.querySelector('.result');
            if (!resultParagraph) {
                resultParagraph = document.createElement('p');
                resultParagraph.className = 'result';
                calculatorDiv.appendChild(resultParagraph);
            }

            if (error) {
                resultParagraph.innerText = error;
                resultParagraph.style.color = 'red';
            } else {
                resultParagraph.innerText = `Approx. area between curves: ${area.toFixed(8)}`;
                resultParagraph.style.color = 'black';
            }


        } catch (err) {
            alert('Error calculating area.');
            console.error(err);
        }
    };

    calculatorDiv.appendChild(button);
    document.getElementById('calculator-container').appendChild(calculatorDiv);
}

// Create the calculator
createMidpointAreaCalculator(
    'Midpoint Curve & Area Calculator',
    '../assets/math/midpoint_area.png'
);
