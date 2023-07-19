import { NextRequest, NextResponse } from "next/server";
import { addTask } from "../mongodb";


export async function POST(request:Request, response:NextResponse) {

    console.log('server add task', request.body)
    const data = await request.json();
    console.log('server add task', data);

    const sendRequest = await addTask(data);
    console.log('server response', sendRequest);
    return NextResponse.json({body:sendRequest})
}