import { setAllAppliedJobs } from "@/redux/jobSlice";
import { useEffect } from "react"
import { useDispatch } from "react-redux"

// Mock applied jobs
const mockAppliedJobs = [
    {
        _id: "app1",
        applicant: "user123", // This should match the user's ID in the auth store
        job: {
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
                logo: "https://ui-avatars.com/api/?name=TechNova&background=6A38C2&color=fff"
            }
        },
        status: "Applied", // Status can be "Applied", "In Review", "Accepted", "Rejected"
        appliedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
    },
    {
        _id: "app2",
        applicant: "user123",
        job: {
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
                logo: "https://ui-avatars.com/api/?name=DesignMasters&background=0ea5e9&color=fff"
            }
        },
        status: "In Review",
        appliedAt: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000).toISOString() // 12 hours ago
    }
];

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Use mock data instead of API call
        console.log("Using mock applied jobs data instead of API call");
        dispatch(setAllAppliedJobs(mockAppliedJobs));
    }, [dispatch]);
};

export default useGetAppliedJobs;