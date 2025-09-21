import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './HomePage.css';
import softwareImage from '../Images/Image1.jpeg';
import teamPhoto from '../Images/imag2.jpg';
import teamIcon from '../Images/Image3.png';
import qualityIcon from '../Images/Image4.png';
import innovationIcon from '../Images/Image5.png';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      
      <main>
        {/* First part */}
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <h1>Innovative Software For Modern Business</h1>
              <p className="hero-description">
                We build cutting-edge software solutions that help businesses transform, 
                scale and thrive in today's digital landscape. Our expert team delivers 
                tailored applications with exceptional user experience.
              </p>
            </div>
            <div className="hero-image">
              <img src={softwareImage} alt="Modern software interface" />
            </div>
          </div>
        </section>

        <div className="button-group">
            <button className="cta-button primary">Get Started</button>
            <button className="cta-button secondary">Our Services</button>
        </div>
      </main>

      
      {/* Second Part - Updated About Section */}
      <main className="main-content" id="about">
        <section className="about-section">
          <div className="about-header">
            <h2>ABOUT US</h2>
            <h3>A Better Way To Build Software</h3>
          </div>
          
          <div className="about-content">
            {/* Features Section - Updated Layout */}
            <div className="features-container">
              <div className="feature-row">
                <div className="feature-item">
                  <div className="feature-icon">
                    <img src={teamIcon} alt="Expert Team" />
                  </div>
                  <div className="feature-content">
                    <h4>Expert Team</h4>
                    <p>
                      Our team consists of experienced developers, designers, and product managers 
                      who are passionate about creating exceptional software.
                    </p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">
                    <img src={qualityIcon} alt="Quality Focus" />
                  </div>
                  <div className="feature-content">
                    <h4>Quality Focus</h4>
                    <p>
                      We maintain the highest standards of quality in our development process, 
                      ensuring reliable and secure software solutions.
                    </p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">
                    <img src={innovationIcon} alt="Continuous Innovation" />
                  </div>
                  <div className="feature-content">
                    <h4>Continuous Innovation</h4>
                    <p>
                      We stay ahead of the curve by constantly researching and implementing 
                      the latest technologies and methodologies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
             <img src={teamPhoto} alt="TechCorp team" className="team-photo" />
            <div className="mission-vision">
              <div className="mission-card">
                <div className="mv-content">
                  <h4>Mission</h4>
                  <p>
                    At TechCorp, our mission is to empower businesses with innovative software 
                    solutions that solve complex problems and drive digital transformation. 
                    We believe in creating technology that makes a positive impact on 
                    businesses and their customers.
                  </p>
                </div>
              </div>
              
              <div className="vision-card">
                <div className="mv-content">
                  <h4>Vision</h4>
                  <p>
                    We envision a world where businesses of all sizes have access to 
                    cutting-edge technology that helps them thrive in an increasingly 
                    digital landscape. We strive to be at the forefront of this 
                    transformation, leading the way with innovative solutions and 
                    exceptional service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Services Section */}
<section className="services-section" id="services">
  <div className="services-header">
    <h2>SERVICES</h2>
    <h3>Comprehensive Software Solutions</h3>
    <p>We offer a wide range of services to help you transform your business with technology.</p>
  </div>

  <div className="services-grid">
    {/* Service 1 */}
    <div className="service-card">
      <div className="service-icon">
        <div className="icon-circle">💻</div>
      </div>
      <h4>Custom Software Development</h4>
      <p>Tailored software solutions designed to meet your specific business requirements and challenges.</p>
      <a href="#contact" className="service-link">Learn more →</a>
    </div>

    {/* Service 2 */}
    <div className="service-card">
      <div className="service-icon">
        <div className="icon-circle">☁️</div>
      </div>
      <h4>Cloud Solutions</h4>
      <p>Scalable cloud infrastructure and migration services to enhance flexibility and reduce costs.</p>
      <a href="#contact" className="service-link">Learn more →</a>
    </div>

    {/* Service 3 */}
    <div className="service-card">
      <div className="service-icon">
        <div className="icon-circle">📱</div>
      </div>
      <h4>Mobile App Development</h4>
      <p>Native and cross-platform mobile applications with intuitive interfaces and robust functionality.</p>
      <a href="#contact" className="service-link">Learn more →</a>
    </div>

    {/* Service 4 */}
    <div className="service-card">
      <div className="service-icon">
        <div className="icon-circle">📊</div>
      </div>
      <h4>Data Analytics & BI</h4>
      <p>Advanced analytics tools and dashboards to transform your data into actionable insights.</p>
      <a href="#contact" className="service-link">Learn more →</a>
    </div>

    {/* Service 5 */}
    <div className="service-card">
      <div className="service-icon">
        <div className="icon-circle">🗃️</div>
      </div>
      <h4>Database Design & Management</h4>
      <p>Optimized database architectures that ensure data integrity, security, and performance.</p>
      <a href="#contact" className="service-link">Learn more →</a>
    </div>

    {/* Service 6 */}
    <div className="service-card">
      <div className="service-icon">
        <div className="icon-circle">🔒</div>
      </div>
      <h4>Cybersecurity Services</h4>
      <p>Comprehensive security solutions to protect your applications and data from threats.</p>
      <a href="#contact" className="service-link">Learn more →</a>
    </div>
  </div>

  {/* CTA Section */}
  <div className="services-cta">
    <h3>Ready to transform your business?</h3>
    <p>Contact us today to discuss how our software solutions can help you achieve your goals.</p>
    <a href="#contact" className="cta-button primary">Get in touch</a>
  </div>
</section>

{/* Why Choose Us Section */}
<section className="why-choose-us" id="contact">
  <div className="why-choose-header">
    <h2>WHY CHOOSE US</h2>
    <h3>The TechCorp Advantage</h3>
    <p>We bring together expertise, innovation, and dedication to deliver exceptional software solutions.</p>
  </div>

  <div className="why-choose-content">
    {/* What Sets Us Apart */}
    <div className="advantages-section">
      <h4>What Sets Us Apart</h4>
      <div className="advantages-grid">
        <div className="advantage-item">
          <div className="advantage-icon">✅</div>
          <div className="advantage-text">
            <h5>Experienced team of developers and designers</h5>
            <p>Seasoned professionals with years of industry experience</p>
          </div>
        </div>

        <div className="advantage-item">
          <div className="advantage-icon">✅</div>
          <div className="advantage-text">
            <h5>Custom solutions tailored to your specific needs</h5>
            <p>Bespoke software designed for your unique requirements</p>
          </div>
        </div>

        <div className="advantage-item">
          <div className="advantage-icon">✅</div>
          <div className="advantage-text">
            <h5>Agile development methodology for faster delivery</h5>
            <p>Iterative approach ensuring quick and efficient results</p>
          </div>
        </div>

        <div className="advantage-item">
          <div className="advantage-icon">✅</div>
          <div className="advantage-text">
            <h5>Ongoing support and maintenance services</h5>
            <p>Continuous assistance and updates after deployment</p>
          </div>
        </div>

        <div className="advantage-item">
          <div className="advantage-icon">✅</div>
          <div className="advantage-text">
            <h5>Transparent communication throughout the project</h5>
            <p>Regular updates and clear progress tracking</p>
          </div>
        </div>

        
      </div>
    </div>

    {/* Trusted by Companies */}
    <div className="trusted-section">
      <div className="trusted-content">
        <h4>Trusted by Leading Companies</h4>
        <p className="trusted-description">
          From startups to enterprises, we've helped companies across various industries achieve their technology goals.
        </p>
        
        <div className="industries-grid">
          <div className="industry-item">
            <div className="industry-icon">💰</div>
            <span>Finance</span>
          </div>
          <div className="industry-item">
            <div className="industry-icon">🏥</div>
            <span>Healthcare</span>
          </div>
          <div className="industry-item">
            <div className="industry-icon">🛍️</div>
            <span>Retail</span>
          </div>
          <div className="industry-item">
            <div className="industry-icon">🎓</div>
            <span>Education</span>
          </div>
          <div className="industry-item">
            <div className="industry-icon">🏭</div>
            <span>Manufacturing</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      
      <Footer />
    </div>
  );
};

export default HomePage;