"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateAppointment } from "@/lib/actions/appointment.actions";
import type { Appointment } from "@/types/appwrite.types";

type CompleteAppointmentModalProps = {
  patientId: string;
  userId: string;
  appointment: Appointment;
  title: string;
  description: string;
};

export const CompleteAppointmentModal = ({
  patientId,
  userId,
  appointment,
  title,
  description,
}: CompleteAppointmentModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      await updateAppointment({
        appointmentId: appointment.$id,
        userId,
        appointment: { ...appointment, status: "completed" },
        type: "complete",
      });
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error completing appointment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="shad-button_ghost"
          disabled={appointment.status === "completed"}
        >
          Complete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            className="shad-button_primary"
            onClick={handleComplete}
            disabled={isLoading}
          >
            {isLoading ? "Completing..." : "Complete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
