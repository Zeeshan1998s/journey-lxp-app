'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useJourney } from '../../contexts/JourneyContext';

export default function ModulesPage() {
  const router = useRouter();
  const { setGeneratedJourney } = useJourney();
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const modules = [
    {
      title: 'Learn Linux',
      type: 'Guided Project',
      icon: '⚙️',
      chapters: [
        'Ch 1. Linux Fundamentals', 'Ch 5. File System Hierarchy', 'Ch 9. SSH & Remote Access',
        'Ch 2. Shell Navigation', 'Ch 6. Process Management', 'Ch 10. Networking Basics',
        'Ch 3. Users & Permissions', 'Ch 7. Package Managers', 'Ch 11. System Services (systemd)',
        'Ch 4. Text Processing', 'Ch 8. Shell Scripting', 'Ch 12. Capstone: Linux Admin'
      ]
    },
    {
      title: 'Learn Docker',
      type: 'Module',
      icon: '⚙️',
      chapters: [
        'Ch 1. What are Containers?', 'Ch 5. Docker Volumes', 'Ch 9. Multi-stage Builds',
        'Ch 2. Installing Docker', 'Ch 6. Docker Networks', 'Ch 10. Docker Compose Basics',
        'Ch 3. Running First Container', 'Ch 7. Writing Dockerfiles', 'Ch 11. Complex Docker Compose',
        'Ch 4. Image Management', 'Ch 8. Building Custom Images', 'Ch 12. Capstone: Containerized App'
      ]
    },
    {
      title: 'Learn Kubernetes',
      type: 'Module',
      icon: '⚙️',
      chapters: [
        'Ch 1. Container Orchestration', 'Ch 5. Services & Networking', 'Ch 9. Ingress Controllers',
        'Ch 2. Kubernetes Architecture', 'Ch 6. Volumes & ConfigMaps', 'Ch 10. RBAC & Security',
        'Ch 3. Pods & Namespaces', 'Ch 7. Secrets Management', 'Ch 11. Helm Charts',
        'Ch 4. Deployments & Replicas', 'Ch 8. StatefulSets & DaemonSets', 'Ch 12. Capstone: K8s Cluster'
      ]
    },
    {
      title: 'Learn Terraform',
      type: 'Guided Project',
      icon: '⚙️',
      chapters: [
        'Ch 1. Infrastructure as Code', 'Ch 5. Variables & Outputs', 'Ch 9. Workspaces',
        'Ch 2. Terraform Providers', 'Ch 6. State Management', 'Ch 10. Provisioners',
        'Ch 3. Provisioning Resources', 'Ch 7. Remote Backends', 'Ch 11. Terraform Cloud',
        'Ch 4. Data Sources', 'Ch 8. Terraform Modules', 'Ch 12. Capstone: AWS Infra'
      ]
    },
    {
      title: 'Learn Ansible',
      type: 'Module',
      icon: '⚙️',
      chapters: [
        'Ch 1. Configuration Management', 'Ch 5. Modules & Tasks', 'Ch 9. Roles & Galaxy',
        'Ch 2. Ansible Architecture', 'Ch 6. Variables & Facts', 'Ch 10. Ansible Vault',
        'Ch 3. Inventory Files', 'Ch 7. Conditionals & Loops', 'Ch 11. Custom Modules',
        'Ch 4. Writing Playbooks', 'Ch 8. Handlers & Templates', 'Ch 12. Capstone: Server Setup'
      ]
    },
    {
      title: 'Learn Jenkins',
      type: 'Module',
      icon: '⚙️',
      chapters: [
        'Ch 1. Intro to CI/CD', 'Ch 5. Parameterized Builds', 'Ch 9. Multi-branch Pipelines',
        'Ch 2. Installing Jenkins', 'Ch 6. Jenkins Plugins', 'Ch 10. Distributed Builds (Nodes)',
        'Ch 3. Freestyle Projects', 'Ch 7. Declarative Pipelines', 'Ch 11. Security & Credentials',
        'Ch 4. SCM Integration', 'Ch 8. Scripted Pipelines', 'Ch 12. Capstone: CI/CD Pipeline'
      ]
    },
    {
      title: 'Learn GitHub Actions',
      type: 'Guided Project',
      icon: '⚙️',
      chapters: [
        'Ch 1. Workflows & Events', 'Ch 5. Matrix Builds', 'Ch 9. Deployment Environments',
        'Ch 2. Runners & Jobs', 'Ch 6. Caching Dependencies', 'Ch 10. Reusable Workflows',
        'Ch 3. Actions & Steps', 'Ch 7. Artifacts & Outputs', 'Ch 11. Custom Actions',
        'Ch 4. Secrets & Environment', 'Ch 8. OIDC AWS Integration', 'Ch 12. Capstone: Prod Release'
      ]
    },
    {
      title: 'Learn Prometheus',
      type: 'Module',
      icon: '⚙️',
      chapters: [
        'Ch 1. Observability Basics', 'Ch 5. PromQL Basics', 'Ch 9. Alertmanager Setup',
        'Ch 2. Metrics vs Logs', 'Ch 6. Advanced PromQL', 'Ch 10. Alerting Rules',
        'Ch 3. Prometheus Architecture', 'Ch 7. Recording Rules', 'Ch 11. Pushgateway',
        'Ch 4. Exporters & Scraping', 'Ch 8. Service Discovery', 'Ch 12. Capstone: Monitoring'
      ]
    },
    {
      title: 'Learn Grafana',
      type: 'Module',
      icon: '⚙️',
      chapters: [
        'Ch 1. Data Visualization', 'Ch 5. Time Series & Graphs', 'Ch 9. User Management',
        'Ch 2. Connecting Data Sources', 'Ch 6. Tables & Gauges', 'Ch 10. Authentication (OAuth)',
        'Ch 3. Building Dashboards', 'Ch 7. Dashboard Variables', 'Ch 11. Exporting Dashboards',
        'Ch 4. Panels & Rows', 'Ch 8. Grafana Alerting', 'Ch 12. Capstone: Metrics Portal'
      ]
    },
    {
      title: 'Learn AWS',
      type: 'Guided Project',
      icon: '⚙️',
      chapters: [
        'Ch 1. Cloud Computing Intro', 'Ch 5. RDS & Databases', 'Ch 9. Elastic Load Balancing',
        'Ch 2. IAM & Security', 'Ch 6. S3 & Storage', 'Ch 10. Auto Scaling Groups',
        'Ch 3. VPC & Networking', 'Ch 7. Route 53 (DNS)', 'Ch 11. CloudWatch & Logs',
        'Ch 4. EC2 Instances', 'Ch 8. SQS & SNS Messaging', 'Ch 12. Capstone: Highly Available App'
      ]
    },
    {
      title: 'Learn GCP',
      type: 'Module',
      icon: '⚙️',
      chapters: [
        'Ch 1. Intro to GCP', 'Ch 5. Cloud Storage', 'Ch 9. Load Balancing',
        'Ch 2. IAM & Projects', 'Ch 6. Cloud SQL', 'Ch 10. Pub/Sub Messaging',
        'Ch 3. VPC Networks', 'Ch 7. Cloud Run & Functions', 'Ch 11. Operations Suite',
        'Ch 4. Compute Engine', 'Ch 8. GKE (Kubernetes)', 'Ch 12. Capstone: Serverless App'
      ]
    },
    {
      title: 'Learn Azure',
      type: 'Module',
      icon: '⚙️',
      chapters: [
        'Ch 1. Azure Fundamentals', 'Ch 5. Azure Storage', 'Ch 9. Azure Load Balancer',
        'Ch 2. Azure Active Directory', 'Ch 6. Azure SQL Database', 'Ch 10. Azure Service Bus',
        'Ch 3. Virtual Networks', 'Ch 7. Azure App Service', 'Ch 11. Azure Monitor',
        'Ch 4. Virtual Machines', 'Ch 8. AKS (Kubernetes)', 'Ch 12. Capstone: Enterprise App'
      ]
    }
  ];

  const reviews = [
    {
      text: "I think it was way better than I learned java in university. It was way more fun.",
      author: "nbross", location: "Munich", module: "Learn to Code in Python"
    },
    {
      text: "good learning path, made me catch up on SQL in a few days :)",
      author: "Ti", location: "France", module: "Learn SQL"
    },
    {
      text: "I always thought that i know Go, turns out i know nothing about Go, this journey fills on those gaps.",
      author: "Defhanaya", location: "Indonesia", module: "Learn Go"
    },
    {
      text: "SQL is so simple and yet so fundamental!",
      author: "Francisco", location: "Argentina", module: "Learn SQL"
    },
    {
      text: "This platform is amazing! I just completed 'Learn to Code in Python' almost entirely on my own.",
      author: "Benjamin Wolf", location: "United States", module: "Learn to Code in Python"
    },
    {
      text: "This was awesome! I loved it!",
      author: "Tony DeJesus", location: "United States", module: "Learn to Code in Python"
    }
  ];

  const faqs = [
    { q: "Can I start the backend path for free?", a: "Yep. You can create an account for free and fully demo the early chapters of the path. Once you hit the membership gate, you can still read the remaining lessons in content-only mode until you're ready to upgrade." },
    { q: "How long does it take to become a backend developer with these modules?", a: "Most students complete the path in 6-12 months depending on how many hours they dedicate per week." },
    { q: "Why does the backend path teach Python and Golang?", a: "Python is great for fundamentals and data, while Go is the modern standard for high-performance backend systems." },
    { q: "Should I put Boot.dev backend projects on my resume?", a: "Absolutely! The projects are designed to be portfolio-ready and demonstrate real-world backend engineering skills." }
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: 'var(--white)', color: 'var(--gray-900)', fontFamily: 'var(--font)' }}>
      
      {/* HERO SECTION */}
      <div style={{ 
        padding: '100px 24px 80px', 
        textAlign: 'center',
        background: 'radial-gradient(circle at top, var(--gray-50), var(--white))',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 900, color: 'var(--gray-900)', marginBottom: '24px', letterSpacing: '-0.03em' }}>
            DevOps Engineering Path
          </h1>
          <p style={{ fontSize: '20px', lineHeight: 1.5, color: 'var(--gray-600)', marginBottom: '24px' }}>
            Master infrastructure, automation, and deployment with Linux, Docker, Kubernetes, and CI/CD pipelines.
          </p>
          <div style={{ fontSize: '14px', color: 'var(--gray-500)', marginBottom: '40px' }}>
            Also available in: <span style={{ fontWeight: 600, color: 'var(--gray-700)', textDecoration: 'underline' }}>AWS / GCP</span>
          </div>
          
          <button style={{
            background: 'var(--orange)', color: '#fff', border: 'none', borderRadius: '8px',
            padding: '16px 40px', fontSize: '16px', fontWeight: 800, cursor: 'pointer',
            boxShadow: '0 0 40px rgba(241,89,32,0.4)', transition: 'all 0.2s',
            letterSpacing: '0.05em', textTransform: 'uppercase'
          }}
          onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 50px rgba(241,89,32,0.6)'; }}
          onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(241,89,32,0.4)'; }}
          onClick={async (e) => {
            const btn = e.currentTarget;
            const originalText = btn.innerText;
            btn.innerText = 'Generating Journey...';
            btn.style.opacity = '0.7';
            try {
              const res = await fetch('/api/ai/generate-journey', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: 'DevOps Engineering Path' })
              });
              const data = await res.json();
              if (data.success && data.journey) {
                setGeneratedJourney(data.journey);
                router.push('/dashboard');
              }
            } catch (err) {
              console.error(err);
              btn.innerText = originalText;
              btn.style.opacity = '1';
            }
          }}
          >
            Continue The Learning Path
          </button>

          <div style={{ marginTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--gray-200)', border: '2px solid var(--white)', zIndex: 3 }}></div>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--gray-300)', border: '2px solid var(--white)', marginLeft: '-12px', zIndex: 2 }}></div>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--gray-400)', border: '2px solid var(--white)', marginLeft: '-12px', zIndex: 1 }}></div>
              </div>
              <span style={{ fontSize: '14px', color: 'var(--gray-600)', fontWeight: 500 }}>Join 1,201,282 students from companies like</span>
            </div>
            
            {/* Fake Logos using text since we don't have SVGs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px', opacity: 0.6 }}>
              <span style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-1px' }}>Google</span>
              <span style={{ fontSize: '20px', fontWeight: 800 }}>HashiCorp</span>
              <span style={{ fontSize: '22px', fontWeight: 700 }}>stripe</span>
              <span style={{ fontSize: '20px', fontWeight: 600 }}>Microsoft</span>
            </div>
          </div>
        </div>
      </div>

      {/* COURSE LIST */}
      <div style={{ padding: '80px 24px', background: 'var(--white)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 900, color: 'var(--gray-900)', marginBottom: '16px' }}>Chapter List</h2>
            <p style={{ fontSize: '18px', color: 'var(--gray-600)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>
              Packed with 20 chapters and 8 projects this path takes most beginners about 12 months to complete
            </p>
            <p style={{ fontSize: '14px', color: 'var(--gray-500)', maxWidth: '700px', margin: '24px auto 0', lineHeight: 1.6 }}>
              DevOps engineers build the infrastructure and pipelines that power large-scale web applications that you use every day. In this complete learning path you'll start by learning the fundamentals of programming and computer science in Python and C, then you'll learn all about building scalable and secure back-end systems using Golang, SQL and Docker.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {modules.map((module, idx) => (
              <div key={idx} style={{ 
                border: '1px solid var(--border)', borderRadius: '16px', padding: '32px', 
                background: 'var(--white)', display: 'flex', gap: '24px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)', position: 'relative', overflow: 'hidden'
              }}>
                <div style={{ fontSize: '48px', flexShrink: 0, marginTop: '24px' }}>{module.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                    {module.type}
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '24px' }}>
                    {idx + 1}. {module.title}
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
                    {module.chapters.map((ch, i) => (
                      <div key={i} style={{ fontSize: '13px', color: 'var(--gray-600)' }}>{ch}</div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--gray-100)', paddingTop: '24px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--gray-400)' }}>Last updated: Jun 2026</span>
                    <button style={{
                      background: 'var(--gray-100)', color: 'var(--gray-900)', border: 'none', borderRadius: '24px',
                      padding: '8px 24px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s'
                    }}
                    onMouseOver={e => e.currentTarget.style.background = 'var(--gray-200)'}
                    onMouseOut={e => e.currentTarget.style.background = 'var(--gray-100)'}
                    onClick={async (e) => {
            const btn = e.currentTarget;
            const originalText = btn.innerText;
            btn.innerText = 'Generating Journey...';
            btn.style.opacity = '0.7';
            try {
              const res = await fetch('/api/ai/generate-journey', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: 'DevOps Engineering Path' })
              });
              const data = await res.json();
              if (data.success && data.journey) {
                setGeneratedJourney(data.journey);
                router.push('/dashboard');
              }
            } catch (err) {
              console.error(err);
              btn.innerText = originalText;
              btn.style.opacity = '1';
            }
          }}
                    >
                      Enter {module.type}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div style={{ padding: '80px 24px', background: 'var(--gray-50)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--gray-900)', marginBottom: '16px', letterSpacing: '-0.02em' }}>
              Join 1,201,282 students learning modern backend skills
            </h2>
            <p style={{ fontSize: '18px', color: 'var(--gray-600)', marginBottom: '48px' }}>
              Connect directly with them and others in our flourishing online community
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '64px' }}>
              <div>
                <div style={{ fontSize: '36px', fontWeight: 900, color: 'var(--gray-900)' }}>33.7M</div>
                <div style={{ fontSize: '14px', color: 'var(--gray-500)', textTransform: 'uppercase', fontWeight: 600 }}>lessons completed</div>
              </div>
              <div>
                <div style={{ fontSize: '36px', fontWeight: 900, color: 'var(--gray-900)' }}>208K</div>
                <div style={{ fontSize: '14px', color: 'var(--gray-500)', textTransform: 'uppercase', fontWeight: 600 }}>chapters completed</div>
              </div>
              <div>
                <div style={{ fontSize: '36px', fontWeight: 900, color: 'var(--gray-900)' }}>7.4B</div>
                <div style={{ fontSize: '14px', color: 'var(--gray-500)', textTransform: 'uppercase', fontWeight: 600 }}>xp earned</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {reviews.map((rev, i) => (
              <div key={i} style={{ 
                background: 'var(--white)', border: '1px solid var(--orange)', borderRadius: '12px', padding: '24px',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
              }}>
                <div>
                  <p style={{ fontSize: '15px', color: 'var(--gray-700)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '16px' }}>
                    "{rev.text}"
                  </p>
                  <span style={{ fontSize: '13px', color: 'var(--orange)', textDecoration: 'underline', cursor: 'pointer' }}>Read full review</span>
                </div>
                
                <div style={{ marginTop: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '16px' }}>
                    {[1,2,3,4,5].map(star => <span key={star} style={{ color: '#f59e0b', fontSize: '18px' }}>★</span>)}
                    <span style={{ fontSize: '12px', color: 'var(--gray-500)', marginLeft: '4px' }}>(5/5)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gray-200)' }}></div>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gray-900)' }}>{rev.author}</div>
                      <div style={{ fontSize: '12px', color: 'var(--gray-500)' }}>{rev.location}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 600, color: 'var(--gray-500)' }}>
                    {rev.module}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>

      {/* FAQ SECTION */}
      <div style={{ padding: '80px 24px', background: 'var(--white)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--gray-900)', marginBottom: '8px' }}>Frequently asked Questions</h2>
            <p style={{ fontSize: '16px', color: 'var(--gray-600)' }}>Got questions? We've got answers</p>
          </div>

          <div style={{ border: '1px solid var(--orange)', borderRadius: '12px', padding: '0 32px' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: i !== faqs.length - 1 ? '1px solid var(--gray-200)' : 'none' }}>
                <button 
                  onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                  style={{ 
                    width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: 'transparent', border: 'none', padding: '24px 0', cursor: 'pointer',
                    fontSize: '16px', fontWeight: 700, color: 'var(--gray-900)', textAlign: 'left',
                    fontFamily: 'var(--font)'
                  }}
                >
                  {faq.q}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2" style={{ transform: openAccordion === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                <div style={{ maxHeight: openAccordion === i ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                  <p style={{ fontSize: '15px', color: 'var(--gray-600)', lineHeight: 1.6, paddingBottom: '24px' }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
