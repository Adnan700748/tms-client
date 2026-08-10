/**
 * Represents a student's enrollment in a course.
 * Mirrors the Enrollment DTO returned by the TMS API.
 */
export interface Enrollment {
  id: string;
  studentId: number;
  studentName: string;
  courseId: number;
  courseName: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  enrolledAt: string;
}