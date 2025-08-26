import React from 'react';
import { Button } from '../ui/button';
import { ClipboardList, AlertCircle, BookOpen, Building2 } from "lucide-react";

const filterOptions = [
    { value: 'all', label: 'সব', icon: <ClipboardList className="w-4 h-4" /> },
    { value: 'urgent', label: 'জরুরি', icon: <AlertCircle className="w-4 h-4 text-red-500" /> },
    { value: 'course', label: 'কোর্স', icon: <BookOpen className="w-4 h-4 text-primary-600" /> },
    { value: 'office', label: 'অফিস', icon: <Building2 className="w-4 h-4" /> }
];

export const FilterBar = ({ selectedFilter, onFilterChange }) => {
    return (
        <div className="flex flex-wrap justify-center gap-3 p-6 bg-card rounded-xl shadow-sm border">
            {filterOptions.map((option) => (
                <Button
                    key={option.value}
                    variant={selectedFilter === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => onFilterChange(option.value)}
                    className={`
             hover:bg-primary-500 transition-all duration-300 hover:scale-105
            ${selectedFilter === option.value
                            ? 'bg-primary-600 shadow-md'
                            : 'bg-background hover:bg-muted border-border hover:border-primary-600/50'
                        }
          `}
                >
                    <span className="mr-2">{option.icon}</span>
                    {option.label}
                </Button>
            ))}
        </div>
    );
};