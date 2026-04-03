export const pages = {
    "es": {
        "home": {
            "seo": {
                "title": "Alex Zweiter | Ingeniero Full-Stack & Productor Musical",
                "description": "Construyo software escalable y confiable combinando experiencia técnica profunda con diseño pensado. Desde orquestación de IA hasta sistemas backend de alto rendimiento."
            },
            "hero": {
                "title": "Alex Zweiter",
                "subtitle": "Ingeniero Full-Stack & Productor Musical"
            }
        },
        "about": {
            "seo": {
                "title": "Sobre mí | Alex Zweiter",
                "description": "Ingeniero full-stack apasionado por sistemas de alto rendimiento, orquestación de IA y soluciones elegantes. Autodidacta, orientado a sistemas y enfocado en lo fundamental."
            },
            "title": "Sobre mí",
            "bio": [
                "Soy un ingeniero full-stack autodidacta enfocado en crear sistemas escalables, confiables y de alto rendimiento. Veo el desarrollo de software como un arte: priorizo fundamentos sólidos, respeto las limitaciones del sistema y tomo decisiones con cuidado antes de añadir complejidad.",
                "Mi trabajo se centra en ingeniería a nivel de sistemas. Uso Go y Rust cuando el rendimiento y la confiabilidad son críticos, y TypeScript (Node.js o Bun) para aplicaciones expresivas y mantenibles. Me siento cómodo trabajando en todo el stack.",
                "Tengo un interés especial en sistemas de bajo nivel (C y Rust) y ciberseguridad, lo que me permite anticipar cómo se comporta el software bajo carga, fallas o condiciones adversas.",
                "Fuera del código, estudio filosofía y teología, y produzco música electrónica. Estas actividades agudizan mi pensamiento crítico, alimentan mi creatividad y me ayudan a resolver problemas complejos de forma clara e intencionada."
            ],
            "stack": {
                "title": "Tecnologías",
                "description": "Herramientas y tecnologías que utilizo en todo el espectro del desarrollo",
                "items": [
                    { "category": "Lenguajes", "items": ["Golang", "TypeScript", "Node.js", "Python", "PHP", "Lua", "Rust"] },
                    { "category": "Frameworks & Librerías", "items": ["Vue.js", "React", "Svelte", "Astro", "TailwindCSS", "NestJS"] },
                    { "category": "Nube & Infraestructura", "items": ["AWS", "GCP", "Azure", "Digital Ocean", "Cloudflare"] },
                    { "category": "Bases de Datos & Colas", "items": ["Postgres", "MySQL", "MongoDB", "Redis", "BullMQ"] },
                    { "category": "IA & Machine Learning", "items": ["Orquestación LLM", "Agentes Conversacionales", "Visión por Computadora", "Context Engineering"] }
                ]
            },
            "experience": {
                "title": "Experiencia",
                "description": "Mi recorrido profesional y contribuciones clave",
                "items": [
                    {
                        "company": "Digevo",
                        "location": "Santiago de Chile, Chile",
                        "period": "Diciembre 2022 — Diciembre 2024",
                        "role": "Senior Full Stack Developer",
                        "achievements": [
                            "Diseñé y construí 'Anto', un agente de IA en producción que ofrece recomendaciones nutricionales personalizadas mediante orquestación avanzada de LLM.",
                            "Lideré la migración completa de WordPress a una arquitectura de microservicios con Golang + Vue.js, logrando 6x más rendimiento y reemplazando cron jobs por colas Redis confiables.",
                            "Desarrollé un asistente de IA multi-canal (WhatsApp + Web) que funciona como compañero útil y genera nueva capacidad de negocio."
                        ]
                    },
                    {
                        "company": "AMG Alarcon Management Group",
                        "location": "Lima, Perú",
                        "period": "Septiembre 2021 — Octubre 2022",
                        "role": "Full Stack Developer",
                        "achievements": [
                            "Creé 'Smart Rooster', un sistema integral de gestión de granjas avícolas usando Laravel y Vue.js con procedimientos almacenados en MySQL, capaz de manejar más de 50,000 registros eficientemente.",
                            "Entregué múltiples plataformas eCommerce personalizadas con backends Nuxt.js, reduciendo el abandono de checkout en ~40% y mejorando significativamente UX y conversión.",
                            "Optimicé landing pages para tiempos de carga menores a 3 segundos, aumentando la tasa de conversión en 25%."
                        ]
                    }
                ]
            }
        },
        "music": {
            "seo": {
                "title": "Música | Alex Zweiter",
                "description": "Música electrónica original explorando texturas, ritmo y profundidad emocional."
            },
            "title": "Música",
            "description": "Exploro el sonido a través de texturas electrónicas, experimentación rítmica y narrativa emocional."
        },
        "works": {
            "seo": {
                "title": "Proyectos | Alex Zweiter",
                "description": "Proyectos seleccionados que muestran orquestación de IA, sistemas de alto rendimiento, arquitecturas modulares y desarrollo full-stack."
            },
            "title": "Proyectos Destacados",
            "projects": [
                {
                    "title": "Aris",
                    "description": "Sistema privado de orquestación de IA que coordina múltiples agentes de manera eficiente, usando protocolos binarios y patrones inspirados en robótica, con extensibilidad mediante plugins Lua.",
                    "stack": ["Rust", "Lua"],
                    "status": "Privado / En desarrollo",
                    "preview": null,
                    "repository": null,
                    "created_at": "2025"
                },
                {
                    "title": "Vayload",
                    "description": "CMS modular y de alto rendimiento en Go, con sistema de plugins Lua y CLI en Rust. Diseñado para plataformas comunitarias complejas, escalables y con excelente experiencia de desarrollo.",
                    "stack": ["Go", "Rust", "Lua", "Postgres/MySQL/SQLite", "SvelteKit", "Microkernel"],
                    "status": "En desarrollo",
                    "preview": "https://vaload.dev",
                    "repository": "https://github.com/vayload/vayload",
                    "created_at": "2024"
                },
                {
                    "title": "Swilen",
                    "description": "Framework PHP asíncrono construido sobre OpenSwoole, con runtime personalizado compatible con APIs de WordPress. Explora arquitecturas de plugins modernas, backends escalables y desacoplamiento de componentes.",
                    "stack": ["PHP 8", "Pest", "OpenSwoole", "TypeScript", "NestJS"],
                    "status": "Beta / Experimental",
                    "preview": "https://packagist.org/packages/swilen/framework",
                    "repository": "https://github.com/swilenphp/swilen-core",
                    "created_at": "2023"
                },
                {
                    "title": "Nyx",
                    "description": "Plataforma de mensajería cifrada de extremo a extremo con backend Node.js, frontend React y cliente CLI en Rust. Implementa criptografía robusta, P2P y WebRTC para comunicación segura en tiempo real.",
                    "stack": ["JavaScript", "React", "Node.js", "Rust", "WebSockets", "WebRTC", "RSA"],
                    "status": "En progreso",
                    "preview": null,
                    "repository": "https://github.com/zsweiter/Nyx",
                    "created_at": "2024"
                },
                {
                    "title": "Janque org",
                    "description": "Sitio web comunitario dedicado a preservar y compartir la cultura y el patrimonio de Janque. Construido con Nuxt.js y principios JAMstack para alto rendimiento, alcance global y narrativa atractiva.",
                    "stack": ["Nuxt 4", "Nuxt Content", "Cloudflare", "JAMstack", "TypeScript", "TailwindCSS"],
                    "status": "En línea",
                    "preview": "https://janque.org",
                    "repository": "https://github.com/zsweiter/janque.org",
                    "created_at": "2025"
                }
            ]
        }
    },
    "en": {
        "home": {
            "seo": {
                "title": "Alex Zweiter | Full-Stack Engineer & Music Producer",
                "description": "I build scalable and reliable software blending deep technical expertise with thoughtful design. From AI orchestration to high-performance backend systems."
            },
            "hero": {
                "title": "Alex Zweiter",
                "subtitle": "Full-Stack Engineer & Music Producer"
            }
        },
        "about": {
            "seo": {
                "title": "About | Alex Zweiter",
                "description": "Full-stack engineer passionate about high-performance systems, AI orchestration, and elegant solutions. Self-taught, systems-oriented, and focused on fundamentals."
            },
            "title": "About Me",
            "bio": [
                "I'm a self-taught full-stack engineer focused on building scalable, reliable, high-performance systems. I see software development as a craft: fundamentals, careful trade-offs, and thoughtful design come first.",
                "I work at the system level. I use Go and Rust for performance-critical projects, and TypeScript (Node.js or Bun) for expressive, maintainable apps. Comfortable across the full stack.",
                "I have a special interest in low-level systems (C and Rust) and cybersecurity, helping me anticipate software behavior under load, failures, or adversarial conditions.",
                "Beyond coding, I study philosophy and theology, and produce electronic music. These hobbies sharpen thinking, fuel creativity, and help solve complex problems with clarity and purpose."
            ],
            "stack": {
                "title": "Tech Stack",
                "description": "Tools and technologies I use across the full development spectrum",
                "items": [
                    { "category": "Languages", "items": ["Golang", "TypeScript", "Node.js", "Python", "PHP", "Lua", "Rust"] },
                    { "category": "Frameworks & Libraries", "items": ["Vue.js", "React", "Svelte", "Astro", "TailwindCSS", "NestJS"] },
                    { "category": "Cloud & Infrastructure", "items": ["AWS", "GCP", "Azure", "Digital Ocean", "Cloudflare"] },
                    { "category": "Databases & Queues", "items": ["Postgres", "MySQL", "MongoDB", "Redis", "BullMQ"] },
                    { "category": "AI & Machine Learning", "items": ["LLM Orchestration", "Conversational Agents", "Computer Vision", "Context Engineering"] }
                ]
            },
            "experience": {
                "title": "Experience",
                "description": "Professional journey and key contributions",
                "items": [
                    {
                        "company": "Digevo",
                        "location": "Santiago de Chile, Chile",
                        "period": "December 2022 — December 2024",
                        "role": "Senior Full Stack Developer",
                        "achievements": [
                            "Designed and built 'Anto', a production-ready AI agent delivering personalized nutritional recommendations through advanced LLM orchestration.",
                            "Led full platform migration from WordPress to Golang + Vue.js microservices architecture, achieving 6x better performance and replacing cron jobs with reliable Redis queues.",
                            "Developed a multi-channel AI assistant (WhatsApp + Web) serving as a helpful companion and generating new business capacity."
                        ]
                    },
                    {
                        "company": "AMG Alarcon Management Group",
                        "location": "Lima, Peru",
                        "period": "September 2021 — October 2022",
                        "role": "Full Stack Developer",
                        "achievements": [
                            "Built 'Smart Rooster', a comprehensive poultry farm management system using Laravel and Vue.js with MySQL stored procedures, handling over 50,000 records efficiently.",
                            "Delivered multiple custom eCommerce platforms with Nuxt.js backends, reducing checkout abandonment by ~40% and improving UX and conversion rates.",
                            "Optimized landing pages to achieve sub-3-second load times, increasing conversion by 25%."
                        ]
                    }
                ]
            }
        },
        "music": {
            "seo": {
                "title": "Music | Alex Zweiter",
                "description": "Original electronic music exploring textures, rhythm, and emotional depth."
            },
            "title": "Music",
            "description": "I explore sound through electronic textures, rhythmic experimentation, and emotional storytelling."
        },
        "works": {
            "seo": {
                "title": "Works | Alex Zweiter",
                "description": "Selected projects showcasing AI orchestration, high-performance systems, modular architectures, and full-stack development."
            },
            "title": "Selected Works",
            "projects": [
                {
                    "title": "Aris",
                    "description": "Private AI orchestration system coordinating multiple agents efficiently, using binary protocols and robotics-inspired messaging, extensible via Lua plugins.",
                    "stack": ["Rust", "Lua"],
                    "status": "Private / Actively Developed",
                    "preview": null,
                    "repository": null,
                    "created_at": "2025"
                },
                {
                    "title": "Vayload",
                    "description": "High-performance modular CMS in Go with Lua plugin system and Rust CLI, built for complex community platforms needing scalability, flexibility, and excellent developer experience.",
                    "stack": ["Go", "Rust", "Lua", "Postgres/MySQL/SQLite", "SvelteKit", "Microkernel"],
                    "status": "In Development",
                    "preview": "https://vaload.dev",
                    "repository": "https://github.com/vayload/vayload",
                    "created_at": "2024"
                },
                {
                    "title": "Swilen",
                    "description": "Asynchronous PHP framework built on OpenSwoole, with custom runtime compatible with WordPress APIs. Explores modern plugin architectures, scalable backends, and clean component decoupling.",
                    "stack": ["PHP 8", "Pest", "OpenSwoole", "TypeScript", "NestJS"],
                    "status": "Beta / Experimental",
                    "preview": "https://packagist.org/packages/swilen/framework",
                    "repository": "https://github.com/swilenphp/swilen-core",
                    "created_at": "2023"
                },
                {
                    "title": "Nyx",
                    "description": "End-to-end encrypted messaging platform with Node.js backend, React frontend, and Rust CLI client. Implements robust cryptography, P2P, and WebRTC for secure real-time communication.",
                    "stack": ["JavaScript", "React", "Node.js", "Rust", "WebSockets", "WebRTC", "RSA"],
                    "status": "In Progress",
                    "preview": null,
                    "repository": "https://github.com/zsweiter/Nyx",
                    "created_at": "2024"
                },
                {
                    "title": "Janque org",
                    "description": "Community website dedicated to preserving and sharing Janque's culture and heritage. Built with Nuxt.js and JAMstack principles for excellent performance, global reach, and engaging storytelling.",
                    "stack": ["Nuxt 4", "Nuxt Content", "Cloudflare", "JAMstack", "TypeScript", "TailwindCSS"],
                    "status": "Live",
                    "preview": "https://janque.org",
                    "repository": "https://github.com/zsweiter/janque.org",
                    "created_at": "2025"
                }
            ]
        }
    },
    "pt": {
        "home": {
            "seo": {
                "title": "Alex Zweiter | Engenheiro Full-Stack & Produtor Musical",
                "description": "Crio software escalável e confiável, combinando profundo conhecimento técnico com design pensado. De orquestração de IA a sistemas backend de alto desempenho."
            },
            "hero": {
                "title": "Alex Zweiter",
                "subtitle": "Engenheiro Full-Stack & Produtor Musical"
            }
        },
        "about": {
            "seo": {
                "title": "Sobre | Alex Zweiter",
                "description": "Engenheiro full-stack apaixonado por sistemas de alto desempenho, orquestração de IA e soluções elegantes. Autodidata, orientado a sistemas e focado no essencial."
            },
            "title": "Sobre mim",
            "bio": [
                "Sou um engenheiro full-stack autodidata, focado em criar sistemas escaláveis, confiáveis e de alto desempenho. Vejo o desenvolvimento de software como uma arte: fundamentos sólidos, decisões ponderadas e design cuidadoso vêm primeiro.",
                "Meu trabalho gira em torno da engenharia de sistemas. Uso Go e Rust para projetos críticos de desempenho, e TypeScript (Node.js ou Bun) para aplicações expressivas e fáceis de manter. Confortável em todo o stack.",
                "Tenho interesse especial em sistemas de baixo nível (C e Rust) e cibersegurança, ajudando a prever como o software se comporta sob carga, falhas ou condições adversas.",
                "Fora do código, estudo filosofia e teologia, e produzo música eletrônica. Esses interesses aprimoram o pensamento crítico, alimentam a criatividade e ajudam a resolver problemas complexos com clareza e intenção."
            ],
            "stack": {
                "title": "Stack Tecnológica",
                "description": "Ferramentas e tecnologias que utilizo em todo o espectro do desenvolvimento",
                "items": [
                    { "category": "Linguagens", "items": ["Golang", "TypeScript", "Node.js", "Python", "PHP", "Lua", "Rust"] },
                    { "category": "Frameworks & Bibliotecas", "items": ["Vue.js", "React", "Svelte", "Astro", "TailwindCSS", "NestJS"] },
                    { "category": "Nuvem & Infraestrutura", "items": ["AWS", "GCP", "Azure", "Digital Ocean", "Cloudflare"] },
                    { "category": "Bancos de Dados & Filas", "items": ["Postgres", "MySQL", "MongoDB", "Redis", "BullMQ"] },
                    { "category": "IA & Machine Learning", "items": ["Orquestração LLM", "Agentes Conversacionais", "Visão Computacional", "Context Engineering"] }
                ]
            },
            "experience": {
                "title": "Experiência",
                "description": "Minha trajetória profissional e contribuições principais",
                "items": [
                    {
                        "company": "Digevo",
                        "location": "Santiago de Chile, Chile",
                        "period": "Dezembro 2022 — Dezembro 2024",
                        "role": "Senior Full Stack Developer",
                        "achievements": [
                            "Projetei e construí 'Anto', um agente de IA em produção que fornece recomendações nutricionais personalizadas através de orquestração avançada de LLM.",
                            "Liderei a migração completa do WordPress para uma arquitetura de microserviços em Golang + Vue.js, alcançando 6x mais desempenho e substituindo cron jobs por filas Redis confiáveis.",
                            "Desenvolvi um assistente de IA multi-canal (WhatsApp + Web) funcionando como um companheiro útil e gerando novas oportunidades de negócio."
                        ]
                    },
                    {
                        "company": "AMG Alarcon Management Group",
                        "location": "Lima, Peru",
                        "period": "Setembro 2021 — Outubro 2022",
                        "role": "Full Stack Developer",
                        "achievements": [
                            "Criei 'Smart Rooster', um sistema completo de gestão de granjas avícolas usando Laravel e Vue.js com procedures MySQL, capaz de gerenciar mais de 50.000 registros eficientemente.",
                            "Entreguei múltiplas plataformas de eCommerce personalizadas com backends Nuxt.js, reduzindo abandono de checkout em ~40% e melhorando UX e conversão.",
                            "Otimizei landing pages para tempos de carregamento abaixo de 3 segundos, aumentando a taxa de conversão em 25%."
                        ]
                    }
                ]
            }
        },
        "music": {
            "seo": {
                "title": "Música | Alex Zweiter",
                "description": "Música eletrônica original explorando texturas, ritmo e profundidade emocional."
            },
            "title": "Música",
            "description": "Exploro o som através de texturas eletrônicas, experimentação rítmica e narrativa emocional."
        },
        "works": {
            "seo": {
                "title": "Projetos | Alex Zweiter",
                "description": "Projetos selecionados mostrando orquestração de IA, sistemas de alto desempenho, arquiteturas modulares e desenvolvimento full-stack."
            },
            "title": "Projetos Selecionados",
            "projects": [
                {
                    "title": "Aris",
                    "description": "Sistema privado de orquestração de IA coordenando múltiplos agentes eficientemente, usando protocolos binários e mensagens inspiradas em robótica, extensível via plugins Lua.",
                    "stack": ["Rust", "Lua"],
                    "status": "Privado / Em desenvolvimento",
                    "preview": null,
                    "repository": null,
                    "created_at": "2025"
                },
                {
                    "title": "Vayload",
                    "description": "CMS modular de alto desempenho em Go com sistema de plugins Lua e CLI em Rust, construído para plataformas comunitárias complexas precisando de escalabilidade, flexibilidade e ótima experiência para desenvolvedores.",
                    "stack": ["Go", "Rust", "Lua", "Postgres/MySQL/SQLite", "SvelteKit", "Microkernel"],
                    "status": "Em desenvolvimento",
                    "preview": "https://vaload.dev",
                    "repository": "https://github.com/vayload/vayload",
                    "created_at": "2024"
                },
                {
                    "title": "Swilen",
                    "description": "Framework PHP assíncrono construído sobre OpenSwoole, com runtime customizado compatível com APIs WordPress. Explora arquiteturas de plugins modernas, backends escaláveis e desacoplamento de componentes.",
                    "stack": ["PHP 8", "Pest", "OpenSwoole", "TypeScript", "NestJS"],
                    "status": "Beta / Experimental",
                    "preview": "https://packagist.org/packages/swilen/framework",
                    "repository": "https://github.com/swilenphp/swilen-core",
                    "created_at": "2023"
                },
                {
                    "title": "Nyx",
                    "description": "Plataforma de mensagens criptografadas de ponta a ponta com backend Node.js, frontend React e cliente CLI Rust. Implementa criptografia robusta, P2P e WebRTC para comunicação segura em tempo real.",
                    "stack": ["JavaScript", "React", "Node.js", "Rust", "WebSockets", "WebRTC", "RSA"],
                    "status": "Em andamento",
                    "preview": null,
                    "repository": "https://github.com/zsweiter/Nyx",
                    "created_at": "2024"
                },
                {
                    "title": "Janque org",
                    "description": "Site comunitário dedicado a preservar e compartilhar a cultura e patrimônio de Janque. Construído com Nuxt.js e princípios JAMstack para alto desempenho, alcance global e narrativa envolvente.",
                    "stack": ["Nuxt 4", "Nuxt Content", "Cloudflare", "JAMstack", "TypeScript", "TailwindCSS"],
                    "status": "Online",
                    "preview": "https://janque.org",
                    "repository": "https://github.com/zsweiter/janque.org",
                    "created_at": "2025"
                }
            ]
        }
    }
};

export const common = {
    socials: {
        github: "https://github.com/zsweiter",
        linkedin: "https://www.linkedin.com/in/alex-segundo",
        twitter: "https://x.com/asegundo442",
        instagram: "https://www.instagram.com/alexsegundoll",
        soundcloud: "https://soundcloud.com/alex-zweiter",
        email: "zsweiter@gmail.com",
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
