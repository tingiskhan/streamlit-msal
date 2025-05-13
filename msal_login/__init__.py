from pathlib import Path

import streamlit.components.v1 as components

__version__ = "0.0.5"

path = (Path(__file__).parent / "frontend" / "build").resolve()

assert path.exists()

_component_func = components.declare_component("msal_login_component", path=path)


def msal_login(client_id: str, authority: str, redirect_uri: str, scopes: list[str]) -> dict | None:
    """
    Renders the MSAL login button and returns the MSAL AuthenticationResult as a dict,
    or None if not yet authenticated.

    Args:
        client_id: The client ID of the Azure AD application.
        authority: The authority URL for the Azure AD tenant.
        redirect_uri: The redirect URI for the application.
        scopes: The scopes to request during authentication.

    Returns:
        Dictionary containing the authentication result, or None if not authenticated.
    """
    result_json = _component_func(
        clientId=client_id,
        authority=authority,
        redirectUri=redirect_uri,
        scopes=scopes,
        key="msal-login",
    )

    if result_json:
        return result_json

    return None
