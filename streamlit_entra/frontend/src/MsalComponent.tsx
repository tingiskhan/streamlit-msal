import React, { useEffect, useMemo, useState } from "react";
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
  const [initialized, setInitialized] = useState(false);
  const [result, setResult] = useState<AuthenticationResult | { error: unknown } | null>(null);

  const client = useMemo(
    () =>
      new PublicClientApplication({
        auth: { clientId, authority, redirectUri },
        cache: { cacheLocation: "sessionStorage" },
      }),
    [clientId, authority, redirectUri]
  );

  useEffect(() => {
    let cancelled = false;
    client.initialize().then(() => {
      if (!cancelled) setInitialized(true);
    });
    return () => { cancelled = true; };
  }, [client]);

  useEffect(() => {
    Streamlit.setFrameHeight();
  }, []);

  useEffect(() => {
    if (result) {
      Streamlit.setComponentValue(result);
      Streamlit.setFrameHeight();
    }
  }, [result]);

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
    <button onClick={handleLogin} type="button" className="btn btn-primary" disabled={!initialized}>
      Sign in with Microsoft
    </button>
  );
};

export default withStreamlitConnection(MsalComponent);
