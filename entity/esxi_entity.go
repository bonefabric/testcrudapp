package entity

type Esxi struct {
	Id      int    `json:"id"`
	DcId    int    `json:"dc_id"`
	Dc      string `json:"dc"`
	Esxname string `json:"esxname"`
	IpId    int    `json:"ip_id"`
	Ip      string `json:"ip"`
	Info    string `json:"info"`
	NetId   int    `json:"net_id"`
	Net     string `json:"net"`
}
