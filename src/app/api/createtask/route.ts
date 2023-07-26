import { NextRequest, NextResponse } from "next/server";
import { addTask } from "../mongodb";


export async function POST(request:Request, response:NextResponse) {

    const data = await request.json();
    
    const sendRequest = await addTask(data);
    return NextResponse.json({body:sendRequest})
}