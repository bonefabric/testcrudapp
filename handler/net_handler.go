package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func NetHandler(router *gin.Engine) {

	router.GET("/nets", func(context *gin.Context) {
		context.HTML(http.StatusOK, "nets.html", nil)
	})

}
