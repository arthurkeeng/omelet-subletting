import type { Metadata } from "next";
import "./globals.css";

import {Nunito} from 'next/font/google'
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modal/RegisterModal";
import ToasterProvider from "./providers/Toaster-provider";
import LoginModal from "./components/modal/LoginModal";
import AuthWrapper from '@/app/components/AuthWrapper'
import { getCurrentUser } from "@/app/actions/getCurrentUser"
import RentModal from "./components/modal/RentModal";

const nunito = Nunito({
  subsets : ['latin']
})
export const metadata: Metadata = {
  title: "Ome - Let",
  description: "Where you get the best property pricing",
  icons : {
    icon : "/images/logo.png"
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser()
  
  return (
    <AuthWrapper>

    <html lang="en">
      <body
        className={`${nunito.className} antialiased`}
      >

        <ToasterProvider/>

        <RegisterModal       
        />
        <LoginModal       
        />
        <RentModal       
        />
        <Navbar  />
        <div className="pb-20 pt-28">

        {children}

        </div>
      
      </body>
    </html>
    </AuthWrapper>
  );
}
