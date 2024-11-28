fetch('../calculators.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const sidebar = document.getElementById('sidebar');
        const pageMap = {
            "Dynamics": "/dynamics/dynamics.html",
            "Statics": "/statics/statics.html",
            "Structural": "/structural/structural.html",
            "Fluid and Aero Dynamics": "/fluid-dynamics/fluid-dynamics.html",
            "Vibrations": "/vibrations/vibrations.html",
            "General Mechanics": "/general_mechanics/mechanics.html"
        };

        for (const category in data) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category';
            const categoryTitle = document.createElement('h2');
            categoryTitle.innerText = category;
            categoryTitle.addEventListener('click', () => {
                window.location.href = pageMap[category];
            });
            categoryDiv.appendChild(categoryTitle);

            const calculatorsList = document.createElement('ul');
            data[category].forEach(calculator => {
                const listItem = document.createElement('li');
                listItem.innerText = calculator;
                calculatorsList.appendChild(listItem);
            });

            categoryDiv.appendChild(calculatorsList);
            sidebar.appendChild(categoryDiv);
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });