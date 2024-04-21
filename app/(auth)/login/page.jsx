import LoginForm from "@/components/forms/LoginForm";

export default function Home() {
  return (
    <div className="flex *:flex-1 h-screen">
      <div className=" bg-[#0E0E22]"></div>
      <div className=" flex items-center justify-center">
        <div className="max-w-sm w-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
