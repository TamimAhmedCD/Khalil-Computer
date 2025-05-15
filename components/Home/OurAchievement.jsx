"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import { Book, GraduationCap, Users, Calendar, Building, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "../ui/button"

// Counter animation component with improved animation
const AnimatedCounter = ({
  end,
  duration = 2500,
  isInView = false,
  suffix = "",
}) => {
  const [count, setCount] = useState(0)
  const countRef = useRef()

  useEffect(() => {
    if (!isInView) return

    // Easing function for smoother animation
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4)
    const startTime = Date.now()

    if (countRef.current) clearInterval(countRef.current)

    countRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutQuart(progress)

      setCount(Math.floor(easedProgress * end))

      if (progress >= 1) {
        clearInterval(countRef.current)
        setCount(end)
      }
    }, 16)

    return () => {
      if (countRef.current) clearInterval(countRef.current)
    }
  }, [end, duration, isInView])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// Enhanced stat card component with more animations
const StatCard = ({
  icon: Icon,
  count,
  label,
  description,
  delay = 0,
  isInView = false,
  animationVariant = "fade-up",
  suffix = "+",
  accentColor = "var(--primary)",
}) => {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!isInView) return

    const timer = setTimeout(() => {
      setVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [isInView, delay])

  // Different animation styles based on variant
  const getAnimationStyle = () => {
    if (!visible) {
      switch (animationVariant) {
        case "fade-right":
          return "translate-x-10 opacity-0"
        case "fade-left":
          return "-translate-x-10 opacity-0"
        case "zoom-in":
          return "scale-95 opacity-0"
        case "fade-up":
        default:
          return "translate-y-10 opacity-0"
      }
    }
    return "translate-y-0 translate-x-0 scale-100 opacity-100"
  }

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-700 transform h-full",
        getAnimationStyle(),
        hovered && "shadow-lg scale-[1.02]",
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardContent className="p-8 text-center flex flex-col items-center justify-center h-full relative">
        {/* Decorative background element */}
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 transition-all duration-500"
          style={{
            background: `radial-gradient(circle, ${accentColor}10, transparent 70%)`,
            transform: hovered ? "scale(1.2)" : "scale(1)",
          }}
        />

        <div
          className={cn(
            "relative z-10 flex items-center justify-center w-20 h-20 mb-6 rounded-full transition-all duration-500",
          )}
          style={{
            background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}25)`,
            boxShadow: hovered ? `0 10px 25px -5px ${accentColor}20` : "none",
          }}
        >
          <Icon
            className="h-10 w-10 transition-all duration-500"
            style={{
              color: accentColor,
              transform: hovered ? "scale(1.1)" : "scale(1)",
            }}
          />
        </div>

        <div
          className="text-5xl font-bold mb-3 transition-all duration-500"
          style={{ color: hovered ? accentColor : "var(--foreground)" }}
        >
          <AnimatedCounter end={count} isInView={isInView} suffix={suffix} />
        </div>

        <div className="text-xl font-medium mb-2">{label}</div>

        {description && <p className="text-sm text-muted-foreground mt-2 max-w-[250px]">{description}</p>}

        {/* Animated underline */}
        <div
          className="h-1 rounded-full mt-4 transition-all duration-700"
          style={{
            background: accentColor,
            opacity: 0.4,
            width: visible ? (hovered ? "32px" : "24px") : "0px",
          }}
        />
      </CardContent>
    </Card>
  )
}

// Achievement item component
const AchievementItem = ({ text }) => {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
      <div className="h-4 w-4 rounded-full bg-primary-600/20 flex items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-primary-600"></div>
      </div>
      <span>{text}</span>
    </div>
  )
}

export default function OurAchievement() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  const stats = [
    {
      icon: GraduationCap,
      count: 550,
      label: "মোট শিক্ষার্থী",
      description: "দেশের বিভিন্ন প্রান্ত থেকে আমাদের কেন্দ্রে প্রশিক্ষণ নিয়েছেন",
      variant: "fade-up",
      accentColor: "hsl(var(--primary))",
    },
    {
      icon: Book,
      count: 4,
      label: "কোর্স সংখ্যা",
      description: "আধুনিক প্রযুক্তি ও চাহিদা অনুযায়ী সাজানো কোর্স",
      variant: "fade-left",
      suffix: "",
      accentColor: "hsl(215, 90%, 50%)",
    },
    {
      icon: Users,
      count: 506,
      label: "সফল স্টুডেন্ট",
      description: "যারা সফলভাবে কোর্স সম্পন্ন করে কর্মজীবনে প্রবেশ করেছেন",
      variant: "fade-right",
      accentColor: "hsl(280, 90%, 50%)",
    },
    {
      icon: Calendar,
      count: 25,
      label: "বছরের অভিজ্ঞতা",
      description: "আইটি শিক্ষা প্রদানে দীর্ঘ অ��িজ্ঞতা",
      variant: "zoom-in",
      suffix: "",
      accentColor: "hsl(340, 90%, 50%)",
    },
    {
      icon: Building,
      count: 1,
      label: "শাখা সংখ্যা",
      description: "সারা দেশে ছড়িয়ে থাকা আমাদের শাখাসমূহ",
      variant: "fade-up",
      suffix: "",
      accentColor: "hsl(160, 90%, 40%)",
    },
    {
      icon: TrendingUp,
      count: 92,
      label: "কর্মসংস্থান সাফল্য হার",
      description: "আমাদের গ্র্যাজুয়েট শিক্ষার্থীদের কর্মসংস্থান হার",
      variant: "fade-left",
      suffix: "%",
      accentColor: "hsl(30, 90%, 50%)",
    },
  ]

  const [animatedBackground, setAnimatedBackground] = useState(false)

  useEffect(() => {
    if (inView) {
      setAnimatedBackground(true)
    }
  }, [inView])

  return (
    <section
      ref={ref}
      className={cn(
        "md:my-10 my-7 md:px-4 relative overflow-hidden transition-all duration-1000",
      )}
    >
      {/* Background decorative circles */}
      <div
        className={cn(
          "absolute top-40 right-20 w-80 h-80 rounded-full bg-blue-500/5 transition-all duration-1500 transform",
          animatedBackground ? "opacity-100 scale-100" : "opacity-0 scale-50",
        )}
        style={{ filter: "blur(100px)" }}
      />
      <div
        className={cn(
          "absolute bottom-40 left-20 w-80 h-80 rounded-full bg-purple-500/5 transition-all duration-1500 transform",
          animatedBackground ? "opacity-100 scale-100" : "opacity-0 scale-50",
        )}
        style={{ filter: "blur(100px)" }}
      />
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <div
            className={cn(
              "inline-block px-6 py-1.5 rounded-lg bg-primary-200/70 text-primary-700 font-medium text-sm mb-6 transition-all duration-700 transform",
              inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4",
            )}
          >
            আমাদের সাফল্য
          </div>
          <h2
            className={cn(
              "text-4xl md:text-5xl font-bold mb-8 transition-all duration-700 transform",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
          >
            {/* আমাদের অর্জনসমূহ */}
            আমাদের <span className="text-primary-600">অর্জনসমূহ</span>
          </h2>
          <p
            className={cn(
              "text-muted-foreground max-w-2xl mx-auto text-lg transition-all duration-700 delay-300 transform",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
          >
            আমাদের বাস্তবভিত্তিক প্রশিক্ষণে শত শত শিক্ষার্থী সফল ক্যারিয়ার গড়তে সক্ষম হয়েছে।
          </p>
          <div
            className={cn(
              "flex flex-wrap justify-center gap-6 mt-8 transition-all duration-700 delay-500 transform",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
          >
            <AchievementItem text="১০০% প্র্যাকটিক্যাল ট্রেনিং" />
            <AchievementItem text="ক্যারিয়ার সাপোর্ট" />
            <AchievementItem text="লাইফটাইম এক্সেস" />
            <AchievementItem text="প্রজেক্ট ভিত্তিক শিক্ষা" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              count={stat.count}
              label={stat.label}
              description={stat.description}
              delay={index * 150}
              isInView={inView}
              animationVariant={stat.variant}
              suffix={stat.suffix}
              accentColor={stat.accentColor}
            />
          ))}
        </div>
        <div
          className={cn(
            "flex justify-center mt-7 transition-all duration-700 delay-1000 transform",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          {/* <button className="px-10 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl hover:shadow-primary/20">
            আরও জানুন
          </button> */}
          <Link href="/courses">
            <Button
              className="text-base text-white hover:text-primary-600 border-primary-600 hover:bg-white bg-primary-600 rounded-full p-6"
              variant="outline"
            >
              আরও জানুন
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
