export interface ServiceContent {
    title: string
    description: string
    buttonText: string
    buttonLink: string
  }
  
  export interface Service {
    id: number
    title: string
    description: string
    image: string
    content: ServiceContent
    features?: ServiceFeature[]
    faqs?: FAQ[]
  }
  
  export interface ServiceFeature {
    title: string
    description: string
    icon: string
  }
  
  export interface FAQ {
    question: string
    answer: string
  }
  
  export interface Testimonial {
    id: number
    name: string
    position: string
    company: string
    quote: string
    image: string
    rating: number
    serviceId: number
  }
  
  export const services: Service[] = [
    {
      id: 1,
      title: "Entrepreneurial Skills",
      description: "Streamline your operations and boost performance",
      image: "/images/one.webp",
      content: {
        title: "Business Skills Development",
        description:
          "Our experts will guide you in refining your entrepreneurial skills, streamlining your business operations, and optimizing your team's performance. We focus on empowering entrepreneurs to scale efficiently.",
        buttonText: "Learn More",
        buttonLink: "/service/operations",
      },
      features: [
        {
          title: "Leadership Development",
          description: "Enhance your leadership capabilities to effectively guide your team and business to success.",
          icon: "users",
        },
        {
          title: "Process Optimization",
          description: "Streamline your business processes to eliminate inefficiencies and maximize productivity.",
          icon: "settings",
        },
        {
          title: "Team Performance",
          description: "Develop strategies to improve team collaboration, communication, and overall performance.",
          icon: "bar-chart",
        },
        {
          title: "Resource Management",
          description: "Learn to allocate and manage resources effectively to achieve optimal business outcomes.",
          icon: "briefcase",
        },
      ],
      faqs: [
        {
          question: "How long does the entrepreneurial skills development program take?",
          answer:
            "Our entrepreneurial skills development program typically spans 8-12 weeks, depending on your specific needs and goals. We offer flexible scheduling options to accommodate your business operations.",
        },
        {
          question: "Can you customize the training for my specific industry?",
          answer:
            "We tailor our entrepreneurial skills development program to your specific industry, business size, and unique challenges. Our experts have experience across various sectors and will customize the training accordingly.",
        },
        {
          question: "What results can I expect from improving my entrepreneurial skills?",
          answer:
            "Clients typically report a 30-40% improvement in operational efficiency, enhanced leadership capabilities, better team management, and increased business growth within 6 months of completing our program.",
        },
        {
          question: "Do you offer ongoing support after the initial training?",
          answer:
            "Yes, we provide 3 months of follow-up support after the initial training to ensure successful implementation of the skills and strategies learned. Extended support packages are also available.",
        },
      ],
    },
    {
      id: 2,
      title: "Business Management",
      description: "Scale your business strategically",
      image: "/images/three.jpg",
      content: {
        title: "Strategic Business Management",
        description:
          "Our consulting services help you create and implement growth strategies tailored to your unique business objectives. We help you make informed decisions and capitalize on emerging market opportunities to grow your business efficiently.",
        buttonText: "Learn More",
        buttonLink: "/service/growth",
      },
      features: [
        {
          title: "Market Analysis",
          description:
            "Comprehensive analysis of market trends, competitors, and opportunities to inform your growth strategy.",
          icon: "line-chart",
        },
        {
          title: "Strategic Planning",
          description: "Develop clear, actionable strategic plans aligned with your business vision and goals.",
          icon: "target",
        },
        {
          title: "Growth Roadmapping",
          description: "Create detailed roadmaps for sustainable business growth with measurable milestones.",
          icon: "trending-up",
        },
        {
          title: "Risk Management",
          description: "Identify potential risks and develop mitigation strategies to protect your business.",
          icon: "shield",
        },
      ],
      faqs: [
        {
          question: "How do you approach strategic business management for different sized companies?",
          answer:
            "We tailor our approach based on your company size, industry, and growth stage. For startups, we focus on establishing strong foundations and market positioning. For established businesses, we emphasize optimization, scaling, and market expansion strategies.",
        },
        {
          question: "What is your process for developing a growth strategy?",
          answer:
            "Our process includes: 1) Comprehensive business assessment, 2) Market and competitor analysis, 3) Identifying growth opportunities, 4) Strategy development with clear KPIs, 5) Implementation planning, and 6) Ongoing monitoring and adjustment.",
        },
        {
          question: "How long does it take to see results from a new business strategy?",
          answer:
            "While some operational improvements may be visible within weeks, meaningful business growth typically begins to materialize within 3-6 months. Our strategies include both quick wins and long-term sustainable growth initiatives.",
        },
        {
          question: "Do you help with strategy implementation or just planning?",
          answer:
            "We provide end-to-end support, from strategy development through implementation and monitoring. Our team can work alongside yours to ensure successful execution and make adjustments as needed.",
        },
      ],
    },
    {
      id: 3,
      title: "Monitoring and Evaluation®",
      description: "Maximize your investments with expert evaluations, audits, and strategic guidance.",
      image: "/images/one.webp",
      content: {
        title: "Performance Monitoring & Evaluation",
        description:
          "We offer comprehensive monitoring and evaluation services to assess your business processes, ensuring optimal performance. Our services include evaluations, audits, and custom-tailored support strategies.",
        buttonText: "Learn More",
        buttonLink: "/service/procore",
      },
      features: [
        {
          title: "Performance Metrics",
          description: "Establish key performance indicators and metrics to effectively track business performance.",
          icon: "activity",
        },
        {
          title: "Audit Services",
          description:
            "Comprehensive audits to identify inefficiencies, compliance issues, and improvement opportunities.",
          icon: "check-square",
        },
        {
          title: "Data Analysis",
          description: "Advanced data analysis to extract actionable insights and inform decision-making.",
          icon: "pie-chart",
        },
        {
          title: "Continuous Improvement",
          description: "Implement systems for ongoing monitoring and continuous business improvement.",
          icon: "refresh-cw",
        },
      ],
      faqs: [
        {
          question: "What types of monitoring and evaluation services do you offer?",
          answer:
            "We offer a comprehensive range of services including process evaluations, performance audits, efficiency assessments, compliance reviews, financial audits, operational monitoring, and custom evaluation frameworks tailored to your specific business needs.",
        },
        {
          question: "How often should my business conduct performance evaluations?",
          answer:
            "For optimal results, we recommend quarterly performance reviews for key metrics, semi-annual process evaluations, and annual comprehensive audits. However, we customize the frequency based on your industry, business size, and specific challenges.",
        },
        {
          question: "How do you ensure the evaluation process doesn't disrupt our operations?",
          answer:
            "Our evaluation methodology is designed to be minimally invasive. We work around your schedule, utilize existing data where possible, and conduct assessments in phases to minimize operational disruption while still gathering comprehensive insights.",
        },
        {
          question: "What deliverables can we expect from your monitoring and evaluation services?",
          answer:
            "Our deliverables include detailed assessment reports, visual dashboards of key metrics, specific recommendations for improvement, implementation roadmaps, and follow-up support to ensure effective implementation of suggested changes.",
        },
      ],
    },
    {
      id: 4,
      title: "Trainer Development",
      description: "Expert support when you need it",
      image: "/images/three.jpg",
      content: {
        title: "Professional Trainer Development",
        description:
          "Gain access to experienced trainers who will mentor and develop your team, ensuring the transfer of critical skills for growth. We also offer part-time or project-based professionals to support business initiatives.",
        buttonText: "Learn More",
        buttonLink: "/service/fractional",
      },
      features: [
        {
          title: "Expert Mentorship",
          description: "Connect with seasoned professionals who provide guidance and share industry expertise.",
          icon: "user",
        },
        {
          title: "Skills Transfer",
          description: "Structured programs to effectively transfer critical skills to your team members.",
          icon: "gift",
        },
        {
          title: "Flexible Engagement",
          description: "Access to part-time or project-based professionals to supplement your team as needed.",
          icon: "calendar",
        },
        {
          title: "Custom Training",
          description: "Tailored training programs designed to address your specific business needs.",
          icon: "book",
        },
      ],
      faqs: [
        {
          question: "What qualifications do your trainers have?",
          answer:
            "Our trainers are industry veterans with a minimum of 10+ years of experience in their respective fields. They hold relevant certifications, have proven track records of success, and undergo our rigorous selection process to ensure they can effectively transfer knowledge and skills.",
        },
        {
          question: "Can you provide trainers for specialized or technical fields?",
          answer:
            "Yes, we have a diverse network of specialized trainers across various industries and technical domains including IT, finance, manufacturing, healthcare, retail, and more. We match trainers with relevant industry experience to your specific needs.",
        },
        {
          question: "How do you ensure knowledge transfer is effective?",
          answer:
            "We employ a structured methodology that includes needs assessment, customized training plans, hands-on learning, practical application, regular progress evaluations, and follow-up support. This comprehensive approach ensures effective and lasting knowledge transfer.",
        },
        {
          question: "What is the typical engagement duration for trainer development?",
          answer:
            "Engagements typically range from 3-6 months depending on the complexity of skills being transferred and your team's learning pace. We offer flexible arrangements including intensive boot camps, regular weekly sessions, or extended part-time engagements.",
        },
      ],
    },
  ]
  
  export const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO",
      company: "TechStart Inc.",
      quote:
        "The entrepreneurial skills development program transformed how I lead my company. Our operational efficiency improved by 35% within just three months!",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      serviceId: 1,
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Founder",
      company: "GrowthWave",
      quote:
        "Their business management consulting helped us identify untapped market opportunities and develop a growth strategy that doubled our revenue in one year.",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      serviceId: 2,
    },
    {
      id: 3,
      name: "Priya Patel",
      position: "Operations Director",
      company: "Elevate Solutions",
      quote:
        "The monitoring and evaluation services provided invaluable insights into our processes. We've eliminated bottlenecks and improved customer satisfaction by 40%.",
      image: "/placeholder.svg?height=100&width=100",
      rating: 4,
      serviceId: 3,
    },
    {
      id: 4,
      name: "David Wilson",
      position: "HR Manager",
      company: "Innovate Partners",
      quote:
        "The trainer development program was exactly what our team needed. The knowledge transfer was seamless, and we now have the in-house expertise to drive our initiatives forward.",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      serviceId: 4,
    },
    {
      id: 5,
      name: "Emma Rodriguez",
      position: "Small Business Owner",
      company: "Craft & Create",
      quote:
        "As a small business owner, I was skeptical about consulting services, but their entrepreneurial skills program was practical and immediately applicable. Best investment I've made!",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      serviceId: 1,
    },
    {
      id: 6,
      name: "James Thompson",
      position: "Marketing Director",
      company: "Brand Forward",
      quote:
        "Their strategic business management approach helped us navigate a challenging market transition. Their insights were spot-on and the implementation support was exceptional.",
      image: "/placeholder.svg?height=100&width=100",
      rating: 4,
      serviceId: 2,
    },
    {
      id: 7,
      name: "Aisha Mbeki",
      position: "Project Manager",
      company: "BuildRight Construction",
      quote:
        "The monitoring and evaluation framework they developed has become our gold standard. We can now accurately measure performance and make data-driven decisions.",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      serviceId: 3,
    },
    {
      id: 8,
      name: "Robert Kim",
      position: "CTO",
      company: "DataSphere",
      quote:
        "The trainer they provided for our technical team was exceptional. They quickly understood our needs and delivered a customized program that upskilled our entire development team.",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      serviceId: 4,
    },
  ]
  
  export const getServiceById = (id: number): Service | undefined => {
    return services.find((service) => service.id === id)
  }
  
  export const getServiceBySlug = (slug: string): Service | undefined => {
    const slugMap: Record<string, number> = {
      operations: 1,
      growth: 2,
      procore: 3,
      fractional: 4,
    }
  
    const id = slugMap[slug]
    return id ? getServiceById(id) : undefined
  }
  
  export const getRelatedServices = (currentId: number, limit = 3): Service[] => {
    return services
      .filter((service) => service.id !== currentId)
      .sort(() => 0.5 - Math.random())
      .slice(0, limit)
  }
  
  export const getServiceTestimonials = (serviceId: number): Testimonial[] => {
    return testimonials.filter((testimonial) => testimonial.serviceId === serviceId)
  }
  
  