import Image from "next/image";
import DownloadButtons from "./DownloadButtons";

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  illustration?: React.ReactNode;
  ctaText?: string;
  ctaHref?: string;
  reverse?: boolean;
  showDownloads?: boolean;
}

const Hero = ({
  title,
  subtitle,
  description,
  image,
  illustration,
  ctaText = "Get Started",
  ctaHref = "#",
  reverse = false,
  showDownloads = false,
}: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`flex flex-col gap-16 lg:flex-row lg:items-center ${reverse ? "lg:flex-row-reverse" : ""}`}>
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center rounded-full bg-brand-gradient/10 px-3 py-1 text-sm font-semibold leading-6 text-brand-start ring-1 ring-inset ring-brand-start/20 uppercase tracking-widest font-bold">
              {subtitle}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-ebony sm:text-6xl" dangerouslySetInnerHTML={{ __html: title }} />
            <p className="max-w-xl text-lg leading-8 text-slate-gray">
              {description}
            </p>
            {showDownloads ? (
              <div className="pt-4">
                <DownloadButtons />
              </div>
            ) : (
              <div className="flex items-center gap-x-6">
                <a
                  href={ctaHref}
                  className="bg-brand-gradient rounded-full px-8 py-4 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105 active:scale-95"
                >
                  {ctaText}
                </a>
                <a href="#" className="text-sm font-semibold leading-6 text-ebony">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[3rem] bg-image-bg ring-1 ring-gray-100 shadow-2xl flex items-center justify-center">
              {illustration ? (
                illustration
              ) : image ? (
                 <Image src={image} alt={title} fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-brand-gradient opacity-10">
                  <span className="text-8xl">📱</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
