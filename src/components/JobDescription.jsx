import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

// Mock job data (matching the IDs from useGetAllJobs.jsx mock data)
const mockJobsDetails = {
    "job1": {
        _id: "job1",
        title: "Full Stack Developer",
        description: "We're looking for a talented Full Stack Developer to join our team. You'll be responsible for developing and maintaining web applications, working with both front-end and back-end technologies.",
        location: "New York, NY",
        jobType: "Full-Time",
        position: 5,
        salary: "120k - 150k",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        company: {
            _id: "comp1",
            name: "TechNova Solutions",
            logo: "https://ui-avatars.com/api/?name=TechNova&background=6A38C2&color=fff",
            description: "TechNova Solutions is a leading software development company specializing in web and mobile applications. We work with clients across various industries to build innovative digital solutions."
        },
        applications: [],
        requirements: [
            "3+ years of experience in full-stack development",
            "Proficiency in JavaScript, TypeScript, and React",
            "Experience with Node.js, Express, and database technologies",
            "Understanding of RESTful APIs and microservices architecture",
            "Knowledge of CI/CD pipelines and DevOps practices"
        ],
        responsibilities: [
            "Develop and maintain web applications using React and Node.js",
            "Collaborate with the design team to implement user interfaces",
            "Write clean, maintainable, and efficient code",
            "Optimize applications for maximum speed and scalability",
            "Participate in code reviews and provide constructive feedback"
        ]
    },
    "job2": {
        _id: "job2",
        title: "Frontend React Developer",
        description: "Join our team as a Frontend React Developer to build beautiful and responsive user interfaces. You'll work closely with designers and backend developers to create seamless user experiences.",
        location: "Remote",
        jobType: "Contract",
        position: 3,
        salary: "90k - 110k",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        company: {
            _id: "comp2",
            name: "Webify",
            logo: "https://ui-avatars.com/api/?name=Webify&background=F83002&color=fff",
            description: "Webify is a digital agency focused on creating modern websites and web applications. We help businesses establish a strong online presence through cutting-edge web technologies."
        },
        applications: [],
        requirements: [
            "2+ years of experience with React and modern JavaScript",
            "Strong understanding of responsive design principles",
            "Experience with state management libraries like Redux",
            "Knowledge of modern build tools (Webpack, Vite, etc.)",
            "Eye for design and attention to detail"
        ],
        responsibilities: [
            "Implement responsive UI components using React",
            "Optimize application performance and loading times",
            "Ensure cross-browser compatibility and accessibility",
            "Collaborate with backend developers to integrate APIs",
            "Stay updated with the latest frontend trends and best practices"
        ]
    },
    "job3": {
        _id: "job3",
        title: "UX/UI Designer",
        description: "We're seeking a creative UX/UI Designer to join our product team. You'll be responsible for designing intuitive user interfaces and experiences for our web and mobile applications.",
        location: "San Francisco, CA",
        jobType: "Full-Time",
        position: 2,
        salary: "100k - 130k",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        company: {
            _id: "comp3",
            name: "DesignMasters",
            logo: "https://ui-avatars.com/api/?name=DesignMasters&background=0ea5e9&color=fff",
            description: "DesignMasters is a creative studio specializing in user experience and interface design. We create beautiful, functional, and user-centered designs for digital products."
        },
        applications: [],
        requirements: [
            "3+ years of experience in UX/UI design",
            "Proficiency in design tools like Figma or Sketch",
            "Strong portfolio demonstrating your design process",
            "Understanding of user research and usability testing",
            "Knowledge of design systems and component libraries"
        ],
        responsibilities: [
            "Create wireframes, mockups, and interactive prototypes",
            "Conduct user research and usability testing",
            "Develop and maintain design systems",
            "Collaborate with product managers and developers",
            "Advocate for user-centered design principles"
        ]
    },
    "job4": {
        _id: "job4",
        title: "Backend Developer (Node.js)",
        description: "Looking for an experienced Backend Developer with strong Node.js skills. You'll be working on our core API services, database design, and server infrastructure.",
        location: "Austin, TX",
        jobType: "Full-Time",
        position: 4,
        salary: "110k - 140k",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        company: {
            _id: "comp4",
            name: "ServerLogic",
            logo: "https://ui-avatars.com/api/?name=ServerLogic&background=10b981&color=fff",
            description: "ServerLogic specializes in building robust backend systems and APIs. We provide the technical foundation for digital products across various industries."
        },
        applications: [],
        requirements: [
            "3+ years of experience with Node.js and Express",
            "Proficiency in database design and management (SQL and NoSQL)",
            "Experience with RESTful API development",
            "Knowledge of authentication and authorization mechanisms",
            "Understanding of cloud services (AWS, GCP, or Azure)"
        ],
        responsibilities: [
            "Design and implement scalable APIs",
            "Manage database schemas and optimize queries",
            "Implement security best practices",
            "Write comprehensive tests for backend functionality",
            "Monitor and optimize application performance"
        ]
    },
    "job5": {
        _id: "job5",
        title: "DevOps Engineer",
        description: "Join our infrastructure team as a DevOps Engineer. You'll be responsible for maintaining and improving our CI/CD pipelines, cloud infrastructure, and monitoring systems.",
        location: "Seattle, WA",
        jobType: "Full-Time",
        position: 2,
        salary: "130k - 160k",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        company: {
            _id: "comp5",
            name: "CloudNine Systems",
            logo: "https://ui-avatars.com/api/?name=CloudNine&background=7c3aed&color=fff",
            description: "CloudNine Systems is a cloud infrastructure company focused on helping businesses deploy and scale their applications efficiently in the cloud."
        },
        applications: [],
        requirements: [
            "3+ years of experience in DevOps or SRE roles",
            "Experience with cloud platforms (AWS, GCP, or Azure)",
            "Proficiency with infrastructure as code tools (Terraform, CloudFormation)",
            "Knowledge of containerization and orchestration (Docker, Kubernetes)",
            "Experience with CI/CD tools (Jenkins, GitHub Actions, GitLab CI)"
        ],
        responsibilities: [
            "Design and implement CI/CD pipelines",
            "Manage and optimize cloud infrastructure",
            "Set up monitoring and alerting systems",
            "Troubleshoot infrastructure issues",
            "Implement security best practices and automation"
        ]
    },
    "job6": {
        _id: "job6",
        title: "Mobile App Developer (React Native)",
        description: "We're looking for a React Native developer to help us build cross-platform mobile applications. You should have experience with React Native, JavaScript, and mobile app development.",
        location: "Chicago, IL",
        jobType: "Part-Time",
        position: 1,
        salary: "80k - 100k",
        createdAt: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000).toISOString(),
        company: {
            _id: "comp6",
            name: "MobileFusion",
            logo: "https://ui-avatars.com/api/?name=MobileFusion&background=f59e0b&color=fff",
            description: "MobileFusion specializes in developing innovative mobile applications. We create engaging, user-friendly apps for both iOS and Android platforms using React Native."
        },
        applications: [],
        requirements: [
            "2+ years of experience with React Native",
            "Understanding of iOS and Android development principles",
            "Experience with state management in React Native",
            "Knowledge of mobile UI/UX best practices",
            "Familiarity with native modules and third-party libraries"
        ],
        responsibilities: [
            "Develop cross-platform mobile applications using React Native",
            "Ensure consistent behavior across iOS and Android platforms",
            "Optimize app performance and responsiveness",
            "Implement clean and maintainable code",
            "Collaborate with the design team to implement user interfaces"
        ]
    },
    "job7": {
        _id: "job7",
        title: "Data Scientist",
        description: "We're seeking a Data Scientist to join our analytics team. You'll work on extracting insights from large datasets, building predictive models, and presenting data-driven recommendations.",
        location: "Boston, MA",
        jobType: "Full-Time",
        position: 3,
        salary: "125k - 150k",
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        company: {
            _id: "comp7",
            name: "DataMinds",
            logo: "https://ui-avatars.com/api/?name=DataMinds&background=ef4444&color=fff",
            description: "DataMinds is a data analytics company that helps businesses make data-driven decisions. We specialize in predictive modeling, machine learning, and data visualization."
        },
        applications: [],
        requirements: [
            "3+ years of experience in data science or related field",
            "Proficiency in Python and data analysis libraries",
            "Experience with machine learning frameworks",
            "Strong statistical and mathematical background",
            "Excellent data visualization and communication skills"
        ],
        responsibilities: [
            "Analyze large datasets to identify patterns and trends",
            "Develop predictive models and algorithms",
            "Create data visualizations and dashboards",
            "Present findings and recommendations to stakeholders",
            "Collaborate with engineering teams to implement models"
        ]
    },
    "job8": {
        _id: "job8",
        title: "Product Manager",
        description: "Join our product team as a Product Manager. You'll be responsible for defining product strategy, roadmap, and working closely with engineering, design, and marketing teams.",
        location: "Denver, CO",
        jobType: "Full-Time",
        position: 1,
        salary: "115k - 140k",
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        company: {
            _id: "comp8",
            name: "ProductPioneers",
            logo: "https://ui-avatars.com/api/?name=ProductPioneers&background=8b5cf6&color=fff",
            description: "ProductPioneers helps businesses bring innovative products to market. We specialize in product strategy, development, and launch."
        },
        applications: [],
        requirements: [
            "3+ years of experience in product management",
            "Strong understanding of product development lifecycle",
            "Experience with agile development methodologies",
            "Excellent analytical and problem-solving skills",
            "Strong communication and leadership abilities"
        ],
        responsibilities: [
            "Define product vision, strategy, and roadmap",
            "Gather and prioritize requirements",
            "Work closely with engineering and design teams",
            "Analyze market trends and competitive landscape",
            "Track and report on key product metrics"
        ]
    }
};

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            // Mock the API response
            setIsApplied(true); // Update the local state
            const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
            dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
            toast.success("Successfully applied for this job!");
        } catch (error) {
            console.log(error);
            toast.error("Failed to apply for this job. Please try again.");
        }
    }

    useEffect(() => {
        // Use the mock data instead of API call
        console.log("Using mock job data for job description");
        if (mockJobsDetails[jobId]) {
            dispatch(setSingleJob(mockJobsDetails[jobId]));
            setIsApplied(mockJobsDetails[jobId].applications.some(application =>
                application.applicant === user?._id
            ));
        } else {
            toast.error("Job not found");
        }
    }, [jobId, dispatch, user?._id]);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col transition-colors duration-300">
            <Navbar />

            <div className="max-w-7xl mx-auto w-full px-4 py-8 mb-auto">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-purple-100 dark:border-purple-900/30">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="font-bold text-2xl text-gray-800 dark:text-white mb-2">{singleJob?.title}</h1>
                            <div className="flex flex-wrap items-center gap-2">
                                {singleJob?.position && (
                                    <Badge className="text-blue-700 dark:text-blue-300 font-medium bg-blue-50 dark:bg-blue-900/30 border-blue-100 dark:border-blue-800" variant="outline">
                                        {singleJob?.position} Positions
                                    </Badge>
                                )}
                                {singleJob?.jobType && (
                                    <Badge className="text-orange-700 dark:text-orange-300 font-medium bg-orange-50 dark:bg-orange-900/30 border-orange-100 dark:border-orange-800" variant="outline">
                                        {singleJob?.jobType}
                                    </Badge>
                                )}
                                {singleJob?.salary && (
                                    <Badge className="text-purple-700 dark:text-purple-300 font-medium bg-purple-50 dark:bg-purple-900/30 border-purple-100 dark:border-purple-800" variant="outline">
                                        {singleJob?.salary}
                                    </Badge>
                                )}
                                {singleJob?.location && (
                                    <Badge className="text-green-700 dark:text-green-300 font-medium bg-green-50 dark:bg-green-900/30 border-green-100 dark:border-green-800" variant="outline">
                                        {singleJob?.location}
                                    </Badge>
                                )}
                            </div>
                        </div>
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`rounded-xl px-6 ${isApplied ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-[#6A38C2] to-[#9333ea] dark:from-[#7A48D2] dark:to-[#a343fa] hover:shadow-lg hover:shadow-purple-300/30 dark:hover:shadow-purple-900/30'}`}
                        >
                            {isApplied ? 'Already Applied' : 'Apply Now'}
                        </Button>
                    </div>

                    {/* Company Info */}
                    {singleJob?.company && (
                        <div className="flex items-start gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg mb-6 border border-purple-100 dark:border-purple-900/30">
                            <div className="p-0.5 rounded-xl bg-gradient-to-br from-purple-200 to-orange-100 dark:from-purple-700 dark:to-orange-900 shadow-sm">
                                <div className="h-16 w-16 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                                    <img
                                        src={singleJob.company.logo || `https://ui-avatars.com/api/?name=${singleJob.company.name}&background=6A38C2&color=fff`}
                                        alt={singleJob.company.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                            <div>
                                <h2 className="font-bold text-lg text-gray-800 dark:text-white">{singleJob.company.name}</h2>
                                <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
                                    {singleJob.company.description || "A leading company in its industry."}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Job Description */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                            Job Description
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                            {singleJob?.description}
                        </p>
                    </div>

                    {/* Requirements */}
                    {singleJob?.requirements && (
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                                Requirements
                            </h2>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                {singleJob.requirements.map((req, index) => (
                                    <li key={index}>{req}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Responsibilities */}
                    {singleJob?.responsibilities && (
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                                Responsibilities
                            </h2>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                {singleJob.responsibilities.map((resp, index) => (
                                    <li key={index}>{resp}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Apply Button (bottom) */}
                    <div className="mt-6 flex justify-center">
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`rounded-xl px-8 py-6 text-lg ${isApplied ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-[#6A38C2] to-[#9333ea] dark:from-[#7A48D2] dark:to-[#a343fa] hover:shadow-lg hover:shadow-purple-300/30 dark:hover:shadow-purple-900/30'}`}
                        >
                            {isApplied ? 'You have already applied' : 'Apply for this position'}
                        </Button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default JobDescription