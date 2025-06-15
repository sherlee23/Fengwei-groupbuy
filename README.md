# Fengwei-groupbuy
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>锋味派美食团购</title>
    <style>
        :root {
            --primary: #FF4757;
            --secondary: #FF6B81;
            --accent: #FFA502;
            --light: #F1F2F6;
            --dark: #2F3542;
        }
        body {
            font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 0;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            color: var(--dark);
        }
        .header {
            text-align: center;
            padding: 25px 20px;
            background: white;
            border-radius: 0 0 20px 20px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            margin-bottom: 20px;
            background: linear-gradient(to right, var(--primary), var(--secondary));
            color: white;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: 1px;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
        }
        .container {
            padding: 0 20px 30px;
        }
        .product {
            background-color: white;
            border-radius: 12px;
            padding: 18px;
            margin-bottom: 15px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.08);
            transition: transform 0.3s, box-shadow 0.3s;
            border-left: 4px solid var(--primary);
        }
        .product:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .product-image {
            width: 100%;
            height: 180px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 12px;
            background-color: #f5f5f5;
        }
        .product-name {
            font-weight: bold;
            font-size: 18px;
            margin-bottom: 5px;
            color: var(--dark);
            display: flex;
            justify-content: space-between;
        }
        .product-price {
            color: var(--primary);
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 12px;
        }
        .quantity-control {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .quantity-btn {
            width: 36px;
            height: 36px;
            border: none;
            background: linear-gradient(to right, var(--primary), var(--secondary));
            color: white;
            font-size: 18px;
            cursor: pointer;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }
        .quantity-btn:hover {
            transform: scale(1.1);
        }
        .quantity-btn:active {
            transform: scale(0.95);
        }
        .quantity-input {
            width: 50px;
            height: 36px;
            text-align: center;
            margin: 0 10px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
        }
        .total {
            font-size: 20px;
            font-weight: bold;
            text-align: right;
            margin: 25px 0;
            padding: 18px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.08);
            color: var(--primary);
        }
        .form-group {
            margin-bottom: 22px;
        }
        .form-group label {
            display: block;
            margin-bottom: 10px;
            font-weight: 600;
            color: var(--dark);
        }
        .form-group input, .form-group select {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 16px;
            transition: all 0.3s;
        }
        .form-group input:focus, .form-group select:focus {
            border-color: var(--primary);
            outline: none;
            box-shadow: 0 0 0 3px rgba(255, 71, 87, 0.2);
        }
        .file-upload {
            margin-top: 25px;
        }
        .file-upload label {
            display: block;
            margin-bottom: 10px;
            font-weight: 600;
            color: var(--dark);
        }
        .file-upload input[type="file"] {
            width: 100%;
            padding: 12px;
            border: 2px dashed #e0e0e0;
            border-radius: 10px;
            text-align: center;
            transition: all 0.3s;
        }
        .file-upload input[type="file"]:hover {
            border-color: var(--primary);
            background: rgba(255, 107, 129, 0.05);
        }
        .submit-btn {
            width: 100%;
            padding: 16px;
            background: linear-gradient(to right, var(--primary), var(--secondary));
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            margin-top: 25px;
            transition: all 0.3s;
            box-shadow: 0 4px 10px rgba(255, 71, 87, 0.3);
        }
        .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(255, 71, 87, 0.4);
        }
        .submit-btn:active {
            transform: translateY(0);
        }
        .category-title {
            font-size: 22px;
            margin: 30px 0 18px;
            padding-left: 12px;
            border-left: 5px solid var(--primary);
            color: var(--dark);
            font-weight: 700;
            position: relative;
        }
        .category-title::after {
            content: "";
            position: absolute;
            bottom: -5px;
            left: 12px;
            width: 50px;
            height: 3px;
            background: linear-gradient(to right, var(--primary), var(--secondary));
            border-radius: 3px;
        }
        .emoji {
            font-size: 20px;
            margin-right: 8px;
        }
        .tag {
            font-size: 12px;
            padding: 2px 8px;
            border-radius: 10px;
            background-color: var(--accent);
            color: white;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🍢 锋味派美食团购</h1>
    </div>

    <div class="container">
        <form id="orderForm">
            <div class="form-group">
                <label for="name"><span class="emoji">👤</span>*1. 姓名 Name</label>
                <input type="text" id="name" name="name" required placeholder="请输入您的姓名">
            </div>

            <div class="form-group">
                <label for="phone"><span class="emoji">📱</span>*2. 电话 HP</label>
                <input type="tel" id="phone" name="phone" required placeholder="请输入联系电话">
            </div>

            <div class="form-group">
                <label for="delivery"><span class="emoji">🚚</span>*3. 取货方式 Delivery Method</label>
                <select id="delivery" name="delivery" required>
                    <option value="">请选择取货方式...</option>
                    <option value="self-pickup">自取 Self pick up</option>
                    <option value="lalamove">Lalamove 送货</option>
                </select>
            </div>

            <h2 class="category-title"><span class="emoji">🛒</span>4. 请选择商品</h2>

            <!-- ============= 烤肠系列 - 已配置图片 ============= -->
            <h3 class="category-title"><span class="emoji">🌭</span>烤肠系列</h3>
            <div class="product">
                <img src="IMG_3859.jpeg" class="product-image" alt="原味烤肠">
                <div class="product-name">原味烤肠 <span class="tag">🔥 爆款</span></div>
                <div class="product-price">RM28</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="原味烤肠" data-price="28">-</button>
                    <input type="number" class="quantity-input" id="原味烤肠" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="原味烤肠" data-price="28">+</button>
                </div>
            </div>

            <div class="product">
                <img src="IMG_3864.jpeg" class="product-image" alt="烟熏蜜汁烤肠">
                <div class="product-name">烟熏蜜汁烤肠</div>
                <div class="product-price">RM28</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="烟熏蜜汁烤肠" data-price="28">-</button>
                    <input type="number" class="quantity-input" id="烟熏蜜汁烤肠" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="烟熏蜜汁烤肠" data-price="28">+</button>
                </div>
            </div>

            <div class="product">
                <img src="IMG_3863.jpeg" class="product-image" alt="法式香草烤肠">
                <div class="product-name">法式香草烤肠</div>
                <div class="product-price">RM28</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="法式香草烤肠" data-price="28">-</button>
                    <input type="number" class="quantity-input" id="法式香草烤肠" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="法式香草烤肠" data-price="28">+</button>
                </div>
            </div>

            <div class="product">
                <img src="IMG_3860.jpeg" class="product-image" alt="黑胡椒烤肠">
                <div class="product-name">黑胡椒烤肠</div>
                <div class="product-price">RM28</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="黑胡椒烤肠" data-price="28">-</button>
                    <input type="number" class="quantity-input" id="黑胡椒烤肠" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="黑胡椒烤肠" data-price="28">+</button>
                </div>
            </div>

            <div class="product">
                <img src="IMG_3862.jpeg" class="product-image" alt="孜然脆骨烤肠">
                <div class="product-name">孜然脆骨烤肠</div>
                <div class="product-price">RM28</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="孜然脆骨烤肠" data-price="28">-</button>
                    <input type="number" class="quantity-input" id="孜然脆骨烤肠" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="孜然脆骨烤肠" data-price="28">+</button>
                </div>
            </div>

            <div class="product">
                <img src="IMG_3861.jpeg" class="product-image" alt="芝士玉米烤肠">
                <div class="product-name">芝士玉米烤肠</div>
                <div class="product-price">RM28</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="芝士玉米烤肠" data-price="28">-</button>
                    <input type="number" class="quantity-input" id="芝士玉米烤肠" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="芝士玉米烤肠" data-price="28">+</button>
                </div>
            </div>

            <!-- ============= 其他系列 - 图片占位 ============= -->
            <h3 class="category-title"><span class="emoji">🦐</span>虾肠&虾饼系列</h3>
            <div class="product">
                <div class="product-image"></div>
                <div class="product-name">原味虾肠 <span class="tag">🆕 新品</span></div>
                <div class="product-price">RM33</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="原味虾肠" data-price="33">-</button>
                    <input type="number" class="quantity-input" id="原味虾肠" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="原味虾肠" data-price="33">+</button>
                </div>
            </div>

            <div class="product">
                <div class="product-image"></div>
                <div class="product-name">辣味虾肠 <span class="tag">🌶️ 热卖</span></div>
                <div class="product-price">RM33</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="辣味虾肠" data-price="33">-</button>
                    <input type="number" class="quantity-input" id="辣味虾肠" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="辣味虾肠" data-price="33">+</button>
                </div>
            </div>

            <div class="product">
                <div class="product-image"></div>
                <div class="product-name">虾饼</div>
                <div class="product-price">RM28</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="虾饼" data-price="28">-</button>
                    <input type="number" class="quantity-input" id="虾饼" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="虾饼" data-price="28">+</button>
                </div>
            </div>

            <h3 class="category-title"><span class="emoji">🍕</span>披萨系列</h3>
            <div class="product">
                <div class="product-image"></div>
                <div class="product-name">玛格丽特披萨</div>
                <div class="product-price">RM25</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="玛格丽特披萨" data-price="25">-</button>
                    <input type="number" class="quantity-input" id="玛格丽特披萨" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="玛格丽特披萨" data-price="25">+</button>
                </div>
            </div>

            <div class="product">
                <div class="product-image"></div>
                <div class="product-name">黑椒牛肉披萨</div>
                <div class="product-price">RM25</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="黑椒牛肉披萨" data-price="25">-</button>
                    <input type="number" class="quantity-input" id="黑椒牛肉披萨" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="黑椒牛肉披萨" data-price="25">+</button>
                </div>
            </div>

            <div class="product">
                <div class="product-image"></div>
                <div class="product-name">奥尔良鸡肉披萨</div>
                <div class="product-price">RM25</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="奥尔良鸡肉披萨" data-price="25">-</button>
                    <input type="number" class="quantity-input" id="奥尔良鸡肉披萨" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="奥尔良鸡肉披萨" data-price="25">+</button>
                </div>
            </div>

            <div class="product">
                <div class="product-image"></div>
                <div class="product-name">双料榴莲披萨 <span class="tag">🌟 招牌</span></div>
                <div class="product-price">RM40</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="双料榴莲披萨" data-price="40">-</button>
                    <input type="number" class="quantity-input" id="双料榴莲披萨" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="双料榴莲披萨" data-price="40">+</button>
                </div>
            </div>

            <h3 class="category-title"><span class="emoji">🥮</span>酥饼系列</h3>
            <div class="product">
                <div class="product-image"></div>
                <div class="product-name">黑猪肉酥饼</div>
                <div class="product-price">RM55</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="黑猪肉酥饼" data-price="55">-</button>
                    <input type="number" class="quantity-input" id="黑猪肉酥饼" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="黑猪肉酥饼" data-price="55">+</button>
                </div>
            </div>

            <div class="product">
                <div class="product-image"></div>
                <div class="product-name">安格斯牛肉酥饼</div>
                <div class="product-price">RM55</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="安格斯牛肉酥饼" data-price="55">-</button>
                    <input type="number" class="quantity-input" id="安格斯牛肉酥饼" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="安格斯牛肉酥饼" data-price="55">+</button>
                </div>
            </div>

            <h3 class="category-title"><span class="emoji">🥟</span>小笼汤包系列</h3>
            <div class="product">
                <div class="product-image"></div>
                <div class="product-name">菌菇小笼汤包</div>
                <div class="product-price">RM12</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="菌菇小笼汤包" data-price="12">-</button>
                    <input type="number" class="quantity-input" id="菌菇小笼汤包" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="菌菇小笼汤包" data-price="12">+</button>
                </div>
            </div>

            <div class="product">
                <div class="product-image"></div>
                <div class="product-name">鲜肉小笼汤包</div>
                <div class="product-price">RM12</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="鲜肉小笼汤包" data-price="12">-</button>
                    <input type="number" class="quantity-input" id="鲜肉小笼汤包" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="鲜肉小笼汤包" data-price="12">+</button>
                </div>
            </div>

            <div class="product">
                <div class="product-image"></div>
                <div class="product-name">黑松露小笼汤包 <span class="tag">💎 豪华</span></div>
                <div class="product-price">RM12</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="黑松露小笼汤包" data-price="12">-</button>
                    <input type="number" class="quantity-input" id="黑松露小笼汤包" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="黑松露小笼汤包" data-price="12">+</button>
                </div>
            </div>

            <h3 class="category-title"><span class="emoji">🍗</span>鸡排系列</h3>
            <div class="product">
                <div class="product-image"></div>
                <div class="product-name">原味鸡排</div>
                <div class="product-price">RM20</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="原味鸡排" data-price="20">-</button>
                    <input type="number" class="quantity-input" id="原味鸡排" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="原味鸡排" data-price="20">+</button>
                </div>
            </div>

            <div class="product">
                <div class="product-image"></div>
                <div class="product-name">奥尔良鸡排</div>
                <div class="product-price">RM20</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="奥尔良鸡排" data-price="20">-</button>
                    <input type="number" class="quantity-input" id="奥尔良鸡排" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="奥尔良鸡排" data-price="20">+</button>
                </div>
            </div>

            <h3 class="category-title"><span class="emoji">🍗</span>鸡翅系列</h3>
            <div class="product">
                <div class="product-image"></div>
                <div class="product-name">奥尔良鸡翅</div>
                <div class="product-price">RM25</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="奥尔良鸡翅" data-price="25">-</button>
                    <input type="number" class="quantity-input" id="奥尔良鸡翅" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="奥尔良鸡翅" data-price="25">+</button>
                </div>
            </div>

            <div class="product">
                <div class="product-image"></div>
                <div class="product-name">青花椒鸡翅 <span class="tag">🌶️ 麻辣</span></div>
                <div class="product-price">RM25</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="青花椒鸡翅" data-price="25">-</button>
                    <input type="number" class="quantity-input" id="青花椒鸡翅" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="青花椒鸡翅" data-price="25">+</button>
                </div>
            </div>

            <h3 class="category-title"><span class="emoji">🥟</span>纸皮烧卖系列</h3>
            <div class="product">
                <div class="product-image"></div>
                <div class="product-name">黑猪三丁纸皮烧卖</div>
                <div class="product-price">RM15</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="黑猪三丁纸皮烧卖" data-price="15">-</button>
                    <input type="number" class="quantity-input" id="黑猪三丁纸皮烧卖" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="黑猪三丁纸皮烧卖" data-price="15">+</button>
                </div>
            </div>

            <div class="product">
                <div class="product-image"></div>
                <div class="product-name">黑椒牛肉纸皮烧卖</div>
                <div class="product-price">RM15</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="黑椒牛肉纸皮烧卖" data-price="15">-</button>
                    <input type="number" class="quantity-input" id="黑椒牛肉纸皮烧卖" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="黑椒牛肉纸皮烧卖" data-price="15">+</button>
                </div>
            </div>

            <div class="product">
                <div class="product-image"></div>
                <div class="product-name">黑猪梅菜干纸皮烧卖</div>
                <div class="product-price">RM15</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="黑猪梅菜干纸皮烧卖" data-price="15">-</button>
                    <input type="number" class="quantity-input" id="黑猪梅菜干纸皮烧卖" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="黑猪梅菜干纸皮烧卖" data-price="15">+</button>
                </div>
            </div>

            <div class="product">
                <div class="product-image"></div>
                <div class="product-name">三丁芝士纸皮烧卖 <span class="tag">🧀 拉丝</span></div>
                <div class="product-price">RM15</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="三丁芝士纸皮烧卖" data-price="15">-</button>
                    <input type="number" class="quantity-input" id="三丁芝士纸皮烧卖" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="三丁芝士纸皮烧卖" data-price="15">+</button>
                </div>
            </div>

            <div class="product">
                <div class="product-image"></div>
                <div class="product-name">乌米腊味纸皮烧卖</div>
                <div class="product-price">RM15</div>
                <div class="quantity-control">
                    <button type="button" class="quantity-btn minus" data-product="乌米腊味纸皮烧卖" data-price="15">-</button>
                    <input type="number" class="quantity-input" id="乌米腊味纸皮烧卖" value="0" min="0">
                    <button type="button" class="quantity-btn plus" data-product="乌米腊味纸皮烧卖" data-price="15">+</button>
                </div>
            </div>

            <div class="total">
                共计：RM<span id="totalAmount">0</span>
            </div>

            <div class="file-upload">
                <label for="payment"><span class="emoji">💳</span>*5. 请上传转账凭证：</label>
                <input type="file" id="payment" name="payment" accept="image/*,.pdf" required>
            </div>

            <button type="submit" class="submit-btn">
                <span class="emoji">🚀</span> 提交订单
            </button>
        </form>
    </div>

    <script>
        // 商品价格映射
        const productPrices = {
            "原味烤肠": 28,
            "烟熏蜜汁烤肠": 28,
            "法式香草烤肠": 28,
            "黑胡椒烤肠": 28,
            "孜然脆骨烤肠": 28,
            "芝士玉米烤肠": 28,
            "原味虾肠": 33,
            "辣味虾肠": 33,
            "虾饼": 28,
            "玛格丽特披萨": 25,
            "黑椒牛肉披萨": 25,
            "奥尔良鸡肉披萨": 25,
            "双料榴莲披萨": 40,
            "黑猪肉酥饼": 55,
            "安格斯牛肉酥饼": 55,
            "菌菇小笼汤包": 12,
            "鲜肉小笼汤包": 12,
            "黑松露小笼汤包": 12,
            "原味鸡排": 20,
            "奥尔良鸡排": 20,
            "奥尔良鸡翅": 25,
            "青花椒鸡翅": 25,
            "黑猪三丁纸皮烧卖": 15,
            "黑椒牛肉纸皮烧卖": 15,
            "黑猪梅菜干纸皮烧卖": 15,
            "三丁芝士纸皮烧卖": 15,
            "乌米腊味纸皮烧卖": 15
        };

        // 更新总金额
        function updateTotal() {
            let total = 0;
            document.querySelectorAll('.quantity-input').forEach(input => {
                const productName = input.id;
                const price = productPrices[productName] || 0;
                const quantity = parseInt(input.value) || 0;
                total += price * quantity;
            });
            document.getElementById('totalAmount').textContent = total;
        }

        // 数量加减按钮事件
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const input = document.getElementById(this.dataset.product);
                let value = parseInt(input.value) || 0;
                
                if (this.classList.contains('minus')) {
                    value = Math.max(0, value - 1);
                } else {
                    value = value + 1;
                }
                
                input.value = value;
                updateTotal();
            });
        });

        // 数量输入框事件
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', updateTotal);
        });

        // 表单提交
        document.getElementById('orderForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 检查是否选择了商品
            let hasItems = false;
            document.querySelectorAll('.quantity-input').forEach(input => {
                if (parseInt(input.value) > 0) {
                    hasItems = true;
                }
            });
            
            if (!hasItems) {
                alert('请至少选择一件商品');
                return;
            }
            
            // 收集订单数据
            const orderData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                delivery: document.getElementById('delivery').value,
                items: [],
                total: document.getElementById('totalAmount').textContent,
                paymentProof: document.getElementById('payment').files[0]?.name
            };

            document.querySelectorAll('.quantity-input').forEach(input => {
                const quantity = parseInt(input.value);
                if (quantity > 0) {
                    orderData.items.push({
                        name: input.id,
                        price: productPrices[input.id],
                        quantity: quantity,
                        subtotal: productPrices[input.id] * quantity
                    });
                }
            });

            console.log('订单数据:', orderData);
            alert('订单提交成功！我们会尽快与您确认。\n\n总金额: RM' + orderData.total);
        });
    </script>
</body>
</html>