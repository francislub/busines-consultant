"use server";

import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";

import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  messaging,
} from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";

import { Appointment } from "@/types/appwrite.types";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    revalidatePath("/admin");
    return parseStringify(newAppointment);
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
  }
};
export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, [
      Query.orderDesc("$createdAt"),
    ])

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
      completedCount: 0,
    }

    const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
      switch (appointment.status) {
        case "scheduled":
          acc.scheduledCount++
          break
        case "pending":
          acc.pendingCount++
          break
        case "cancelled":
          acc.cancelledCount++
          break
        case "completed":
          acc.completedCount++
          break
      }
      return acc
    }, initialCounts)

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    }

    return parseStringify(data)
  } catch (error) {
    console.error("An error occurred while retrieving the recent appointments:", error)
  }
}

//  SEND SMS NOTIFICATION
export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );
    return parseStringify(message);
  } catch (error) {
    console.error("An error occurred while sending sms:", error);
  }
};

export const sendEmailNotifircation = async (
  userId: string,
  content: string,
  subject: string
) => {
  try {
    const message = await messaging.createEmail(
      ID.unique(),
      subject,
      content,
      ["appointment_updates"],
      [userId],
      [],
      [],
      [],
      [],
      false,
      true
    );
    return parseStringify(message);
  } catch (error) {
    console.error("An error occurred while sending email:", error);
  }
};

//  UPDATE APPOINTMENT
export const updateAppointment = async ({ appointmentId, userId, appointment, type }: UpdateAppointmentParams) => {
  try {
    // Create a new object with only the fields Appwrite expects
    const updatedFields = {
      status: appointment.status,
      schedule: appointment.schedule,
      primaryPhysician: appointment.primaryPhysician,
      cancellationReason: appointment.cancellationReason,
      // Add any other fields that are part of your Appwrite collection schema
    }

    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      updatedFields,
    )

    if (!updatedAppointment) throw new Error("Failed to update appointment")

    const smsMessage = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>M-Dental Clinic</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
            line-height: 1.6;
            color: #333;
          }

          .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }

          .email-header {
            background-color: #0066cc;
            color: #fff;
            padding: 15px;
            text-align: center;
            font-size: 20px;
          }

          .email-body {
            padding: 20px;
            text-align: center;
          }

          .email-body h2 {
            color: #444;
            margin-bottom: 15px;
            font-size: 22px;
          }

          .email-body p {
            margin: 10px 0;
            font-size: 16px;
            color: #555;
          }

          .email-body p strong {
            color: #333;
          }

          .email-body a {
            color: #0066cc;
            text-decoration: none;
          }

          .email-body a:hover {
            text-decoration: underline;
          }

          .email-footer {
            background-color: #f1f1f1;
            padding: 15px;
            text-align: center;
            font-size: 14px;
            color: #777;
          }

          .email-footer a {
            color: #0066cc;
            text-decoration: none;
          }

          .email-footer a:hover {
            text-decoration: underline;
          }

          .highlight {
            background-color: #eef;
            padding: 5px;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            Greetings from M-Dental Clinic
          </div>
          <div class="email-body">
            <h2>Hello,</h2>
            <p>
              ${
                type === "schedule"
                  ? `We are pleased to inform you that your appointment is confirmed for <span class="highlight"><strong>${formatDateTime(appointment.schedule!).dateTime}</strong></span> with Dr. <strong>${appointment.primaryPhysician}</strong>.`
                  : type === "cancel"
                    ? `We regret to inform you that your appointment for <span class="highlight"><strong>${formatDateTime(appointment.schedule!).dateTime}</strong></span> has been cancelled.`
                    : `We are pleased to inform you that your appointment on <span class="highlight"><strong>${formatDateTime(appointment.schedule!).dateTime}</strong></span> with Dr. <strong>${appointment.primaryPhysician}</strong> has been completed.`
              }
            </p>
            ${
              type === "cancel"
                ? `<p><strong>Reason for cancellation:</strong> <span class="highlight">${appointment.cancellationReason}</span></p>`
                : ""
            }
            <p>
              Thank you for choosing M-Dental Clinic. If you have any questions or need further assistance, please don't hesitate to contact us.
            </p>
            <p style="margin-top: 20px;">
              Best regards,<br />
              <strong>M-Dental Clinic Team</strong><br />
              <a href="https://mdentalclinic.com">www.mdentalclinic.com</a>
            </p>
          </div>
          <div class="email-footer">
            &copy; ${new Date().getFullYear()} M-Dental Clinic. All rights reserved. <br />
            <a href="https://mdentalclinic.com">Visit our website</a>
          </div>
        </div>
      </body>
      </html>

    `

    await sendSMSNotification(userId, smsMessage)
    await sendEmailNotifircation(
      userId,
      smsMessage,
      type === "schedule"
        ? "Appointment Confirmation"
        : type === "cancel"
          ? "Appointment Cancellation"
          : "Appointment Completed",
    )

    revalidatePath("/admin")
    return parseStringify(updatedAppointment)
  } catch (error) {
    console.error("An error occurred while updating an appointment:", error)
    throw error
  }
}

// GET APPOINTMENT
export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the existing patient:",
      error
    );
  }
};
