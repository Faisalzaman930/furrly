import Link from "next/link";

export default function VetDisclaimer() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-4 items-start mb-8">
      <span className="text-2xl flex-shrink-0">⚕️</span>
      <div>
        <p className="text-xs font-black text-amber-800 uppercase tracking-widest mb-1">Veterinary Disclaimer</p>
        <p className="text-sm text-amber-900 leading-relaxed">
          This article is for informational purposes only and is not a substitute for professional veterinary advice, diagnosis, or treatment.
          Always consult a licensed veterinarian for your pet&apos;s specific health needs.
          In an emergency, contact your nearest emergency vet immediately or call the{" "}
          <a href="https://www.aspca.org/pet-care/animal-poison-control-center" target="_blank" rel="noopener noreferrer" className="font-bold underline">ASPCA Animal Poison Control Center (888-426-4435)</a>.
        </p>
        <p className="text-xs text-amber-700 mt-2">
          Reviewed by the <Link href="/about/editorial" className="font-bold underline">Furrly Editorial Team</Link> · Sources: ASPCA, WSAVA, Cornell University College of Veterinary Medicine
        </p>
      </div>
    </div>
  );
}
