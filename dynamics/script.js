function createCalculator(title, inputFields, formulas, imageUrl, category = 'fsg') {
    const calculatorDiv = document.createElement('div');
    calculatorDiv.className = 'calculator';
    calculatorDiv.dataset.category = category; // tag for filtering

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
        if (missingIndex === 0) {
            // Missing value for first input
            const [, pmax, final] = inputValues; // Skip the first value
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

function createCalculator4(title, inputFields, formulas, imageUrl, category = 'fsg') {
    const calculatorDiv = document.createElement('div');
    calculatorDiv.className = 'calculator';
    calculatorDiv.dataset.category = category; // tag for filtering

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
        if (missingIndex === 0) {
            // Missing value for first input
            const [, b, c, d] = inputValues; // Skip the first value
            result = formulas[0].calculate(b, c, d);
            console.log(result);
        } else if (missingIndex === 1) {
            // Missing value for second input
            const [a, , c, d] = inputValues; // Skip the second value
            result = formulas[1].calculate(a, c, d);
            console.log(result);
        } else if (missingIndex === 2) {
            // Missing value for third input
            const [a, b, , d] = inputValues; // Skip the third value
            result = formulas[2].calculate(a, b, d);
            console.log(result);
        } else if (missingIndex === 3) {
            // Missing value for fourth input
            const [a, b, c] = inputValues.slice(0, 3); // Use only the first three values
            result = formulas[3].calculate(a, b, c);
            console.log(result);
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
        if (missingIndex === 0) {
            // Missing value for first input
            const [, b, c, d, e] = inputValues; // Skip the first value
            result = formulas[0].calculate(b, c, d, e);
            console.log(result);
        } else if (missingIndex === 1) {
            // Missing value for second input
            const [a, , c, d, e] = inputValues; // Skip the second value
            result = formulas[1].calculate(a, c, d, e);
            console.log(result);
        } else if (missingIndex === 2) {
            // Missing value for third input
            const [a, b, , d, e] = inputValues; // Skip the third value
            result = formulas[2].calculate(a, b, d, e);
            console.log(result);
        } else if (missingIndex === 3) {
            // Missing value for fourth input
            const [a, b, c, , e] = inputValues; // Skip the fourth value
            result = formulas[3].calculate(a, b, c, e);
            console.log(result);
        } else if (missingIndex === 4) {
            // Missing value for fifth input
            const [a, b, c, d] = inputValues.slice(0, 4); // Use only the first four values
            result = formulas[4].calculate(a, b, c, d);
            console.log(result);
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

// =======================================================
// Pmax constants (Table 3 — update here if your event table changes)
// =======================================================
const Pmax_manual = 50;   // Skidpad (manual), Acceleration (manual)
const Pmax_dv     = 75;   // Driverless Skidpad/Acceleration (ranking rule)
const Pmax_autoX  = 100;  // Autocross (manual & DC)
const Pmax_end    = 250;  // Endurance (manual)
const Pmax_end_nf = 325;  // Endurance (Non-FSG / FSPT)
const Pmax_eff    = 75;   // Efficiency (FSG)
const Pmax_eff_nf = 100;  // Efficiency (Non-FSG / FSPT)
const Pmax_td_dc  = 200;  // Trackdrive (Driverless Cup)

// =======================================================
// Utility (caps & guards)
// =======================================================
function clampTteamWithTmin(tteam, tmin, k) {
  const Tmax = k * tmin;
  return Math.min(Math.max(tteam, tmin), Tmax); // enforce Tmin ≤ Tteam ≤ Tmax
}

// =======================================================
// NEW manual rule (D 9.1):
// SCORE = (Pmax - Pmin) * ((Tmax - Tteam) / (Tmax - Tmin))^2 + Pmin
// with Tmax = k*Tmin and Pmin = f*Pmax
// =======================================================
function generateManualScoringFormulas(Pmax, k, f) {
  const Pmin = f * Pmax;

  return [
    // 1) T_team from (T_min, Score)
    {
      displayName: 'Calculate T_team (given T_min, Score)',
      calculate: (tmin, score) => {
        if (score > Pmax) return 'Final points exceed Pmax.';
        if (score < Pmin) return 'Final points are below Pmin.';
        const Tmax = k * tmin;
        const A = (score - Pmin) / (Pmax - Pmin); // ∈ [0,1]
        const r = Math.sqrt(A);
        return Tmax - r * (Tmax - tmin);
      }
    },
    // 2) T_min from (T_team, Score)
    {
      displayName: 'Calculate T_min (given T_team, Score)',
      calculate: (tteam, score) => {
        if (score > Pmax) return 'Final points exceed Pmax.';
        if (score < Pmin) return 'Final points are below Pmin.';
        const A = Math.sqrt((score - Pmin) / (Pmax - Pmin));
        const denom = k - A * (k - 1);
        if (denom <= 0) return 'Invalid inputs (denominator ≤ 0).';
        return tteam / denom;
      }
    },
    // 3) Score from (T_team, T_min)
    {
      displayName: 'Calculate Final Points (given T_team, T_min)',
      calculate: (tteam, tmin) => {
        const Tmax = k * tmin;
        if (tteam < tmin) return "Team's time is faster than T_min.";
        const tcap = Math.min(tteam, Tmax); // T_team capped to T_max
        const ratio = (Tmax - tcap) / (Tmax - tmin);
        return (Pmax - Pmin) * (ratio ** 2) + Pmin;
      }
    }
  ];
}

// ----------------- Manual events -----------------
const formulas_skidpad_manual                = generateManualScoringFormulas(Pmax_manual, 1.35, 0.05);
const formulas_skidpad_manual_non_fsg        = generateManualScoringFormulas(75,          1.35, 0.05);

const formulas_acceleration_manual           = generateManualScoringFormulas(Pmax_manual, 1.7,  0.05);
const formulas_acceleration_manual_non_fsg   = generateManualScoringFormulas(75,          1.7,  0.05);

const formulas_autocross_manual              = generateManualScoringFormulas(Pmax_autoX,  1.4,  0.10);

const formulas_endurance                     = generateManualScoringFormulas(Pmax_end,    1.5,  0.10);
const formulas_endurance_non_fsg             = generateManualScoringFormulas(Pmax_end_nf, 1.5,  0.10);

// =======================================================
// DRIVERLESS (D 9.2) — Skidpad & Acceleration (ranking-based)
// DV_SCORE = Pmax * (Nall + 1 - R_DV) / Nall
// Note: runs with time > 25 s will be DQ (validation optional)
// =======================================================
const formulas_dv_rank = [
  {
    displayName: 'Calculate R_DV (given N_all, Points)',
    calculate: (nAll, points) => {
      if (points > Pmax_dv) return 'Final points exceed Pmax.';
      return nAll + 1 - (points / Pmax_dv) * nAll;
    }
  },
  {
    displayName: 'Calculate N_all (given R_DV, Points)',
    calculate: (rDV, points) => {
      if (points >= Pmax_dv) return 'If Points = Pmax, use N_all = R_DV - 1.';
      return (1 - rDV) / (points / Pmax_dv - 1);
    }
  },
  {
    displayName: 'Calculate Points (given R_DV, N_all)',
    calculate: (rDV, nAll) => {
      if (rDV > nAll) return 'Ranking higher than number of finishers.';
      return Pmax_dv * (nAll + 1 - rDV) / nAll;
    }
  }
];

// Aliases for your existing calculator wiring
const formulas_skidpad_dv      = formulas_dv_rank;
const formulas_acceleration_dv = formulas_dv_rank;

// Optional helper for UI validations
function dvIsDQ(runtimeSeconds) { return runtimeSeconds > 25; } // DQ if true

// =======================================================
// DRIVERLESS CUP (D 9.3)
//  - DC Skidpad & Acceleration: scored like D 9.1 (manual rule)
//  - DC Autocross: Score = 0.9 Pmax * ((Tmax - Ttotal)/(Tmax - Tmin)) + 0.1 Pmax
//      Ttotal = min(T1, avg(T1, T2)), Tmax = time to drive the lap at 6 m/s
//  - DC Trackdrive: Score = 0.75 Pmax * (Tmax/Tteam - 1), Tteam capped at Tmax,
//      Tmax = 2 * (fastest corrected elapsed time) + 2.5% Pmax bonus per completed lap
// =======================================================

// --- DC Skidpad & DC Acceleration (manual-like with Pmax 75) ---
const formulas_skidpad_dc      = generateManualScoringFormulas(75, 1.35, 0.05);
const formulas_acceleration_dc = generateManualScoringFormulas(75, 1.70, 0.05);

// --- Autocross (DC) ---
function ttotal_from_runs(t1, t2) {
  const avg12 = (t1 + t2) / 2;
  return Math.min(t1, avg12);
}

const formulas_autocross_dc = [
  // 1) T_min from (T_max, T_total, Score)
  {
    displayName: 'Calculate T_min',
    calculate: (tmax, ttotal, points) => {
      if (points > Pmax_autoX) return 'Final points exceed Pmax.';
      const S = (points - 0.1 * Pmax_autoX) / (0.9 * Pmax_autoX); // S in [0,1]
      if (S <= 0) return 'Points below 0.1 Pmax are invalid.';
      if (S > 1)  return 'Points over Pmax are invalid.';
      if (ttotal < 0 || tmax <= 0) return 'Invalid times.';
      // S = (Tmax - Ttotal) / (Tmax - Tmin)  => Tmin = Tmax - (Tmax - Ttotal)/S
      return tmax - (tmax - ttotal) / S;
    }
  },
  // 2) T_max from (T_min, T_total, Score)
  {
    displayName: 'Calculate T_max',
    calculate: (tmin, ttotal, points) => {
      if (points >= Pmax_autoX) return 'If Points = Pmax, then T_total = T_min (T_max arbitrary).';
      if (points < 0.1 * Pmax_autoX) return 'Points below 0.1 Pmax are invalid.';
      const S = (points - 0.1 * Pmax_autoX) / (0.9 * Pmax_autoX);
      const denom = (1 - S);
      if (denom <= 0) return 'Invalid inputs (division by zero).';
      // S(Tmax - Tmin) = Tmax - Ttotal => Tmax(1 - S) = Ttotal - S*Tmin
      return (ttotal - S * tmin) / denom;
    }
  },
  // 3) T_total from (T_min, T_max, Score)
  {
    displayName: 'Calculate T_total',
    calculate: (tmin, tmax, points) => {
      if (points > Pmax_autoX) return 'Final points exceed Pmax.';
      if (tmin >= tmax) return 'T_min must be < T_max.';
      const S = (points - 0.1 * Pmax_autoX) / (0.9 * Pmax_autoX);
      if (S < 0 || S > 1) return 'Points out of valid range.';
      // Ttotal = Tmax - S*(Tmax - Tmin)
      return tmax - S * (tmax - tmin);
    }
  },
  // 4) Points from (T_min, T_max, T_total)
  {
    displayName: 'Calculate Final Points',
    calculate: (tmin, tmax, ttotal) => {
      if (tmin >= tmax) return 'T_min must be < T_max.';
      const S = (tmax - ttotal) / (tmax - tmin);
      const base = 0.9 * Pmax_autoX * S + 0.1 * Pmax_autoX;
      return Math.max(0, Math.min(Pmax_autoX, base));
    }
  }
];

// --- Trackdrive (DC) ---
const formulas_trackdrive_dc = [
  // 1) T_team from (T_best, Score, Laps)
  {
    displayName: 'Calculate T_team',
    calculate: (tbest, points, laps) => {
      const bonus = 0.025 * Pmax_td_dc * (laps || 0);
      const base = points - bonus;
      if (base > 0.75 * Pmax_td_dc) return 'Base score exceeds 0.75*Pmax.';
      const numerator = 1.5 * Pmax_td_dc * tbest;
      const denom = base + 0.75 * Pmax_td_dc;
      if (denom <= 0) return 'Invalid inputs (denominator ≤ 0).';
      let tteam = numerator / denom;
      // Cap: T_max = 2*T_best, and T_team cannot be < T_best
      tteam = clampTteamWithTmin(tteam, tbest, 2.0);
      return tteam;
    }
  },
  // 2) T_best from (T_team, Score, Laps)
  {
    displayName: 'Calculate T_best',
    calculate: (tteam, points, laps) => {
      const bonus = 0.025 * Pmax_td_dc * (laps || 0);
      const base  = points - bonus;
      const denom = 1.5 * Pmax_td_dc;
      const tbest = (tteam * (base + 0.75 * Pmax_td_dc)) / denom;
      if (tbest <= 0) return 'Invalid T_best.';
      return tbest;
    }
  },
  // 3) Laps needed (ceil) for target Points with given T_team & T_best
  {
    displayName: 'Calculate Laps for target Points',
    calculate: (tteam, tbest, targetPoints) => {
      if (tteam < tbest) return "Team's time faster than fastest reference.";
      const base = 0.75 * Pmax_td_dc * ((2 * tbest) / tteam - 1);
      const need = targetPoints - base;
      const perLap = 0.025 * Pmax_td_dc;
      if (need <= 0) return 0;
      return Math.ceil(need / perLap);
    }
  },
  // 4) Final Points from (T_team, T_best, Laps)
  {
    displayName: 'Calculate Final Points',
    calculate: (tteam, tbest, laps) => {
      const tcap = clampTteamWithTmin(tteam, tbest, 2.0); // cap at 2*T_best
      const base = 0.75 * Pmax_td_dc * ((2 * tbest) / tcap - 1);
      const bonus = 0.025 * Pmax_td_dc * (laps || 0);
      return Math.max(0, Math.min(Pmax_td_dc, base + bonus));
    }
  }
];

// =======================================================
// Efficiency (D 9.4)
// EFF_SCORE = Pmax * ((EFmax - EFteam)/(EFmax - EFmin))^2,  EFmax = 2*EFmin
// EF = T^2 * E, where E = fuel mass (CV) or used energy (EV)
// =======================================================
const formulas_efficiency = [
  {
    displayName: 'Calculate EF_team (given EF_min, Score)',
    calculate: (ef_min, score) => {
      if (score > Pmax_eff) return 'Final points exceed Pmax.';
      const EFmax = 2 * ef_min;
      const frac  = Math.sqrt(score / Pmax_eff);
      return EFmax - frac * (EFmax - ef_min);
    }
  },
  { displayName: 'Calculate EF_min (not uniquely solvable)', calculate: () => 'Not uniquely solvable from (EF_team, Score) alone.' },
  {
    displayName: 'Calculate Final Points (given EF_team, EF_min)',
    calculate: (ef_team, ef_min) => {
      const EFmax = 2 * ef_min;
      if (ef_team < ef_min) return "Team's EF is below EF_min.";
      const score = Pmax_eff * ((EFmax - ef_team) / (EFmax - ef_min)) ** 2;
      return Math.max(0, Math.min(Pmax_eff, score));
    }
  }
];

const formulas_efficiency_non_fsg = [
  {
    displayName: 'Calculate EF_team (given EF_min, Score)',
    calculate: (ef_min, score) => {
      if (score > Pmax_eff_nf) return 'Final points exceed Pmax.';
      const EFmax = 2 * ef_min;
      const frac  = Math.sqrt(score / Pmax_eff_nf);
      return EFmax - frac * (EFmax - ef_min);
    }
  },
  { displayName: 'Calculate EF_min (not uniquely solvable)', calculate: () => 'Not uniquely solvable.' },
  {
    displayName: 'Calculate Final Points (given EF_team, EF_min)',
    calculate: (ef_team, ef_min) => {
      const EFmax = 2 * ef_min;
      if (ef_team < ef_min) return "Team's EF is below EF_min.";
      return Pmax_eff_nf * ((EFmax - ef_team) / (EFmax - ef_min)) ** 2;
    }
  }
];

// Efficiency Factor helper (unchanged)
const formulas_efficiency_factor = [
  { displayName: 'Calculate T',  calculate: (e, ef) => Math.sqrt(ef / e) },
  { displayName: 'Calculate E',  calculate: (t, ef) => ef / (t ** 2) },
  { displayName: 'Calculate EF', calculate: (t, e)  => e * (t ** 2) }
];

// =======================================================
// EXISTING CALCULATORS (unchanged labels). Aliases are wired above.
// =======================================================

createCalculator('Manual Skidpad',
  [
    { id: 'tteam',    placeholder: "T team - Team's best time including penalties" },
    { id: 'tmax',     placeholder: 'T Best - Overall best time including penalties (Without factor).' },
    { id: 'finalPoints', placeholder: 'Final Score' }
  ],
  formulas_skidpad_manual,
  '../assets/skidpad/skidpad_score.png'
);

createCalculator('Manual Skidpad Non FSG / FSPT',
  [
    { id: 'tteam11',     placeholder: "T team - Team's best time including penalties" },
    { id: 'tmax11',      placeholder: 'T Best - Overall best time including penalties (Without factor).' },
    { id: 'finalPoints11', placeholder: 'Final Score' }
  ],
  formulas_skidpad_manual_non_fsg,
  '../assets/skidpad/skidpad_score.png',
  'non-fsg'
);

createCalculator('Driverless Skidpad',
  [
    { id: 'r_dv',   placeholder: "R DV -> Ranking of the team's best autonomous time" },
    { id: 'n_all',  placeholder: 'n_all -> Number of teams who have at least one valid manual or autonomous run' },
    { id: 'points', placeholder: 'Final Score' }
  ],
  formulas_skidpad_dv,
  '../assets/skidpad/DV_Skidpad.png'
);

createCalculator('DC Skidpad',
  [
    { id: 'tteam1',      placeholder: "T team - Team's best time including penalties" },
    { id: 'tmax1',       placeholder: 'T best - Overall best time including penalties (Without factor).' },
    { id: 'finalPoints1', placeholder: 'Final Score' }
  ],
  formulas_skidpad_dc,
  '../assets/skidpad/skidpad_dc.png'
);

createCalculator('Manual Acceleration',
  [
    { id: 'tteam2',      placeholder: "T team - Team's best time including penalties" },
    { id: 'tmax2',       placeholder: 'T best - Overall best time including penalties (Without factor).' },
    { id: 'finalPoints2', placeholder: 'Final Score' }
  ],
  formulas_acceleration_manual,
  '../assets/acceleration/m_acceleration.png'
);

createCalculator('Manual Acceleration Non FSG / FSPT',
  [
    { id: 'tteam22',      placeholder: "T team - Team's best time including penalties" },
    { id: 'tmax22',       placeholder: 'T best - Overall best time including penalties (Without factor).' },
    { id: 'finalPoints22', placeholder: 'Final Score' }
  ],
  formulas_acceleration_manual_non_fsg,
  '../assets/acceleration/m_acceleration.png',
  'non-fsg'
);

createCalculator('Driverless Acceleration',
  [
    { id: 'r_dv3333',   placeholder: "R DV -> Ranking of the team's best autonomous time" },
    { id: 'n_all3333',  placeholder: 'n_all -> Number of teams who have at least one valid manual or autonomous run' },
    { id: 'points3333', placeholder: 'Final Score' }
  ],
  formulas_acceleration_dv,
  '../assets/acceleration/dc_acceleration.png'
);

createCalculator('DC Acceleration',
  [
    { id: 'tteam3',      placeholder: "T team - Team's best time including penalties" },
    { id: 'tmax3',       placeholder: 'T best - Overall best time including penalties (Without factor).' },
    { id: 'finalPoints3', placeholder: 'Final Score' }
  ],
  formulas_acceleration_dc,
  '../assets/acceleration/dv_acceleration.png'
);

// ---------- Autocross ----------
createCalculator('Manual Autocross',
  [
    { id: 'tteam4',      placeholder: "T team - Team's best time including penalties" },
    { id: 'tmax4',       placeholder: 'T best - Overall best time including penalties (Without factor).' },
    { id: 'finalPoints4', placeholder: 'Final Score' }
  ],
  formulas_autocross_manual,
  '../assets/autocross/m_autocross.png',
  'shared'
);

createCalculator4('DC Autocross',
  [
    { id: 'tteam5',   placeholder: 'T min - fastest autonomous autocross time across all teams' },
    { id: 'tmax5',    placeholder: 'T max - the time for driving the lap at 6 m/s' },
    { id: 'ttotal5',  placeholder: 'T Total - min(T1, avg(T1, T2))' },
    { id: 'finalPoints5', placeholder: 'Final Score' }
  ],
  formulas_autocross_dc,
  '../assets/autocross/dc_autocross.png'
);

// ---------- Endurance ----------
createCalculator('Endurance',
  [
    { id: 'tteam6',      placeholder: "T team - Team's corrected elapsed time" },
    { id: 'tmax6',       placeholder: 'T best - Overall best corrected elapsed time (Without factor)' },
    { id: 'finalPoints6', placeholder: 'Final Score' }
  ],
  formulas_endurance,
  '../assets/endurance/endurance.png'
);

createCalculator('Endurance Non FSG / FSPT',
  [
    { id: 'tteam66',      placeholder: "T team - Team's corrected elapsed time" },
    { id: 'tmax66',       placeholder: 'T best - Overall best corrected elapsed time (Without factor)' },
    { id: 'finalPoints66', placeholder: 'Final Score' }
  ],
  formulas_endurance_non_fsg,
  '../assets/endurance/endurance.png',
  'non-fsg'
);

// ---------- Efficiency ----------
createCalculator('Efficiency',
  [
    { id: 'efteam', placeholder: "EF team - Team's efficiency factor" },
    { id: 'efmin',  placeholder: 'EF min - lowest efficiency factor.' },
    { id: 'score',  placeholder: 'Final Score' }
  ],
  formulas_efficiency,
  '../assets/endurance/efficiency.png'
);

createCalculator('Efficiency Non FSG / FSPT',
  [
    { id: 'efteam99', placeholder: "EF team - Team's efficiency factor" },
    { id: 'efmin99',  placeholder: 'EF min - lowest efficiency factor.' },
    { id: 'score99',  placeholder: 'Final Score' }
  ],
  formulas_efficiency_non_fsg,
  '../assets/endurance/efficiency.png',
  'non-fsg'
);

createCalculator('Efficiency Factor',
  [
    { id: 'T',  placeholder: 'Uncorrected elapsed driving time' },
    { id: 'E',  placeholder: 'CV - corrected fuel mass (kg) / EV - used energy (kWh)' },
    { id: 'EF', placeholder: 'Final Score' }
  ],
  formulas_efficiency_factor,
  '../assets/endurance/efficiency_factor.png',
  'shared'
);

// ---------- NEW: DC Trackdrive with laps bonus ----------
createCalculator4('DC Trackdrive',
  [
    { id: 'tbest_dc',  placeholder: 'T Best - fastest corrected elapsed time' },
    { id: 'tteam_dc',  placeholder: "T Team - team corrected elapsed time (capped at 2*T Best)" },
    { id: 'laps_dc',   placeholder: 'Completed laps (integer)' },
    { id: 'score_dc',  placeholder: 'Final Score (includes laps bonus)' }
  ],
  formulas_trackdrive_dc,
  '../assets/trackdrive/trackdrive.png'
);

// =======================================================
// Toggle visibility between FSG (Normal/Driverless/DC) and Non-FSG
// =======================================================
const nonFsgToggleEl = document.getElementById('nonFsgToggle');
const fsgTextEl = document.querySelector('.switch-text.fsg');
const nonfsgTextEl = document.querySelector('.switch-text.nonfsg');

function applyScoringVisibility() {
  const showNonFsg = !!(nonFsgToggleEl && nonFsgToggleEl.checked);
  const cards = document.querySelectorAll('#calculator-container .calculator');
  cards.forEach(card => {
    const category = card.dataset.category || 'other';
    if (showNonFsg) {
      // Show Non-FSG and shared calculators
      card.style.display = (category === 'non-fsg' || category === 'shared') ? '' : 'none';
    } else {
      // Show all except Non-FSG calculators
      card.style.display = category === 'non-fsg' ? 'none' : '';
    }
  });

  // Update labels highlight
  if (fsgTextEl && nonfsgTextEl) {
    if (showNonFsg) {
      fsgTextEl.classList.remove('active');
      nonfsgTextEl.classList.add('active');
    } else {
      nonfsgTextEl.classList.remove('active');
      fsgTextEl.classList.add('active');
    }
  }
}

if (nonFsgToggleEl) {
  nonFsgToggleEl.addEventListener('change', applyScoringVisibility);
}

// Default view: Non-FSG hidden
applyScoringVisibility();
