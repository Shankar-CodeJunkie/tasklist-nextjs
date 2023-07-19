import { NextRequest, NextResponse } from "next/server";
import { updateTask } from "../mongodb";

export async function PUT (request:NextRequest, response:NextResponse) {
    console.log('cominghere', 'put')

    const requestData = await request.json();

    const updateRequest = await updateTask(requestData);
    console.log('updateRequest-response', updateRequest );
    return NextResponse.json({body:updateRequest})

}