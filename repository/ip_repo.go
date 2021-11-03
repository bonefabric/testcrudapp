package repository

import (
	"container/list"
	"database/sql"
	"fmt"
	util "github.com/lakshanwd/db-helper/mysql"
	"testcrudapp/entity"
)

type IpRepo struct {
	Name string
}

func GetIpRepository() IpRepo {
	return IpRepo{Name: "ip"}
}

func (repo IpRepo) Select() (*list.List, error) {
	reader := func(rows *sql.Rows, collection *list.List) {
		var ip entity.Ip
		err := rows.Scan(&ip.Id, &ip.Ip, &ip.NetId, &ip.NetName)
		if err != nil {
			fmt.Println(err.Error())
			return
		}
		collection.PushBack(ip)
	}
	return util.ExecuteReader(DbConnection, "select ip.id, ip.ip, ip.net_id, net.net from ip "+
		"left join net on ip.net_id = net.id", reader)
}

func (repo IpRepo) Insert(doc interface{}) (int64, error) {
	ip := doc.(entity.Ip)
	return util.ExecuteInsert(DbConnection, "insert into ip(ip, net_id) values (?,?)",
		ip.Ip, ip.NetId)
}

func (repo IpRepo) Update(doc interface{}) (int64, error) {
	ip := doc.(entity.Ip)
	return util.ExecuteUpdateDelete(DbConnection, "update ip set ip=?, net_id=? where id=?",
		ip.Ip, ip.NetId, ip.Id)
}

func (repo IpRepo) Remove(id string) (int64, error) {
	return util.ExecuteUpdateDelete(DbConnection, "delete from ip where id = ?", id)
}
