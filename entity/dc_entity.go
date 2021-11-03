package entity

type Dc struct {
	Id      int    `json:"id"`
	Name    string `json:"dc"`
	Login   string `json:"login"`
	Pass    string `json:"pass"`
	Comment string `json:"comment"`
}
