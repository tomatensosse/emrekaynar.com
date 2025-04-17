import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import Header from '@/components/Header';

const SECTIONS = ['music', 'software', 'other'];

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (session?.user?.autoRedirect) {
        redirect(session.user.autoRedirect);
    }

    const contentData = {
        music: {
            albums: await prisma.album.findMany({
                orderBy: { createdAt: 'desc' },
            }),
            singles: await prisma.single.findMany({
                orderBy: { createdAt: 'desc' },
            })
        },
        software: {
            // This would be replaced with actual fetches when we have software models
            projects: []
        },
        other: {
            // This would be replaced with actual fetches when we have other content models
            items: []
        }
    };

    return (
        <div className="min-h-screen">
            <Header 
            username={session?.user?.username || null} 
            isLoggedIn={!!session}
            />
      </div>  
    );
}