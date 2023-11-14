import { Link } from "react-router-dom";
import React from "react";

const Navbar: React.FC = () => {
    const name = localStorage.getItem('name');

    return (
                <div className="bg-[#292F36] p-3 flex justify-between items-center text-white h-[14vh]">
                    <div className="w-[50%] flex justify-between items-center ">
                        <Link to="/">
                            <img className="w-[20%]" src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/b1tilpbjhinz59bfvl1j.png" alt="logo" />
                        </Link>
                    </div>
                    <div className=" flex justify-between ">
                    {/* <Link
                            to="/dashboard"
                            className="nav-link w-[8rem] hover:text-[grey] hover:rounded-full p-1 text-md"
                        >
                            DashBoard
                        </Link>
                        <Link
                            to="/interview"
                            className="nav-link w-[8rem] hover:text-[grey] hover:rounded-full p-1 text-md"
                        >
                            Practice
                        </Link>
                       */}
                        <div className="flex items-center">
                        {name && <h2 className="text-md font-bold text-white">{name}</h2>}
                        <img className=" w-[30%]" src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w43yim49sbekdqbhkvz6.png" alt="" />

                    </div>
                    </div>
                </div>
    );
};

export default Navbar;
