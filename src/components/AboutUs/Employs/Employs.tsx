import ef from "../../../assets/images/ef.png";
import ef2 from "../../../assets/images/ef2.png";
import ef5 from "../../../assets/images/ef5.png";
import ef7 from "../../../assets/images/ef7.png";
import ef8 from "../../../assets/images/ef8.png";
import ef9 from "../../../assets/images/ef9.png";
import "./Employs.scss";

export const Employs = () => {
  const employs = [
    {
      image: ef,
      firstname: "Sarah",
      lastname: "Johnson",
      title: "Dr.",
      role: "Paleontologist and Chief Content Officer",
      description:
        "Dr. Johnson leads our team of experts in curating and creating captivating content about dinosaurs and prehistoric life. With her extensive experience in paleontology and science communication, she ensures that JurassicJungle.com remains a trusted source of accurate and engaging information.",
    },
    {
      image: ef2,
      firstname: "Emily",
      lastname: "Chen",
      role: "Community Manager",
      description:
        "Emily is responsible for fostering a vibrant and inclusive community of dinosaur enthusiasts on JurassicJungle.com. She moderates forums, organizes events, and facilitates discussions to encourage interaction and collaboration among members of our global community.",
    },
    {
      image: "https://xsgames.co/randomusers/assets/avatars/male/70.jpg",
      firstname: "David",
      lastname: "Rodriguez",
      role: "Web Developer",
      description:
        "David is the mastermind behind the technical aspects of JurassicJungle.com. From designing user-friendly interfaces to implementing innovative features, he ensures that our website provides a seamless and immersive experience for visitors of all ages.",
    },
    {
      image: "https://xsgames.co/randomusers/assets/avatars/female/56.jpg",
      firstname: "Laura",
      lastname: "Williams",
      role: "Graphic Designer",
      description:
        "Laura brings dinosaurs to life through her stunning illustrations and graphics on JurassicJungle.com. Her creative vision and attention to detail enhance the visual appeal of our content, captivating audiences and sparking curiosity about prehistoric creatures.",
    },
    {
      image: "https://xsgames.co/randomusers/assets/avatars/male/69.jpg",
      firstname: "Michael",
      lastname: "Thompson",
      role: "Research Analyst",
      description:
        "Michael is dedicated to staying at the forefront of paleontological research and discoveries. He keeps JurassicJungle.com updated with the latest scientific insights and findings, ensuring that our content remains relevant and informative for our audience.",
    },
    {
      image: ef5,
      firstname: "Anna",
      lastname: "Martinez",
      title: "Prof.",
      role: "Contributing Author",
      description:
        "Prof. Martinez is a renowned paleontologist and author who contributes her expertise to JurassicJungle.com. With a passion for sharing knowledge and engaging storytelling, she enriches our content with insightful articles and fascinating discoveries from the world of paleontology.",
    },
    {
      image: "https://xsgames.co/randomusers/assets/avatars/male/68.jpg",
      firstname: "James",
      lastname: "Thompson",
      role: "Social Media Manager",
      description:
        "James oversees our social media presence, spreading the word about JurassicJungle.com and engaging with our audience across various platforms. Through strategic campaigns and engaging content, he helps grow our community and foster meaningful interactions with dinosaur enthusiasts worldwide.",
    },
    {
      image: ef7,
      firstname: "Emily",
      lastname: "Garcia",
      role: "Educational Outreach Coordinator",
      description:
        "Emily is responsible for developing educational resources and outreach programs to engage students, educators, and schools with JurassicJungle.com. Through workshops, presentations, and curriculum development, she promotes science literacy and inspires the next generation of paleontologists.",
    },
    {
      image: ef8,
      firstname: "Sophia",
      lastname: "Lee",
      role: "Marketing Manager",
      description:
        "Sophia is responsible for developing and implementing marketing strategies to promote JurassicJungle.com. Through targeted campaigns and initiatives, she increases brand visibility and drives user engagement, attracting new visitors and expanding our community of dinosaur enthusiasts.",
    },
    {
      image: "https://xsgames.co/randomusers/assets/avatars/male/45.jpg",
      firstname: "Jack",
      lastname: "Robinson",
      role: "Content Editor",
      description:
        "Jack ensures the accuracy and quality of content on JurassicJungle.com. With meticulous attention to detail and a keen eye for storytelling, he edits articles and reviews research findings to deliver informative and engaging content that captivates our audience and enhances their understanding of dinosaurs and prehistoric life.",
    },
    {
      image: ef9,
      firstname: "Natalie",
      lastname: "Wong",
      role: "Customer Support Specialist",
      description:
        "Natalie provides exceptional customer support to visitors of JurassicJungle.com. With her friendly demeanor and expertise in addressing inquiries and resolving issues, she ensures a seamless user experience and fosters positive interactions with our audience, building trust and loyalty within our community.",
    },
  ];

  return (
    <div className="employs__main__container">
      <h2>Meet Our Team</h2>
      <div className="card__employ__container">
        {employs.map((employ, index) => (
          <div key={index} className="card__employ">
            <div
              style={{
                backgroundImage: `url(${employ.image})`,
              }}
              className="card__employ__image__container"
            ></div>
            <div className="card__employ__text__container">
              <h5 className="card__employ__name">
                {employ?.title} {employ.firstname} {employ.lastname}
              </h5>
              <span className="card__employ__role">{employ.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
