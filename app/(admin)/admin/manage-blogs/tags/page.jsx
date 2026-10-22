"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import AdminCardHeader from "@/components/Shared/AdminCardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trash2, Plus, Hash } from "lucide-react";
import { toast } from "sonner";

const fetchTags = async () => {
  const res = await axios.get("/api/admin/blog-tags");
  return res.data;
};

export default function ManageBlogTags() {
  const queryClient = useQueryClient();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [tagName, setTagName] = useState("");

  const { data: tagsData, isLoading, isError } = useQuery({
    queryKey: ["blog-tags"],
    queryFn: fetchTags,
  });

  const tags = tagsData?.tags || [];

  const createMutation = useMutation({
    mutationFn: (data) => axios.post("/api/admin/blog-tags", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["blog-tags"]);
      toast.success("ট্যাগ যুক্ত হয়েছে");
      setAddDialogOpen(false);
      setTagName("");
    },
    onError: (error) => {
      toast.error("ট্যাগ যুক্ত করতে ব্যর্থ", {
        description: error.response?.data?.error || "কিছু একটা ভুল হয়েছে",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`/api/admin/blog-tags/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["blog-tags"]);
      toast.success("ট্যাগ ডিলিট হয়েছে");
      setDeleteDialogOpen(false);
      setSelectedTag(null);
    },
    onError: (error) => {
      toast.error("ট্যাগ ডিলিট করতে ব্যর্থ", {
        description: error.response?.data?.error || "কিছু একটা ভুল হয়েছে",
      });
    },
  });

  const openAddDialog = () => {
    setTagName("");
    setAddDialogOpen(true);
  };

  const openDeleteDialog = (tag) => {
    setSelectedTag(tag);
    setDeleteDialogOpen(true);
  };

  const handleCreate = () => {
    if (!tagName.trim()) {
      toast.error("ট্যাগের নাম প্রয়োজন");
      return;
    }
    createMutation.mutate({ name: tagName });
  };

  const handleDelete = () => {
    if (selectedTag) {
      deleteMutation.mutate(selectedTag._id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p>ট্যাগ লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="m-6 md:m-8">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <AdminCardHeader
            title="ব্লগ ট্যাগ"
            description="ব্লগের ট্যাগ তৈরি এবং পরিচালনা করুন"
          />
          <Button onClick={openAddDialog} className="bg-primary-600 hover:bg-primary-700">
            <Plus className="h-4 w-4 mr-2" />
            নতুন ট্যাগ
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">নাম</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">স্লাগ</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">তৈরির তারিখ</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {isError ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                        ট্যাগ লোড করতে ব্যর্থ
                      </td>
                    </tr>
                  ) : tags.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                        কোনো ট্যাগ পাওয়া যায়নি
                      </td>
                    </tr>
                  ) : (
                    tags.map((tag) => (
                      <tr key={tag._id} className="border-b border-gray-100 hover:bg-gray-50/50">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <Hash className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{tag.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600 font-mono">{tag.slug}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">
                          {tag.createdAt
                            ? new Date(tag.createdAt).toLocaleDateString("bn-BD", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "—"}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openDeleteDialog(tag)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Tag Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>নতুন ট্যাগ যুক্ত করুন</DialogTitle>
            <DialogDescription>
              একটি নতুন ব্লগ ট্যাগ তৈরি করুন
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">ট্যাগ নাম *</label>
              <Input
                placeholder="ট্যাগের নাম"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCreate();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              বাতিল
            </Button>
            <Button onClick={handleCreate} disabled={createMutation.isPending}>
              {createMutation.isPending ? "যুক্ত হচ্ছে..." : "যুক্ত করুন"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ট্যাগ ডিলিট করবেন?</DialogTitle>
            <DialogDescription>
              আপনি কি নিশ্চিত যে <strong>"#{selectedTag?.name}"</strong> ট্যাগ ডিলিট করতে চান? এটি সকল ব্লগ থেকে সরিয়ে ফেলা হবে।
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              বাতিল
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? "ডিলিট হচ্ছে..." : "ডিলিট করুন"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
