import React, { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { ChevronDown, ChevronUp, X, Filter, Search, CheckCircle2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "framer-motion";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
    icon: "🌍",
  },
  {
    filterType: "Industry",
    array: [
      "Community Outreach",
      "Event Management",
      "Fundraising",
      "Disaster Relief",
      "Mentorship",
      "Environmental Conservation",
    ],
    icon: "🏢",
  },
  {
    filterType: "Commitment",
    array: [
      "One-time",
      "Weekly",
      "Monthly",
      "Quarterly",
      "Long-term"
    ],
    icon: "⏱️",
  },
  {
    filterType: "Compensation",
    array: [
      "Free + Certificate",
      "5k-10k",
      "10k-15k",
      "15k-20k",
      "Stipend + Certificate",
    ],
    icon: "💰",
  },
];

const FilterCard = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [quickSearch, setQuickSearch] = useState("");
  const dispatch = useDispatch();

  // Initialize all filter sections as expanded
  useEffect(() => {
    const initialExpanded = {};
    filterData.forEach(item => {
      initialExpanded[item.filterType] = true;
    });
    setExpanded(initialExpanded);
  }, []);

  const toggleSection = (section) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterToggle = (value) => {
    setSelectedValues(prev => {
      if (prev.includes(value)) {
        // Remove the value if it's already selected
        return prev.filter(item => item !== value);
      } else {
        // Add the value if it's not selected
        return [...prev, value];
      }
    });
  };

  const handleQuickSearch = () => {
    if (quickSearch.trim()) {
      dispatch(setSearchedQuery(quickSearch));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleQuickSearch();
    }
  };

  const clearAllFilters = () => {
    setSelectedValues([]);
    setQuickSearch("");
    dispatch(setSearchedQuery(""));
  };

  const removeFilter = (valueToRemove) => {
    setSelectedValues(prev => prev.filter(value => value !== valueToRemove));
  };

  // Update search query when filters change
  useEffect(() => {
    // Create a pipe-separated string of all selected filters for OR filtering
    const filterQuery = selectedValues.join("|");
    dispatch(setSearchedQuery(filterQuery));
  }, [selectedValues, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md border border-purple-100 dark:border-purple-900/30 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 p-4 border-b border-purple-100 dark:border-purple-900/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-purple-700 dark:text-purple-400" />
            <h1 className="font-bold text-lg text-gray-800 dark:text-white">Filter Opportunities</h1>
          </div>
          {selectedValues.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 h-auto font-medium text-xs"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Quick search */}
        <div className="mt-3 relative">
          <Input
            placeholder="Quick search..."
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pr-10 border-purple-200 dark:border-purple-800 dark:bg-gray-800/80 dark:text-white dark:placeholder-gray-400 focus-visible:ring-purple-400 dark:focus-visible:ring-purple-500"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-0 top-0 h-full aspect-square text-gray-400 dark:text-gray-500 hover:text-purple-700 dark:hover:text-purple-400"
            onClick={handleQuickSearch}
          >
            <Search size={18} />
          </Button>
        </div>
      </div>

      {/* Current Selection */}
      {selectedValues.length > 0 && (
        <div className="px-4 py-3 bg-purple-50 dark:bg-purple-900/20 border-b border-purple-100 dark:border-purple-900/30">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-purple-800 dark:text-purple-300">Active Filters: ({selectedValues.length})</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedValues.map((value) => (
              <Badge
                key={value}
                variant="secondary"
                className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 gap-1 cursor-pointer hover:bg-purple-200 dark:hover:bg-purple-800/60 transition-colors"
                onClick={() => removeFilter(value)}
              >
                {value}
                <X size={14} className="text-purple-500 dark:text-purple-400" />
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 space-y-4">
        {filterData.map((section, index) => (
          <div key={section.filterType} className="border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(section.filterType)}
              className="w-full p-3 flex items-center justify-between bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{section.icon}</span>
                <h2 className="font-semibold text-gray-800 dark:text-white">{section.filterType}</h2>

                {/* Show count of selected filters in this section */}
                {selectedValues.filter(val => section.array.includes(val)).length > 0 && (
                  <span className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs font-medium px-2 py-0.5 rounded-full">
                    {selectedValues.filter(val => section.array.includes(val)).length}
                  </span>
                )}
              </div>
              {expanded[section.filterType] ? (
                <ChevronUp size={18} className="text-gray-500 dark:text-gray-400" />
              ) : (
                <ChevronDown size={18} className="text-gray-500 dark:text-gray-400" />
              )}
            </button>

            <AnimatePresence>
              {expanded[section.filterType] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 flex flex-wrap gap-2">
                    {section.array.map((item, idx) => {
                      const itemId = `id${index}-${idx}`;
                      const isSelected = selectedValues.includes(item);
                      return (
                        <div key={itemId} className="relative">
                          <Label
                            htmlFor={itemId}
                            onClick={() => handleFilterToggle(item)}
                            className={`px-3 py-1.5 rounded-full text-sm cursor-pointer transition-all border flex items-center gap-1.5 ${isSelected
                              ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700 font-medium'
                              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-purple-200 dark:hover:border-purple-700'
                              }`}
                          >
                            {isSelected ? (
                              <CheckCircle2 size={14} className="text-purple-600 dark:text-purple-400" />
                            ) : (
                              <div className="w-[14px] h-[14px] rounded-full border border-gray-300 dark:border-gray-600"></div>
                            )}
                            {item}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default FilterCard;
