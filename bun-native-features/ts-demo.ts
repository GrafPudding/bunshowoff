// Bun runs TypeScript natively - no config needed!
// Just run: bun run ts-demo.ts

interface User {
  id: number;
  name: string;
  email: string;
}

const greet = (user: User): string => {
  return `Hello, ${user.name}! Your email is ${user.email}`;
};

const user: User = {
  id: 1,
  name: "Bun User",
  email: "user@bun.sh"
};

console.log(greet(user));