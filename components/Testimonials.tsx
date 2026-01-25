import React from 'react'

function Testimonials() {
  return (
    <div><section id="testimonials" className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8">What Clients Say</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-6 border rounded-xl shadow-sm">
            <p>"Excellent planning and beautiful design!"</p>
            <h4 className="mt-4 font-semibold">Client {i}</h4>
          </div>
        ))}
      </div>
    </section></div>
  )
}

export default Testimonials