FROM node:alpine As developement

WORKDIR /usr/src/social-server-app

# dấu chấm thư hai tượng chưng cho url /usr/src/app là nó sẽ copy file package.json vào thư mục app trong container 
COPY package.json . 

RUN npm install
# dấu chấm thư nhất là copy hết tất cả các thư mục, ngoại trừ các .dockerignore
# dấu chấm thư hai tượng chưng cho url /usr/src/app là copy hết tất cả các thư mục vào thư mục app trong container 
COPY . .

EXPOSE 4080

# VOLUME [ "/usr/src/social-server-app/node_modules" ]

# VOLUME [ "D:\Workspace\configs-default-projects\express-graphql-realtime\:/usr/src/social-server-app" ]

CMD ["npm", "start"]

# docker build -t social-server . 

# Chạy image social-server vừa build [.]

# --name: đặt tên cho container [.]
# --rmi : đảm bảo container sẽ tự động xóa khi dừng container [.]
# -p    : viết tắt của cổng hay còn gọi là PORT [.]
# -d    : chế độ tách rời [.]

# Nếu EXPOSE là 80 và bạn không muốn mở local:80 mà là local:3000 thì: 3000:80 [.]
# docker run -p 3000:80 -d --name social-network --rmi social-server


# EX: Nếu ưnsg dụng có tác vụ thêm một file vào folder uploads, thì khi sử dụng start và stop ( có --rmi khi start) 
#     container của docker thì các file trong folder uploads vẫn tồn tại, còn nếu container bị dừng thì các file 
#     trong folder uploads sẽ bị mất do nó không được ánh xạ bằng volumes [.]

# Volumes là gì?
# Khái niệm: là các folder trên máy chủ của mình (máy tính), nó không nằm trong container, image,
# mà trên ổ cứng máy chủ (máy tính), được gắn kết.
# về cơ bản có nghĩa là, được tạo sẵn hoặc được ánh xạ, vào bộ chứa, vì vậy volumes là các folder 
# trên máy chủ (máy tính) và làm cho docker biết, sau đó ánh xạ tới các folder trong container của docker. 

# volumns là gì?
# khái niệm: là các thư mục trên máy chủ của mình, vì vậy không nằm trong bộ chứa, không phải trong hình ảnh,
# mà trên ổ cứng máy chủ của mình, được gắn kết.
# về cơ bản có nghĩa là, được tạo sẵn hoặc được ánh xạ, vào bộ chứa.
# vì vậy volumes là các thư mục trên máy chủ của mình, trên máy tính của mình, mà mình làm cho docer biết,
# và sau đó được ánh xạ tới các thư mục bên trong container của docker.

# với volumes khác nhau, bạn thực sự có thể kết nối một folder, bên trong container với folder bên ngoài container trên máy chủ của bạn ( hoặc máy tính )
# và những thay đổi ở một trong hai folder sẽ được phản ánh trong thư mục còn lại 
# có nghĩa là khi mình thay đổi file.js bên ngoài container thì bên trong container tệp file.js cũng bị thay đổi và ngược lại.

# volumes persist if a container shuts down. 

# Two types of external data storages [.]

# Volumes: 
# Anonymous Volumes: là một tập ẩn danh, thường không có tên cụ thể, nó thực sự chỉ tồn tại miễn là container 
# của chúng ta tồn tại, tức nó sẽ được tạo bất cứ khi nào container chạy và dữ liệu sẽ biến mất khi đóng container.
# nếu bạn chạy container mà không có --rmi, thì tập đĩa ẩn danh sẽ không bị xóa, ngay cả khi xóa vùng chứa (docker rm ..)

# hữu ích: 
# Named Volumes: các tập đã đặt tên không được gắn vào container 

# Bind Mounts ( Gắn kết ràng buộc )

# nó có một số điểm tương đồng với volumes ( Vậy tương đồng ở đâu? ) nhưng nó có một điểm khác biệt chính 
# ( điểm khác biệt chính là gì ? ) ( Docker quản lý volumes ở đâu tên hệ thống tệp máy chủ ? )


# syntax 

# x: phải là một đường dẫn absolute ( tuyệt đối ), không phải tương đối ( relative )
# tới folder mà mình đặt đẻ chứa trong container /usr/src/app

# docker run -v x:/usr/src/app
# shortcuts:
# macOS / Linux: -v $(pwd):/app
# Windows: -v "%cd%":/app