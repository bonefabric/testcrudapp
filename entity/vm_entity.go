package entity

type Vm struct {
	Id      int    `json:"id"`
	EsxId   int    `json:"esx_id"`
	Esxname string `json:"esxname"`
	IpId    int    `json:"ip_id"`
	Ip      string `json:"ip"`
	NetId   int    `json:"net_id"`
	Net     string `json:"net"`
	Attr    string `json:"attr"`
	Vmname  string `json:"vmname"`
}
