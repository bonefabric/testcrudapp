package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	err := router.Run(":8080")
	if err != nil {
		fmt.Println("An error!")
		return
	}
}
