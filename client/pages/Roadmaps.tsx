import React from "react";
import { BookOpen, Cpu, Code2, Briefcase } from "lucide-react"; // Icons

const roadmaps = [
  {
  title: "Cloud Computing - AWS",
  description: "Learn core AWS services including EC2, S3, Lambda, IAM, and build scalable cloud-based applications.",
  icon: <Code2 className="w-8 h-8 text-sky-500" />,
  link: "/roadmaps/aws",
},
{
  title: "AI / Machine Learning",
  description: "Master Python, machine learning algorithms, deep learning frameworks, and real-world model deployment.",
  icon: <Cpu className="w-8 h-8 text-green-500" />,
  link: "#",
},
{
  title: "Data Science",
  description: "Develop expertise in statistics, data cleaning, visualization, predictive modeling, and big data tools.",
  icon: <BookOpen className="w-8 h-8 text-purple-500" />,
  link: "#",
},
{
  title: "Full Stack Development in Java",
  description: "Gain hands-on skills in Java, Spring Boot, REST APIs, frontend frameworks, and database integration.",
  icon: <Briefcase className="w-8 h-8 text-sky-500" />,
  link: "/roadmaps/java",
},
{
  title: "Full Stack Development in .Net",
  description: "Learn C#, ASP.NET Core, MVC, Entity Framework, frontend integration, and deployment strategies.",
  icon: <Briefcase className="w-8 h-8 text-orange-500" />,
  link: "#",
}
];

export default function Roadmaps() {
  return (
    <div className="container py-20">
      <h1 className="text-4xl font-bold text-center mb-4">
        🚀 Explore Roadmaps
      </h1>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
        Choose a roadmap to start your learning journey. Each roadmap is designed
        step-by-step to take you from beginner to advanced.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {roadmaps.map((roadmap, index) => (
          <div
            key={index}
            className="p-6 border rounded-2xl shadow hover:shadow-lg transition bg-white dark:bg-gray-900"
          >
            <div className="flex items-center gap-4 mb-4">
              {roadmap.icon}
              <h2 className="text-xl font-semibold">{roadmap.title}</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {roadmap.description}
            </p>
            <a
              href={roadmap.link}
              className="inline-block px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Start Learning →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
