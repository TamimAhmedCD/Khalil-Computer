"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function HierarchicalDatePicker({ form, name, label, placeholder = "তারিখ নির্বাচন করুন" }) {
    const [selectionMode, setSelectionMode] = useState("year")
    const [selectedYear, setSelectedYear] = useState(null)
    const [selectedMonth, setSelectedMonth] = useState(null)
    const [open, setOpen] = useState(false)

    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

    const months = [
        { value: 0, label: "জানুয়ারি" },
        { value: 1, label: "ফেব্রুয়ারি" },
        { value: 2, label: "মার্চ" },
        { value: 3, label: "এপ্রিল" },
        { value: 4, label: "মে" },
        { value: 5, label: "জুন" },
        { value: 6, label: "জুলাই" },
        { value: 7, label: "আগস্ট" },
        { value: 8, label: "সেপ্টেম্বর" },
        { value: 9, label: "অক্টোবর" },
        { value: 10, label: "নভেম্বর" },
        { value: 11, label: "ডিসেম্বর" },
    ]

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate()
    }

    const handleYearSelect = (year) => {
        setSelectedYear(year)
        setSelectionMode("month")
    }

    const handleMonthSelect = (month) => {
        setSelectedMonth(month)
        setSelectionMode("day")
    }

    const handleDaySelect = (day) => {
        if (selectedYear !== null && selectedMonth !== null) {
            const date = new Date(selectedYear, selectedMonth, day)
            form.setValue(name, date)
            setOpen(false)

            setTimeout(() => {
                setSelectionMode("year")
                setSelectedYear(null)
                setSelectedMonth(null)
            }, 300)
        }
    }

    const handleBackButton = () => {
        if (selectionMode === "month") {
            setSelectionMode("year")
            setSelectedYear(null)
        } else if (selectionMode === "day") {
            setSelectionMode("month")
            setSelectedMonth(null)
        }
    }

    const renderSelectionContent = () => {
        if (selectionMode === "year") {
            return (
                <div className="p-2">
                    <div className="text-center font-medium mb-2">বছর নির্বাচন করুন</div>
                    <div className="grid grid-cols-4 gap-1 max-h-[240px] overflow-y-auto">
                        {years.map((year) => (
                            <Button key={year} variant="outline" className="h-9" onClick={() => handleYearSelect(year)}>
                                {year}
                            </Button>
                        ))}
                    </div>
                </div>
            )
        } else if (selectionMode === "month") {
            return (
                <div className="p-2">
                    <div className="flex items-center mb-2">
                        <Button variant="ghost" size="sm" onClick={handleBackButton} className="mr-2">
                            ←
                        </Button>
                        <div className="text-center font-medium flex-1">মাস নির্বাচন করুন</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                        {months.map((month) => (
                            <Button
                                key={month.value}
                                variant="outline"
                                className="h-9"
                                onClick={() => handleMonthSelect(month.value)}
                            >
                                {month.label}
                            </Button>
                        ))}
                    </div>
                </div>
            )
        } else if (selectionMode === "day" && selectedYear !== null && selectedMonth !== null) {
            const daysInMonth = getDaysInMonth(selectedYear, selectedMonth)
            const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

            return (
                <div className="p-2">
                    <div className="flex items-center mb-2">
                        <Button variant="ghost" size="sm" onClick={handleBackButton} className="mr-2">
                            ←
                        </Button>
                        <div className="text-center font-medium flex-1">
                            দিন নির্বাচন করুন - {months[selectedMonth].label} {selectedYear}
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                        {days.map((day) => (
                            <Button
                                key={day}
                                variant="outline"
                                className="h-9 w-9 p-0"
                                onClick={() => handleDaySelect(day)}
                            >
                                {day}
                            </Button>
                        ))}
                    </div>
                </div>
            )
        }
    }

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel className="text-primary-700 font-medium">{label}</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full pl-3 text-left font-normal border-primary-200 rounded-lg",
                                        !field.value && "text-muted-foreground",
                                    )}
                                >
                                    {field.value ? format(field.value, "PPP") : <span>{placeholder}</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            {renderSelectionContent()}
                        </PopoverContent>
                    </Popover>
                    <FormMessage className="text-red-500" />
                </FormItem>
            )}
        />
    )
}
