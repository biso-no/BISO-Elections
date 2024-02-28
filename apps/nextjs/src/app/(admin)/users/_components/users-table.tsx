"use client";

import type { User } from "@supabase/supabase-js";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

interface UserTableProps {
  users: User[];
}

export function UsersTable({ users }: UserTableProps) {
  const toast = useToast();

  const { data: currentUser } = api.auth.me.useQuery();

  const { mutateAsync: changeRole } = api.admin.changeRole.useMutation({
    onSuccess: () => {
      toast.toast({
        title: "Role updated",
        description: "User role has been updated",
      });
    },
  });

  const onRoleChange = async (userId: string, role: string) => {
    await changeRole({ userId, role });
  };

  return (
    <>
      <Table className="border-collapse border border-gray-300">
        <TableHeader>
          <TableRow className="text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400">
            <TableHead className="p-2">Email</TableHead>
            <TableHead className="p-2 text-center">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <TableCell className="p-2">{user.email}</TableCell>
              <TableCell className="p-2">
                <Select
                  defaultValue={user.app_metadata?.roles?.[0] ?? "admin"}
                  onValueChange={(value) => onRoleChange(user.id, value)}
                  disabled={user.id === currentUser?.id}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        user.app_metadata?.roles?.[0] ?? "Select a role"
                      }
                    >
                      {user.app_metadata.roles?.[0] ?? "Select a role"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="election_participant">
                      Election Participant
                    </SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/*
      <div className="mt-4 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      */}
    </>
  );
}
