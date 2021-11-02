package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func VmHandler(router *gin.Engine) {

	router.GET("/vms", func(context *gin.Context) {
		context.HTML(http.StatusOK, "vms.html", nil)
	})

}
