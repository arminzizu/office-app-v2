"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";
import { FaTachometerAlt, FaCalculator, FaArchive, FaTags, FaDollarSign, FaUser, FaBars } from "react-icons/fa";
import { useAppName } from "../context/AppNameContext";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { appName } = useAppName();
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Provjera autentifikacije
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { href: "/obracun", label: "Obračun", icon: <FaCalculator /> },
    { href: "/arhiva", label: "Arhiva", icon: <FaArchive /> },
    { href: "/cjenovnik", label: "Cjenovnik", icon: <FaTags /> },
    { href: "/profit", label: "Profit", icon: <FaDollarSign /> },
    { href: "/profile", label: "Profil", icon: <FaUser /> }, // Dodan ispravan link za profil
  ];

  return (
    <>
      {isAuthenticated && isBottomBarVisible && (
        <nav
          style={{
            backgroundColor: "#1E1E2F",
            color: "#fff",
            padding: "10px 0",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            zIndex: 1000,
            boxShadow: "0 -2px 8px rgba(0,0,0,0.15)",
            height: "60px",
            transition: "transform 0.3s ease",
          }}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2px",
                  padding: "5px",
                  borderRadius: "8px",
                  background: isActive ? "#3b82f6" : "transparent",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "all 0.2s ease",
                  fontSize: "12px",
                  width: "16%", // Ravnomjerno raspoređeno za 6 linkova
                  textAlign: "center",
                }}
                className="sidebar-link"
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      )}
      {isAuthenticated && (
        <div
          style={{
            position: "fixed",
            bottom: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1001,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            backgroundColor: "#2A2A3F",
            borderRadius: "50%",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            transition: "transform 0.3s ease",
          }}
          onClick={() => setIsBottomBarVisible(!isBottomBarVisible)}
        >
          <FaBars style={{ color: "#fff", fontSize: "18px" }} />
        </div>
      )}
      <style jsx>{`
        .sidebar-link:hover {
          background-color: #3b82f6;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        @media (max-width: 768px) {
          nav {
            height: 60px; /* Fiksna visina na mobilu */
          }
          .sidebar-link span {
            font-size: 10px; /* Smanji tekst na mobilu */
          }
          .sidebar-link {
            width: "16%"; /* Prilagođeno za 6 elemenata */
          }
          div[onClick] {
            bottom: ${isBottomBarVisible ? "60px" : "10px"}; /* Pomicanje ikone kad je bar sakriven */
            transform: ${isBottomBarVisible ? "translateX(-50%)" : "translateX(-50%) rotate(90deg)"};
          }
        }
        @media (min-width: 768px) {
          nav {
            height: 60px; /* Fiksna visina na desktopu */
          }
          .sidebar-link span {
            font-size: 12px; /* Normalni tekst na desktopu */
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;