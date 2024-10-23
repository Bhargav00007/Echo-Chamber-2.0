import { DM_Sans, Poppins } from "next/font/google";

export const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--dm_sans-font",
});

export const poppins = Poppins({
  weight: ["100", "200", "300", "500", "400", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--poppins-font",
});
