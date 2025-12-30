function createCalculator(title, inputFields, formula, imageUrl) {
    const calculatorDiv = document.createElement('div');
    calculatorDiv.className = 'calculator';

    // Title
    const titleElement = document.createElement('h2');
    titleElement.innerText = title;
    calculatorDiv.appendChild(titleElement);

    // Optional image
    if (imageUrl) {
        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = 'Calculator Image';
        image.className = 'calculator-image';
        calculatorDiv.appendChild(image);
    }

    // Inputs
    inputFields.forEach(field => {
        const label = document.createElement('div');
        label.innerText = field.placeholder;

        const input = document.createElement('input');
        input.type = 'text';
        input.id = field.id;
        input.placeholder = field.placeholder;

        calculatorDiv.appendChild(label);
        calculatorDiv.appendChild(input);
    });

    // Result paragraph
    let resultParagraph = document.createElement('p');
    resultParagraph.className = 'result';
    calculatorDiv.appendChild(resultParagraph);

    // Button
    const button = document.createElement('button');
    button.innerText = 'Calculate';
    button.onclick = () => {

        // Read values
        let ocv = document.getElementById('ocv').value.trim();
        let req = document.getElementById('req').value.trim();
        let i   = document.getElementById('i').value.trim();
        let p   = document.getElementById('p').value.trim();

        // Count missing
        const emptyCount = [ocv, req, i, p].filter(v => v === "").length;

        if (emptyCount !== 1) {
            resultParagraph.innerText = "Leave exactly ONE field empty.";
            return;
        }

        // Parse numeric values
        ocv = ocv === "" ? null : parseFloat(ocv.replace(',', '.'));
        req = req === "" ? null : parseFloat(req.replace(',', '.'));
        i   = i   === "" ? null : parseFloat(i.replace(',', '.'));
        p   = p   === "" ? null : parseFloat(p.replace(',', '.'));

        // Compute result using formula
        const result = formula(ocv, req, i, p);

        if (!result.ok) {
            resultParagraph.innerText = result.error;
            return;
        }

        const { OCV, Req_mOhm, Current, Power } = result;

        let output = "";

        if (ocv === null)       output = `OCV = ${OCV.toFixed(3)} V`;
        else if (req === null)  output = `Req = ${Req_mOhm.toFixed(3)} mΩ`;
        else if (i === null)    output = `I = ${Current.toFixed(3)} A`;
        else if (p === null)    output = `P = ${Power.toFixed(3)} W`;

        resultParagraph.innerText = output;
    };

    calculatorDiv.appendChild(button);
    document.getElementById('calculator-container').appendChild(calculatorDiv);
}



// ------------------------------------------------------
// CALCULATION LOGIC
// ------------------------------------------------------

// Main formula: P = (OCV - (Req_mOhm/1000) * I) * I
// This function computes whichever variable is missing.
const formula_power_full = (ocv, req_mohm, current, power) => {
    let R = req_mohm == null ? null : req_mohm / 1000; // convert mΩ → Ω

    try {
        // Compute missing OCV
        if (ocv == null) {
            if (R === null || current === null) throw "Missing Req or I";
            const OCV = power / current + R * current;
            return {
                ok: true,
                OCV,
                Req_mOhm: req_mohm,
                Current: current,
                Power: power
            };
        }

        // Compute missing Req
        if (req_mohm == null) {
            if (ocv == null || current == null) throw "Missing OCV or I";
            const Req = (ocv - power / current) / current * 1000; // Ω→mΩ
            return {
                ok: true,
                OCV: ocv,
                Req_mOhm: Req,
                Current: current,
                Power: power
            };
        }

        // Compute missing I
        if (current == null) {
            if (ocv == null || R == null) throw "Missing OCV or Req";
            // Solve quadratic: R*I^2 - OCV*I + P = 0
            const a = R;
            const b = -ocv;
            const c = power;

            const disc = b*b - 4*a*c;
            if (disc < 0) throw "No valid solution";

            const I1 = (-b + Math.sqrt(disc)) / (2*a);
            const I2 = (-b - Math.sqrt(disc)) / (2*a);

            const I = Math.min(I1, I2); // choose smaller positive root

            return {
                ok: true,
                OCV: ocv,
                Req_mOhm: req_mohm,
                Current: I,
                Power: power
            };
        }

        // Compute missing P
        if (power == null) {
            const P = (ocv - R * current) * current;
            return {
                ok: true,
                OCV: ocv,
                Req_mOhm: req_mohm,
                Current: current,
                Power: P
            };
        }

        return { ok: false, error: "Unexpected error." };

    } catch (err) {
        return { ok: false, error: "Error: " + err };
    }
};



// ------------------------------------------------------
// CREATE CALCULATOR UI
// ------------------------------------------------------

createCalculator(
    "Electrical Power Calculator",
    [
        { id: "ocv", placeholder: "OCV - Open Circuit Voltage [V]" },
        { id: "req", placeholder: "Req - Equivalent Resistance [mΩ]" },
        { id: "i",   placeholder: "I - Current [A]" },
        { id: "p",   placeholder: "P - Power [W]" }
    ],
    formula_power_full,
    "../assets/electro/power.png"
);
