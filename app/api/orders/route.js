import { collection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const order = await req.json();
    const timeStamp = Date.now();
    const random = Math.floor(1000 + Math.random() * 9000);
    const orderId = `ORD-${timeStamp}-${random}`;
    order.orderId = orderId;
    order.orderDate = new Date();

    const orderCollection = await collection("orders");
    const result = await orderCollection.insertOne(order);

    return NextResponse.json(
      {
        message: "অর্ডার সফলভাবে সাবমিট হয়েছে",
        orderId,
        insertedId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Order Insert Error", error);
    return NextResponse.json(
      { message: "অর্ডার সাবমিট করতে সমস্যা হয়েছে", error: error.message },
      { status: 500 }
    );
  }
}
