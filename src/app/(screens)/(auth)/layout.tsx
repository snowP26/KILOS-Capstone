"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AuthRootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname();

    return (
        <div className=" w-full h-full">
            <AnimatePresence mode="wait">
                <motion.div
                    key={pathname}
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 1, x: -10 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full h-full"
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
