package handler

import (
	"github.com/gin-gonic/gin"
	"testcrudapp/auth"
)

func Dc_handle(router *gin.Engine) {

	router.GET("/api/datacenters", func(context *gin.Context) {
		if !auth.Check(context) {
			context.Status(403)
			return
		}

	})

}
