const fs = require('fs');
const path = require('path');

// 1. Create DevOps Page
const backendPath = path.join(__dirname, 'app/courses/backend/page.tsx');
let devopsContent = fs.readFileSync(backendPath, 'utf8');

devopsContent = devopsContent.replace(/Back-end Developer Path/g, 'DevOps Engineering Path');
devopsContent = devopsContent.replace(/Go from Python fundamentals to real backend systems with Go, SQL, Docker, and portfolio projects\./g, 'Master infrastructure, automation, and deployment with Linux, Docker, Kubernetes, and CI/CD pipelines.');
devopsContent = devopsContent.replace(/TypeScript/g, 'AWS / GCP');
devopsContent = devopsContent.replace(/Backend developers build the systems that power the large-scale web applications/g, 'DevOps engineers build the infrastructure and pipelines that power large-scale web applications');

fs.writeFileSync(path.join(__dirname, 'app/courses/devops/page.tsx'), devopsContent, 'utf8');

// 2. Update TopNavbar
const navPath = path.join(__dirname, 'app/components/TopNavbar.tsx');
let navContent = fs.readFileSync(navPath, 'utf8');

navContent = navContent.replace(
  `        {['Courses', 'Backend Path', 'DevOps Path', 'Custom Paths'].map((item, idx) => {
          // For the demo, "Backend Path" is selected on the /courses page, otherwise "Courses" is the default.
          const isActive = pathname === '/courses' && item === 'Backend Path';
          
          return (
          <Link key={item} href="/courses"`,
  `        {['Courses', 'Backend Path', 'DevOps Path', 'Custom Paths'].map((item, idx) => {
          let href = '/';
          if (item === 'Courses') href = '/courses/backend'; // default courses to backend for now
          if (item === 'Backend Path') href = '/courses/backend';
          if (item === 'DevOps Path') href = '/courses/devops';
          if (item === 'Custom Paths') href = '/';

          const isActive = (item === 'Backend Path' && pathname.includes('/courses/backend')) ||
                           (item === 'DevOps Path' && pathname.includes('/courses/devops'));
          
          return (
          <Link key={item} href={href}`
);

fs.writeFileSync(navPath, navContent, 'utf8');
console.log('Routes setup complete');
