package main

import (
	"courses"
	"fmt"
	"log"
	"net/http"
)

var port = "8080"

func main() {
	/* POST or GET multiple courses */
	http.HandleFunc("/courses", courses.Courses)

	/* POST one course to db */
	http.HandleFunc("/courses/course", courses.Course)

	/* GET, PATCH or DELETE one course specified by ID */
	http.HandleFunc("/courses/course/:courseID", courses.CourseID)

	/* POST course statistics */
	http.HandleFunc("/courseStat", courses.CourseStat)

	/* Server start listening */
	fmt.Println("Starting server. Listening on port", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
