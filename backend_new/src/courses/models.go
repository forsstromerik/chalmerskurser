package courses

import "gopkg.in/mgo.v2/bson"

type Course struct {
	ID              bson.ObjectId `json:"id" bson:"_id"`
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
