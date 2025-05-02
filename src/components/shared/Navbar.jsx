import React, { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X, Moon, Sun } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Track scroll position to add background when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Initialize dark mode from localStorage if available
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
      <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-4 lg:px-6">
        <div className="relative">
          <Link to="/">
            <h1 className="text-2xl font-bold group">
              Com
              <span className="relative text-[#F83002] inline-block">
                <span className="absolute -inset-1 -skew-y-3 bg-purple-100 dark:bg-purple-900/30 -z-10 rounded group-hover:skew-y-3 transition-all duration-300"></span>
                Connect
              </span>
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className={`px-4 py-2 rounded-lg transition-all hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 ${isActive('/admin/companies') ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-semibold' : ''}`}
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className={`px-4 py-2 rounded-lg transition-all hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 ${isActive('/admin/jobs') ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-semibold' : ''}`}
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className={`px-4 py-2 rounded-lg transition-all hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 ${isActive('/') ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-semibold' : ''}`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className={`px-4 py-2 rounded-lg transition-all hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 ${isActive('/jobs') ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-semibold' : ''}`}
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className={`px-4 py-2 rounded-lg transition-all hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 ${isActive('/browse') ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-semibold' : ''}`}
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="flex items-center gap-3">
            {/* Dark mode toggle button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="w-10 h-10 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-amber-500" />
              ) : (
                <Moon className="h-5 w-5 text-purple-700" />
              )}
            </Button>

            {!user ? (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="outline" className="rounded-full border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300 font-medium">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-[#6A38C2] to-[#9333ea] hover:shadow-lg hover:shadow-purple-300/30 dark:hover:shadow-purple-900/30 rounded-full font-medium transition-all">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-500 transition-all shadow-sm">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt={user?.fullname}
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4 border shadow-xl rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                  <div className="">
                    <div className="flex gap-3 items-start">
                      <Avatar className="cursor-pointer border-2 border-purple-200 dark:border-purple-800">
                        <AvatarImage
                          src={user?.profile?.profilePhoto}
                          alt={user?.fullname}
                        />
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-lg">{user?.fullname}</h4>
                        <p className="text-sm text-muted-foreground">
                          {user?.profile?.bio || "No bio added yet"}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col my-3 text-gray-600 dark:text-gray-300">
                      {user && user.role === "student" && (
                        <div className="flex w-fit items-center gap-2 cursor-pointer group">
                          <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 group-hover:bg-purple-600 group-hover:text-white transition-all">
                            <User2 size={16} />
                          </div>
                          <Button variant="link" className="text-gray-700 dark:text-gray-300 font-medium hover:text-purple-700 dark:hover:text-purple-300">
                            <Link to="/profile">View Profile</Link>
                          </Button>
                        </div>
                      )}

                      <div className="flex w-fit items-center gap-2 cursor-pointer mt-2 group">
                        <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                          <LogOut size={16} />
                        </div>
                        <Button onClick={logoutHandler} variant="link" className="text-gray-700 dark:text-gray-300 font-medium hover:text-red-500">
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          {/* Dark mode toggle for mobile */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="w-10 h-10 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-amber-500" />
            ) : (
              <Moon className="h-5 w-5 text-purple-700" />
            )}
          </Button>

          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm py-4 px-4 shadow-md">
          <ul className="flex flex-col font-medium gap-4">
            {user && user.role === "recruiter" ? (
              <>
                <li className="w-full">
                  <Link
                    to="/admin/companies"
                    className={`block py-2 px-3 rounded ${isActive('/admin/companies') ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Companies
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    to="/admin/jobs"
                    className={`block py-2 px-3 rounded ${isActive('/admin/jobs') ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="w-full">
                  <Link
                    to="/"
                    className={`block py-2 px-3 rounded ${isActive('/') ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    to="/jobs"
                    className={`block py-2 px-3 rounded ${isActive('/jobs') ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Jobs
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    to="/browse"
                    className={`block py-2 px-3 rounded ${isActive('/browse') ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
            {!user ? (
              <div className="flex flex-col gap-2 mt-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-[#6A38C2] to-[#9333ea]">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3 mt-2 border-t pt-3">
                <Avatar className="cursor-pointer border-2 border-purple-200 dark:border-purple-800">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt={user?.fullname}
                  />
                </Avatar>
                <div>
                  <h4 className="font-medium">{user?.fullname}</h4>
                  {user && user.role === "student" && (
                    <Link
                      to="/profile"
                      className="text-sm text-purple-700 dark:text-purple-300 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      View Profile
                    </Link>
                  )}
                </div>
                <Button
                  onClick={() => {
                    logoutHandler();
                    setMobileMenuOpen(false);
                  }}
                  variant="ghost"
                  size="icon"
                  className="ml-auto text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut size={18} />
                </Button>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
