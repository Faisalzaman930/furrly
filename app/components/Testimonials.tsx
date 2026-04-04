import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Furrly made finding a playmate for my dog so easy. The safety features are top-notch!",
      author: "Sarah L.",
      pet: "Owner of 'Cooper' the Golden Retriever",
      image: "🐶",
    },
    {
      quote: "The adoption process was seamless. I found my best friend and completed everything in the app.",
      author: "Michael K.",
      pet: "Adopted 'Luna' the Siamese",
      image: "🐱",
    },
    {
      quote: "Emergency alerts really work. When my cat went missing, the community helped me find him in 2 hours.",
      author: "David R.",
      pet: "Owner of 'Simba'",
      image: "🐈",
    },
  ];

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-brand-start uppercase tracking-widest">Success Stories</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-ebony sm:text-5xl uppercase">Loved by Pets & Parents</p>
        </div>
        <div className="mx-auto mt-16 mt-20 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.author} className="flex flex-col justify-between bg-white p-10 rounded-[3rem] shadow-sm ring-1 ring-gray-100 hover:shadow-xl transition-shadow">
              <blockquote className="text-lg leading-8 text-slate-gray italic">
                "{t.quote}"
              </blockquote>
              <div className="mt-10 flex items-center gap-x-6">
                <div className="h-14 w-14 rounded-2xl bg-image-bg flex items-center justify-center text-3xl">
                  {t.image}
                </div>
                <div>
                  <h4 className="text-base font-bold leading-7 tracking-tight text-ebony">{t.author}</h4>
                  <p className="text-sm leading-6 text-brand-start font-bold uppercase tracking-widest">{t.pet}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
