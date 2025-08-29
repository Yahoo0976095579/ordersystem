# 🍔 線上點餐系統 (Full-Stack Online Ordering System)

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![Azure](https://img.shields.io/badge/Azure-0078D4?style=for-the-badge&logo=microsoft-azure&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

> 一個功能完整的全端線上點餐系統，旨在展示前端 Vue.js 與後端 ASP.NET Core Web API 的整合開發能力。

---

## ✨ 線上預覽 (Live Demo)

- **前端 (Vue.js on Vercel):** [**點此體驗**](https://ordersystem-three.vercel.app/)
- **後端 (ASP.NET Core on Azure):** `order20250830000710-erh4g8daeka9bzep.canadacentral-01.azurewebsites.net`

## 🖼️ 專案預覽 (Screenshots)

<!-- 請將此處替換為您的專案截圖 -->
<!-- <img src="./path/to/screenshot.png" alt="專案畫面" width="700"/> -->

## 🚀 核心功能 (Features)

- ✅ **響應式菜單**：依產品類別分組，快速導航，跨裝置瀏覽體驗。
- ✅ **動態購物車**：即時增減商品、更新總價，同步狀態。
- ✅ **跨會話保存**：購物車內容保存於瀏覽器，刷新頁面後不清空。
- ✅ **浮動預覽條**：底部顯示浮動預覽條，掌握購物車狀態。
- ✅ **模擬結帳**：多元付款方式，模擬結帳流程。
- ✅ **訂單紀錄**：查看歷史訂單的詳細資訊。
- ✅ **客製化提示**：自製 Toast 元件，操作後明確視覺回饋。

## 🛠️ 技術棧 (Tech Stack)

| 分類     | 技術                                                                             |
| :------- | :------------------------------------------------------------------------------- |
| **前端** | `Vue 3 (Composition API)` `Vite` `Pinia` `Vue Router` `Axios` `JavaScript (ES6)` |
| **後端** | `ASP.NET Core Web API (.NET 8)` `C#`                                             |
| **部署** | `Vercel` (前端) `Azure App Service` (後端)                                       |

## 🏗️ 架構與實現亮點

### 前端 (Vue 3)

- **現代化前端框架**： **Vue 3 Composition API**，程式碼的邏輯組織與複用性。
- **集中式狀態管理**：透過 **Pinia** 將核心資料邏輯（如購物車、菜單）從元件中抽離。
- **客戶端路由**：使用 **Vue Router** 建立單頁式應用 (SPA)。
- **非同步通訊**：共用的 **Axios** 客戶端來與後端 API 進行非同步數據交換。
- **元件化架構**：可複用的元件（如 `MenuItem`, `ShoppingCart`），提高開發效率與可讀性。

### 後端 (ASP.NET Core)

- **RESTful API 設計**：遵循 REST 原則設計 API，提供清晰、一致的資源操作端點。
- **服務分層架構**：採用 `Controller` -> `Service` 的分層設計，將 API 路由與商業邏輯分離。
- **依賴注入 (DI)**：在 `Program.cs` 中使用 .NET 內建的 DI 容器註冊服務，並透過 **Singleton** 生命週期在記憶體中模擬資料庫，有效管理應用程式生命週期中的資料。
- **CORS 安全性**：精確設定 CORS 策略，僅允許指定的前端來源存取 API，確保後端服務的安全性。
