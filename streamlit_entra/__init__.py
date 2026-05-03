from importlib.metadata import version, PackageNotFoundError
from pathlib import Path

import streamlit.components.v1 as components

try:
    __version__ = version("streamlit-entra")
except PackageNotFoundError:
    __version__ = "0.0.0+dev"

path = (Path(__file__).parent / "frontend" / "build").resolve()

if not path.exists():
    raise RuntimeError(
        f"Frontend build not found at {path}. "
        "Run: cd streamlit_entra/frontend && npm ci && npm run build"
    )

_component_func = components.declare_component("streamlit_entra_component", path=path)


def msal_login(client_id: str, authority: str, redirect_uri: str, scopes: list[str], key: str) -> dict | None:
    """
    Renders the MSAL login button and returns the MSAL AuthenticationResult as a dict,
    or None if not yet authenticated.
    """
    result_json = _component_func(
        clientId=client_id,
        authority=authority,
        redirectUri=redirect_uri,
        scopes=scopes,
        key=key,
    )

    return result_json if result_json else None
