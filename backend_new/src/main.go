package main

import (
	"courses"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/julienschmidt/httprouter"
)

var port string
var portTLS string

func init() {
	if os.Getenv("DEVPROD") == "prod" {
		port = "80"
		portTLS = "443"
	} else {
		port = "3000"
		portTLS = "3001"
	}
}

func main() {
	router := httprouter.New()
	router.OPTIONS("/courses/coursestat", handleOptions)
	/* GET */
	/* All courses or single course by ID */
	router.GET("/courses", courses.GetCourses)
	router.GET("/courses/:courseID", courses.GetOnCourseID)

	/* POST */
	/* Course or course statistics */
	router.POST("/courses/course", courses.PostCourse)
	router.POST("/courses/coursestat", courses.PostCourseStat)

	/* PATCH */
	/* Update fields for course by ID */
	router.PATCH("/courses/:courseID", courses.PatchOnCourseID)

	/* DELETE */
	/* Delete course by ID */
	router.DELETE("/courses/:courseID", courses.DeleteOnCourseID)

	/* Use HTTPS on prod */
	if os.Getenv("DEVPROD") == "prod" {
		go func() {
			fmt.Println("Listening on port", portTLS)
			log.Fatal(http.ListenAndServeTLS(":"+portTLS, "/etc/letsencrypt/live/chalmerskurser.se/cert.pem", "/etc/letsencrypt/live/chalmerskurser.se/privkey.pem", router))
		}()
	}

	/* Server start listening */
	fmt.Println("Starting server.")
	fmt.Println("Listening on port", port)
	log.Fatal(http.ListenAndServe(":"+port, router))

}

func handleOptions(w http.ResponseWriter, req *http.Request, _ httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Allow", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}
