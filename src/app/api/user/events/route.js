import { NextResponse } from "next/server";
import { join } from "path";
import { writeFile } from "fs/promises";
import db from "../../../../lib/db";
export const POST = async (req) => {
    const data = await req.formData()
    const title = await data.get('title')
    const description = await data.get('description')
    const location = await data.get('location')
    const date = await data.get('date')
    const image = await data.get('image')
    try {
        const buffer = Buffer.from(await image.arrayBuffer());
        const uploadDir = join(process.cwd(), "public", "/uploads");
        const uniqueName = Date.now() + "_";
        const imgExt = image?.name.split(".");
        const filename = uniqueName + "." + imgExt?.[1];
        await writeFile(`${uploadDir}/${filename}`, buffer);
        const newEvent = await db.event.create({
            data: {
                title,
                description,
                location,
                image: filename,
                date
            }
        })
        return NextResponse.json({ event: newEvent, message: 'new event created successfully' }, { status: 201 })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Something went wrong.Please try again later.",
        });
    }
}

export const GET = async () => {
    try {
        const events = await db.event.findMany({
            orderBy: {
                date: 'desc',
            }
        })
        return NextResponse.json({
            status: 200,
            data: events,
        });
    } catch (error) {
        return NextResponse.json(
            { status: 400, errors: error.messages }
        );
    }
}

