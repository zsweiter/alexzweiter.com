// export const pages = {
//     en: {
//         home: {},
//         about: {
//             seo: {
//                 title: "About Me | Alex Zweiter",
//                 description: "Know about me",
//             },
//             title: "WHO I | AM",
//             bio: [
//                 "Operating at the intersection of ancient structures and future systems. I build digital experiences that feel physical, weighty, and real.",
//                 "I am a developer passionate about creating scalable solutions that solve real problems, My focus is on transforming complex ideas into useful and impactful digital products.",
//             ],
//             "stack.title": "Stack tech",
//             "stack.description": "Technologies I use",
//             "stack.items": [
//                 {
//                     category: "Languages",
//                     items: ["Golang", "Node.js", "TypeScript", "Python", "PHP", "Lua", "Java"],
//                     // icon: Terminal,
//                 },
//                 {
//                     category: "Frameworks",
//                     items: ["Vue.js", "React", "Svelte", "Astro", "TailwindCSS", "Nestjs"],
//                     // icon: Layers,
//                 },
//                 {
//                     category: "Cloud/DB",
//                     items: ["AWS", "GCP", "Azure", "Serverless", "MySQL", "Postgres", "Mongo"],
//                     // icon: Database,
//                 },
//                 {
//                     category: "AI/ML",
//                     items: ["Computer Vision", "AI Integrations", "Conversational Agents"],
//                     // icon: Cpu,
//                 },
//             ],
//             "experience.title": "Experience",
//             "experience.description": "My professional background",
//             "experience.items": [
//                 {
//                     company: "Digevo",
//                     location: "Santiago de Chile, Chile",
//                     period: "Dec 2022 — Dec 2025",
//                     role: "Full Stack Developer",
//                     achievements: [
//                         'Designed and implemented "Anto", a conversational AI agent for nutritional recommendations using advanced IA personalization.',
//                         "Led the migration of Izzimed platform from WordPress to a high-performance stack with Golang (backend) and Vue.js (frontend).",
//                         "Developed a multi-channel AI agent integrated with WhatsApp and Web to automate user interaction and business actions.",
//                     ],
//                 },
//                 {
//                     company: "AMG Alarcon Management Group",
//                     location: "Lima, Peru",
//                     period: "Sept 2021 — Oct 2022",
//                     role: "Full Stack Developer",
//                     achievements: [
//                         'Implemented "Smart Rooster", an administration system for poultry farms using Laravel, Vue.js, and MySQL stored procedures.',
//                         "Built custom eCommerce solutions including plugins, internal APIs, and modern frontends (Nuxt.js) to optimize business flows.",
//                         "Created high-performance landing pages and landing pages with optimized user experiences.",
//                     ],
//                 },
//             ],
//         },
//         music: {
//             seo: {
//                 title: "Music | Alex Zweiter",
//                 description:
//                     "Explore a selection of music tracks by Alex Zweiter, showcasing creativity and passion for sound.",
//             },
//         },
//         works: {
//             seo: {
//                 title: "Works | Alex Zweiter",
//                 description:
//                     "Explore a selection of projects by Alex Zweiter, showcasing expertise in web development, CMS, and secure communication.",
//             },
//             title: "Selected | Works",
//             projects: [
//                 {
//                     title: "Janque ORG Community Website",
//                     description:
//                         "A community-driven website created as a shared digital space for a Quechua-speaking community. The project focuses on accessibility, storytelling, and content sharing, using modern web technologies while keeping the platform simple and sustainable.",
//                     stack: ["Nuxt 4", "Nuxt Content", "Jamstack"],
//                     status: "Active / Evolving",
//                     preview: "https://janque.org",
//                     repository: "https://github.com/your-username/janque-org",
//                     created_at: "2024",
//                 },
//                 {
//                     title: "Vayload CMS",
//                     description:
//                         "A custom headless CMS built to support community-focused platforms like Janque ORG. Designed with a Microkernel architecture, it enables modular growth, plugin-based extensions, and scripting for long-term adaptability.",
//                     stack: ["Go", "Svelte", "Lua", "Microkernel Architecture"],
//                     status: "In Development",
//                     preview: null,
//                     repository: "https://github.com/your-username/vayload",
//                     created_at: "2024",
//                 },
//                 {
//                     title: "Swilen Framework",
//                     description:
//                         "An experimental PHP framework inspired by Laravel and Express, developed to explore backend architecture, testing practices, and framework design. Released as a beta and later discontinued.",
//                     stack: ["PHP 7.4", "PHP 8 (Planned)", "Pest"],
//                     status: "Beta / Discontinued",
//                     preview: null,
//                     repository: "https://github.com/your-username/swilen",
//                     created_at: "2023",
//                 },
//                 {
//                     title: "Encrypted Real-Time Chat Experiment",
//                     description:
//                         "A real-time chat application built as an experiment in secure communication, implementing RSA-based end-to-end encryption over WebSockets to explore privacy and cryptographic patterns.",
//                     stack: ["React", "Node.js", "WebSockets", "RSA Encryption"],
//                     status: "Experimental",
//                     preview: null,
//                     repository: "https://github.com/your-username/encrypted-chat",
//                     created_at: "2025",
//                 },
//             ],
//         },
//     },
// };

export const pages = {
    en: {
        home: {
            seo: {
                title: "Home | Alex Zweiter",
                description:
                    "Building scalable systems that bridge ancient wisdom with cutting-edge technology. From WordPress migrations to production AI agents.",
            },
            hero: {
                title: "Alex Zweiter",
                subtitle: "Full-Stack Developer | Music Producer",
                description:
                    "Building scalable systems that bridge ancient wisdom with cutting-edge technology. From WordPress migrations to production AI agents.",
                cta: "View My Work",
                ctaLink: "/works",
            },
            stats: {
                title: "By the Numbers",
                items: [
                    { label: "Projects Live", value: "10+" },
                    { label: "Years Experience", value: "5+" },
                    { label: "AI Interactions/mo", value: "10k+" },
                    { label: "Performance Gains", value: "6x" },
                ],
            },
            featured: {
                title: "Featured Projects",
                projects: [
                    {
                        title: "Janque ORG",
                        description: "Quechua community platform • 5k+ monthly visits",
                        link: "/works#janque",
                    },
                    {
                        title: "Anto AI",
                        description: "Conversational nutrition coach • Production live",
                        link: "/works#anto",
                    },
                ],
            },
        },
        about: {
            seo: {
                title: "About Me | Alex Zweiter",
                description:
                    "Full-stack developer specializing in AI agents, cloud infrastructure, and high-performance systems. From WordPress migrations to conversational AI.",
            },
            title: "WHO I | AM",
            bio: [
                "Architecting at the intersection of ancient wisdom and cutting-edge systems. I craft digital experiences that feel tangible, scalable, and transformative.",
                "Full-stack engineer with expertise in AI agents, cloud-native architectures, and performance optimization. Transforming complex challenges into production-ready solutions.",
            ],
            stack: {
                title: "Tech Stack",
                description: "Tools I master across the full spectrum",
                items: [
                    {
                        category: "Languages",
                        items: ["Golang", "Node.js", "TypeScript", "Python", "PHP", "Lua", "Rust"],
                    },
                    {
                        category: "Frameworks",
                        items: ["Vue.js", "React", "Svelte", "Astro", "TailwindCSS", "NestJS"],
                    },
                    {
                        category: "Cloud/Infrastructure",
                        items: ["AWS", "GCP", "Azure", "Digital Ocean", "Cloudflare"],
                    },
                    {
                        category: "Databases/Queues",
                        items: ["Postgres", "MySQL", "MongoDB", "Redis", "BullMQ"],
                    },
                    {
                        category: "AI/ML",
                        items: ["OpenAI API", "Conversational Agents", "Computer Vision", "Prompt Engineering"],
                    },
                ],
            },
            experience: {
                title: "Experience",
                description: "Proven track record delivering high-impact solutions",
                items: [
                    {
                        company: "Digevo",
                        location: "Santiago de Chile, Chile",
                        period: "Dec 2022 — Present",
                        role: "Senior Full Stack Developer",
                        achievements: [
                            'Architected "Anto" - production AI agent delivering personalized nutritional recommendations using advanced LLM orchestration.',
                            "Led complete platform migration: WordPress → Golang/Vue.js microservices (6x performance, Redis queues replacing cron jobs).",
                            "Built multi-channel AI agent (WhatsApp + Web) processing 10k+ monthly interactions with 99.9% uptime.",
                        ],
                    },
                    {
                        company: "AMG Alarcon Management Group",
                        location: "Lima, Peru",
                        period: "Sept 2021 — Oct 2022",
                        role: "Full Stack Developer",
                        achievements: [
                            'Engineered "Smart Rooster" - poultry farm management system (Laravel/Vue.js) with MySQL stored procedures, handling 50k+ records.',
                            "Delivered custom eCommerce platforms with Nuxt.js APIs, reducing checkout abandonment by 40%.",
                            "Optimized landing pages achieving 3s load times, boosting conversion rates 25%.",
                        ],
                    },
                ],
            },
        },
        music: {
            seo: {
                title: "Music | Alex Zweiter",
                description: "Original music tracks blending electronic experimentation with emotional depth.",
            },
            title: "Music",
            description: "Sound exploration through electronic textures and rhythmic innovation.",
        },
        works: {
            seo: {
                title: "Works | Alex Zweiter",
                description:
                    "Production-grade projects showcasing AI integration, cloud architecture, and full-stack mastery.",
            },
            title: "Selected | Works",
            projects: [
                {
                    title: "Janque ORG",
                    description:
                        "A community-focused platform dedicated to preserving and showcasing Janque's rich culture and heritage. Built using Jamstack architecture with Nuxt 4 to ensure superior performance and security, it empowers community members through a modern digital space for storytelling and news, fully optimized for global distribution and fast delivery via Cloudflare.",
                    stack: ["Nuxt 4", "Nuxt Content", "Cloudflare", "Jamstack"],
                    status: "Production Ready",
                    preview: "https://janque.org",
                    repository: "https://github.com/zsweiter/janque.org",
                    created_at: "2025",
                },
                {
                    title: "Vayload CMS",
                    description:
                        "A high-performance microkernel headless CMS written in Go, specifically engineered for modern community-driven platforms. It provides exceptional extensibility through Lua scripting and multi-database support (Postgres, MySQL, SQLite), enabling developers to manage complex content structures with a highly flexible, scalable, and modular approach to backend management and integration.",
                    stack: ["Golang", "SvelteKit", "Lua", "SQLite/Postgres/MySQL", "Microkernel"],
                    status: "In Development",
                    preview: null,
                    repository: "https://github.com/szweiter/vayload.io",
                    created_at: "2024",
                },
                {
                    title: "Nyx - E2E Encrypted Real-Time Chat",
                    description:
                        "A real-time messaging application featuring robust RSA end-to-end encryption delivered over WebSockets for maximum data integrity. This privacy-centric experiment focuses on securing client-server communications and implementing advanced cryptographic workflows within a modern tech stack involving Node.js and React to protect user conversations from any potential external interference.",
                    stack: ["React", "Node.js", "WebSockets", "RSA", "Rust", "P2P", "WebRTC"],
                    status: "Complete Prototype",
                    preview: null,
                    repository: "https://github.com/zsweiter/Nyx",
                    created_at: "2024",
                },
                {
                    title: "Swilen Framework",
                    description:
                        "An experimental PHP framework with a clean syntax inspired by Laravel and Express, created to explore the intricacies of backend architecture and core systems design. Despite being discontinued, it provided a rigorous environment for mastering automated testing with Pest and building scalable, decoupled software components using modern PHP 8 practices and standards.",
                    stack: ["PHP 7.4", "PHP 8 (Planned)", "Pest"],
                    status: "Beta / Discontinued",
                    preview: "https://packagist.org/packages/swilen/framework",
                    repository: "https://github.com/zsweiter/swilen-framework",
                    created_at: "2023",
                },
            ],
        },
    },
    es: {
        home: {
            seo: {
                title: "Inicio | Alex Zweiter",
                description:
                    "Construyendo sistemas escalables que unen sabiduría ancestral con tecnología de vanguardia. Desde migraciones WordPress hasta agentes IA en producción.",
            },
            hero: {
                title: "Alex Zweiter",
                subtitle: "Desarrollador Full-Stack | Productor Musical",
                description:
                    "Construyendo sistemas escalables que unen sabiduría ancestral con tecnología de vanguardia. Desde migraciones WordPress hasta agentes IA en producción.",
                cta: "Ver Mis Proyectos",
                ctaLink: "/works",
            },
            stats: {
                title: "Por Números",
                items: [
                    { label: "Proyectos Live", value: "10+" },
                    { label: "Años Experiencia", value: "5+" },
                    { label: "Interacciones IA/mes", value: "10k+" },
                    { label: "Ganancias Rendimiento", value: "6x" },
                ],
            },
            featured: {
                title: "Proyectos Destacados",
                projects: [
                    {
                        title: "Janque ORG",
                        description: "Plataforma comunitaria quechua • 5k+ visitas/mes",
                        link: "/works#janque",
                    },
                    {
                        title: "Anto IA",
                        description: "Coach nutricional conversacional • En producción",
                        link: "/works#anto",
                    },
                ],
            },
        },
        about: {
            seo: {
                title: "Sobre Mí | Alex Zweiter",
                description:
                    "Desarrollador full-stack especializado en agentes IA, infraestructura cloud y sistemas de alto rendimiento.",
            },
            title: "QUIÉN SOY",
            bio: [
                "Construyendo en la intersección entre sabiduría ancestral y sistemas futuristas. Creo experiencias digitales tangibles y escalables.",
                "Ingeniero full-stack experto en agentes IA, arquitecturas cloud-native y optimización de rendimiento.",
            ],
            stack: {
                title: "Stack Técnico",
                description: "Tecnologías que domino completamente",
                items: [
                    {
                        category: "Lenguajes",
                        items: ["Golang", "Node.js", "TypeScript", "Python", "PHP", "Lua", "Rust"],
                    },
                    {
                        category: "Frameworks",
                        items: ["Vue.js", "React", "Svelte", "Astro", "TailwindCSS", "NestJS", "Gin"],
                    },
                    {
                        category: "Cloud/Infra",
                        items: ["AWS", "GCP", "Azure", "Digital Ocean", "Docker", "Kubernetes"],
                    },
                    { category: "Bases de Datos", items: ["Postgres", "MySQL", "MongoDB", "Redis", "RabbitMQ"] },
                    { category: "IA/ML", items: ["OpenAI API", "Agentes Conversacionales", "Computer Vision"] },
                ],
            },
            experience: {
                title: "Experiencia",
                description: "Historial comprobado de soluciones de alto impacto",
                items: [
                    {
                        company: "Digevo",
                        location: "Santiago de Chile",
                        period: "Dic 2022 — Actual",
                        role: "Desarrollador Full Stack Senior",
                        achievements: [
                            'Arquitecté "Anto" - agente IA en producción para recomendaciones nutricionales personalizadas.',
                            "Lideré migración completa WordPress → Golang/Vue.js (6x rendimiento, colas Redis).",
                            "Desarrollé agente IA multi-canal procesando 10k+ interacciones mensuales.",
                        ],
                    },
                    {
                        company: "AMG Alarcon Management Group",
                        location: "Lima, Perú",
                        period: "Sept 2021 — Oct 2022",
                        role: "Desarrollador Full Stack",
                        achievements: [
                            'Creé "Smart Rooster" - sistema de gestión avícola (Laravel/Vue.js) para 50k+ registros.',
                            "Desarrollé plataformas eCommerce personalizadas reduciendo abandono 40%.",
                            "Optimizé landing pages mejorando conversiones 25%.",
                        ],
                    },
                ],
            },
        },
        music: {
            seo: {
                title: "Música | Alex Zweiter",
                description: "Pistas originales combinando experimentación electrónica con profundidad emocional.",
            },
            title: "Música",
            description: "Exploración sonora a través de texturas electrónicas e innovación rítmica.",
        },
        works: {
            seo: {
                title: "Proyectos | Alex Zweiter",
                description: "Proyectos production-grade mostrando maestría en IA, cloud y full-stack.",
            },
            title: "Proyectos | Destacados",
            projects: [
                {
                    title: "Janque ORG",
                    description:
                        "Plataforma comunitaria dedicada a preservar y difundir la cultura e historia de Janque. Desarrollada con arquitectura Jamstack usando Nuxt 4 para garantizar máxima velocidad y seguridad, busca empoderar a sus miembros mediante un espacio digital moderno para compartir historias y noticias, optimizado para un despliegue global eficiente en Cloudflare.",
                    stack: ["Nuxt 4", "Nuxt Content", "Cloudflare", "Jamstack"],
                    status: "Production Ready",
                    preview: "https://janque.org",
                    repository: "https://github.com/szweiter/janque-org",
                    created_at: "2025",
                },
                {
                    title: "Vayload CMS",
                    description:
                        "Headless CMS de alto rendimiento con arquitectura microkernel escrito en Go, diseñado específicamente para plataformas comunitarias dinámicas. Ofrece una extensibilidad excepcional mediante scripting en Lua y soporte para múltiples bases de datos como Postgres y SQLite, permitiendo gestionar contenido de forma ágil, escalable y totalmente personalizada según las necesidades del desarrollador.",
                    stack: ["Golang", "SvelteKit", "Lua", "SQLite/Postgres/MySQL", "Microkernel"],
                    status: "In Development",
                    preview: null,
                    repository: "https://github.com/szweiter/vayload.io",
                    created_at: "2024",
                },
                {
                    title: "Encrypted RT Chat",
                    description:
                        "Plataforma de mensajería instantánea en tiempo real que implementa cifrado de extremo a extremo basado en el algoritmo RSA sobre WebSockets. Este proyecto experimental prioriza la privacidad absoluta del usuario, explorando a fondo la comunicación segura cliente-servidor y la gestión de flujos criptográficos en entornos dinámicos construidos con Node.js y React.",
                    stack: ["React", "Node.js", "WebSockets", "RSA", "CryptoJS"],
                    status: "Complete Prototype",
                    preview: null,
                    repository: "https://github.com/alexzweiter/encrypted-chat",
                    created_at: "2024",
                },
                {
                    title: "Swilen Framework",
                    description:
                        "Framework PHP experimental con una sintaxis fluida inspirada en Laravel y Express, creado para explorar el diseño de arquitecturas backend robustas desde cero. Aunque se encuentra discontinuado, sirvió para dominar el testing automatizado con Pest y la creación de componentes desacoplados, reforzando principios fundamentales de ingeniería de software y desarrollo de sistemas escalables.",
                    stack: ["PHP 7.4", "PHP 8 (Planned)", "Pest"],
                    status: "Beta / Discontinued",
                    preview: null,
                    repository: "https://github.com/your-username/swilen",
                    created_at: "2023",
                },
            ],
        },
    },
    pt: {
        home: {
            seo: {
                title: "Inicio | Alex Zweiter",
                description:
                    "Construyendo sistemas escalables que unen sabiduría ancestral con tecnología de vanguardia. Desde migraciones WordPress hasta agentes IA en producción.",
            },
            hero: {
                title: "Alex Zweiter",
                subtitle: "Desarrollador Full-Stack | Productor Musical",
                description:
                    "Construyendo sistemas escalables que conectan sabiduría ancestral con tecnología de punta. De migraciones WordPress a agentes IA en producción.",
                cta: "Ver Mis Proyectos",
                ctaLink: "/works",
            },
            stats: {
                title: "Pelos Números",
                items: [
                    { label: "Projetos Live", value: "10+" },
                    { label: "Anos Experiência", value: "5+" },
                    { label: "Interações IA/mês", value: "10k+" },
                    { label: "Ganhos Performance", value: "6x" },
                ],
            },
            featured: {
                title: "Projetos em Destaque",
                projects: [
                    {
                        title: "Janque ORG",
                        description: "Plataforma comunitária quechua • 5k+ visitas/mês",
                        link: "/works#janque",
                    },
                    {
                        title: "Anto IA",
                        description: "Coach nutricional conversacional • Em produção",
                        link: "/works#anto",
                    },
                ],
            },
        },
        about: {
            seo: {
                title: "Sobre Mim | Alex Zweiter",
                description:
                    "Desenvolvedor full-stack especializado em agentes IA, infraestrutura cloud e sistemas de alto desempenho.",
            },
            title: "QUEM SOU | EU",
            bio: [
                "Construindo na interseção entre sabedoria ancestral e sistemas futuristas. Crio experiências digitais tangíveis e escaláveis.",
                "Engenheiro full-stack especialista em agentes IA, arquiteturas cloud-native e otimização de performance.",
            ],
            stack: {
                title: "Stack Técnico",
                description: "Tecnologias que domino completamente",
                items: [
                    {
                        category: "Linguagens",
                        items: ["Golang", "Node.js", "TypeScript", "Python", "PHP", "Lua", "Rust"],
                    },
                    { category: "Frameworks", items: ["Vue.js", "React", "Svelte", "Astro", "TailwindCSS", "NestJS"] },
                    {
                        category: "Cloud/Infra",
                        items: ["AWS", "GCP", "Azure", "Digital Ocean", "Docker", "Kubernetes"],
                    },
                    { category: "Bancos de Dados", items: ["Postgres", "MySQL", "MongoDB", "Redis", "RabbitMQ"] },
                    { category: "IA/ML", items: ["OpenAI API", "Agentes Conversacionais", "Computer Vision"] },
                ],
            },
            experience: {
                title: "Experiência",
                description: "Histórico comprovado de soluções de alto impacto",
                items: [
                    {
                        company: "Digevo",
                        location: "Santiago de Chile",
                        period: "Dez 2022 — Atual",
                        role: "Desenvolvedor Full Stack Sênior",
                        achievements: [
                            'Arquitetou "Anto" - agente IA em produção para recomendações nutricionais personalizadas.',
                            "Liderou migração completa WordPress → Golang/Vue.js (6x performance, filas Redis).",
                            "Desenvolveu agente IA multi-canal processando 10k+ interações mensais.",
                        ],
                    },
                    {
                        company: "AMG Alarcon Management Group",
                        location: "Lima, Peru",
                        period: "Set 2021 — Out 2022",
                        role: "Desenvolvedor Full Stack",
                        achievements: [
                            'Criou "Smart Rooster" - sistema de gestão avícola (Laravel/Vue.js) para 50k+ registros.',
                            "Desenvolveu plataformas eCommerce personalizadas reduzindo abandono 40%.",
                            "Otimizou landing pages melhorando conversões 25%.",
                        ],
                    },
                ],
            },
        },
        music: {
            seo: {
                title: "Música | Alex Zweiter",
                description: "Trilhas originais combinando experimentação eletrônica com profundidade emocional.",
            },
            title: "Música",
            description: "Exploração sonora através de texturas eletrônicas e inovação rítmica.",
        },
        works: {
            seo: {
                title: "Projetos | Alex Zweiter",
                description: "Projetos production-grade mostrando maestria em IA, cloud e full-stack.",
            },
            title: "Projetos | Destacados",
            projects: [
                {
                    title: "Janque ORG",
                    description:
                        "Plataforma comunitária dedicada a preservar e difundir a rica cultura e história de Janque. Desenvolvida com arquitetura Jamstack utilizando Nuxt 4 para garantir máxima velocidade e segurança, busca empoderar seus membros através de um espaço digital moderno para compartilhar histórias e notícias, otimizado para implantação global e entrega rápida via Cloudflare.",
                    stack: ["Nuxt 4", "Nuxt Content", "Cloudflare", "Jamstack"],
                    status: "Production Ready",
                    preview: "https://janque.org",
                    repository: "https://github.com/szweiter/janque-org",
                    created_at: "2025",
                },
                {
                    title: "Vayload CMS",
                    description:
                        "Headless CMS de alto desempenho com arquitetura microkernel escrito em Go, projetado especificamente para plataformas comunitárias dinâmicas. Oferece extensibilidade excepcional através de scripts Lua e suporte a múltiplos bancos de dados como Postgres e SQLite, permitindo que desenvolvedores gerenciem conteúdo de forma ágil, escalável e totalmente personalizada para cada necessidade técnica.",
                    stack: ["Golang", "SvelteKit", "Lua", "SQLite/Postgres/MySQL", "Microkernel"],
                    status: "In Development",
                    preview: null,
                    repository: "https://github.com/szweiter/vayload.io",
                    created_at: "2024",
                },
                {
                    title: "Encrypted RT Chat",
                    description:
                        "Plataforma de mensagens instantâneas em tempo real que implementa criptografia de ponta a ponta baseada no algoritmo RSA sobre WebSockets. Este projeto experimental prioriza a privacidade absoluta do usuário, explorando a comunicação segura cliente-servidor e a gestão de chaves criptográficas em ambientes dinâmicos construídos com Node.js e React para total segurança dos dados.",
                    stack: ["React", "Node.js", "WebSockets", "RSA", "CryptoJS"],
                    status: "Complete Prototype",
                    preview: null,
                    repository: "https://github.com/alexzweiter/encrypted-chat",
                    created_at: "2024",
                },
                {
                    title: "Swilen Framework",
                    description:
                        "Framework PHP experimental com uma sintaxe fluida inspirada em Laravel e Express, criado para explorar o design de arquiteturas backend robustas e sistemas modulares. Embora descontinuado, serviu para dominar o testing automatizado com Pest e a criação de componentes desacoplados, reforçando princípios fundamentais de engenharia de software e desenvolvimento de sistemas escaláveis modernos.",
                    stack: ["PHP 7.4", "PHP 8 (Planned)", "Pest"],
                    status: "Beta / Discontinued",
                    preview: null,
                    repository: "https://github.com/your-username/swilen",
                    created_at: "2023",
                },
            ],
        },
    },
};

export const usePageTranslation = (lang: string) => {
    return (key: string, type: "string" | "array" = "string"): any => {
        const keys = key.split(".");

        let current: any = (pages as any)[lang];
        if (!current) {
            console.warn(`Language not found: ${lang} for ${key}`);
            return type === "string" ? (key as any) : [];
        }

        for (const k of keys) {
            if (current && typeof current === "object" && k in current) {
                current = current[k];
            } else {
                return type === "string" ? ("" as any) : [];
            }
        }

        if (type === "array") {
            if (Array.isArray(current)) return current;
            if (current && typeof current === "object") return Object.values(current);
            return [];
        }

        return typeof current === "string" ? (current as any) : (String(current) as any);
    };
};
