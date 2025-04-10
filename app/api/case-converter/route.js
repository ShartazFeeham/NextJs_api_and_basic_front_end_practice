import { NextResponse } from 'next/server'

export async function GET() {

  const results = {
    message: 'PLEASE PROVIDE A TEXT IN THE QUERY STRING',
  }

  return NextResponse.json(results)
}