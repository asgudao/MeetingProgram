# MeetingProgram
一个简洁易用的会议管理程序，旨在帮助团队高效组织、跟踪和管理各类会议，涵盖会议创建、参会人员管理、会议纪要记录、待办事项跟进等核心功能，提升会议效率与团队协作体验。

## 目录
- [功能特性](#功能特性)
- [环境要求](#环境要求)
- [安装部署](#安装部署)
- [使用指南](#使用指南)
- [项目结构](#项目结构)
- [贡献指南](#贡献指南)
- [许可证](#许可证)

## 功能特性
✅ 会议基础管理：创建、编辑、删除会议，支持设置会议标题、时间、地点、参会人员、会议主题等  
✅ 参会人员管理：添加/移除参会人，标记参会状态（出席/缺席/请假）  
✅ 会议纪要记录：实时编辑、保存会议纪要，支持富文本格式  
✅ 待办事项跟进：从会议纪要提取待办事项，关联负责人、截止时间，跟踪完成状态  
✅ 数据导出：支持会议记录、纪要、待办事项导出为Excel/PDF格式  
✅ 权限控制：区分管理员/普通用户，管理员可管理所有会议，普通用户仅操作本人相关会议  

## 环境要求
- 编程语言：Python 3.8+ / Java 11+（根据项目实际技术栈调整）
- 框架：Django 4.0+ / Spring Boot 2.7+（根据项目实际技术栈调整）
- 数据库：MySQL 8.0+ / SQLite 3.30+（开发环境）
- 前端：Vue 3.0+ / React 18+（如有前端模块）
- 其他依赖：详见项目根目录`requirements.txt` / `pom.xml`

## 安装部署
### 1. 克隆代码仓库
```bash
git clone https://github.com/asgudao/MeetingProgram.git
cd MeetingProgram
```

### 2. 环境配置
#### 后端（以Python/MySQL为例）
- 创建虚拟环境并激活：
  ```bash
  python -m venv venv
  # Windows
  venv\Scripts\activate
  # Mac/Linux
  source venv/bin/activate
  ```
- 安装依赖：
  ```bash
  pip install -r requirements.txt
  ```
- 配置数据库：
  复制`config.example.py`为`config.py`，修改数据库连接信息：
  ```python
  DB_CONFIG = {
      "host": "localhost",
      "port": 3306,
      "user": "root",
      "password": "你的数据库密码",
      "db": "meeting_program"
  }
  ```
- 初始化数据库：
  ```bash
  python manage.py migrate  # Django示例
  # 或自定义初始化脚本
  python init_db.py
  ```

#### 前端（如有）
```bash
cd frontend
npm install
npm run build  # 构建生产环境包
```

### 3. 启动程序
#### 开发环境
```bash
# 后端
python manage.py runserver  # Django
# 或
java -jar target/meeting-program-0.0.1-SNAPSHOT.jar  # Spring Boot

# 前端（开发模式）
cd frontend
npm run dev
```

#### 生产环境
- 后端：使用Gunicorn/uWSGI（Python）或Nginx+Tomcat（Java）部署
- 前端：将`dist`目录部署至Nginx
- 参考`deploy/README.md`（可补充部署脚本说明）

## 使用指南
### 1. 首次登录
- 管理员默认账号：`admin`，默认密码：`123456`（请登录后立即修改）
- 普通用户由管理员创建并分配权限

### 2. 创建会议
1. 点击首页「新建会议」按钮
2. 填写会议标题、时间、地点、参会人员、会议主题等信息
3. 点击「保存」完成会议创建，参会人员将收到通知

### 3. 记录会议纪要
1. 进入会议详情页，点击「编辑纪要」
2. 支持富文本编辑（图片、表格、代码块等）
3. 保存后纪要自动关联至当前会议，支持历史版本查看

### 4. 跟进待办事项
1. 从会议纪要中选中内容，点击「创建待办」
2. 分配负责人、设置截止时间
3. 在「待办中心」可查看所有待办进度，支持标记完成、添加备注

## 项目结构
```
MeetingProgram/
├── backend/           # 后端代码
│   ├── api/           # 接口层
│   ├── models/        # 数据模型
│   ├── services/      # 业务逻辑层
│   ├── utils/         # 工具类
│   └── config/        # 配置文件
├── frontend/          # 前端代码（如有）
│   ├── src/           # 源码
│   ├── public/        # 静态资源
│   └── package.json   # 依赖配置
├── deploy/            # 部署脚本/说明
├── tests/             # 单元测试/集成测试
├── requirements.txt   # 后端依赖
└── README.md          # 项目说明
```

## 贡献指南
1. Fork 本仓库
2. 创建特性分支（`git checkout -b feature/xxx`）
3. 提交代码（`git commit -m 'feat: 添加xxx功能'`）
4. 推送分支（`git push origin feature/xxx`）
5. 打开 Pull Request

### 规范要求
- 代码遵循 PEP8（Python）/ Alibaba Java Coding Guidelines（Java）规范
- 新增功能需补充对应的单元测试
- 提交前请运行`pytest`/`mvn test`确保测试通过
- 提交信息遵循「类型: 描述」格式（如`feat: 新增会议导出功能`）

## 许可证
本项目采用 [MIT 许可证](LICENSE) - 详见 LICENSE 文件。

## 常见问题
- Q：会议通知无法发送？  
  A：检查邮箱/短信配置（`config/notify.py`），确保服务器网络可访问外部服务。
- Q：待办事项提醒不生效？  
  A：确认定时任务服务已启动（如Celery/Quartz），检查截止时间设置是否正确。

## 联系方式
如有问题或建议，可通过以下方式反馈：
- 邮箱：MapleLeaf000@163.com
