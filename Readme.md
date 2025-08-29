# 線上點餐系統 (Full-Stack Online Ordering System)

## 專案預覽 (Screenshots)

<!-- 請將此處替換為您的專案截圖 -->
<!-- <img src="./path/to/screenshot.png" alt="專案畫面" width="700"/> -->

## 線上預覽 (Live Demo)

- **前端 (Vue.js on Vercel):** [點此連結](https://ordersystem-three.vercel.app/)
- **後端 (ASP.NET Core on Azure):** `https://order20250830000710-erh4g8daeka9bzep.canadacentral-01.azurewebsites.net`

## 專案概述

這是一個功能完整的全端線上點餐系統，旨在展示前端 Vue.js 與後端 ASP.NET Core Web API 的整合開發能力。專案從使用者瀏覽菜單、加入購物車到完成訂單，提供了一套流暢的模擬點餐體驗。

- **前端**：Vue 3 (Vite) + Pinia + Vue Router
- **後端**：ASP.NET Core Web API (C#)
- **部署**：前端部署於 Vercel，後端部署於 Azure App Service。

## 功能特色 (Core Features)

- **響應式菜單瀏覽**：依據產品類別（漢堡、披薩、點心、飲料）將菜單分組，並提供快速導航。 
- **商品詳情頁**：點擊菜單項目可查看商品的詳細描述與大圖。
- **動態購物車**：
    - 將商品加入購物車，並在導覽列及菜單項目上即時顯示數量。
    - 在購物車內可自由增減商品數量或將商品移除。
    - 使用 Pinia 的 `pinia-plugin-persistedstate` 將購物車內容保存於 `localStorage`，刷新頁面後不清空。
- **浮動購物車預覽**：當購物車內有商品時，頁面底部會顯示浮動預覽條，方便隨時查看總金額與項目數量。
- **模擬結帳流程**：
    - 整合式的付款方式選擇（現金、信用卡、LINE Pay）。
    - 根據不同付款方式，導向對應的訂單完成頁面。
- **訂單紀錄**：可查看歷史訂單的詳細資訊，包含品項、數量、金額與付款方式。
- **客製化提示訊息**：透過自製的 Toast 元件，在使用者完成操作後（如加入購物車、送出訂單）給予明確的視覺回饋。

## 技術實現 - 前端 (Vue 3)

- **現代化前端框架**：採用 **Vue 3** 的 **Composition API** 進行開發，提升了程式碼的邏輯組織與複用性。
- **集中式狀態管理**：透過 **Pinia** 管理全域狀態，將購物車 (`cartStore`)、菜單 (`menuStore`)、訂單 (`orderStore`) 等核心資料邏輯從元件中抽離，使狀態變化可預測且易於維護。
- **客戶端路由**：使用 **Vue Router** 建立單頁式應用 (SPA)，提供無縫的頁面切換體驗，並透過 `scrollBehavior` 優化使用者跳轉頁面後的視窗位置。
- **非同步 API 通訊**：建立共用的 **Axios** 客戶端 (`api/client.js`) 來與後端 API 進行非同步數據交換，並在 `config.js` 中統一管理後端 API 的基礎路徑。
- **元件化架構**：將 UI 切分為多個可複用的元件（如 `MenuItem`、`ShoppingCart`、`PaymentSelector`），提高了開發效率與程式碼的可讀性。
- **響應式設計 (RWD)**：利用 CSS Media Query 針對不同裝置（電腦、手機）調整 UI 佈局，例如導覽列的顯示方式、Toast 訊息的位置等，確保在各種螢幕尺寸下都有一致的使用體驗。

## 技術實現 - 後端 (ASP.NET Core)

- **RESTful API 設計**：遵循 REST 原則設計 API (`Menu`, `Products`, `Orders`)，提供清晰、一致的資源操作端點。
- **服務分層架構**：採用 Controller -> Service 的分層設計，將 API 的路由與商業邏輯分離，提高程式碼的組織性與可維護性。
- **依賴注入 (DI)**：在 `Program.cs` 中使用 .NET 內建的 DI 容器註冊 `MenuService` 與 `OrderService`。透過 **Singleton** 生命週期註冊，讓服務在應用程式的生命週期中只存在單一實例，藉此在記憶體中模擬資料庫的持續性，有效管理菜單與訂單資料。
- **CORS (跨來源資源共用)**：精確設定 CORS 策略，僅允許指定的的前端來源 (本地開發環境與 Vercel 部署環境) 存取 API，確保後端服務的安全性。
- **非同步處理**：在 Controller 的 Action 中使用 `async/await` 模式，雖然目前服務層是同步操作，但此設計保留了未來串接真實資料庫時非同步操作的擴充性。
