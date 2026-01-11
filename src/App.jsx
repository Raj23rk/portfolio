import React from 'react';
import { Menu, X, Github, Linkedin, Mail, Phone, MapPin, Bug, Terminal, CheckCircle2, Database, Atom, Cloud, PlayCircle, HelpCircle, Brain, RotateCcw, Key, MessageSquare, Send, User, Bot, Sparkles } from 'lucide-react';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([
    { id: 1, text: "Hi! I'm Raj AI. Ask me anything about Rajkumar's skills, experience, or projects!", isBot: true }
  ]);
  const [input, setInput] = React.useState("");
  const [isThinking, setIsThinking] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const KNOWLEDGE_BASE = {
    skills: "Rajkumar specializes in React, Node.js, NestJS, and AWS services. He also has experience with Angular, SQL, MongoDB, and AI tools like Flowise AI and N8N.",
    experience: "He was a Jr. Backend Engineer at Techsavvy AI (Jul-Dec 2025) and a Jr. Software Developer at Skillmine Technology (Jun 2023 - Apr 2025).",
    projects: "His key projects include: 1. Bridg Chat (AI chat with Jira integration), 2. Skillzen (AI course platform), 3. FCS (Automatic email/SMS suggestions), 4. Tesco AI HR project.",
    contact: "You can reach Rajkumar at kumarrk23dev@gmail.com or call +91 6380629995. He is based in Sivakasi, India.",
    education: "He holds an MCA from ANJAC (CGPA 7.4) and a BSc in IT from Sri Kaliswari College (CGPA 7.1).",
    career_goal: "He is passionate about building scalable applications and AI-driven solutions.",
  };

  const getBotResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes("skill") || q.includes("tech") || q.includes("know")) return KNOWLEDGE_BASE.skills;
    if (q.includes("experience") || q.includes("work") || q.includes("job")) return KNOWLEDGE_BASE.experience;
    if (q.includes("project") || q.includes("build") || q.includes("make")) return KNOWLEDGE_BASE.projects;
    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach")) return KNOWLEDGE_BASE.contact;
    if (q.includes("education") || q.includes("college") || q.includes("study")) return KNOWLEDGE_BASE.education;
    if (q.includes("who") || q.includes("about") || q.includes("rajkumar")) return "Rajkumar is a Full Stack Node.js Developer specializing in building scalable AI-driven applications.";
    if (q.includes("hello") || q.includes("hi") || q.includes("hey")) return "Hello! How can I help you learn more about Rajkumar today?";
    
    return "That's an interesting question! I know about Rajkumar's skills, experience, projects, and contact info. Feel free to ask about any of those!";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);
    setIsTyping(false);

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = { id: Date.now() + 1, text: getBotResponse(input), isBot: true };
      setMessages(prev => [...prev, botResponse]);
      setIsThinking(false);
    }, 1500); // Slightly longer for better animation visibility
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] h-[500px] glass-card flex flex-col shadow-2xl border-primary-500/30 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="p-4 bg-primary-600/20 border-b border-primary-500/20 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`relative w-10 h-10 flex items-center justify-center ${isThinking ? 'animate-toy-answering' : isTyping ? 'animate-toy-listening' : 'animate-toy-float'}`}>
                <img 
                  src="/chatbot_toy.png" 
                  alt="Assistant" 
                  className="w-full h-full object-contain p-0.5"
                />
                {(isThinking || isTyping) && (
                  <div className="absolute -top-1 -right-1 flex gap-0.5">
                    <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                    <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Raj AI</h3>
                <p className="text-[10px] text-emerald-400 font-mono">
                  {isThinking ? 'Typing...' : isTyping ? 'Listening...' : 'Online'}
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end animate-in fade-in slide-in-from-right-2'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.isBot 
                    ? 'bg-slate-900 border border-white/5 text-slate-300 rounded-tl-none' 
                    : 'bg-primary-600 text-white rounded-tr-none shadow-lg'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/5 bg-slate-950/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setIsTyping(e.target.value.length > 0);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                onBlur={() => setIsTyping(false)}
                placeholder="Ask me something..."
                className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-500/50 transition-colors"
              />
              <button 
                onClick={handleSend}
                className="p-2 bg-primary-600 hover:bg-primary-500 text-white rounded-xl transition-all active:scale-95"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-primary-600 hover:bg-primary-500 flex items-center justify-center text-white shadow-xl shadow-primary-900/30 transition-all hover:scale-110 active:scale-95 group relative overflow-hidden"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <div className="relative w-10 h-10 group-hover:animate-toy-float">
            <img 
              src="/chatbot_toy.png" 
              alt="Toggle Chat" 
              className="w-full h-full object-contain"
            />
          </div>
        )}
        {!isOpen && (
          <div className="absolute top-2 right-2 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950 animate-pulse"></div>
        )}
      </button>
    </div>
  );
};

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [gameState, setGameState] = React.useState('INSTRUCTIONS'); // INSTRUCTIONS, PLAYING, WIN, PORTFOLIO
  const [numbers, setNumbers] = React.useState([]);
  const [targetSum, setTargetSum] = React.useState(0);
  const [selectedIndices, setSelectedIndices] = React.useState([]);
  const [isError, setIsError] = React.useState(false);

  const initializeGame = () => {
    // Generate 9 random numbers for the grid
    const newNumbers = Array.from({ length: 9 }, () => Math.floor(Math.random() * 9) + 1);
    
    // Pick 3-4 random indices to create a target sum
    const possibleIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const targetIndices = possibleIndices
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 2) + 3); // 3 or 4 numbers
    
    const sum = targetIndices.reduce((acc, idx) => acc + newNumbers[idx], 0);
    
    setNumbers(newNumbers);
    setTargetSum(sum);
    setSelectedIndices([]);
    setIsError(false);
    setGameState('PLAYING');
  };

  const currentSum = selectedIndices.reduce((acc, idx) => acc + numbers[idx], 0);

  const handleNumberClick = (index) => {
    if (gameState !== 'PLAYING') return;

    let newSelected;
    if (selectedIndices.includes(index)) {
      newSelected = selectedIndices.filter(i => i !== index);
    } else {
      newSelected = [...selectedIndices, index];
    }

    const newSum = newSelected.reduce((acc, idx) => acc + numbers[idx], 0);
    setSelectedIndices(newSelected);

    if (newSum === targetSum) {
      setGameState('WIN');
      setTimeout(() => setGameState('PORTFOLIO'), 2500);
    } else if (newSum > targetSum) {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        setSelectedIndices([]);
      }, 500);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (gameState !== 'PORTFOLIO') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 overflow-hidden relative">
        <div className="absolute inset-0 z-0 opacity-10" 
             style={{ backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="z-10 w-full max-w-xl space-y-8 animate-fade-in px-4">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-mono mb-4">
              <Brain size={14} /> SECURITY PROTOCOL ENABLED
            </div>
            <h1 className="text-5xl font-display font-bold text-white tracking-tight">
              DECRYPT <span className="text-primary-400">KEY</span>
            </h1>
          </div>

          <div className="glass-card p-8 relative border-primary-500/30 overflow-hidden min-h-[500px] flex flex-col">
            {gameState === 'INSTRUCTIONS' && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-6 animate-fade-in text-center">
                <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                  <img 
                    src="/logic_challenge_hero.png" 
                    alt="Logic Brain Challenge" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-primary-500/20 backdrop-blur-md border border-primary-500/30 text-[10px] text-primary-400 font-mono">
                      <Brain size={12} /> NEURAL INTERFACE
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-white">Logic Verification</h2>
                  <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
                    Prove your logical prowess to unlock the professional codebase.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-[10px] font-mono text-slate-400">
                    <div className="bg-slate-900/50 p-2 rounded-lg border border-white/5">
                      <span className="text-primary-400 block mb-0.5 uppercase">Goal</span>
                      Reach the Target Sum
                    </div>
                    <div className="bg-slate-900/50 p-2 rounded-lg border border-white/5">
                      <span className="text-primary-400 block mb-0.5 uppercase">Penalty</span>
                      Overflow resets logic
                    </div>
                  </div>
                </div>
                <button 
                  onClick={initializeGame}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-primary-900/30"
                >
                  <PlayCircle size={20} />
                  INITIALIZE SYSTEM
                </button>
              </div>
            )}

            {gameState === 'PLAYING' && (
              <div className="flex-1 flex flex-col space-y-8">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Target Sum</p>
                    <div className="text-5xl font-display font-bold text-primary-400 tabular-nums">
                      {targetSum}
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Current Sum</p>
                    <div className={`text-4xl font-display font-bold tabular-nums transition-colors duration-300 ${isError ? 'text-red-500' : 'text-white'}`}>
                      {currentSum}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {numbers.map((num, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleNumberClick(idx)}
                      className={`
                        h-20 text-2xl font-bold rounded-2xl transition-all duration-300
                        flex items-center justify-center border-2
                        ${selectedIndices.includes(idx) 
                          ? 'bg-primary-500/20 border-primary-500 text-primary-400 shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-105' 
                          : 'bg-slate-900/50 border-white/5 text-slate-400 hover:border-white/20 hover:bg-slate-800/50'
                        }
                        ${isError && selectedIndices.includes(idx) ? 'animate-shake border-red-500 text-red-500' : ''}
                      `}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <div className="flex justify-center">
                  <button 
                    onClick={initializeGame}
                    className="flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-primary-400 transition-colors uppercase tracking-widest"
                  >
                    <RotateCcw size={14} /> Reset Grid
                  </button>
                </div>
              </div>
            )}

            {(gameState === 'WIN') && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-6 animate-fade-in text-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-400/30 blur-3xl rounded-full"></div>
                  <CheckCircle2 className="text-emerald-400 animate-bounce relative" size={80} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-white uppercase tracking-tight">Logic Verified</h3>
                  <p className="text-emerald-400 font-mono text-sm tracking-widest animate-pulse">DECRYPTION SUCCESSFUL</p>
                </div>
                <div className="w-full max-w-xs h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 animate-[loading_2.5s_ease-in-out]"></div>
                </div>
              </div>
            )}
          </div>

          <p className="text-center text-[10px] text-slate-500 font-mono uppercase tracking-[0.4em]">
            Authorized Access Only // Port {window.location.port || '80'}
          </p>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card mx-4 mt-4 rounded-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-display font-bold gradient-text">RK</h1>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="hover:text-primary-400 transition-colors">Home</a>
              <a href="#about" className="hover:text-primary-400 transition-colors">About</a>
              <a href="#experience" className="hover:text-primary-400 transition-colors">Experience</a>
              <a href="#projects" className="hover:text-primary-400 transition-colors">Projects</a>
              <a href="#contact" className="hover:text-primary-400 transition-colors">Contact</a>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="md:hidden">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 flex flex-col space-y-3">
              <a href="#home" onClick={toggleMenu} className="hover:text-primary-400 transition-colors">Home</a>
              <a href="#about" onClick={toggleMenu} className="hover:text-primary-400 transition-colors">About</a>
              <a href="#experience" onClick={toggleMenu} className="hover:text-primary-400 transition-colors">Experience</a>
              <a href="#projects" onClick={toggleMenu} className="hover:text-primary-400 transition-colors">Projects</a>
              <a href="#contact" onClick={toggleMenu} className="hover:text-primary-400 transition-colors">Contact</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <p className="text-primary-400 font-semibold text-lg">Hello, I'm</p>
                <h1 className="text-5xl md:text-7xl font-display font-bold">
                  RAJKUMAR A
                </h1>
                <h2 className="text-3xl md:text-4xl gradient-text font-bold">
                  Full Stack Node.js Developer
                </h2>
              </div>
              
              <p className="text-slate-300 text-lg leading-relaxed">
                Full-stack developer specializing in React, Node.js, NestJS, and AWS services. 
                Passionate about building scalable applications and AI-driven solutions.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="btn-primary">
                  Get In Touch
                </a>
                <a 
                  href="#projects" 
                  className="px-6 py-3 border-2 border-primary-500/50 hover:border-primary-400 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-primary-500/10"
                >
                  View Projects
                </a>
              </div>

              <div className="flex gap-4 pt-4">
                <a href="mailto:kumarrk23dev@gmail.com" className="p-3 glass-card hover:bg-primary-500/20 transition-all rounded-lg">
                  <Mail size={20} />
                </a>
                <a href="https://github.com/Raj23rk" target="_blank" rel="noopener noreferrer" className="p-3 glass-card hover:bg-primary-500/20 transition-all rounded-lg">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/rajkumar2310" target="_blank" rel="noopener noreferrer" className="p-3 glass-card hover:bg-primary-500/20 transition-all rounded-lg">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            <div className="flex justify-end md:justify-center animate-float">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full blur-3xl opacity-30"></div>
                <img 
                  src="/profile.jpg" 
                  alt="Rajkumar A" 
                  className="relative w-80 h-80 md:w-96 md:h-96 object-cover object-top rounded-full shadow-2xl border-4 border-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center">About Me</h2>
          
          <div className="glass-card p-8 md:p-12 space-y-8">
            <p className="text-slate-300 text-lg leading-relaxed">
              Aspiring Software Developer with a strong passion for coding and technology. Experienced in full-stack 
              development, AI-based solutions, and cloud integrations. Skilled in building internal and client-facing 
              applications, with hands-on expertise in React, Node.js, NestJS, and AWS services. Highly motivated to 
              learn new technologies, solve complex problems, and deliver impactful software solutions in fast-paced 
              environments.
            </p>

            {/* Contact Info */}
            <div className="grid md:grid-cols-3 gap-6 pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary-500/20 rounded-lg">
                  <Phone size={20} className="text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Phone</p>
                  <p className="font-semibold">+91 6380629995</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary-500/20 rounded-lg">
                  <Mail size={20} className="text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="font-semibold">kumarrk23dev@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary-500/20 rounded-lg">
                  <MapPin size={20} className="text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Location</p>
                  <p className="font-semibold">Sivakasi, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center">Technical Skills</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card p-6 space-y-4">
              <h3 className="text-xl font-bold text-primary-400">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                <span className="skill-tag">React.js</span>
                <span className="skill-tag">Angular</span>
              </div>
            </div>

            <div className="glass-card p-6 space-y-4">
              <h3 className="text-xl font-bold text-primary-400">Backend</h3>
              <div className="flex flex-wrap gap-2">
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">NestJS</span>
              </div>
            </div>

            <div className="glass-card p-6 space-y-4">
              <h3 className="text-xl font-bold text-primary-400">Databases</h3>
              <div className="flex flex-wrap gap-2">
                <span className="skill-tag">SQL</span>
                <span className="skill-tag">MongoDB</span>
              </div>
            </div>

            <div className="glass-card p-6 space-y-4">
              <h3 className="text-xl font-bold text-primary-400">Cloud & DevOps</h3>
              <div className="flex flex-wrap gap-2">
                <span className="skill-tag">AWS EC2</span>
                <span className="skill-tag">AWS S3</span>
                <span className="skill-tag">AWS SES</span>
                <span className="skill-tag">AWS IAM</span>
              </div>
            </div>

            <div className="glass-card p-6 space-y-4">
              <h3 className="text-xl font-bold text-primary-400">Tools & Platforms</h3>
              <div className="flex flex-wrap gap-2">
                <span className="skill-tag">Power BI</span>
                <span className="skill-tag">Flowise AI</span>
                <span className="skill-tag">N8N</span>
                <span className="skill-tag">Git</span>
                <span className="skill-tag">GitLab</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center">Work Experience</h2>
          
          <div className="space-y-8">
            {/* Current Role */}
            <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-primary-400">Jr. Backend Engineer</h3>
                  <p className="text-lg text-slate-300">Techsavvy AI</p>
                </div>
                <span className="text-sm text-slate-400 mt-2 md:mt-0">Jul 2025 - Dec 2025</span>
              </div>
              <p className="text-slate-300 font-semibold mb-2">Project: Bridg Chat</p>
              <p className="text-slate-400 leading-relaxed">
                Developing backend services for a chat application, focusing on scalable architecture and API integration. 
                Implemented database models, authentication flows, and cloud-based functionalities. Collaborating with 
                frontend and AI teams to integrate real-time messaging features.
              </p>
            </div>

            {/* Previous Role */}
            <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-primary-400">Jr. Software Developer</h3>
                  <p className="text-lg text-slate-300">Skillmine Technology</p>
                </div>
                <span className="text-sm text-slate-400 mt-2 md:mt-0">Jun 2023 – April 2025</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Developed AI-driven internal and client-facing applications including HR and communication tools for Tesco. 
                Implemented AWS services (EC2, S3, SES, IAM) across multiple projects. Contributed to both frontend and 
                backend of applications including audit software and an AI course platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center">Featured Projects</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="glass-card p-6 hover:bg-white/10 transition-all duration-300 group">
              <div className="h-2 w-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mb-4"></div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                Bridg Chat (Backend)
              </h3>
              <p className="text-slate-400 mb-4">
                Enterprise chat platform integrating multiple AI models (ChatGPT, Gemini, Claude) with Jira tracking capabilities. 
                Cost-effective solution for organizations, replacing $20/employee subscriptions. Features include real-time chat, 
                Jira ticket tracking, AI-powered issue resolution, and seamless cloud integration. Users can query ticket numbers, 
                understand issues, and get AI-suggested solutions.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 bg-primary-500/20 rounded-full">NestJS</span>
                <span className="text-xs px-3 py-1 bg-primary-500/20 rounded-full">ChatGPT</span>
                <span className="text-xs px-3 py-1 bg-primary-500/20 rounded-full">Gemini</span>
                <span className="text-xs px-3 py-1 bg-primary-500/20 rounded-full">Claude</span>
                <span className="text-xs px-3 py-1 bg-primary-500/20 rounded-full">Jira API</span>
                <span className="text-xs px-3 py-1 bg-primary-500/20 rounded-full">AWS</span>
              </div>
            </div>

            {/* Project 2 */}
            <div className="glass-card p-6 hover:bg-white/10 transition-all duration-300 group">
              <div className="h-2 w-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mb-4"></div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                Skillzen - AI Course Platform
              </h3>
              <p className="text-slate-400 mb-4">
                Developed an AI-driven learning platform that generates online courses in a Udemy-like format. 
                The system uses AI to create course content, structure modules, and recommend learning paths based on 
                user interests and goals. Built with React.js for dynamic course creation and personalized learning experiences.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 bg-primary-500/20 rounded-full">React.js</span>
                <span className="text-xs px-3 py-1 bg-primary-500/20 rounded-full">AI</span>
              </div>
            </div>

            {/* Project 4 */}
            <div className="glass-card p-6 hover:bg-white/10 transition-all duration-300 group">
              <div className="h-2 w-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mb-4"></div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                FCS - AI Email & SMS Auto-Suggestion
              </h3>
              <p className="text-slate-400 mb-4">
                Built AI-powered suggestion system for communications using AWS SES inbound/outbound architecture. 
                Implemented email sending (outbound) to users, with replies (inbound) automatically stored in S3. 
                System downloads from S3, stores in database, and fetches data for AI-powered threaded email tracking 
                and SMS automation.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 bg-primary-500/20 rounded-full">AWS SES</span>
                <span className="text-xs px-3 py-1 bg-primary-500/20 rounded-full">AWS S3</span>
                <span className="text-xs px-3 py-1 bg-primary-500/20 rounded-full">AI</span>
                <span className="text-xs px-3 py-1 bg-primary-500/20 rounded-full">Full Stack</span>
              </div>
            </div>

            {/* Project 5 - Tesco AI HR */}
            <div className="glass-card p-6 hover:bg-white/10 transition-all duration-300 group">
              <div className="h-2 w-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mb-4"></div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                Tesco - AI HR Project
              </h3>
              <p className="text-slate-400 mb-4">
                Built an AI-powered HR assistant integrated with Microsoft Teams and WhatsApp to help employees apply for 
                leave and get instant answers to HR policy questions. Reduced HR workload by automating leave requests and 
                policy queries using AI and internal HRMS integration.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 bg-primary-500/20 rounded-full">Teams</span>
                <span className="text-xs px-3 py-1 bg-primary-500/20 rounded-full">WhatsApp</span>
                <span className="text-xs px-3 py-1 bg-primary-500/20 rounded-full">AI</span>
                <span className="text-xs px-3 py-1 bg-primary-500/20 rounded-full">HRMS Integration</span>
                <span className="text-xs px-3 py-1 bg-primary-500/20 rounded-full">May 2024 - Jan 2025</span>
              </div>
            </div>

            {/* Project 6 - Complyment */}
            <div className="glass-card p-6 hover:bg-white/10 transition-all duration-300 group">
              <div className="h-2 w-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mb-4"></div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                Complyment - Audit Software
              </h3>
              <p className="text-slate-400 mb-4">
                Contributed to backend development of an enterprise audit platform, enhancing compliance checks and 
                optimizing system performance for large-scale audits. Improved audit workflow efficiency and data processing.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 bg-primary-500/20 rounded-full">Backend</span>
                <span className="text-xs px-3 py-1 bg-primary-500/20 rounded-full">Enterprise</span>
                <span className="text-xs px-3 py-1 bg-primary-500/20 rounded-full">Compliance</span>
                <span className="text-xs px-3 py-1 bg-primary-500/20 rounded-full">Sep 2023 - May 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center">Education</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-primary-400 mb-2">
                Master of Computer Applications
              </h3>
              <p className="text-lg text-slate-300 mb-2">
                Ayya Nadar Janaki Ammal College, Sivakasi
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-slate-400">May 2022 – Apr 2023</span>
                <span className="px-4 py-2 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-lg font-semibold">
                  CGPA: 7.4
                </span>
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-primary-400 mb-2">
                BSc (IT)
              </h3>
              <p className="text-lg text-slate-300 mb-2">
                Sri Kaliswari College (Autonomous), Sivakasi
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-slate-400">Jun 2017 – May 2020</span>
                <span className="px-4 py-2 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-lg font-semibold">
                  CGPA: 7.1
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title text-center">Let's Connect</h2>
          
          <div className="glass-card p-12 space-y-8">
            <p className="text-slate-300 text-lg">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="mailto:kumarrk23dev@gmail.com" 
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                <Mail size={20} />
                Email Me
              </a>
              
              <a 
                href="tel:+916380629995" 
                className="flex items-center gap-2 px-6 py-3 border-2 border-primary-500/50 hover:border-primary-400 rounded-lg font-semibold transition-all duration-300 hover:bg-primary-500/10"
              >
                <Phone size={20} />
                Call Me
              </a>
            </div>

            <div className="flex justify-center gap-4 pt-6">
              <a 
                href="https://github.com/Raj23rk" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-4 glass-card hover:bg-primary-500/20 transition-all rounded-lg hover:scale-110"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://www.linkedin.com/in/rajkumar2310" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-4 glass-card hover:bg-primary-500/20 transition-all rounded-lg hover:scale-110"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400">
            © 2026 Rajkumar A. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
      <AIChatbot />
    </div>
  );
};

export default Portfolio;
