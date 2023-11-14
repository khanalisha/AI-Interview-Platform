
import { useNavigate } from "react-router-dom";
const CourseCard = ({ title, description,image}:{
    title: String;
    description: String;
    image: any;
}) => {
    const navigate=useNavigate()
    const handleClick=()=>{
        // navigate(`/role/${title}/interviewpage`)
        navigate(`/interviewpage`)
    }
  return (
    <div className='shadow-lg text-center bg-[#A0DDE6] rounded-lg p-4' >
      <div className='flex items-center justify-center p-5'>
      <img className=' h-40' src={image} alt="" />
      {/* border border-gray-300 */}
      </div>
      <h2 className='text-black md:text-3xl sm:text-2xl text-1xl font-bold'>{title}</h2>
      <p className='p-4 w-[90%] m-auto text-center'>{description}</p>
      <button onClick={handleClick} className="border-2 border-black p-2 rounded-lg bg-[#119DA4] hover:bg-transparent">Start Interview</button>
    </div>
  )
}

export default CourseCard