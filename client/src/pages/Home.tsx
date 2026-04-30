import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Code2, Smartphone, Cloud, Zap, Users, TrendingUp, MessageCircle } from "lucide-react";
import { useState } from "react";

/**
 * DESIGN PHILOSOPHY: Cyberpunk Neon Futurista
 * - Dark background (#0a0e27) com neon colors (cyan #00d9ff, magenta #ff006e, green #39ff14)
 * - Assimetric layout com blocos flutuantes
 * - Efeitos de glitch, parallax, e animações neon
 * - Tipografia monoespacial (Space Mono) para títulos, Roboto para corpo
 * - Perguntas provocativas que despertam a dor do cliente
 * - Estrutura de conversão focada em WhatsApp
 */

export default function Home() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const whatsappLink = "https://wa.me/5521978670637?text=Olá%20André!%20Gostaria%20de%20conversar%20sobre%20um%20projeto.";

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b neon-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-neon-cyan" />
            <span className="font-bold text-xl text-neon-cyan">ANDRÉ PITA</span>
          </div>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button className="bg-neon-green hover:bg-neon-green/80 text-neon-dark font-bold">
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663121054031/SBEhzPxQNjZeHSvibyvHtZ/hero-cyberpunk-neon-6cJ8HBPHk67WRPUzrxtwKz.webp')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        
        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-neon-cyan">Seu site</span>
                <br />
                <span className="text-neon-magenta">está lento?</span>
                <br />
                <span className="text-neon-green">Seu app bugado?</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Enquanto você perde clientes com sistemas deficientes, eu construo soluções que vendem, escalam e impressionam.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-neon-cyan">
                <CheckCircle className="w-5 h-5" />
                <span>50+ projetos entregues</span>
              </div>
              <div className="flex items-center gap-3 text-neon-magenta">
                <CheckCircle className="w-5 h-5" />
                <span>5+ anos de experiência</span>
              </div>
              <div className="flex items-center gap-3 text-neon-green">
                <CheckCircle className="w-5 h-5" />
                <span>Clientes em todo Brasil</span>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button className="bg-neon-green hover:bg-neon-green/80 text-neon-dark font-bold text-lg px-8 py-6 animate-neon-pulse">
                  Conversar Agora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Button variant="outline" className="neon-border text-neon-cyan hover:bg-neon-cyan/10 font-bold text-lg px-8 py-6">
                Ver Projetos
              </Button>
            </div>
          </div>

          <div className="hidden lg:block relative h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20 rounded-lg blur-3xl" />
            <div className="relative h-full flex items-center justify-center">
              <div className="text-6xl font-bold text-neon-cyan opacity-20">{'< />'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-card/50 border-t border-b neon-border">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-neon-magenta">Qual é seu problema?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "⚡",
                title: "Site lento = Clientes perdidos",
                desc: "Cada segundo de delay custa 7% em conversão. Você está deixando dinheiro na mesa."
              },
              {
                icon: "🐛",
                title: "App com bugs = Reputação destruída",
                desc: "Um crash na hora errada e seu cliente vai para o concorrente. Não é risco, é certeza."
              },
              {
                icon: "📉",
                title: "Sistema desorganizado = Caos operacional",
                desc: "Sem automação, você trabalha 24h e ganha como se trabalhasse 2h. Isso é insustentável."
              }
            ].map((item, idx) => (
              <Card key={idx} className="bg-background border-neon-border p-6 hover:neon-glow transition-all duration-300">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-neon-cyan mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="text-neon-green">O que eu faço</span>
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Não sou apenas um programador. Sou um engenheiro de soluções que transforma ideias em máquinas de vendas.
          </p>

          <div 
            className="relative h-96 rounded-lg overflow-hidden mb-12 border neon-border"
            style={{
              backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663121054031/SBEhzPxQNjZeHSvibyvHtZ/services-tech-stack-baNvi8pjVEr6FkHAvLFDYD.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Code2 className="w-8 h-8" />,
                title: "Desenvolvimento Web",
                services: ["React, Next.js", "Node.js, Express", "Banco de dados", "APIs REST/GraphQL"]
              },
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: "Aplicativos Mobile",
                services: ["React Native", "Flutter", "iOS/Android nativo", "Push notifications"]
              },
              {
                icon: <Cloud className="w-8 h-8" />,
                title: "Sistemas SaaS",
                services: ["Arquitetura escalável", "Multi-tenant", "Pagamentos (Stripe)", "Autenticação segura"]
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Backend Robusto",
                services: ["Microserviços", "Cloud (AWS, GCP)", "CI/CD pipelines", "Otimização de performance"]
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Otimização & Escalabilidade",
                services: ["Análise de performance", "Refatoração de código", "Arquitetura de crescimento", "DevOps"]
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Consultoria Técnica",
                services: ["Arquitetura de sistemas", "Code review", "Mentoria de times", "Estratégia tech"]
              }
            ].map((service, idx) => (
              <Card
                key={idx}
                className="bg-card border-neon-border p-6 hover:neon-glow transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredService(idx)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className={`text-neon-cyan mb-4 ${hoveredService === idx ? 'scale-110' : ''} transition-transform`}>
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-neon-magenta mb-3">{service.title}</h3>
                <ul className="space-y-2">
                  {service.services.map((s, sidx) => (
                    <li key={sidx} className="text-sm text-muted-foreground flex items-start">
                      <span className="text-neon-green mr-2">→</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-card/30 border-t neon-border">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="text-neon-cyan">Projetos que vendem</span>
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Veja alguns dos projetos que transformaram negócios em máquinas de vendas.
          </p>

          <div 
            className="relative h-96 rounded-lg overflow-hidden mb-12 border neon-border"
            style={{
              backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663121054031/SBEhzPxQNjZeHSvibyvHtZ/portfolio-projects-fwPRRuyurRPQjAqXBiaRR.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Plataforma de E-commerce",
                client: "Loja Digital Premium",
                result: "+340% em vendas",
                tech: "React, Node.js, PostgreSQL, Stripe"
              },
              {
                name: "App de Gestão de Tarefas",
                client: "Agência de Marketing",
                result: "+200% produtividade",
                tech: "React Native, Firebase, Real-time sync"
              },
              {
                name: "Sistema SaaS de Análise",
                client: "Consultoria Empresarial",
                result: "+500 clientes ativos",
                tech: "Next.js, Python, AWS, GraphQL"
              },
              {
                name: "Plataforma de Cursos Online",
                client: "Educador Digital",
                result: "+R$500k em receita",
                tech: "React, Node.js, Stripe, Video streaming"
              }
            ].map((project, idx) => (
              <Card key={idx} className="bg-background border-neon-border p-6 hover:neon-glow-magenta transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-neon-magenta">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.client}</p>
                  </div>
                  <span className="text-neon-green font-bold text-sm bg-neon-green/10 px-3 py-1 rounded">
                    {project.result}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{project.tech}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="text-neon-magenta">O que meus clientes dizem</span>
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Não confie apenas na minha palavra. Veja o que empresas reais conquistaram.
          </p>

          <div 
            className="relative h-80 rounded-lg overflow-hidden mb-12 border neon-border"
            style={{
              backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663121054031/SBEhzPxQNjZeHSvibyvHtZ/testimonials-section-ic2MxLd2xeUUT96yoWRKCdV.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Carlos Silva",
                company: "CEO, Loja Digital Premium",
                text: "André não é só um programador, é um parceiro estratégico. Ele entendeu meu negócio e entregou uma solução que triplicou minhas vendas.",
                rating: 5
              },
              {
                name: "Marina Costa",
                company: "Fundadora, Agência de Marketing",
                text: "O app que ele desenvolveu revolucionou como nossa equipe trabalha. Produtividade subiu 200% e os clientes adoram.",
                rating: 5
              },
              {
                name: "Roberto Santos",
                company: "Diretor, Consultoria Empresarial",
                text: "Profissionalismo do início ao fim. Prazos cumpridos, código limpo, suporte excelente. Recomendo para qualquer projeto sério.",
                rating: 5
              }
            ].map((testimonial, idx) => (
              <Card key={idx} className="bg-card border-neon-border p-6">
                <div className="flex gap-1 mb-4">
                  {Array(testimonial.rating).fill(0).map((_, i) => (
                    <span key={i} className="text-neon-green">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-neon-cyan">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card/50 border-t border-b neon-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: "50+", label: "Projetos Entregues" },
              { number: "5+", label: "Anos de Experiência" },
              { number: "100%", label: "Clientes Satisfeitos" },
              { number: "24/7", label: "Suporte Disponível" }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-neon-cyan">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663121054031/SBEhzPxQNjZeHSvibyvHtZ/cta-contact-Pybys9rcVXQwxBaKVm3Z2d.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-background" />
        
        <div className="container relative z-10 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold">
              <span className="text-neon-green">Pronto para transformar</span>
              <br />
              <span className="text-neon-magenta">seu negócio?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Não espere mais. Cada dia sem uma solução profissional é um dia perdendo clientes para a concorrência.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button className="bg-neon-green hover:bg-neon-green/80 text-neon-dark font-bold text-lg px-8 py-6 animate-neon-pulse w-full sm:w-auto">
                <MessageCircle className="w-5 h-5 mr-2" />
                Conversar no WhatsApp
              </Button>
            </a>
            <Button variant="outline" className="neon-border text-neon-cyan hover:bg-neon-cyan/10 font-bold text-lg px-8 py-6">
              Agendar Reunião
            </Button>
          </div>

          <div className="pt-8 border-t neon-border">
            <p className="text-muted-foreground">
              <span className="text-neon-cyan font-bold">WhatsApp:</span> (21) 97867-0637
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Respondo em até 2 horas. Sem robôs, sem espera. Conversa real com um profissional real.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t neon-border bg-card/30">
        <div className="container text-center text-muted-foreground">
          <p>© 2026 André Pita - Programador Full Stack</p>
          <p className="text-sm mt-2">Desenvolvido com <span className="text-neon-magenta">❤</span> em código</p>
        </div>
      </footer>
    </div>
  );
}
