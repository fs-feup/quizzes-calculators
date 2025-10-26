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
    "Maths": [
        "Area between Two Curves"
    ]

};

const pageMap = {
    "Dynamics": "dynamics/dynamics.html",
    "Statics": "statics/statics.html",
    "Structural": "structural/structural.html",
    "Moments of Inertia": "../moment_of_inertia/moment_of_inertia.html",
    "Fluid and Aero Dynamics": "fluid-dynamics/fluid-dynamics.html",
    "Vibrations": "vibrations/vibrations.html",
    "General Mechanics": "general_mechanics/mechanics.html",
    "Accumulator Segments": "accumulator/accumulator.html",
    "Thermodynamics": "thermodynamics/thermodynamics.html",
    "Vehicle Dynamics": "vehicle-dynamics/vehicle-dynamics.html",
    "Computer Vision": "computer_vision/computer_vision.html",
    "Maths": "maths/maths.html"
};

const pageMap1 = {
    "Dynamics": "../dynamics/dynamics.html",
    "Statics": "../statics/statics.html",
    "Structural": "../structural/structural.html",
    "Moments of Inertia": "../moment_of_inertia/moment_of_inertia.html",
    "Fluid and Aero Dynamics": "../fluid-dynamics/fluid-dynamics.html",
    "Vibrations": "../vibrations/vibrations.html",
    "General Mechanics": "../general_mechanics/mechanics.html",
    "Accumulator Segments": "../accumulator/accumulator.html",
    "Thermodynamics": "../thermodynamics/thermodynamics.html",
    "Vehicle Dynamics": "../vehicle-dynamics/vehicle-dynamics.html",
    "Computer Vision": "../computer_vision/computer_vision.html",
    "Maths": "../maths/maths.html"
};

// Get the current path
const currentPath = window.location.pathname;

// Check if the current path indicates the root or the quizzes-calculators directory
const isRootPath = currentPath === "/index.html" || currentPath === "/index" || currentPath.endsWith("/quizzes-calculators/") || currentPath.endsWith("/");

// Select the appropriate page map
const selectedPageMap = isRootPath ? pageMap : pageMap1;


// Populate the sidebar
const sidebar = document.getElementById('sidebar');

for (const category in sidebarData) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category';
    const categoryTitle = document.createElement('h2');
    categoryTitle.innerText = category;

    // Use the selected page map
    categoryTitle.addEventListener('click', () => {
        window.location.href = selectedPageMap[category];
    });

    categoryDiv.appendChild(categoryTitle);

    const calculatorsList = document.createElement('ul');
    sidebarData[category].forEach(calculator => {
        const listItem = document.createElement('li');
        listItem.innerText = calculator;
        calculatorsList.appendChild(listItem);
    });

    categoryDiv.appendChild(calculatorsList);
    sidebar.appendChild(categoryDiv);
}
