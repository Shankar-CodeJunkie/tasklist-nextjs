//import { NextResponse } from "next/server";

import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from "next/server";

import { getTasks } from "../mongodb";


export async function GET(request: NextRequest, response: NextResponse) {
    // ...
    let data = await getTasks()
    return NextResponse.json({ body: data});
}

//export default  handler;