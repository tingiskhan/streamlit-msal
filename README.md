# MSAL Login

Adds a login button to your Streamlit app that uses the Microsoft Authentication Library (MSAL) to authenticate users with their Microsoft accounts.

## Installation

```bash
pip install streamlit-entra
```

> The PyPI package name is `streamlit-entra` (hyphen); the Python import name is `streamlit_entra` (underscore).

## Usage

```python
import streamlit as st
from streamlit_entra import msal_login

result = msal_login(
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
