package config

import (
	"fmt"

	"github.com/globalsign/mgo"
)

var DB *mgo.Database

var Courses *mgo.Collection
var CourseStats *mgo.Collection

func init() {
	s, err := mgo.Dial("mongodb://mongo/chalmerscourses")
	if err != nil {
		panic(err)
	}

	if err = s.Ping(); err != nil {
		panic(err)
	}

	DB = s.DB("chalmerscourses")
	Courses = DB.C("courses")
	CourseStats = DB.C("coursestats")

	fmt.Println("Connected to mongo database")
}
