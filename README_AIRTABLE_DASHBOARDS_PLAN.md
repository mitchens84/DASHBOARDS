# Plan: Visualizing Airtable Data on GitHub Pages Dashboards (MVP)

**Version:** 1.0
**Date:** 18 April 2025

## 1. Goal

Implement a Minimum Viable Product (MVP) to securely fetch data from specified Airtable bases/tables/views, validate its schema, generate static JSON data files, and display this data on the existing interactive dashboards hosted via GitHub Pages (`6I-CYBORG-AGENTS/DASHBOARDS`). The system will include automated updates via GitHub Actions and basic alerting for data retrieval or schema validation failures.

## 2. Architecture Overview

We will use the **Scheduled Static Data Generation with Validation** architecture:

1. **Airtable:** Primary data source; use specific views to pre-filter data.
2. **Python Script (`airtable_extraction.py`):** Enhanced to read configuration from a dedicated Airtable table, fetch data from specified Airtable sources, validate schema, and output JSON files to the dashboard's data directory.
3. **GitHub Actions:**
   - Retrieves Airtable API Key from Bitwarden.
   - Runs the Python script on a schedule.
   - Validates script success/failure.
   - Commits generated JSON data to the repository on success.
   - Sends failure notifications.
4. **Dashboard App (React/JS):** Fetches data from local static JSON files and renders visualizations.
5. **GitHub Pages:** Hosts the static dashboard application, including generated JSON data files.

```mermaid
graph LR
    A[Schedule (GitHub Actions)] --> B{Run Enhanced Python Script};
    C[Airtable (Views)] --> B;
    C[Airtable (Views)] --> B;
    B -- Fetches & Validates --> F{Schema OK?};
    F -- Yes --> G[Generate JSON Files (e.g., dashboards/public/data/*.json)];
    G --> H[Commit Data Files to Repo];
    F -- No --> J[Log Error & Fail Script];
    J --> K[Send Alert via GitHub Actions Notification];

    subgraph GitHub Repo & CI/CD
        H -- Triggers --> I[Deploy Dashboard (GitHub Pages Workflow)];
    end

    subgraph Dashboard App (Browser)
        L[User Browser] -- Loads --> M[Dashboard HTML/CSS/JS];
        M -- Fetches --> N[Local Static JSON (/data/*.json)];
        N --> O[Render Charts/Tables];
    end

    I --> L;

    style K fill:#f9f,stroke:#333,stroke-width:2px;
    style J fill:#f9f,stroke:#333,stroke-width:2px;
```

## 3. Prerequisites

- Airtable account, configured bases/tables/views.
- Airtable API Key.
- Python 3.x environment locally and in Actions.
- Existing script at `AGENTS/INPUT_01/INGESTION/AIRTABLE/airtable_extraction.py`.
- `requirements.txt` listing dependencies (`pyairtable`, `python-dotenv`, etc.).
- Dashboard app in `DASHBOARDS/`, e.g. `src/App.tsx`.
- GitHub repository with Actions enabled.
- Bitwarden secrets integration in Actions.
- GitHub Pages configured for `DASHBOARDS`.

## 4. Step-by-Step Implementation (MVP)

**Step 1: Configure Airtable Views**

- Create specific views exposing only needed fields.
- Note Base ID, Table Name, View Name.

**Step 2: Define Configuration & Schema (Airtable Table)**

- Use the `AIRTABLE` table (ID: `tblrbfE4HKcoT6Tj`) in the `00-CONFIG` base (ID: `appaWqv85wwLPD2Gy`) to define data sources. Ensure records include:
  - `BASE ID`
  - `TABLE ID`
  - `VIEW NAME` (Optional)
  - `Output Filename`
  - `Required Fields` (Multiline text, one field name per line)

**Step 3: Enhance Python Script**

- Modify `AGENTS/INPUT_01/INGESTION/AIRTABLE/airtable_extraction.py` to:
  - Fetch configuration from the specified Airtable table.
  - Loop through each configuration record.
  - Fetch data from the corresponding Airtable source using `pyairtable`.
  - Validate the schema against the `Required Fields` from the config record.
  - Write the fetched data to the specified `Output Filename` in the `../../../DASHBOARDS/public/data` directory.
  - Exit with a non-zero status code on missing required fields or errors during fetching/processing.

**Step 4: GitHub Actions Secrets**

- Store `AIRTABLE_API_KEY` via Bitwarden/GitHub Secrets.

**Step 5: Create GitHub Actions Workflow**

- `.github/workflows/update_airtable_data.yml`: checkout, setup Python, install deps, fetch Bitwarden secrets, run script, commit changes, notify on failure.

**Step 6: Update Dashboard Code**

- In React components (e.g., `content/4H-ENVIRONMENT/env-dashboard.tsx`), fetch `/data/habits.json` via `fetch`, handle loading/error, render charts.

**Step 7: Configure GitHub Pages Deployment**

- Ensure deployment triggers after data update.
- Use push triggers or `workflow_run` dependencies.

**Step 8: Local Development Setup**

- Ensure the Airtable config table has the necessary records.
- Run the Python script locally with the `AIRTABLE_API_KEY` environment variable set.
- Run the dashboard dev server (`npm run dev`) and verify fetching data from the generated JSON files in `public/data`.

## 5. Future Developments

- **Google Sheets Integration:** Extend config and script with `gspread`.
- **Sophisticated Dashboards:** Explore advanced charting (Nivo, Plotly).
- **Real-time or Write-back:** Move to backend API for dynamic queries.
- **Historical Data:** Modify script to snapshot data over time.
- **Granular Alerting:** Differentiate error types, customize notifications.
- **Performance & Rate Limits:** Implement delays, caching or incremental fetch.

## 6. Key Considerations

- **Schema Maintenance:** Update the Airtable config table and dashboard code on field renames/removals.
- **API Key Security:** Continue using Bitwarden secrets.
- **Error Logs:** Monitor Actions logs for warnings/errors.
- **Rate Limits:** Be mindful of Airtable API limits; add sleeps if needed.
- **Data Directory:** Confirm `output_data_directory` points inside `public` for static serving.

---

_End of Plan._
