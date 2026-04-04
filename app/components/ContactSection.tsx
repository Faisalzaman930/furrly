import React from "react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-brand-start/5 rounded-full blur-3xl opacity-50" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-base font-bold text-brand-start uppercase tracking-widest mb-6">Contact Us</h2>
            <h2 className="text-4xl font-black text-ebony tracking-tight sm:text-6xl uppercase leading-none">Let's Connect.</h2>
            <p className="mt-8 text-xl text-slate-gray leading-8">
              Whether you're a potential vendor, a rescue organization, or a pet parent with questions, we're here to help. Get in touch with the Furrly team today.
            </p>
            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-6">
                <div className="h-14 w-14 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl shadow-sm">📍</div>
                <div>
                   <h4 className="font-bold text-ebony">Our Hub</h4>
                   <p className="text-slate-gray">San Francisco, CA</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="h-14 w-14 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl shadow-sm">✉️</div>
                <div>
                   <h4 className="font-bold text-ebony">Email Support</h4>
                   <p className="text-slate-gray">hello@furrly.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-12 rounded-[4rem] border border-gray-100 shadow-2xl">
            <form className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="name" className="block text-xs font-black text-ebony uppercase tracking-widest mb-2 px-2">Name</label>
                    <input type="text" id="name" className="w-full bg-white border-2 border-transparent rounded-[2rem] px-8 py-5 focus:border-brand-start outline-none transition-all placeholder:text-gray-300 font-medium" placeholder="Pet Parent Name" />
                 </div>
                 <div>
                    <label htmlFor="email" className="block text-xs font-black text-ebony uppercase tracking-widest mb-2 px-2">Email</label>
                    <input type="email" id="email" className="w-full bg-white border-2 border-transparent rounded-[2rem] px-8 py-5 focus:border-brand-start outline-none transition-all placeholder:text-gray-300 font-medium" placeholder="mail@example.com" />
                 </div>
              </div>
              <div>
                 <label htmlFor="type" className="block text-xs font-black text-ebony uppercase tracking-widest mb-2 px-2">Inquiry Type</label>
                 <select id="type" className="w-full bg-white border-2 border-transparent rounded-[2rem] px-8 py-5 focus:border-brand-start outline-none transition-all font-medium appearance-none">
                    <option>General Support</option>
                    <option>Rescue Partnerships</option>
                    <option>Vendor/E-commerce</option>
                    <option>Media & PR</option>
                 </select>
              </div>
              <div>
                 <label htmlFor="message" className="block text-xs font-black text-ebony uppercase tracking-widest mb-2 px-2">Message</label>
                 <textarea id="message" rows={4} className="w-full bg-white border-2 border-transparent rounded-[2.5rem] px-8 py-6 focus:border-brand-start outline-none transition-all placeholder:text-gray-300 font-medium" placeholder="How can we help you?"></textarea>
              </div>
              <button className="w-full bg-ebony text-white font-bold py-6 px-10 rounded-[2.5rem] shadow-xl hover:bg-brand-gradient active:scale-95 transition-all text-lg tracking-wide uppercase">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
