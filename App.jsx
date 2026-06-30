import { useState } from "react";
import { Log } from "./LoggingMiddleware";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function sendLog() {
    setLoading(true);
    setError(null);

    try {
      // First, get a fresh token
      const authResponse = await fetch(
        "http://4.224.186.213/evaluation-service/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "arunkumar_23csa12@kgkite.ac.in",
            name: "ArunKumar P",
            rollNo: "711723104012",
            accessCode: "WjNyCT",
            clientId: "e10cbd71-6091-4cf3-a4c9-2041791abe10",
            clientSecret: "gActGrxRKKFdpMrQ",
          }),
        }
      );

      const authData = await authResponse.json();
      console.log("Auth Response:", authData);

      if (!authResponse.ok) {
        setError("Failed to authenticate");
        setLoading(false);
        return;
      }

      const token = authData.access_token;

    
      const data = await Log(
        "frontend",
        "error",
        "handler",
        "received string , expected bool",
        token
      );

      setResult({
        logid: data.logid,
        message: data.message,
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Logging Middleware</h1>

      <button onClick={sendLog} disabled={loading}>
        {loading ? "Sending..." : "Send Log"}
      </button>

      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: "20px", backgroundColor: "#f0f0f0", padding: "10px" }}>
          <h2>Log Response:</h2>
          <p>
            <strong>Log ID:</strong> {result.logid}
          </p>
          <p>
            <strong>Message:</strong> {result.message}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;