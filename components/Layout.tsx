import { Zen_Kaku_Gothic_New } from "next/font/google";
import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";

const ZenKakuGothicNewFont = Zen_Kaku_Gothic_New({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-ZenKakuGothicNew",
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${ZenKakuGothicNewFont.variable} font-ZenKakuGothicNew`}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
