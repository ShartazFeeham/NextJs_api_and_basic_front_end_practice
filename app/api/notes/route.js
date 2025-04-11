import pool from '@/app/libs/mysql'
import { NextResponse } from 'next/server'

export async function GET() {

    try {
        const db = await pool.getConnection();
        
        const query = `SELECT * FROM note`;
        const [rows] = await db.query(query);
        db.release();

        return NextResponse.json(rows);
    } 
    catch (error) {
        console.error('Error fetching notes:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request) {
    const { message } = await request.json(); 

    try {
        const db = await pool.getConnection();
        
        const query = `INSERT INTO note (message) VALUES (?)`;
        const values = [message];
        
        const [result] = await db.query(query, values);
        db.release();

        return NextResponse.json({ message: 'Note created successfully' });
    } 
    catch (error) {
        console.error('Error creating note:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}