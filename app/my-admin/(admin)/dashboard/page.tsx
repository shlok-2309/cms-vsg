'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUsers, FaEnvelope, FaStar, FaChartLine } from "react-icons/fa";

export default function Dashboard() {

  const router = useRouter();

  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    contactMessages: 0,
    testimonials: 0,
    growthRate: 0
  });

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/admin/profile");
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    }
    fetchUser();

    // Simulated stats - replace with actual API calls
    setStats({
      totalUsers: 1247,
      contactMessages: 89,
      testimonials: 156,
      growthRate: 23.5
    });
  }, []);

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: FaUsers,
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Contact Messages",
      value: stats.contactMessages,
      icon: FaEnvelope,
      color: "from-purple-500 to-purple-600",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Testimonials",
      value: stats.testimonials,
      icon: FaStar,
      color: "from-amber-500 to-amber-600",
      textColor: "text-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      title: "Growth Rate",
      value: `${stats.growthRate}%`,
      icon: FaChartLine,
      color: "from-green-500 to-green-600",
      textColor: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  return (
    <div className="pt- 5 bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, <span className="text-blue-600">{user?.name || "Admin"}</span>!
          </h1>
          <p className="text-gray-600">Here's what's happening with your platform today.</p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
              >
                <div className={`h-2 bg-gradient-to-r ${card.color}`}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${card.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 ${card.textColor}`} />
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-gray-800">{card.value}</p>
                    </div>
                  </div>
                  <h3 className="text-gray-600 font-medium">{card.title}</h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <p className="text-gray-700 text-sm">New user registered - John Doe</p>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <p className="text-gray-700 text-sm">Contact message received</p>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                <p className="text-gray-700 text-sm">New testimonial submitted</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                View Users
              </button>

              <button
                onClick={() => router.push('/my-admin/contactus')}
                className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                Messages
              </button>

              <button className="p-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                Testimonials
              </button>
              <button className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}