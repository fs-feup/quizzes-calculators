const sidebarData = {
    "Dynamics": [
        "Skipad Scores",
        "Acceleration Scores",
        "Autocross Scores",
        "Endurance & Trackdrive Scores",
        "Efficiency"
    ],
    "Statics": [
        "Non Finalist BPP Points",
        "Non Finalist BPP Points Austria"
    ],
    "Computer Vision": [
        "Camera Problem Calculator",
    ],
    "Moments of Inertia": [
         "Rectangle",
         "Triangle",
         "Rectangle Triangle",
         "Circle",
         "Half Circle",
         "Quarter Circle",
         "Half Elipse",
         "Quarter Ellipse",
         "Parabola",
         "Half Parabola",
         "Hollow Shaft",
    ],
    "Structural": [
        'Young modulus (elasticity) formula',
        'Young modulus (elasticity) altern.',
        'Point load',
        'Distributed Load',
        'Two Point Load',
    ],
    "Fluid and Aero Dynamics": [
        "Drag and Lift Calculator",
        "Reynolds Number Calculator",
        "Perfect Gas Law Calculator",
        "Bernoulli's Law Calculator"
    ],
    "Vibrations": [
        "Spring rate",
        "Natural angular frequency",
        "Damping ratio"
    ],
    "General Mechanics": [
        "Motion Equations",
        "Energy Formulas",
    ],
    "Accumulator Segments": [
        "Accumulator Segments"
    ],
    "Thermodynamics": [
        "Termodynamics Calculator"
    ],
    "Vehicle Dynamics": [
        "Curving Problem",
        "Slip Angle Calculator"
    ],
    "External Calculators": [
        "Calculation of planetary gear ratios",
        "Circuit simulation",
        "Transfer function from circuit",
        "Beam Calculator"
    ]
};

const pageMap = {
    "Dynamics": "dynamics/dynamics.html",
    "Statics": "statics/statics.html",
    "Structural": "structural/structural.html",
    "Moments of Inertia": "moment_of_inertia/moment_of_inertia.html",
    "Fluid and Aero Dynamics": "fluid-dynamics/fluid-dynamics.html",
    "Vibrations": "vibrations/vibrations.html",
    "General Mechanics": "general_mechanics/mechanics.html",
    "Accumulator Segments": "accumulator/accumulator.html",
    "Thermodynamics": "thermodynamics/thermodynamics.html",
    "Vehicle Dynamics": "vehicle-dynamics/vehicle-dynamics.html",
    "Computer Vision": "computer_vision/computer_vision.html",
};

const externalLinksMap = {
    "Calculation of planetary gear ratios": "https://www.thecatalystis.com/gears/",
    "Circuit simulation": "https://www.falstad.com/circuit/",
    "Transfer function from circuit": "https://www.will-kelsey.com/circuitSolver/",
    "Beam Calculator": "https://skyciv.com/free-beam-calculator/"
};

// Resolve a path to an absolute URL based on this script's location
function makeAbsolute(path) {
    try {
        const scripts = document.getElementsByTagName('script');
        const me = Array.from(scripts).find(s => (s.src || '').includes('sidebar.js'));
        const base = me?.src || window.location.href;
        return new URL(path, base).href;
    } catch (_) {
        return path; // fallback
    }
}

// Build an absolute map so links work from any page depth
const selectedPageMap = Object.fromEntries(
    Object.entries(pageMap).map(([k, v]) => [k, makeAbsolute(v)])
);

// Helper to build a direct link to a calculator by name using a query param
function linkFor(category, calculatorName) {
  const base = selectedPageMap[category];
  if (!base) return '#';
  try {
    const url = new URL(base);
    url.searchParams.set('q', calculatorName);
    return url.href;
  } catch (_) {
    const q = encodeURIComponent(calculatorName);
    return `${base}?q=${q}`;
  }
}


// Populate the sidebar
const sidebar = document.getElementById('sidebar');

for (const category in sidebarData) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category';
    const categoryTitle = document.createElement('h2');
    categoryTitle.innerText = category;

    // Use the selected page map (absolute URLs)
    if(category !== "External Calculators"){
        categoryTitle.addEventListener('click', () => {
            const dest = selectedPageMap[category];
            if (dest) window.location.href = dest;
        });
    }

    categoryDiv.appendChild(categoryTitle);

    const calculatorsList = document.createElement('ul');
    sidebarData[category].forEach(calculator => {
        const listItem = document.createElement('li');
        const a = document.createElement('a');
        if (category === "External Calculators") {
            a.href = externalLinksMap[calculator] || '#';
        } else {
            a.href = linkFor(category, calculator);
        }
        a.textContent = calculator;
        a.title = `Open ${calculator}`;
        listItem.appendChild(a);
        calculatorsList.appendChild(listItem);
    });

    categoryDiv.appendChild(calculatorsList);
    sidebar.appendChild(categoryDiv);
}

// If on a calculators page and a query parameter ?q= is present,
// scroll to the first calculator title that matches it.
(function scrollToQueryMatch() {
  try {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (!q) return;
    const headers = Array.from(document.querySelectorAll('#calculator-container .calculator h2'));
    const qLower = q.toLowerCase();
    const tokens = qLower.split(/[^a-z0-9]+/).filter(t => t.length >= 3);
    let target = headers.find(h2 => h2.textContent.toLowerCase().includes(qLower));
    if (!target && tokens.length) {
      target = headers.find(h2 => {
        const text = h2.textContent.toLowerCase();
        return tokens.some(tok => text.includes(tok));
      });
    }
    if (target && target.parentElement) {
      target.parentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } catch (_) {
    // no-op if URLSearchParams unsupported
  }
})();
