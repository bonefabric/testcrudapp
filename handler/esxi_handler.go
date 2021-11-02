package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func EsxiHandler(router *gin.Engine) {

	router.GET("/esxis", func(context *gin.Context) {
		context.HTML(http.StatusOK, "esxis.html", nil)
	})

}
