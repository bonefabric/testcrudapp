package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"testcrudapp/auth"
	"testcrudapp/entity"
	"testcrudapp/repository"
)

func NetHandle(router *gin.Engine) {

	router.POST("/api/nets/list", func(context *gin.Context) {
		if !auth.Check(context) {
			context.Status(403)
			return
		}
		netRepo := repository.GetNetRepository()
		list, err := netRepo.Select()
		if err != nil {
			context.JSON(http.StatusInternalServerError, err.Error())
			return
		}
		context.JSON(http.StatusOK, convertListToArray(list))
	})

	router.POST("/api/nets/create", func(context *gin.Context) {
		//TODO auth, validation
		var net entity.Net
		netRepo := repository.GetNetRepository()
		if err := context.ShouldBindJSON(&net); err == nil {
			var id int64
			id, err = netRepo.Insert(net)
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

	router.POST("/api/nets/delete/:id", func(context *gin.Context) {
		//TODO auth
		id := context.Param("id")
		netRepo := repository.GetNetRepository()
		_, err := netRepo.Remove(id)
		if err != nil {
			context.JSON(http.StatusBadRequest, err.Error())
			return
		}
		context.JSON(http.StatusOK, true)
	})

	router.POST("/api/nets/update", func(context *gin.Context) {
		//TODO auth
		netRepo := repository.GetNetRepository()
		var net entity.Net
		if err := context.ShouldBindJSON(&net); err == nil {
			var id int64
			id, err = netRepo.Update(net)
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
