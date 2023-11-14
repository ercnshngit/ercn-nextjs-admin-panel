import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTableItem } from "@/services/panel";
import { DELETE_TABLE_ITEM, UPDATE_TABLE_ITEM } from "@/types/panel";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BsFillTrashFill } from "react-icons/bs";

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
import { translate } from "@/langs";
import { getDatabaseTable } from "@/config/general";
export default function DeleteItem({ open, setOpen, tableName, id }: any) {
  const table = getDatabaseTable(tableName);
  const router = useRouter();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    (deleteData: DELETE_TABLE_ITEM) =>
      table?.functions?.delete
        ? table?.functions?.delete({ id: deleteData.id })
        : deleteTableItem(deleteData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([tableName]);
        console.log("deleteMutation");
        router.push("/admin/" + tableName);
        router.refresh();
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleDelete = (id: number, tableName: string) => {
    deleteMutation.mutate({
      id: id,
      tableName: tableName,
    });
  };
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {translate("MENU_DELETE_ALERT_TITLE")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {translate("MENU_DELETE_ALERT_DESCRIPTION")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {translate("MENU_DELETE_ALERT_CANCEL")}
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                setOpen(false);
                handleDelete(Number(id), tableName);
              }}
            >
              {translate("MENU_DELETE_ALERT_CONFIRMATION")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
