# MSAL Login

Adds a login button to your Streamlit app that uses the Microsoft Authentication Library (MSAL) to authenticate users with their Microsoft accounts.

## Installation

```bash
pip install streamlit-entra
```

> The PyPI package name is `streamlit-entra` (hyphen); the Python import name is `streamlit_entra` (underscore).

## Azure App Registration

Before using this component you need an Azure App Registration. See the [Microsoft Entra quickstart](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app) for the full guide. The critical steps are:

1. Go to [Microsoft Entra admin center](https://entra.microsoft.com) → **App registrations** → **New registration**.
2. Give it a name, select the supported account types, and click **Register**.
3. From the **Overview** page, copy the **Application (client) ID** and **Directory (tenant) ID** — these map to `client_id` and the `<tenant-id>` in the `authority` URL.
4. Go to **Authentication** → **Add a platform** → choose **Single-page application (SPA)**.
5. Add your redirect URI (e.g. `http://localhost:8501` for local development). The URI must match the `redirect_uri` argument exactly, including trailing slashes.

> **Important:** The platform type must be **Single-page application**, not *Web*. The popup flow used by MSAL Browser requires SPA-style implicit grant; selecting *Web* will cause the login popup to fail silently.

6. Under **API permissions**, add any Microsoft Graph scopes your app needs (e.g. `User.Read` for basic profile).

## Usage

```python
import streamlit as st
from streamlit_entra import login

result = login(
    client_id="<your-client-id>",
    authority="https://login.microsoftonline.com/<tenant-id>",
    redirect_uri="http://localhost:8501",
    scopes=["User.Read"],
    key="msal_login",
)

if result:
    st.write("Logged in as", result["account"]["username"])
```

## Releasing a New Version

1. Ensure [PyPI Trusted Publishing](https://docs.pypi.org/trusted-publishers/adding-a-publisher/) is configured for the `streamlit-entra` project on pypi.org (one-time setup: owner `tingiskhan`, repo `streamlit-msal`, workflow `publish.yaml`).
2. Tag and push:
   ```bash
   git tag v0.0.7
   git push origin v0.0.7
   ```
3. The `publish.yaml` workflow runs a cross-platform test matrix (Linux/macOS/Windows × Python 3.11–3.13), then builds and publishes to PyPI automatically.

## Local Development

```bash
# 1. Install frontend dependencies
cd streamlit_entra/frontend && npm ci

# 2. Build the frontend (required before importing the package)
npm run build

# 3. Install the Python package in editable mode
cd ../.. && pip install -e .

# 4. Run a test app
streamlit run app.py
```
