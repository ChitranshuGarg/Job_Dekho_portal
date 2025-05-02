import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import { ChevronRight, ChevronLeft } from "lucide-react";

const categories = [
  {
    name: "Community Outreach",
    icon: "👥",
    color: "from-blue-500 to-cyan-400",
  },
  {
    name: "Event Support",
    icon: "🎪",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Fundraising",
    icon: "💰",
    color: "from-yellow-500 to-amber-500",
  },
  {
    name: "Disaster Relief",
    icon: "🆘",
    color: "from-red-500 to-orange-500",
  },
  {
    name: "Mentorship",
    icon: "🧠",
    color: "from-green-500 to-emerald-400",
  },
  {
    name: "Environmental",
    icon: "🌱",
    color: "from-emerald-500 to-teal-400",
  },
  {
    name: "Education",
    icon: "📚",
    color: "from-indigo-500 to-blue-500",
  },
  {
    name: "Healthcare",
    icon: "🏥",
    color: "from-rose-500 to-pink-500",
  },
  {
    name: "Social Justice",
    icon: "⚖️",
    color: "from-violet-500 to-purple-500",
  },
  {
    name: "Elderly Care",
    icon: "👵",
    color: "from-amber-500 to-orange-400",
  },
  {
    name: "Youth Programs",
    icon: "👶",
    color: "from-sky-500 to-blue-400",
  },
  {
    name: "Animal Welfare",
    icon: "🐾",
    color: "from-lime-500 to-green-400",
  },
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const animationRef = useRef(null);

  // Adjust card width for larger cards (displaying only 4 at a time)
  const cardWidth = 300; // Increased from 260 to make cards larger

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    // Show left arrow if not at the beginning
    setShowLeftArrow(scrollLeft > 20);
    // Show right arrow if not at the end
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current) return;

    const targetScroll = scrollContainerRef.current.scrollLeft + cardWidth * 2;
    smoothScrollTo(targetScroll);
  };

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;

    const targetScroll = scrollContainerRef.current.scrollLeft - cardWidth * 2;
    smoothScrollTo(targetScroll);
  };

  const smoothScrollTo = (targetPosition) => {
    if (!scrollContainerRef.current) return;

    const startPosition = scrollContainerRef.current.scrollLeft;
    const distance = targetPosition - startPosition;
    const duration = 300; // ms
    let startTime = null;

    const animation = (currentTime) => {
      if (!scrollContainerRef.current) return;
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      // Easing function for smoother animation
      const easeInOutCubic = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      scrollContainerRef.current.scrollLeft = startPosition + distance * easeInOutCubic;

      if (timeElapsed < duration) {
        animationRef.current = requestAnimationFrame(animation);
      }
    };

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animation);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const totalWidth = cardWidth * categories.length;
    const scrollSpeed = 0.8; // Reduced for smoother animation

    const scroll = () => {
      if (!scrollContainer || isHovering) return;

      scrollAmount += scrollSpeed;
      if (scrollAmount >= totalWidth) {
        scrollAmount = 0;
      }

      scrollContainer.scrollLeft = scrollAmount;
      handleScroll();
      animationRef.current = requestAnimationFrame(scroll);
    };

    // Start scrolling animation
    animationRef.current = requestAnimationFrame(scroll);

    // Pause scrolling when hovering
    const handleMouseEnter = () => {
      setIsHovering(true);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      animationRef.current = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    scrollContainer.addEventListener('scroll', handleScroll);

    // Touch events for mobile
    scrollContainer.addEventListener('touchstart', handleMouseEnter);
    scrollContainer.addEventListener('touchend', handleMouseLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        scrollContainer.removeEventListener('scroll', handleScroll);
        scrollContainer.removeEventListener('touchstart', handleMouseEnter);
        scrollContainer.removeEventListener('touchend', handleMouseLeave);
      }
    };
  }, [isHovering]);

  return (
    <div className="py-16 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -left-24 bottom-10 w-60 h-60 rounded-full bg-purple-200 dark:bg-purple-900/30 mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70"></div>
      <div className="absolute -right-24 top-10 w-60 h-60 rounded-full bg-orange-200 dark:bg-orange-900/30 mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70"></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold transition-all hover:text-purple-900 dark:hover:text-purple-300">
            Explore Volunteer{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6A38C2] to-[#9333ea] hover:from-[#5b30a6] hover:to-[#7928ca] transition-all duration-300">
              Categories
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
            Discover a variety of volunteer opportunities that align with your skills and passions
          </p>
        </div>

        {/* Automatic scrolling container */}
        <div className="relative">
          {/* Fade effects */}
          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10"></div>

          {/* Left arrow */}
          <button
            onClick={scrollLeft}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md backdrop-blur-sm border border-purple-100 dark:border-purple-900/30 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:scale-110 ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="text-purple-700 dark:text-purple-300" size={26} />
          </button>

          {/* Right arrow */}
          <button
            onClick={scrollRight}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md backdrop-blur-sm border border-purple-100 dark:border-purple-900/30 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:scale-110 ${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            aria-label="Scroll right"
          >
            <ChevronRight className="text-purple-700 dark:text-purple-300" size={26} />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide py-6 no-scrollbar snap-x snap-mandatory justify-between"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth'
            }}
          >
            {/* Duplicate first few items at the end for a seamless loop effect */}
            {categories.concat(categories.slice(0, 4)).map((category, index) => (
              <div
                key={index}
                className="flex-none w-[300px] px-4 snap-start"
              >
                <button
                  onClick={() => searchJobHandler(category.name)}
                  className="group w-full h-52 flex flex-col items-center justify-center rounded-2xl p-6 text-white overflow-hidden relative hover:scale-105 transition-all duration-300 hover:shadow-xl dark:hover:shadow-purple-900/20"
                >
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} group-hover:scale-105 transition-transform duration-500`}></div>

                  {/* Pattern overlay */}
                  <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOHY2QTEyIDEyIDAgMCAxIDMwIDI0aDZ6IiBmaWxsPSIjZmZmZmZmIi8+PC9nPjwvc3ZnPg==')]"></div>

                  {/* Border */}
                  <div className="absolute inset-0.5 rounded-2xl border border-white/10"></div>

                  {/* Animated glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl"></div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="text-6xl mb-5 transform group-hover:scale-110 transition-transform duration-300">{category.icon}</span>
                    <h3 className="font-semibold tracking-wide text-center text-xl">
                      {category.name}
                    </h3>
                    <div className="flex items-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                      <span className="text-sm font-medium">Explore</span>
                      <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom CSS to hide scrollbar
const styleElement = document.createElement('style');
styleElement.textContent = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
document.head.appendChild(styleElement);

export default CategoryCarousel;
