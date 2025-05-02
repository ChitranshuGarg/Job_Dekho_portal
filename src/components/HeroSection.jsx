import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [animated, setAnimated] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchJobHandler();
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Enhanced artistic background elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/30 dark:bg-purple-900/40 rounded-full filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute top-32 -right-32 w-96 h-96 bg-orange-500/20 dark:bg-orange-600/20 rounded-full filter blur-3xl opacity-60"></div>
      <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-blue-500/20 dark:bg-blue-700/20 rounded-full filter blur-3xl opacity-60 animate-pulse"></div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-2 h-2 bg-purple-400 dark:bg-purple-300 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-20 right-1/3 w-3 h-3 bg-orange-400 dark:bg-orange-300 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-4 h-4 bg-blue-400 dark:bg-blue-300 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-1/4 w-2 h-2 bg-pink-400 dark:bg-pink-300 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className={`text-center z-10 relative py-20 px-4 transition-all duration-1000 ease-out ${animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="flex flex-col gap-8 my-12">
          <span className="mx-auto px-6 py-3 rounded-full bg-gradient-to-r from-purple-100/80 to-orange-50/80 dark:from-purple-800/30 dark:to-orange-900/20 text-[#F83002] dark:text-orange-300 font-medium shadow-md backdrop-blur-sm border border-white/20 dark:border-white/10 transition-all hover:shadow-lg cursor-default select-none transform hover:scale-105 duration-300">
            Empower Communities, One Volunteer at a Time
          </span>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight cursor-default select-none transition-all hover:text-purple-900 dark:text-white dark:hover:text-purple-300">
            Register, Connect & <br /> Make a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6A38C2] to-[#9333ea] hover:from-[#5b30a6] hover:to-[#7928ca] dark:from-[#8A58E2] dark:to-[#b363ff] dark:hover:from-[#9A68F2] dark:hover:to-[#c473ff] transition-all duration-300 animate-gradient">
              Meaningful Impact
            </span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join as a volunteer or find passionate volunteers for your cause.
            Together, we can create change that transforms communities!
          </p>

          {/* Improved search box with seamless button alignment */}
          <div className="flex max-w-2xl mx-auto w-full">
            <div
              className={`flex flex-grow items-center rounded-l-full border border-r-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all overflow-hidden ${isFocused
                ? 'ring-2 ring-purple-400 dark:ring-purple-500 border-transparent'
                : 'border-gray-200 dark:border-gray-700 group-hover:border-purple-200 dark:group-hover:border-purple-700'
                }`}
            >
              <input
                type="text"
                placeholder="Search for volunteer opportunities or register as a volunteer"
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="py-4 px-6 bg-transparent dark:placeholder-gray-400 dark:text-white outline-none border-none w-full"
              />
            </div>
            <Button
              onClick={searchJobHandler}
              className={`rounded-r-full h-auto py-4 px-6 bg-gradient-to-r from-[#6A38C2] to-[#9333ea] dark:from-[#7A48D2] dark:to-[#a343fa] text-white hover:opacity-95 transition-all hover:shadow-md hover:shadow-purple-300/20 dark:hover:shadow-purple-900/30 -ml-px ${isFocused ? 'ring-2 ring-purple-400 ring-l-0 dark:ring-purple-500' : ''
                }`}
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>

          {/* Enhanced decorative circles */}
          <div className="absolute top-1/3 left-24 w-6 h-6 rounded-full bg-purple-600/80 dark:bg-purple-500/60 opacity-70 animate-bounce"></div>
          <div className="absolute bottom-1/4 right-32 w-4 h-4 rounded-full bg-orange-500/80 dark:bg-orange-400/60 opacity-70 animate-ping"></div>
          <div className="absolute top-2/3 right-1/4 w-3 h-3 rounded-full bg-pink-500/80 dark:bg-pink-400/60 opacity-70 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
