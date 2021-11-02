package repository

import (
	"container/list"
	"database/sql"
	"fmt"
	"testcrudapp/db"
)

type Repo interface {
	Select(doc interface{}) (*list.List, error)
	Insert(doc interface{}) (int64, error)
	Update(doc interface{}) (int64, error)
	Remove(doc interface{}) (int64, error)
}

//DbConnection - Database Connectin Pool
var DbConnection *sql.DB

func SetupRepo() (err error) {
	DbConnection, err = db.GetDatabase()
	return
}

func CloseRepo() {
	if DbConnection != nil {
		defer func(DbConnection *sql.DB) {
			err := DbConnection.Close()
			if err != nil {
				fmt.Println(err.Error())
			}
		}(DbConnection)
	}
}
