import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function AllCourse({ course, handleDeleteCourse }) {
    return (
        <tr key={course._id} className="border-t">
            <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                    {/* <div
                        className="h-10 w-10 rounded-md bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${course.})` }}
                    /> */}
                    <Image src={course.courseThumbnail} width={60} height={60} className="rounded-md" />
                    <div>
                        <div className="font-medium">{course.title}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[250px]">
                            {course.description}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-4 py-3">
                {course.discount ? (
                    <div>
                        <span className="font-medium">
                            ৳{(course.price - (course.price * course.discount) / 100).toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground line-through ml-2">
                            ৳{course.price.toLocaleString()}
                        </span>
                        <span className="ml-2 text-sm text-green-600 font-medium">
                            {course.discount}%
                        </span>
                    </div>
                ) : (
                    <span className="font-medium">৳{course.price.toLocaleString()}</span>
                )}

            </td>
            <td className="px-4 py-3">
                <Badge
                    variant={course.published ? "default" : "secondary"}
                    className={course.published ? "bg-green-100 text-green-700" : ""}
                >
                    {course.published ? "প্রকাশিত" : "ড্রাফট"}
                </Badge>
            </td>
            <td className="px-4 py-3 text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">মেনু</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link href={`/courses/${course._id}`} className="flex items-center">
                                <Eye className="mr-2 h-4 w-4" />
                                <span>দেখুন</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/manage-course/edit/${course._id}`} className="flex items-center">
                                <Edit className="mr-2 h-4 w-4" />
                                <span>সম্পাদনা করুন</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeleteCourse(course._id)}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>মুছুন</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </td>
        </tr>
    )
}
