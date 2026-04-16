import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative overflow-hidden selection:bg-primary/30">
      {/* Deep Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] lg:h-[800px] bg-gradient-to-b from-primary/10 to-transparent -z-10" />
      <div className="absolute top-[10%] -right-[10%] w-[50%] h-[40%] bg-primary/10 rounded-full blur-[100px] lg:blur-[120px] -z-10 animate-pulse" />
      <div className="absolute top-[30%] -left-[10%] w-[45%] h-[35%] bg-secondary/10 rounded-full blur-[80px] lg:blur-[100px] -z-10 animate-pulse" />

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-10 pb-24 lg:pt-20 lg:pb-48 text-center animate-fade-in flex flex-col items-center">
        <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] lg:leading-[0.9] text-white max-w-5xl mb-6 lg:mb-8">
          Simplify your links,<br />
          <span className="bg-gradient-to-r from-white via-white to-secondary bg-clip-text text-transparent italic">amplify your reach.</span>
        </h1>
        
        <p className="text-base sm:text-xl lg:text-2xl text-slate-400 max-w-2xl leading-relaxed font-bold mb-10 lg:mb-12 px-4">
          The most straightforward URL shortener for global teams. No tracking, 
          no forced logins—just clean, professional links generated in seconds.
        </p>
        
        <div className='flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center w-full sm:w-auto'>
          <Link href="/shorten">
            <button className='w-full sm:w-auto bg-primary hover:bg-primary/90 transition-all text-white px-10 lg:px-12 py-4 lg:py-5 rounded-2xl lg:rounded-[2rem] font-black text-lg lg:text-xl shadow-2xl shadow-primary/30 active:scale-95 flex items-center justify-center gap-3 group'>
              Build Your Link
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </Link>
        </div>

        {/* Hero Visual */}
        <div className="mt-16 lg:mt-32 w-full max-w-5xl relative animate-subtle-float px-2 sm:px-0">
          <div className="bg-white/5 p-2 sm:p-4 rounded-[2rem] lg:rounded-[3.5rem] border border-white/10 shadow-3xl overflow-hidden">
            <div className="bg-[#030712] rounded-[1.5rem] lg:rounded-[2.5rem] overflow-hidden aspect-video relative">
              <Image 
                className="object-cover opacity-80" 
                alt="analytics-dashboard" 
                src={"/hero-image.png"} 
                fill={true} 
                priority
              />
            </div>
          </div>
          {/* Decorative Floating Elements */}
          <div className="absolute -top-6 -right-6 lg:-top-10 lg:-right-10 w-16 h-16 lg:w-24 lg:h-24 bg-primary/20 rounded-full blur-2xl lg:blur-3xl" />
          <div className="absolute -bottom-6 -left-6 lg:-bottom-10 lg:-left-10 w-20 h-20 lg:w-32 lg:h-32 bg-secondary/10 rounded-full blur-2xl lg:blur-3xl" />
        </div>
      </section>

      {/* About Section */}
      <section id="features" className="py-20 lg:py-40 bg-midnight border-y border-white/5 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-primary/5 rounded-full blur-[100px] lg:blur-[120px] -z-10" />
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-14">
            <FeatureCard 
              title="Identity Focus"
              desc="Create links that represent your professional identity and brand values perfectly."
              icon={<path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />}
            />
            <FeatureCard 
              title="Global Reach"
              desc="Comprehensive performance metrics designed for clarity and rapid actionable growth."
              icon={<path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
              color="text-orange-500"
              bgColor="bg-orange-500/10"
            />
            <FeatureCard 
              title="Instant Logic"
              desc="Shorten your links immediately with no onboarding, accounts, or data harvesting."
              icon={<path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />}
              color="text-primary"
              bgColor="bg-primary/10"
            />
          </div>
        </div>
      </section>
      
      <footer className="py-16 lg:py-24 border-t border-white/5 bg-midnight text-center text-slate-500 text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] lg:tracking-[0.3em] px-6">
        &copy; 2026 BitLinks Optimizer. Premium Design System. All Rights Reserved.
      </footer>
    </main>
  );
}

function FeatureCard({ title, desc, icon, color = "text-secondary", bgColor = "bg-secondary/10" }) {
  return (
    <div className="p-8 lg:p-12 rounded-[2rem] lg:rounded-[3rem] bg-[#0f172a]/60 border border-white/5 hover:border-white/10 shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col items-center lg:items-start text-center lg:text-left group">
      <div className={`w-12 h-12 lg:w-16 lg:h-16 ${bgColor} rounded-xl lg:rounded-[1.25rem] flex items-center justify-center ${color} mb-6 lg:mb-8 shadow-inner transition-transform group-hover:scale-110`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 lg:h-8 lg:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {icon}
        </svg>
      </div>
      <h3 className="text-xl lg:text-2xl font-black text-white mb-3 lg:mb-4 tracking-tight">{title}</h3>
      <p className="text-slate-400 leading-relaxed font-bold text-xs lg:text-base">{desc}</p>
    </div>
  )
}
