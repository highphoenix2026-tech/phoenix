"use client";

import { useLocale } from "next-intl";
import { trainingData } from "@/app/data/trainingdata";

export default function TrainingDeliverySection() {
 const locale = useLocale() as "en" | "ar";
  const {delivery} = trainingData[locale];


  return (
    <section className="bg-[#f1f3f5] py-28 px-6 md:px-24">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl centert md:text-4xl font-extrabold text-[#0b1236]">{delivery.title}</h2>
        <p className="mt-2 centert text-slate-700">{delivery.subtitle}</p>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {delivery.models.map((model, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
              <h3 className="font-bold centert text-[#0b1236] text-xl">{model.title}</h3>
              <p className="mt-2 centert text-slate-700 text-sm">{model.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {delivery.methods.map((method, i) => (
            <span key={i} className="px-4 py-2 rounded-full bg-[#0b1236]/10 text-[#0b1236] text-sm">
              {method}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
