import { ModeToggle } from "@/components/change-mode";
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <div className="w-full grid place-content-center">
        <h1 className="w-4/5 m-auto text-center font-satoshi bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-purple/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-normal text-transparent text-balance sm:text-5xl md:text-6xl lg:text-7xl translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">Welcome to Fill <span className="block">Form Generic</span></h1>
        <p className="w-4/5 m-auto text-center text-lg tracking-tight text-gray-400 md:text-xl text-balance translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]" >This app helps you to easily fill out and manage forms for various purposes. Whether you need to create surveys, registration forms, or feedback forms, our app provides a simple and efficient solution.</p>
      </div>
    </div>
  );
}

// w-4/5 