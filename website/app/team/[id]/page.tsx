"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Linkedin, Mail, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  image: string;
  description: string;
  linkedin?: string;
  email?: string;
}

export default function TeamMemberPage() {
  const [member, setMember] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams(); // Correct way to get dynamic route params in Next.js App Router

  useEffect(() => {
    if (!id) return;

    async function fetchMember() {
      try {
        const response = await fetch(`/api/teams/${id}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setMember(data);
      } catch (error) {
        console.error("Error fetching team member:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMember();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Team member not found</h1>
        <button onClick={() => router.back()} className="flex items-center text-red-600 hover:text-red-700">
          <ArrowLeft className="mr-2" /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-red-600 mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="mr-2" /> Back to Team
        </motion.button>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold">{member.name}</h1>
            <p className="text-red-600 text-xl">{member.title}</p>

            <div className="flex space-x-4">
              {member.linkedin && (
                <motion.a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="bg-[#0077B5] text-white p-2 rounded-full hover:bg-opacity-90 transition-colors duration-300"
                >
                  <Linkedin size={20} />
                </motion.a>
              )}
              {member.email && (
                <motion.a
                  href={`mailto:${member.email}`}
                  whileHover={{ y: -3 }}
                  className="bg-[#EA4335] text-white p-2 rounded-full hover:bg-opacity-90 transition-colors duration-300"
                >
                  <Mail size={20} />
                </motion.a>
              )}
            </div>

            <div className="prose prose-lg max-w-none">
              {member.description.split("\n").map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
