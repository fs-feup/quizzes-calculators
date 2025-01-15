function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function createRotationMatrix(roll, pitch, yaw) {
    roll = degreesToRadians(roll);
    pitch = degreesToRadians(pitch);
    yaw = degreesToRadians(yaw);

    const cosRoll = Math.cos(roll);
    const sinRoll = Math.sin(roll);
    const cosPitch = Math.cos(pitch);
    const sinPitch = Math.sin(pitch);
    const cosYaw = Math.cos(yaw);
    const sinYaw = Math.sin(yaw);

    const rotX = [
        [1, 0, 0],
        [0, cosRoll, -sinRoll],
        [0, sinRoll, cosRoll]
    ];

    const rotY = [
        [cosPitch, 0, sinPitch],
        [0, 1, 0],
        [-sinPitch, 0, cosPitch]
    ];

    const rotZ = [
        [cosYaw, -sinYaw, 0],
        [sinYaw, cosYaw, 0],
        [0, 0, 1]
    ];

    // Multiply the rotation matrices: rotZ * rotY * rotX
    const rotZY = multiplyMatrices(rotZ, rotY);
    const rot = multiplyMatrices(rotZY, rotX);

    // Round the matrix values to 4 decimal places
    return rot.map(row => row.map(value => Math.round(value * 10000) / 10000));
}

function inverseMatrix(matrix) {
    const det = matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
                matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
                matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]);

    if (det === 0) {
        throw new Error("Matrix is not invertible");
    }

    const invDet = 1 / det;

    const inverse = [
        [
            (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) * invDet,
            (matrix[0][2] * matrix[2][1] - matrix[0][1] * matrix[2][2]) * invDet,
            (matrix[0][1] * matrix[1][2] - matrix[0][2] * matrix[1][1]) * invDet
        ],
        [
            (matrix[1][2] * matrix[2][0] - matrix[1][0] * matrix[2][2]) * invDet,
            (matrix[0][0] * matrix[2][2] - matrix[0][2] * matrix[2][0]) * invDet,
            (matrix[0][2] * matrix[1][0] - matrix[0][0] * matrix[1][2]) * invDet
        ],
        [
            (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]) * invDet,
            (matrix[0][1] * matrix[2][0] - matrix[0][0] * matrix[2][1]) * invDet,
            (matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]) * invDet
        ]
    ];

    return inverse;
}

function multiplyMatrices(a, b) {
    const result = [];
    for (let i = 0; i < a.length; i++) {
        result[i] = [];
        for (let j = 0; j < b[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < a[0].length; k++) {
                sum += a[i][k] * b[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}

function norm(vector) {
    return Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
}



function createCalculator(title, inputFields, formulas, imageUrl) {
    const calculatorDiv = document.createElement('div');
    calculatorDiv.className = 'calculator';

    // Create image element if imageUrl is provided

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
        const text = document.createElement('div');
        text.innerText = field.placeholder;
        calculatorDiv.appendChild(text);
        calculatorDiv.appendChild(input);
    });

    const objectPositionMissing = [13,14,15];
    // const eulerAnglesMissing = [13,14,15];
    const cameraCoordinatesMissing = [0,1,2];
    const distanceMissing = [12];
    // const focalLengthMissing = [13,14,15];
    // const principalPointMissing = [13,14,15];
    // const pixelCoordinatesMissing = [13,14,15];

    const button = document.createElement('button');
    button.innerText = 'Calculate';
    button.onclick = () => {

        // Get input values
        const inputValues = inputFields.map(field => parseFloat(document.getElementById(field.id).value));
        
        // Give me an array of indexes of the missing values
        const missingIndexes = inputValues.map((value, index) => !isNaN(value) ? null : index).filter(index => index !== null);

        let result;

        if (JSON.stringify(missingIndexes) === JSON.stringify(objectPositionMissing)) {
            result = formulas[0].calculate(...inputValues);
            result = result.map(value => Math.round((value + Number.EPSILON) * 1000000) / 1000000);
            const inputX = calculatorDiv.querySelector(`#x`);
            const inputY = calculatorDiv.querySelector(`#y`);
            const inputZ = calculatorDiv.querySelector(`#z`);
            inputX.value = result[0];
            inputY.value = result[1];
            inputZ.value = result[2];
            inputX.style.color = 'blue';
            inputY.style.color = 'blue';
            inputZ.style.color = 'blue';
        } else if (JSON.stringify(missingIndexes) === JSON.stringify(cameraCoordinatesMissing)) {
            result = formulas[1].calculate(...inputValues);
            result = result.map(value => Math.round((value + Number.EPSILON) * 1000000) / 1000000);
            const inputCameraCoordinatesX = calculatorDiv.querySelector(`#cameraCoordinatesX`);
            const inputCameraCoordinatesY = calculatorDiv.querySelector(`#cameraCoordinatesY`);
            const inputCameraCoordinatesZ = calculatorDiv.querySelector(`#cameraCoordinatesZ`);
            inputCameraCoordinatesX.value = result[0];
            inputCameraCoordinatesY.value = result[1];
            inputCameraCoordinatesZ.value = result[2];
            inputCameraCoordinatesX.style.color = 'blue';
            inputCameraCoordinatesY.style.color = 'blue';
            inputCameraCoordinatesZ.style.color = 'blue';
        } else if (missingIndexes.includes(12) && !missingIndexes.includes(0)
            && !missingIndexes.includes(1) && !missingIndexes.includes(2)
            && !missingIndexes.includes(13) && !missingIndexes.includes(14) 
            && !missingIndexes.includes(15)) { // I know, shitty code, means object and camera coordinates exist and distance not
            result = formulas[2].calculate(...inputValues);
            result = Math.round((result + Number.EPSILON) * 1000000) / 1000000;
            const input = calculatorDiv.querySelector(`#distance`);
            input.value = result;
            input.style.color = 'blue';
        } else {
            result = 'Please leave one input empty to calculate the missing value.';
        }


        console.log('Result:', result);
        
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


const formulas = [
    {
        displayName: 'Missing Object Coordinates',
        calculate: (cameraCoordinatesX, cameraCoordinatesY, cameraCoordinatesZ, 
            pixelCoordinatesU, pixelCoordinatesV, principalPointCoordinatesCx, principalPointCoordinatesCy,
            roll, pitch, yaw, focalLengthX, focalLengthY, distance, x, y, z) => {
                const rot = createRotationMatrix(roll, pitch, yaw); // Rotation matrix
                const trans = [cameraCoordinatesX, cameraCoordinatesY, cameraCoordinatesZ]; // Translation matrix

                const v_x = (pixelCoordinatesU - principalPointCoordinatesCx) / focalLengthX;
                const v_y = (pixelCoordinatesV - principalPointCoordinatesCy) / focalLengthY;
                const v_z = 1;
                const v = [v_x, v_y, v_z]; // Pixel coordinates of the object center in the frame
                const vNorm = norm(v);

                let tmp = v.map(val => (val / vNorm) * distance); // Relative coordinates of the object in the camera coordinate system
                tmp = [[tmp[0]], [tmp[1]], [tmp[2]]];

                const res = multiplyMatrices(rot, tmp).map((val, index) => val[0] + trans[index]); // Relative coordinates of the object in the reference frame
                return res;
            }
        
    },
    {
        displayName: 'Missing Camera Coordinates',
        calculate: (cameraCoordinatesX, cameraCoordinatesY, cameraCoordinatesZ, 
            pixelCoordinatesU, pixelCoordinatesV, principalPointCoordinatesCx, principalPointCoordinatesCy,
            roll, pitch, yaw, focalLengthX, focalLengthY, distance, x, y, z) => {
                const rot = createRotationMatrix(roll, pitch, yaw); // Rotation matrix
                const trans = [x, y, z]; // Translation matrix

                const v_x = (pixelCoordinatesU - principalPointCoordinatesCx) / focalLengthX;
                const v_y = (pixelCoordinatesV - principalPointCoordinatesCy) / focalLengthY;
                const v_z = 1;
                const v = [v_x, v_y, v_z]; // Pixel coordinates of the object center in the frame

                const vNorm = norm(v);
                let tmp = v.map(val => (val / vNorm) * distance); // Relative coordinates of the object in the reference frame
                tmp = [[tmp[0]], [tmp[1]], [tmp[2]]];

                const res = multiplyMatrices(rot, tmp).map((val, index) => -val[0] + trans[index]); // Relative coordinates of the object in the camera coordinate system
                return res;
            }
    },
    {
        displayName: 'Missing Distance',
        calculate: (cameraCoordinatesX, cameraCoordinatesY, cameraCoordinatesZ, 
            pixelCoordinatesU, pixelCoordinatesV, principalPointCoordinatesCx, principalPointCoordinatesCy,
            roll, pitch, yaw, focalLengthX, focalLengthY, distance, x, y, z) => {
                
                const res = Math.sqrt((x - cameraCoordinatesX) ** 2 + (y - cameraCoordinatesY) ** 2 + (z - cameraCoordinatesZ) ** 2);
                return res;
            }
    }
];

createCalculator('Camera Problem Calculator', 
    [
        { id: 'cameraCoordinatesX', placeholder: 'x - Camera Coordinates Relative to the car (m)' },
        { id: 'cameraCoordinatesY', placeholder: 'y - Camera Coordinates Relative to the car (m)' },
        { id: 'cameraCoordinatesZ', placeholder: 'z - Camera Coordinates Relative to the car (m)' },
        { id: 'pixelCoordinatesU', placeholder: "u - Object center's coordinates in the frame (pixels)" },
        { id: 'pixelCoordinatesV', placeholder: "v - Object center's coordinates in the frame (pixels)" },
        { id: 'principalPointCoordinatesCx', placeholder: 'cx - Principal point coordinates (pixels)' },
        { id: 'principalPointCoordinatesCy', placeholder: 'cy - Principal point coordinates (pixels)' },
        { id: 'roll', placeholder: 'roll - Euler angles of the camera (degrees)' },
        { id: 'pitch', placeholder: 'pitch - Euler angles of the camera (degrees)' },
        { id: 'yaw', placeholder: 'yaw - Euler angles of the camera (degrees)' },
        { id: 'focalLengthX', placeholder: 'fx - Focal Length (pixels)' },
        { id: 'focalLengthY', placeholder: 'fy - Focal Length  (pixels)' },
        { id: 'distance', placeholder: 'Distance between camera and object (meters)' },
        { id: 'x', placeholder: 'x - Object coordinates relative to the vehicle (meters)' },
        { id: 'y', placeholder: 'y - Object coordinates relative to the vehicle (meters)' },
        { id: 'z', placeholder: 'z - Object coordinates relative to the vehicle (meters)' },
    ],
    formulas,
    '../assets/camera.jpg'
);
