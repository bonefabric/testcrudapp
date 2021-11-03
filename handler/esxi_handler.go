package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"testcrudapp/auth"
	"testcrudapp/entity"
	"testcrudapp/repository"
)

func EsxiHandle(router *gin.Engine) {

	router.POST("/api/esxis/list", func(context *gin.Context) {
		if !auth.Check(context) {
			context.Status(403)
			return
		}
		esxiRepo := repository.GetEsxiRepository()
		list, err := esxiRepo.Select()
		if err != nil {
			context.JSON(http.StatusInternalServerError, err.Error())
			return
		}
		context.JSON(http.StatusOK, convertListToArray(list))
	})

	router.POST("/api/esxis/create", func(context *gin.Context) {
		//TODO auth, validation
		var esxi entity.Esxi
		esxiRepo := repository.GetEsxiRepository()
		if err := context.ShouldBindJSON(&esxi); err == nil {
			var id int64
			id, err = esxiRepo.Insert(esxi)
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

	router.POST("/api/esxis/delete/:id", func(context *gin.Context) {
		//TODO auth
		id := context.Param("id")
		esxiRepo := repository.GetEsxiRepository()
		_, err := esxiRepo.Remove(id)
		if err != nil {
			context.JSON(http.StatusBadRequest, err.Error())
			return
		}
		context.JSON(http.StatusOK, true)
	})

	router.POST("/api/esxis/update", func(context *gin.Context) {
		//TODO auth
		esxiRepo := repository.GetEsxiRepository()
		var esxi entity.Esxi
		if err := context.ShouldBindJSON(&esxi); err == nil {
			var id int64
			id, err = esxiRepo.Update(esxi)
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
