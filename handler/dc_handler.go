package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"testcrudapp/auth"
	"testcrudapp/entity"
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

	router.POST("/api/datacenters/create", func(context *gin.Context) {
		//TODO auth, validation
		//if !auth.Check(context) {
		//	context.Status(403)
		//	return
		//}
		var dc entity.Dc
		dcRepo := repository.GetDcRepository()
		if err := context.ShouldBindJSON(&dc); err == nil {
			var id int64
			id, err = dcRepo.Insert(dc)
			if err != nil {
				context.JSON(http.StatusInternalServerError, err.Error())
				return
			}
			if !(id > 0) {
				context.JSON(http.StatusConflict, "Check your inputs")
				return
			}
			context.JSON(http.StatusOK, true)
		} else {
			context.JSON(http.StatusBadRequest, err.Error())
		}
	})

}
