const sidebarData = {
    "Dynamics": [
        "Manual Skidpad",
        "Driverless Skidpad",
        "DC Skidpad",
        "Manual Acceleration",
        "Driverless Acceleration",
        "DC Acceleration"
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
        "Velocity from Positions Equation"
    ]
};

const pageMap = {
    "Dynamics": "/dynamics/dynamics.html",
    "Statics": "/statics/statics.html",
    "Structural": "/structural/structural.html",
    "Fluid and Aero Dynamics": "/fluid-dynamics/fluid-dynamics.html",
    "Vibrations": "/vibrations/vibrations.html",
    "General Mechanics": "/general_mechanics/mechanics.html"
};

const sidebar = document.getElementById('sidebar');

for (const category in sidebarData) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category';
    const categoryTitle = document.createElement('h2');
    categoryTitle.innerText = category;
    categoryTitle.addEventListener('click', () => {
        window.location.href = pageMap[category];
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