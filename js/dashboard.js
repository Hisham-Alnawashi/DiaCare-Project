const dashboardState = {
    chartPeriod: '7',
    glucoseReadings7: [104, 112, 98, 125, 140, 118, 107],
    glucoseReadings14: [104, 112, 98, 125, 140, 118, 107, 130, 145, 128, 110, 132, 121, 109],
    chartLabels14: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    currentGlucose: 104,
    insulin: {
        total: 24.5,
        basal: 15.7,
        bolus: 8.8,
    },
    carbsTotal: 162,
    carbsTarget: 200,
    weight: 78.4,
    activityMinutes: 0,
    lastReadingTime: new Date(Date.now() - 14 * 60 * 1000),
};

function formatGlucoseStatus(value) {
    if (value > 180) {
        return { label: 'High', classes: 'bg-error text-white' };
    }
    if (value < 70) {
        return { label: 'Low', classes: 'bg-amber-300 text-on-surface' };
    }
    return { label: 'Optimal', classes: 'bg-secondary-container text-on-secondary-fixed-variant' };
}

function setHtmlDarkMode(enabled) {
    document.documentElement.classList.toggle('dark', enabled);
    const icon = document.querySelector('button span[data-icon="dark_mode"], button span[data-icon="light_mode"]');
    if (icon) {
        icon.textContent = enabled ? 'light_mode' : 'dark_mode';
        icon.dataset.icon = enabled ? 'light_mode' : 'dark_mode';
    }
    window.localStorage.setItem('diacare-dark-mode', enabled ? 'true' : 'false');
}

function initDarkMode() {
    const storedMode = window.localStorage.getItem('diacare-dark-mode');
    const darkEnabled = storedMode === 'true';
    setHtmlDarkMode(darkEnabled);

    const button = document.querySelector('button span[data-icon="dark_mode"], button span[data-icon="light_mode"]');
    const parent = button ? button.closest('button') : null;
    if (!parent) return;

    parent.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        setHtmlDarkMode(isDark);
    });
}

function updateMetricCards() {
    const glucoseValueEl = document.getElementById('glucose-value');
    const glucoseStatusEl = document.getElementById('glucose-status');
    const insulinCard = document.getElementById('insulin-card');
    const insulinDetails = document.getElementById('insulin-details');

    if (glucoseValueEl) glucoseValueEl.textContent = dashboardState.currentGlucose;

    if (glucoseStatusEl) {
        const status = formatGlucoseStatus(dashboardState.currentGlucose);
        glucoseStatusEl.textContent = status.label;
        glucoseStatusEl.className = `px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${status.classes}`;
    }

    const insulinTotalEl = insulinCard?.querySelector('p.text-3xl');
    if (insulinTotalEl) {
        insulinTotalEl.innerHTML = `${dashboardState.insulin.total.toFixed(1)} <span class="text-sm font-normal text-on-surface-variant">units</span>`;
    }

    const carbsTotalEl = document.getElementById('carbs-total-value');
    if (carbsTotalEl) {
        carbsTotalEl.innerHTML = `${dashboardState.carbsTotal} <span class="text-sm font-normal text-on-surface-variant">grams</span>`;
    }

    const carbsDetails = document.getElementById('carbs-details');
    if (carbsDetails) {
        const remaining = Math.max(0, dashboardState.carbsTarget - dashboardState.carbsTotal);
        carbsDetails.innerHTML = `
            <p><strong>Remaining:</strong> ${remaining} grams</p>
            <p><strong>Target:</strong> ${dashboardState.carbsTarget} grams</p>
        `;
    }

    const weightText = document.getElementById('weight-text');
    if (weightText) {
        weightText.textContent = `Weight: ${dashboardState.weight.toFixed(1)} kg`;
    }

    if (insulinDetails) {
        insulinDetails.innerHTML = `
            <p><strong>Morning:</strong> ${dashboardState.insulin.basal.toFixed(1)} units</p>
            <p><strong>Evening:</strong> ${dashboardState.insulin.bolus.toFixed(1)} units</p>
        `;
    }
}

function updateGlucoseChart(period) {
    dashboardState.chartPeriod = period;

    const bars = Array.from(document.querySelectorAll('#glucose-bars > div'));
    const labels = Array.from(document.querySelectorAll('#chart-days span'));
    const data = period === '14' ? dashboardState.glucoseReadings14 : dashboardState.glucoseReadings7;

    bars.forEach((bar, index) => {
        const value = data[index];
        if (value !== undefined) {
            bar.style.display = 'block';
            const height = Math.max(20, Math.min(100, Math.round((value - 60) * 0.7 + 15)));
            bar.style.height = `${height}%`;
            bar.classList.toggle('opacity-40', value < 90);
            bar.classList.toggle('opacity-50', value >= 90 && value < 130);
            bar.classList.toggle('opacity-100', value >= 130);
        } else {
            bar.style.display = 'none';
        }
    });

    labels.forEach((label, index) => {
        label.textContent = data[index] ? dashboardState.chartLabels14[index] : '';
    });

    document.querySelectorAll('.chart-period-button').forEach((button) => {
        button.classList.toggle('bg-surface-container-highest', button.dataset.period === period);
        button.classList.toggle('text-on-surface', button.dataset.period === period);
        button.classList.toggle('text-on-surface-variant', button.dataset.period !== period);
    });
}

function initChartToggle() {
    document.querySelectorAll('.chart-period-button').forEach((button) => {
        button.addEventListener('click', () => {
            updateGlucoseChart(button.dataset.period);
        });
    });
    updateGlucoseChart(dashboardState.chartPeriod);
}

function openQuickEntryModal() {
    if (document.getElementById('quick-entry-modal')) return;

    const overlay = document.createElement('div');
    overlay.id = 'quick-entry-modal';
    overlay.className = 'fixed inset-0 z-[70] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4';
    overlay.innerHTML = `
        <div class="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6">
            <div class="flex justify-between items-center mb-4">
                <div>
                    <h2 class="text-xl font-bold">Quick Glucose Entry</h2>
                    <p class="text-sm text-slate-500">Enter your current glucose now.</p>
                </div>
                <button id="quick-entry-close" class="text-slate-500 hover:text-slate-900">Close</button>
            </div>
            <div class="space-y-4">
                <label class="block text-sm font-semibold">Current Glucose (mg/dL)</label>
                <input id="quick-entry-input" type="number" class="w-full border border-slate-200 rounded-2xl p-4 text-lg" placeholder="104" />
            </div>
            <div class="mt-6 flex gap-3">
                <button id="quick-entry-save" class="flex-1 bg-primary text-white rounded-2xl py-3 font-semibold hover:opacity-90">Save Reading</button>
                <button id="quick-entry-cancel" class="flex-1 bg-slate-100 text-slate-700 rounded-2xl py-3 font-semibold hover:bg-slate-200">Cancel</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    document.getElementById('quick-entry-close').addEventListener('click', closeQuickEntryModal);
    document.getElementById('quick-entry-cancel').addEventListener('click', closeQuickEntryModal);
    document.getElementById('quick-entry-save').addEventListener('click', saveQuickEntryReading);
}

function openEntryModal({ title, description, fieldLabel, placeholder, inputType, saveText, initialValue, onSave }) {
    if (document.querySelector('[data-entry-modal]')) return;

    const overlay = document.createElement('div');
    overlay.dataset.entryModal = 'true';
    overlay.className = 'fixed inset-0 z-[70] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4';
    overlay.innerHTML = `
        <div class="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6">
            <div class="flex justify-between items-center mb-4">
                <div>
                    <h2 class="text-xl font-bold">${title}</h2>
                    <p class="text-sm text-slate-500">${description}</p>
                </div>
                <button id="entry-close" class="text-slate-500 hover:text-slate-900">Close</button>
            </div>
            <div class="space-y-4">
                <label class="block text-sm font-semibold">${fieldLabel}</label>
                <input id="entry-input" type="${inputType}" value="${initialValue || ''}" class="w-full border border-slate-200 rounded-2xl p-4 text-lg" placeholder="${placeholder}" />
            </div>
            <div class="mt-6 flex gap-3">
                <button id="entry-save" class="flex-1 bg-primary text-white rounded-2xl py-3 font-semibold hover:opacity-90">${saveText}</button>
                <button id="entry-cancel" class="flex-1 bg-slate-100 text-slate-700 rounded-2xl py-3 font-semibold hover:bg-slate-200">Cancel</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    overlay.querySelector('#entry-close')?.addEventListener('click', closeEntryModal);
    overlay.querySelector('#entry-cancel')?.addEventListener('click', closeEntryModal);
    overlay.querySelector('#entry-save')?.addEventListener('click', () => {
        const input = overlay.querySelector('#entry-input');
        if (!input) return;
        const value = Number(input.value);
        if (!value || value <= 0) {
            alert(`${fieldLabel} is required and must be greater than zero.`);
            return;
        }
        onSave(value);
        closeEntryModal();
    });
}

function closeEntryModal(event) {
    if (event) event.preventDefault();
    document.querySelector('[data-entry-modal]')?.remove();
}

function openMealLogModal() {
    openEntryModal({
        title: 'Meal Log',
        description: 'Log your meal carbs with the same modal style as glucose.',
        fieldLabel: 'Meal Carbs (grams)',
        placeholder: '60',
        inputType: 'number',
        saveText: 'Save Meal',
        initialValue: '',
        onSave: (value) => {
            dashboardState.carbsTotal += value;
            updateMetricCards();
            alert(`Meal recorded: ${value}g carbs.`);
        },
    });
}

function openActivityModal() {
    openEntryModal({
        title: 'Activity Log',
        description: 'Log your activity duration in minutes.',
        fieldLabel: 'Activity Minutes',
        placeholder: '30',
        inputType: 'number',
        saveText: 'Save Activity',
        initialValue: dashboardState.activityMinutes || '',
        onSave: (value) => {
            dashboardState.activityMinutes = value;
            alert(`Activity logged: ${value} minutes.`);
        },
    });
}

function openWeightModal() {
    openEntryModal({
        title: 'Weight Log',
        description: 'Record your current weight in kilograms.',
        fieldLabel: 'Weight (kg)',
        placeholder: '78.4',
        inputType: 'number',
        saveText: 'Save Weight',
        initialValue: dashboardState.weight || '',
        onSave: (value) => {
            dashboardState.weight = value;
            const weightText = document.getElementById('weight-text');
            if (weightText) {
                weightText.textContent = `Weight: ${value.toFixed(1)} kg`;
            }
            alert(`Weight recorded: ${value} kg.`);
        },
    });
}

function closeQuickEntryModal() {
    const overlay = document.getElementById('quick-entry-modal');
    if (overlay) overlay.remove();
}

function saveQuickEntryReading() {
    const input = document.getElementById('quick-entry-input');
    if (!input) return;
    const value = Number(input.value);
    if (!value || value <= 0) {
        alert('Please enter a valid glucose reading.');
        return;
    }

    dashboardState.currentGlucose = value;
    dashboardState.lastReadingTime = new Date();
    dashboardState.glucoseReadings7.push(value);
    dashboardState.glucoseReadings14.push(value);

    if (dashboardState.glucoseReadings7.length > 7) {
        dashboardState.glucoseReadings7.shift();
    }
    if (dashboardState.glucoseReadings14.length > 14) {
        dashboardState.glucoseReadings14.shift();
    }

    updateMetricCards();
    updateGlucoseChart(dashboardState.chartPeriod);
    updateReminders();
    closeQuickEntryModal();
    alert('Glucose reading saved successfully.');
}

function initQuickEntry() {
    const quickEntryButton = document.querySelector('[data-action="quick-entry"]');
    if (!quickEntryButton) return;
    quickEntryButton.addEventListener('click', openQuickEntryModal);
}

function toggleInsulinDetails() {
    const details = document.getElementById('insulin-details');
    if (!details) return;
    details.classList.toggle('hidden');
}

function initInsulinCard() {
    const insulinCard = document.getElementById('insulin-card');
    if (!insulinCard) return;
    insulinCard.addEventListener('click', toggleInsulinDetails);
}

function toggleCarbsDetails() {
    const details = document.getElementById('carbs-details');
    if (!details) return;
    details.classList.toggle('hidden');
}

function initCarbsCard() {
    const carbsCard = document.getElementById('carbs-card');
    if (!carbsCard) return;
    carbsCard.addEventListener('click', toggleCarbsDetails);
}

function updateReminders() {
    const reminderCard = document.getElementById('active-reminder-card');
    const summary = document.getElementById('reminder-summary');
    if (!reminderCard || !summary) return;

    const now = new Date();
    const deltaHours = (now - dashboardState.lastReadingTime) / 1000 / 60 / 60;

    if (deltaHours > 4) {
        reminderCard.className = 'bg-error/10 rounded-3xl p-6 border border-error/20';
        summary.textContent = 'Overdue for post-lunch check. Please log your glucose immediately.';
    } else if (deltaHours > 2) {
        reminderCard.className = 'bg-tertiary/10 rounded-3xl p-6 border border-tertiary/20';
        summary.textContent = `It has been ${Math.floor(deltaHours)} hours since your last reading.`;
    } else {
        reminderCard.className = 'bg-primary/5 rounded-3xl p-6 border border-primary/10';
        summary.textContent = 'You are on track. Keep logging readings regularly.';
    }
}

function markDone(button) {
    const isDone = button.classList.toggle('done');
    button.style.opacity = isDone ? '0.3' : '1';
    button.querySelectorAll('p').forEach((text) => {
        text.style.textDecoration = isDone ? 'line-through' : 'none';
    });
}

function initReminders() {
    document.querySelectorAll('.reminder-action-button').forEach((button) => {
        button.addEventListener('click', () => markDone(button));
    });
    updateReminders();
}

function getShortcuts() {
    return {
        'Glucose Log': openQuickEntryModal,
        'Meal Log': openMealLogModal,
        'Activity': openActivityModal,
        'Weight': openWeightModal,
    };
}

function initShortcutButtons() {
    const shortcuts = getShortcuts();
    document.querySelectorAll('.shortcut-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const label = button.querySelector('span + span')?.textContent?.trim();
            const action = shortcuts[label] || shortcuts[button.textContent?.trim()];
            if (action) action();
        });
    });
}

function calculateBolusDose() {
    const carbsInput = document.getElementById('bolus-carbs-input');
    const currentInput = document.getElementById('bolus-current-input');
    const output = document.getElementById('bolus-dose-output');
    if (!output) return;

    const carbs = Number(carbsInput?.value) || 0;
    const currentGlucose = Number(currentInput?.value) || dashboardState.currentGlucose || 100;
    const dose = Math.max(0.5, (currentGlucose - 100) / 50 + carbs / 10);
    output.textContent = dose.toFixed(1);
}

function initBolusModal() {
    const closeBtn = document.getElementById('bolus-close-btn');
    const cancelBtn = document.getElementById('bolus-cancel-btn');
    const applyBtn = document.getElementById('bolus-apply-btn');
    const carbsInput = document.getElementById('bolus-carbs-input');
    const currentInput = document.getElementById('bolus-current-input');

    [closeBtn, cancelBtn].forEach((button) => {
        if (!button) return;
        button.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.hash = '';
        });
    });

    if (applyBtn) {
        applyBtn.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.hash = '';
            alert('Dose applied to log successfully.');
        });
    }

    [carbsInput, currentInput].forEach((input) => {
        if (!input) return;
        input.addEventListener('input', calculateBolusDose);
    });

    calculateBolusDose();
}

function initFooterLinks() {
    document.querySelectorAll('footer a').forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            alert('This feature will be available in the next update v2.4.0');
        });
    });
}

function initDashboard() {
    initDarkMode();
    updateMetricCards();
    initChartToggle();
    initQuickEntry();
    initShortcutButtons();
    initInsulinCard();
    initCarbsCard();
    initReminders();
    initBolusModal();
    initFooterLinks();
}

window.addEventListener('DOMContentLoaded', initDashboard);
window.markDone = markDone;
