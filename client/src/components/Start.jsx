import { useNavigate } from "react-router-dom";
import Banner from "./Banner";

const Start = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Banner />
            <div className="min-h-screen bg-white flex-grow justify-center items-center p-4">
            <button onClick={() => navigate("/register")} className="ml-10 p-10 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-small cursor-pointer">
                Register
            </button>
            <button onClick={() => navigate("/login")} className="ml-10 p-10 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-small cursor-pointer">
                Login
            </button>
            </div>
      </div>
    )
}

export default Start;