import { join } from "path";
import { rmSync } from "fs";

import { NextResponse } from "next/server";
import db from "../../../../../lib/db";

export const DELETE = async (req, { params }) => {
    const findEvent = await db.event.findUnique({
        where: {
            id: Number(params?.id),
        }
    })

    if (!findEvent) {
        return NextResponse.json({ status: 400, message: 'Bad Request' })
    }
    if (findEvent?.image?.length) {
        const dir = join(process.cwd(), "public", "/uploads");
        const path = dir + "/" + findEvent?.image
        rmSync(path, { force: true })
    }
    await db.event.delete({
        where: {
            id: Number(params?.id)
        }
    })
    return NextResponse.json({ status: 200, message: 'Deleted Succesfully' })
}

export const PUT = async (req, { params }) => {
    try {
        const { title, description, location, newDate } = await req.json()
        console.log(title, description, location, newDate, '________________________>');

        await db.event.update({
            where: {
                id: Number(params?.id)
            },
            data: {
                title,
                description,
                location,
                date: newDate
            }
        })
        return NextResponse.json({ message: 'Event Updated', status: 200 })

    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong', status: 500 })
    }
}