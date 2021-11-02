package main

import (
	"fmt"
	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
	"net/http"
	"testcrudapp/handler"
)

func main() {
	router := gin.Default()
	router.Use(gzip.Gzip(gzip.DefaultCompression))

	router.LoadHTMLFiles(
		"./templates/index.html",
		"./templates/dcs.html",
		"./templates/ips.html",
		"./templates/nets.html",
		"./templates/esxis.html",
		"./templates/vms.html")

	router.GET("/", func(context *gin.Context) {
		context.HTML(http.StatusOK, "index.html", nil)
	})

	handler.DcHandler(router)
	handler.EsxiHandler(router)
	handler.IpsHandler(router)
	handler.NetHandler(router)
	handler.VmHandler(router)

	err := router.Run(":8080")
	if err != nil {
		fmt.Println("An error!")
		return
	}
}
