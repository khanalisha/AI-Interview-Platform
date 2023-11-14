import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dashboard");
  };
  return (
    <div className="bg-[#119DA4] flex justify-center items-center min-h-[86vh] ">
      <div className="flex justify-center flex-col px-12 text-8xl font-serif ">
        <p className="text-black text-4xl leading-[60px]">
          "Transform Interviews: <br /> Elevate with AI—Your Success, <br /> Our
          Platform."
        </p>
        <button
          className="h-[40px] text-xl bg-[#292F36] hover hover:bg-[grey] hover:text-[black] mt-[20px] text-white w-[130px]"
          onClick={handleClick}
        >
          Try it free
        </button>
      </div>

      <div className="flex justify-center items-center w-[50%]">
        <img
          className="rounded-3xl w-[100%]"
          src="https://blog.talview.com/hs-fs/hubfs/AI_V.png?width=842&name=AI_V.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default HomePage;
