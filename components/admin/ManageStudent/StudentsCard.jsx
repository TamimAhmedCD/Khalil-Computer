import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { GraduationCap, Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

export default function StudentsCard({ student }) {
    return (
        <Card>
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12 border-2 border-blue-100">
                            <AvatarImage
                                src={student.studentImage || "/placeholder.svg"}
                                alt={student.studentName}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-semibold">
                                {student.studentName}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-semibold text-gray-900 text-lg">
                                {student.studentName}
                            </h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                <GraduationCap className="w-4 h-4 mr-2" />
                                {student.course}
                            </div>
                            <Badge
                                variant="outline"
                                className={`font-xs text-xs px-2 py-1 mt-1 ${student.outstandingAmount == 0
                                    ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                    : 'bg-orange-100 text-orange-800 border-orange-200'
                                    }`}
                            >
                                {student.outstandingAmount == 0 ? 'Status: Paid' : 'Status: Unpaid'}
                            </Badge>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="truncate">{student ? student.email : "example.com"}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2 text-green-500" />
                        <span>{student.studentMobile}</span>
                    </div>
                    <div className="flex items-start text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                        <span className="line-clamp-2">{student.currentAddress}</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500 space-y-1">
                        <div>
                            <span className="font-medium">Father:</span>{" "}
                            {student.fatherName}
                        </div>
                        <div>
                            <span className="font-medium">Batch:</span>{" "}
                            {student.batchNumber}
                        </div>
                        <div>
                            <span className="font-medium">Student ID:</span>{" "}
                            {student.idNumber}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
