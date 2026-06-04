import { redirect } from "next/navigation";

export default function Page() {
  redirect("/intro");
}

console.log(process.env.OPENROUTER_API_KEY);