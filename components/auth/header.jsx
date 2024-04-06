import { Merriweather, Poppins } from "next/font/google";

import { cn } from "../../lib/utils";

// define the font object

const font = Merriweather({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

function Header({ label }) {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-2xl font-semibold", font.className)}>
        {" "}
        DASU 🔐 Auth
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}

export default Header;
