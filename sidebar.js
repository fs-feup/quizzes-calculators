const sidebarData = {
    "Dynamics": [
        "Manual Skidpad",
        "Driverless Skidpad",
        "DC Skidpad",
        "Manual Acceleration",
        "Driverless Acceleration",
        "DC Acceleration",
        "Manual Autocross",
        "DC Autocross",
        "Endurance",
        "Efficiency",
        "Efficiency Factor",
        "Trackdrive"
    ],
    "Statics": [
        "Non Finalist Business Plan Presentation Points"
    ],
    "Structural": [
        "Rectangle x bar",
        "Rectangle y bar",
        "Rectangle area",
        "Rectangle I x bar",
        "Rectangle I y bar",
        "Triangle y bar",
        "Triangle area",
        "Triangle I x bar",
        "Triangle x bar",
        "Circle x bar",
        "Circle y bar",
        "Circle area with radius",
        "Circle I x bar",
        "Circle I y bar",
        'Young modulus (elasticity) formula',
        'Young modulus (elasticity) alternative formula',
        'Point load Reaction',
        'Point Load Moment',
        'Point Load Deflection',
        'UDL Reaction',
        'UDL Moment',
        'UDL Deflection' 
    ],
    "Fluid and Aero Dynamics": [
        "Drag and Lift Calculator",
        "Reynolds Number Calculator"
    ],
    "Vibrations": [
        "Spring rate",
        "Natural angular frequency",
        "Damping ratio"
    ],
    "General Mechanics": [
        "Velocity Equation",
        "Positions Equation",
        "Velocity from Positions Equation",
        "Work and Energy Theorem",
        "Gravitational Potential Energy",
        "Elastic Potential Energy",
        "Work from Non-Conservative Forces",
        "Kinetic Energy"
    ],
    "Accumulator Segments": [
        "Accumulator Segments"
    ],
    "Thermodynamics": [
        "Termodynamics Calculator"
    ],
    "Vehicle Dynamics": [
        "Slip Angle Calculator"
    ]
};

const pageMap = {
    "Dynamics": "/dynamics/dynamics.html",
    "Statics": "/statics/statics.html",
    "Structural": "/structural/structural.html",
    "Fluid and Aero Dynamics": "/fluid-dynamics/fluid-dynamics.html",
    "Vibrations": "/vibrations/vibrations.html",
    "General Mechanics": "/general_mechanics/mechanics.html",
    "Accumulator Segments": "/accumulator/accumulator.html",
    "Thermodynamics": "/thermodynamics/thermodynamics.html",
    "Vehicle Dynamics": "/vehicle-dynamics/vehicle-dynamics.html"
};

const pageMap1 = {
    "Dynamics": "../dynamics/dynamics.html",
    "Statics": "../statics/statics.html",
    "Structural": "../structural/structural.html",
    "Fluid and Aero Dynamics": "../fluid-dynamics/fluid-dynamics.html",
    "Vibrations": "../vibrations/vibrations.html",
    "General Mechanics": "../general_mechanics/mechanics.html",
    "Accumulator Segments": "../accumulator/accumulator.html",
    "Thermodynamics": "../thermodynamics/thermodynamics.html",
    "Vehicle Dynamics": "../vehicle-dynamics/vehicle-dynamics.html"
};

// Determine which map to use based on the current path
const currentPath = window.location.pathname;
const selectedPageMap = currentPath === "/index.html" || currentPath === "/index" ? pageMap : pageMap1;

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
