Данные администратора хранятся в файле _admin.json_
Данные для подключения к БД хранятся в файле _config.json_

Начальная миграция хранится в файле _db.sql_

### API
Все запросы к API через POST метод
```shell

/api/login - Проверка логина/пароля

/api/datacenters/list
/api/datacenters/create
/api/datacenters/delete/:id
/api/datacenters/update

/api/nets/list
/api/nets/create
/api/nets/delete/:id
/api/nets/update

/api/ips/list
/api/ips/create
/api/ips/delete/:id
/api/ips/update

/api/esxis/list
/api/esxis/create
/api/esxis/delete/:id
/api/esxis/update

/api/vms/list
/api/vms/create
/api/vms/delete/:id
/api/vms/update

```
Авторизация происходит путем установки заколовков запросов **X-email** и **X-password**