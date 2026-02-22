<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,50:16213e,100:0f3460&height=250&section=header&text=SaGa%20E-Commerce&fontSize=60&fontColor=e94560&animation=fadeIn&fontAlignY=38&desc=Full-Stack%20Online%20Shopping%20Platform&descAlignY=58&descSize=22&descColor=ffffff" width="100%"/>

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&duration=3000&pause=1000&color=e94560&center=true&vCenter=true&width=700&lines=Modern+Full-Stack+E-Commerce+App;React+%2B+Spring+Boot+%2B+MongoDB;Role-Based+Admin+Panel+Included;Payment+Gateway+Integrated;Cloudinary+Image+Management;Built+to+Scale+%F0%9F%9A%80" />

<br/><br/>

<a href="https://github.com/Saikaranam-70/SaGa"><img src="https://img.shields.io/badge/Frontend-React.js-61DAFB?style=for-the-badge&logo=react&logoColor=black"/></a>
<a href="https://github.com/Saikaranam-70/SaGaBackend"><img src="https://img.shields.io/badge/Backend-Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/Cloud-Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white"/>

<br/><br/>

<img src="https://img.shields.io/badge/Security-Spring%20Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white"/>
<img src="https://img.shields.io/badge/Auth-JWT-e94560?style=for-the-badge&logo=jsonwebtokens&logoColor=white"/>
<img src="https://img.shields.io/badge/Build-Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white"/>
<img src="https://img.shields.io/badge/Bundler-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>

<br/><br/>

<img src="https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square&logo=vercel"/>
<img src="https://img.shields.io/badge/License-MIT-e94560?style=flat-square"/>
<img src="https://img.shields.io/github/stars/Saikaranam-70/SaGa?style=flat-square&color=e94560&logo=github"/>
<img src="https://img.shields.io/github/forks/Saikaranam-70/SaGa?style=flat-square&color=0f3460&logo=github"/>
<img src="https://komarev.com/ghpvc/?username=Saikaranam-70&label=Profile+Views&color=e94560&style=flat-square"/>

</div>

<br/>

<div align="center">
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">
</div>

<br/>

## 💡 What is SaGa?

<div align="center">

```
  Browse  ──▶  Search  ──▶  Add to Cart  ──▶  Pay  ──▶  Track Order
```

</div>

**SaGa** is a complete end-to-end e-commerce web application delivering a seamless, secure, and modern shopping experience. It ships with a fully integrated **Payment Gateway**, a dedicated **Admin Panel**, product management, cart operations, order processing, and **Cloudinary** image handling — all secured by Spring Security + JWT authentication.

<br/>

<div align="center">
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">
</div>

<br/>

## 🧩 User vs Admin

<table>
<tr>
<th align="center" width="50%">🧑‍💻 User Side</th>
<th align="center" width="50%">🛠️ Admin Panel</th>
</tr>
<tr>
<td>

- 🔐 Secure Register & Login
- 🛍️ Browse product catalog
- 🔎 Search & filter products
- 🛒 Cart — add, update, remove
- 💳 Checkout via Payment Gateway
- 📦 Place & track orders
- 👤 Manage personal profile

</td>
<td>

- ➕ Add / Edit / Delete products
- 🖼️ Upload images via Cloudinary
- 📋 View & manage all orders
- 👥 Manage users & roles
- 📊 Dashboard overview
- 💰 Monitor payments & transactions
- 🔒 Protected admin-only routes

</td>
</tr>
</table>

<br/>

<div align="center">
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">
</div>

<br/>

## 🏗️ Architecture

```mermaid
flowchart TB
    classDef frontend fill:#0f3460,stroke:#e94560,color:#fff
    classDef backend fill:#16213e,stroke:#6DB33F,color:#fff
    classDef db fill:#1a1a2e,stroke:#47A248,color:#fff
    classDef service fill:#16213e,stroke:#3448C5,color:#fff

    A([React + Vite SPA]):::frontend
    B([Axios HTTP Client]):::frontend

    A --> B
    B -->|REST| C

    C([Spring Boot API Server]):::backend
    C --> D([Spring Security + JWT]):::backend
    C --> E([Service Layer]):::backend
    C --> F([BCrypt Encoder]):::backend
    E --> G([Spring Data MongoDB]):::backend
    G --> H[(MongoDB Database)]:::db
    C --> I([Cloudinary Service]):::service
    C --> J([Payment Gateway]):::service
    C --> K([Role Guard: ADMIN / USER]):::backend
```

<br/>

<div align="center">
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">
</div>

<br/>

## ✨ Features

<div align="center">

| Feature | Description |
|---|---|
| 🛍️ **Product Catalog** | Browse with categories, images & pricing |
| 🔎 **Search & Filters** | Keyword-based product discovery |
| 🛒 **Cart System** | Add, update quantity, remove items |
| 💳 **Payment Gateway** | Secure integrated payment at checkout |
| 📦 **Order Management** | Place and track order history |
| 🛠️ **Admin Panel** | Full dashboard — products, orders, users |
| 👤 **Authentication** | JWT-secured login & registration |
| 🔐 **Role-Based Access** | Admin and User permission separation |
| 🖼️ **Image Upload** | Cloudinary-powered product images |
| 🔑 **Password Security** | BCrypt-encrypted credentials |
| 📱 **Responsive UI** | Mobile & desktop optimized |

</div>

<br/>

<div align="center">
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">
</div>

<br/>

## 🛠️ Tech Stack

<div align="center">

### Frontend
<img src="https://skillicons.dev/icons?i=react,js,html,css,vite"/>

### Backend
<img src="https://skillicons.dev/icons?i=java,spring,maven,mongodb,postman"/>

### Cloud · Security · Tools
<img src="https://skillicons.dev/icons?i=git,github,vscode,idea"/>

> **Cloudinary** &nbsp;·&nbsp; **Spring Security** &nbsp;·&nbsp; **JWT** &nbsp;·&nbsp; **BCrypt** &nbsp;·&nbsp; **Payment Gateway**

</div>

<br/>

<div align="center">
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">
</div>

<br/>

## 📂 Project Structure

<table>
<tr>
<th align="center">🔹 Frontend — <a href="https://github.com/Saikaranam-70/SaGa">SaGa</a></th>
<th align="center">🔸 Backend — <a href="https://github.com/Saikaranam-70/SaGaBackend">SaGaBackend</a></th>
</tr>
<tr>
<td>

```
SaGa/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── assets/
├── index.html
├── eslint.config.js
├── vite.config.js
├── package.json
├── package-lock.json
└── .gitignore
```

</td>
<td>

```
SaGaBackend/
├── .mvn/wrapper/
├── src/main/java/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── model/
│   ├── security/
│   └── config/
├── uploads/
├── mvnw
├── mvnw.cmd
├── pom.xml
└── .gitignore
```

</td>
</tr>
</table>

<br/>

<div align="center">
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">
</div>

<br/>

## ⚙️ Getting Started

### Prerequisites
```
Node.js  >= 16     Java  >= 17
Maven    >= 3.8    MongoDB >= 5.x
```

### 1 · Frontend
```bash
git clone https://github.com/Saikaranam-70/SaGa.git
cd SaGa
npm install
npm run dev
```

### 2 · Backend
```bash
git clone https://github.com/Saikaranam-70/SaGaBackend.git
cd SaGaBackend
mvn clean install
mvn spring-boot:run
```

<br/>

<div align="center">
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">
</div>

<br/>

## 🔑 Environment Variables

### `application.properties`
```properties
server.port=8080

# MongoDB
spring.data.mongodb.uri=mongodb://localhost:27017/saga_ecommerce

# JWT
jwt.secret=your_super_secret_key
jwt.expiration=86400000

# Cloudinary
cloudinary.cloud-name=your_cloud_name
cloudinary.api-key=your_api_key
cloudinary.api-secret=your_api_secret

# Payment Gateway
payment.gateway.key=your_payment_key
payment.gateway.secret=your_payment_secret
```

### Frontend `.env`
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

<br/>

<div align="center">
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">
</div>

<br/>

## 🎯 Upcoming Enhancements

```
📊  Advanced Admin Analytics with Charts
⭐  Product Ratings & Reviews
🔔  Real-time Order Notifications
🔁  Wishlist & Save for Later
📧  Order Confirmation Emails
☁️  Full Cloud Deployment (AWS / Render)
📱  React Native Mobile App
🗺️  Google Maps Delivery Tracking
```

<br/>

<div align="center">
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">
</div>

<br/>

## 📊 GitHub Stats

<div align="center">
<img src="https://github-readme-stats-sigma-five.vercel.app/api?username=Saikaranam-70&show_icons=true&theme=radical" />
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=Saikaranam-70&theme=tokyonight&hide_border=true&ring=e94560&fire=e94560&currStreakLabel=e94560&background=0d1117" height="160"/>
</div>

<div align="center">
<img src="https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=Saikaranam-70&layout=compact&theme=radical&hide_border=true"/>
</div>

<br/>

<div align="center">
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">
</div>

<br/>

## 🤝 Contributing

```bash
1.  Fork the repo
2.  git checkout -b feature/YourFeature
3.  git commit -m "Add YourFeature"
4.  git push origin feature/YourFeature
5.  Open a Pull Request
```

<br/>

## 👨‍💻 Author

<div align="center">

<img src="https://avatars.githubusercontent.com/Saikaranam-70" width="110px" style="border-radius:50%"/>

### Sai Karanam
*Full Stack Developer &nbsp;|&nbsp; React · Spring Boot · MongoDB*

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-Saikaranam--70-181717?style=for-the-badge&logo=github)](https://github.com/Saikaranam-70)
&nbsp;
[![Frontend](https://img.shields.io/badge/Frontend-SaGa-61DAFB?style=for-the-badge&logo=react)](https://github.com/Saikaranam-70/SaGa)
&nbsp;
[![Backend](https://img.shields.io/badge/Backend-SaGaBackend-6DB33F?style=for-the-badge&logo=springboot)](https://github.com/Saikaranam-70/SaGaBackend)

</div>

<br/>

## 🐍 Contribution Graph

<div align="center">
   <img src="https://raw.githubusercontent.com/Saikaranam-70/Saikaranam-70/output/github-contribution-grid-snake.svg" />
</div>

<br/>

<div align="center">

### ⭐ If SaGa inspired you, leave a star — it means a lot!

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,50:16213e,100:0f3460&height=140&section=footer&animation=fadeIn" width="100%"/>

</div>
