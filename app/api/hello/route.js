import { NextResponse } from 'next/server'

export async function GET() {

  const results = {
    message: 'Hello World!',
  }

  return NextResponse.json(results)
}