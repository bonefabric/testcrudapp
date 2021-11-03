package entity

type Ip struct {
	Id      int    `json:"id"`
	Ip      string `json:"ip"`
	NetId   int    `json:"net_id"`
	NetName string `json:"net_name"`
}
