import React, { useState, useEffect, useRef, useCallback } from 'react';

// ICONS (inline SVGs to replicate react-icons, as per instructions)
const Star = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const MessageSquare = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

const X = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const InstagramIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const Sparkles = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3L9.27 9.27L3 12l6.27 2.73L12 21l2.73-6.27L21 12l-6.27-2.73z" />
    </svg>
);


// Custom Hook for Mouse Position
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  useEffect(() => {
    const updateMousePosition = ev => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
};


// --- COMPONENTS ---

// 1. Particle Background Component
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = document.body.scrollHeight;
    };
    
    resizeCanvas();
    
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            resizeCanvas();
            init(); 
        }
    });

    resizeObserver.observe(document.body);
    window.addEventListener('resize', resizeCanvas);


    let particles = [];
    const particleCount = Math.floor((canvas.width * canvas.height) / 8000);

    class Particle {
      constructor(x, y) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: -2, background: 'linear-gradient(180deg, #000010, #1a001a)' }} />;
};

// 2. Glowing Pointer Trail
const PointerTrail = () => {
    const { x, y } = useMousePosition();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (x !== null && y !== null) {
            setVisible(true);
        }
    }, [x, y]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            transform: translate(${x}px, ${y}px),
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 0, 255, 0.3), transparent 60%)',
            pointerEvents: 'none',
            zIndex: 9999,
            transition: 'opacity 0.3s, transform 0.05s linear',
            opacity: visible ? 1 : 0,
            filter: 'blur(5px)',
        }} />
    );
};

// 3. Hero Section
const HeroSection = ({ onLaunch }) => {
  const text = "We Are Spheremedia".split("");
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center text-white p-4 relative z-10">
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
        {text.map((char, index) => (
          <span key={index} style={{ animation: fadeInUp 0.5s ${index * 0.05}s both }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-300" style={{ animation: 'fadeInUp 0.5s 0.8s both' }}>
        We are a digital branding and design agency that creates modern visuals, interactive websites, and engaging experiences.
      </p>
      <button 
        onClick={onLaunch}
        className="bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-pink-500/30 hover:scale-105 transform transition-all duration-300 ease-in-out"
        style={{ animation: 'fadeInUp 0.5s 1s both' }}
      >
        Launch Your Brand
      </button>
    </section>
  );
};


// 4. About Section
const AboutSection = () => (
  <section id="about" className="py-20 px-4 text-white relative z-10">
    <div className="container mx-auto max-w-4xl text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
        Our Vision for Design
      </h2>
      <p className="text-lg text-gray-300 leading-relaxed">
        At Spheremedia, we do more than just build websites; we create unique digital experiences. Our team of creative designers and developers is dedicated to helping brands succeed online. We believe a great digital presence should be memorable and easy to use, turning visitors into loyal customers.
      </p>
    </div>
  </section>
);

// 5. Services Section
const ServiceCard = ({ service }) => {
    const [ideas, setIdeas] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerateIdeas = async () => {
        setIsLoading(true);
        setIdeas(null);
        setError('');
        const prompt = You are a creative strategist at a futuristic branding agency. Generate 3 short, innovative, and exciting project ideas for the following service: "${service.title}". Present them as a simple list with each idea on a new line, starting with a sparkle emoji (✨). Keep each idea to one sentence.;
        
        const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
        const payload = { contents: chatHistory };
        const apiKey = ""; // Left empty for runtime injection
        const apiUrl = https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey};

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(API error: ${response.statusText});
            }

            const result = await response.json();
            let resultText = "Could not generate ideas at the moment.";

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
              resultText = result.candidates[0].content.parts[0].text;
            }
            setIdeas(resultText);

        } catch (err) {
            setError('Failed to generate ideas. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-pink-500/50 transition-all duration-300 transform group flex flex-col">
            <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
            <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300 flex-grow">{service.description}</p>
            <button onClick={handleGenerateIdeas} disabled={isLoading} className="mt-4 w-full text-center py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-pink-500/50 text-pink-400 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" /> {isLoading ? 'Generating...' : 'Generate Ideas'}
            </button>
            {ideas && (
                <div className="mt-4 p-4 bg-black/20 rounded-lg border border-white/10">
                    <h4 className="font-bold text-white mb-2">Creative Concepts:</h4>
                    <div className="text-gray-300 whitespace-pre-line text-sm">{ideas}</div>
                </div>
            )}
            {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
        </div>
    );
};

const ServicesSection = () => {
  const services = [
    { title: "Branding", description: "Creating strong brand identities that stand out online." },
    { title: "Web Development", description: "Building fast, beautiful, and reliable websites." },
    { title: "UI/UX Design", description: "Designing user-friendly interfaces that look great and are easy to use." },
    { title: "Content Creation", description: "Creating interesting content and visuals that get attention." },
    { title: "Online Ads", description: "Running effective ad campaigns to reach the right audience." },
    { title: "Social Media Videos", description: "Producing short videos that people love to watch and share." },
  ];

  return (
    <section id="services" className="py-20 px-4 relative z-10">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Portfolio Section
const PortfolioSection = () => {
    const portfolioItems = [
        {
            brand: "Muscletech EAA+ Energy",
            description: "Product campaign design for a new energy and hydration supplement.",
            image: "s1.jpg"
        },
        {
            brand: "Corefuel Whey X",
            description: "Complete branding and packaging design for a premium whey protein.",
            image: "s2.jpg"
        },
        {
            brand: "Nutrimoo Milkshake",
            description: "Vibrant advertising creative for a new line of strawberry milkshakes.",
            image: "s4.jpg"
        },
    ];

    return (
        <section id="work" className="py-20 px-4 relative z-10">
            <div className="container mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    Our Featured Work
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolioItems.map((item, index) => (
                        <div key={index} className="glass-card rounded-2xl border border-white/10 overflow-hidden group transform hover:scale-105 transition-transform duration-300">
                           <img src={item.image} alt={item.brand} className="w-full h-80 object-cover bg-white/5" />
                           <div className="p-6">
                               <h3 className="text-2xl font-bold text-white mb-2">{item.brand}</h3>
                               <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">{item.description}</p>
                           </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    { name: "Rohan Verma, CEO of Corefuel", location: "Delhi, India", review: "Spheremedia's designs for Whey X were phenomenal. They perfectly captured our brand's energy and our sales have skyrocketed!", stars: 5, flag: "🇮🇳" },
    { name: "Emily Carter", location: "Austin, USA", review: "Working with them felt like a glimpse into the next decade of digital design. Truly groundbreaking.", stars: 5, flag: "🇺🇸" },
    { name: "Li Wei", location: "Shanghai, China", review: "Their efficiency and creative vision are unmatched. They delivered a masterpiece.", stars: 4, flag: "🇨🇳" },
    { name: "Chloé Dubois", location: "Paris, France", review: "An absolutely magical experience. Our brand now shines brighter than the Eiffel Tower.", stars: 5, flag: "🇫🇷" },
  ];

  return (
    <section id="testimonials" className="py-20 px-4 relative z-10">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass-card p-6 rounded-2xl border border-white/10 shadow-lg hover:shadow-cyan-500/20 transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4">{testimonial.flag}</span>
                <div>
                  <p className="font-bold text-white text-lg">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">"{testimonial.review}"</p>
              <div className="flex">
                {Array(testimonial.stars).fill(0).map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400" />)}
                {Array(5 - testimonial.stars).fill(0).map((_, i) => <Star key={i} className="w-5 h-5 text-gray-600" />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Form Section with AI Brief Generator
const ContactSection = () => {
    const [formData, setFormData] = useState({ name: '', email: '', keywords: '', description: '' });
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');
    const descriptionRef = useRef(null);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };
    
    useEffect(() => {
        if (formData.description && descriptionRef.current) {
            descriptionRef.current.style.height = 'auto';
            descriptionRef.current.style.height = descriptionRef.current.scrollHeight + 'px';
        }
    }, [formData.description]);

    const handleGenerateBrief = async () => {
        if (!formData.keywords) {
            setError("Please enter some keywords first.");
            setTimeout(() => setError(''), 3000);
            return;
        }
        setIsGenerating(true);
        setError('');
        const prompt = You are a creative director at a futuristic branding agency. Based on the following keywords: "${formData.keywords}", write an inspiring and professional project brief of about 50-70 words that we can present to a potential client. The tone should be confident and forward-thinking.;
        
        const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
        const payload = { contents: chatHistory };
        const apiKey = ""; // Left empty for runtime injection
        const apiUrl = https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey};

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(API error: ${response.statusText});
            
            const result = await response.json();
            let resultText = "Could not generate a brief. Please try again.";

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
              resultText = result.candidates[0].content.parts[0].text;
            }
            setFormData(prev => ({ ...prev, description: resultText }));

        } catch (err) {
            setError('Failed to generate brief. Please try again.');
            console.error(err);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <section id="contact" className="py-20 px-4 relative z-10">
            <div className="container mx-auto max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">Get In Touch</h2>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                        <input type="text" id="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-pink-500 focus:outline-none text-white transition-all duration-300" placeholder="Your Name" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Gmail</label>
                        <input type="email" id="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-pink-500 focus:outline-none text-white transition-all duration-300" placeholder="your.name@gmail.com" />
                    </div>
                    <div>
                        <label htmlFor="keywords" className="block text-sm font-medium text-gray-300 mb-2">Project Keywords</label>
                        <div className="flex flex-col sm:flex-row gap-2">
                           <input type="text" id="keywords" value={formData.keywords} onChange={handleInputChange} className="flex-grow px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-pink-500 focus:outline-none text-white transition-all duration-300" placeholder="e.g., 'new energy drink, gen-z, social media'" />
                           <button type="button" onClick={handleGenerateBrief} disabled={isGenerating} className="sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-pink-500/50 text-pink-400 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                               <Sparkles className="w-4 h-4" /> {isGenerating ? 'Generating...' : 'Generate Brief'}
                           </button>
                        </div>
                        {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Project Description</label>
                        <textarea ref={descriptionRef} id="description" rows="5" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-pink-500 focus:outline-none text-white transition-all duration-300 resize-none overflow-hidden" placeholder="Tell us about your project, or let our AI help!"></textarea>
                    </div>
                    <button type="submit" className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-lg hover:scale-105 transform transition-all duration-300 ease-in-out shadow-lg shadow-violet-500/30">
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
};

// AI Chatbot "Nova" with Gemini API
const NovaChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);


  const initialMessage = {
      id: 1,
      text: "Hello! I'm Nova, the AI assistant for Spheremedia. How can I help you today?",
      sender: 'ai'
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => setMessages([initialMessage]), 500);
    }
  }, [isOpen]);

  const handleUserInput = async (question) => {
    const userMessage = { id: Date.now(), text: question, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    const systemPrompt = "You are Nova, a friendly and professional AI assistant for Spheremedia, a digital design agency. Your expertise is in branding, web development, UI/UX, content creation, online ads, and social media videos. Our work includes projects for Muscletech, Corefuel, and Nutrimoo. Be helpful and concise.";
    const chatHistory = [{ role: "user", parts: [{ text: systemPrompt + "\n\nUser: " + question }] }];
    
    const payload = { contents: chatHistory };
    const apiKey = ""; // Left empty for runtime injection
    const apiUrl = https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey};

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(API error: ${response.statusText});
        }

        const result = await response.json();
        let aiResponseText = "Sorry, I couldn't get a response. Please try again.";

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
          aiResponseText = result.candidates[0].content.parts[0].text;
        }
        
        const aiMessage = { id: Date.now() + 1, text: aiResponseText, sender: 'ai' };
        setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
        console.error("Chatbot error:", error);
        const errorMessage = { id: Date.now() + 1, text: "Sorry, I'm having trouble connecting right now. Please try again later.", sender: 'ai' };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsTyping(false);
    }
  };
  
  const predefinedQuestions = [
    "What services do you offer?",
    "Show me your work.",
    "How can I contact you?",
  ];

  return (
    <>
      <div className={fixed bottom-6 right-6 z-40 transition-all duration-500 ${isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}}>
        <button onClick={() => setIsOpen(true)} className="bg-gradient-to-br from-cyan-400 to-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/40 hover:scale-110 transform transition-transform duration-300">
          <MessageSquare className="w-8 h-8" />
        </button>
      </div>

      <div className={fixed bottom-6 right-6 w-[calc(100%-3rem)] max-w-sm h-[70vh] max-h-[500px] z-50 transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}}>
        <div className="h-full w-full glass-card-dark rounded-2xl border border-cyan-500/50 flex flex-col shadow-2xl shadow-cyan-500/20">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h3 className="font-bold text-white text-lg">Nova AI</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-grow p-4 space-y-4 overflow-y-auto">
            {messages.map(msg => (
              <div key={msg.id} className={flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}}>
                <div className={max-w-[80%] p-3 rounded-lg ${msg.sender === 'ai' ? 'bg-blue-900/50 text-white' : 'bg-pink-800/50 text-white'}}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
                <div className="flex justify-start">
                    <div className="p-3 rounded-lg bg-blue-900/50 text-white">
                        <div className="flex items-center space-x-1">
                           <span className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0s'}}></span>
                           <span className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></span>
                           <span className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></span>
                        </div>
                    </div>
                </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="p-4 border-t border-white/10">
            <div className="flex flex-wrap gap-2">
                {predefinedQuestions.map(q => (
                    <button key={q} onClick={() => handleUserInput(q)} className="px-3 py-1 text-sm border border-white/20 rounded-full text-gray-300 hover:bg-white/10 transition-colors">
                        {q}
                    </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Footer
const Footer = () => (
  <footer className="py-8 px-4 text-center text-gray-500 relative z-10 border-t border-white/10">
    <p>&copy; {new Date().getFullYear()} Spheremedia. All Rights Reserved. Building the Future of Digital.</p>
  </footer>
);

// --- MAIN APP COMPONENT ---
export default function App() {
  const [isLaunched, setIsLaunched] = useState(false);

  const handleLaunch = () => {
    setIsLaunched(true);
    setTimeout(() => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;700&display=swap');
        
        html {
          scroll-behavior: smooth;
        }

        body {
          background-color: #000010;
          color: #e0e0e0;
          font-family: 'Rajdhani', sans-serif;
          overflow-x: hidden;
          cursor: none;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        
        .glass-card-dark {
          background: rgba(10, 20, 40, 0.7);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
        }

        h1, h2, h3 {
          font-family: 'Orbitron', sans-serif;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .content-reveal > * {
            animation: fadeInUp 1s 0.2s both;
        }
      `}</style>
      
      <ParticleBackground />
      <PointerTrail />

      <div className="relative z-0">
        <header className="fixed top-0 left-0 w-full p-4 z-50 bg-black/10 backdrop-blur-sm">
          <div className="container mx-auto flex justify-between items-center">
            {/* Corrected image path for logo */}
            <img 
  src="/logo.png" 
  alt="Logo" 
  className="w-16 h-16 rounded-full object-cover"
/>
            {isLaunched && (
              <nav className="hidden md:flex space-x-6 text-white" style={{ animation: 'fadeIn 1s ease-in' }}>
                <a href="#about" className="hover:text-pink-400 transition-colors">About</a>
                <a href="#services" className="hover:text-pink-400 transition-colors">Services</a>
                <a href="#work" className="hover:text-pink-400 transition-colors">Work</a>
                <a href="#contact" className="hover:text-pink-400 transition-colors">Contact</a>
              </nav>
            )}
          </div>
        </header>

        <main>
          <HeroSection onLaunch={handleLaunch} />
          {isLaunched && (
            <div className="content-reveal">
              <AboutSection />
              <ServicesSection />
              <PortfolioSection />
              <TestimonialsSection />
              <ContactSection />
            </div>
          )}
        </main>
        
        {isLaunched && (
          <div style={{ animation: 'fadeIn 1s 0.5s both' }}>
            <a href="https://www.instagram.com/spheremedia.in" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 left-6 z-40 bg-gradient-to-br from-pink-500 to-orange-400 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl shadow-pink-500/40 hover:scale-110 transform transition-transform duration-300">
                <InstagramIcon className="w-8 h-8"/>
            </a>
            <NovaChatbot />
            <Footer />
          </div>
        )}
      </div>
    </>
  );
}