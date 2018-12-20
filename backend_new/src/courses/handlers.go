package courses

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func sendResponse(w *http.ResponseWriter, res []byte) {
	(*w).Header().Set("Content-Type", "application/json; charset=utf-8")
	fmt.Fprint(*w, string(res))
}

func getCourseByCode(w http.ResponseWriter, code string) {
	course, err := CourseByCode(code)

	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError)+": "+err.Error(),
			http.StatusInternalServerError)
		return
	}

	crs, err := json.Marshal(course)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError)+": "+err.Error(),
			http.StatusInternalServerError)
		return
	}

	sendResponse(&w, crs)
}

func getCourseByID(w http.ResponseWriter, id string) {
	course, err := CourseByID(id)

	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError)+": "+err.Error(),
			http.StatusInternalServerError)
		return
	}

	crs, err := json.Marshal(course)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError)+": "+err.Error(),
			http.StatusInternalServerError)
		return
	}

	sendResponse(&w, crs)
}

func patchCourseByCode(code string, w http.ResponseWriter, req *http.Request) {
	course, err := PatchByCode(code, req)

	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError)+": "+err.Error(),
			http.StatusInternalServerError)
		return
	}

	crs, err := json.Marshal(course)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError)+": "+err.Error(),
			http.StatusInternalServerError)
		return
	}

	sendResponse(&w, crs)
}

func patchCourseByID(id string, w http.ResponseWriter, req *http.Request) {
	course, err := PatchByID(id, req)

	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError)+": "+err.Error(),
			http.StatusInternalServerError)
		return
	}

	crs, err := json.Marshal(course)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError)+": "+err.Error(),
			http.StatusInternalServerError)
		return
	}

	sendResponse(&w, crs)
}

func deleteCourseByCode(code string, w http.ResponseWriter, req *http.Request) {
	err := DeleteByCode(code, req)

	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError)+": "+err.Error(),
			http.StatusInternalServerError)
		return
	}

	fmt.Fprint(w, http.StatusNoContent)
}

func deleteCourseByID(id string, w http.ResponseWriter, req *http.Request) {
	err := DeleteByID(id, req)

	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError)+": "+err.Error(),
			http.StatusInternalServerError)
		return
	}

	fmt.Fprint(w, http.StatusNoContent)
}

func GetCourses(w http.ResponseWriter, req *http.Request, _ httprouter.Params) {
	courses, err := AllCourses()
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError)+": "+err.Error(),
			http.StatusInternalServerError)
		return
	}

	crss, err := json.Marshal(courses)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError)+": "+err.Error(),
			http.StatusInternalServerError)
		return
	}

	sendResponse(&w, crss)
}

func PostCourses(w http.ResponseWriter, req *http.Request, _ httprouter.Params) {
	fmt.Fprintln(w, "POST from /courses")
}

func PostCourse(w http.ResponseWriter, req *http.Request, _ httprouter.Params) {
	course, err := NewCourse(req)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError)+": "+err.Error(),
			http.StatusInternalServerError)
		return
	}

	crs, err := json.Marshal(course)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError)+": "+err.Error(),
			http.StatusInternalServerError)
		return
	}

	sendResponse(&w, crs)
}

func GetOnCourseID(w http.ResponseWriter, req *http.Request, ps httprouter.Params) {
	id := ps[0].Value
	switch len(id) {
	case 6:
		getCourseByCode(w, id)
	case 24:
		getCourseByID(w, id)
	default:
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
	}
}

func PatchOnCourseID(w http.ResponseWriter, req *http.Request, ps httprouter.Params) {
	id := ps[0].Value
	switch len(id) {
	case 6:
		patchCourseByCode(id, w, req)
	case 24:
		patchCourseByID(id, w, req)
	default:
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
	}
}

func DeleteOnCourseID(w http.ResponseWriter, req *http.Request, ps httprouter.Params) {
	id := ps[0].Value
	switch len(id) {
	case 6:
		deleteCourseByCode(id, w, req)
	case 24:
		deleteCourseByID(id, w, req)
	default:
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
	}
}

func PostCourseStat(w http.ResponseWriter, req *http.Request, _ httprouter.Params) {
	fmt.Fprintln(w, "POST from from /courseStat")
}
