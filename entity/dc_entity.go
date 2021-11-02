package entity

type Dc struct {
	Id      int    `json:"id,omitempty"`
	Name    string `json:"name,omitempty"`
	Login   string `json:"login,omitempty"`
	Pass    string `json:"pass,omitempty"`
	Comment string `json:"comment,omitempty"`
}
