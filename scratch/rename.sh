#!/bin/bash
find app -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" \) -print0 | while IFS= read -r -d '' file; do
    sed -i '' 's/Courses/Journeys/g' "$file"
    sed -i '' 's/courses/journeys/g' "$file"
    sed -i '' 's/Course/Journey/g' "$file"
    sed -i '' 's/course/journey/g' "$file"
    sed -i '' 's/COURSES/JOURNEYS/g' "$file"
    sed -i '' 's/COURSE/JOURNEY/g' "$file"
done

# Rename the directory
mv app/courses app/journeys

# Rename the component file
mv app/components/profile/CourseCard.tsx app/components/profile/JourneyCard.tsx

# Also, since we replaced course -> journey, in app/profile/page.tsx, the import would now say:
# import JourneyCard from '../components/profile/JourneyCard'; 
# Let's ensure the casing is perfectly aligned.

echo "Done replacing."
