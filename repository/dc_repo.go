package repository

import (
	"container/list"
	"database/sql"
	util "github.com/lakshanwd/db-helper/mysql"
	"log"
	"testcrudapp/entity"
)

type DcRepo struct {
	Name string
}

func GetDcRepository() DcRepo {
	return DcRepo{Name: "datacenter"}
}

func (repo DcRepo) Select() (*list.List, error) {
	reader := func(rows *sql.Rows, collection *list.List) {
		var dc entity.Dc
		err := rows.Scan(&dc.Id, &dc.Name, &dc.Login, &dc.Pass, &dc.Comment)
		collection.PushBack(dc)
		log.Fatal(err)
	}
	return util.ExecuteReader(DbConnection, "select book_id, book_name, book_author from tbl_book", reader)
}
