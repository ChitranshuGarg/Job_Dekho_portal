import { setAllAdminJobs } from '@/redux/jobSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

// Mock admin jobs (reusing the same data from useGetAllJobs.jsx)
const mockAdminJobs = [
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
    }
];

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        // Use mock data instead of API call
        console.log("Using mock admin job data instead of API call");
        dispatch(setAllAdminJobs(mockAdminJobs));
    }, [dispatch]);
}

export default useGetAllAdminJobs