const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtYWhhbnRpZ3VuYXZhcmRoYW4uMjMuaXRAYW5pdHMuZWR1LmluIiwiZXhwIjoxNzgyMTkyNzYyLCJpYXQiOjE3ODIxOTE4NjIsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJiNDA0ZWY5Ni02ZGEzLTQyZGItYTM1MC1jZjc2YmMyMjMzZGYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJtYWhhbnRpIGd1bmF2YXJkaGFuIiwic3ViIjoiNTlmM2EyNTctYWRiYi00OGExLTlmZmItMDk0MWNiZDZmZDU2In0sImVtYWlsIjoibWFoYW50aWd1bmF2YXJkaGFuLjIzLml0QGFuaXRzLmVkdS5pbiIsIm5hbWUiOiJtYWhhbnRpIGd1bmF2YXJkaGFuIiwicm9sbE5vIjoiYTIzMTI2NTExMTU2IiwiYWNjZXNzQ29kZSI6Ik1UcXhhciIsImNsaWVudElEIjoiNTlmM2EyNTctYWRiYi00OGExLTlmZmItMDk0MWNiZDZmZDU2IiwiY2xpZW50U2VjcmV0IjoiQkFqWmZmY2VydFdFWkF3dyJ9.wxVqz4se8AO3aRgv-Exxj2RaHeb3ekgXMrPPfmwe148";

async function Log(
    stack,
    level,
    packageName,
    message
) {
    try {
        await fetch(
            "http://4.224.186.213/evaluation-service/logs",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    stack,
                    level,
                    package: packageName,
                    message
                })
            }
        );
    } catch (err) {}
}

module.exports = Log;