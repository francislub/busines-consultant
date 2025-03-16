export interface CaseStudy {
    id: number
    title: string
    description: string
    image: string
    clientName: string
    industry: string
    services: string[]
    challenge: string
    solution: string
    results: string[]
    testimonial?: {
      quote: string
      author: string
      position: string
    }
    slug: string
    featured?: boolean
  }
  
  export type Industry = "Technology" | "Healthcare" | "Finance" | "Manufacturing" | "Retail" | "Education" | "Non-Profit"
  export type Service =
    | "Entrepreneurial Skills"
    | "Business Management"
    | "Monitoring and Evaluation"
    | "Trainer Development"
  
  export const industries: Industry[] = [
    "Technology",
    "Healthcare",
    "Finance",
    "Manufacturing",
    "Retail",
    "Education",
    "Non-Profit",
  ]
  
  export const services: Service[] = [
    "Entrepreneurial Skills",
    "Business Management",
    "Monitoring and Evaluation",
    "Trainer Development",
  ]
  
  export const caseStudies: CaseStudy[] = [
    {
      id: 1,
      title: "Efficiency Transformation for Regional Healthcare Provider",
      description: "How we helped a healthcare network streamline operations and improve patient care metrics",
      image: "/placeholder.svg?height=600&width=800",
      clientName: "Sunshine Healthcare Network",
      industry: "Healthcare",
      services: ["Entrepreneurial Skills", "Monitoring and Evaluation"],
      challenge:
        "Sunshine Healthcare Network, a regional provider with 12 facilities, was struggling with operational inefficiencies that led to extended wait times, staff burnout, and declining patient satisfaction scores. Their manual processes were creating data silos and preventing timely decision-making.",
      solution:
        "We implemented a comprehensive operational excellence program that included process mapping and optimization, leadership development for department heads, and implementation of a real-time performance monitoring system. Our team conducted workshops with frontline staff to identify pain points and develop solutions, ensuring buy-in across the organization.",
      results: [
        "30% reduction in patient wait times across all facilities",
        "25% improvement in staff satisfaction scores",
        "40% decrease in administrative overhead costs",
        "Patient satisfaction ratings increased from 72% to 91%",
        "Successfully centralized data reporting, reducing report generation time by 65%",
      ],
      testimonial: {
        quote:
          "The Mancha Development team transformed our operations in ways we couldn't have imagined. Their methodical approach to identifying inefficiencies and developing practical solutions has completely revitalized our organization. The results speak for themselves in our metrics, but the real success is in the improved morale of our team.",
        author: "Dr. Sarah Johnson",
        position: "Chief Operations Officer, Sunshine Healthcare Network",
      },
      slug: "healthcare-efficiency-transformation",
      featured: true,
    },
    {
      id: 2,
      title: "Strategic Growth Plan for Emerging Fintech Startup",
      description: "Developing a scalable growth strategy that helped secure Series B funding",
      image: "/placeholder.svg?height=600&width=800",
      clientName: "PayQuick Solutions",
      industry: "Finance",
      services: ["Business Management", "Entrepreneurial Skills"],
      challenge:
        "PayQuick Solutions had developed an innovative payment processing platform but struggled to gain market traction and scale effectively. With competition increasing and investor pressure mounting, they needed a clear strategy to accelerate growth and secure additional funding.",
      solution:
        "We developed a comprehensive growth strategy that included market segmentation analysis, competitive positioning, pricing optimization, and a strategic roadmap for feature development. Our team also helped restructure the sales and marketing departments to better align with the new growth strategy and mentored the leadership team in operational scaling.",
      results: [
        "Successfully secured $18M in Series B funding",
        "120% increase in customer acquisition rate over 6 months",
        "45% improvement in customer retention metrics",
        "Expanded into 3 new vertical markets with customized offerings",
        "Developed partnerships with 5 major financial institutions, creating new revenue streams",
      ],
      testimonial: {
        quote:
          "Working with Mancha Development was a game-changer for our business. Their strategic insights and practical approach to growth helped us not only secure our Series B funding but also establish the foundation for sustainable growth. They didn't just deliver a strategy document; they worked alongside us to implement it successfully.",
        author: "Michael Chen",
        position: "CEO, PayQuick Solutions",
      },
      slug: "fintech-startup-growth-strategy",
      featured: true,
    },
    {
      id: 3,
      title: "Manufacturing Excellence Program for Automotive Parts Supplier",
      description: "Implementing a quality control and continuous improvement system that reduced defects by 78%",
      image: "/placeholder.svg?height=600&width=800",
      clientName: "TechParts Manufacturing",
      industry: "Manufacturing",
      services: ["Monitoring and Evaluation", "Trainer Development"],
      challenge:
        "TechParts Manufacturing was experiencing high defect rates, increasing customer complaints, and growing production costs. Their traditional quality control processes were reactive rather than preventive, and staff lacked the skills to implement modern manufacturing excellence principles.",
      solution:
        "We designed and implemented a comprehensive manufacturing excellence program that included a robust quality management system, real-time monitoring dashboards, and extensive staff training. Our team developed custom training modules for different departments and trained internal champions who could sustain the improvement initiative long-term.",
      results: [
        "78% reduction in product defect rates within 8 months",
        "65% decrease in customer quality complaints",
        "Annual cost savings of $3.2 million through waste reduction",
        "22% improvement in overall equipment effectiveness (OEE)",
        "Successful ISO 9001:2015 certification on first audit attempt",
      ],
      testimonial: {
        quote:
          "The manufacturing excellence program developed by Mancha Development has transformed our operations. Not only did they help us implement new systems and processes, but they also ensured our team developed the skills to maintain and continuously improve them. The results have exceeded our expectations and positioned us as a preferred supplier to major automotive manufacturers.",
        author: "Robert Jenkins",
        position: "Plant Manager, TechParts Manufacturing",
      },
      slug: "manufacturing-excellence-program",
      featured: false,
    },
    {
      id: 4,
      title: "Digital Transformation for Traditional Retail Chain",
      description: "Helping a family-owned retail business successfully transition to omnichannel operations",
      image: "/placeholder.svg?height=600&width=800",
      clientName: "Heritage Home Goods",
      industry: "Retail",
      services: ["Business Management", "Entrepreneurial Skills", "Trainer Development"],
      challenge:
        "Heritage Home Goods, a family-owned retail chain with 35 years of history, was losing market share to online competitors and big-box stores. Their traditional business model and lack of digital presence were limiting growth opportunities, and staff were resistant to technology-driven changes.",
      solution:
        "We developed a phased digital transformation strategy that respected the company's heritage while modernizing operations. This included e-commerce integration, inventory management systems, staff training programs, and a revised customer experience strategy that bridged online and in-store shopping experiences.",
      results: [
        "Successfully launched e-commerce platform generating 28% of total revenue within one year",
        "Inventory accuracy improved from 82% to 97%",
        "In-store sales increased by 15% through 'online-to-offline' promotions",
        "Customer satisfaction scores increased by 32%",
        "Staff technology adoption reached 95% across all locations",
      ],
      testimonial: {
        quote:
          "Mancha Development understood that our digital transformation wasn't just about technology—it was about preserving our company culture while evolving our business model. Their sensitive approach to change management and practical training programs helped our team embrace new systems rather than resist them. We're now seeing growth we haven't experienced in over a decade.",
        author: "Emma Rodriguez",
        position: "Owner & CEO, Heritage Home Goods",
      },
      slug: "retail-digital-transformation",
      featured: true,
    },
    {
      id: 5,
      title: "Operational Restructuring for International Education Provider",
      description: "Streamlining operations across 12 countries while improving educational outcomes",
      image: "/placeholder.svg?height=600&width=800",
      clientName: "Global Learning Institute",
      industry: "Education",
      services: ["Monitoring and Evaluation", "Business Management"],
      challenge:
        "Global Learning Institute was experiencing inconsistent quality across its international locations, rising operational costs, and difficulties standardizing processes while respecting local educational requirements. Their decentralized structure was creating inefficiencies and preventing effective knowledge sharing.",
      solution:
        "We conducted a comprehensive operational assessment across all locations and developed a hybrid operational model that standardized core processes while allowing for necessary local adaptations. Our team implemented a global performance monitoring system, restructured the management hierarchy, and developed knowledge-sharing platforms to leverage best practices across the organization.",
      results: [
        "Operational costs reduced by 22% through elimination of redundant processes",
        "Standardized quality metrics improved by an average of 35% across all locations",
        "Student satisfaction scores increased by 28%",
        "Successful expansion into 3 new countries using the optimized operational model",
        "Employee retention improved by 40% through clearer career pathways and better resource allocation",
      ],
      testimonial: {
        quote:
          "The operational restructuring led by Mancha Development has transformed our international operations. They skillfully balanced the need for standardization with respect for local educational contexts. The monitoring and evaluation framework they implemented has given us unprecedented visibility into our performance and allowed us to make data-driven decisions across our global network.",
        author: "Dr. James Patterson",
        position: "Executive Director, Global Learning Institute",
      },
      slug: "education-operational-restructuring",
      featured: false,
    },
    {
      id: 6,
      title: "Technology Infrastructure Modernization for Non-Profit Organization",
      description: "Helping a community-focused non-profit leverage technology to expand their impact",
      image: "/placeholder.svg?height=600&width=800",
      clientName: "Community Impact Foundation",
      industry: "Non-Profit",
      services: ["Trainer Development", "Entrepreneurial Skills"],
      challenge:
        "Community Impact Foundation was operating with outdated technology systems that limited their ability to track outcomes, engage with donors, and effectively manage volunteer resources. With limited IT expertise on staff and budget constraints, they needed a practical approach to technology modernization.",
      solution:
        "We developed a phased technology modernization plan that prioritized high-impact, low-cost improvements. Our team implemented a cloud-based management system, trained staff on digital tools, and developed a technology sustainability plan. We also created a 'train-the-trainer' program to build internal technology champions.",
      results: [
        "Volunteer management efficiency improved by 65%",
        "Grant application processing time reduced by 75%",
        "Online donations increased by 120% through improved digital presence",
        "Program outcome tracking capabilities enabled securing of three major new grants",
        "Staff technology proficiency increased by 85% across all departments",
      ],
      testimonial: {
        quote:
          "Mancha Development understood our unique challenges as a non-profit and designed solutions that maximized impact while respecting our resource constraints. Their hands-on training approach ensured our team not only accepted the new systems but embraced them. We've been able to significantly expand our community programs thanks to the efficiency gains and improved funding opportunities.",
        author: "Aisha Mbeki",
        position: "Executive Director, Community Impact Foundation",
      },
      slug: "nonprofit-technology-modernization",
      featured: false,
    },
  ]
  
  export const getFilteredCaseStudies = (industryFilter?: Industry | "All", serviceFilter?: Service | "All") => {
    return caseStudies.filter((study) => {
      const matchesIndustry =
        industryFilter === "All" || industryFilter === undefined || study.industry === industryFilter
      const matchesService =
        serviceFilter === "All" || serviceFilter === undefined || study.services.includes(serviceFilter)
      return matchesIndustry && matchesService
    })
  }
  
  export const getFeaturedCaseStudies = () => {
    return caseStudies.filter((study) => study.featured)
  }
  
  export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined => {
    return caseStudies.find((study) => study.slug === slug)
  }
  
  export const getRelatedCaseStudies = (currentId: number, limit = 3): CaseStudy[] => {
    const current = caseStudies.find((study) => study.id === currentId)
    if (!current) return []
  
    return caseStudies
      .filter((study) => study.id !== currentId)
      .sort((a, b) => {
        // Prioritize case studies with matching industry or services
        const aSharedServices = a.services.filter((s) => current.services.includes(s)).length
        const bSharedServices = b.services.filter((s) => current.services.includes(s)).length
  
        if (a.industry === current.industry && b.industry !== current.industry) return -1
        if (a.industry !== current.industry && b.industry === current.industry) return 1
  
        return bSharedServices - aSharedServices
      })
      .slice(0, limit)
  }
  
  