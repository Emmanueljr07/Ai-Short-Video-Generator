import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

export const CustomLoading = ({ loading }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-white">
        <div className="bg-white flex flex-col justify-center items-center my-10">
          <Image
            src={"/truckloading.gif"}
            alt="Loading"
            width={100}
            height={100}
            // unoptimized={true}
          />
          <h2>Generating your video...Do not refresh</h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
