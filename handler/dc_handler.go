package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"testcrudapp/auth"
	"testcrudapp/repository"
)

func DcHandle(router *gin.Engine) {

	router.POST("/api/datacenters/list", func(context *gin.Context) {
		if !auth.Check(context) {
			context.Status(403)
			return
		}
		dcRepo := repository.GetDcRepository()
		list, err := dcRepo.Select()
		if err != nil {
			context.JSON(http.StatusInternalServerError, err.Error())
			return
		}
		context.JSON(http.StatusOK, convertListToArray(list))
	})

}
