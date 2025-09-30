7. Payment APIs
Initiate Payment API (POST /api/payments/initiate)
Verify Payment API (POST /api/payments/verify)
Refund Payment API (POST /api/payments/refund)
8. Shipping & Delivery
Get Shipping Methods API (GET /api/shipping/methods)
Set Shipping Address API (POST /api/shipping/address)
Update Shipping Address API (PUT /api/shipping/address/:id)
9. Reviews & Ratings
Add Review API (POST /api/reviews/add)
Get Product Reviews API (GET /api/reviews/:productId)
Update Review API (PUT /api/reviews/update/:id)
Delete Review API (DELETE /api/reviews/delete/:id)
10. Admin Dashboard APIs
Get Dashboard Stats API (GET /api/admin/dashboard)
Get All Users API (GET /api/admin/users)
Delete User API (DELETE /api/admin/users/:id)
Manage Orders API (GET /api/admin/orders)
Update Order Status API (PUT /api/admin/orders/:id)
Manage Payments API (GET /api/admin/payments)
11. Notifications & Messages
Send Notification API (POST /api/notifications/send)
Get Notifications API (GET /api/notifications)
Mark Notification as Read API (PUT /api/notifications/read/:id)
12. Analytics & Reports
Sales Report API (GET /api/reports/sales)
User Activity Report API (GET /api/reports/users)
Product Performance Report API (GET /api/reports/products)
13. Coupons & Discounts
Create Coupon API (POST /api/coupons)
Apply Coupon API (POST /api/coupons/apply)
Get Active Coupons API (GET /api/coupons)
Delete Coupon API (DELETE /api/coupons/:id)
14. Customer Support & FAQs
Submit Ticket API (POST /api/support/ticket)
Get Ticket Status API (GET /api/support/ticket/:id)
Get All FAQs API (GET /api/faqs)
15. Miscellaneous APIs
Upload Image API (POST /api/upload/image)
Get Site Settings API (GET /api/settings)
Summary
1) logout functionality:- User Logout API (POST /api/auth/logout)

2) User Profile API (GET /api/user/profile)
3) Update Profile API (PUT /api/user/update)
4) Change Password API (POST /api/user/change-password)
5) Forgot Password API (POST /api/auth/forgot-password)
6) Reset Password API (POST /api/auth/reset-password)
7) Clear Cart API (DELETE /api/cart/clear)

8) Get All Products API (GET /api/products)
9) Get Single Product API (GET /api/products/:id)
10) Add New Product API (POST /api/products)
11) Update Product API (PUT /api/products/:id)
12) Delete Product API (DELETE /api/products/:id)
13) Search Product API (GET /api/products/search?q=keyword)
14) Filter Products API (GET /api/products/filter?category=shoes&price=100-500)
