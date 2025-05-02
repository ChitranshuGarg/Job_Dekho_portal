import React from 'react'
import { Button } from './ui/button'
import { Bookmark, Clock, MapPin, ArrowRight, Users, BadgeCheck, BriefcaseBusiness } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

// Import tooltip components safely
let TooltipProvider, Tooltip, TooltipTrigger, TooltipContent;
try {
    const TooltipModule = require('./ui/tooltip');
    TooltipProvider = TooltipModule.TooltipProvider;
    Tooltip = TooltipModule.Tooltip;
    TooltipTrigger = TooltipModule.TooltipTrigger;
    TooltipContent = TooltipModule.TooltipContent;
} catch (error) {
    // If tooltip components aren't available, create placeholder components
    TooltipProvider = ({ children }) => <>{children}</>;
    Tooltip = ({ children }) => <>{children}</>;
    TooltipTrigger = ({ asChild, children }) => <>{children}</>;
    TooltipContent = ({ children }) => null;
}

const Job = ({ job }) => {
    const navigate = useNavigate();
    // const jobId = "lsekdhjgdsnfvsdkjf";

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    // Format location or use default
    const formattedLocation = job?.location || "Remote";

    // Create a simple date formatter function
    const formatDate = (mongodbTime) => {
        try {
            return new Date(mongodbTime).toLocaleDateString();
        } catch (error) {
            return "Unknown date";
        }
    };

    return (
        <div className='h-full group'>
            <motion.div
                className='h-full p-6 rounded-2xl bg-white dark:bg-gray-800 border border-purple-100 dark:border-purple-900/30 shadow-sm hover:shadow-xl hover:shadow-purple-100/50 dark:hover:shadow-purple-900/50 transition-all duration-300 relative overflow-hidden flex flex-col'
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
            >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-100 dark:from-purple-900/40 to-transparent -mr-10 -mt-10 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-orange-50 dark:from-orange-900/20 to-transparent -ml-10 -mb-10 rounded-full opacity-0 group-hover:opacity-70 transition-all duration-500"></div>

                {/* Header section with bookmark and time */}
                <div className='flex items-center justify-between'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Badge variant="outline" className="bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 border-orange-100 dark:border-orange-800 flex items-center gap-1 px-2.5 py-1 font-medium">
                                    <Clock size={14} />
                                    <span>{daysAgoFunction(job?.createdAt) === 0 ? "Posted Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</span>
                                </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Posted on {formatDate(job?.createdAt)}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <Button variant="ghost" className="rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-300 transition-all" size="icon">
                        <Bookmark className="group-hover:scale-110 transition-transform" />
                    </Button>
                </div>

                {/* Company info */}
                <div className='flex items-start gap-4 my-4'>
                    <div className="p-0.5 rounded-xl bg-gradient-to-br from-purple-200 to-orange-100 dark:from-purple-700 dark:to-orange-900 shadow-sm">
                        <Avatar className="h-12 w-12 rounded-lg border-2 border-white dark:border-gray-700">
                            <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                        </Avatar>
                    </div>
                    <div className="flex-1">
                        <h1 className='font-bold text-xl text-gray-800 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors'>{job?.company?.name}</h1>
                        <div className='flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1 gap-1'>
                            <MapPin size={14} />
                            <p>{formattedLocation}</p>
                        </div>
                    </div>
                </div>

                {/* Job details card */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 border border-purple-100 dark:border-purple-900/30 group-hover:border-purple-200 dark:group-hover:border-purple-800 transition-colors flex-grow">
                    <h1 className='font-bold text-xl mb-2 text-gray-800 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors line-clamp-2'>{job?.title}</h1>
                    <p className='text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4'>{job?.description}</p>

                    {/* Key points */}
                    <div className="space-y-2">
                        {job?.position && (
                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <Users size={16} className="text-blue-600 dark:text-blue-400" />
                                <span><strong>{job?.position}</strong> positions available</span>
                            </div>
                        )}
                        {job?.jobType && (
                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <BriefcaseBusiness size={16} className="text-orange-600 dark:text-orange-400" />
                                <span>{job?.jobType}</span>
                            </div>
                        )}
                        {job?.salary && (
                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <BadgeCheck size={16} className="text-purple-600 dark:text-purple-400" />
                                <span>Compensation: <strong>{job?.salary} LPA</strong></span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tags section */}
                <div className='flex flex-wrap items-center gap-2 mt-4 mb-4'>
                    {job?.position && (
                        <Badge className='text-blue-700 dark:text-blue-300 font-medium bg-blue-50 dark:bg-blue-900/30 border-blue-100 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50' variant="outline">
                            {job?.position} Positions
                        </Badge>
                    )}
                    {job?.jobType && (
                        <Badge className='text-[#F83002] dark:text-orange-300 font-medium bg-orange-50 dark:bg-orange-900/30 border-orange-100 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/50' variant="outline">
                            {job?.jobType}
                        </Badge>
                    )}
                    {job?.salary && (
                        <Badge className='text-purple-700 dark:text-purple-300 font-medium bg-purple-50 dark:bg-purple-900/30 border-purple-100 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50' variant="outline">
                            {job?.salary} LPA
                        </Badge>
                    )}
                </div>

                {/* Actions section */}
                <div className='flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700'>
                    <Button
                        onClick={() => navigate(`/description/${job?._id}`)}
                        variant="outline"
                        className="border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 dark:text-gray-200 rounded-xl font-medium group/btn flex-1 mr-2"
                    >
                        View Details
                        <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                        className="bg-gradient-to-r from-[#6A38C2] to-[#9333ea] dark:from-[#7A48D2] dark:to-[#a343fa] hover:shadow-lg hover:shadow-purple-300/30 dark:hover:shadow-purple-900/30 rounded-xl font-medium flex-1"
                        onClick={() => navigate(`/description/${job?._id}`)}
                    >
                        Apply Now
                    </Button>
                </div>
            </motion.div>
        </div>
    )
}

export default Job