package courses

import (
	"config"
	"encoding/json"
	"net/http"

	"github.com/globalsign/mgo/bson"
)

type Course struct {
	ID              bson.ObjectId `json:"_id" bson:"_id"`
	Code            string        `json:"code" bson:"code"`
	Credits         string        `json:"credits" bson:"credits"`
	Examinator      string        `json:"examinator" bson:"examinator"`
	ExaminatorURL   string        `json:"examinatorURL" bson:"examinatorURL"`
	GradeType       string        `json:"gradeType" bson:"gradeType"`
	Homepage        string        `json:"homepage" bson:"homepage"`
	Institution     string        `json:"institution" bson:"institution"`
	Name            string        `json:"name" bson:"name"`
	OwnerProgram    string        `json:"ownerProgram" bson:"ownerProgram"`
	OwnerProgramURL string        `json:"ownerProgramURL" bson:"ownerProgramURL"`
	Sp              string        `json:"sp" bson:"sp"`
	Syllabus        string        `json:"syllabus" bson:"syllabus"`
	Url             string        `json:"url" bson:"url"`
}

func AllCourses() ([]Course, error) {
	courses := []Course{}
	err := config.Courses.Find(bson.M{}).All(&courses)

	if err != nil {
		return nil, err
	}

	return courses, err
}

func CourseByID(id string) (Course, error) {
	course := Course{}
	err := config.Courses.FindId(bson.ObjectIdHex(id)).One(&course)

	return course, err
}

func CourseByCode(code string) (Course, error) {
	course := Course{}
	err := config.Courses.Find(bson.M{"code": code}).One(&course)

	return course, err
}

func NewCourse(req *http.Request) (Course, error) {
	course := Course{}
	err := json.NewDecoder(req.Body).Decode(&course)
	course.ID = bson.NewObjectId()

	if err != nil {
		return course, err
	}

	err = config.Courses.Insert(course)
	return course, err
}

func PatchByID(id string, req *http.Request) (Course, error) {
	course := Course{}
	oldCourse := Course{}

	err := json.NewDecoder(req.Body).Decode(&course)
	if err != nil {
		return course, err
	}

	oldCourse, err = CourseByID(id)
	if err != nil {
		return course, err
	}

	course.ID = oldCourse.ID

	err = config.Courses.UpdateId(bson.ObjectIdHex(id), &course)
	return course, err
}

func PatchByCode(code string, req *http.Request) (Course, error) {
	course := Course{}
	oldCourse := Course{}

	err := json.NewDecoder(req.Body).Decode(&course)
	if err != nil {
		return course, err
	}

	oldCourse, err = CourseByCode(code)
	if err != nil {
		return course, err
	}

	course.ID = oldCourse.ID

	err = config.Courses.Update(bson.M{"code": code}, &course)
	return course, err
}

func DeleteByID(id string, req *http.Request) error {
	return config.Courses.RemoveId(bson.ObjectIdHex(id))
}

func DeleteByCode(code string, req *http.Request) error {
	return config.Courses.Remove(bson.M{"code": code})
}
