package auth

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"os"
)

type Account struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

var Admin Account

func Check(context *gin.Context) bool {
	email := context.GetHeader("X-email")
	password := context.GetHeader("X-password")
	return Admin.Email == email && Admin.Password == password
}

func Route(router *gin.Engine) {
	loadConfig()
	router.POST("/api/login", func(context *gin.Context) {
		if !Check(context) {
			context.Status(403)
			return
		}
		context.String(200, "success!")
	})
}

func loadConfig() {
	file := "./admin.json"
	var config Account
	configFile, err := os.Open(file)
	if err != nil {
		fmt.Println(err.Error())
	}
	defer func(configFile *os.File) {
		err := configFile.Close()
		if err != nil {
			fmt.Println(err.Error())
		}
	}(configFile)
	jsonParser := json.NewDecoder(configFile)
	jsonParser.Decode(&config)
	Admin.Email = config.Email
	Admin.Password = config.Password
}
