package config

import (
	"bufio"
	"fmt"
	"os"
	"strings"

	"github.com/globalsign/mgo"
)

var DB *mgo.Database

var Courses *mgo.Collection
var CourseStats *mgo.Collection

var mongURI string
var user string
var pass string

func init() {
	if os.Getenv("DEVPROD") == "prod" {
		mongURI = "mongo"

		f, err := os.Open(".credentials")
		if err != nil {
			panic("Error: credentials for db connection not found")
		}
		defer f.Close()
		sc := bufio.NewScanner(f)
		_ = sc.Scan()
		user = strings.Split(sc.Text(), "=")[1]
		_ = sc.Scan()
		pass = strings.Split(sc.Text(), "=")[1]

		if user == "" || pass == "" {
			panic("Error: credentials for db connection not found")
		} else {
			user = user + ":"
			pass = pass + "@"
		}
	} else {
		mongURI = "mongo:27017"
	}
	s, err := mgo.Dial("mongodb://" + user + pass + mongURI + "/chalmerscourses")
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
