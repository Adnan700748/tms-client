/**
 * List row from the TMS API — mirrors `CourseResponseDto`
 * returned by GET /api/courses.
 * ASP.NET Core serializes JSON as camelCase by default.
 */
export interface Course {
  id: number;
  code: string;
  title: string;
  maxCapacity: number;
  enrollmentCount: number;
}

/**
 * Generic paged response returned by the TMS API.
 */
export interface PagedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

/**
 * HATEOAS link returned from CourseDetailDto.
 */
export interface CourseLink {
  href: string;
  rel: string;
  method: string;
}

/**
 * Detailed course payload returned by
 * GET /api/courses/{id}.
 */
export interface CourseDetail extends Course {
  links: readonly CourseLink[];
}