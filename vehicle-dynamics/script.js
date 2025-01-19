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

        // Check for missing values
        if (inputValues.some(isNaN)) {
            alert('Please fill in all input fields.');
            return;
        }

        const [yaw_rate, vx, vy, L, T, delta, wf] = inputValues;

        // Calculate slip angles
        const v_FL_x = vx - yaw_rate * (T / 2);
        const v_FL_y = vy + yaw_rate * (L * wf);
        const alpha_FL = Math.abs(delta - Math.atan2(v_FL_y, v_FL_x)) * (180 / Math.PI);

        const v_FR_x = vx + yaw_rate * (T / 2);
        const v_FR_y = vy + yaw_rate * (L * wf);
        const alpha_FR = Math.abs(delta - Math.atan2(v_FR_y, v_FR_x)) * (180 / Math.PI);

        const v_RL_x = vx - yaw_rate * (T / 2);
        const v_RL_y = vy - yaw_rate * (L * (1 - wf));
        const alpha_RL = Math.abs(-Math.atan2(v_RL_y, v_RL_x)) * (180 / Math.PI);

        const v_RR_x = vx + yaw_rate * (T / 2);
        const v_RR_y = vy - yaw_rate * (L * (1 - wf));
        const alpha_RR = Math.abs(-Math.atan2(v_RR_y, v_RR_x)) * (180 / Math.PI);

        let resultParagraph = calculatorDiv.querySelector('.result');

        if (!resultParagraph) {
            resultParagraph = document.createElement('p');
            resultParagraph.className = 'result';
            calculatorDiv.appendChild(resultParagraph);
        }

        resultParagraph.innerText = `Results:\nAlpha_FL: ${alpha_FL.toFixed(2)}°\nAlpha_FR: ${alpha_FR.toFixed(2)}°\nAlpha_RL: ${alpha_RL.toFixed(2)}°\nAlpha_RR: ${alpha_RR.toFixed(2)}°`;
    };

    calculatorDiv.appendChild(button);
    document.getElementById('calculator-container').appendChild(calculatorDiv);
}

createCalculator('Slip Angle Calculator',
    [
        { id: 'yaw_rate', placeholder: 'Yaw Rate (rad/s)' },
        { id: 'vx', placeholder: 'Longitudinal Velocity (m/s)' },
        { id: 'vy', placeholder: 'Lateral Velocity (m/s)' },
        { id: 'L', placeholder: 'Wheelbase (m)' },
        { id: 'T', placeholder: 'Track Width (m)' },
        { id: 'delta', placeholder: 'Steering Angle (rad)' },
        { id: 'wf', placeholder: 'Weight Distribution Front (fraction) [0;1]' }
    ],
    null,
    '../assets/vehicle/slip_angle.gif');