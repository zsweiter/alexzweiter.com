export const pages = {
    en: {
        home: {
            seo: {
                title: "Home | Alex Zweiter",
                description: "Building scalable systems that bridge ancient wisdom with cutting-edge technology. From WordPress migrations to production AI agents."
            },
            hero: {
                title: "Alex Zweiter",
                subtitle: "Full-Stack Developer | Music Producer"
            }
        },
        about: {
            seo: {
                title: "About | Alex Zweiter",
                description: "Full-stack developer specializing in AI agents, cloud infrastructure, and high-performance systems. From WordPress migrations to conversational AI."
            },
            title: "WHO I | AM",
            bio: [
                "Self-taught full-stack developer specialized in building scalable, reliable, and high-performance systems. I approach software as a craft: prioritizing fundamentals, understanding system limitations, and carefully evaluating trade-offs before introducing abstractions.",
                "I specialize in system-level backend and frontend engineering, primarily using Go and Rust for performance-critical services where reliability is paramount, and TypeScript (Node.js, Bun) for expressive, maintainable, and well-structured applications.",
                "I have a strong interest in low-level development exploring C and Rust, as well as hacking and cybersecurity, which allows me to understand how systems behave under real-world load, failure, and attack conditions.",
                "Outside software, I study philosophy and theology, and produce and DJ electronic music with FL Studio—disciplines that shape my critical thinking, creativity, and structural approach to solving complex problems."
            ],
            stack: {
                title: "Tech Stack",
                description: "Tools I master across the full spectrum",
                items: [
                    { category: "Languages", items: ["Golang", "TypeScript", "Node.js", "Python", "PHP", "Lua", "Rust"] },
                    { category: "Frameworks", items: ["Vue.js", "React", "Svelte", "Astro", "TailwindCSS", "NestJS"] },
                    { category: "Cloud/Infrastructure", items: ["AWS", "GCP", "Azure", "Digital Ocean", "Cloudflare"] },
                    { category: "Databases/Queues", items: ["Postgres", "MySQL", "MongoDB", "Redis", "BullMQ"] },
                    { category: "AI/ML", items: ["OpenAI API", "Conversational Agents", "Computer Vision", "Prompt Engineering"] }
                ]
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
                            "Built multi-channel AI agent (WhatsApp + Web) processing 10k+ monthly interactions with 99.9% uptime."
                        ]
                    },
                    {
                        company: "AMG Alarcon Management Group",
                        location: "Lima, Peru",
                        period: "Sept 2021 — Oct 2022",
                        role: "Full Stack Developer",
                        achievements: [
                            'Engineered "Smart Rooster" - poultry farm management system (Laravel/Vue.js) with MySQL stored procedures, handling 50k+ records.',
                            "Delivered custom eCommerce platforms with Nuxt.js APIs, reducing checkout abandonment by 40%.",
                            "Optimized landing pages achieving 3s load times, boosting conversion rates 25%."
                        ]
                    }
                ]
            }
        },
        music: {
            seo: {
                title: "Music | Alex Zweiter",
                description: "Original music tracks blending electronic experimentation with emotional depth."
            },
            title: "Music",
            description: "Sound exploration through electronic textures and rhythmic innovation."
        },
        works: {
            seo: {
                title: "Works | Alex Zweiter",
                description: "Production-grade projects showcasing AI integration, cloud architecture, and full-stack mastery."
            },
            title: "Selected | Works",
            projects: [
                {
                    title: "Janque ORG",
                    description: "A community-focused platform dedicated to preserving and showcasing Janque's rich culture and heritage. Built using Jamstack architecture with Nuxt 4 to ensure superior performance and security, it empowers community members through a modern digital space for storytelling and news, fully optimized for global distribution and fast delivery via Cloudflare.",
                    stack: ["Nuxt 4", "Nuxt Content", "Cloudflare", "Jamstack"],
                    status: "Production Ready",
                    preview: "https://janque.org",
                    repository: "https://github.com/zsweiter/janque.org",
                    created_at: "2025"
                },
                {
                    title: "Vayload CMS",
                    description: "A high-performance microkernel headless CMS written in Go, specifically engineered for modern community-driven platforms. It provides exceptional extensibility through Lua scripting and multi-database support (Postgres, MySQL, SQLite), enabling developers to manage complex content structures with a highly flexible, scalable, and modular approach.",
                    stack: ["Golang", "SvelteKit", "Lua", "SQLite/Postgres/MySQL", "Microkernel"],
                    status: "In Development",
                    preview: null,
                    repository: "https://github.com/szweiter/vayload.io",
                    created_at: "2024"
                },
                {
                    title: "Nyx - E2E Encrypted Real-Time Chat",
                    description: "A real-time messaging application featuring robust RSA end-to-end encryption delivered over WebSockets for maximum data integrity. This privacy-centric experiment focuses on securing client-server communications and implementing advanced cryptographic workflows within a modern tech stack.",
                    stack: ["React", "Node.js", "WebSockets", "RSA", "Rust", "P2P", "WebRTC"],
                    status: "Complete Prototype",
                    preview: null,
                    repository: "https://github.com/zsweiter/Nyx",
                    created_at: "2024"
                },
                {
                    title: "Swilen Framework",
                    description: "An experimental PHP framework with clean syntax inspired by Laravel and Express, created to explore backend architecture and core systems design. It provided a rigorous environment for mastering automated testing with Pest and building scalable, decoupled software components.",
                    stack: ["PHP 7.4", "PHP 8 (Planned)", "Pest"],
                    status: "Beta / Discontinued",
                    preview: "https://packagist.org/packages/swilen/framework",
                    repository: "https://github.com/zsweiter/swilen-framework",
                    created_at: "2023"
                }
            ]
        }
    },
    es: {
        home: {
            seo: {
                title: "Inicio | Alex Zweiter",
                description: "Construyendo sistemas escalables que unen sabiduría ancestral con tecnología de vanguardia. Desde migraciones WordPress hasta agentes IA en producción."
            },
            hero: {
                title: "Alex Zweiter",
                subtitle: "Desarrollador Full-Stack | Productor Musical"
            }
        },
        about: {
            seo: {
                title: "Sobre mí | Alex Zweiter",
                description: "Desarrollador full-stack especializado en agentes IA, infraestructura cloud y sistemas de alto rendimiento. Desde migraciones WordPress hasta IA conversacional."
            },
            title: "QUIÉN | SOY",
            bio: [
                "Desarrollador full-stack autodidacta especializado en construir sistemas escalables, fiables y de alto rendimiento. Abordo el software como un oficio: priorizo fundamentos, comprendo limitaciones del sistema y evalúo cuidadosamente las compensaciones antes de introducir abstracciones.",
                "Me especializo en ingeniería backend y frontend a nivel de sistema, usando principalmente Go y Rust para servicios críticos donde rendimiento y fiabilidad son clave, y TypeScript (Node.js, Bun) para aplicaciones expresivas, mantenibles y bien estructuradas.",
                "Tengo fuerte interés en desarrollo de bajo nivel con C y Rust, además de hacking y ciberseguridad, lo que me permite entender cómo se comportan los sistemas bajo carga, fallos y ataques reales.",
                "Fuera del software, estudio filosofía y teología, y produzco/DJ música electrónica con FL Studio; disciplinas que moldean mi pensamiento crítico, creatividad y enfoque estructural para resolver problemas complejos."
            ],
            stack: {
                title: "Stack Técnico",
                description: "Tecnologías que domino completamente",
                items: [
                    { category: "Lenguajes", items: ["Go", "TypeScript", "Node.js", "Python", "PHP", "Lua", "Rust"] },
                    { category: "Frameworks", items: ["Vue.js", "React", "Svelte", "Astro", "TailwindCSS", "NestJS"] },
                    { category: "Cloud/Infra", items: ["AWS", "GCP", "Azure", "Digital Ocean", "Cloudflare"] },
                    { category: "Bases de Datos", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "BullMQ"] },
                    { category: "IA/ML", items: ["OpenAI API", "Agentes Conversacionales", "Visión por Computadora", "Prompt Engineering"] }
                ]
            },
            experience: {
                title: "Experiencia",
                description: "Historial comprobado entregando soluciones de alto impacto",
                items: [
                    {
                        company: "Digevo",
                        location: "Santiago de Chile, Chile",
                        period: "Dic 2022 — Actual",
                        role: "Desarrollador Full Stack Senior",
                        achievements: [
                            'Arquitecté "Anto" - agente IA en producción para recomendaciones nutricionales personalizadas con orquestación LLM avanzada.',
                            "Lideré migración completa: WordPress → microservicios Golang/Vue.js (6x rendimiento, colas Redis reemplazando cron jobs).",
                            "Desarrollé agente IA multi-canal (WhatsApp + Web) procesando 10k+ interacciones mensuales con 99.9% uptime."
                        ]
                    },
                    {
                        company: "AMG Alarcon Management Group",
                        location: "Lima, Perú",
                        period: "Sept 2021 — Oct 2022",
                        role: "Desarrollador Full Stack",
                        achievements: [
                            'Desarrollé "Smart Rooster" - sistema de gestión avícola (Laravel/Vue.js) con procedimientos almacenados MySQL para 50k+ registros.',
                            "Entregué plataformas eCommerce personalizadas con APIs Nuxt.js, reduciendo abandono de carrito 40%.",
                            "Optimizé landing pages alcanzando 3s de carga, incrementando tasas de conversión 25%."
                        ]
                    }
                ]
            }
        },
        music: {
            seo: {
                title: "Música | Alex Zweiter",
                description: "Pistas originales que combinan experimentación electrónica con profundidad emocional."
            },
            title: "Música",
            description: "Exploración sonora a través de texturas electrónicas e innovación rítmica."
        },
        works: {
            seo: {
                title: "Proyectos | Alex Zweiter",
                description: "Proyectos production-grade que muestran integración IA, arquitectura cloud y maestría full-stack."
            },
            title: "Proyectos | Destacados",
            projects: [
                {
                    title: "Janque ORG",
                    description: "Plataforma comunitaria dedicada a preservar y mostrar la rica cultura e historia de Janque. Construida con arquitectura Jamstack y Nuxt 4 para máximo rendimiento y seguridad, empodera a la comunidad con un espacio digital moderno para historias y noticias, optimizado para distribución global vía Cloudflare.",
                    stack: ["Nuxt 4", "Nuxt Content", "Cloudflare", "Jamstack"],
                    status: "Production Ready",
                    preview: "https://janque.org",
                    repository: "https://github.com/zsweiter/janque.org",
                    created_at: "2025"
                },
                {
                    title: "Vayload CMS",
                    description: "Headless CMS de alto rendimiento con arquitectura microkernel en Go, diseñado para plataformas comunitarias modernas. Ofrece extensibilidad excepcional vía scripting Lua y soporte multi-base de datos (Postgres, MySQL, SQLite) para gestionar estructuras de contenido complejas de forma flexible y escalable.",
                    stack: ["Golang", "SvelteKit", "Lua", "SQLite/Postgres/MySQL", "Microkernel"],
                    status: "In Development",
                    preview: null,
                    repository: "https://github.com/szweiter/vayload.io",
                    created_at: "2024"
                },
                {
                    title: "Nyx - Chat en Tiempo Real E2E Encriptado",
                    description: "Aplicación de mensajería en tiempo real con encriptación RSA de extremo a extremo sobre WebSockets para máxima integridad de datos. Experimento centrado en privacidad que asegura comunicaciones cliente-servidor con flujos criptográficos avanzados en stack moderno.",
                    stack: ["React", "Node.js", "WebSockets", "RSA", "Rust", "P2P", "WebRTC"],
                    status: "Prototipo Completo",
                    preview: null,
                    repository: "https://github.com/zsweiter/Nyx",
                    created_at: "2024"
                },
                {
                    title: "Swilen Framework",
                    description: "Framework PHP experimental con sintaxis limpia inspirada en Laravel y Express, creado para explorar arquitectura backend y diseño de sistemas. Proporcionó entorno riguroso para dominar testing con Pest y componentes desacoplados escalables.",
                    stack: ["PHP 7.4", "PHP 8 (Planificado)", "Pest"],
                    status: "Beta / Discontinuado",
                    preview: "https://packagist.org/packages/swilen/framework",
                    repository: "https://github.com/zsweiter/swilen-framework",
                    created_at: "2023"
                }
            ]
        }
    },
    pt: {
        home: {
            seo: {
                title: "Início | Alex Zweiter",
                description: "Construindo sistemas escaláveis que unem sabedoria ancestral com tecnologia de ponta. De migrações WordPress a agentes IA em produção."
            },
            hero: {
                title: "Alex Zweiter",
                subtitle: "Desenvolvedor Full-Stack | Produtor Musical"
            }
        },
        about: {
            seo: {
                title: "Sobre Mim | Alex Zweiter",
                description: "Desenvolvedor full-stack especializado em agentes IA, infraestrutura cloud e sistemas de alto desempenho. De migrações WordPress a IA conversacional."
            },
            title: "QUEM SOU | EU",
            bio: [
                "Desenvolvedor full-stack autodidata especializado em construir sistemas escaláveis, confiáveis e de alto desempenho. Abordo software como um ofício: priorizo fundamentos, compreendo limitações do sistema e avalio cuidadosamente trade-offs antes de introduzir abstrações.",
                "Especializo-me em engenharia backend e frontend em nível de sistema, usando principalmente Go e Rust para serviços críticos onde performance e confiabilidade são essenciais, e TypeScript (Node.js, Bun) para aplicações expressivas, manuteníveis e bem estruturadas.",
                "Tenho forte interesse em desenvolvimento de baixo nível com C e Rust, além de hacking e cibersegurança, permitindo entender como sistemas se comportam sob carga, falhas e ataques reais.",
                "Fora do software, estudo filosofia e teologia, e produzo/DJ música eletrônica com FL Studio; disciplinas que moldam meu pensamento crítico, criatividade e abordagem estrutural para resolver problemas complexos."
            ],
            stack: {
                title: "Stack Técnico",
                description: "Tecnologias que domino completamente",
                items: [
                    { category: "Linguagens", items: ["Golang", "TypeScript", "Node.js", "Python", "PHP", "Lua", "Rust"] },
                    { category: "Frameworks", items: ["Vue.js", "React", "Svelte", "Astro", "TailwindCSS", "NestJS"] },
                    { category: "Cloud/Infra", items: ["AWS", "GCP", "Azure", "Digital Ocean", "Cloudflare"] },
                    { category: "Bancos de Dados", items: ["Postgres", "MySQL", "MongoDB", "Redis", "BullMQ"] },
                    { category: "IA/ML", items: ["OpenAI API", "Agentes Conversacionais", "Visão Computacional", "Prompt Engineering"] }
                ]
            },
            experience: {
                title: "Experiência",
                description: "Histórico comprovado entregando soluções de alto impacto",
                items: [
                    {
                        company: "Digevo",
                        location: "Santiago de Chile, Chile",
                        period: "Dez 2022 — Atual",
                        role: "Desenvolvedor Full Stack Sênior",
                        achievements: [
                            'Arquitetou "Anto" - agente IA em produção para recomendações nutricionais personalizadas com orquestração LLM avançada.',
                            "Liderou migração completa: WordPress → microsserviços Golang/Vue.js (6x performance, filas Redis substituindo cron jobs).",
                            "Desenvolveu agente IA multi-canal (WhatsApp + Web) processando 10k+ interações mensais com 99.9% uptime."
                        ]
                    },
                    {
                        company: "AMG Alarcon Management Group",
                        location: "Lima, Peru",
                        period: "Set 2021 — Out 2022",
                        role: "Desenvolvedor Full Stack",
                        achievements: [
                            'Engenharia "Smart Rooster" - sistema de gestão avícola (Laravel/Vue.js) com procedures MySQL para 50k+ registros.',
                            "Entregou plataformas eCommerce personalizadas com APIs Nuxt.js, reduzindo abandono de carrinho em 40%.",
                            "Otimizou landing pages alcançando 3s de carregamento, aumentando conversões em 25%."
                        ]
                    }
                ]
            }
        },
        music: {
            seo: {
                title: "Música | Alex Zweiter",
                description: "Trilhas originais combinando experimentação eletrônica com profundidade emocional."
            },
            title: "Música",
            description: "Exploração sonora através de texturas eletrônicas e inovação rítmica."
        },
        works: {
            seo: {
                title: "Projetos | Alex Zweiter",
                description: "Projetos production-grade mostrando integração IA, arquitetura cloud e maestria full-stack."
            },
            title: "Projetos | Destacados",
            projects: [
                {
                    title: "Janque ORG",
                    description: "Plataforma comunitária dedicada a preservar e divulgar a rica cultura e história de Janque. Construída com arquitetura Jamstack e Nuxt 4 para máximo desempenho e segurança, empodera a comunidade com espaço digital moderno para histórias e notícias, otimizado para distribuição global via Cloudflare.",
                    stack: ["Nuxt 4", "Nuxt Content", "Cloudflare", "Jamstack"],
                    status: "Production Ready",
                    preview: "https://janque.org",
                    repository: "https://github.com/zsweiter/janque.org",
                    created_at: "2025"
                },
                {
                    title: "Vayload CMS",
                    description: "Headless CMS de alto desempenho com arquitetura microkernel em Go, projetado para plataformas comunitárias modernas. Oferece extensibilidade excepcional via scripting Lua e suporte multi-banco de dados (Postgres, MySQL, SQLite) para gerenciar estruturas de conteúdo complexas de forma flexível e escalável.",
                    stack: ["Golang", "SvelteKit", "Lua", "SQLite/Postgres/MySQL", "Microkernel"],
                    status: "In Development",
                    preview: null,
                    repository: "https://github.com/szweiter/vayload.io",
                    created_at: "2024"
                },
                {
                    title: "Nyx - Chat em Tempo Real E2E Encriptado",
                    description: "Aplicação de mensagens em tempo real com criptografia RSA de ponta a ponta sobre WebSockets para máxima integridade de dados. Experimento focado em privacidade que assegura comunicações cliente-servidor com fluxos criptográficos avançados em stack moderno.",
                    stack: ["React", "Node.js", "WebSockets", "RSA", "Rust", "P2P", "WebRTC"],
                    status: "Protótipo Completo",
                    preview: null,
                    repository: "https://github.com/zsweiter/Nyx",
                    created_at: "2024"
                },
                {
                    title: "Swilen Framework",
                    description: "Framework PHP experimental com sintaxe limpa inspirada em Laravel e Express, criado para explorar arquitetura backend e design de sistemas. Forneceu ambiente rigoroso para dominar testes automatizados com Pest e componentes desacoplados escaláveis.",
                    stack: ["PHP 7.4", "PHP 8 (Planejado)", "Pest"],
                    status: "Beta / Descontinuado",
                    preview: "https://packagist.org/packages/swilen/framework",
                    repository: "https://github.com/zsweiter/swilen-framework",
                    created_at: "2023"
                }
            ]
        }
    }
};

export const common = {
    socials: {
        github: "https://github.com/alexzweiter",
        linkedin: "https://www.linkedin.com/in/alexzweiter",
        twitter: "https://twitter.com/alexzweiter",
        instagram: "https://www.instagram.com/alexzweiter",
        youtube: "https://www.youtube.com/alexzweiter",
        spotify: "https://open.spotify.com/artist/alexzweiter",
        soundcloud: "https://soundcloud.com/alexzweiter",
        bandcamp: "https://alexzweiter.bandcamp.com",
        tiktok: "https://www.tiktok.com/@alexzweiter",
        twitch: "https://www.twitch.tv/alexzweiter",
        discord: "https://discord.gg/alexzweiter",
        telegram: "https://t.me/alexzweiter",
        whatsapp: "https://wa.me/alexzweiter",
        email: "connect@alexzweiter.com",
    },
}

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
