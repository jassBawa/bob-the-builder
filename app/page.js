import LoginForm from "@/components/forms/LoginForm";
import SignupForm from "@/components/forms/SignupForm";

export default function Home() {
  return (
    <main className="flex">
      <div className="flex-1 bg-[#0E0E22]"></div>
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-sm w-full">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
