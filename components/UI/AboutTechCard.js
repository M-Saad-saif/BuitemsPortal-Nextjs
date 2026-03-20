import React from "react";
import './AboutTechCard.css'

const About_Cards = [
  {
    id: "1",
    icon: "https://cdn-icons-png.flaticon.com/512/10464/10464776.png",
    title: "Secure Student Portal",
    desc: "JWT authentication, profile management, and personal academic records storage.",
  },
  {
    id: "2",
    icon: "https://cdn-icons-png.flaticon.com/512/2374/2374370.png",
    title: "GPA Calculator",
    desc: "Calculate semester GPA .",
  },
  {
    id: "3",
    icon: "https://cdn-icons-png.flaticon.com/512/3466/3466264.png",
    title: "CGPA Calculator",
    desc: "Track cumulative GPA across multiple semesters.",
  },
  {
    id: "4",
    icon: "https://cdn-icons-png.flaticon.com/512/15838/15838894.png",
    title: "Aggregate Calculator",
    desc: "Calculate admission aggregate using Matric + FSc + Entry Test formula.",
  },
  {
    id: "5",
    icon: "https://cdn-icons-png.flaticon.com/512/888/888034.png",
    title: "Front Page Generator",
    desc: "4 professional assignment front page templates with instant PDF export.",
  },
  {
    id: "6",
    icon: "https://cdn-icons-png.flaticon.com/512/3269/3269691.png",
    title: "Timetable",
    desc: "Interactive weekly class schedule that you can customise.",
  },
  {
    id: "7",
    icon: "https://cdn-icons-png.flaticon.com/512/2231/2231492.png",
    title: "Faculties & Departments",
    desc: "Complete listing of all BUITEMS faculties, departments, and programs.",
  },
  {
    id: "8",
    icon: "https://cdn-icons-png.flaticon.com/512/17632/17632037.png",
    title: "AI Study Assistant",
    desc: "Integrated AI chatbot to answer academic queries.",
  },
];

const AboutTechCard = () => {
  return (
    <section className="about-tech-section">
      <div className="About-container mt-[6rem]">
        <header className="header-design">
          <div className="footer-wave"></div>
        </header>
        <div className="pset">
          <div className="container">
            <div className="row listar-feature-items">
              {About_Cards.map((item) => (
                <div
                  key={item.id}
                  className="col-xs-12 col-sm-6 col-md-4 col-lg-3 listar-feature-item-wrapper listar-feature-with-image listar-height-changed"
                  data-aos="fade-zoom-in"
                  data-aos-group="features"
                  data-line-height="25.2px"
                >
                  <div className="listar-feature-item listar-feature-has-link">
                    <div className="listar-feature-item-inner">
                      <div className="listar-feature-right-border"></div>

                      <div className="listar-feature-block-content-wrapper">
                        <div className="listar-feature-icon-wrapper">
                          <div className="listar-feature-icon-inner">
                            <div>
                              <img
                                alt={item.title}
                                className="listar-image-icon"
                                src={item.icon}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          className="listar-feature-content-wrapper"
                          style={{ paddingTop: "0px" }}
                        >
                          <div className="listar-feature-item-title listar-feature-counter-added items-center">
                            <span>
                              <span>{item.id}</span>
                              <p className="feature-title-text">
                                {item.title}
                              </p>
                            </span>
                          </div>

                          <div className="listar-feature-item-excerpt">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="listar-feature-fix-bottom-padding listar-fix-feature-arrow-button-height"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTechCard;