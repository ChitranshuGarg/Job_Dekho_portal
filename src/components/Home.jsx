import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background decorative elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-purple-200/40 dark:bg-purple-900/30 mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-10 w-64 h-64 rounded-full bg-orange-200/30 dark:bg-orange-900/20 mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-200/30 dark:bg-blue-900/20 mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      <Navbar />

      <main className="flex-grow">
        <section className="relative min-h-[90vh] flex flex-col justify-center">
          <HeroSection />
        </section>

        <section id="categories-section" className="py-12">
          <CategoryCarousel />
        </section>

        <section className="relative">
          {/* Background decorative element */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 dark:from-purple-900/10 to-white/0 dark:to-gray-900/0 -z-10"></div>

          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Latest <span className="text-gradient">Opportunities</span>
            </h2>
            <LatestJobs />
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto glass-effect dark:bg-gray-800/50 rounded-3xl p-10 overflow-hidden relative">
            {/* Enhanced decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-200 dark:from-purple-700/30 to-transparent -mr-20 -mt-20 rounded-full opacity-70"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-orange-200 dark:from-orange-700/30 to-transparent -ml-20 -mb-20 rounded-full opacity-70"></div>

            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-10 right-1/4 w-2 h-2 bg-purple-400 dark:bg-purple-500 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-10 left-1/3 w-3 h-3 bg-orange-400 dark:bg-orange-500 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
            </div>

            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-bold mb-4 dark:text-white">Ready to Make a Difference?</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Join our community of volunteers and organizations dedicated to creating positive change.
                Whether you're looking to contribute your skills or find passionate volunteers for your cause,
                ComConnect is here to help you make a meaningful impact.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={() => navigate('/signup')}
                  className="btn-gradient px-6 py-3 rounded-xl font-medium transform hover:scale-105 transition-all duration-300"
                >
                  Sign Up as Volunteer
                </button>
                <button
                  onClick={() => navigate('/jobs')}
                  className="px-6 py-3 rounded-xl font-medium bg-white dark:bg-gray-700 border border-purple-200 dark:border-purple-600 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-gray-600 transition-colors transform hover:scale-105 duration-300"
                >
                  Browse Opportunities
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home