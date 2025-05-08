import { Users, Briefcase, FileText, Clock } from 'lucide-react'

const icons = {
  users: Users,
  briefcase: Briefcase,
  'file-text': FileText,
  clock: Clock
}

const StatsCard = ({ title, value, icon }) => {
  const IconComponent = icons[icon] || Users

  return (
    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
        <IconComponent size={20} className="text-blue-500" />
      </div>
      <p className="text-xl font-semibold text-gray-800">{value}</p>
    </div>
  )
}

export default StatsCard
