//import { NextResponse } from "next/server";

import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from "next/server";
import { revalidateTag } from 'next/cache';

import { getTasks } from "../mongodb";


export async function GET(request: NextRequest, response: NextResponse) {
    // ...
    let data = await getTasks();
    revalidateTag('blog');
    return NextResponse.json({revalidated: true, body: data});
}

//export default  handler;