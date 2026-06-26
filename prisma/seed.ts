async function main() {
  const res = await fetch("http://localhost:3000/api/auth/sign-up/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "test@example.com",
      password: "12345678",
      name: "Test User",
    }),
  });
  const data = await res.json();
  console.log("Test user created:", data.user?.email, "/ 12345678");
}

main().catch(console.error);
