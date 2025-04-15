// Parse CSV-like data from our medical report
const parseCSVData = (csvText) => {
    const rows = csvText.trim().split('\n');
    const headers = rows[0].split(',');
    
    return rows.slice(1).map(row => {
        const values = row.split(',');
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index];
        });
        return obj;
    });
};

// All data extracted from the markdown file
const medicalData = {
    patientInfo: {
        PATIENT_NAME: "LAWRENCE CHARLES HENSMAN",
        PATIENT_ID: "26376398",
        DATE_OF_BIRTH: "20/06/1950",
        GENDER: "MUŠKO",
        ADDRESS: "PELEGRIN PP 15 20 VELA LUKA",
        ORDER_ID: "MCS_140609019537E6F340D00001E26",
        DOCTOR: "DR ANTE MILAT",
        ORDER_NUMBER: "50304026",
        TEST_DATE: "04/03/2025",
        DIAGNOSIS: "F43"
    },
    labInfo: {
        LABORATORY_NAME: "Medicinsko biokemijski laboratorij",
        SPECIALIST: "Tatjana Barčot mag.med.biochem spec.med.biokem. i labor. medicine",
        ADDRESS: "20270 VELA LUKA ULICA 1/1",
        PHONE: "020/813-756 020/601-744",
        TEST_DATE: "04/03/2025",
        SAMPLE_COLLECTION_TIME: "8:22",
        REPORT_COMPLETION_TIME: "04/03/2025 12:44"
    },
    completeBloodCount: [
        {TEST_CODE: "K-Leukociti", TEST_NAME: "Leukocytes", RESULT: "6.8", UNIT: "x10^9/L", REFERENCE_RANGE: "3.4 - 9.7", FLAG: "NORMAL"},
        {TEST_CODE: "K-Eritrociti", TEST_NAME: "Erythrocytes", RESULT: "4.62", UNIT: "x10^12/L", REFERENCE_RANGE: "4.34 - 5.72", FLAG: "NORMAL"},
        {TEST_CODE: "K-Hemoglobin", TEST_NAME: "Hemoglobin", RESULT: "157", UNIT: "g/L", REFERENCE_RANGE: "138 - 175", FLAG: "NORMAL"},
        {TEST_CODE: "K-Hematokrit", TEST_NAME: "Hematocrit", RESULT: "0.443", UNIT: "L/L", REFERENCE_RANGE: "0.415 - 0.50", FLAG: "NORMAL"},
        {TEST_CODE: "K-MCV", TEST_NAME: "Mean Corpuscular Volume", RESULT: "95.9", UNIT: "fL", REFERENCE_RANGE: "83.0 - 97.2", FLAG: "NORMAL"},
        {TEST_CODE: "K-MCH", TEST_NAME: "Mean Corpuscular Hemoglobin", RESULT: "34.0", UNIT: "pg", REFERENCE_RANGE: "27.4 - 33.9", FLAG: "HIGH*"},
        {TEST_CODE: "K-MCHC", TEST_NAME: "Mean Corpuscular Hemoglobin Concentration", RESULT: "355", UNIT: "g/L", REFERENCE_RANGE: "320 - 345", FLAG: "HIGH*"},
        {TEST_CODE: "K-Trombociti", TEST_NAME: "Platelets", RESULT: "222", UNIT: "x10^9/L", REFERENCE_RANGE: "158 - 424", FLAG: "NORMAL"},
        {TEST_CODE: "K-RDW", TEST_NAME: "Red Cell Distribution Width", RESULT: "13.2", UNIT: "%", REFERENCE_RANGE: "9.0 - 15.0", FLAG: "NORMAL"},
        {TEST_CODE: "K-MPV", TEST_NAME: "Mean Platelet Volume", RESULT: "9.7", UNIT: "fL", REFERENCE_RANGE: "6.8 - 10.4", FLAG: "NORMAL"}
    ],
    differentialBloodCount: [
        {TEST_CODE: "K-Neutrof. granulociti", TEST_NAME: "Neutrophil Granulocytes", RESULT: "4.44", UNIT: "x10^9/L", REFERENCE_RANGE: "2.06 - 6.49", FLAG: "NORMAL"},
        {TEST_CODE: "K-Srednje stanice", TEST_NAME: "Medium Cells", RESULT: "0.33", UNIT: "x10^9/L", REFERENCE_RANGE: "0.12 - 1.27", FLAG: "NORMAL"},
        {TEST_CODE: "K-Limfociti", TEST_NAME: "Lymphocytes", RESULT: "1.83", UNIT: "x10^9/L", REFERENCE_RANGE: "1.19 - 3.35", FLAG: "NORMAL"},
        {TEST_CODE: "K-Neutrof granulociti rel.", TEST_NAME: "Neutrophil Granulocytes Relative", RESULT: "68", UNIT: "%", REFERENCE_RANGE: "44 - 72", FLAG: "NORMAL"},
        {TEST_CODE: "K-Limfociti rel.", TEST_NAME: "Lymphocytes Relative", RESULT: "27", UNIT: "%", REFERENCE_RANGE: "20 - 46", FLAG: "NORMAL"},
        {TEST_CODE: "K-Srednje stanice rel", TEST_NAME: "Medium Cells Relative", RESULT: "5", UNIT: "%", REFERENCE_RANGE: "2 - 19", FLAG: "NORMAL"}
    ],
    urineAnalysis: [
        {TEST_CODE: "U-Izgled", TEST_NAME: "Appearance", RESULT: "bistar", UNIT: "N/A", REFERENCE_RANGE: "bistar", FLAG: "NORMAL"},
        {TEST_CODE: "U-Boja", TEST_NAME: "Color", RESULT: "sv. žuta", UNIT: "N/A", REFERENCE_RANGE: "sv. žuta", FLAG: "NORMAL"},
        {TEST_CODE: "U-pH", TEST_NAME: "pH", RESULT: "7", UNIT: "pH jed.", REFERENCE_RANGE: "5 - 9", FLAG: "NORMAL"},
        {TEST_CODE: "U-Proteini", TEST_NAME: "Proteins", RESULT: "neg.", UNIT: "N/A", REFERENCE_RANGE: "neg.", FLAG: "NORMAL"},
        {TEST_CODE: "U-Glukoza", TEST_NAME: "Glucose", RESULT: "norm.", UNIT: "N/A", REFERENCE_RANGE: "norm.", FLAG: "NORMAL"},
        {TEST_CODE: "U-Ketoni", TEST_NAME: "Ketones", RESULT: "neg.", UNIT: "N/A", REFERENCE_RANGE: "neg.", FLAG: "NORMAL"},
        {TEST_CODE: "U-Bilirubin", TEST_NAME: "Bilirubin", RESULT: "neg.", UNIT: "N/A", REFERENCE_RANGE: "neg.", FLAG: "NORMAL"},
        {TEST_CODE: "U-Urobilinogen", TEST_NAME: "Urobilinogen", RESULT: "norm.", UNIT: "N/A", REFERENCE_RANGE: "norm.", FLAG: "NORMAL"},
        {TEST_CODE: "U-Nitriti", TEST_NAME: "Nitrites", RESULT: "neg.", UNIT: "N/A", REFERENCE_RANGE: "neg.", FLAG: "NORMAL"},
        {TEST_CODE: "U-Eritrociti/Hb", TEST_NAME: "Erythrocytes/Hemoglobin", RESULT: "neg.", UNIT: "N/A", REFERENCE_RANGE: "neg.", FLAG: "NORMAL"},
        {TEST_CODE: "U-Leuk.esteraza", TEST_NAME: "Leukocyte Esterase", RESULT: "neg.", UNIT: "N/A", REFERENCE_RANGE: "neg.", FLAG: "NORMAL"},
        {TEST_CODE: "Sediment urina", TEST_NAME: "Urine Sediment", RESULT: "B.O.", UNIT: "N/A", REFERENCE_RANGE: "N/A", FLAG: "N/A"}
    ],
    biochemicalTests: [
        {TEST_CODE: "S-Glukoza", TEST_NAME: "Glucose", RESULT: "5.8", UNIT: "mmol/L", REFERENCE_RANGE: "4.4 - 6.4", FLAG: "NORMAL"},
        {TEST_CODE: "S-Kreatinin", TEST_NAME: "Creatinine", RESULT: "101", UNIT: "umol/L", REFERENCE_RANGE: "64 - 104", FLAG: "NORMAL"},
        {TEST_CODE: "S-Urati", TEST_NAME: "Uric Acid", RESULT: "405", UNIT: "umol/L", REFERENCE_RANGE: "182 - 403", FLAG: "HIGH*"},
        {TEST_CODE: "S-Urea", TEST_NAME: "Urea", RESULT: "4.3", UNIT: "mmol/L", REFERENCE_RANGE: "2.8 - 8.3", FLAG: "NORMAL"},
        {TEST_CODE: "S-AST", TEST_NAME: "Aspartate Aminotransferase", RESULT: "25", UNIT: "U/L", REFERENCE_RANGE: "11 - 38", FLAG: "NORMAL"},
        {TEST_CODE: "S-ALT", TEST_NAME: "Alanine Aminotransferase", RESULT: "24", UNIT: "U/L", REFERENCE_RANGE: "12 - 48", FLAG: "NORMAL"},
        {TEST_CODE: "S-CRP", TEST_NAME: "C-Reactive Protein", RESULT: "1.3", UNIT: "mg/L", REFERENCE_RANGE: "0.0 - 5.0", FLAG: "NORMAL"},
        {TEST_CODE: "S-Kolesterol", TEST_NAME: "Cholesterol", RESULT: "3.9", UNIT: "mmol/L", REFERENCE_RANGE: "0 - 5.0", FLAG: "NORMAL"},
        {TEST_CODE: "S-Trigliceridi", TEST_NAME: "Triglycerides", RESULT: "1.1", UNIT: "mmol/L", REFERENCE_RANGE: "0 - 1.7", FLAG: "NORMAL"},
        {TEST_CODE: "PSA", TEST_NAME: "Prostate Specific Antigen", RESULT: "0.327", UNIT: "ng/ml", REFERENCE_RANGE: "0 - 4.00", FLAG: "NORMAL"},
        {TEST_CODE: "TSH", TEST_NAME: "Thyroid Stimulating Hormone", RESULT: "1.131", UNIT: "mIU/L", REFERENCE_RANGE: "0.380-5.000", FLAG: "NORMAL"}
    ]
};

// Map categories to data arrays
const categoryDataMap = {
    "Complete Blood Count": medicalData.completeBloodCount,
    "Differential Blood Count": medicalData.differentialBloodCount,
    "Complete Urine Analysis": medicalData.urineAnalysis,
    "Biochemical Tests": medicalData.biochemicalTests
};

// Create health insights based on the data
const healthInsights = {
    "K-MCH": {
        name: "Mean Corpuscular Hemoglobin",
        insight: "Slightly elevated MCH indicates higher hemoglobin content in each red blood cell. Usually not a concern when other related values are normal.",
        recommendation: "No specific action needed. Will be monitored in future tests."
    },
    "K-MCHC": {
        name: "Mean Corpuscular Hemoglobin Concentration",
        insight: "Slightly elevated MCHC indicates increased concentration of hemoglobin in the red blood cells. Generally not of clinical concern when isolated.",
        recommendation: "No specific action needed. Will be monitored in future tests."
    },
    "S-Urati": {
        name: "Uric Acid",
        insight: "Elevated uric acid levels may indicate increased cell turnover or decreased excretion. Can be related to diet, genetics, or kidney function.",
        recommendation: "Consider reducing intake of purine-rich foods (red meat, seafood), increase water intake, and limit alcohol consumption."
    }
};

// Key metrics to display in gauges
const keyMetrics = [
    { 
        id: "glucose", 
        name: "Glucose", 
        value: 5.8, 
        min: 4.4, 
        max: 6.4, 
        unit: "mmol/L", 
        category: "Biochemical Tests" 
    },
    { 
        id: "cholesterol", 
        name: "Cholesterol", 
        value: 3.9, 
        min: 0, 
        max: 5.0, 
        unit: "mmol/L", 
        category: "Biochemical Tests" 
    },
    { 
        id: "uric-acid", 
        name: "Uric Acid", 
        value: 405, 
        min: 182, 
        max: 403, 
        unit: "umol/L", 
        category: "Biochemical Tests",
        alert: true
    },
    { 
        id: "hemoglobin", 
        name: "Hemoglobin", 
        value: 157, 
        min: 138, 
        max: 175, 
        unit: "g/L", 
        category: "Complete Blood Count" 
    }
];

// Helper function to determine if a value is outside reference range
const determineStatus = (result, referenceRange) => {
    // Handle ranges like "0.380-5.000"
    const range = referenceRange.split('-').map(r => r.trim());
    
    if (range.length !== 2 || isNaN(Number(range[0])) || isNaN(Number(range[1]))) {
        return "NORMAL"; // If we can't parse the range, assume normal
    }
    
    const minValue = Number(range[0]);
    const maxValue = Number(range[1]);
    const resultValue = Number(result);
    
    if (isNaN(resultValue)) {
        return "NORMAL"; // If we can't parse the result, assume normal
    }
    
    if (resultValue < minValue) return "LOW";
    if (resultValue > maxValue) return "HIGH";
    return "NORMAL";
};

// Function to initialize the dashboard
const initDashboard = () => {
    // Populate patient info
    document.getElementById('patient-name').textContent = medicalData.patientInfo.PATIENT_NAME;
    document.getElementById('patient-id').textContent = medicalData.patientInfo.PATIENT_ID;
    document.getElementById('patient-dob').textContent = medicalData.patientInfo.DATE_OF_BIRTH;
    document.getElementById('test-date').textContent = medicalData.patientInfo.TEST_DATE;
    document.getElementById('report-date').textContent = `Report Date: ${medicalData.labInfo.REPORT_COMPLETION_TIME}`;
    
    // Populate lab info
    document.getElementById('lab-name').textContent = medicalData.labInfo.LABORATORY_NAME;
    document.getElementById('lab-specialist').textContent = medicalData.labInfo.SPECIALIST;
    
    // Load default category (Complete Blood Count)
    loadCategory("Complete Blood Count");
    
    // Add event listeners to the navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.getAttribute('data-category');
            
            // Update active link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
            
            // Load the selected category
            loadCategory(category);
        });
    });
    
    // Generate alerts
    generateAlerts();
    
    // Create gauges for key metrics
    createGauges();
};

// Function to load a specific test category
const loadCategory = (category) => {
    document.getElementById('current-category').textContent = category;
    const tableBody = document.getElementById('results-body');
    tableBody.innerHTML = ''; // Clear existing rows
    
    const categoryData = categoryDataMap[category] || [];
    
    categoryData.forEach(test => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${test.TEST_NAME}</td>
            <td>${test.RESULT}</td>
            <td>${test.UNIT}</td>
            <td>${test.REFERENCE_RANGE}</td>
            <td>
                <span class="status-badge status-${test.FLAG.toLowerCase()}">
                    ${test.FLAG}
                </span>
            </td>
        `;
        
        // Add click event to show details
        row.addEventListener('click', () => showTestDetails(test));
        
        tableBody.appendChild(row);
    });
};

// Function to show test details in the side panel
const showTestDetails = (test) => {
    const detailContent = document.getElementById('test-detail-content');
    
    // Parse the reference range
    let minValue, maxValue;
    if (test.REFERENCE_RANGE.includes('-')) {
        [minValue, maxValue] = test.REFERENCE_RANGE.split('-').map(r => parseFloat(r.trim()));
    }
    
    const resultValue = parseFloat(test.RESULT);
    const insight = healthInsights[test.TEST_CODE] || null;
    
    let detailHTML = `
        <h4>${test.TEST_NAME}</h4>
        <p class="detail-result">Result: <strong>${test.RESULT} ${test.UNIT}</strong></p>
        <p>Reference Range: ${test.REFERENCE_RANGE} ${test.UNIT}</p>
        <p>Status: <span class="status-badge status-${test.FLAG.toLowerCase()}">${test.FLAG}</span></p>
    `;
    
    if (insight) {
        detailHTML += `
            <div class="insight-box">
                <h5>Health Insight</h5>
                <p>${insight.insight}</p>
                <p><strong>Recommendation:</strong> ${insight.recommendation}</p>
            </div>
        `;
    }
    
    detailContent.innerHTML = detailHTML;
    
    // Create or update the chart if we have numeric values
    if (!isNaN(resultValue) && !isNaN(minValue) && !isNaN(maxValue)) {
        createResultChart(test.TEST_NAME, resultValue, minValue, maxValue);
    } else {
        document.getElementById('chart-container').style.display = 'none';
    }
};

// Function to create a chart for a test result
const createResultChart = (testName, resultValue, minValue, maxValue) => {
    document.getElementById('chart-container').style.display = 'block';
    
    const ctx = document.getElementById('result-chart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.resultChart) {
        window.resultChart.destroy();
    }
    
    // Calculate the range and padding
    const range = maxValue - minValue;
    const padding = range * 0.2; // 20% padding on each side
    
    // Create new chart
    window.resultChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Result'],
            datasets: [{
                label: testName,
                data: [resultValue],
                backgroundColor: resultValue < minValue ? 'rgba(243, 156, 18, 0.6)' : 
                                resultValue > maxValue ? 'rgba(231, 76, 60, 0.6)' : 
                                'rgba(39, 174, 96, 0.6)',
                borderColor: resultValue < minValue ? 'rgb(243, 156, 18)' : 
                            resultValue > maxValue ? 'rgb(231, 76, 60)' : 
                            'rgb(39, 174, 96)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    min: Math.max(0, minValue - padding),
                    max: maxValue + padding,
                    grid: {
                        color: 'rgba(200, 200, 200, 0.3)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                annotation: {
                    annotations: {
                        minLine: {
                            type: 'line',
                            yMin: minValue,
                            yMax: minValue,
                            borderColor: 'rgba(100, 100, 100, 0.5)',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            label: {
                                enabled: true,
                                content: `Min: ${minValue}`,
                                position: 'start'
                            }
                        },
                        maxLine: {
                            type: 'line',
                            yMin: maxValue,
                            yMax: maxValue,
                            borderColor: 'rgba(100, 100, 100, 0.5)',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            label: {
                                enabled: true,
                                content: `Max: ${maxValue}`,
                                position: 'start'
                            }
                        }
                    }
                }
            }
        }
    });
};

// Function to generate alerts for abnormal results
const generateAlerts = () => {
    const alertsList = document.getElementById('alerts-list');
    alertsList.innerHTML = ''; // Clear existing alerts
    
    let abnormalResults = [];
    
    // Check all categories for abnormal results
    for (const [category, tests] of Object.entries(categoryDataMap)) {
        tests.forEach(test => {
            if (test.FLAG.includes('HIGH') || test.FLAG.includes('LOW')) {
                abnormalResults.push({
                    category,
                    test
                });
            }
        });
    }
    
    if (abnormalResults.length === 0) {
        alertsList.innerHTML = '<li>All results are within normal ranges.</li>';
        return;
    }
    
    // Add each abnormal result to the alerts list
    abnormalResults.forEach(({category, test}) => {
        const alertItem = document.createElement('li');
        alertItem.innerHTML = `
            <span>
                ${test.TEST_NAME}: 
                <strong>${test.RESULT} ${test.UNIT}</strong>
                <small>(${test.FLAG})</small>
            </span>
            <span class="alert-category">${category}</span>
        `;
        
        // Add click event to navigate to the category and highlight the test
        alertItem.addEventListener('click', () => {
            // Activate the correct category tab
            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.getAttribute('data-category') === category) {
                    link.click();
                }
            });
            
            // Scroll to the test in the table and highlight it
            setTimeout(() => {
                const tableRows = document.querySelectorAll('#results-body tr');
                tableRows.forEach(row => {
                    if (row.cells[0].textContent === test.TEST_NAME) {
                        row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        row.classList.add('highlight-row');
                        setTimeout(() => row.classList.remove('highlight-row'), 2000);
                    }
                });
            }, 300);
        });
        
        alertsList.appendChild(alertItem);
    });
};

// Function to create gauges for key metrics
const createGauges = () => {
    const gaugeContainer = document.querySelector('.gauge-container');
    gaugeContainer.innerHTML = ''; // Clear existing gauges
    
    keyMetrics.forEach(metric => {
        // Calculate percentage within range
        let percentage;
        if (metric.value < metric.min) {
            percentage = 0;
        } else if (metric.value > metric.max) {
            percentage = 100;
        } else {
            percentage = ((metric.value - metric.min) / (metric.max - metric.min)) * 100;
        }
        
        // Determine color based on status
        const color = metric.value < metric.min ? '#f39c12' : 
                     metric.value > metric.max ? '#e74c3c' : 
                     '#27ae60';
        
        // Create gauge element
        const gaugeElement = document.createElement('div');
        gaugeElement.className = 'gauge';
        gaugeElement.innerHTML = `
            <canvas id="gauge-${metric.id}" width="80" height="80"></canvas>
            <div class="gauge-label">${metric.name}</div>
            <div class="gauge-value">${metric.value} ${metric.unit}</div>
        `;
        
        gaugeContainer.appendChild(gaugeElement);
        
        // Create the actual gauge using Chart.js
        const ctx = document.getElementById(`gauge-${metric.id}`).getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [percentage, 100 - percentage],
                    backgroundColor: [color, '#ecf0f1'],
                    borderWidth: 0
                }]
            },
            options: {
                cutout: '70%',
                circumference: 180,
                rotation: 270,
                maintainAspectRatio: true,
                plugins: {
                    tooltip: { enabled: false },
                    legend: { display: false }
                }
            }
        });
    });
};

// Health insights for the patient based on the results
const generateHealthInsights = () => {
    const insightList = document.getElementById('insight-list');
    insightList.innerHTML = '';
    
    // Add general insights
    const insights = [
        "Overall health indicators are generally good with only minor abnormalities.",
        "Kidney and liver function tests are within normal ranges.",
        "Thyroid function (TSH) is normal, indicating proper thyroid hormone production.",
        "Cholesterol and triglycerides are within healthy ranges.",
        "Slightly elevated hemoglobin concentration metrics (MCH, MCHC) are usually not of clinical concern when other red blood cell parameters are normal.",
        "Elevated uric acid may benefit from dietary modifications including reduced purine intake and increased water consumption."
    ];
    
    insights.forEach(insight => {
        const li = document.createElement('li');
        li.textContent = insight;
        insightList.appendChild(li);
    });
};

// Initialize the dashboard when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    generateHealthInsights();
});
