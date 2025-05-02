import { setAllJobs } from '@/redux/jobSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Mock job data
const mockJobs = [
    {
        _id: "job1",
        title: "Full Stack Developer",
        description: "We're looking for a talented Full Stack Developer to join our team. You'll be responsible for developing and maintaining web applications, working with both front-end and back-end technologies.",
        location: "New York, NY",
        jobType: "Full-Time",
        position: 5,
        salary: "120k - 150k",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        company: {
            _id: "comp1",
            name: "TechNova Solutions",
            logo: "https://ui-avatars.com/api/?name=TechNova&background=6A38C2&color=fff"
        },
        applications: []
    },
    {
        _id: "job2",
        title: "Frontend React Developer",
        description: "Join our team as a Frontend React Developer to build beautiful and responsive user interfaces. You'll work closely with designers and backend developers to create seamless user experiences.",
        location: "Remote",
        jobType: "Contract",
        position: 3,
        salary: "90k - 110k",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        company: {
            _id: "comp2",
            name: "Webify",
            logo: "https://ui-avatars.com/api/?name=Webify&background=F83002&color=fff"
        },
        applications: []
    },
    {
        _id: "job3",
        title: "UX/UI Designer",
        description: "We're seeking a creative UX/UI Designer to join our product team. You'll be responsible for designing intuitive user interfaces and experiences for our web and mobile applications.",
        location: "San Francisco, CA",
        jobType: "Full-Time",
        position: 2,
        salary: "100k - 130k",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        company: {
            _id: "comp3",
            name: "DesignMasters",
            logo: "https://ui-avatars.com/api/?name=DesignMasters&background=0ea5e9&color=fff"
        },
        applications: []
    },
    {
        _id: "job4",
        title: "Backend Developer (Node.js)",
        description: "Looking for an experienced Backend Developer with strong Node.js skills. You'll be working on our core API services, database design, and server infrastructure.",
        location: "Austin, TX",
        jobType: "Full-Time",
        position: 4,
        salary: "110k - 140k",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        company: {
            _id: "comp4",
            name: "ServerLogic",
            logo: "https://ui-avatars.com/api/?name=ServerLogic&background=10b981&color=fff"
        },
        applications: []
    },
    {
        _id: "job5",
        title: "DevOps Engineer",
        description: "Join our infrastructure team as a DevOps Engineer. You'll be responsible for maintaining and improving our CI/CD pipelines, cloud infrastructure, and monitoring systems.",
        location: "Seattle, WA",
        jobType: "Full-Time",
        position: 2,
        salary: "130k - 160k",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
        company: {
            _id: "comp5",
            name: "CloudNine Systems",
            logo: "https://ui-avatars.com/api/?name=CloudNine&background=7c3aed&color=fff"
        },
        applications: []
    },
    {
        _id: "job6",
        title: "Mobile App Developer (React Native)",
        description: "We're looking for a React Native developer to help us build cross-platform mobile applications. You should have experience with React Native, JavaScript, and mobile app development.",
        location: "Chicago, IL",
        jobType: "Part-Time",
        position: 1,
        salary: "80k - 100k",
        createdAt: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000).toISOString(), // 12 hours ago
        company: {
            _id: "comp6",
            name: "MobileFusion",
            logo: "https://ui-avatars.com/api/?name=MobileFusion&background=f59e0b&color=fff"
        },
        applications: []
    },
    {
        _id: "job7",
        title: "Data Scientist",
        description: "We're seeking a Data Scientist to join our analytics team. You'll work on extracting insights from large datasets, building predictive models, and presenting data-driven recommendations.",
        location: "Boston, MA",
        jobType: "Full-Time",
        position: 3,
        salary: "125k - 150k",
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
        company: {
            _id: "comp7",
            name: "DataMinds",
            logo: "https://ui-avatars.com/api/?name=DataMinds&background=ef4444&color=fff"
        },
        applications: []
    },
    {
        _id: "job8",
        title: "Product Manager",
        description: "Join our product team as a Product Manager. You'll be responsible for defining product strategy, roadmap, and working closely with engineering, design, and marketing teams.",
        location: "Denver, CO",
        jobType: "Full-Time",
        position: 1,
        salary: "115k - 140k",
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
        company: {
            _id: "comp8",
            name: "ProductPioneers",
            logo: "https://ui-avatars.com/api/?name=ProductPioneers&background=8b5cf6&color=fff"
        },
        applications: []
    }
];

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);

    useEffect(() => {
        // Instead of fetching from API, use our mock data
        console.log("Using mock job data instead of API call");
        dispatch(setAllJobs(mockJobs));
    }, [dispatch]);
}

export default useGetAllJobs