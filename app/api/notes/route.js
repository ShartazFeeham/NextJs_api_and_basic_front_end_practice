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