package main

import (
	"courses"
	"fmt"
	"log"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

var port = "8080"

func main() {
	router := httprouter.New()

	/* GET */
	/* All courses or single course by ID */
	router.GET("/courses", courses.GetCourses)
	router.GET("/courses/course/:courseID", courses.GetOnCourseID)

	/* POST */
	/* Multiple courses, single course, or stats for single course */
	router.POST("/courses", courses.PostCourses)
	router.POST("/courses/course", courses.PostCourse)
	router.POST("/courseStat", courses.PostCourseStat)

	/* PATCH */
	/* Update fields for course by ID */
	router.PATCH("/courses/course/:courseID", courses.PatchOnCourseID)

	/* DELETE */
	/* Delete course by ID */
	router.DELETE("/courses/course/:courseID", courses.DeleteOnCourseID)

	/* Server start listening */
	fmt.Println("Starting server. Listening on port", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
