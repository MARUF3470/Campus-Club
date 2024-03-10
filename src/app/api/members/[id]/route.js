import { NextResponse } from "next/server";
import db from "../../../../lib/db";

export const DELETE = async (req, { params }) => {
    console.log(params?.id);
    await db.member.delete({
        where: {
            id: String(params?.id)
        }
    })
    return NextResponse.json({ status: 200, message: 'Deleted Succesfully' })
}
