export async function Log(stack, level, pkg, message) {
  try {
    await fetch("http://localhost:5000/api/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stack, level, package: pkg, message })
    });
  } catch {}
}
