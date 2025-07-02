// HELPER: Handles phone number formatting
const PhoneFormatter = {
    format: (value) => value.replace(/\D/g, '')
};

// Main Application Class
class FoodOrderApp {
    constructor() {
        this.cart = new Map();
        this.products = [];
        this.validator = new FormValidator();
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.initializeApp();
    }

    async initializeApp() {
        this.showLoading(true);
        await this.loadProducts();
        this.loadInventoryFromStorage();
        this.renderCategories();
        this.setupEventListeners();
        this.renderProducts();
        this.updateCartSummary();
        this.showToast('应用加载成功', 'success');
        setTimeout(() => this.showInventoryAlerts(), 1500);
        this.showLoading(false);
    }

    // DATA LOADING
    async loadProducts() {
        this.products = [
            { id: 1, name: '原味烤肠', price: 28, image: 'IMG_3859.jpeg', category: '烤肠系列', emoji: '🌭', stock: 45, minStock: 10 },
            { id: 2, name: '烟熏蜜汁烤肠', price: 28, image: 'IMG_3864.jpeg', category: '烤肠系列', emoji: '🌭', stock: 38, minStock: 10 },
            { id: 3, name: '法式香草烤肠', price: 28, image: 'IMG_3863.jpeg', category: '烤肠系列', emoji: '🌭', stock: 52, minStock: 10 },
            { id: 4, name: '黑胡椒烤肠', price: 28, image: 'IMG_3860.jpeg', category: '烤肠系列', emoji: '🌭', stock: 8, minStock: 10 },
            { id: 5, name: '孜然脆骨烤肠', price: 28, image: 'IMG_3862.jpeg', category: '烤肠系列', emoji: '🌭', stock: 23, minStock: 10 },
            { id: 6, name: '芝士玉米烤肠', price: 28, image: 'IMG_3861.jpeg', category: '烤肠系列', emoji: '🌭', stock: 41, minStock: 10 },
            { id: 7, name: '原味虾肠', price: 33, image: 'IMG_3853.jpeg', category: '虾肠系列', emoji: '🦐', stock: 30, minStock: 8 },
            { id: 8, name: '辣味虾肠', price: 33, image: 'IMG_3854.jpeg', category: '虾肠系列', emoji: '🦐', stock: 27, minStock: 8 },
            { id: 9, name: '原味虾饼', price: 28, image: 'IMG_3873.jpeg', category: '虾肠系列', emoji: '🍤', stock: 19, minStock: 8 },
            { id: 10, name: '玛格丽特披萨', price: 25, image: 'IMG_3841.jpeg', category: '披萨系列', emoji: '🍕', stock: 15, minStock: 5 },
            { id: 11, name: '黑椒牛肉披萨', price: 25, image: 'IMG_3839.jpeg', category: '披萨系列', emoji: '🍕', stock: 12, minStock: 5 },
            { id: 12, name: '奥尔良鸡肉披萨', price: 25, image: 'IMG_3840.jpeg', category: '披萨系列', emoji: '🍕', stock: 18, minStock: 5 },
            { id: 13, name: '双料榴莲披萨', price: 40, image: 'IMG_3852.jpeg', category: '披萨系列', emoji: '🍕', stock: 3, minStock: 3 },
            { id: 14, name: '鲜肉小笼汤包', price: 12, image: 'IMG_3874.jpeg', category: '小笼汤包系列', emoji: '🥟', stock: 60, minStock: 15 },
            { id: 15, name: '菌菇小笼汤包', price: 12, image: 'IMG_3875.jpeg', category: '小笼汤包系列', emoji: '🥟', stock: 45, minStock: 15 },
            { id: 16, name: '黑松露小笼汤包', price: 12, image: 'IMG_3876.jpeg', category: '小笼汤包系列', emoji: '🥟', stock: 20, minStock: 10 },
            { id: 17, name: '黑猪肉酥饼', price: 55, image: 'IMG_3837.jpeg', category: '酥饼系列', emoji: '🥮', stock: 8, minStock: 5 },
            { id: 18, name: '安格斯牛肉酥饼', price: 55, image: 'IMG_3838.jpeg', category: '酥饼系列', emoji: '🥮', stock: 12, minStock: 5 },
            { id: 19, name: '原味鸡排', price: 20, image: 'IMG_3835.jpeg', category: '鸡排系列', emoji: '🍗', stock: 25, minStock: 8 },
            { id: 20, name: '奥尔良鸡排', price: 20, image: 'IMG_3836.jpeg', category: '鸡排系列', emoji: '🍗', stock: 22, minStock: 8 },
            { id: 21, name: '奥尔良鸡翅', price: 25, image: 'IMG_3865.jpeg', category: '鸡翅系列', emoji: '🍗', stock: 35, minStock: 10 },
            { id: 22, name: '青花椒鸡翅', price: 25, image: 'IMG_3866.jpeg', category: '鸡翅系列', emoji: '🍗', stock: 28, minStock: 10 },
            { id: 23, name: '黑猪三丁纸皮烧卖', price: 15, image: 'IMG_3843.jpeg', category: '纸皮烧卖系列', emoji: '🥟', stock: 40, minStock: 12 },
            { id: 24, name: '黑椒牛肉纸皮烧卖', price: 15, image: 'IMG_3842.jpeg', category: '纸皮烧卖系列', emoji: '🥟', stock: 5, minStock: 12 },
            { id: 25, name: '黑猪梅菜干纸皮烧卖', price: 15, image: 'IMG_3844.jpeg', category: '纸皮烧卖系列', emoji: '🥟', stock: 32, minStock: 12 },
            { id: 26, name: '三丁芝士纸皮烧卖', price: 15, image: 'IMG_3845.jpeg', category: '纸皮烧卖系列', emoji: '🥟', stock: 0, minStock: 12 },
            { id: 27, name: '乌米腊味纸皮烧卖', price: 15, image: 'IMG_3846.jpeg', category: '纸皮烧卖系列', emoji: '🥟', stock: 18, minStock: 12 }
        ];
    }
    
    loadInventoryFromStorage() {
        try {
            const saved = localStorage.getItem('inventoryData');
            if (saved) {
                const inventoryData = JSON.parse(saved);
                inventoryData.forEach(item => {
                    const product = this.products.find(p => p.id === item.id);
                    if (product) product.stock = item.stock;
                });
            }
        } catch (e) { console.error("Failed to load inventory from storage", e); }
    }

    // UI RENDERING
    renderCategories() {
        const nav = document.getElementById('categoryNav');
        const categories = ['all', ...new Set(this.products.map(p => p.category))];
        const linksHtml = categories.map(cat => {
            if (cat === 'all') return `<a href="#" class="category-link active" data-category="all">全部</a>`;
            const product = this.products.find(p => p.category === cat);
            return `<a href="#" class="category-link" data-category="${cat}">${product.emoji} ${cat}</a>`;
        }).join('');
        nav.innerHTML = `<div class="category-links">${linksHtml}</div>`;
        this.attachCategoryListeners();
    }

    renderProducts() {
        const productList = document.getElementById('productList');
        let filtered = this.products;
        if (this.currentCategory !== 'all') filtered = filtered.filter(p => p.category === this.currentCategory);
        if (this.searchQuery) filtered = filtered.filter(p => p.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
        
        productList.innerHTML = filtered.length > 0
            ? filtered.map(p => this.renderProduct(p)).join('')
            : `<p>没有找到商品。</p>`;
        this.attachQuantityListeners();
    }

    renderProduct(product) {
        const quantity = this.cart.get(product.id) || 0;
        const stockStatus = this.getStockStatus(product);
        const isOutOfStock = product.stock === 0;
        return `
            <div class="product ${isOutOfStock ? 'out-of-stock' : ''}" data-product-id="${product.id}">
                ${stockStatus.badge}
                <div class="product-image-container"><img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy"></div>
                <div class="product-name">${product.emoji} ${product.name}</div>
                <div class="product-price">RM${product.price.toFixed(2)}</div>
                <div class="stock-info ${stockStatus.class}"><i class="fas ${stockStatus.icon}"></i> 库存: ${product.stock > 0 ? `${product.stock} 件` : '已售完'}</div>
                <div class="quantity-control">
                    <button class="quantity-btn" data-action="decrease" ${quantity === 0 || isOutOfStock ? 'disabled' : ''}>-</button>
                    <input type="number" class="quantity-input" value="${quantity}" min="0" max="${product.stock}" ${isOutOfStock ? 'disabled' : ''}>
                    <button class="quantity-btn" data-action="increase" ${quantity >= product.stock || isOutOfStock ? 'disabled' : ''}>+</button>
                </div>
            </div>`;
    }
    
    // EVENT LISTENERS
    setupEventListeners() {
        document.getElementById('mainForm').addEventListener('submit', (e) => { e.preventDefault(); this.handleFormSubmit(); });
        document.getElementById('deliveryMethod').addEventListener('change', this.handleDeliveryChange);
        document.getElementById('paymentMethod').addEventListener('change', this.handlePaymentChange);
        document.getElementById('paymentProof').addEventListener('change', this.handleFileUpload.bind(this));
        document.getElementById('customerPhone').addEventListener('input', (e) => e.target.value = PhoneFormatter.format(e.target.value));
        document.getElementById('cancelOrder').addEventListener('click', () => this.hideDialog('confirmationDialog'));
        document.getElementById('confirmOrder').addEventListener('click', () => this.submitOrder());
        document.getElementById('showExportBtn').addEventListener('click', () => {
            document.getElementById('adminPanel').style.display = document.getElementById('adminPanel').style.display === 'none' ? 'block' : 'none';
        });
        document.getElementById('realExportBtn').addEventListener('click', () => this.handleAdminExport(document.getElementById('adminPassword').value));
        
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', this.debounce(() => this.handleSearch(searchInput.value), 300));
        document.getElementById('searchBtn').addEventListener('click', () => this.handleSearch(searchInput.value));
    }
    
    attachCategoryListeners() {
        document.querySelectorAll('.category-link').forEach(link => {
            link.addEventListener('click', (e) => { e.preventDefault(); this.handleCategoryChange(link.dataset.category); });
        });
    }

    attachQuantityListeners() {
        document.querySelectorAll('.quantity-control').forEach(control => {
            const productId = parseInt(control.closest('.product').dataset.productId);
            control.querySelector('.quantity-btn[data-action="increase"]').addEventListener('click', () => this.updateQuantity(productId, 'increase'));
            control.querySelector('.quantity-btn[data-action="decrease"]').addEventListener('click', () => this.updateQuantity(productId, 'decrease'));
            control.querySelector('.quantity-input').addEventListener('change', (e) => this.setQuantity(productId, parseInt(e.target.value) || 0));
        });
    }

    // EVENT HANDLERS
    handleCategoryChange(category) {
        this.currentCategory = category;
        document.querySelectorAll('.category-link').forEach(link => link.classList.toggle('active', link.dataset.category === category));
        this.renderProducts();
    }
    
    handleSearch(query) {
        this.searchQuery = query.trim();
        this.renderProducts();
    }

    handleDeliveryChange(e) {
        document.getElementById('deliveryAddressGroup').style.display = e.target.value === 'lalamove' ? 'block' : 'none';
        document.getElementById('selfPickupAddress').style.display = e.target.value === 'self-pickup' ? 'block' : 'none';
    }
    
    handlePaymentChange(e) {
        const method = e.target.value;
        document.getElementById('paymentDetails').style.display = method ? 'block' : 'none';
        document.getElementById('maybankDetails').style.display = method === 'maybank' ? 'block' : 'none';
        document.getElementById('touchngoDetails').style.display = method === 'touchngo' ? 'block' : 'none';
        document.getElementById('maybankQR').style.display = method === 'maybank' ? 'block' : 'none';
        document.getElementById('touchngoQR').style.display = method === 'touchngo' ? 'block' : 'none';
    }

    handleFileUpload(event) {
        document.querySelector('.file-name').textContent = event.target.files[0] ? event.target.files[0].name : '';
    }

    // CART & QUANTITY
    updateQuantity(productId, action) {
        let quantity = this.cart.get(productId) || 0;
        const product = this.products.find(p => p.id === productId);
        if (action === 'increase' && quantity < product.stock) quantity++;
        else if (action === 'decrease' && quantity > 0) quantity--;
        this.setQuantity(productId, quantity);
    }
    
    setQuantity(productId, quantity) {
        const product = this.products.find(p => p.id === productId);
        if (quantity > product.stock) {
            quantity = product.stock;
            this.showToast(`库存不足, ${product.name} 最多只能购买 ${product.stock} 件`, 'warning');
        }
        if (quantity > 0) this.cart.set(productId, quantity);
        else this.cart.delete(productId);
        this.updateCartSummary();
        this.renderProducts();
    }

    updateCartSummary() {
        let total = 0, count = 0;
        this.cart.forEach((quantity, productId) => {
            const product = this.products.find(p => p.id === productId);
            if (product) { total += product.price * quantity; count += quantity; }
        });
        document.querySelector('#cartSummary .total').textContent = `总计: RM${total.toFixed(2)}`;
        document.querySelector('#cartSummary .item-count').textContent = `${count} 件商品`;
        document.getElementById('cartSummary').style.display = count > 0 ? 'block' : 'none';
    }

    // INVENTORY
    getStockStatus(product) {
        if (product.stock === 0) return { class: 'out-of-stock', icon: 'fa-times-circle', badge: '<div class="stock-badge out-of-stock-badge">售完</div>' };
        if (product.stock <= product.minStock) return { class: 'low-stock', icon: 'fa-exclamation-triangle', badge: '<div class="stock-badge low-stock-badge">库存不足</div>' };
        return { class: 'in-stock', icon: 'fa-check-circle', badge: '' };
    }
    
    saveInventoryToStorage() {
        localStorage.setItem('inventoryData', JSON.stringify(this.products.map(p => ({ id: p.id, stock: p.stock }))));
    }

    showInventoryAlerts() {
        const lowStock = this.products.filter(p => p.stock > 0 && p.stock <= p.minStock);
        if (lowStock.length > 0) this.showToast(`${lowStock.map(p => p.name).slice(0, 3).join(', ')} 等商品库存不足`, 'warning');
        const outOfStock = this.products.filter(p => p.stock === 0);
        if (outOfStock.length > 0) this.showToast(`${outOfStock.map(p => p.name).slice(0, 3).join(', ')} 已售完`, 'danger');
    }

    // FORM SUBMISSION
    async handleFormSubmit() {
        if (this.cart.size === 0) { return this.showToast('请至少选择一件商品', 'warning'); }
        const formData = this.collectFormData();
        if (!this.validator.validateForm(formData)) {
            this.validator.showAllErrors();
            return this.showToast('请检查表单，有未填写的必填项', 'error');
        }
        this.showConfirmationDialog(formData);
    }
    
    collectFormData() {
        const form = document.getElementById('mainForm');
        return {
            agreeTerms: form.agreeTerms.checked, customerName: form.customerName.value.trim(),
            customerPhone: form.customerPhone.value.trim(), deliveryMethod: form.deliveryMethod.value,
            deliveryAddress: form.deliveryAddress.value.trim(), paymentMethod: form.paymentMethod.value,
            specialRequests: form.specialRequests.value.trim(), paymentProofFile: form.paymentProof.files[0],
            cart: Array.from(this.cart.entries()).map(([id, quantity]) => ({ ...this.products.find(p => p.id === id), quantity }))
        };
    }
    
    showConfirmationDialog(formData) {
        this.pendingOrderData = formData;
        const total = formData.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const whatsappMsg = this.buildWhatsAppMessage(formData, total);
        document.getElementById('orderSummary').innerHTML = `
            <p><strong>姓名:</strong> ${formData.customerName}</p>
            <p><strong>电话:</strong> ${formData.customerPhone}</p>
            <p><strong>取货方式:</strong> ${formData.deliveryMethod === 'self-pickup' ? '自取' : 'Lalamove'}</p>
            ${formData.deliveryMethod === 'lalamove' ? `<p><strong>地址:</strong> ${formData.deliveryAddress || 'N/A'}</p>` : ''}
            <hr><h4>订单商品:</h4>
            <ul>${formData.cart.map(item => `<li>${item.name} x ${item.quantity}</li>`).join('')}</ul>
            <h4>总计: RM${total.toFixed(2)}</h4>
            <div class="whatsapp-preview">
              <strong>将发送到WhatsApp的内容:</strong>
              <p style="color:red; font-weight:bold; font-size: 12px; margin-top: 5px;">请务必在跳转WhatsApp后点击发送！</p>
              <p style="font-size: 12px; margin-top: 5px;">${whatsappMsg.replace(/\n/g, '<br>')}</p>
            </div>`;
        this.showDialog('confirmationDialog');
    }

    async submitOrder() {
        this.hideDialog('confirmationDialog');
        this.showLoading(true);
        try {
            const orderData = this.pendingOrderData;
            const orderNumber = await this.generateOrderNumber(); // Await the sequential number
            const paymentProofUrl = await window.supabaseConfig.uploadPaymentProof(orderData.paymentProofFile, orderNumber);
            
            const client = window.supabaseConfig.getClient();
            const { error } = await client.from('orders').insert([{
                order_id: orderNumber, name: orderData.customerName, phone: orderData.customerPhone,
                delivery_method: orderData.deliveryMethod, delivery_address: orderData.deliveryAddress,
                remarks: orderData.specialRequests, payment_method: orderData.paymentMethod,
                order_items: orderData.cart.map(({id, name, price, quantity}) => ({id, name, price, quantity})),
                total_amount: orderData.cart.reduce((s, i) => s + i.price * i.quantity, 0),
                payment_proof_url: paymentProofUrl, status: 'pending'
            }]);
            if (error) throw error;
            
            orderData.cart.forEach(item => {
                const product = this.products.find(p => p.id === item.id);
                if (product) product.stock -= item.quantity;
            });
            this.saveInventoryToStorage();
            this.showSuccessDialog(orderData, orderNumber);
        } catch (error) {
            this.showToast(`订单提交失败: ${error.message}`, 'error');
        } finally {
            this.showLoading(false);
        }
    }
    
    showSuccessDialog(formData, orderNumber) {
        const total = formData.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const whatsappMsg = this.buildWhatsAppMessage(formData, total, orderNumber);
        const whatsappLink = `https://wa.me/60162327792?text=${encodeURIComponent(whatsappMsg)}`;
        
        document.getElementById('orderNumber').textContent = orderNumber;
        
        const oldBtn = document.getElementById('closeSuccess');
        const newBtn = oldBtn.cloneNode(true);
        oldBtn.parentNode.replaceChild(newBtn, oldBtn);

        newBtn.onclick = () => {
            this.hideDialog('successDialog');
            window.open(whatsappLink, '_blank');
            this.resetForm();
        };
        this.showDialog('successDialog');
    }

    buildWhatsAppMessage(order, total, orderId = "...") {
        let msg = `🛎️ *锋味派新订单 #${orderId}*\n\n`;
        msg += `👤 *客户信息*\n`;
        msg += `📛 姓名: ${order.customerName}\n`;
        msg += `📱 电话: ${order.customerPhone}\n`;
        msg += `🚚 取货方式: ${order.deliveryMethod === 'self-pickup' ? '自取' : 'Lalamove送货'}\n`;
        if (order.deliveryMethod === 'lalamove') msg += `📍 地址: ${order.deliveryAddress}\n`;
        msg += `💳 付款方式: ${order.paymentMethod}\n`;
        msg += `\n🛒 *订单明细*\n`;
        order.cart.forEach(item => { msg += `${item.emoji} ${item.name} × ${item.quantity} = RM${(item.quantity * item.price).toFixed(2)}\n`; });
        msg += `\n💰 *总金额: RM${total.toFixed(2)}*\n`;
        msg += `📝 *备注*: ${order.specialRequests || '无'}\n`;
        msg += `📅 *下单时间*: ${new Date().toLocaleString('en-GB', { timeZone: 'Asia/Kuala_Lumpur' })}`;
        return msg;
    }

    resetForm() {
        document.getElementById('mainForm').reset();
        this.cart.clear();
        this.renderProducts();
        this.updateCartSummary();
        document.querySelector('.file-name').textContent = '';
        document.getElementById('deliveryAddressGroup').style.display = 'none';
        document.getElementById('paymentDetails').style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // UTILITY & ADMIN
    async generateOrderNumber() {
        const client = window.supabaseConfig.getClient();
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const datePrefix = `FW${yyyy}${mm}${dd}`;

        const { count, error } = await client.from('orders').select('order_id', { count: 'exact', head: true }).like('order_id', `${datePrefix}%`);
        
        if (error) {
            console.error("Error fetching order count:", error);
            // Fallback to a timestamp-based ID if query fails
            return `FW-ERR-${Date.now().toString().slice(-8)}`;
        }
        
        const sequence = String(count + 1).padStart(3, '0');
        return `${datePrefix}${sequence}`;
    }

    showDialog(id) { document.getElementById(id).classList.add('show'); }
    hideDialog(id) { document.getElementById(id).classList.remove('show'); }
    showLoading(show) { document.getElementById('loadingOverlay').style.display = show ? 'flex' : 'none'; }
    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
        toast.innerHTML = `<i class="toast-icon fas ${icons[type]}"></i><span class="toast-message">${message}</span><button type="button" class="toast-close">×</button>`;
        toast.querySelector('.toast-close').onclick = () => toast.remove();
        container.appendChild(toast);
        setTimeout(() => { if (toast) toast.remove(); }, 5000);
    }
    debounce(func, wait) { let timeout; return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => func.apply(this, args), wait); }; }
    async handleAdminExport(password) {
        if (password !== 'fengweipaiadmin') { return this.showToast('管理员密码错误', 'error'); }
        this.showLoading(true);
        try {
            const { data, error } = await window.supabaseConfig.getClient().from('orders').select('*').order('created_at', { ascending: false });
            if (error) throw error;
            const wsData = [['订单号', '姓名', '电话', '取货方式', '地址', '备注', '总金额', '状态', '下单时间', '支付凭证', '商品']];
            data.forEach(o => wsData.push([
                o.order_id, o.name, o.phone, o.delivery_method, o.delivery_address, o.remarks, o.total_amount,
                o.status, new Date(o.created_at).toLocaleString(), o.payment_proof_url,
                o.order_items.map(i => `${i.name}x${i.quantity}`).join('; ')
            ]));
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(wsData), '订单数据');
            XLSX.writeFile(wb, `锋味派订单_${new Date().toISOString().slice(0,10)}.xlsx`);
        } catch (err) { this.showToast(`导出失败: ${err.message}`, 'error'); } 
        finally { this.showLoading(false); }
    }
}

document.addEventListener('DOMContentLoaded', () => { window.app = new FoodOrderApp(); });
