import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signupIMG } from "../assets";

const SignUp = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    fName: "",
    lName: "",
    userName: "",
    email: "",
    pass: "",
    confirmPass: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const signup = (e) => {
    e.preventDefault();

    if (!user.fName) {
      setError("First Name is Required!");
      return;
    } else if (!user.lName) {
      setError("Last Name is Required!");
      return;
    } else if (!user.userName) {
      setError("Username is Required!");
      return;
    } else if (!user.email) {
      setError("Email is Required!");
      return;
    } else if (!user.pass) {
      setError("Password is Required!");
      return;
    } else if (!user.confirmPass) {
      setError("Please confirm your Password!");
      return;
    }

    createUserWithEmailAndPassword(auth, user.email, user.pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <div className="flex">
      <div className="my-auto hidden md:block md:w-1/2">
        <img src={signupIMG} alt="" />
      </div>

      {/* Signup Form */}
      <form className="md:w-1/2 flex flex-col items-start p-4 px-6 mx-auto gap-6 text-lg">
        <h2 className="mx-auto text-2xl md:text-3xl font-bold">
          Signup to our platform
        </h2>
        <div className="text-red-600"> {error && <p>{error}</p>}</div>
        <div className="w-full flex flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="fName">First Name</label>
            <input
              type="text"
              name="fName"
              value={user.fName}
              onChange={handleChange}
              placeholder="Jhon"
              className="w-[100%] bg-slate-100 py-2 px-4 focus:outline-indigo-500"
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="lName">Last Name</label>
            <input
              type="text"
              name="lName"
              value={user.lName}
              onChange={handleChange}
              placeholder="Doe"
              className="w-[100%] bg-slate-100 py-2 px-4 focus:outline-indigo-500"
            />
          </div>
        </div>
        <div className="w-full flex flex-col items-start gap-2">
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            name="userName"
            value={user.userName}
            onChange={handleChange}
            placeholder="jhon007"
            className="w-[100%] bg-slate-100 py-2 px-4 focus:outline-indigo-500"
          />
        </div>
        <div className="w-full flex flex-col items-start gap-2">
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="jhon@xyz.com"
            className="w-[100%] bg-slate-100 py-2 px-4 focus:outline-indigo-500"
          />
        </div>
        <div className="w-full flex flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="pass">Create Password</label>
            <input
              type="password"
              name="pass"
              value={user.pass}
              onChange={handleChange}
              placeholder="********"
              className="w-[100%] bg-slate-100 py-2 px-4 focus:outline-indigo-500"
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="confirmPass">Confirm Password</label>
            <input
              type="password"
              name="confirmPass"
              value={user.confirmPass}
              onChange={handleChange}
              placeholder="********"
              className={
                !user.confirmPass.length == 0 && user.confirmPass === user.pass
                  ? "w-[100%] bg-slate-100 py-2 px-4 focus:outline-green-500"
                  : "w-[100%] bg-slate-100 py-2 px-4 focus:outline-red-500"
              }
            />
          </div>
        </div>
        <button
          className="w-full bg-indigo-600 px-4 py-2 rounded-md text-lg text-white hover:bg-indigo-800 duration-200 ease-out "
          onClick={signup}
        >
          Signup to our platform
        </button>
        <div className="mx-auto">
          <p>
            Already have an account?{" "}
            <Link
              to="/Login"
              className="text-blue-700 hover:underline duration-200 ease-out"
            >
              Login
            </Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
