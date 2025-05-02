import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold">
          <span className="text-gradient">Latest & Top</span> Volunteer
          <span className="relative ml-2">
            Opportunities
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400/50 to-transparent rounded"></span>
          </span>
        </h2>
        <Link to="/jobs" className="flex items-center gap-1 text-purple-700 hover:text-purple-900 transition-colors group">
          <span className="font-medium">View All</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {allJobs.length <= 0 ? (
        <div className="flex flex-col items-center justify-center py-12 rounded-xl bg-purple-50/50 border border-purple-100">
          <p className="text-gray-600 text-lg mb-2">No opportunities available at the moment</p>
          <p className="text-sm text-gray-500">Check back soon for new volunteer opportunities</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
          {allJobs
            ?.slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)}
        </div>
      )}
    </div>
  );
};

export default LatestJobs;
