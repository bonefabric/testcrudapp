package repository

import (
	"container/list"
	"database/sql"
	"fmt"
	util "github.com/lakshanwd/db-helper/mysql"
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
		if err != nil {
			fmt.Println("SQL error")
			return
		}
		collection.PushBack(dc)
	}
	return util.ExecuteReader(DbConnection, "select id, dc, login, pass, comment from datacenter", reader)
}

func (repo DcRepo) Insert(doc interface{}) (int64, error) {
	dc := doc.(entity.Dc)
	return util.ExecuteInsert(DbConnection, "insert into datacenter(dc, login, pass, comment) values (?,?,?,?)", dc.Name, dc.Login, dc.Pass, dc.Comment)
}

func (repo DcRepo) Remove(id string) (int64, error) {
	return util.ExecuteUpdateDelete(DbConnection, "delete from datacenter where id = ?", id)
}
