"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import AdminCardHeader from "@/components/Shared/AdminCardHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Edit, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

const fetchCategories = async () => {
  const res = await axios.get("/api/admin/blog-categories");
  return res.data;
};

export default function ManageBlogCategories() {
  const queryClient = useQueryClient();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active",
  });

  const { data: categoriesData, isLoading, isError } = useQuery({
    queryKey: ["blog-categories"],
    queryFn: fetchCategories,
  });

  const categories = categoriesData?.categories || [];

  const createMutation = useMutation({
    mutationFn: (data) => axios.post("/api/admin/blog-categories", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["blog-categories"]);
      toast.success("ক্যাটাগরি যুক্ত হয়েছে");
      setAddDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error("ক্যাটাগরি যুক্ত করতে ব্যর্থ", {
        description: error.response?.data?.error || "কিছু একটা ভুল হয়েছে",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data) => axios.post("/api/admin/blog-categories", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["blog-categories"]);
      toast.success("ক্যাটাগরি আপডেট হয়েছে");
      setEditDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error("ক্যাটাগরি আপডেট করতে ব্যর্থ", {
        description: error.response?.data?.error || "কিছু একটা ভুল হয়েছে",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`/api/admin/blog-categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["blog-categories"]);
      toast.success("ক্যাটাগরি ডিলিট হয়েছে");
      setDeleteDialogOpen(false);
      setSelectedCategory(null);
    },
    onError: (error) => {
      toast.error("ক্যাটাগরি ডিলিট করতে ব্যর্থ", {
        description: error.response?.data?.error || "এই ক্যাটাগরিতে ব্লগ থাকতে পারে",
      });
    },
  });

  const resetForm = () => {
    setFormData({ name: "", description: "", status: "active" });
    setSelectedCategory(null);
  };

  const openAddDialog = () => {
    resetForm();
    setAddDialogOpen(true);
  };

  const openEditDialog = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
      status: category.status,
    });
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (category) => {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  };

  const handleCreate = () => {
    if (!formData.name.trim()) {
      toast.error("ক্যাটাগরির নাম প্রয়োজন");
      return;
    }
    createMutation.mutate(formData);
  };

  const handleUpdate = () => {
    if (!formData.name.trim()) {
      toast.error("ক্যাটাগরির নাম প্রয়োজন");
      return;
    }
    updateMutation.mutate({ ...formData, _id: selectedCategory._id });
  };

  const handleDelete = () => {
    if (selectedCategory) {
      deleteMutation.mutate(selectedCategory._id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p>ক্যাটাগরি লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="m-6 md:m-8">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <AdminCardHeader
            title="ব্লগ ক্যাটাগরি"
            description="ব্লগের ক্যাটাগরি তৈরি এবং পরিচালনা করুন"
          />
          <Button onClick={openAddDialog} className="bg-primary-600 hover:bg-primary-700">
            <Plus className="h-4 w-4 mr-2" />
            নতুন ক্যাটাগরি
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
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">বিবরণ</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">স্ট্যাটাস</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {isError ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                        ক্যাটাগরি লোড করতে ব্যর্থ
                      </td>
                    </tr>
                  ) : categories.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                        কোনো ক্যাটাগরি পাওয়া যায়নি
                      </td>
                    </tr>
                  ) : (
                    categories.map((category) => (
                      <tr key={category._id} className="border-b border-gray-100 hover:bg-gray-50/50">
                        <td className="px-4 py-4 font-medium">{category.name}</td>
                        <td className="px-4 py-4 text-sm text-gray-600 font-mono">{category.slug}</td>
                        <td className="px-4 py-4 text-sm text-gray-600 max-w-xs truncate">
                          {category.description || "—"}
                        </td>
                        <td className="px-4 py-4">
                          <Badge
                            className={
                              category.status === "active"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                            }
                          >
                            {category.status === "active" ? "সক্রিয়" : "নিষ্ক্রিয়"}
                          </Badge>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(category)}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openDeleteDialog(category)}
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

      {/* Add Category Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>নতুন ক্যাটাগরি যুক্ত করুন</DialogTitle>
            <DialogDescription>
              একটি নতুন ব্লগ ক্যাটাগরি তৈরি করুন
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">নাম *</label>
              <Input
                placeholder="ক্যাটাগরির নাম"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">বিবরণ</label>
              <Textarea
                placeholder="ক্যাটাগরির সংক্ষিপ্ত বিবরণ"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">স্ট্যাটাস</label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="active">সক্রিয়</option>
                <option value="inactive">নিষ্ক্রিয়</option>
              </select>
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

      {/* Edit Category Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ক্যাটাগরি সম্পাদনা করুন</DialogTitle>
            <DialogDescription>
              ক্যাটাগরির তথ্য আপডেট করুন
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">নাম *</label>
              <Input
                placeholder="ক্যাটাগরির নাম"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">বিবরণ</label>
              <Textarea
                placeholder="ক্যাটাগরির সংক্ষিপ্ত বিবরণ"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">স্ট্যাটাস</label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="active">সক্রিয়</option>
                <option value="inactive">নিষ্ক্রিয়</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              বাতিল
            </Button>
            <Button onClick={handleUpdate} disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ক্যাটাগরি ডিলিট করবেন?</DialogTitle>
            <DialogDescription>
              আপনি কি নিশ্চিত যে <strong>"{selectedCategory?.name}"</strong> ডিলিট করতে চান? এই ক্যাটাগরিতে ব্লগ থাকলে ডিলিট করা যাবে না।
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
