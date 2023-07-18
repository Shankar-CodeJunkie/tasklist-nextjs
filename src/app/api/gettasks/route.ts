import { NextResponse } from "next/server";

import { NextApiRequest, NextApiResponse } from 'next';

import { getTasks } from "../mongodb";


export async function GET(request: NextApiRequest, response: NextApiResponse) {
    // ...
    console.log('yes coming', request.url);
    let data = await getTasks()
    return NextResponse.json({ body: data});
}

//export default  handler;