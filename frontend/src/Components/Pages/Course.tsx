import CourseCard from "../Pages/CourseCard";

const courseData = [
  {
    title: "NODE",
    description: "For the Role of a NODE JS Developer",
    image:
      "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/166b87tdcup3asgk5164.png",
  },
  {
    title: "JAVA",
    description: "For the Role of a JAVA Backend Developer",
    image:
      "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/idpaq2e5wgoz5ght3qvb.png",
  },
  {
    title: "MERN",
    description: "For the Role of a MERN Developer",
    image:
      "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/o67ke2nuoawwyh28eulk.png",
  },
];

const Course = () => {
  return (
    <div className="bg-[#119DA4] flex items-center justify-center  min-h-[86vh] ">
      <div className="p-4  grid grid-cols-3 bg-[#119DA4] w-[90%]">
        {courseData.map((card, index) => (
          <div key={index} className="w-[90%] p-4 m-auto ">
            <CourseCard
              title={card.title}
              description={card.description}
              image={card.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;
