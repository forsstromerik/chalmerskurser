package courses

import (
	"fmt"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

/* POST or GET multiple courses */
func GetCourses(w http.ResponseWriter, req *http.Request, _ httprouter.Params) {
	fmt.Fprintln(w, "GET from /courses")
}

func PostCourses(w http.ResponseWriter, req *http.Request, _ httprouter.Params) {
	fmt.Fprintln(w, "POST from /courses")
}

/* POST one course to db */
func PostCourse(w http.ResponseWriter, req *http.Request, _ httprouter.Params) {
	fmt.Fprintln(w, "POST from /courses/course")
}

/* GET, PATCH or DELETE one course specified by ID */
func GetOnCourseID(w http.ResponseWriter, req *http.Request, ps httprouter.Params) {
	fmt.Fprintln(w, "GET from /courses/:courseID")
}

func PatchOnCourseID(w http.ResponseWriter, req *http.Request, ps httprouter.Params) {
	fmt.Fprintln(w, "PATCH from /courses/:courseID")
}

func DeleteOnCourseID(w http.ResponseWriter, req *http.Request, ps httprouter.Params) {
	fmt.Fprintln(w, "DELETE from /courses/:courseID")
}

/* POST course statistics */
func PostCourseStat(w http.ResponseWriter, req *http.Request, _ httprouter.Params) {
	fmt.Fprintln(w, "POST from from /courseStat")
}
