package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func DcHandler(router *gin.Engine) {

	router.GET("/datacenters", func(context *gin.Context) {
		context.HTML(http.StatusOK, "dcs.html", nil)
	})

}
