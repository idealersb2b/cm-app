"use client"

import { useEffect } from "react";
import Dashboard from "./dashboard/page";
import { isVendorInVar } from "@/app/Providers";
import { useReactiveVar } from "@apollo/client";


export default function App() {
    return <Dashboard />
}
