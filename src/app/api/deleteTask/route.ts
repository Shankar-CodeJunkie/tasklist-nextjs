import { NextRequest, NextResponse } from "next/server";
import { deleteTask } from "../mongodb";


export async function DELETE(request:NextRequest, response:NextResponse) {
    const requestData = await request.json();

    const updateRequest = await deleteTask(requestData);
    return NextResponse.json({body:updateRequest})

}