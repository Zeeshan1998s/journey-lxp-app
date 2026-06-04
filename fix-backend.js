const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, 'app/courses/backend/page.tsx');
let content = fs.readFileSync(p, 'utf8');

// Replace specific strings
content = content.replace(/15 courses/g, '20 chapters');
content = content.replace(/Course List/g, 'Chapter List');
content = content.replace(/Enter Course/g, 'Enter Chapter');
content = content.replace(/course\.type/g, 'course.type'); // Wait, the property might be used, let's keep it in JS
content = content.replace(/Course/g, 'Module');
content = content.replace(/course/g, 'module');
content = content.replace(/module\.type/g, 'module.type');
content = content.replace(/Enter Module/g, 'Enter Module');
content = content.replace(/Module List/g, 'Curriculum Overview');
content = content.replace(/modules completed/g, 'chapters completed');

// Fix the reviews where "course" was replaced
content = content.replace(/good module/g, 'good learning path');
content = content.replace(/this module/g, 'this journey');

// Adjust the handler to use AI generation route instead of direct router push to dashboard
// We want to fetch the AI route, then push to /dashboard
const routerRegex = /onClick=\{\(\) => router\.push\('\/dashboard'\)\}/g;
const newClick = `onClick={async (e) => {
            const btn = e.currentTarget;
            const originalText = btn.innerText;
            btn.innerText = 'Generating Journey...';
            btn.style.opacity = '0.7';
            try {
              const res = await fetch('/api/ai/generate-journey', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: 'Back-end Developer Path' })
              });
              const data = await res.json();
              if (data.success && data.journey) {
                localStorage.setItem('generatedJourney', JSON.stringify(data.journey));
                router.push('/dashboard');
              }
            } catch (err) {
              console.error(err);
              btn.innerText = originalText;
              btn.style.opacity = '1';
            }
          }}`;

content = content.replace(routerRegex, newClick);

fs.writeFileSync(p, content, 'utf8');
console.log('Fixed backend page');
