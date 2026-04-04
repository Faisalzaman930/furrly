import React from "react";

const FeaturesList = () => {
  const features = [
    { title: "24/7 Digital Concierge", desc: "Always-on support for every pet need." },
    { title: "Secure Data Encrypted", desc: "Your pet's records are safe and accessible only to you." },
    { title: "Verified Community", desc: "Every user and rescue is audited for safety." },
    { title: "Real-time Notifications", desc: "Instant alerts for playdates and emergencies." },
    { title: "In-App Health Wallet", desc: "Digital storage for vaccinations and medical history." },
    { title: "Smart Filters", desc: "Find playmates based on temperament and breed." },
    { title: "Paperless Applications", desc: "Submit adoption and fostering forms instantly." },
    { title: "Global Network", desc: "Access the community from anywhere in the world." },
    { title: "E-commerce Marketplace", desc: "Shop the best pet gear and essentials.", isSoon: true },
    { title: "AI Pet Tracking", desc: "GPS-based health & safety monitoring.", isSoon: true },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-brand-start uppercase tracking-widest">Everything You Need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-ebony sm:text-5xl">
            A Feature-Rich Ecosystem
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-gray">
            We've thought of everything. From the smallest interaction to the biggest emergencies, Furrly is designed to be your complete pet parenting companion.
          </p>
        </div>
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-4 lg:gap-y-16">
            {features.map((f) => (
              <div key={f.title} className="relative pl-16">
                <dt className="text-base font-bold leading-7 text-ebony">
                  <div className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg ${f.isSoon ? 'bg-gray-100 text-slate-gray' : 'bg-brand-gradient text-white'}`}>
                    <span className="text-lg">{f.isSoon ? '⋯' : '✓'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {f.title}
                    {f.isSoon && (
                      <span className="text-[10px] font-black bg-brand-start/10 text-brand-start px-2 py-0.5 rounded-full uppercase tracking-tighter">Soon</span>
                    )}
                  </div>
                </dt>
                <dd className="mt-2 text-base leading-7 text-slate-gray">{f.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default FeaturesList;
