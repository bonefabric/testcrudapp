package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"testcrudapp/auth"
	"testcrudapp/entity"
	"testcrudapp/repository"
)

func VmHandle(router *gin.Engine) {

	router.POST("/api/vms/list", func(context *gin.Context) {
		if !auth.Check(context) {
			context.Status(403)
			return
		}
		vmRepo := repository.GetVmRepository()
		list, err := vmRepo.Select()
		if err != nil {
			context.JSON(http.StatusInternalServerError, err.Error())
			return
		}
		context.JSON(http.StatusOK, convertListToArray(list))
	})

	router.POST("/api/vms/create", func(context *gin.Context) {
		//TODO auth, validation
		var vm entity.Vm
		vmRepo := repository.GetVmRepository()
		if err := context.ShouldBindJSON(&vm); err == nil {
			var id int64
			id, err = vmRepo.Insert(vm)
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

	router.POST("/api/vms/delete/:id", func(context *gin.Context) {
		//TODO auth
		id := context.Param("id")
		vmRepo := repository.GetVmRepository()
		_, err := vmRepo.Remove(id)
		if err != nil {
			context.JSON(http.StatusBadRequest, err.Error())
			return
		}
		context.JSON(http.StatusOK, true)
	})

	router.POST("/api/vms/update", func(context *gin.Context) {
		//TODO auth
		vmRepo := repository.GetVmRepository()
		var vm entity.Vm
		if err := context.ShouldBindJSON(&vm); err == nil {
			var id int64
			id, err = vmRepo.Update(vm)
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
