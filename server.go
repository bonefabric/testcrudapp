package main

import (
	"fmt"
	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	router := gin.Default()
	router.Use(gzip.Gzip(gzip.DefaultCompression))

	router.LoadHTMLFiles("./templates/app.html")

	router.GET("/", func(context *gin.Context) {
		context.HTML(http.StatusOK, "app.html", nil)
	})

	router.GET("/bundle/:name", func(c *gin.Context) {
		name := c.Param("name")
		c.File("./templates/bundle/" + name)
	})

	//handler.DcHandler(router)
	//handler.EsxiHandler(router)
	//handler.IpsHandler(router)
	//handler.NetHandler(router)
	//handler.VmHandler(router)

	err := router.Run(":8080")
	if err != nil {
		fmt.Println("An error!")
		return
	}
}
