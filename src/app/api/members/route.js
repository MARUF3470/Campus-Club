import db from "@/lib/db"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        const body = await req.json()
        const { fname, lname, email, id, major, memberType, tShirt, collegeYear, paymentData } = body
        const existingMemberById = await db.member.findUnique({
            where: { id: id }
        })
        if (existingMemberById) {
            return NextResponse.json({ message: 'This user id is already exist' }, { status: 409 })
        }
        const newMember = await db.member.create({
            data: {
                fName: fname, lName: lname, email, id, major, membershipType: memberType, shirtSize: tShirt, collegeYear
            }
        })
        await db.payment.create({
            data: {
                member_id: id,
                tShirtFee: paymentData.tShirt,
                membershipFee: paymentData.membershipFee
            }
        })
        return NextResponse.json({ member: newMember, message: 'New member registration request submitted successfully' })

    } catch (error) {
        console.log('error', error);
        return NextResponse.json({ message: "Something Happend please try again later", error }, { status: 500 })
    }
}

export const GET = async () => {
    try {
        const members = await db.member.findMany({
            include: {
                Payment: {
                    select: {
                        id: true,
                        tShirtFee: true,
                        membershipFee: true
                    },
                }
            }
        })
        return NextResponse.json({
            status: 200,
            data: members,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { status: 400 }
        );
    }
}