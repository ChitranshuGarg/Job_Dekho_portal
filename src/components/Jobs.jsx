import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Briefcase, SlidersHorizontal, X, AlertCircle } from 'lucide-react';
import Footer from './shared/Footer';
import { Button } from './ui/button';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Jobs = () => {
    // Call the custom hook to fetch mock jobs data
    useGetAllJobs();

    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [showFiltersMobile, setShowFiltersMobile] = useState(false);

    useEffect(() => {
        if (searchedQuery) {
            // Handle pipe-separated filter values for OR filtering
            const filterTerms = searchedQuery.split('|').filter(term => term.trim() !== '');

            if (filterTerms.length > 0) {
                const filteredJobs = allJobs.filter((job) => {
                    // For each job, check if it matches any of the filter terms
                    return filterTerms.some(term => {
                        const lowerTerm = term.toLowerCase().trim();
                        return (
                            (job.title && job.title.toLowerCase().includes(lowerTerm)) ||
                            (job.description && job.description.toLowerCase().includes(lowerTerm)) ||
                            (job.location && job.location.toLowerCase().includes(lowerTerm)) ||
                            (job.jobType && job.jobType.toLowerCase().includes(lowerTerm)) ||
                            (job.company && job.company.name && job.company.name.toLowerCase().includes(lowerTerm)) ||
                            (job.salary && job.salary.toString().includes(lowerTerm))
                        );
                    });
                });
                setFilterJobs(filteredJobs);
            } else {
                setFilterJobs(allJobs);
            }
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    // Animation variants for container
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    // Animation variants for items
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    const toggleMobileFilters = () => {
        setShowFiltersMobile(!showFiltersMobile);
    };

    // Get active filter count
    const getActiveFilterCount = () => {
        if (!searchedQuery) return 0;
        return searchedQuery.split('|').filter(term => term.trim() !== '').length;
    };

    // Format filter labels for display
    const getFilterLabels = () => {
        if (!searchedQuery) return [];
        return searchedQuery.split('|').filter(term => term.trim() !== '');
    };

    const clearAllFilters = () => {
        window.location.reload();
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Navbar />

            {/* Header Section */}
            <div className="bg-gradient-to-r from-purple-50 to-white dark:from-purple-950/10 dark:to-gray-900 border-b border-purple-100 dark:border-purple-900/30">
                <div className="max-w-7xl mx-auto px-4 py-10">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-4xl font-bold mb-3">
                            <span className="text-purple-700 dark:text-purple-400">Job</span> <span className="dark:text-white">Opportunities</span>
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Explore exciting job opportunities that match your skills and interests.
                            Filter by location, industry, and more to find the perfect role for your career growth.
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto w-full px-4 py-8">
                {/* Mobile Filter Toggle */}
                <div className="md:hidden mb-4">
                    <Button
                        onClick={toggleMobileFilters}
                        variant="outline"
                        className="w-full flex items-center justify-between border-purple-200 dark:border-purple-800 dark:text-gray-200"
                    >
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal size={18} className="text-purple-700 dark:text-purple-400" />
                            <span>{showFiltersMobile ? "Hide Filters" : "Show Filters"}</span>
                        </div>
                        <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 rounded-full text-xs">
                            {getActiveFilterCount()}
                        </span>
                    </Button>
                </div>

                {/* Main Content */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Filter Sidebar */}
                    <div className={`${showFiltersMobile ? 'block' : 'hidden'
                        } md:block md:w-[300px] sticky top-24 self-start`}>
                        <FilterCard />
                    </div>

                    {/* Jobs Grid */}
                    <div className="flex-1">
                        {/* Results Summary */}
                        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                            <div className="flex items-center gap-2">
                                <Briefcase size={20} className="text-purple-700 dark:text-purple-400" />
                                <h2 className="font-semibold text-gray-800 dark:text-gray-200">
                                    {filterJobs.length} {filterJobs.length === 1 ? 'Job' : 'Jobs'} Available
                                </h2>
                            </div>

                            {getActiveFilterCount() > 0 && (
                                <div className="flex items-center gap-2 flex-wrap">
                                    <div className="flex flex-wrap gap-2 max-w-md">
                                        {getFilterLabels().map((label, index) => (
                                            <div key={index} className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 dark:bg-purple-900/30 rounded-full border border-purple-100 dark:border-purple-800">
                                                <Search size={14} className="text-purple-700 dark:text-purple-400" />
                                                <span className="text-sm text-purple-800 dark:text-purple-300 font-medium truncate max-w-[150px]">{label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Empty State */}
                        {filterJobs.length <= 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-purple-100 dark:border-purple-900/30 shadow-sm"
                            >
                                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <AlertCircle size={32} className="text-orange-500 dark:text-orange-400" />
                                </div>
                                <h3 className="text-lg font-bold mb-2 dark:text-white">No jobs found</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    We couldn't find any jobs matching your filters.
                                    Try adjusting your search criteria or check back later.
                                </p>
                                {searchedQuery && (
                                    <Button
                                        variant="outline"
                                        className="border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 dark:text-gray-200"
                                        onClick={clearAllFilters}
                                    >
                                        Clear filters
                                    </Button>
                                )}
                            </motion.div>
                        ) : (
                            /* Jobs Grid */
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                <AnimatePresence>
                                    {filterJobs.map((job) => (
                                        <motion.div
                                            key={job?._id}
                                            variants={itemVariants}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="h-full"
                                        >
                                            <Job job={job} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    )
}

export default Jobs