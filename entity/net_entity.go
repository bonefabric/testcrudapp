package entity

type Net struct {
	Id      int    `json:"id"`
	DcId    int    `json:"dc_id"`
	DcName  string `json:"dc"`
	Net     string `json:"net"`
	Mask    string `json:"mask"`
	Gateway string `json:"gateway"`
	Comment string `json:"comment"`
}
