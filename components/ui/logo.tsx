"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "horizontal" | "vertical" | "icon" | "minimal"
  size?: "sm" | "md" | "lg" | "xl" | "custom"
  customSize?: number
  className?: string
  animated?: boolean
  darkMode?: boolean
  onClick?: () => void
}

export function Logo({
  variant = "horizontal",
  size = "md",
  customSize,
  className,
  animated = true,
  darkMode = false,
  onClick,
}: LogoProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Size mapping
  const sizeMap = {
    sm: variant === "horizontal" ? 120 : variant === "vertical" ? 80 : variant === "icon" ? 40 : 100,
    md: variant === "horizontal" ? 180 : variant === "vertical" ? 120 : variant === "icon" ? 60 : 140,
    lg: variant === "horizontal" ? 240 : variant === "vertical" ? 160 : variant === "icon" ? 80 : 180,
    xl: variant === "horizontal" ? 320 : variant === "vertical" ? 200 : variant === "icon" ? 100 : 240,
    custom: customSize || 180,
  }

  const logoSize = sizeMap[size]
  const isWhiteBg = className?.includes("bg-white");
  const textColor = isWhiteBg ? "text-black" : darkMode ? "text-slate-500" : "text-black";
  const companyColor = "text-red-600"

  // Animation variants
  const letterVariants = {
    initial: { y: 0 },
    hover: { y: -3 },
  }

  const iconVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 5 },
  }

  const underlineVariants = {
    initial: { width: "0%" },
    hover: { width: "100%" },
  }

  if (!isClient) {
    return null // Prevent hydration mismatch
  }

  // Icon-only variant
  if (variant === "icon") {
    return (
      <motion.div
        className={cn("relative cursor-pointer", className)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onClick}
        whileTap={{ scale: 0.95 }}
        style={{ width: logoSize, height: logoSize }}
      >
        <motion.div
          initial="initial"
          animate={isHovered && animated ? "hover" : "initial"}
          variants={iconVariants}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center w-full h-full"
        >
          <div className="relative flex items-center justify-center w-full h-full">
            <div className="absolute inset-0 bg-red-600 rounded-full opacity-10" />
            <span className={cn("text-3xl font-black", textColor)}>M</span>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    )
  }

  // Minimal variant (just the text, no design elements)
  if (variant === "minimal") {
    return (
      <motion.div
        className={cn("cursor-pointer", className)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onClick}
        whileTap={{ scale: 0.98 }}
      >
        <div className={cn("font-bold tracking-tight", textColor)}>
          <span>MANCHA DEVELOPMENT </span>
          <span className={companyColor}>COMPANY</span>
        </div>
      </motion.div>
    )
  }

  // Vertical variant
  if (variant === "vertical") {
    return (
      <motion.div
        className={cn("flex flex-col items-center cursor-pointer", className)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onClick}
        whileTap={{ scale: 0.98 }}
        style={{ width: logoSize }}
      >
        <div className="flex items-center justify-center mb-2">
          <motion.div
            initial="initial"
            animate={isHovered && animated ? "hover" : "initial"}
            variants={iconVariants}
            transition={{ duration: 0.3 }}
            className="relative w-12 h-12 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-red-600 rounded-full opacity-10" />
            <span className={cn("text-2xl font-black", textColor)}>M</span>
          </motion.div>
        </div>

        <div className="text-center">
          <div className="flex justify-center">
            {animated ? (
              "MANCHA DEVELOPMENT".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  className={cn("text-sm font-bold", textColor)}
                  initial="initial"
                  animate={isHovered ? "hover" : "initial"}
                  variants={letterVariants}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))
            ) : (
              <span className={cn("text-sm font-bold", textColor)}>MANCHA DEVELOPMENT</span>
            )}
          </div>

          <div className="relative">
            <span className={cn("text-sm font-bold", companyColor)}>COMPANY</span>
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-red-600"
              initial="initial"
              animate={isHovered && animated ? "hover" : "initial"}
              variants={underlineVariants}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </motion.div>
    )
  }

  // Default horizontal variant
  return (
    <motion.div
      className={cn("flex items-center cursor-pointer", className)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      style={{ width: logoSize }}
    >
      <motion.div
        initial="initial"
        animate={isHovered && animated ? "hover" : "initial"}
        variants={iconVariants}
        transition={{ duration: 0.3 }}
        className="relative w-10 h-10 flex items-center justify-center mr-3"
      >
        <div className="absolute inset-0 bg-red-600 rounded-full opacity-10" />
        <span className={cn("text-xl font-black", textColor)}>M</span>
      </motion.div>

      <div>
        <div className="flex">
          {animated ? (
            "MANCHA DEVELOPMENT".split("").map((letter, i) => (
              <motion.span
                key={i}
                className={cn("text-sm font-bold", textColor)}
                initial="initial"
                animate={isHovered ? "hover" : "initial"}
                variants={letterVariants}
                transition={{ duration: 0.3, delay: i * 0.02 }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))
          ) : (
            <span className={cn("text-sm font-bold", textColor)}>MANCHA DEVELOPMENT</span>
          )}
        </div>

        <div className="relative">
          <span className={cn("text-sm font-bold", companyColor)}>COMPANY</span>
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-red-600"
            initial="initial"
            animate={isHovered && animated ? "hover" : "initial"}
            variants={underlineVariants}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  )
}

