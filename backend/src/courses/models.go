package courses

import (
	"config"
	"encoding/json"
	"net/http"

	"github.com/globalsign/mgo"

	"github.com/globalsign/mgo/bson"
)

type Course struct {
	ID              bson.ObjectId `json:"_id,omitempty" bson:"_id"`
	Code            string        `json:"code,omitempty" bson:"code"`
	Credits         string        `json:"credits,omitempty" bson:"credits"`
	Examinator      string        `json:"examinator,omitempty" bson:"examinator"`
	ExaminatorURL   string        `json:"examinatorURL,omitempty" bson:"examinatorURL"`
	GradeType       string        `json:"gradeType,omitempty" bson:"gradeType"`
	Homepage        string        `json:"homepage,omitempty" bson:"homepage"`
	Institution     string        `json:"institution,omitempty" bson:"institution"`
	Name            string        `json:"name,omitempty" bson:"name"`
	OwnerProgram    string        `json:"ownerProgram,omitempty" bson:"ownerProgram"`
	OwnerProgramURL string        `json:"ownerProgramURL,omitempty" bson:"ownerProgramURL"`
	Sp              string        `json:"sp,omitempty" bson:"sp"`
	Syllabus        string        `json:"syllabus,omitempty" bson:"syllabus"`
	Url             string        `json:"url,omitempty" bson:"url"`
}

type CourseStat struct {
	ID         bson.ObjectId `json:"_id" bson:"_id"`
	Queries    []string      `json:"queries" bson:"queries"`
	Code       string        `json:"code" bson:"code"`
	Name       string        `json:"name" bson:"name"`
	Popularity int           `json:"popularity" bson:"popularity"`
}

func AllCourses() ([]Course, error) {
	courses := []Course{}
	err := config.Courses.Find(bson.M{}).All(&courses)
	if err != nil {
		return nil, err
	}

	return courses, err
}

func AllCoursesMinified() ([]Course, error) {
	courses := []Course{}
	err := config.Courses.Find(nil).Select(bson.M{
		"code":         1,
		"name":         1,
		"credits":      1,
		"examinator":   1,
		"ownerProgram": 1,
		"sp":           1,
		"institution":  1,
	}).All(&courses)

	if err != nil {
		return nil, err
	}

	return courses, err
}

func CourseMinified(id string) (Course, error) {
	course := Course{}
	err := config.Courses.FindId(bson.ObjectIdHex(id)).Select(bson.M{
		"examinatorURL":   1,
		"gradeType":       1,
		"homepage":        1,
		"ownerProgramURL": 1,
		"syllabus":        1,
		"url":             1,
	}).One(&course)

	return course, err
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

	/*
		The key "code" should be set to unique in mongodb, so that
		no explicit dup check should be needed here
	*/
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

func NewCourseStat(req *http.Request) (bool, error) {
	courseStat := CourseStat{}
	err := json.NewDecoder(req.Body).Decode(&courseStat)

	if err != nil {
		return false, err
	}

	existing, err := CourseStatByCode(courseStat.Code)
	code := existing.Code

	if err == nil && code != "" {
		change := mgo.Change{}
		query := courseStat.Queries[0]

		if query != "" {
			change.Update = bson.M{"$push": bson.M{"queries": query}}
			config.CourseStats.Find(bson.M{"code": code}).Apply(change, &existing)
		}

		change.Update = bson.M{"$inc": bson.M{"popularity": 1}}
		config.CourseStats.Find(bson.M{"code": code}).Apply(change, &existing)
		return false, err
	}

	courseStat.ID = bson.NewObjectId()
	courseStat.Popularity = 1
	err = config.CourseStats.Insert(courseStat)
	return true, err
}

func CourseStatByCode(code string) (CourseStat, error) {
	CourseStat := CourseStat{}
	err := config.CourseStats.Find(bson.M{"code": code}).One(&CourseStat)

	return CourseStat, err
}
