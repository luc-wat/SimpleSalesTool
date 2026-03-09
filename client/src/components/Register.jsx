import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validator from "validator";
import ErrorAlert from "./ErrorAlert";

const Register = () => {
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (data) => {
        try {
            setError(null);

            if (!validator.isEmail(data.email)) {
                throw new Error("Please enter a valid email address");
            }
            if (!validator.isLength(data.password, { min: 6 })) {
                throw new Error("Password must be at least 6 characters long");
            }

            const res = await axios.post("http://localhost:8080/register", {
                "email": data.email,
                "password": data.password
            });

            if (res.status === 200) {
                navigate("/home");
            } else {
                throw new Error(res.body);
            }
        } catch (err) {
            console.error(err.message);
            setError(`Failed to register. Please try again.\n${err.message}`);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div>
            <div className="fixed inset-0 flex items-center
                            justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg
                                shadow-lg p-6 max-w-md
                                w-full relative">
                    {error && <ErrorAlert error={error} />}
                    <h2 className="text-lg font-bold">Submit Your Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm">Email</label>
                        <input
                            className="w-full px-3 py-2
                                    border rounded-lg"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm">Password</label>
                        <input
                            className="w-full px-3
                                    py-2 border rounded-lg"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-500
                                text-white rounded-lg"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        className="ml-2 px-4 py-2 bg-green-500
                                text-white rounded-lg"
                        onClick={() => navigate("/")}
                    >
                        Back
                    </button>
                </form>
                </div>
            </div>
        </div>
    );
}

export default Register;