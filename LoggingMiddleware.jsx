const LOG_API = "http://4.224.186.213/evaluation-service/logs";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhcnVua3VtYXJfMjNjc2ExMkBrZ2tpdGUuYWMuaW4iLCJleHAiOjE3ODI4MDEzNDcsImlhdCI6MTc4MjgwMDQ0NywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImY0OTljZDhjLWQ2NzUtNGM5Yy05MzQ2LTU4ZjAxYjRiZDE0ZSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFydW5rdW1hciBwIiwic3ViIjoiZTEwY2JkNzEtNjA5MS00Y2YzLWE0YzktMjA0MTc5MWFiZTEwIn0sImVtYWlsIjoiYXJ1bmt1bWFyXzIzY3NhMTJAa2draXRlLmFjLmluIiwibmFtZSI6ImFydW5rdW1hciBwIiwicm9sbE5vIjoiNzExNzIzMTA0MDEyIiwiYWNjZXNzQ29kZSI6IldqTnlDVCIsImNsaWVudElEIjoiZTEwY2JkNzEtNjA5MS00Y2YzLWE0YzktMjA0MTc5MWFiZTEwIiwiY2xpZW50U2VjcmV0IjoiZ0FjdEdyeFJLS0ZkcE1yUSJ9.Fj5IQXnVIo0PBEDjEwpiJ8gRbZ256z6Ba6EIN1TBCY8";

const ALLOWED_STACKS = ["frontend", "backend"];
const ALLOWED_LEVELS = ["debug", "info", "warning", "error", "fatal"];
const ALLOWED_PACKAGES = ["api", "hook", "page", "state", "style"];

export async function Log(stack, level, packageName, message, token) {

  stack = stack.toLowerCase();
  level = level.toLowerCase();
  packageName = packageName.toLowerCase();

  if (!ALLOWED_STACKS.includes(stack)) {
    throw new Error("Invalid stack");
  }

  if (!ALLOWED_LEVELS.includes(level)) {
    throw new Error("Invalid level");
  }

  if (!ALLOWED_PACKAGES.includes(packageName)) {
    throw new Error("Invalid package");
  }

  if (typeof message !== "string" || message.trim() === "") {
    throw new Error("Message must be a non-empty string");
  }

  const response = await fetch(LOG_API, {
    method: "POST",

    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      stack,
      level,
      package: packageName,
      message
    })
  });

  const data = await response.json();

  console.log("Log Response:", data);

  return data;
}