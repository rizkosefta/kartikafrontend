import Logo from "@/assets/images/logo.jpg";

export default function Home() {
  return <>
  <header className="flex items-center justify-between px-4">
        <span className="flex gap-x-2 items-center">
          <span className="text-color1">
          <img src={Logo.src} alt="Logo" className="h-8 w-auto" />
          </span>
          <span className="font-bold text-2xl">Katika Catering</span>
        </span>
      </header>
  </>;
}