package repository

import (
	"container/list"
	"database/sql"
	"fmt"
	util "github.com/lakshanwd/db-helper/mysql"
	"testcrudapp/entity"
)

type VmRepo struct {
	Name string
}

func GetVmRepository() VmRepo {
	return VmRepo{Name: "vm"}
}

func (repo VmRepo) Select() (*list.List, error) {
	reader := func(rows *sql.Rows, collection *list.List) {
		var vm entity.Vm
		err := rows.Scan(&vm.Id, &vm.EsxId, &vm.Esxname, &vm.IpId, &vm.Ip, &vm.NetId, &vm.Net, &vm.Attr, &vm.Vmname)
		if err != nil {
			fmt.Println(err.Error())
			return
		}
		collection.PushBack(vm)
	}
	return util.ExecuteReader(DbConnection, "select vm.id, vm.esx_id, x.esxname, vm.ip_id, ip.ip, vm.net_id, net.net, "+
		"vm.attr, vm.vmname from vm "+
		"left join esxi x on vm.esx_id = x.id "+
		"left join ip on vm.ip_id = ip.id "+
		"left join net on vm.net_id = net.id", reader)
}

func (repo VmRepo) Insert(doc interface{}) (int64, error) {
	vm := doc.(entity.Vm)
	return util.ExecuteInsert(DbConnection, "insert into vm(esx_id, ip_id, net_id, attr, vmname) values (?,?,?,?,?)",
		vm.EsxId, vm.IpId, vm.NetId, vm.Attr, vm.Vmname)
}

func (repo VmRepo) Update(doc interface{}) (int64, error) {
	vm := doc.(entity.Vm)
	return util.ExecuteUpdateDelete(DbConnection, "update vm set esx_id=?, ip_id=?, net_id=?, attr=?, vmname=? where id=?",
		vm.EsxId, vm.IpId, vm.NetId, vm.Attr, vm.Vmname, vm.Id)
}

func (repo VmRepo) Remove(id string) (int64, error) {
	return util.ExecuteUpdateDelete(DbConnection, "delete from vm where id = ?", id)
}
