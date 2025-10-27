import { NextResponse } from "next/server";


export function responseSuccess(message: string, data: object) {
    return NextResponse.json({
        message: message || "Successfully Done.",
        data: data,
        success: true,
        error: 0,
    });
}

export function responseFailure(message: string, data:object={}, errorCode: number = 400) {
    return NextResponse.json({
        message: message || "Something Went Wrong.",
        data: data,
        success: false,
        error: errorCode,
    });
}
