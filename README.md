# Playwright Test Automation Project

This repository consists all the test cases automated using **Microsoft Playwright**.
This project contains automated functional and UI test cases for the web-based
Singlish to Sinhala transliteration system available at:

 https://www.swifttranslator.com/

The automation suite covers 35 Test Scenarios as required by the assignment guidelines:
- *24 Positive Scenarios:* Verifying correct translation of simple/complex sentences, grammar, and mixed-language inputs.
- *10 Negative Scenarios:* Testing system robustness against typos, formatting issues, and technical terms.
- *1 UI Scenario:* Verifying clear button clears the text ares..

---

## Content

- Playwright test scripts  
- Test configuration file  
- Package dependency files  
- Test reports (generated after execution)

---

## Prerequisites

Before running this project, make sure you have installed:

- **Node.js** (version 16 or higher recommended)
- **npm** (comes with Node.js)

You can check by running:

```bash
node -v
npm -v

## Installation steps

##Clone the repository:
git clone https://github.com/IT23145016/Qa-Testing.git
##Navigate to repo
cd Qa-Testing


npm install
npx playwright install

##Test Structure(All test scripts are located inside the:)
/tests

##Running steps
npx playwright test --workers=1 --headed
Note: Playwright counts **each `test()` function individually**, so running the full suite may show more tests than the scenario count but playwright report display correct test cases.


##Or can Run Specific Test Files
npx playwright test tests/It23145016_positive.spec.js --headed --project=chromium --timeout=90000
npx playwright test tests/It23145016_negative.spec.js --headed --project=chromium --timeout=90000
npx playwright test tests/It23145016_Ui.spec.js --headed --project=chromium --timeout=90000

--headed → runs the browser in visible mode

--project=chromium → selects Chromium browser

--timeout=90000 → increases maximum wait time for slow tests

You can replace any file path with other scripts in the /tests folder as needed

##View Test Report
npx playwright show-report

##Alternative Test Execution (VS Code Extension)
Tests can also be executed using the Playwright VS Code extension:
Install the Playwright extension in VS Code.
Open the /tests folder.
click on any test file and select Run Playwright Test.
Results will appear in the extension output panel, and you can also open the HTML report.(make sure to run through chromium worker. only one worker must be enabled)