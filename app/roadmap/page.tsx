import Hero from "../components/Hero";
import WishlistForm from "../components/WishlistForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Furrly Roadmap & Wishlist: Build the Future of Pet Care",
  description: "Explore the development roadmap for Furrly and submit your own feature requests. Follow our journey to build the first true pet super-app.",
  openGraph: {
    title: "Furrly Roadmap & Wishlist",
    description: "See what's live, in development, and planned next. Vote for features and help shape the future of the #1 pet super-app.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Furrly Roadmap & Wishlist",
    description: "See what's live, in development, and planned next. Vote for features and help shape the future of the #1 pet super-app.",
  },
};

export default function RoadmapPage() {
  const phases = [
    {
      status: "Currently Live",
      title: "Phase 1: Discovery & Social",
      items: [
        "Vet Discovery Portal with GMB reviews and hours.",
        "Local Pet Matching & Playdate coordinates.",
        "Native Adoption & Fostering application engine.",
        "Emergency Community Recovery Network.",
      ],
      color: "bg-emerald-50 text-emerald-900 border-emerald-100",
      dot: "bg-emerald-500",
    },
    {
      status: "In Development",
      title: "Phase 2: Commerce & Rescue",
      items: [
        "Multi-vendor E-commerce marketplace for pet goods.",
        "Integrated payments with COD (Cash on Delivery) support.",
        "Verified Rescue/Foster community onboarding for instant matching.",
        "Global Social Feed V2: Performance & visual overhauls.",
      ],
      color: "bg-brand-start/5 text-ebony border-brand-start/10",
      dot: "bg-brand-start",
    },
    {
      status: "Future Vision",
      title: "Phase 3: The Ecosystem",
      items: [
        "Full Vet CRM: In-app scheduling & medical records synchronization.",
        "User-Led Social Media: Feature voting and community governance.",
        "Corporate Wellness Partnerships for pet-friendly employers.",
        "Blockchain Digital Pet Passports (Medical & Identity Tracking).",
      ],
      color: "bg-gray-50 text-slate-gray border-gray-200",
      dot: "bg-gray-400",
    },
  ];

  const topRequested = [
    {
      category: "E-commerce",
      title: "COD (Cash on Delivery) support",
      desc: "Native support for localized payment options in our upcoming pet marketplace.",
      votes: 1240,
      status: "In Development",
    },
    {
      category: "Social Media",
      title: "User-Led Social Feed",
      desc: "Customizable feed algorithms where users can prioritize content from specific breeds.",
      votes: 890,
      status: "Planning",
    },
    {
      category: "Veterinary",
      title: "Digital Medical Records",
      desc: "A centralized hub to sync clinic records, vaccinations, and weight tracking in one place.",
      votes: 2150,
      status: "High Priority",
    },
  ];

  return (
    <div className="bg-white">
      <Hero
        subtitle="Ecosystem Development"
        title="We're Building in Public."
        description="Furrly's roadmap is driven by transparency and community feedback. Follow our progress from discovery to the first unified pet super-app, and submit your own feature requests below."
        showDownloads={true}
      />

      {/* Roadmap Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-24 relative">
             <div className="absolute left-8 top-12 bottom-12 w-1 bg-gray-100 hidden md:block" />
             
             {phases.map((phase, idx) => (
               <div key={idx} className="relative md:pl-24 group">
                  <div className={`absolute left-0 top-0 hidden md:flex h-16 w-16 items-center justify-center rounded-3xl ${phase.dot} text-white shadow-xl transition-transform group-hover:scale-110 z-10 font-bold text-xl`}>
                     {idx + 1}
                  </div>
                  
                  <div className={`p-10 rounded-[4rem] border-2 shadow-sm ${phase.color} transition-all hover:shadow-2xl`}>
                     <div className="inline-block px-4 py-1 rounded-full bg-white/50 text-xs font-black uppercase tracking-widest mb-6 border border-current/10">
                        {phase.status}
                     </div>
                     <h2 className="text-3xl font-black tracking-tight mb-8">
                        {phase.title}
                     </h2>
                     <ul className="space-y-6">
                        {phase.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 text-lg font-medium opacity-90">
                             <span className="flex-none h-6 w-6 rounded-full border-2 border-current opacity-40 mt-1" />
                             {item}
                          </li>
                        ))}
                     </ul>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Top Requested Section */}
      <section className="py-24 bg-gray-50/50 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20 px-6">
              <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
                 <h2 className="text-base font-bold text-brand-start uppercase tracking-widest mb-4">Trending Now</h2>
                 <h2 className="text-4xl font-black text-ebony tracking-tight sm:text-5xl uppercase underline decoration-brand-start decoration-8 underline-offset-8">Top Community Requests</h2>
              </div>
              <div className="text-sm font-bold text-slate-gray uppercase tracking-widest hidden md:block">
                 Total Community Votes: 124,560
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {topRequested.map((item, idx) => (
                <div key={idx} className="flex flex-col bg-white p-10 rounded-[3rem] shadow-sm ring-1 ring-gray-100 hover:shadow-2xl transition-all group relative overflow-hidden border-2 border-transparent hover:border-gray-50">
                   <div className="absolute top-0 right-0 p-6">
                      <span className="px-4 py-1 rounded-full bg-brand-start/10 text-brand-start text-xs font-black uppercase tracking-widest leading-none border border-brand-start/20">
                        {item.status}
                      </span>
                   </div>
                   <div className="mt-4">
                      <span className="text-xs font-black text-slate-gray uppercase tracking-widest">{item.category}</span>
                      <h3 className="mt-4 text-2xl font-black text-ebony group-hover:text-brand-start transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-slate-gray leading-7 cursor-default">
                        {item.desc}
                      </p>
                   </div>
                   <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex flex-col">
                         <span className="text-2xl font-black text-ebony">{item.votes.toLocaleString()}</span>
                         <span className="text-xs font-bold text-slate-gray uppercase tracking-widest">Community Votes</span>
                      </div>
                      <button className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl transition-all hover:bg-brand-gradient hover:text-white active:scale-90 shadow-inner">
                        👍
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Wishlist Form Section */}
      <section className="py-24 bg-white border-t border-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-ebony tracking-tight sm:text-4xl uppercase">Have a Great Idea?</h2>
              <p className="mt-4 text-lg text-slate-gray">Let us know what you want to see in Furrly.</p>
           </div>
           <WishlistForm />
        </div>
      </section>
    </div>
  );
}
