package repository

import (
	"container/list"
	"database/sql"
	"fmt"
	util "github.com/lakshanwd/db-helper/mysql"
	"testcrudapp/entity"
)

type NetRepo struct {
	Name string
}

func GetNetRepository() NetRepo {
	return NetRepo{Name: "net"}
}

func (repo NetRepo) Select() (*list.List, error) {
	reader := func(rows *sql.Rows, collection *list.List) {
		var net entity.Net
		err := rows.Scan(&net.Id, &net.DcId, &net.DcName, &net.Net, &net.Mask, &net.Gateway, &net.Comment)
		if err != nil {
			fmt.Println(err.Error())
			return
		}
		collection.PushBack(net)
	}
	return util.ExecuteReader(DbConnection, "select net.id, net.dc_id, datacenter.dc, net.net, net.mask, net.gateway, net.comment from net "+
		"left join datacenter on net.dc_id = datacenter.id", reader)
}

func (repo NetRepo) Insert(doc interface{}) (int64, error) {
	net := doc.(entity.Net)
	return util.ExecuteInsert(DbConnection, "insert into net(dc_id, net, mask, gateway, comment) values (?,?,?,?,?)",
		net.DcId, net.Net, net.Mask, net.Gateway, net.Comment)
}

func (repo NetRepo) Update(doc interface{}) (int64, error) {
	net := doc.(entity.Net)
	return util.ExecuteUpdateDelete(DbConnection, "update net set dc_id=?, net=?, mask=?, gateway=?, comment=? where id=?",
		net.DcId, net.Net, net.Mask, net.Gateway, net.Comment, net.Id)
}

func (repo NetRepo) Remove(id string) (int64, error) {
	return util.ExecuteUpdateDelete(DbConnection, "delete from net where id = ?", id)
}
