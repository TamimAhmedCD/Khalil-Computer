import { collection } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const notice = await req.json();
        const result = await (await collection('notices')).insertOne(notice);
        return NextResponse.json({ message: 'Notice added', result });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to add notice" }, { status: 500 });
    }
}