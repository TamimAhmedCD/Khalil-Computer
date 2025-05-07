'use client'

import AllCourse from "@/components/admin/course/all-course";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Edit, Eye, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const fetchCourses = async () => {
  const res = await axios.get('/api/admin/courses')
  return res.data
}

export default function ManageCourse() {

  const {
    data: courses,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  console.log(courses);

  // const [searchQuery, setSearchQuery] = useState("")
  // const { toast } = useToast()
  // const [courses, setCourses] = useState(mockCourses)
  // const [courseToDelete, setCourseToDelete] = useState(null)

  // const filteredCourses = courses.filter(
  //   (course) =>
  //     course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     course.description.toLowerCase().includes(searchQuery.toLowerCase()),
  // )

  const handleDeleteCourse = async (id) => {
    try {
      // Backend API call
      await axios.delete(`/api/admin/courses/${id}`);

      toast.success("কোর্স মুছে ফেলা হয়েছে", {
        description: "কোর্সটি সফলভাবে মুছে ফেলা হয়েছে।",
      });

      // Refetch courses after deleting
      refetch(); // This will trigger the refetch of the courses

    } catch (error) {
      console.error("কোর্স মুছতে সমস্যা হয়েছে:", error);

      toast.error("ভুল হয়েছে", {
        description: "কোর্সটি মুছতে ব্যর্থ হয়েছে। পরে আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="m-6 md:m-8">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl">কোর্স ব্যবস্থাপনা</CardTitle>
            <CardDescription>সকল কোর্স দেখুন, সম্পাদনা করুন এবং নতুন কোর্স যোগ করুন</CardDescription>
          </div>
          <Button asChild className="bg-primary-600 hover:bg-primary-700">
            <Link href="/admin/add-course">
              <Plus className="h-4 w-4 mr-2" />
              নতুন কোর্স যোগ করুন
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="কোর্স খুঁজুন..."
                className="pl-10"
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">কোর্সের নাম</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">মূল্য</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">স্ট্যাটাস</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {isError ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                        কোন কোর্স পাওয়া যায়নি
                      </td>
                    </tr>
                  ) : (
                    courses?.map((course) => (
                      <AllCourse course={course} handleDeleteCourse={handleDeleteCourse} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
