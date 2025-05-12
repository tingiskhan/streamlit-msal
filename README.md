# MSAL Login

Adds a login button to your app that uses the Microsoft Authentication Library (MSAL) to authenticate users with their 
Microsoft accounts.

## Installation
Install the package using pip:

```bash
pip install git+https://github.com/tingiskhan/streamlit-msal.git
```

## Usage
```python
import streamlit as st
from msal_login import msal_login

login_response = msal_login(
    client_id=...,
    authority=...,
    redirect_uri=...,
    scopes=...,
)

<do stuff with token>
```

## Develop
1. Clone repository
2. Make sure you have `npm` installed on your system
3. Install dependencies when in `frontend` directory
```bash
npm install
```
4. Build the frontend
```bash
npm run build
```
5. Run the app
```bash
streamlit run app.py
```