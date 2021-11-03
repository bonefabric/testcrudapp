package repository

import (
	"container/list"
	"database/sql"
	"fmt"
	util "github.com/lakshanwd/db-helper/mysql"
	"testcrudapp/entity"
)

type EsxiRepo struct {
	Name string
}

func GetEsxiRepository() EsxiRepo {
	return EsxiRepo{Name: "esxi"}
}

func (repo EsxiRepo) Select() (*list.List, error) {
	reader := func(rows *sql.Rows, collection *list.List) {
		var esxi entity.Esxi
		err := rows.Scan(&esxi.Id, &esxi.DcId, &esxi.Dc, &esxi.Esxname, &esxi.IpId, &esxi.Ip, &esxi.Info, &esxi.NetId, &esxi.Net)
		if err != nil {
			fmt.Println(err.Error())
			return
		}
		collection.PushBack(esxi)
	}
	return util.ExecuteReader(DbConnection, "select x.id, x.dc_id, d.dc, x.esxname, x.ip_id, ip.ip, "+
		"x.info, x.net_id, net.net from esxi x "+
		"left join datacenter d on x.dc_id = d.id "+
		"left join ip on x.ip_id = ip.id "+
		"left join net on x.net_id = net.id", reader)
}

func (repo EsxiRepo) Insert(doc interface{}) (int64, error) {
	esxi := doc.(entity.Esxi)
	return util.ExecuteInsert(DbConnection, "insert into esxi(dc_id, esxname, ip_id, info, net_id) values (?,?,?,?,?)",
		esxi.DcId, esxi.Esxname, esxi.IpId, esxi.Info, esxi.NetId)
}

func (repo EsxiRepo) Update(doc interface{}) (int64, error) {
	esxi := doc.(entity.Esxi)
	return util.ExecuteUpdateDelete(DbConnection, "update esxi set dc_id=?, esxname=?, ip_id=?, info=?, net_id=? where id=?",
		esxi.DcId, esxi.Esxname, esxi.IpId, esxi.Info, esxi.NetId, esxi.Id)
}

func (repo EsxiRepo) Remove(id string) (int64, error) {
	return util.ExecuteUpdateDelete(DbConnection, "delete from esxi where id = ?", id)
}
