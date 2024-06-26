import { Inter } from "next/font/google";
import "./globals.css";
import ContextProvider, { globalContext } from "@/Context API/ContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FetchData from "./components/FetchData";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Instafarm",
  description: "An ecommerce plateform for Farming products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          {children}
          <FetchData />
          <ToastContainer
            position="top-center"
            autoClose={2500}
          />
        </ContextProvider>
      </body>
    </html>
  );
}
