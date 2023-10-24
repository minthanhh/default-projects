docker run --rm --name graphql-server --env=POSTGRES_PASSWORD=pass --env=POSTGRES_USER=user --env=POSTGRES_DB=graphql-db --env=POSTGRES_HOST=localhost --env=POSTGRES_PORT=5433 --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/lib/postgresql/16/bin --env=GOSU_VERSION=1.16 --env=LANG=en_US.utf8 --env=PG_MAJOR=16 --env=PG_VERSION=16.0-1.pgdg120+1 --env=PGDATA=/var/lib/postgresql/data --volume=/var/lib/postgresql/data -p 5432:5432 --runtime=runc -d postgres:latest

### Sự khác nhau giữ image và container?

# VN

> `Image: là mã nhị phân và thư viện mã nguồn tạo nên ứng dụng của bạn` > ` Container: là một phiên bản đang chạy của hình ảnh đó` > `Bạn có thể có nhiều container dựa vào một image`

# EN

> `An Image is the application we want to run` > `A container is an instance of that image running as a process`

# Docker compose là gì?

`là một công cụ cho phép bạn thay thế các lệnh xây dựng Docker và lệnh chạy docker và chúng không chỉ là một lệnh xây dựng docker và một lệnh chạy docker có khả năng nhiều lệnh Docker và lệnh chạy docker `

`Docker compose sẽ không thay thế các tệp Docker cho các hình ảnh tùy chỉnh và nó hoạt động cùng với các tệp Docker, nó không cũng không thay thế hình anh hoặc vùng chứa, nó chỉ giúp làm việc với chúng dễ dàng hơn và cũng rất quan trọng Docker compose không phù hợp để quản lý nhiều vùng chứa trên các máy chủ khác nhau.`

`Docker compose thực sự tuyệt vời để quản lý nhiều vùng chứa trên một và cùng một máy chủ lưu trữ`
