import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    const { slug } = await params; 
    const { searchParams } = new URL(request.url);
    const toCase = searchParams.get('toCase');
    
    let processedText = toCase == 'lower' ? slug.toLowerCase() : toCase == 'upper' ? slug.toUpperCase() : slug;

    const results = {
        original: slug,
        inUpperCase: processedText
    };

    return NextResponse.json(results);
}