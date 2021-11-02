package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func IpsHandler(router *gin.Engine) {

	router.GET("/ips", func(context *gin.Context) {
		context.HTML(http.StatusOK, "ips.html", nil)
	})

}
