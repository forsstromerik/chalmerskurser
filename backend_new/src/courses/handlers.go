package courses

import (
	"fmt"
	"net/http"
)

/* POST or GET multiple courses */
func Courses(w http.ResponseWriter, req *http.Request) {
	switch req.Method {
	case "GET":
		fmt.Fprintln(w, "GET from /courses")
	case "POST":
		fmt.Fprintln(w, "POST from /courses")
	default:
		http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}
}

/* POST one course to db */
func Course(w http.ResponseWriter, req *http.Request) {
	if req.Method != "POST" {
		http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}
	fmt.Fprintln(w, "POST from /courses/course")
}

/* GET, PATCH or DELETE one course specified by ID */
func CourseID(w http.ResponseWriter, req *http.Request) {
	switch req.Method {
	case "GET":
		fmt.Fprintln(w, "GET from /courses/:courseID")
	case "PATCH":
		fmt.Fprintln(w, "PATCH from /courses/:courseID")
	case "DELETE":
		fmt.Fprintln(w, "DELETE from /courses/:courseID")
	default:
		http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}
}

/* POST course statistics */
func CourseStat(w http.ResponseWriter, req *http.Request) {
	if req.Method != "POST" {
		http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}
	fmt.Fprintln(w, "POST from from /courseStat")
}
