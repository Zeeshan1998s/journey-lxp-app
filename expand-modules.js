const fs = require('fs');
const path = require('path');

function generateModules(pathName) {
  const isBackend = pathName === 'backend';
  const prefix = isBackend ? 'Backend' : 'DevOps';
  const modules = [];
  
  const techStacks = isBackend 
    ? ['Python', 'SQL', 'Go', 'Docker', 'Redis', 'PostgreSQL', 'GraphQL', 'gRPC', 'WebSockets', 'Message Queues', 'Security', 'Testing']
    : ['Linux', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Jenkins', 'GitHub Actions', 'Prometheus', 'Grafana', 'AWS', 'GCP', 'Azure'];

  for (let i = 0; i < 12; i++) {
    modules.push(`{
      title: 'Learn ${techStacks[i]}',
      type: '${i % 3 === 0 ? 'Guided Project' : 'Module'}',
      icon: '${isBackend ? '💻' : '⚙️'}',
      chapters: [
        'Ch 1. Introduction', 'Ch 4. Advanced Concepts',
        'Ch 2. Core Mechanics', 'Ch 5. Best Practices',
        'Ch 3. Implementation', 'Ch 6. Capstone'
      ]
    }`);
  }
  return modules.join(',\n    ');
}

const backendPath = path.join(__dirname, 'app/courses/backend/page.tsx');
let backendContent = fs.readFileSync(backendPath, 'utf8');

// Replace the entire modules array
const regex = /const modules = \[[\s\S]*?\];/;
backendContent = backendContent.replace(regex, `const modules = [\n    ${generateModules('backend')}\n  ];`);
fs.writeFileSync(backendPath, backendContent, 'utf8');

const devopsPath = path.join(__dirname, 'app/courses/devops/page.tsx');
let devopsContent = fs.readFileSync(devopsPath, 'utf8');
devopsContent = devopsContent.replace(regex, `const modules = [\n    ${generateModules('devops')}\n  ];`);
fs.writeFileSync(devopsPath, devopsContent, 'utf8');

console.log('Expanded modules for both paths.');
