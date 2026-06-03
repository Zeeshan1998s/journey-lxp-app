'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Hardcoded userId for prototype since there's no auth
const DEMO_USER_ID = 'demo-user-1';

export async function getUser() {
  let user = await prisma.user.findUnique({
    where: { id: DEMO_USER_ID },
    include: { progress: true }
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        id: DEMO_USER_ID,
        xp: 0,
        streak: 0,
        longestStreak: 0,
      },
      include: { progress: true }
    });
  }

  return user;
}

export async function completeContent(contentId: string, type: string) {
  const user = await getUser();

  // Check if already completed
  const existing = await prisma.userProgress.findUnique({
    where: {
      userId_contentId: {
        userId: user.id,
        contentId: contentId
      }
    }
  });

  if (existing) {
    return { success: false, message: 'Already completed', xpEarned: 0 };
  }

  // Calculate XP
  let xpEarned = 10;
  if (type === 'QUIZ') xpEarned = 50;
  if (type === 'FLASHCARDS') xpEarned = 15;

  // Calculate Streak logic
  const now = new Date();
  let newStreak = user.streak;
  
  if (user.lastActiveDate) {
    const lastActive = new Date(user.lastActiveDate);
    const diffTime = Math.abs(now.getTime() - lastActive.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1; // reset streak if missed a day
    }
    // if diffDays === 0, streak remains the same (already active today)
  } else {
    newStreak = 1; // first time active
  }

  const longestStreak = Math.max(user.longestStreak, newStreak);

  // Use a transaction to ensure both records are created/updated atomically
  await prisma.$transaction([
    prisma.userProgress.create({
      data: {
        userId: user.id,
        contentId,
        type,
      }
    }),
    prisma.user.update({
      where: { id: user.id },
      data: {
        xp: { increment: xpEarned },
        streak: newStreak,
        longestStreak,
        lastActiveDate: now,
      }
    })
  ]);

  revalidatePath('/', 'layout'); // Refresh data everywhere

  return { success: true, xpEarned, newTotal: user.xp + xpEarned };
}
