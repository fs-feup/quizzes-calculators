const sidebarData = {
    "Dynamics": [
        "Manual Skidpad",
        "Manual Skidpad Non FSG / FSPT",
        "Driverless Skidpad",
        "DC Skidpad",
        "Manual Acceleration",
        "Manual Acceleration Non FSG / FSPT",
        "Driverless Acceleration",
        "DC Acceleration",
        "Manual Autocross",
        "DC Autocross",
        "Endurance",
        "Endurance Non FSG / FSPT",
        "Efficiency",
        "Efficiency Non FSG / FSPT",
        "Efficiency Factor",
        "Trackdrive"
    ],
    "Statics": [
        "Non Finalist Business Plan Presentation Points",
        "Non Finalist Business Plan Presentation Points Austria"
    ],
    "Computer Vision": [
        "Camera Problem Calculator",
    ],
    "Moments of Inertia": [
        "Rectangle x Center",
        "Rectangle y Center",
        "Rectangle area",
        "Rectangle I x",
        "Rectangle I y",
        "Triangle y Center",
        "Triangle area",
        "Triangle I x",
        "Rectangle Triangle x Center",
        "Rectangle Triangle y Center",
        "Rectangle Triangle area",
        "Rectangle Triangle I x",
        "Rectangle Triangle I y",
        "Circle x Center",
        "Circle y Center",
        "Circle area",
        "Circle I x",
        "Circle I y",
        "Half Circle x Center",
        "Half Circle y Center",
        "Half Circle area",
        "Half Circle I x",
        "Half Circle I y",
        "Quarter Circle I x",
        "Quarter Circle I y",
        "Quarter Circle x Center",
        "Quarter Circle y Center",
        "Quarter Circle area",
        "Quarter Circle I x",
        "Quarter Circle I y",
        "Half Elipse y Center",
        "Half Elipse area",
        "Half Elipse I x",
        "Half Elipse I y",
        "Quarter Elipse x Center",
        "Quarter Elipse y Center",
        "Quarter Elipse area",
        "Quarter Elipse I x",
        "Quarter Elipse I y",
        "Parabola y Center",
        "Parabola area",
        "Parabola I x",
        "Parabola I y",
        "Half Parabola x Center",
        "Half Parabola y Center",
        "Half Parabola area",
        "Half Parabola I x",
        "Half Parabola I y",
        "Hollow Shaft",
    ],
    "Structural": [
        "Young modulus (elasticity) formula",
        "Young modulus (elasticity) alternative formula",
        "Point Load Reaction",
        "Point Load Moment",
        "Point Load Deflection",
        "Distributed Load Reaction",
        "Distributed Load Moment",
        "Distributed Load Deflection",
        "Two Point Load Deflection",
        "One Point Load x distance Deflection",
        "Coordinate One Point Load x distance Deflection",
        "Maximum Moment One Point Load x distance",
        "One Point Load x distance Reaction Force at Support A",
        "One Point Load x distance Reaction Force at Support B",
    ],
    "Fluid and Aero Dynamics": [
        "Drag and Lift Calculator",
        "Reynolds Number Calculator",
        "Perfect Gas Law Calculator",
        "Bernoulli's Law Calculator",
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
        "Accumulator Segments Calculator"
    ],
    "Thermodynamics": [
        "Termodynamics Calculator"
    ],
    "Vehicle Dynamics": [
        "Curving Problem",
        "Slip Angle Calculator",
        "Longitudinal Weight Transfer Calculator",
        "Lateral Weight Transfer Calculator"
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
};

// Get the current path
const currentPath = window.location.pathname;

// Check if the current path indicates the root or the quizzes-calculators directory
const isRootPath = currentPath.endsWith("/index.html") 
    || currentPath.endsWith("/index")
    || currentPath.endsWith("/quizzes-calculators/")
    || currentPath.endsWith("/");


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

        const id = calculator
            .toLowerCase()
            .replace(/ /g, '-')      
            .replace(/[^a-z0-9\-]/g, ''); 

        listItem.addEventListener('click', () => {
            const targetPage = selectedPageMap[category];
            if (targetPage) {
                window.location.href = `${targetPage}#${id}`;
            }
        });

        calculatorsList.appendChild(listItem);
    });


    categoryDiv.appendChild(calculatorsList);
    sidebar.appendChild(categoryDiv);
}
