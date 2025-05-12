import React, { useEffect, useState } from "react";
import { Streamlit, withStreamlitConnection } from "streamlit-component-lib";
import {
  PublicClientApplication,
  PopupRequest,
  AuthenticationResult,
} from "@azure/msal-browser";

interface Args {
  clientId: string;
  authority: string;
  redirectUri: string;
  scopes: string[];
}

interface ComponentProps {
  args: Args;
}

const MsalComponent: React.FC<ComponentProps> = ({ args }) => {
  const { clientId, authority, redirectUri, scopes } = args;
  const [result, setResult] = useState<AuthenticationResult | { error: any } | null>(null);

  // Initialize MSAL
  const client = new PublicClientApplication({
    auth: { clientId, authority, redirectUri },
    cache: { cacheLocation: "sessionStorage" },
  });

  console.log("Redirect URI:", redirectUri);

  client.initialize();

  // Resize as soon as we mount
  useEffect(() => {
    Streamlit.setFrameHeight();
  }, []);

  // When we have a login result or error, push it back to Python
  useEffect(() => {
    if (result) {
      Streamlit.setComponentValue(result);
      Streamlit.setFrameHeight();
    }
  }, [result]);

  // Trigger MSAL popup
  const handleLogin = async () => {
    try {
      const response = await client.loginPopup({ scopes } as PopupRequest);
      setResult(response);
    } catch (error) {
      console.error(error);
      setResult({ error });
    }
  };

  return (
    <button onClick={handleLogin} type="button" class="btn btn-primary">
      Sign in with Microsoft
    </button>
  );
};

export default withStreamlitConnection(MsalComponent);
