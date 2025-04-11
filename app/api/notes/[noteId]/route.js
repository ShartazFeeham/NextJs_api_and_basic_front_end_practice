import pool from '@/app/libs/mysql'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    const { noteId } = await params; 

    try {
        const db = await pool.getConnection();
        
        const query = `SELECT * FROM note WHERE id = ?`;
        const values = [noteId];
        
        const [rows] = await db.query(query, values);
        db.release();

        return NextResponse.json(rows);
    } 
    catch (error) {
        console.error('Error fetching notes:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const { noteId } = await params; 

    try {
        const db = await pool.getConnection();
        
        const query = `DELETE FROM note WHERE id = ?`;
        const values = [noteId];
        
        const [result] = await db.query(query, values);
        db.release();

        return NextResponse.json({ message: 'Note deleted successfully' });
    } 
    catch (error) {
        console.error('Error deleting note:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}