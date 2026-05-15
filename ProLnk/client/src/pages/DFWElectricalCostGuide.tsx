export default function DFWElectricalCostGuide() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-6">DFW Electrical Cost Guide</h1>
        <p className="text-xl text-gray-300 mb-10">Understand electrical repair and installation costs across the Dallas-Fort Worth metroplex.</p>
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <p className="text-gray-400">
            ProLnk connects homeowners with vetted home service professionals across the Dallas-Fort Worth metroplex.
            Join our waitlist to be among the first to access our network.
          </p>
          <a
            href="/apply"
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Join the Network
          </a>
        </div>
      </div>
    </div>
  );
}
