import { Service, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Course, CourseDetail, PagedResponse } from "../models/course.model";

// @Service() means Angular creates one instance of this service
// and shares it across the entire app. This is similar to AddSingleton<T>() in .NET.
@Service()
export class CourseService {
    // inject(HttpClient) requests Angular's HTTP client
    private http = inject(HttpClient);
    private baseUrl = "https://localhost:5187/api/courses";

    getAll(page = 1, pageSize = 50) {
        return this.http
            .get<PagedResponse<Course>>(this.baseUrl, {
                params: {
                    page: page.toString(),
                    pageSize: pageSize.toString(),
                },
            })
            .pipe(map((p) => p.items));
    }

    getById(id: string) {
        return this.http.get<CourseDetail>(`${this.baseUrl}/${id}`);
    }
}