import React from "react";

function Testimonials() {
  const feedback = [
    {
      name: "Naledi",
      role: "Job Seeker",
      quote: "I found a job within days. So easy to use!",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Thabo",
      role: "Small Business Owner",
      quote: "Great platform for small businesses. Very easy to post jobs and find local talent.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ];

  return (
    <section className="py-12 px-4 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-10">What Our Users Say</h2>
      <div className="flex flex-col md:flex-row justify-center gap-8">
        {feedback.map((f, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-lg max-w-sm mx-auto text-left"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={f.avatar}
                alt={`${f.name}'s avatar`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">{f.name}</h4>
                <p className="text-sm text-gray-500">{f.role}</p>
              </div>
            </div>
            <p className="italic text-gray-700 leading-relaxed">“{f.quote}”</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
