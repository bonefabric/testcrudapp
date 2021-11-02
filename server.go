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

	router.LoadHTMLFiles(
		"./templates/index.html",
		"./templates/dcs.html",
		"./templates/ips.html",
		"./templates/nets.html",
		"./templates/servers.html",
		"./templates/vms.html")

	router.GET("/", func(context *gin.Context) {
		context.HTML(http.StatusOK, "index.html", nil)
	})
	router.GET("/datacenters", func(context *gin.Context) {
		context.HTML(http.StatusOK, "dcs.html", nil)
	})
	router.GET("/ips", func(context *gin.Context) {
		context.HTML(http.StatusOK, "ips.html", nil)
	})
	router.GET("/nets", func(context *gin.Context) {
		context.HTML(http.StatusOK, "nets.html", nil)
	})
	router.GET("/servers", func(context *gin.Context) {
		context.HTML(http.StatusOK, "servers.html", nil)
	})
	router.GET("/vms", func(context *gin.Context) {
		context.HTML(http.StatusOK, "vms.html", nil)
	})

	err := router.Run(":8080")
	if err != nil {
		fmt.Println("An error!")
		return
	}
}
