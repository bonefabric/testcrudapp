package main

import (
	"fmt"
	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"testcrudapp/auth"
	"testcrudapp/handler"
	"testcrudapp/repository"
)

func main() {
	fmt.Println("setup database connections")
	if err := repository.SetupRepo(); err != nil {
		log.Fatal(err)
	}
	defer repository.CloseRepo()

	router := gin.Default()
	router.Use(gzip.Gzip(gzip.DefaultCompression))

	router.LoadHTMLFiles("./templates/app.html")

	auth.Route(router)
	handler.DcHandle(router)
	handler.NetHandle(router)
	handler.IpHandle(router)
	handler.EsxiHandle(router)
	handler.VmHandle(router)

	router.GET("/bundle/:name", func(c *gin.Context) {
		name := c.Param("name")
		c.File("./templates/bundle/" + name)
	})

	router.GET("/", func(context *gin.Context) {
		context.HTML(http.StatusOK, "app.html", nil)
	})
	router.GET("/:any", func(context *gin.Context) {
		context.HTML(http.StatusOK, "app.html", nil)
	})

	err := router.Run(":8080")
	if err != nil {
		fmt.Println("An error!")
		return
	}
}
