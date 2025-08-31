document.addEventListener('DOMContentLoaded', () => {

    // DOM Elements
    const moneyEl = document.getElementById('money');
    const gameTimeEl = document.getElementById('game-time');
    const gameDayEl = document.getElementById('game-day');
    const openShopBtn = document.getElementById('open-shop-btn');
    const shopModal = document.getElementById('shop-modal');
    const closeShopBtn = document.getElementById('close-shop-btn');
    const upgradeGrinderBtn = document.getElementById('upgrade-grinder');
    const upgradeBrewerBtn = document.getElementById('upgrade-brewer');
    const automateGrindingBtn = document.getElementById('automate-grinding');
    const hireBaristaBtn = document.getElementById('hire-barista');
    const employeeCountEl = document.getElementById('employee-count');
    const beansSelect = document.getElementById('beans');
    const milkSelect = document.getElementById('milk');
    const sweetenerSelect = document.getElementById('sweetener');
    const extrasSelect = document.getElementById('extras');

    const grindBeansBtn = document.getElementById('grind-beans');
    const brewCoffeeBtn = document.getElementById('brew-coffee');
    const addMilkBtn = document.getElementById('add-milk');
    const addSweetenerBtn = document.getElementById('add-sweetener');
    const addExtrasBtn = document.getElementById('add-extras');
    const addSyrupBtn = document.getElementById('add-syrup');
    const stepFeedbackEl = document.getElementById('step-feedback');

    const coffeeNameEl = document.getElementById('coffee-name');
    const coffeeQualityEl = document.getElementById('coffee-quality');
    const coffeePriceEl = document.getElementById('coffee-price');
    const makeCoffeeBtn = document.getElementById('make-coffee-btn');
    const sellCoffeeBtn = document.getElementById('sell-coffee-btn');

    const logListEl = document.getElementById('log-list');

    // Customer Area Elements
    const customerNameEl = document.getElementById('customer-name');
    const customerRequestEl = document.getElementById('customer-request');
    const customerAllergiesEl = document.getElementById('customer-allergies');
    const customerFeedbackEl = document.getElementById('customer-feedback');

    // Minigame Elements
    const grindMinigameArea = document.getElementById('grind-minigame');
    const grindActionBtn = document.getElementById('grind-action-btn');
    const grindProgressEl = document.getElementById('grind-progress');
    const brewMinigameArea = document.getElementById('brew-minigame');
    const brewTempSlider = document.getElementById('brew-temp-slider');
    const brewProgressEl = document.getElementById('brew-progress');

    // New Minigame Elements for Milk, Sweetener, Syrup
    const milkMinigameArea = document.getElementById('milk-minigame');
    const milkActionBtn = document.getElementById('milk-action-btn');
    const milkProgressEl = document.getElementById('milk-progress');

    const sweetenerMinigameArea = document.getElementById('sweetener-minigame');
    const sweetenerActionBtn = document.getElementById('sweetener-action-btn');
    const sweetenerProgressEl = document.getElementById('sweetener-progress');

    const syrupMinigameArea = document.getElementById('syrup-minigame');
    const syrupActionBtn = document.getElementById('syrup-action-btn');
    const syrupProgressEl = document.getElementById('syrup-progress');

    // Daily Summary Elements
    const dailySummarySection = document.getElementById('daily-summary');
    const summaryDayEl = document.getElementById('summary-day');
    const summaryCustomersEl = document.getElementById('summary-customers');
    const summaryIncomeEl = document.getElementById('summary-income');
    const summaryCoffeeCostsEl = document.getElementById('summary-coffee-costs');
    const summaryWagesEl = document.getElementById('summary-wages');
    const summaryEnergyEl = document.getElementById('summary-energy');
    const summaryTaxesEl = document.getElementById('summary-taxes');
    const summaryProfitEl = document.getElementById('summary-profit');
    const nextDayBtn = document.getElementById('next-day-btn');

    // Employee Management Modal Elements
    const manageEmployeesBtn = document.getElementById('manage-employees-btn');
    const saveGameBtn = document.getElementById('save-game-btn');
    const employeeManagementModal = document.getElementById('employee-management-modal');
    const closeEmployeeModalBtn = document.getElementById('close-employee-modal-btn');
    const employeeListEl = document.getElementById('employee-list');

    // Game State
    let playerMoney = 100;

    // Cheat Commands
    function handleCheatCommand(command) {
        const parts = command.split(' ');
        const cmd = parts[0];
        const value = parseInt(parts[1]);

        switch (cmd) {
            case 'money':
                if (!isNaN(value)) {
                    playerMoney += value;
                    updateMoneyDisplay();
                    addLog(`CHEAT: Money changed by ${value}. New balance: ${playerMoney}`);
                } else {
                    addLog('CHEAT ERROR: Usage: money <amount>');
                }
                break;
            case 'grinder':
                if (!isNaN(value) && value >= 1) {
                    grinderLevel = value;
                    addLog(`CHEAT: Grinder level set to ${value}.`);
                } else {
                    addLog('CHEAT ERROR: Usage: grinder <level> (level >= 1)');
                }
                break;
            case 'brewer':
                if (!isNaN(value) && value >= 1) {
                    brewerLevel = value;
                    addLog(`CHEAT: Brewer level set to ${value}.`);
                } else {
                    addLog('CHEAT ERROR: Usage: brewer <level> (level >= 1)');
                }
                break;
            case 'day':
                if (!isNaN(value) && value >= 1) {
                    currentGameDay = value;
                    updateTimeDisplay();
                    addLog(`CHEAT: Day set to ${value}.`);
                } else {
                    addLog('CHEAT ERROR: Usage: day <number> (day >= 1)');
                }
                break;
            case 'automate_grinding':
                grindingAutomated = true;
                automateGrindingBtn.disabled = true;
                addLog('CHEAT: Grinding automation enabled.');
                break;
            case 'hire_barista':
                const employeeName = parts[1] || 'Cheater Barista';
                const employeeSkill = parts[2] || 'Barista';
                const employeeEfficiency = parseFloat(parts[3]) || 1.0;
                employees.push({
                    id: `emp-${Date.now()}-${Math.floor(Math.random() * 1000)}`, 
                    name: employeeName,
                    skill: employeeSkill,
                    efficiency: employeeEfficiency,
                    assignment: 'None'
                });
                employeeCount++;
                employeeCountEl.textContent = employeeCount;
                renderEmployees();
                addLog(`CHEAT: Hired new employee: ${employeeName} (${employeeSkill}, ${employeeEfficiency} efficiency).`);
                break;
            case 'reset':
                resetGame();
                addLog('CHEAT: Game has been reset.');
                break;
            default:
                addLog('CHEAT ERROR: Unknown command. Available: money, grinder, brewer, day, automate_grinding, hire_barista, reset');
        }
    }

    function resetGame() {
        // Reset all game state variables to their initial values
        playerMoney = 100;
        grinderLevel = 1;
        brewerLevel = 1;
        currentCoffee = {};
        currentCustomer = null;
        customerQueue = [];
        customerServed = 0;
        dailyGrossIncome = 0;
        dailyCoffeeCosts = 0;
        dailyEnergyUsed = 0;
        currentGameHour = 8;
        currentGameDay = 1;
        employees = [];
        employeeCount = 0;
        grindingAutomated = false;
        // Update displays
        updateMoneyDisplay();
        updateTimeDisplay();
        employeeCountEl.textContent = employeeCount;
        renderEmployees();
        // Reset UI elements
        beansSelect.value = 'robusta';
        milkSelect.value = 'none';
        sweetenerSelect.value = 'none';
        extrasSelect.value = 'none';
        automateGrindingBtn.disabled = false;
        automateGrindingBtn.textContent = 'Automate Grinding (Cost: $500)';
        addLog('Game state reset.');
    }

    window.cheat = handleCheatCommand;


    let grinderLevel = 1;
    let brewerLevel = 1;
    let grindingAutomated = false;
    let employeeCount = 0;
    let customerQueue = [];
    let currentCustomer = null;
    let currentGameHour = 8; // 8 AM
    let currentGameDay = 1;
    let dailyCustomersServed = 0;
    let dailyGrossIncome = 0;
    let dailyCoffeeCosts = 0;
    let dailyEnergyUsed = 0;
    let employees = []; // Array to store employee objects {name: 'Default', skill: 'None', assignment: 'None'}

    function loadGame() {

        const savedState = localStorage.getItem('coffeeTycoonSave');
        if (savedState) {
            const gameState = JSON.parse(savedState);
            playerMoney = gameState.playerMoney || 100;
            grinderLevel = gameState.grinderLevel || 1;
            brewerLevel = gameState.brewerLevel || 1;
            grindingAutomated = gameState.grindingAutomated || false;
            employeeCount = gameState.employeeCount || 0;
            currentGameHour = gameState.currentGameHour || 8;
            currentGameDay = gameState.currentGameDay || 1;
            dailyCustomersServed = gameState.dailyCustomersServed || 0;
            dailyGrossIncome = gameState.dailyGrossIncome || 0;
            dailyCoffeeCosts = gameState.dailyCoffeeCosts || 0;
            dailyEnergyUsed = gameState.dailyEnergyUsed || 0;
            employees = gameState.employees ? gameState.employees.map(emp => ({
                ...emp,
                id: emp.id || `emp-${Date.now()}-${Math.floor(Math.random() * 1000)}`
            })) : [];
            const savedLogs = gameState.logs || [];
            logListEl.innerHTML = ''; 
            savedLogs.forEach(logText => {
                const listItem = document.createElement('li');
                listItem.textContent = logText;
                logListEl.appendChild(listItem);
            });

            updateMoneyDisplay();
            updateTimeDisplay();
            employeeCountEl.textContent = employeeCount;
            renderEmployees();
            addLog('Game loaded!');
        }
    }

    let minigameActive = null; // 'grind' or 'brew'
    let minigameProgress = 0;
    let minigameTimeout;
    const GRIND_TARGET_CLICKS = 10;
    const BREW_TARGET_TIME_MS = 3000; // 3 seconds for brewing minigame
     const MILK_TARGET_CLICKS = 8;
     const SWEETENER_TARGET_CLICKS = 7;
     const SYRUP_TARGET_CLICKS = 9;
    let currentCoffee = {
        name: '',
        baseQuality: 0,
        stepsQuality: 0,
        totalQuality: 0,
        cost: 0,
        potentialPrice: 0,
        ingredients: {},
        stepsCompleted: {
            grind: false,
            brew: false,
            milk: false,
            sweetener: false,
            extras: false
        }
    };
    let makingProcessTimeout;
    const EMPLOYEE_WAGE_PER_DAY = 50;


    function updateMoneyDisplay() {
        moneyEl.textContent = playerMoney;
    }

    // Save/Load Game Functions
    function saveGame() {
        const gameState = {
            playerMoney,
            grinderLevel,
            brewerLevel,
            grindingAutomated,
            employeeCount,
            currentGameHour,
            currentGameDay,
            dailyCustomersServed,
            dailyGrossIncome,
            dailyCoffeeCosts,
            dailyEnergyUsed,
            employees: employees.map(emp => ({
                name: emp.name,
                skill: emp.skill,
                efficiency: emp.efficiency,
                assignment: emp.assignment
            })),
            logs: Array.from(logListEl.children).map(li => li.textContent) 
        };
        localStorage.setItem('coffeeTycoonSave', JSON.stringify(gameState));
        addLog('Game saved!');
    }



    // --- Helper Functions ---
    function getEmployeeAssignedTo(task) {
        return employees.find(emp => emp.assignment === task);
    }

    function updateTimeDisplay() {
        const amPm = currentGameHour < 12 || currentGameHour === 24 ? 'AM' : 'PM';
        const displayHour = currentGameHour % 12 === 0 ? 12 : currentGameHour % 12;
        gameTimeEl.textContent = `${displayHour}:00 ${amPm}`;
        gameDayEl.textContent = currentGameDay;
    }

    function addLog(message) {
        const listItem = document.createElement('li');
        listItem.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        logListEl.prepend(listItem); 
        if (logListEl.children.length > 10) { 
            logListEl.removeChild(logListEl.lastChild);
        }
    }

    function getSelectedOptionData(selectElement) {
        const selected = selectElement.options[selectElement.selectedIndex];
        return {
            value: selected.value,
            price: parseInt(selected.dataset.price) || 0,
            quality: parseInt(selected.dataset.quality) || 0,
            text: selected.textContent,
            allergy: selected.dataset.allergy || 'none'
        };
    }

    function resetCoffeeMakingSteps() {
        currentCoffee.stepsCompleted = {
            grind: false,
            brew: false,
            milk: false,
            sweetener: false,
            extras: false
        };
        currentCoffee.stepsQuality = 0;


        stepFeedbackEl.textContent = 'Select ingredients and start making coffee!';
        [grindBeansBtn, brewCoffeeBtn, addMilkBtn, addSweetenerBtn, addExtrasBtn, addSyrupBtn].forEach(btn => btn.disabled = false);
        makeCoffeeBtn.style.display = 'inline-block';
        sellCoffeeBtn.style.display = 'none';
        coffeeNameEl.textContent = '-';
        coffeeQualityEl.textContent = '-';
        coffeePriceEl.textContent = '-';
    }

    function calculateCoffee() {
        const beans = getSelectedOptionData(beansSelect);
        const milk = getSelectedOptionData(milkSelect);
        const sweetener = getSelectedOptionData(sweetenerSelect);
        const extras = getSelectedOptionData(extrasSelect);
        const syrup = getSelectedOptionData(document.getElementById('syrup'));

        currentCoffee.ingredients = { beans, milk, sweetener, extras, syrup };
        currentCoffee.cost = beans.price + milk.price + sweetener.price + extras.price + syrup.price;
        currentCoffee.baseQuality = beans.quality + milk.quality + sweetener.quality + extras.quality + syrup.quality;

        let nameParts = [beans.value];
        if (milk.value !== 'none') nameParts.push(milk.value);
        if (sweetener.value !== 'none') nameParts.push(sweetener.value);
        if (extras.value !== 'none') nameParts.push(extras.value);
        if (syrup.value !== 'none') nameParts.push(syrup.value);
        currentCoffee.name = nameParts.map(p => p.replace(/_/g, ' ').charAt(0).toUpperCase() + p.replace(/_/g, ' ').slice(1)).join(' ') + ' Special';
        
        // Adjust quality based on upgrades
        let effectiveStepsQuality = currentCoffee.stepsQuality;
        if (grinderLevel > 1) effectiveStepsQuality += (grinderLevel -1) * 0.5; // Small bonus for grinder
        if (brewerLevel > 1) effectiveStepsQuality += (brewerLevel -1) * 1; // Better bonus for brewer

        currentCoffee.totalQuality = Math.min(10, currentCoffee.baseQuality + effectiveStepsQuality);
        // Price influenced by quality and cost, with a profit margin
        currentCoffee.potentialPrice = Math.ceil(currentCoffee.cost + (currentCoffee.totalQuality * 2.5) + (employeeCount * 0.5) /* Small price bump for having staff */); 

        coffeeNameEl.textContent = currentCoffee.name;
        coffeeQualityEl.textContent = `${currentCoffee.totalQuality.toFixed(1)} / 10 (Base: ${currentCoffee.baseQuality}, Steps: ${effectiveStepsQuality.toFixed(1)})`;
        coffeePriceEl.textContent = currentCoffee.potentialPrice;
    }

    // --- Event Listeners for Making Process ---
    function handleStep(event, stepName, qualityBonus, feedback, nextStepEnabled = true) {
        if (currentCoffee.stepsCompleted[stepName]) {
            stepFeedbackEl.textContent = `Already ${stepName}ed!`;
            return;
        }
        if (stepName === 'grind' && currentCoffee.ingredients.beans.value === 'none') {
            stepFeedbackEl.textContent = 'Cannot grind without beans!';
            return;
        }
        if (stepName === 'brew' && !currentCoffee.stepsCompleted.grind) {
            stepFeedbackEl.textContent = 'Grind beans first!';
            return;
        }
        if ((stepName === 'milk' || stepName === 'sweetener' || stepName === 'extras' || stepName === 'syrup') && !currentCoffee.stepsCompleted.brew) {
            stepFeedbackEl.textContent = 'Brew coffee before adding ingredients!';
            return;
        }
        if (stepName === 'milk' && currentCoffee.ingredients.milk.value === 'none') {
            stepFeedbackEl.textContent = 'No milk selected to add.';
            // Allow skipping if not selected
            currentCoffee.stepsCompleted[stepName] = true; 
            if (nextStepEnabled) document.getElementById(addSweetenerBtn.id).disabled = false;
            calculateCoffee();
            return;
        }
        if (stepName === 'sweetener' && currentCoffee.ingredients.sweetener.value === 'none') {
            stepFeedbackEl.textContent = 'No sweetener selected to add.';
            currentCoffee.stepsCompleted[stepName] = true;
            if (nextStepEnabled) document.getElementById(addExtrasBtn.id).disabled = false;
            calculateCoffee();
            return;
        }
        if (stepName === 'extras' && currentCoffee.ingredients.extras.value === 'none') {
            stepFeedbackEl.textContent = 'No extras selected to add.';
            currentCoffee.stepsCompleted[stepName] = true;
            if (nextStepEnabled) document.getElementById('add-syrup').disabled = false;
            calculateCoffee();
            return;
        }
        if (stepName === 'syrup' && currentCoffee.ingredients.syrup.value === 'none') {
            stepFeedbackEl.textContent = 'No syrup selected to add.';
            currentCoffee.stepsCompleted[stepName] = true;
            calculateCoffee();
            return;
        }

        stepFeedbackEl.textContent = `${feedback}...`;
        document.getElementById(event.target.id).disabled = true; // Disable current step button

        // Determine sound file based on stepName
        let soundFileName = '';
        let soundDuration = 0;

        switch (stepName) {
            case 'grind':
                soundFileName = 'Coffee-grinding.mp3';
                soundDuration = 2000; // 1.5 seconds
                break;
            case 'brew':
                soundFileName = 'Coffee-brewing.mp3';
                soundDuration = 3000; // 2 seconds
                break;
            case 'milk':
                soundFileName = 'Milk-adding.mp3';
                soundDuration = 2000; // 1 second
                break;
            case 'sweetener':
                soundFileName = 'Sugar-poruing.mp3';
                soundDuration = 2000; // 1 second
                break;
            case 'syrup':
                soundFileName = 'Syrup-adding.mp3';
                soundDuration = 2000; // 1.5 seconds
                break;
        }

        if (soundFileName) {
            playSound(soundFileName);
            // Stop sound after the specified duration
            setTimeout(() => {
                stopSound();
            }, soundDuration);
        }

        // Simulate time/effort for step - Now handled by minigames for grind/brew
        const assignedGrinder = getEmployeeAssignedTo('Grinding');
        if (stepName === 'grind' && (grindingAutomated || assignedGrinder)) {
            const automatedSource = grindingAutomated ? 'Automation' : (assignedGrinder ? assignedGrinder.name : 'Automation');
            const efficiencyBonus = assignedGrinder ? (assignedGrinder.efficiency - 0.5) * 0.5 : 0; // Max +0.25 quality for 100% efficiency

            const finalQualityBonus = qualityBonus + efficiencyBonus;

            stepFeedbackEl.textContent = `Grinding by ${automatedSource}! +${finalQualityBonus.toFixed(1)} quality.`;
            currentCoffee.stepsCompleted[stepName] = true;
            currentCoffee.stepsQuality += finalQualityBonus;
            if (nextStepEnabled) brewCoffeeBtn.disabled = false;
            calculateCoffee();
            dailyEnergyUsed += 1; // Less energy for employee/automated
            stopSound(); // Stop sound when automated task completes
            
            const assignedBrewer = getEmployeeAssignedTo('Brewing');
            if (assignedBrewer && currentCoffee.stepsCompleted.grind && !currentCoffee.stepsCompleted.brew) {
                addLog(`${assignedBrewer.name} is starting to brew automatically.`);
                setTimeout(() => handleStep({ target: brewCoffeeBtn }, 'brew', 2, 'Brewing coffee'), 500); 
            }
            return;
        }
        // Fall through to manual grinding if not automated and no employee assigned to grinding
        if (stepName === 'grind') {
            startMinigame('grind', qualityBonus, feedback, nextStepEnabled, event.target.id);
        } else if (stepName === 'brew') {
            const assignedBrewer = getEmployeeAssignedTo('Brewing');
            if (assignedBrewer) {
                const efficiencyBonus = (assignedBrewer.efficiency - 0.5) * 1.0; // Max +0.5 quality for 100% efficiency
                const finalQualityBonus = qualityBonus + efficiencyBonus;
                stepFeedbackEl.textContent = `Brewing by ${assignedBrewer.name}! +${finalQualityBonus.toFixed(1)} quality.`;
                currentCoffee.stepsCompleted[stepName] = true;
                currentCoffee.stepsQuality += finalQualityBonus;
                if (nextStepEnabled) addMilkBtn.disabled = false;
                calculateCoffee();
                dailyEnergyUsed += 2; 
                stopSound(); // Stop sound when automated task completes

                const assignedMilkPrepper = getEmployeeAssignedTo('Milk');
                if(assignedMilkPrepper && currentCoffee.stepsCompleted.brew && !currentCoffee.stepsCompleted.milk && currentCoffee.ingredients.milk.value !== 'none'){
                    addLog(`${assignedMilkPrepper.name} is adding milk automatically.`);
                    setTimeout(() => handleStep({target: addMilkBtn}, 'milk', 1, 'Adding milk'), 500);
                }
                return;
            }
            // Fall through to manual brewing minigame if no employee assigned
            startMinigame('brew', qualityBonus, feedback, nextStepEnabled, event.target.id);
        } else { // For non-minigame steps (milk, sweetener, extras)
            const stepCapitalized = stepName.charAt(0).toUpperCase() + stepName.slice(1);
            const employeeForStep = getEmployeeAssignedTo(stepCapitalized);

            if (employeeForStep) {
                const efficiencyBonus = (employeeForStep.efficiency - 0.5) * 0.2; 
                const finalQualityBonus = qualityBonus + efficiencyBonus;
                stepFeedbackEl.textContent = `${feedback} by ${employeeForStep.name}! +${finalQualityBonus.toFixed(1)} quality.`;
                currentCoffee.stepsCompleted[stepName] = true;
                currentCoffee.stepsQuality += finalQualityBonus;
                
                if (nextStepEnabled) {
                    const currentButtonId = event.target.id;
                    if (currentButtonId === addMilkBtn.id) addSweetenerBtn.disabled = false;
                    else if (currentButtonId === addSweetenerBtn.id) addExtrasBtn.disabled = false;
                    else if (currentButtonId === addExtrasBtn.id) addSyrupBtn.disabled = false;
                }
                calculateCoffee();
                dailyEnergyUsed += 0.5; 
                stopSound(); // Stop sound when automated task completes

                let nextAutoStep = null;
                let nextAutoBtn = null;
                let nextAutoQuality = 1;
                let nextAutoFeedback = '';
                let nextEmployee = null;

                if (stepName === 'milk' && (nextEmployee = getEmployeeAssignedTo('Sweetener')) && currentCoffee.ingredients.sweetener.value !== 'none' && !currentCoffee.stepsCompleted.sweetener) {
                    nextAutoStep = 'sweetener'; nextAutoBtn = addSweetenerBtn; nextAutoFeedback = 'Adding sweetener';
                } else if (stepName === 'sweetener' && (nextEmployee = getEmployeeAssignedTo('Extras')) && currentCoffee.ingredients.extras.value !== 'none' && !currentCoffee.stepsCompleted.extras) {
                    nextAutoStep = 'extras'; nextAutoBtn = addExtrasBtn; nextAutoFeedback = 'Adding extras';
                } else if (stepName === 'extras' && (nextEmployee = getEmployeeAssignedTo('Syrup')) && currentCoffee.ingredients.syrup.value !== 'none' && !currentCoffee.stepsCompleted.syrup) {
                    nextAutoStep = 'syrup'; nextAutoBtn = addSyrupBtn; nextAutoFeedback = 'Adding syrup';
                }

                if (nextAutoStep && nextAutoBtn && nextEmployee) {
                    addLog(`${nextEmployee.name} is ${nextAutoFeedback.toLowerCase().replace('adding', 'adding')} automatically.`);
                    setTimeout(() => handleStep({target: nextAutoBtn}, nextAutoStep, nextAutoQuality, nextAutoFeedback, (nextAutoStep !== 'syrup')), 500);
                }
                return;
            }

            // If no employee assigned, handle manually (minigame or timeout)
            if (stepName === 'milk') {
                startMinigame('milk', qualityBonus, feedback, nextStepEnabled, event.target.id);
            } else if (stepName === 'sweetener') {
                startMinigame('sweetener', qualityBonus, feedback, nextStepEnabled, event.target.id);
            } else if (stepName === 'syrup') {
                startMinigame('syrup', qualityBonus, feedback, nextStepEnabled, event.target.id);
            } else if (stepName === 'extras') {
                // 'extras' step remains a simple timed event if no employee
                clearTimeout(makingProcessTimeout);
                makingProcessTimeout = setTimeout(() => {
                    currentCoffee.stepsCompleted[stepName] = true;
                    currentCoffee.stepsQuality += qualityBonus;
                    stepFeedbackEl.textContent = `${feedback} complete! +${qualityBonus} quality.`;
                    if (nextStepEnabled) { // nextStepEnabled is true for extras
                        addSyrupBtn.disabled = false; // Enable syrup button after extras
                    }
                    calculateCoffee();
                    dailyEnergyUsed += 1;
                    stopSound(); // Stop sound when manual task completes
                }, 500 + Math.random() * 500);
            } 
        }
    }



    // --- Minigame Functions ---
    function startMinigame(type, qualityBonus, feedback, nextStepEnabled, buttonIdToEnableNext) {
        minigameActive = type;
        minigameProgress = 0;
        stepFeedbackEl.textContent = `${feedback}...`;
        document.getElementById(buttonIdToEnableNext).disabled = true;
        dailyEnergyUsed += (type === 'grind' ? 3 : (type === 'brew' ? 5 : 2)); // Energy for minigames

        if (type === 'grind') {
            grindMinigameArea.style.display = 'block';
            grindProgressEl.style.width = '0%';
            let clicks = 0;
            grindActionBtn.onclick = () => {
                clicks++;
                minigameProgress = (clicks / GRIND_TARGET_CLICKS) * 100;
                grindProgressEl.style.width = `${minigameProgress}%`;
                if (clicks >= GRIND_TARGET_CLICKS) {
                    finishMinigame(type, qualityBonus, feedback, nextStepEnabled, buttonIdToEnableNext);
                }
            };
        } else if (type === 'brew') {
            brewMinigameArea.style.display = 'block';
            brewProgressEl.style.width = '0%';
            let startTime = Date.now();
            minigameTimeout = setInterval(() => {
                const elapsedTime = Date.now() - startTime;
                minigameProgress = (elapsedTime / BREW_TARGET_TIME_MS) * 100;
                brewProgressEl.style.width = `${minigameProgress}%`;
                if (elapsedTime >= BREW_TARGET_TIME_MS) {
                    const tempValue = parseInt(brewTempSlider.value);
                    let tempBonus = 0;
                    if (tempValue >= 90 && tempValue <= 92) tempBonus = qualityBonus; // Perfect temp
                    else if (tempValue >= 88 && tempValue <= 94) tempBonus = qualityBonus * 0.5; // Good temp
                    // else 0 bonus for bad temp
                    finishMinigame(type, tempBonus, feedback, nextStepEnabled, buttonIdToEnableNext);
                }
            }, 100);
        } else if (type === 'milk') {
            milkMinigameArea.style.display = 'block';
            milkProgressEl.style.width = '0%';
            let clicks = 0;
            milkActionBtn.onclick = () => {
                clicks++;
                minigameProgress = (clicks / MILK_TARGET_CLICKS) * 100;
                milkProgressEl.style.width = `${minigameProgress}%`;
                if (clicks >= MILK_TARGET_CLICKS) {
                    finishMinigame(type, qualityBonus, feedback, nextStepEnabled, buttonIdToEnableNext);
                }
            };
        } else if (type === 'sweetener') {
            sweetenerMinigameArea.style.display = 'block';
            sweetenerProgressEl.style.width = '0%';
            let clicks = 0;
            sweetenerActionBtn.onclick = () => {
                clicks++;
                minigameProgress = (clicks / SWEETENER_TARGET_CLICKS) * 100;
                sweetenerProgressEl.style.width = `${minigameProgress}%`;
                if (clicks >= SWEETENER_TARGET_CLICKS) {
                    finishMinigame(type, qualityBonus, feedback, nextStepEnabled, buttonIdToEnableNext);
                }
            };
        } else if (type === 'syrup') {
            syrupMinigameArea.style.display = 'block';
            syrupProgressEl.style.width = '0%';
            let clicks = 0;
            syrupActionBtn.onclick = () => {
                clicks++;
                minigameProgress = (clicks / SYRUP_TARGET_CLICKS) * 100;
                syrupProgressEl.style.width = `${minigameProgress}%`;
                if (clicks >= SYRUP_TARGET_CLICKS) {
                    finishMinigame(type, qualityBonus, feedback, nextStepEnabled, buttonIdToEnableNext);
                }
            };
        }
    }

    function finishMinigame(type, qualityBonusAchieved, feedback, nextStepEnabled, buttonIdToEnableNext) {
        clearInterval(minigameTimeout);
        if (type === 'grind') grindMinigameArea.style.display = 'none';
        if (type === 'brew') brewMinigameArea.style.display = 'none';
        if (type === 'milk') milkMinigameArea.style.display = 'none';
        if (type === 'sweetener') sweetenerMinigameArea.style.display = 'none';
        if (type === 'syrup') syrupMinigameArea.style.display = 'none';

        grindActionBtn.onclick = null; // Clear listener
        milkActionBtn.onclick = null;
        sweetenerActionBtn.onclick = null;
        syrupActionBtn.onclick = null;

        currentCoffee.stepsCompleted[type] = true;
        currentCoffee.stepsQuality += qualityBonusAchieved;
        stepFeedbackEl.textContent = `${feedback} complete! +${qualityBonusAchieved.toFixed(1)} quality.`;
        
        if (nextStepEnabled) {
            if (buttonIdToEnableNext === grindBeansBtn.id) brewCoffeeBtn.disabled = false;
            else if (buttonIdToEnableNext === brewCoffeeBtn.id) addMilkBtn.disabled = false;
            else if (buttonIdToEnableNext === addMilkBtn.id) addSweetenerBtn.disabled = false;
            else if (buttonIdToEnableNext === addSweetenerBtn.id) addExtrasBtn.disabled = false;
            else if (buttonIdToEnableNext === addExtrasBtn.id) addSyrupBtn.disabled = false;
            // Note: No next button enabled after syrup by default in this structure
        }
        calculateCoffee();
        minigameActive = null;
    }

    grindBeansBtn.addEventListener('click', (event) => handleStep(event, 'grind', 1, 'Grinding beans'));
    brewCoffeeBtn.addEventListener('click', (event) => handleStep(event, 'brew', 2, 'Brewing coffee'));
    addMilkBtn.addEventListener('click', (event) => handleStep(event, 'milk', 1, 'Adding milk'));
    addSweetenerBtn.addEventListener('click', (event) => handleStep(event, 'sweetener', 1, 'Adding sweetener'));
    addExtrasBtn.addEventListener('click', (event) => handleStep(event, 'extras', 1, 'Adding extras', true));
    addSyrupBtn.addEventListener('click', (event) => handleStep(event, 'syrup', 1, 'Adding syrup', false));

    // --- Ingredient Selection & Make Coffee Button ---
    [beansSelect, milkSelect, sweetenerSelect, extrasSelect, document.getElementById('syrup')].forEach(sel => {
        sel.addEventListener('change', () => {
            // When ingredients change, reset steps and recalculate if a coffee isn't 'finalized'
            if (makeCoffeeBtn.style.display !== 'none') {
                 resetCoffeeMakingSteps(); // Reset steps if user changes ingredients mid-preparation
            }
            calculateCoffee();
        });
    });

    makeCoffeeBtn.addEventListener('click', () => {
        if (playerMoney < currentCoffee.cost) {
            addLog(`Not enough money to make ${currentCoffee.name}. Cost: $${currentCoffee.cost}`);
            stepFeedbackEl.textContent = `Not enough money! Need $${currentCoffee.cost}.`;
            return;
        }

        const allStepsDoneOrSkipped = 
            currentCoffee.stepsCompleted.grind &&
            currentCoffee.stepsCompleted.brew &&
            (currentCoffee.stepsCompleted.milk || currentCoffee.ingredients.milk.value === 'none') &&
            (currentCoffee.stepsCompleted.sweetener || currentCoffee.ingredients.sweetener.value === 'none') &&
            (currentCoffee.stepsCompleted.extras || currentCoffee.ingredients.extras.value === 'none') &&
            (currentCoffee.stepsCompleted.syrup || currentCoffee.ingredients.syrup.value === 'none');

        if (!allStepsDoneOrSkipped) {
            stepFeedbackEl.textContent = 'Please complete all relevant making steps!';
            addLog('Attempted to make coffee before completing steps.');
            return;
        }

        playerMoney -= currentCoffee.cost;
        dailyCoffeeCosts += currentCoffee.cost;
        updateMoneyDisplay();
        addLog(`Made ${currentCoffee.name} (Q: ${currentCoffee.totalQuality.toFixed(1)}/10). Cost: $${currentCoffee.cost}.`);
        stepFeedbackEl.textContent = `${currentCoffee.name} is ready!`;
        makeCoffeeBtn.style.display = 'none';
        sellCoffeeBtn.style.display = 'inline-block';
        // Disable step buttons after making
        [grindBeansBtn, brewCoffeeBtn, addMilkBtn, addSweetenerBtn, addExtrasBtn, addSyrupBtn].forEach(btn => btn.disabled = true);
    });

    sellCoffeeBtn.addEventListener('click', () => {
        if (!currentCustomer) {
            addLog(`No customer to sell to. Coffee discarded.`);
            customerFeedbackEl.textContent = "No customer waiting!";
        } else {
            let salePrice = currentCoffee.potentialPrice;
            let customerSatisfied = true;
            let feedback = `Customer ${currentCustomer.name} bought ${currentCoffee.name}`;

            // Check allergies
            let hasAllergen = false;
            if (currentCustomer.allergies.length > 0) {
                const coffeeIngredients = [currentCoffee.ingredients.milk, currentCoffee.ingredients.extras];
                for (const ingredient of coffeeIngredients) {
                    if (ingredient && ingredient.allergy !== 'none' && currentCustomer.allergies.includes(ingredient.allergy)) {
                        hasAllergen = true;
                        break;
                    }
                }
            }

            if (hasAllergen) {
                salePrice = 0; // No payment for allergic reaction
                customerSatisfied = false;
                feedback = `Oh no! ${currentCustomer.name} had an allergic reaction to ${currentCoffee.name}! No payment.`;
                customerFeedbackEl.textContent = "Allergic reaction! They didn't pay.";
                playerMoney -= 20; // Increased Penalty for allergic reaction
                addLog(`Allergic reaction! ${currentCustomer.name} did not pay. Lost $20.`);
                customerFeedbackEl.innerHTML = `<span style="color:red;">ALLERGIC REACTION!</span> ${currentCustomer.name} is unwell. You lost $20 and reputation!`;
            } else if (currentCoffee.totalQuality < currentCustomer.minQuality) {
                salePrice = Math.floor(salePrice * 0.5); // Reduced payment for low quality
                customerSatisfied = false;
                feedback = `${currentCustomer.name} found ${currentCoffee.name} subpar. Paid only $${salePrice}.`;
                customerFeedbackEl.textContent = "Customer not impressed. Paid less.";
            } else {
                customerFeedbackEl.textContent = "Customer loved it!";
            }

            let tip = 0;
            if (customerSatisfied) {
                // Check for special request fulfillment
                let specialRequestFulfilled = false;
                if (currentCustomer.specialRequest) {
                    const specialIngredient = currentCustomer.specialRequest;
                    if (currentCoffee.ingredients.extras.value === specialIngredient || 
                        currentCoffee.ingredients.syrup.value === specialIngredient || 
                        currentCoffee.ingredients.sweetener.value === specialIngredient ||
                        currentCoffee.ingredients.milk.value === specialIngredient) {
                        specialRequestFulfilled = true;
                        feedback += ` They loved the ${specialIngredient}!`;
                        salePrice += Math.ceil(currentCoffee.cost * 0.2); // Bonus for special item
                    }
                }

                // Calculate tip
                if (currentCoffee.totalQuality >= currentCustomer.minQuality + 2 || (specialRequestFulfilled && currentCoffee.totalQuality >= currentCustomer.minQuality)) {
                    tip = currentCustomer.tipPotential;
                    feedback += ` Tipped $${tip}!`;
                }
                 playerMoney += salePrice + tip;
                 dailyGrossIncome += salePrice + tip;
                 addLog(`${feedback} for $${salePrice} + $${tip} tip. Profit: $${salePrice + tip - currentCoffee.cost}.`);
            } else if (!hasAllergen) { // if not satisfied but not allergic, still get some money
                 playerMoney += salePrice;
                 dailyGrossIncome += salePrice;
                 addLog(`${feedback}`);
            }
            updateMoneyDisplay();
            dailyCustomersServed++;
        }

        resetCoffeeMakingSteps();
        calculateCoffee(); // Recalculate for the next default coffee
        currentCustomer = null; // Customer leaves
        advanceTime();
        displayNextCustomer();
    });

    // --- Shop Functionality ---
    openShopBtn.addEventListener('click', () => shopModal.style.display = 'block');
    closeShopBtn.addEventListener('click', () => shopModal.style.display = 'none');
    window.addEventListener('click', (event) => { // Close if clicked outside modal
        if (event.target === shopModal) {
            shopModal.style.display = 'none';
        }
    });

    function attemptPurchase(cost, successCallback, itemName) {
        if (playerMoney >= cost) {
            playerMoney -= cost;
            updateMoneyDisplay();
            successCallback();
            addLog(`Purchased ${itemName} for $${cost}.`);
            return true;
        }
        addLog(`Not enough money for ${itemName}. Need $${cost}.`);
        return false;
    }

    upgradeGrinderBtn.addEventListener('click', () => {
        const cost = parseInt(upgradeGrinderBtn.dataset.cost);
        if (attemptPurchase(cost, () => {
            grinderLevel++;
            upgradeGrinderBtn.dataset.cost = cost * 2; // Increase cost for next upgrade
            upgradeGrinderBtn.textContent = `Upgrade Grinder (Lvl ${grinderLevel + 1}) (Cost: $${upgradeGrinderBtn.dataset.cost}) - Faster Grinding`;
            addLog(`Grinder upgraded to Level ${grinderLevel}.`);
        }, 'Grinder Upgrade')) {}
    });

    upgradeBrewerBtn.addEventListener('click', () => {
        const cost = parseInt(upgradeBrewerBtn.dataset.cost);
        if (attemptPurchase(cost, () => {
            brewerLevel++;
            upgradeBrewerBtn.dataset.cost = cost * 2;
            upgradeBrewerBtn.textContent = `Upgrade Brewer (Lvl ${brewerLevel + 1}) (Cost: $${upgradeBrewerBtn.dataset.cost}) - Better Brew Quality`;
            addLog(`Brewer upgraded to Level ${brewerLevel}.`);
        }, 'Brewer Upgrade')) {}
    });

    automateGrindingBtn.addEventListener('click', () => {
        const cost = parseInt(automateGrindingBtn.dataset.cost);
        if (!grindingAutomated && attemptPurchase(cost, () => {
            grindingAutomated = true;
            automateGrindingBtn.disabled = true;
            automateGrindingBtn.textContent = 'Grinding Automated';
            addLog('Grinding process automated!');
        }, 'Grinding Automation')) {}
    });



    function hireBarista() {
        const cost = 150 + employeeCount * 100; // Increasing cost for more employees
        if (playerMoney >= cost) {
            playerMoney -= cost;
            employeeCount++;
            const newEmployee = {
                id: `emp-${Date.now()}`,
                name: `Barista #${employeeCount}`,
                skill: ['Grinding', 'Brewing', 'Latte Art', 'Customer Service'][Math.floor(Math.random() * 4)], // Random skill
                assignment: 'None', // 'Grinding', 'Brewing', 'Milk', 'Sweetener', 'Extras'
                efficiency: Math.random() * 0.5 + 0.5 // 0.5 to 1.0 efficiency
            };
            employees.push(newEmployee);
            employeeCountEl.textContent = employeeCount;
            updateMoneyDisplay();
            addLog(`Hired ${newEmployee.name} (Skill: ${newEmployee.skill})! Total employees: ${employeeCount}. Cost: $${cost}.`);
            renderEmployees(); // Update the employee management modal
            updateHireBaristaButton();
        } else {
            addLog(`Not enough money to hire a barista. Need $${cost}.`);
        }
    }

    if (hireBaristaBtn) {
        hireBaristaBtn.addEventListener('click', hireBarista);
    }

    function updateHireBaristaButton() {
        const cost = 150 + employeeCount * 100;
        hireBaristaBtn.textContent = `Hire Barista (Cost: $${cost}) - Helps make coffee`;
    }

    // Initial update of the button text when the page loads
    updateHireBaristaButton();

    // --- Employee Management Modal --- 
    if (manageEmployeesBtn) {
        manageEmployeesBtn.addEventListener('click', () => {
        employeeManagementModal.style.display = 'block';
        renderEmployees();
    });
    }

    saveGameBtn.addEventListener('click', saveGame);

    if (closeEmployeeModalBtn) {
        closeEmployeeModalBtn.addEventListener('click', () => {
            employeeManagementModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => { // Close if clicked outside modal
        if (event.target === employeeManagementModal) {
            employeeManagementModal.style.display = 'none';
        }
    });

    function renderEmployees() {
        if (!employeeListEl) return;
        employeeListEl.innerHTML = ''; // Clear existing list
        if (employees.length === 0) {
            employeeListEl.innerHTML = '<p>No employees hired yet. Click "Hire Barista" in the Shop!</p>';
            return;
        }

        employees.forEach(emp => {
            const empCard = document.createElement('div');
            empCard.className = 'employee-card';
            empCard.innerHTML = `
                <h4><input type="text" class="employee-name-input" data-id="${emp.id}" value="${emp.name}" placeholder="Employee Name"></h4>
                <p>Skill: ${emp.skill}</p>
                <p>Efficiency: ${(emp.efficiency * 100).toFixed(0)}%</p>
                <p>Assignment: <span class="assignment-text">${emp.assignment}</span></p>
                <select class="employee-assignment-select" data-id="${emp.id}">
                    <option value="None" ${emp.assignment === 'None' ? 'selected' : ''}>None</option>
                    <option value="Grinding" ${emp.assignment === 'Grinding' ? 'selected' : ''}>Grinding</option>
                    <option value="Brewing" ${emp.assignment === 'Brewing' ? 'selected' : ''}>Brewing</option>
                    <option value="Milk" ${emp.assignment === 'Milk' ? 'selected' : ''}>Milk Prep</option>
                    <option value="Sweetener" ${emp.assignment === 'Sweetener' ? 'selected' : ''}>Sweetener Prep</option>
                    <option value="Extras" ${emp.assignment === 'Extras' ? 'selected' : ''}>Extras Prep</option>
                    <option value="Syrup" ${emp.assignment === 'Syrup' ? 'selected' : ''}>Syrup Prep</option>
                </select>
            `;
            employeeListEl.appendChild(empCard);

            const nameInput = empCard.querySelector('.employee-name-input');
            nameInput.addEventListener('change', (e) => {
                const employee = employees.find(em => em.id === e.target.dataset.id);
                if (employee) {
                    employee.name = e.target.value || `Barista ${employee.id.slice(-4)}`;
                    addLog(`Renamed employee ${employee.id} to ${employee.name}.`);
                    nameInput.value = employee.name; // Ensure input reflects change if it was empty
                }
            });

            const assignmentSelect = empCard.querySelector('.employee-assignment-select');
            assignmentSelect.addEventListener('change', (e) => {
                const employee = employees.find(em => em.id === e.target.dataset.id);
                if (employee) {
                    const newAssignment = e.target.value;
                    // If this task is already assigned to another employee, unassign it from them
                    if (newAssignment !== 'None') {
                        employees.forEach(otherEmp => {
                            if (otherEmp.id !== employee.id && otherEmp.assignment === newAssignment) {
                                otherEmp.assignment = 'None';
                            }
                        });
                    }
                    employee.assignment = newAssignment;
                    addLog(`${employee.name} assigned to ${employee.assignment}.`);
                    renderEmployees(); // Re-render to reflect all changes immediately
                }
            });
        });
    }

    // --- Customer System ---
    const customerNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Edward', 'Fiona', 'George', 'Hannah', 'Ian', 'Julia', 'Kevin', 'Laura', 'Mike', 'Nora', 'Oscar', 'Penny', 'Quinn', 'Rachel', 'Steve', 'Tina', 'Uma', 'Victor', 'Wendy', 'Xavier', 'Yvonne', 'Zach', 'Andrew', 'Emma'];
    const coffeeRequests = [
        { type: 'Quick Espresso', minQuality: 3, preferences: ['espresso'], potentialSpecial: ['sugar'] },
        { type: 'Strong Black Coffee', minQuality: 4, preferences: ['arabica', 'robusta'], potentialSpecial: ['double_shot'] }, // double_shot could be an 'extra'
        { type: 'Sweet Latte', minQuality: 5, preferences: ['latte', 'whole_milk'], potentialSpecial: ['Vanilla_syrup', 'Caramel_syrup', 'Whipped_cream'] },
        { type: 'Fancy Cappuccino', minQuality: 6, preferences: ['cappuccino', 'foam'], potentialSpecial: ['Chocolate_powder', 'Cinnamon_stick'] }, // cinnamon_stick as extra
        { type: 'Iced Coffee', minQuality: 4, preferences: ['cold_brew', 'ice', 'milk'], potentialSpecial: ['Sugar_syrup', 'Vanilla_syrup'] },
        { type: 'Mocha Delight', minQuality: 5, preferences: ['espresso', 'steamed_milk'], potentialSpecial: ['Chocolate_syrup', 'Marshmallows', 'Whipped_cream'] },
        { type: 'Simple Americano', minQuality: 3, preferences: ['espresso', 'hot_water'], potentialSpecial: ['Splash_of_milk'] }, // splash_of_milk as milk type
        { type: 'Hazelnut Brew', minQuality: 4, preferences: ['arabica'], potentialSpecial: ['Hazelnut_syrup', 'Whipped_cream'] },
        { type: 'Just a Regular Coffee', minQuality: 2, preferences: ['any'], potentialSpecial: ['Sugar', 'Milk'] },
        { type: 'Caramel Macchiato', minQuality: 6, preferences: ['espresso', 'steamed_milk'], potentialSpecial: ['Vanilla_syrup', 'Caramel_drizzle'] },
        { type: 'Peppermint Mocha', minQuality: 6, preferences: ['espresso', 'chocolate_syrup', 'steamed_milk'], potentialSpecial: ['Peppermint_syrup', 'Whipped_cream'] },
        { type: 'Pumpkin Spice Latte', minQuality: 5, preferences: ['espresso', 'steamed_milk'], potentialSpecial: ['Pumpkin_Spice_syrup', 'Whipped_cream', 'Cinnamon_stick', 'Marshmallows'] },
        { type: 'Vanilla Latte', minQuality: 5, preferences: ['espresso', 'steamed_milk'], potentialSpecial: ['Vanilla_syrup'] },
        { type: 'Caramel Frappuccino', minQuality: 6, preferences: ['cold_brew', 'milk', 'ice'], potentialSpecial: ['Caramel_syrup', 'Whipped_cream'] },
        { type: 'Hazelnut Coffee', minQuality: 4, preferences: ['coffee', 'milk'], potentialSpecial: ['Hazelnut_syrup'] },
        { type: 'Decaf Coffee', minQuality: 3, preferences: ['decaf'], potentialSpecial: ['Milk', 'Sugar'] },
        { type: 'Iced Vanilla Latte', minQuality: 6, preferences: ['espresso', 'steamed_milk', 'ice'], potentialSpecial: ['Vanilla_syrup'] },
        { type: 'Sweet Iced Coffee', minQuality: 4, preferences: ['cold_brew', 'ice'], potentialSpecial: ['Sugar_syrup', 'Milk'] }
    ];
    const possibleAllergies = ['milk', 'chocolate_powder', 'hazelnut_syrup', 'caramel_syrup', 'vanilla_syrup', 'peppermint_syrup', 'nuts', 'soy', 'gluten', 'caffeine'];

    function generateCustomer() {
        const name = customerNames[Math.floor(Math.random() * customerNames.length)];
        const requestData = coffeeRequests[Math.floor(Math.random() * coffeeRequests.length)];
        let allergies = requestData.allergies ? [...requestData.allergies] : []; // Start with request-specific allergies, ensure it's iterable
        // Randomly add another allergy sometimes
        if (Math.random() < 0.2) {
            const randomAllergy = possibleAllergies[Math.floor(Math.random() * possibleAllergies.length)];
            if (!allergies.includes(randomAllergy)) {
                allergies.push(randomAllergy);
            }
        }

        let specialRequest = null;
        if (requestData.potentialSpecial && requestData.potentialSpecial.length > 0 && Math.random() < 0.4) { // 40% chance of special request
            specialRequest = requestData.potentialSpecial[Math.floor(Math.random() * requestData.potentialSpecial.length)];
        }

        return {
            name: name,
            request: requestData.type + (specialRequest ? ` (Wants: ${specialRequest.replace(/_/g, ' ')})` : ''),
            minQuality: requestData.minQuality + Math.floor(Math.random() * 3), // Vary quality expectation
            allergies: allergies,
            specialRequest: specialRequest,
            tipPotential: Math.ceil((requestData.minQuality + (specialRequest ? 2 : 0)) * 0.5), // Base tip on quality and if special request
            originalRequestData: requestData // Store original request data here
        };
    }

    function displayCustomer(customer) {
        customerNameEl.textContent = customer.name;
        customerRequestEl.textContent = customer.request; // Already includes special request if any
        customerAllergiesEl.textContent = customer.allergies.length > 0 ? customer.allergies.map(allergy => allergy.charAt(0).toUpperCase() + allergy.slice(1).replace(/_/g, ' ')).join(', ') : 'None';
        customerFeedbackEl.textContent = `${customer.name} is waiting for their order.`;

        // Store detailed order for popup
        const customerInfoDiv = document.getElementById('customer-info');
        customerInfoDiv.dataset.orderDetails = JSON.stringify({
            baseRequest: customer.request.split(' (Wants:')[0],
            specialRequest: customer.specialRequest ? customer.specialRequest.replace(/_/g, ' ') : 'None',
            preferences: customer.originalRequestData.preferences.map(p => p.replace(/_/g, ' ')).join(', '),
            allergies: customer.allergies.map(allergy => allergy.charAt(0).toUpperCase() + allergy.slice(1).replace(/_/g, ' ')).join(', ') || 'None',
            minQuality: customer.minQuality
        });
    }

    // Add event listeners for the hover popup
    const customerInfoDiv = document.getElementById('customer-info');
    const orderDetailsPopup = document.getElementById('order-details-popup');

    customerInfoDiv.addEventListener('mouseover', () => {
        const details = JSON.parse(customerInfoDiv.dataset.orderDetails || '{}');
        if (details.baseRequest) {
            document.getElementById('popup-base-request').textContent = details.baseRequest;
            document.getElementById('popup-special-request').textContent = details.specialRequest;
            document.getElementById('popup-preferences').textContent = details.preferences;
            document.getElementById('popup-allergies').textContent = details.allergies;
            document.getElementById('popup-min-quality').textContent = details.minQuality;
            orderDetailsPopup.style.display = 'block';
        }
    });

    customerInfoDiv.addEventListener('mouseout', () => {
        orderDetailsPopup.style.display = 'none';
    });

    customerInfoDiv.addEventListener('mousemove', (event) => {
        // Position the popup near the mouse, but avoid going off-screen
        const popupWidth = orderDetailsPopup.offsetWidth;
        const popupHeight = orderDetailsPopup.offsetHeight;
        let x = event.pageX + 15;
        let y = event.pageY + 15;

        if (x + popupWidth > window.innerWidth) {
            x = event.pageX - popupWidth - 15;
        }
        if (y + popupHeight > window.innerHeight) {
            y = event.pageY - popupHeight - 15;
        }

        orderDetailsPopup.style.left = x + 'px';
        orderDetailsPopup.style.top = y + 'px';
    });

    function displayNextCustomer() {
        if (customerQueue.length === 0) {
            // Generate a new customer if queue is empty after a delay
            setTimeout(() => {
                if (!currentCustomer) { // Only add if no one is being served
                    customerQueue.push(generateCustomer());
                    displayNextCustomer();
                }
            }, 3000 + Math.random() * 5000); // New customer arrives after 3-8 seconds
            customerNameEl.textContent = 'Waiting for customer...';
            customerRequestEl.textContent = '-';
            customerAllergiesEl.textContent = '-';
            customerFeedbackEl.textContent = 'No customers right now.';
            return;
        }
        currentCustomer = customerQueue.shift();
        displayCustomer(currentCustomer);
    }

    // --- Time and Day Management ---
    function advanceTime() {
        currentGameHour += 2;
        if (currentGameHour >= 20) { // 8 PM
            endDay();
        } else {
            updateTimeDisplay();
        }
    }

    function endDay() {
        gameTimeEl.textContent = "CLOSED";
        addLog(`Day ${currentGameDay} ended.`);
        // Disable game interactions
        [beansSelect, milkSelect, sweetenerSelect, extrasSelect, grindBeansBtn, brewCoffeeBtn, addMilkBtn, addSweetenerBtn, addExtrasBtn, makeCoffeeBtn, sellCoffeeBtn, openShopBtn].forEach(el => el.disabled = true);
        
        // Calculate bills
        const wages = employees.length * EMPLOYEE_WAGE_PER_DAY;
        const energyBill = Math.ceil(dailyEnergyUsed * 0.5); // $0.5 per energy unit
        const taxes = Math.ceil(dailyGrossIncome * 0.1); // 10% tax on gross income
        const totalExpenses = dailyCoffeeCosts + wages + energyBill + taxes;
        const netProfit = dailyGrossIncome - totalExpenses;

        // playerMoney += netProfit; // This was already accounted for when selling coffee and paying for upgrades/hires. Money is deducted for costs here.
        // The actual deduction of expenses from playerMoney happens implicitly as costs are incurred (coffee ingredients, wages via shop, etc.)
        // The endDay function primarily summarizes these. If we want a direct deduction of *additional* bills like energy/taxes here, it needs to be explicit.

        // Explicitly deduct wages, energy, taxes if not already handled elsewhere or if they are day-end summaries
        // Assuming coffee costs are already deducted at makeCoffeeBtn
        // Assuming wages for new hires are deducted at hireBaristaBtn
        // Let's make sure energy and taxes are deducted here if they are day-end calculations.

        playerMoney -= (wages + energyBill + taxes); // Deduct daily operational costs not covered by per-transaction costs
        addLog(`Daily expenses (Wages: $${wages}, Energy: $${energyBill}, Taxes: $${taxes}) deducted. Net for day: $${netProfit}`);

        // Display summary
        summaryDayEl.textContent = currentGameDay;
        summaryCustomersEl.textContent = dailyCustomersServed;
        summaryIncomeEl.textContent = dailyGrossIncome;
        summaryCoffeeCostsEl.textContent = dailyCoffeeCosts;
        summaryWagesEl.textContent = wages;
        summaryEnergyEl.textContent = energyBill;
        summaryTaxesEl.textContent = taxes;
        summaryProfitEl.textContent = netProfit;
        dailySummarySection.style.display = 'block';
        
        updateMoneyDisplay(); // After profit/loss calculation
        if (playerMoney < 0) {
            addLog("Game Over! You've gone bankrupt.");
            stepFeedbackEl.textContent = "GAME OVER! You are bankrupt.";
            nextDayBtn.disabled = true;
            // Further game over logic can be added here
        }
    }

    nextDayBtn.addEventListener('click', () => {
        currentGameDay++;
        currentGameHour = 8; // Reset to 8 AM
        dailyCustomersServed = 0;
        dailyGrossIncome = 0;
        dailyCoffeeCosts = 0;
        dailyEnergyUsed = 0;
        
        dailySummarySection.style.display = 'none';
        [beansSelect, milkSelect, sweetenerSelect, extrasSelect, grindBeansBtn, brewCoffeeBtn, addMilkBtn, addSweetenerBtn, addExtrasBtn, makeCoffeeBtn, sellCoffeeBtn, openShopBtn].forEach(el => el.disabled = false);
        
        updateTimeDisplay();
        addLog(`Starting Day ${currentGameDay}.`);
        saveGame();
        resetCoffeeMakingSteps();
        calculateCoffee();
        customerQueue = []; // Clear previous day's queue
        customerQueue.push(generateCustomer());
        customerQueue.push(generateCustomer());
        displayNextCustomer();
    });

    // Initial setup
    loadGame();
    updateMoneyDisplay();
    updateTimeDisplay();
    calculateCoffee(); // Calculate initial coffee display
    resetCoffeeMakingSteps(); // Set initial state for buttons and feedback
    addLog('Welcome to Coffee Tycoon! Upgrades and Customers await!');
    // Initial customer
    customerQueue.push(generateCustomer());
    customerQueue.push(generateCustomer());
    displayNextCustomer();

    // Initial render of employees if modal is open by default or for debugging
});


let currentAudio = null;

function playSound(soundFileName) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    currentAudio = new Audio(`sounds/${soundFileName}`);
    currentAudio.play().catch(e => console.error("Error playing sound:", e));
}

function stopSound() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
}