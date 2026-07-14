import Bill from "../models/Bill.js";
import Expense from "../models/Expense.js";
import { createNotification } from "./notification.service.js";

export async function createBill(
  data: any,
  userId: string,
) {
  return Bill.create({
    ...data,
    user: userId,
  });
}

export async function getBills(
  userId: string,
) {
  return Bill.find({
    user: userId,
  }).sort({
    dueDate: 1,
  });
}

export async function updateBill(
  id: string,
  data: any,
  userId: string,
) {
  return Bill.findOneAndUpdate(
    {
      _id: id,
      user: userId,
    },
    data,
    {
      new: true,
    },
  );
}

export async function deleteBill(
  id: string,
  userId: string,
) {
  return Bill.findOneAndDelete({
    _id: id,
    user: userId,
  });
}

export async function payBill(
  billId: string,
  userId: string,
) {
  const bill = await Bill.findOne({
    _id: billId,
    user: userId,
  });

  if (!bill) {
    throw new Error("Bill not found.");
  }

  if (bill.status === "Paid") {
    throw new Error("Bill already paid.");
  }

  bill.status = "Paid";
  bill.paidAt = new Date();

  await bill.save();

  await createNotification(
  {
    title: "Bill Paid",

    message: `${bill.title} bill paid successfully.`,

    type: "Bill",

    priority: "Medium",

    actionUrl: "/bills",
  },

  userId,
);

  if (bill.autoCreateExpense) {
    await Expense.create({
      title: bill.title,

      amount: bill.amount,

      category: bill.category,

      type: "Expense",

      date: new Date(),

      notes: `Auto-created from Bill: ${bill.title}`,

      user: userId,
    });
  }

  return bill;
}