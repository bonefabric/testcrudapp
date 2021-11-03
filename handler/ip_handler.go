package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"testcrudapp/auth"
	"testcrudapp/entity"
	"testcrudapp/repository"
)

func IpHandle(router *gin.Engine) {

	router.POST("/api/ips/list", func(context *gin.Context) {
		if !auth.Check(context) {
			context.Status(403)
			return
		}
		ipRepo := repository.GetIpRepository()
		list, err := ipRepo.Select()
		if err != nil {
			context.JSON(http.StatusInternalServerError, err.Error())
			return
		}
		context.JSON(http.StatusOK, convertListToArray(list))
	})

	router.POST("/api/ips/create", func(context *gin.Context) {
		//TODO auth, validation
		var ip entity.Ip
		ipRepo := repository.GetIpRepository()
		if err := context.ShouldBindJSON(&ip); err == nil {
			var id int64
			id, err = ipRepo.Insert(ip)
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

	router.POST("/api/ips/delete/:id", func(context *gin.Context) {
		//TODO auth
		id := context.Param("id")
		ipRepo := repository.GetIpRepository()
		_, err := ipRepo.Remove(id)
		if err != nil {
			context.JSON(http.StatusBadRequest, err.Error())
			return
		}
		context.JSON(http.StatusOK, true)
	})

	router.POST("/api/ips/update", func(context *gin.Context) {
		//TODO auth
		ipRepo := repository.GetIpRepository()
		var ip entity.Ip
		if err := context.ShouldBindJSON(&ip); err == nil {
			var id int64
			id, err = ipRepo.Update(ip)
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
