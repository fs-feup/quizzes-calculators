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
    "Computer Vision": [
        "Camera Problem Calculator",
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
        'UDL Deflection' ,
        "Cylindrical I",
        "Cylindrical I 2",
        "General section I y bar",
        "General section I x bar",
        "General section area",
        "General section y bar",
        "General section x bar",
        "Extrato parabolico I y bar",
        "Extrato parabolico I x bar",
        "Extrato parabolico area",
        "Extrato parabolico y bar",
        "Extrato parabolico x bar",
        "Media Parabola I y bar",
        "Media Parabola I x bar",
        "Media Parabola area",
        "Media Parabola y bar",
        "Media Parabola x bar",
        "Parabola I x bar",
        "Parabola area",
        "Parabola y bar",
        "Quarter Elipse I y bar",
        "Quarter Elipse I x bar",
        "Quarter Elipse area",
        "Quarter Elipse y bar",
        "Quarter Elipse x bar",
        "Half Elipse I y bar",
        "Half Elipse I x bar",
        "Half Elipse area",
        "Half Elipse y bar",
        "Quarter Circle I y bar",
        "Quarter Circle I x bar",
        "Quarter Circle area",
        "Quarter Circle y bar",
        "Quarter Circle x bar",
        "Half Circle I y bar",
        "Half Circle I x bar",
        "Half Circle area",
        "Half Circle x bar",
        "Half Circle y bar"
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
        "Curving Problem",
        "Slip Angle Calculator"
    ]
};

const pageMap = {
    "Dynamics": "dynamics/dynamics.html",
    "Statics": "statics/statics.html",
    "Structural": "structural/structural.html",
    "Fluid and Aero Dynamics": "fluid-dynamics/fluid-dynamics.html",
    "Vibrations": "vibrations/vibrations.html",
    "General Mechanics": "general_mechanics/mechanics.html",
    "Accumulator Segments": "accumulator/accumulator.html",
    "Thermodynamics": "thermodynamics/thermodynamics.html",
    "Vehicle Dynamics": "vehicle-dynamics/vehicle-dynamics.html",
    "Computer Vision": "computer_vision/computer_vision.html"
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
    "Vehicle Dynamics": "../vehicle-dynamics/vehicle-dynamics.html",
    "Computer Vision": "../computer_vision/computer_vision.html"
};

// Get the current path
const currentPath = window.location.pathname;

// Check if the current path indicates the root or the quizzes-calculators directory
const isRootPath = currentPath === "/index.html" || currentPath === "/index" || currentPath.endsWith("/quizzes-calculators/") || currentPath.endsWith("/");

// Select the appropriate page map
const selectedPageMap = isRootPath ? pageMap : pageMap1;

console.log(selectedPageMap);


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
